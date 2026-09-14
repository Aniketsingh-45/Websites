/**
 * AuraTask - High-Tech Student Growth & Routine To-Do Web Application
 * Core Application Controller
 */
class AppController {
  constructor() {
    this.routine = null;
    this.currentFilter = 'all';
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.activeTask = null;
    this.lastNotifiedTaskId = null;

    // Focus mode timer state
    this.focusTimerInterval = null;
    this.focusSecondsRemaining = 25 * 60;
    this.isFocusTimerRunning = false;

    this.init();
  }

  init() {
    this.loadRoutine();
    this.setupEventListeners();
    this.startLiveClockTracker();
    this.render();

    // Initial check for notifications
    if (window.notificationEngine) {
      window.notificationEngine.checkPermission();
    }
  }

  loadRoutine() {
    try {
      const saved = localStorage.getItem('aura_todo_routine');
      if (saved) {
        this.routine = JSON.parse(saved);
      } else {
        this.routine = JSON.parse(JSON.stringify(DEFAULT_ROUTINE_DATA));
      }
    } catch (e) {
      console.warn('Failed to load routine from localStorage', e);
      this.routine = JSON.parse(JSON.stringify(DEFAULT_ROUTINE_DATA));
    }
  }

  saveRoutine() {
    try {
      localStorage.setItem('aura_todo_routine', JSON.stringify(this.routine));
    } catch (e) {
      console.warn('Failed to save routine', e);
    }
  }

  restoreDefaultRoutine() {
    if (confirm("Reset current routine to the preloaded 30-Day Personal Upgrade Routine? Your custom edits will be refreshed.")) {
      this.routine = JSON.parse(JSON.stringify(DEFAULT_ROUTINE_DATA));
      this.saveRoutine();
      this.render();
      if (window.soundEngine) window.soundEngine.play('complete');
      this.showToast("30-Day Routine Restored", "Loaded 26 daily slots & English formulas");
    }
  }

