/**
 * StudyVault — Core Application Controller
 * High-End Dark Futuristic Education & Productivity Operating System
 */
class AppController {
  constructor() {
    this.routine = null;
    this.currentFilter = 'all';
    this.currentCategory = 'all';
    this.homeTimelineCategory = 'all';
    this.searchQuery = '';
    this.activeTask = null;
    this.lastNotifiedTaskId = null;
    this.density = localStorage.getItem('aura_density') || 'comfortable';

    // Dashboard Focus Studio state
    this.dashboardFocusMode = 'pomodoro';
    this.dashboardTimerTotalSeconds = 25 * 60;
    this.dashboardTimerSeconds = 25 * 60;
    this.dashboardTimerInterval = null;
    this.isDashboardTimerRunning = false;

    // Fullscreen Focus mode timer state
    this.focusTimerInterval = null;
    this.focusSecondsRemaining = 25 * 60;
    this.isFocusTimerRunning = false;

    // Date navigation state
    this.currentNavDate = new Date();

    this.activeView = localStorage.getItem('aura_active_view') || 'homeView';
    this.init();
  }

  init() {
    this.loadRoutine();
    this.setupEventListeners();
    this.startLiveClockTracker();
    this.updateHeaderButtonBadges();
    this.render();
    this.switchView(this.activeView);

    // Initial check for notifications
    if (window.notificationEngine) {
      window.notificationEngine.checkPermission();
    }
  }

  switchView(viewName) {
    this.activeView = viewName;
    try {
      localStorage.setItem('aura_active_view', viewName);
    } catch (e) {}

    // Close mobile menu if open
    document.getElementById('appSidebar')?.classList.remove('mobile-open');

    // Update sidebar and nav buttons
    document.querySelectorAll('.nav-view-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === viewName);
    });

    // Update mobile bottom nav
    document.querySelectorAll('.mobile-nav-tab').forEach(tab => {
      const isMatch = (viewName === 'homeView' && tab.textContent.includes('Home')) ||
                      (viewName === 'routineView' && tab.textContent.includes('Plan')) ||
                      (viewName === 'englishView' && tab.textContent.includes('Notes'));
      tab.classList.toggle('active', isMatch);
    });

    // Update main view panels
    document.querySelectorAll('.main-view-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === viewName);
    });

    // Sub-renders based on view
    if (viewName === 'englishView') {
      if (window.englishLab) {
        window.englishLab.renderReadingLibrary();
        window.englishLab.renderVocabVault();
        window.englishLab.renderBookWisdomVault();
        window.englishLab.updateStatsBar();
      }
    } else if (viewName === 'wellnessView') {
      if (window.wellnessSentinel) {
        window.wellnessSentinel.renderHydrationWidget();
      }
    } else if (viewName === 'rulesView') {
      this.renderRulesView();
    } else if (viewName === 'routineView' || viewName === 'homeView') {
      this.render();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderRulesView() {
    const container = document.getElementById('fullRulesCardsGrid');
    if (!container || !this.routine || !this.routine.rules) return;

    container.innerHTML = this.routine.rules.map(r => `
      <div class="golden-rule-card ${r.highlight ? 'highlight-glow' : ''}">
        <div class="rule-top-meta">
          <span class="rule-index-tag">GOLDEN RULE #0${r.num}</span>
          ${r.highlight ? '<span class="task-badge-tag aiml" style="margin-left: 0.5rem;">CORE PILLAR</span>' : ''}
        </div>
        <h3 class="rule-card-title">${r.title}</h3>
        <blockquote class="rule-card-quote">"${r.text}"</blockquote>
        <p class="rule-card-explanation">${this.getRuleExplanation(r.num)}</p>
      </div>
    `).join('');
  }

  getRuleExplanation(num) {
    const map = {
      1: "Missing one day happens to everyone; missing two days begins forming an entirely new, destructive habit. Protect the streak at all costs.",
      2: "Sleep is biological restoration, not a luxury. If you sleep 5 hours to study at 5 AM, your cognitive retention drops by 40%. Protect 7–8 hours of deep restorative sleep first.",
      3: "Do not wait for flawless grammar before opening your mouth. Fluency is forged through repeated vocal vibrations. Speak aloud, record yourself, and embrace imperfections.",
      4: "Follow the complete feedback loop daily: Listen to native audio → Shadow rhythm → Read aloud → Speak original thoughts → Record 2-5m → Review without shame → Repeat.",
      5: "Endless short-form scrolling depletes dopamine and fractures attention spans. Keep your phone in another room during study blocks to maintain laser focus.",
      6: "Passive reading creates the illusion of competence. Build practical projects and force yourself to explain what you've learned in clear English to prove true understanding.",
      7: "Upgrade is a 30-day compounding marathon. Don't quit because of one low-energy afternoon; show up, execute the minimum, and maintain steady momentum."
    };
    return map[num] || "Discipline is the bridge between goals and accomplishment.";
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
    if (confirm("Reset current routine to the flagship 30-Day Personal Upgrade Routine?")) {
      this.routine = JSON.parse(JSON.stringify(DEFAULT_ROUTINE_DATA));
      this.saveRoutine();
      this.render();
      if (window.soundEngine) window.soundEngine.play('complete');
      this.showToast("30-Day Routine Restored", "Loaded 26 daily slots & English formulas");
    }
  }

  setupEventListeners() {
    // Navigation items
    document.querySelectorAll('.nav-view-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        if (view) this.switchView(view);
      });
    });

    // Mobile Hamburger
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
      document.getElementById('appSidebar')?.classList.toggle('mobile-open');
    });

    // Theme Toggle
    document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
      this.showToast("Visual Mode", "Dark Futuristic theme is optimized for deep focus.");
    });

    // Audio & Alerts
    document.getElementById('soundToggleBtn')?.addEventListener('click', () => this.toggleSound());
    document.getElementById('notifyPermBtn')?.addEventListener('click', () => this.requestNotifyPerm());

    // Filter tabs in routineView
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentFilter = e.currentTarget.dataset.filter;
        this.renderTaskList();
      });
    });

    // Command Search bar & Ctrl+K Shortcut
    const commandSearch = document.getElementById('globalCommandSearch');
    commandSearch?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderTaskList();
      this.renderHomeTimeline();
      if (this.searchQuery && this.activeView !== 'homeView' && this.activeView !== 'routineView') {
        this.switchView('homeView');
      }
    });

    const taskSearch = document.getElementById('taskSearchInput');
    taskSearch?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderTaskList();
      this.renderHomeTimeline();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        commandSearch?.focus();
      }
    });

    // Task Form
    document.getElementById('taskModalForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleTaskFormSubmit();
    });

    document.getElementById('closeTaskModalBtn')?.addEventListener('click', () => this.closeTaskModal());
    document.getElementById('cancelTaskModalBtn')?.addEventListener('click', () => this.closeTaskModal());

    // Custom Vocab Form
    document.getElementById('customVocabForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleCustomVocabSubmit();
    });
    document.getElementById('closeCustomVocabBtn')?.addEventListener('click', () => this.closeCustomVocabModal());

    // PDF Handlers
    this.setupPdfHandlers();

    // Eye rest modal
    document.getElementById('eyeRestDoneBtn')?.addEventListener('click', () => {
      if (window.wellnessSentinel) window.wellnessSentinel.completeEyeBreak();
    });
    document.getElementById('eyeRestSkipBtn')?.addEventListener('click', () => {
      if (window.wellnessSentinel) window.wellnessSentinel.dismissEyeBreak();
    });

    // Achievement modal
    document.getElementById('closeAchievementModal')?.addEventListener('click', () => {
      document.getElementById('achievementModal')?.classList.remove('active');
    });

    // Fullscreen Focus Mode
    this.setupFocusModeControls();

    // In-app toast listener
    window.addEventListener('in-app-toast', (e) => {
      this.showToast(e.detail.title, e.detail.body);
    });

    // English Hub Sub-Tabs
    document.querySelectorAll('.english-hub-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.english-hub-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const targetId = e.currentTarget.dataset.target;
        document.querySelectorAll('.english-hub-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(targetId)?.classList.add('active');
      });
    });
  }

  setupPdfHandlers() {
    const dropzone = document.getElementById('pdfDropzone');
    const fileInput = document.getElementById('pdfFileInput');
    const closePdfBtn = document.getElementById('closePdfModalBtn');
    const pdfModal = document.getElementById('pdfImportModal');
    const presetBtn = document.getElementById('loadAttachedRoutineBtn');

    closePdfBtn?.addEventListener('click', () => pdfModal?.classList.remove('active'));
    dropzone?.addEventListener('click', () => fileInput?.click());

    dropzone?.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });

    dropzone?.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));

    dropzone?.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
      if (e.dataTransfer.files.length) {
        this.processPdfFile(e.dataTransfer.files[0]);
      }
    });

    fileInput?.addEventListener('change', (e) => {
      if (e.target.files.length) {
        this.processPdfFile(e.target.files[0]);
      }
    });

    presetBtn?.addEventListener('click', () => {
      this.restoreDefaultRoutine();
      pdfModal?.classList.remove('active');
    });
  }

  async processPdfFile(file) {
    if (!file || file.type !== 'application/pdf') {
      alert("Please upload a valid .pdf file.");
      return;
    }

    const previewContainer = document.getElementById('pdfParsedPreview');
    const importBtn = document.getElementById('applyPdfTasksBtn');

    if (previewContainer) {
      previewContainer.innerHTML = `<p style="color: var(--accent-cyan);">Extracting timetable schedule from <strong>${file.name}</strong>...</p>`;
    }

    try {
      const parsedTasks = await window.pdfRoutineParser.parsePdfFile(file);
      if (!parsedTasks || parsedTasks.length === 0) {
        if (previewContainer) {
          previewContainer.innerHTML = `<p style="color: var(--accent-rose);">No valid schedule blocks found. Using standard 30-Day preset.</p>`;
        }
        return;
      }

      if (previewContainer) {
        previewContainer.innerHTML = `
          <div style="background: var(--bg-input); padding: 1rem; border-radius: 10px; max-height: 200px; overflow-y: auto;">
            <strong style="color: #FFFFFF;">Extracted ${parsedTasks.length} Schedule Blocks:</strong>
            ${parsedTasks.slice(0, 5).map(t => `
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.3rem;">
                <span style="color: var(--accent-cyan); font-family: monospace;">${t.timeDisplay}</span> — ${t.activity}
              </div>
            `).join('')}
            ${parsedTasks.length > 5 ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.3rem;">+ ${parsedTasks.length - 5} more blocks</div>` : ''}
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
        previewContainer.innerHTML = `<p style="color: var(--accent-rose);">Failed to extract PDF text. Use the 1-Click Attached preset.</p>`;
      }
    }
  }

  startLiveClockTracker() {
    const update = () => {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes();

      // Dynamic Greeting
      const greetingElem = document.getElementById('heroGreetingText');
      if (greetingElem) {
        let period = 'Evening';
        if (hours >= 5 && hours < 12) period = 'Morning';
        else if (hours >= 12 && hours < 17) period = 'Afternoon';
        greetingElem.textContent = `Good ${period}, Aniket! 👋`;
      }

      // Date Nav Display
      const dateDisplay = document.getElementById('timelineDateNavDisplay');
      if (dateDisplay) {
        dateDisplay.textContent = this.currentNavDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      }

      // Calculate current active task slot
      this.detectActiveTimeSlot(hours, mins);
    };

    update();
    setInterval(update, 1000);
  }

  changeDateNav(delta) {
    this.currentNavDate.setDate(this.currentNavDate.getDate() + delta);
    const dateDisplay = document.getElementById('timelineDateNavDisplay');
    if (dateDisplay) {
      dateDisplay.textContent = this.currentNavDate.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
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

    this.activeTask = matched ? matched.task : (this.routine.tasks[0] || null);

    // Notify if newly entered task
    if (matched && matched.task && matched.task.id !== this.lastNotifiedTaskId) {
      this.lastNotifiedTaskId = matched.task.id;
      if (window.notificationEngine) {
        window.notificationEngine.notify(`⏰ Routine: ${matched.task.activity}`, {
          body: `Time: ${matched.task.timeDisplay} | Goal: ${matched.task.goal}`,
          soundType: 'alert',
          tag: 'slot-start'
        });
      }
    }

    this.renderCurrentScheduleBlock(matched);
  }

  renderCurrentScheduleBlock(matched) {
    const actNameElem = document.getElementById('scheduleCurrentActName');
    const goalDescElem = document.getElementById('scheduleCurrentGoalDesc');
    const timerElem = document.getElementById('scheduleLiveTimerDigits');
    const completeBtn = document.getElementById('scheduleCompleteBtn');

    if (!matched || !matched.task) {
      if (actNameElem) actNameElem.textContent = "Project Building";
      if (goalDescElem) goalDescElem.textContent = "Goals: Portfolio / AI project";
      if (timerElem) timerElem.textContent = "3:30";
      return;
    }

    const { task, endTotal, current } = matched;
    const remainingMins = Math.max(0, endTotal - current);
    const m = Math.floor(remainingMins);
    const s = 59 - (new Date().getSeconds());

    if (actNameElem) actNameElem.textContent = task.activity;
    if (goalDescElem) goalDescElem.textContent = `Goal: ${task.goal}`;
    if (timerElem) timerElem.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    if (completeBtn) {
      completeBtn.textContent = task.completed ? '✓ Completed' : '✓ Mark Completed';
      completeBtn.classList.toggle('completed', task.completed);
    }
  }

  completeCurrentSlot() {
    if (this.activeTask) {
      this.toggleTask(this.activeTask.id);
    }
  }

  getCategoryBorderClass(category) {
    const map = {
      'Daily': 'border-amber',
      'Fitness': 'border-teal',
      'Wellness': 'border-purple',
      'English': 'border-violet',
      'AI/ML': 'border-amber',
      'Coding': 'border-blue',
      'College': 'border-teal'
    };
    return map[category] || 'border-blue';
  }

  filterTimelineCategory(cat) {
    this.homeTimelineCategory = cat;
    document.querySelectorAll('.timeline-chips-row .category-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.category === cat);
    });
    this.renderHomeTimeline();
  }

  renderHomeTimeline() {
    const container = document.getElementById('homeTimelineStream');
    if (!container || !this.routine || !this.routine.tasks) return;

    let tasks = this.routine.tasks;

    if (this.homeTimelineCategory !== 'all') {
      tasks = tasks.filter(t => t.category.toLowerCase() === this.homeTimelineCategory.toLowerCase());
    }

    if (this.searchQuery) {
      tasks = tasks.filter(t =>
        t.activity.toLowerCase().includes(this.searchQuery) ||
        t.goal.toLowerCase().includes(this.searchQuery) ||
        t.timeDisplay.toLowerCase().includes(this.searchQuery)
      );
    }

    // Display first 8 tasks on the home timeline for visual balance
    const displayTasks = tasks.slice(0, 8);

    container.innerHTML = displayTasks.map((task, idx) => {
      const borderClass = this.getCategoryBorderClass(task.category);
      const catClass = (task.category || 'daily').toLowerCase().replace('/', '');
      const duration = this.calculateDuration(task.startTime, task.endTime);
      const startTimeFormatted = this.formatTime12h(task.startTime);

      return `
        <div class="timeline-item-row">
          <div class="timeline-time-meta">
            <span class="timeline-time-val">${startTimeFormatted}</span>
            <span class="timeline-dur-val">${duration}</span>
          </div>

          <div class="task-item-card ${borderClass} ${task.completed ? 'completed' : ''}">
            <div class="task-card-main-col">
              <div class="task-card-title-row">
                <h4 class="task-act-title">${idx + 1}. ${task.activity}</h4>
                <span class="task-badge-tag ${catClass}">${task.category}</span>
                <span class="task-priority-tag">${(task.priority || 'MED').toUpperCase()}</span>
              </div>
              <span class="task-goal-caption">Goal: ${task.goal}</span>
            </div>

            <div class="task-card-right-col">
              <span class="task-xp-pill">+${task.xp || 30} XP</span>
              <button class="task-check-circle" onclick="window.app.toggleTask('${task.id}')" title="Mark as done">
                ${task.completed ? '✓' : ''}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderTaskList() {
    const container = document.getElementById('taskListContainer');
    if (!container || !this.routine || !this.routine.tasks) return;

    let filtered = this.routine.tasks;

    if (this.currentFilter === 'active') {
      filtered = filtered.filter(t => !t.completed);
    } else if (this.currentFilter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    if (this.searchQuery) {
      filtered = filtered.filter(t =>
        t.activity.toLowerCase().includes(this.searchQuery) ||
        t.goal.toLowerCase().includes(this.searchQuery) ||
        t.timeDisplay.toLowerCase().includes(this.searchQuery)
      );
    }

    container.innerHTML = filtered.map((task, idx) => {
      const borderClass = this.getCategoryBorderClass(task.category);
      const duration = this.calculateDuration(task.startTime, task.endTime);
      const startTimeFormatted = this.formatTime12h(task.startTime);

      return `
        <div class="timeline-item-row">
          <div class="timeline-time-meta">
            <span class="timeline-time-val">${startTimeFormatted}</span>
            <span class="timeline-dur-val">${duration}</span>
          </div>

          <div class="task-item-card ${borderClass} ${task.completed ? 'completed' : ''}" style="width: 100%;">
            <div class="task-card-main-col">
              <div class="task-card-title-row">
                <h4 class="task-act-title">${idx + 1}. ${task.activity}</h4>
                <span class="task-badge-tag">${task.category}</span>
                <span class="task-priority-tag">${task.priority.toUpperCase()}</span>
              </div>
              <span class="task-goal-caption">Goal: ${task.goal}</span>
            </div>

            <div class="task-card-right-col">
              <span class="task-xp-pill">+${task.xp} XP</span>
              <button class="task-check-circle" onclick="window.app.toggleTask('${task.id}')">
                ${task.completed ? '✓' : ''}
              </button>
              <button class="date-nav-btn" onclick="window.app.editTask('${task.id}')" title="Edit">✏️</button>
              <button class="date-nav-btn" onclick="window.app.deleteTask('${task.id}')" title="Delete">🗑️</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  toggleTask(taskId) {
    const task = this.routine.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    this.saveRoutine();

    if (task.completed) {
      if (window.soundEngine) window.soundEngine.play('complete');
      if (window.gamification) {
        window.gamification.awardXP(task.xp || 30, `Completed ${task.activity}`);
        this.checkMilestones(task);
      }
    } else {
      if (window.soundEngine) window.soundEngine.play('tick');
    }

    this.render();
  }

  checkMilestones(task) {
    if (task.activity.toLowerCase().includes('wake up')) {
      window.gamification.unlockBadge('badge-early-bird');
    }

    const aiDone = this.routine.tasks.some(t => t.category === 'AI/ML' && t.completed);
    const codeDone = this.routine.tasks.some(t => t.category === 'Coding' && t.completed);
    if (aiDone && codeDone) {
      window.gamification.unlockBadge('badge-ai-dev');
    }

    const allDone = this.routine.tasks.length > 0 && this.routine.tasks.every(t => t.completed);
    if (allDone) {
      window.gamification.unlockBadge('badge-full-day');
      window.gamification.awardXP(150, '100% Daily Routine Conquered!');
      this.showToast('🏆 100% Day Conquered!', 'Incredible discipline! All routine tasks completed.');
    }
  }

  renderMetrics() {
    if (!this.routine || !this.routine.tasks) return;

    const total = this.routine.tasks.length;
    const completed = this.routine.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Daily Upgrade Progress Ring
    const dayPctElem = document.getElementById('dayCompletionPercent');
    const ringCircle = document.getElementById('upgradeRingProgress');
    if (dayPctElem) dayPctElem.textContent = `${pct}%`;
    if (ringCircle) {
      const strokeDashoffset = 226 - (226 * pct) / 100;
      ringCircle.style.strokeDashoffset = strokeDashoffset;
    }

    // Hero Stats
    const heroStudy = document.getElementById('heroStudyTimeVal');
    const heroPending = document.getElementById('heroPendingTasksVal');
    const heroGoal = document.getElementById('heroDailyGoalVal');

    if (heroStudy) heroStudy.textContent = '4h 32m';
    if (heroPending) heroPending.textContent = `${pending} Tasks`;
    if (heroGoal) heroGoal.textContent = `${completed}/${Math.max(5, Math.ceil(total / 2))}`;

    // Quick Stats Cards
    const qsCompleted = document.getElementById('quickStatsCompleted');
    const qsPending = document.getElementById('quickStatsPending');
    const qsStudyTime = document.getElementById('quickStatsStudyTime');
    const qsWeeklyGoal = document.getElementById('quickStatsWeeklyGoal');

    if (qsCompleted) qsCompleted.textContent = completed;
    if (qsPending) qsPending.textContent = pending;
    if (qsStudyTime) qsStudyTime.textContent = '4h 32m';
    if (qsWeeklyGoal) qsWeeklyGoal.textContent = `${Math.min(100, Math.max(20, pct + 35))}%`;

    // Timeline count pill
    const countPill = document.getElementById('timelineTasksCountPill');
    if (countPill) countPill.textContent = `${total} tasks • 4h 45m`;

    // Category progress bars
    const categories = ['English', 'AI/ML', 'Coding', 'Fitness', 'Discipline'];
    categories.forEach(cat => {
      const catTotal = this.routine.tasks.filter(t => t.category.toLowerCase() === cat.toLowerCase()).length;
      const catDone = this.routine.tasks.filter(t => t.category.toLowerCase() === cat.toLowerCase() && t.completed).length;
      const catPct = catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;

      const fillElem = document.getElementById(`catProgFill-${cat.replace('/', '').toLowerCase()}`);
      const textElem = document.getElementById(`catProgText-${cat.replace('/', '').toLowerCase()}`);
      if (fillElem) fillElem.style.width = `${catPct}%`;
      if (textElem) textElem.textContent = `${catDone} / ${catTotal}`;
    });
  }

  render() {
    this.renderHomeTimeline();
    this.renderTaskList();
    this.renderMetrics();

    if (window.gamification) {
      window.gamification.renderHeaderUI();
      window.gamification.renderBadgesGallery();
    }
    if (window.wellnessSentinel) {
      window.wellnessSentinel.renderHydrationWidget();
    }
  }

  // Focus Studio In-Dashboard Timer
  setDashboardFocusMode(mode, minutes) {
    this.dashboardFocusMode = mode;
    this.dashboardTimerTotalSeconds = minutes * 60;
    this.dashboardTimerSeconds = minutes * 60;

    clearInterval(this.dashboardTimerInterval);
    this.isDashboardTimerRunning = false;

    document.querySelectorAll('.focus-mode-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.mode === mode);
    });

    const labelElem = document.getElementById('dashboardTimerLabel');
    if (labelElem) {
      labelElem.textContent = mode.charAt(0).toUpperCase() + mode.slice(1) + " Time";
    }

    const playBtn = document.getElementById('dashboardTimerPlayBtn');
    if (playBtn) playBtn.textContent = '▶';

    this.updateDashboardTimerUI();
  }

  toggleDashboardTimer() {
    const playBtn = document.getElementById('dashboardTimerPlayBtn');

    if (this.isDashboardTimerRunning) {
      clearInterval(this.dashboardTimerInterval);
      this.isDashboardTimerRunning = false;
      if (playBtn) playBtn.textContent = '▶';
    } else {
      this.isDashboardTimerRunning = true;
      if (playBtn) playBtn.textContent = '⏸';
      if (window.soundEngine) window.soundEngine.play('tick');

      this.dashboardTimerInterval = setInterval(() => {
        this.dashboardTimerSeconds--;
        this.updateDashboardTimerUI();

        if (this.dashboardTimerSeconds <= 0) {
          clearInterval(this.dashboardTimerInterval);
          this.isDashboardTimerRunning = false;
          if (playBtn) playBtn.textContent = '▶';
          if (window.soundEngine) window.soundEngine.play('levelUp');
          if (window.gamification) {
            window.gamification.awardXP(60, 'Focus Session Complete');
            window.gamification.unlockBadge('badge-zen');
          }
          this.showToast("Focus Complete! ⚡", "Magnificent focus session. Take a 5 min break!");
        }
      }, 1000);
    }
  }

  updateDashboardTimerUI() {
    const digitsElem = document.getElementById('dashboardTimerDigits');
    const circle = document.getElementById('dashboardTimerCircle');

    const m = Math.floor(this.dashboardTimerSeconds / 60);
    const s = this.dashboardTimerSeconds % 60;

    if (digitsElem) digitsElem.textContent = `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;

    if (circle && this.dashboardTimerTotalSeconds > 0) {
      const elapsed = this.dashboardTimerTotalSeconds - this.dashboardTimerSeconds;
      const progress = elapsed / this.dashboardTimerTotalSeconds;
      const offset = 377 - (377 * progress);
      circle.style.strokeDashoffset = offset;
    }
  }

  // Fullscreen Focus Overlay
  openFocusMode(taskName = null) {
    const overlay = document.getElementById('focusModeOverlay');
    if (!overlay) return;

    overlay.classList.add('active');
    const taskNameElem = document.getElementById('focusActiveTaskName');
    if (taskNameElem) {
      taskNameElem.textContent = taskName || (this.activeTask ? this.activeTask.activity : "Deep Student Focus Block");
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

  // Modals
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

  openCustomVocabModal() {
    document.getElementById('customVocabModal')?.classList.add('active');
  }

  closeCustomVocabModal() {
    document.getElementById('customVocabModal')?.classList.remove('active');
  }

  handleCustomVocabSubmit() {
    const word = document.getElementById('customWordInput')?.value.trim();
    const pos = document.getElementById('customTypeInput')?.value;
    const def = document.getElementById('customMeaningInput')?.value.trim();
    const s1 = document.getElementById('customS1Input')?.value.trim();
    const s2 = document.getElementById('customS2Input')?.value.trim();
    const s3 = document.getElementById('customS3Input')?.value.trim();

    if (!word || !def) return;

    if (window.englishLab) {
      window.englishLab.addCustomWord({ word, partOfSpeech: pos, definition: def, sentence1: s1, sentence2: s2, sentence3: s3 });
      this.closeCustomVocabModal();
      this.showToast("Vocabulary Added! 💎", `"${word}" saved with +40 XP.`);
    }
  }

  openPdfModal() {
    document.getElementById('pdfImportModal')?.classList.add('active');
  }

  calculateDuration(startTime, endTime) {
    if (!startTime || !endTime) return '45m';
    const [sH, sM] = startTime.split(':').map(Number);
    const [eH, eM] = endTime.split(':').map(Number);
    let diff = (eH * 60 + eM) - (sH * 60 + sM);
    if (diff < 0) diff += 1440;
    if (diff < 60) return `${diff}m`;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  formatTime12h(time24) {
    if (!time24) return '';
    let [h, m] = time24.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m < 10 ? '0' : ''}${m} ${suffix}`;
  }

  updateHeaderButtonBadges() {
    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn && window.soundEngine) {
      const on = window.soundEngine.soundEnabled;
      soundBtn.innerHTML = on ? '🔊' : '🔇';
    }
  }

  toggleSound() {
    const isEnabled = window.soundEngine.toggleSound();
    const btn = document.getElementById('soundToggleBtn');
    if (btn) btn.innerHTML = isEnabled ? '🔊' : '🔇';
  }

  async requestNotifyPerm() {
    const granted = await window.notificationEngine.requestPermission();
    if (granted) {
      this.showToast("Notifications Enabled", "Slot alerts & wellness reminders are active.");
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
        <strong>${title}</strong>
        <p>${body}</p>
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