  setupEventListeners() {
    // Top Bar buttons
    document.getElementById('restoreRoutineBtn')?.addEventListener('click', () => this.restoreDefaultRoutine());
    document.getElementById('openAddModalBtn')?.addEventListener('click', () => this.openTaskModal());
    document.getElementById('openPdfUploadBtn')?.addEventListener('click', () => this.openPdfModal());
    document.getElementById('openFocusModeBtn')?.addEventListener('click', () => this.openFocusMode());
    document.getElementById('openRulesBtn')?.addEventListener('click', () => this.openRulesDrawer());
    document.getElementById('soundToggleBtn')?.addEventListener('click', () => this.toggleSound());
    document.getElementById('notifyPermBtn')?.addEventListener('click', () => this.requestNotifyPerm());
    document.getElementById('printRoutineBtn')?.addEventListener('click', () => window.print());

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentFilter = e.currentTarget.dataset.filter;
        this.renderTaskList();
      });
    });

    // Category chips
    document.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentCategory = e.currentTarget.dataset.category;
        this.renderTaskList();
      });
    });

    // Search input
    document.getElementById('taskSearchInput')?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderTaskList();
    });

    // Task Modal Form
    document.getElementById('taskModalForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleTaskFormSubmit();
    });

    document.getElementById('closeTaskModalBtn')?.addEventListener('click', () => this.closeTaskModal());
    document.getElementById('cancelTaskModalBtn')?.addEventListener('click', () => this.closeTaskModal());

    // PDF Import Handlers
    this.setupPdfHandlers();

    // Hydration buttons
    document.getElementById('waterAddBtn')?.addEventListener('click', () => {
      if (window.wellnessSentinel) window.wellnessSentinel.addWaterGlass();
    });
    document.getElementById('waterSubBtn')?.addEventListener('click', () => {
      if (window.wellnessSentinel) window.wellnessSentinel.removeWaterGlass();
    });

    // Eye rest modal buttons
    document.getElementById('eyeRestDoneBtn')?.addEventListener('click', () => {
      if (window.wellnessSentinel) window.wellnessSentinel.completeEyeBreak();
    });
    document.getElementById('eyeRestSkipBtn')?.addEventListener('click', () => {
      if (window.wellnessSentinel) window.wellnessSentinel.dismissEyeBreak();
    });

    // Achievement modal close
    document.getElementById('closeAchievementModal')?.addEventListener('click', () => {
      document.getElementById('achievementModal')?.classList.remove('active');
    });

    // Rules drawer close
    document.getElementById('closeRulesDrawerBtn')?.addEventListener('click', () => {
      document.getElementById('rulesDrawer')?.classList.remove('active');
    });

    // Focus Mode Controls
    this.setupFocusModeControls();

    // In-app toast event listener
    window.addEventListener('in-app-toast', (e) => {
      this.showToast(e.detail.title, e.detail.body);
    });
  }

  setupPdfHandlers() {
    const dropzone = document.getElementById('pdfDropzone');
    const fileInput = document.getElementById('pdfFileInput');
    const closePdfBtn = document.getElementById('closePdfModalBtn');
    const pdfModal = document.getElementById('pdfImportModal');

    closePdfBtn?.addEventListener('click', () => pdfModal?.classList.remove('active'));

    dropzone?.addEventListener('click', () => fileInput?.click());

    dropzone?.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });

    dropzone?.addEventListener('dragleave', () => {
      dropzone.classList.remove('drag-over');
    });

    dropzone?.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      if (e.dataTransfer.files.length > 0) {
        this.processPdfFile(e.dataTransfer.files[0]);
      }
    });

    fileInput?.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.processPdfFile(e.target.files[0]);
      }
    });

    // Load Attached PDF One-Click Preset Button
    document.getElementById('loadAttachedRoutineBtn')?.addEventListener('click', () => {
      this.routine = JSON.parse(JSON.stringify(DEFAULT_ROUTINE_DATA));
      this.saveRoutine();
      pdfModal?.classList.remove('active');
      this.render();
      if (window.soundEngine) window.soundEngine.play('complete');
      this.showToast("30-Day Upgrade Loaded", "Imported 26 routine tasks from document");
    });
  }

  async processPdfFile(file) {
    if (!file.name.endsWith('.pdf')) {
      alert('Please select a valid .PDF timetable file.');
      return;
    }

    const previewContainer = document.getElementById('pdfParsedPreview');
    const importBtn = document.getElementById('applyPdfTasksBtn');
    if (previewContainer) {
      previewContainer.innerHTML = `<div class="pdf-loading"><span class="spinner"></span> Parsing timetable with PDF.js...</div>`;
    }

    try {
      const parsedTasks = await window.pdfRoutineParser.parsePDFFile(file);
      if (parsedTasks.length === 0) {
        if (previewContainer) {
          previewContainer.innerHTML = `<p class="empty-state">No standard timetable slots detected in this PDF. You can still use the 1-Click "Load Attached 30-Day Routine" button!</p>`;
        }
        return;
      }

      // Show preview
      if (previewContainer) {
        previewContainer.innerHTML = `
          <div class="pdf-preview-header">
            <h4>Extracted ${parsedTasks.length} Schedule Blocks:</h4>
          </div>
          <div class="pdf-preview-list">
            ${parsedTasks.map(t => `
              <div class="pdf-preview-item">
                <span class="preview-time">${t.timeDisplay}</span>
                <strong class="preview-act">${t.activity}</strong>
                <span class="preview-tag">${t.category}</span>
                <span class="preview-goal">${t.goal}</span>
              </div>
            `).join('')}
          </div>
        `;
      }

      if (importBtn) {
        importBtn.style.display = 'inline-flex';
        importBtn.onclick = () => {
          this.routine.tasks = parsedTasks;
          this.saveRoutine();
          document.getElementById('pdfImportModal')?.classList.remove('active');
          this.render();
          if (window.soundEngine) window.soundEngine.play('complete');
          this.showToast("PDF Routine Imported!", `Loaded ${parsedTasks.length} tasks from ${file.name}`);
        };
      }
    } catch (err) {
      console.error(err);
      if (previewContainer) {
        previewContainer.innerHTML = `<p class="error-text">Failed to extract text. Make sure PDF contains selectable text or use the 1-Click Attached preset.</p>`;
      }
    }
  }

  startLiveClockTracker() {
    const update = () => {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes();
      const secs = now.getSeconds();

      // Update digital clock in top bar
      const clockElem = document.getElementById('liveDigitalClock');
      if (clockElem) {
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        clockElem.textContent = timeStr;
      }

      const dateElem = document.getElementById('liveDateDisplay');
      if (dateElem) {
        dateElem.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      }

      // Calculate current active task slot
      this.detectActiveTimeSlot(hours, mins);
    };

    update();
    setInterval(update, 1000);
  }

  detectActiveTimeSlot(currentHours, currentMins) {
    if (!this.routine || !this.routine.tasks) return;

    const currentTotalMins = currentHours * 60 + currentMins;

    let matched = null;
    for (const task of this.routine.tasks) {
      if (!task.startTime || !task.endTime) continue;

      const [sH, sM] = task.startTime.split(':').map(Number);
      const [eH, eM] = task.endTime.split(':').map(Number);

      const startTotal = sH * 60 + sM;
      let endTotal = eH * 60 + eM;

      // Handle overnight tasks (e.g. 22:30 to 06:00)
      if (endTotal < startTotal) {
        if (currentTotalMins >= startTotal || currentTotalMins < endTotal) {
          matched = { task, startTotal, endTotal: endTotal + 1440, current: currentTotalMins < endTotal ? currentTotalMins + 1440 : currentTotalMins };
          break;
        }
      } else {
        if (currentTotalMins >= startTotal && currentTotalMins < endTotal) {
          matched = { task, startTotal, endTotal, current: currentTotalMins };
          break;
        }
      }
    }

    this.activeTask = matched ? matched.task : null;

    // Notify if newly entered task
    if (this.activeTask && this.activeTask.id !== this.lastNotifiedTaskId) {
      this.lastNotifiedTaskId = this.activeTask.id;
      if (window.notificationEngine) {
        window.notificationEngine.notify(`⏰ Routine: ${this.activeTask.activity}`, {
          body: `Time: ${this.activeTask.timeDisplay} | Goal: ${this.activeTask.goal}`,
          soundType: 'alert',
          tag: 'slot-start'
        });
      }
    }

    this.renderLiveBillboard(matched);
  }

  renderLiveBillboard(matched) {
    const card = document.getElementById('liveBillboardCard');
    if (!card) return;

    if (!matched || !matched.task) {
      card.innerHTML = `
        <div class="billboard-empty">
          <span class="pulse-indicator off"></span>
          <div>
            <h3>Between Routine Intervals</h3>
            <p>Next scheduled block will appear automatically. Take a moment to hydrate or review your plan.</p>
          </div>
        </div>
      `;
      return;
    }

    const { task, startTotal, endTotal, current } = matched;
    const totalDuration = endTotal - startTotal;
    const elapsed = current - startTotal;
    const remaining = Math.max(0, endTotal - current);
    const progressPct = Math.min(100, Math.round((elapsed / totalDuration) * 100));

    card.innerHTML = `
      <div class="billboard-active-content">
        <div class="billboard-left">
          <div class="live-pill">
            <span class="live-dot-pulse"></span>
            LIVE NOW • ${task.timeDisplay}
          </div>
          <h2 class="billboard-title">${task.activity}</h2>
          <p class="billboard-goal">🎯 <strong>Target:</strong> ${task.goal}</p>
          <div class="billboard-meta">
            <span class="badge-cat cat-${task.category.toLowerCase()}">${task.category}</span>
            <span class="badge-prio prio-${task.priority}">Priority: ${task.priority.toUpperCase()}</span>
            <span class="badge-xp">+${task.xp} XP</span>
          </div>
        </div>

        <div class="billboard-right">
          <div class="billboard-timer">
            <span class="timer-remaining">${remaining}</span>
            <span class="timer-unit">min left</span>
          </div>
          <div class="billboard-progress-track">
            <div class="billboard-progress-fill" style="width: ${progressPct}%"></div>
          </div>
          <button class="billboard-check-btn ${task.completed ? 'completed' : ''}" onclick="window.app.toggleTask('${task.id}')">
            ${task.completed ? '✓ Completed' : 'Mark as Completed'}
          </button>
        </div>
      </div>
    `;
  }

  toggleTask(taskId) {
    const task = this.routine.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    this.saveRoutine();

    if (task.completed) {
      if (window.soundEngine) window.soundEngine.play('complete');
      if (window.gamification) {
        window.gamification.awardXP(task.xp, `Completed ${task.activity}`);
        this.checkMilestones(task);
      }
    } else {
      if (window.soundEngine) window.soundEngine.play('tick');
    }

    this.render();
  }

  completeTaskById(taskId) {
    const task = this.routine.tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      this.toggleTask(taskId);
    }
  }

  checkMilestones(task) {
    // 1. Early bird check (task 1)
    if (task.id === 'task-1' || task.activity.toLowerCase().includes('wake up')) {
      window.gamification.unlockBadge('badge-early-bird');
    }

    // 2. AI & Coding combo
    const aiDone = this.routine.tasks.some(t => t.category === 'AI/ML' && t.completed);
    const codeDone = this.routine.tasks.some(t => t.category === 'Coding' && t.completed);
    if (aiDone && codeDone) {
      window.gamification.unlockBadge('badge-ai-dev');
    }

    // 3. 100% routine complete
    const allDone = this.routine.tasks.length > 0 && this.routine.tasks.every(t => t.completed);
    if (allDone) {
      window.gamification.unlockBadge('badge-full-day');
      window.gamification.awardXP(150, '100% Daily Routine Conquered!');
      this.showToast('🏆 100% Day Conquered!', 'Incredible discipline! All routine tasks completed.');
    }
  }

  render() {
    this.renderTaskList();
    this.renderMetrics();
    this.renderWeeklyFocusBanner();
    this.renderDailyHabitsList();

    if (window.gamification) {
      window.gamification.renderHeaderUI();
      window.gamification.renderBadgesGallery();
    }
    if (window.wellnessSentinel) {
      window.wellnessSentinel.renderHydrationWidget();
    }
  }

  renderTaskList() {
    const container = document.getElementById('taskListContainer');
    if (!container) return;

    let filtered = this.routine.tasks;

    // Filter by status
    if (this.currentFilter === 'active') {
      filtered = filtered.filter(t => !t.completed);
    } else if (this.currentFilter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    // Filter by category
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(t => t.category.toLowerCase() === this.currentCategory.toLowerCase());
    }

    // Filter by search
    if (this.searchQuery) {
      filtered = filtered.filter(t =>
        t.activity.toLowerCase().includes(this.searchQuery) ||
        t.goal.toLowerCase().includes(this.searchQuery) ||
        t.timeDisplay.toLowerCase().includes(this.searchQuery)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="tasks-empty-view">
          <span class="empty-icon">📝</span>
          <p>No tasks match the selected filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(task => {
      const isLive = this.activeTask && this.activeTask.id === task.id;
      return `
        <div class="task-card ${task.completed ? 'completed' : ''} ${isLive ? 'is-live-slot' : ''}" data-id="${task.id}">
          <div class="task-left">
            <button class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="window.app.toggleTask('${task.id}')" aria-label="Toggle task completion">
              ${task.completed ? '✓' : ''}
            </button>
            <div class="task-time-col">
              <span class="task-time-text">${task.timeDisplay}</span>
              ${isLive ? '<span class="task-live-tag">CURRENT</span>' : ''}
            </div>
          </div>

          <div class="task-center">
            <div class="task-main-row">
              <h3 class="task-activity ${task.completed ? 'strike' : ''}">${task.activity}</h3>
              <span class="badge-cat cat-${task.category.toLowerCase()}">${task.category}</span>
              <span class="badge-prio prio-${task.priority}">${task.priority}</span>
            </div>
            <p class="task-goal-text">🎯 ${task.goal}</p>
          </div>

          <div class="task-right">
            <span class="task-xp-badge">+${task.xp} XP</span>
            <div class="task-actions-menu">
              <button class="task-mini-btn" title="Edit Task" onclick="window.app.editTask('${task.id}')">✏️</button>
              <button class="task-mini-btn del" title="Delete Task" onclick="window.app.deleteTask('${task.id}')">🗑️</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderMetrics() {
    if (!this.routine || !this.routine.tasks) return;

    const total = this.routine.tasks.length;
    const completed = this.routine.tasks.filter(t => t.completed).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    const dayPctElem = document.getElementById('dayCompletionPercent');
    const dayProgressFill = document.getElementById('dayProgressFillBar');
    const completedCountElem = document.getElementById('completedTasksCount');
    const totalCountElem = document.getElementById('totalTasksCount');

    if (dayPctElem) dayPctElem.textContent = `${pct}%`;
    if (dayProgressFill) dayProgressFill.style.width = `${pct}%`;
    if (completedCountElem) completedCountElem.textContent = completed;
    if (totalCountElem) totalCountElem.textContent = total;

    // Category breakdown
    const categories = ['English', 'AI/ML', 'Coding', 'Fitness', 'Discipline'];
    categories.forEach(cat => {
      const catTotal = this.routine.tasks.filter(t => t.category.toLowerCase() === cat.toLowerCase()).length;
      const catDone = this.routine.tasks.filter(t => t.category.toLowerCase() === cat.toLowerCase() && t.completed).length;
      const catPct = catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;

      const fillElem = document.getElementById(`catProgFill-${cat.replace('/', '').toLowerCase()}`);
      const textElem = document.getElementById(`catProgText-${cat.replace('/', '').toLowerCase()}`);
      if (fillElem) fillElem.style.width = `${catPct}%`;
      if (textElem) textElem.textContent = `${catDone}/${catTotal}`;
    });
  }

  renderWeeklyFocusBanner() {
    const banner = document.getElementById('weeklyFocusBanner');
    if (!banner || !this.routine.weeklyFocus) return;

    // Pick current week of month (1 to 4)
    const dayOfMonth = new Date().getDate();
    const currentWeekIndex = Math.min(3, Math.floor((dayOfMonth - 1) / 7));
    const focus = this.routine.weeklyFocus[currentWeekIndex] || this.routine.weeklyFocus[0];

    banner.innerHTML = `
      <div class="focus-banner-content">
        <div class="focus-banner-left">
          <span class="focus-week-tag">WEEK ${focus.week} FOCUS</span>
          <h4 class="focus-theme">${focus.theme}</h4>
          <p class="focus-desc">${focus.description}</p>
        </div>
        <div class="focus-banner-right">
          <button class="english-lab-open-btn" id="bannerEnglishLabBtn" onclick="window.englishLab.initEventListeners(); document.getElementById('englishLabModal').classList.add('active'); window.englishLab.renderDailyVocab();">
            🎙️ Open English Speech Lab
          </button>
        </div>
      </div>
    `;
  }

  renderDailyHabitsList() {
    const container = document.getElementById('dailyHabitsContainer');
    if (!container || !this.routine.dailyChecklist) return;

    container.innerHTML = this.routine.dailyChecklist.map(item => `
      <label class="habit-check-label ${item.checked ? 'checked' : ''}">
        <input type="checkbox" id="chk-item-${item.id}" ${item.checked ? 'checked' : ''} onchange="window.app.toggleHabitCheck('${item.id}')">
        <span class="custom-chk"></span>
        <span class="habit-name">${item.text}</span>
      </label>
    `).join('');

    // Update habit completion meter
    const total = this.routine.dailyChecklist.length;
    const done = this.routine.dailyChecklist.filter(i => i.checked).length;
    const habitsPct = total > 0 ? Math.round((done / total) * 100) : 0;
    const habitsPctElem = document.getElementById('habitsProgressPercent');
    if (habitsPctElem) habitsPctElem.textContent = `${habitsPct}% (${done}/${total})`;
  }

  toggleHabitCheck(habitId) {
    const item = this.routine.dailyChecklist.find(i => i.id === habitId);
    if (!item) return;

    item.checked = !item.checked;
    this.saveRoutine();

    if (item.checked) {
      if (window.soundEngine) window.soundEngine.play('tick');
      if (window.gamification) window.gamification.awardXP(10, `Daily Habit: ${item.text}`);
    }

    this.renderDailyHabitsList();
  }

  // Task Modal (Add & Edit)
  openTaskModal(task = null) {
    const modal = document.getElementById('taskModal');
    if (!modal) return;

    document.getElementById('taskModalTitle').textContent = task ? "Edit Routine Task" : "Add Routine Task";
    document.getElementById('taskIdInput').value = task ? task.id : "";
    document.getElementById('taskActivityInput').value = task ? task.activity : "";
    document.getElementById('taskGoalInput').value = task ? task.goal : "";
    document.getElementById('taskStartTimeInput').value = task ? task.startTime : "09:00";
    document.getElementById('taskEndTimeInput').value = task ? task.endTime : "10:00";
    document.getElementById('taskCategoryInput').value = task ? task.category : "Coding";
    document.getElementById('taskPriorityInput').value = task ? task.priority : "high";

    modal.classList.add('active');
  }

  closeTaskModal() {
    document.getElementById('taskModal')?.classList.remove('active');
  }

  handleTaskFormSubmit() {
    const id = document.getElementById('taskIdInput').value;
    const activity = document.getElementById('taskActivityInput').value.trim();
    const goal = document.getElementById('taskGoalInput').value.trim() || 'Focus & execution';
    const startTime = document.getElementById('taskStartTimeInput').value;
    const endTime = document.getElementById('taskEndTimeInput').value;
    const category = document.getElementById('taskCategoryInput').value;
    const priority = document.getElementById('taskPriorityInput').value;

    if (!activity) return;

    const timeDisplay = `${this.formatTime12h(startTime)} – ${this.formatTime12h(endTime)}`;

    if (id) {
      // Edit existing
      const task = this.routine.tasks.find(t => t.id === id);
      if (task) {
        task.activity = activity;
        task.goal = goal;
        task.startTime = startTime;
        task.endTime = endTime;
        task.timeDisplay = timeDisplay;
        task.category = category;
        task.priority = priority;
      }
    } else {
      // Add new
      const newTask = {
        id: `custom-task-${Date.now()}`,
        startTime,
        endTime,
        timeDisplay,
        activity,
        goal,
        category,
        priority,
        xp: priority === 'high' ? 45 : (priority === 'medium' ? 30 : 20),
        completed: false
      };
      this.routine.tasks.push(newTask);
      this.sortRoutineTasks();
    }

    this.saveRoutine();
    this.closeTaskModal();
    this.render();
    if (window.soundEngine) window.soundEngine.play('complete');
  }

  sortRoutineTasks() {
    this.routine.tasks.sort((a, b) => {
      const [aH, aM] = a.startTime.split(':').map(Number);
      const [bH, bM] = b.startTime.split(':').map(Number);
      return (aH * 60 + aM) - (bH * 60 + bM);
    });
  }

  editTask(taskId) {
    const task = this.routine.tasks.find(t => t.id === taskId);
    if (task) this.openTaskModal(task);
  }

  deleteTask(taskId) {
    if (confirm("Delete this routine slot?")) {
      this.routine.tasks = this.routine.tasks.filter(t => t.id !== taskId);
      this.saveRoutine();
      this.render();
      if (window.soundEngine) window.soundEngine.play('tick');
    }
  }

  formatTime12h(time24) {
    if (!time24) return '';
    let [h, m] = time24.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m < 10 ? '0' : ''}${m} ${suffix}`;
  }

  openPdfModal() {
    document.getElementById('pdfImportModal')?.classList.add('active');
  }

  openRulesDrawer() {
    const drawer = document.getElementById('rulesDrawer');
    const container = document.getElementById('rulesListContainer');
    if (container && this.routine.rules) {
      container.innerHTML = this.routine.rules.map(r => `
        <div class="rule-card ${r.highlight ? 'highlight' : ''}">
          <span class="rule-number">RULE #${r.num}</span>
          <h4 class="rule-title">${r.title}</h4>
          <p class="rule-text">"${r.text}"</p>
        </div>
      `).join('');
    }
    drawer?.classList.add('active');
  }

  // Focus Mode
  openFocusMode() {
    const overlay = document.getElementById('focusModeOverlay');
    if (!overlay) return;

    overlay.classList.add('active');
    const taskNameElem = document.getElementById('focusActiveTaskName');
    if (taskNameElem) {
      taskNameElem.textContent = this.activeTask ? this.activeTask.activity : "Deep Student Focus Block";
    }
    this.focusSecondsRemaining = 25 * 60;
    this.updateFocusTimerDisplay();
  }

  closeFocusMode() {
    const overlay = document.getElementById('focusModeOverlay');
    overlay?.classList.remove('active');
    clearInterval(this.focusTimerInterval);
    this.isFocusTimerRunning = false;
    if (window.soundEngine) window.soundEngine.stopAmbient();
  }

  setupFocusModeControls() {
    document.getElementById('closeFocusModeBtn')?.addEventListener('click', () => this.closeFocusMode());

    const toggleTimerBtn = document.getElementById('focusPlayPauseBtn');
    toggleTimerBtn?.addEventListener('click', () => {
      if (this.isFocusTimerRunning) {
        clearInterval(this.focusTimerInterval);
        this.isFocusTimerRunning = false;
        toggleTimerBtn.textContent = '▶ Resume';
      } else {
        this.isFocusTimerRunning = true;
        toggleTimerBtn.textContent = '⏸ Pause';
        this.focusTimerInterval = setInterval(() => {
          this.focusSecondsRemaining--;
          this.updateFocusTimerDisplay();
          if (this.focusSecondsRemaining <= 0) {
            clearInterval(this.focusTimerInterval);
            this.isFocusTimerRunning = false;
            if (window.soundEngine) window.soundEngine.play('levelUp');
            if (window.gamification) {
              window.gamification.awardXP(60, 'Completed 25m Focus Block');
              window.gamification.unlockBadge('badge-zen');
            }
            alert("Focus Session Complete! Outstanding work.");
            this.closeFocusMode();
          }
        }, 1000);
      }
    });

    // Ambient audio switches in Focus mode
    document.getElementById('binauralAudioBtn')?.addEventListener('click', (e) => {
      const isPlaying = window.soundEngine.toggleAmbient('binaural');
      e.currentTarget.classList.toggle('active', isPlaying);
      document.getElementById('rainAudioBtn')?.classList.remove('active');
    });

    document.getElementById('rainAudioBtn')?.addEventListener('click', (e) => {
      const isPlaying = window.soundEngine.toggleAmbient('rain');
      e.currentTarget.classList.toggle('active', isPlaying);
      document.getElementById('binauralAudioBtn')?.classList.remove('active');
    });
  }

  updateFocusTimerDisplay() {
    const display = document.getElementById('focusTimerDisplay');
    if (!display) return;
    const mins = Math.floor(this.focusSecondsRemaining / 60);
    const secs = this.focusSecondsRemaining % 60;
    display.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  toggleSound() {
    const isEnabled = window.soundEngine.toggleSound();
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      btn.innerHTML = isEnabled ? '🔊 Sound ON' : '🔇 Sound OFF';
      btn.classList.toggle('muted', !isEnabled);
    }
  }

  async requestNotifyPerm() {
    const granted = await window.notificationEngine.requestPermission();
    if (granted) {
      this.showToast("Notifications Enabled", "You will now receive slot alerts & wellness reminders.");
    } else {
      alert("Notification permissions were not granted.");
    }
  }

  showToast(title, body) {
    const container = document.getElementById('toastNotificationContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'in-app-toast';
    toast.innerHTML = `
      <div class="toast-indicator"></div>
      <div class="toast-content">
        <strong class="toast-title">${title}</strong>
        <p class="toast-body">${body}</p>
      </div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
