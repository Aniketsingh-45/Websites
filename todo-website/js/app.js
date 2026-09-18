/**
 * AuraRoutine — Core Application Controller & Daily Computational Engine
 * High-End Dark Futuristic Daily Mastery & Growth Operating System
 */
class AppController {
  constructor() {
    this.routine = null;
    this.currentFilter = 'all';
    this.currentCategory = 'all';
    this.routineCategoryFilter = 'all';
    this.homeTimelineCategory = 'all';
    this.searchQuery = '';
    this.activeTask = null;
    this.lastNotifiedTaskId = null;
    this.density = localStorage.getItem('aura_density') || 'comfortable';

    // Daily Lifecycle & Computational State
    this.activeDate = null;
    this.dailyHistory = {};
    this.todayFocusMinutes = 0;

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
    this.initTheme();
    this.loadRoutine();
    this.initDailyEngine();
    this.setupEventListeners();
    this.setupProfileDropdown();
    this.initUserProfile();
    this.initQuickHabits();
    this.initSoundscape();
    this.initScratchpad();
    this.startLiveClockTracker();
    this.updateHeaderButtonBadges();
    this.render();
    this.switchView(this.activeView);

    // Initial check for notifications
    if (window.notificationEngine) {
      window.notificationEngine.checkPermission();
    }
  }

  switchView(viewName, subTarget) {
    this.activeView = viewName;
    try {
      localStorage.setItem('aura_active_view', viewName);
    } catch (e) {}

    // Close mobile menu and backdrop if open
    document.getElementById('appSidebar')?.classList.remove('mobile-open');
    document.getElementById('sidebarBackdrop')?.classList.remove('active');
    document.body.style.overflow = '';

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
      if (subTarget) {
        document.querySelectorAll('.english-hub-tab').forEach(t => t.classList.toggle('active', t.dataset.target === subTarget));
        document.querySelectorAll('.english-hub-panel').forEach(p => p.classList.toggle('active', p.id === subTarget));
      }
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
    } else if (viewName === 'routineView') {
      this.render();
      this.renderStudyPlanHabits();
    } else if (viewName === 'homeView') {
      this.render();
      this.renderQuickHabits();
    } else if (viewName === 'profileView') {
      this.renderProfileView();
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
      this.showToast("30-Day Routine Restored", "Loaded 26 daily slots & English formulas", "success");
    }
  }

  // =========================================================================
  // AURAROUTINE DAILY COMPUTATIONAL & LIFECYCLE ENGINE
  // =========================================================================
  initDailyEngine() {
    this.activeDate = localStorage.getItem('aura_active_date') || this.getTodayDateString();
    try {
      this.dailyHistory = JSON.parse(localStorage.getItem('aura_daily_history') || '{}');
    } catch (e) {
      this.dailyHistory = {};
    }
    this.todayFocusMinutes = parseInt(localStorage.getItem(`aura_daily_focus_${this.activeDate}`) || '0', 10);

    // Initial check for day rollover
    this.checkDailyRollover();

    // Check on tab focus / wake up
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.checkDailyRollover();
      }
    });

    // Master background tick every 30 seconds
    setInterval(() => {
      this.checkDailyRollover();
    }, 30000);
  }

  getTodayDateString(dateObj = new Date()) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  formatDisplayDate(dateStr) {
    if (!dateStr) return 'Today';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    }
    return dateStr;
  }

  checkDailyRollover(forcedDate = null) {
    const targetDateStr = forcedDate || this.getTodayDateString();
    if (targetDateStr !== this.activeDate) {
      const prevDate = this.activeDate;
      // 1. Archive yesterday's performance
      this.archiveDay(prevDate);

      // 2. Evaluate streak continuity based on yesterday's performance
      this.evaluateStreakContinuity(prevDate, targetDateStr);

      // 3. Reset daily tasks, habits, and wellness for the new day
      this.resetDailyState(targetDateStr);

      // 4. Trigger awakening celebration modal
      this.triggerAwakeningCelebration(prevDate, targetDateStr);
    }
  }

  archiveDay(dateStr) {
    if (!this.routine || !this.routine.tasks) return;
    const total = this.routine.tasks.length;
    const completed = this.routine.tasks.filter(t => t.completed).length;
    const completionPct = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const habitsTotal = Object.keys(this.quickHabits || {}).length || 5;
    const habitsDone = Object.values(this.quickHabits || {}).filter(Boolean).length;
    const waterGlasses = window.wellnessSentinel ? window.wellnessSentinel.waterGlasses : 0;
    const focusMins = this.todayFocusMinutes || 0;
    const aura = this.calculateAuraScore();

    this.dailyHistory[dateStr] = {
      date: dateStr,
      tasksCompleted: completed,
      totalTasks: total,
      completionRate: completionPct,
      habitsDone: habitsDone,
      habitsTotal: habitsTotal,
      waterGlasses: waterGlasses,
      focusMinutes: focusMins,
      auraScore: aura.score,
      auraTier: aura.tierName,
      timestamp: Date.now()
    };

    try {
      localStorage.setItem('aura_daily_history', JSON.stringify(this.dailyHistory));
    } catch (e) {
      console.warn('Failed to save daily history', e);
    }
  }

  evaluateStreakContinuity(prevDateStr, newDateStr) {
    const prevEntry = this.dailyHistory[prevDateStr];
    const prevDate = new Date(prevDateStr);
    const newDate = new Date(newDateStr);
    const diffDays = Math.round((newDate - prevDate) / (1000 * 60 * 60 * 24));

    if (window.gamification) {
      const metCriteria = prevEntry ? (prevEntry.completionRate >= 35 || prevEntry.tasksCompleted >= 3 || prevEntry.habitsDone >= 3) : false;

      if (diffDays === 1) {
        if (metCriteria) {
          window.gamification.streak++;
        } else {
          // Missed yesterday but only 1 day gap: Golden Rule #1 Grace Period!
          if (window.notificationEngine) {
            window.notificationEngine.notify('Rule #1 Active: Never Miss 2 Days', {
              body: 'Yesterday was incomplete! Protect your streak & identity by conquering today\'s routine.',
              soundType: 'alert'
            });
          }
        }
      } else if (diffDays > 1) {
        // Missed 2+ consecutive days
        window.gamification.streak = 1;
      }
      window.gamification.lastActiveDate = new Date().toDateString();
      window.gamification.saveState();
      window.gamification.renderHeaderUI();
    }
  }

  resetDailyState(newDateStr) {
    // The user requested to NOT reset the routine automatically on a new day.
    // if (this.routine && this.routine.tasks) {
    //   this.routine.tasks.forEach(t => t.completed = false);
    //   this.saveRoutine();
    // }

    // Reset quick habits
    this.quickHabits = { wake: false, workout: false, read: false, speech: false, phone: false };
    try {
      localStorage.setItem('aura_quick_habits_state', JSON.stringify(this.quickHabits));
    } catch (e) {}

    // Reset wellness sentinel
    if (window.wellnessSentinel) {
      window.wellnessSentinel.resetDailyWellness(newDateStr);
    }

    // Reset today's focus minutes
    this.todayFocusMinutes = 0;
    try {
      localStorage.setItem(`aura_daily_focus_${newDateStr}`, '0');
    } catch (e) {}

    // Set new active date
    this.activeDate = newDateStr;
    try {
      localStorage.setItem('aura_active_date', newDateStr);
    } catch (e) {}

    this.render();
  }

  triggerAwakeningCelebration(prevDateStr, newDateStr) {
    const modal = document.getElementById('dailyRolloverModal');
    if (!modal) return;

    const prevEntry = this.dailyHistory[prevDateStr];
    const prevAura = prevEntry ? `${prevEntry.auraScore}% ${prevEntry.auraTier}` : 'Fresh Schedule';
    const streak = window.gamification ? window.gamification.streak : 1;

    const dateTitle = document.getElementById('awakeningDateTitle');
    const yesterdayAura = document.getElementById('awakeningYesterdayAura');
    const streakVal = document.getElementById('awakeningStreakVal');

    if (dateTitle) dateTitle.textContent = `${this.formatDisplayDate(newDateStr)} • Schedule Refreshed`;
    if (yesterdayAura) yesterdayAura.textContent = prevAura;
    if (streakVal) streakVal.textContent = `🔥 ${streak} Days Active`;

    modal.classList.add('active');
    if (window.soundEngine) window.soundEngine.play('complete');
    if (window.confetti) {
      try {
        window.confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
    }
  }

  calculateAuraScore() {
    const totalTasks = this.routine?.tasks?.length || 0;
    const completedTasks = this.routine?.tasks?.filter(t => t.completed).length || 0;
    const taskScore = totalTasks > 0 ? (completedTasks / totalTasks) * 40 : 0;

    const habitKeys = Object.keys(this.quickHabits || {});
    const totalHabits = habitKeys.length || 5;
    const completedHabits = habitKeys.filter(k => !!this.quickHabits[k]).length;
    const habitScore = totalHabits > 0 ? (completedHabits / totalHabits) * 20 : 0;

    const waterGlasses = window.wellnessSentinel ? window.wellnessSentinel.waterGlasses : 0;
    const waterScore = Math.min(1, waterGlasses / 8) * 15;

    const focusMins = this.todayFocusMinutes || 0;
    const focusScore = Math.min(1, focusMins / 60) * 15;

    const eyeBreaks = window.wellnessSentinel ? (window.wellnessSentinel.eyeBreaksTaken || 0) : 0;
    const posture = window.wellnessSentinel ? (window.wellnessSentinel.postureStretches || 0) : 0;
    const bioScore = Math.min(1, (eyeBreaks + posture) / 4) * 10;

    const totalScore = Math.min(100, Math.round(taskScore + habitScore + waterScore + focusScore + bioScore));

    let tierName = 'Dormant Aura';
    let tierClass = 'dormant';
    let tierIcon = '🌑';

    if (totalScore >= 90) {
      tierName = 'Ascendant Grandmaster';
      tierClass = 'ascendant';
      tierIcon = '👑';
    } else if (totalScore >= 75) {
      tierName = 'Astral Aura';
      tierClass = 'astral';
      tierIcon = '🔮';
    } else if (totalScore >= 50) {
      tierName = 'Radiant Aura';
      tierClass = 'radiant';
      tierIcon = '🌟';
    } else if (totalScore >= 25) {
      tierName = 'Awakened Aura';
      tierClass = 'awakened';
      tierIcon = '⚡';
    }

    return {
      score: totalScore,
      tierName,
      tierClass,
      tierIcon,
      breakdown: {
        taskPct: Math.round(taskScore / 40 * 100),
        taskVal: `${completedTasks}/${totalTasks}`,
        habitPct: Math.round(habitScore / 20 * 100),
        habitVal: `${completedHabits}/${totalHabits}`,
        waterPct: Math.round(waterScore / 15 * 100),
        waterVal: `${waterGlasses}/8`,
        focusPct: Math.round(focusScore / 15 * 100),
        focusVal: `${focusMins}m`,
        bioPct: Math.round(bioScore / 10 * 100),
        bioVal: `${eyeBreaks + posture}/4`
      }
    };
  }

  renderDailyHUD() {
    const aura = this.calculateAuraScore();

    // 1. Topbar Date & Aura badge
    const topbarDate = document.getElementById('topbarCurrentDateDisplay');
    const topbarAura = document.getElementById('topbarAuraScoreBadge');
    if (topbarDate) topbarDate.textContent = `Today • ${this.formatDisplayDate(this.activeDate)}`;
    if (topbarAura) topbarAura.textContent = `⚡ ${aura.score}% ${aura.tierName.split(' ')[0]}`;

    // 2. Hero Aura Rating
    const heroAura = document.getElementById('heroAuraScoreVal');
    if (heroAura) heroAura.textContent = `${aura.score}% ${aura.tierName.split(' ')[0]}`;

    // 3. Compute dynamic study time
    let completedStudyMins = 0;
    if (this.routine && this.routine.tasks) {
      this.routine.tasks.forEach(t => {
        if (t.completed) {
          completedStudyMins += this.calculateDurationMinutes(t.startTime, t.endTime);
        }
      });
    }
    completedStudyMins += (this.todayFocusMinutes || 0);

    const sH = Math.floor(completedStudyMins / 60);
    const sM = completedStudyMins % 60;
    const studyTimeStr = `${sH}h ${sM < 10 ? '0' : ''}${sM}m`;

    const heroStudy = document.getElementById('heroStudyTimeVal');
    const qsStudyTime = document.getElementById('quickStatsStudyTime');
    if (heroStudy) heroStudy.textContent = studyTimeStr;
    if (qsStudyTime) qsStudyTime.textContent = studyTimeStr;

    // 4. Update Daily Modal if active
    const modalAuraPct = document.getElementById('dailyModalAuraPct');
    const modalAuraCircle = document.getElementById('dailyModalAuraCircle');
    const modalAuraBadge = document.getElementById('dailyModalAuraTierBadge');
    const modalAuraDesc = document.getElementById('dailyModalAuraDesc');
    const modalDate = document.getElementById('dailyModalCurrentDate');
    const modalStreak = document.getElementById('dailyModalStreakText');

    if (modalAuraPct) modalAuraPct.textContent = `${aura.score}%`;
    if (modalAuraCircle) {
      const offset = 264 - (264 * aura.score) / 100;
      modalAuraCircle.style.strokeDashoffset = offset;
    }
    if (modalAuraBadge) {
      modalAuraBadge.className = `aura-tier-badge ${aura.tierClass}`;
      modalAuraBadge.textContent = `${aura.tierIcon} ${aura.tierName}`;
    }
    if (modalDate) modalDate.textContent = `Active Date: ${this.formatDisplayDate(this.activeDate)} (${this.activeDate})`;
    if (modalStreak && window.gamification) modalStreak.textContent = `🔥 ${window.gamification.streak}-Day Streak`;

    // Breakdown bars
    const b = aura.breakdown;
    this.updateBreakdownUI('Task', b.taskVal, b.taskPct);
    this.updateBreakdownUI('Habit', b.habitVal, b.habitPct);
    this.updateBreakdownUI('Water', b.waterVal, b.waterPct);
    this.updateBreakdownUI('Focus', b.focusVal, b.focusPct);
    this.updateBreakdownUI('Bio', b.bioVal, b.bioPct);

    // 5. Update AuraBrain Cognitive Intelligence across views
    this.updateAuraBrainAdvice();
  }

  updateBreakdownUI(key, val, pct) {
    const valElem = document.getElementById(`breakdown${key}Val`);
    const pctElem = document.getElementById(`breakdown${key}Pct`);
    const fillElem = document.getElementById(`breakdown${key}Fill`);
    if (valElem) valElem.textContent = val;
    if (pctElem) pctElem.textContent = `${pct}%`;
    if (fillElem) fillElem.style.width = `${pct}%`;
  }

  // =========================================================================
  // AURABRAIN COGNITIVE INTELLIGENCE & HISTORY MEMORY ENGINE
  // =========================================================================
  getAuraBrainIntelligence() {
    const historyKeys = Object.keys(this.dailyHistory || {});
    const recordedDaysCount = historyKeys.length;

    // Calculate 7-day consistency average
    const past7Keys = historyKeys.slice(-7);
    let consistencyPct = 100;
    let totalLifetimeTasks = 0;
    let totalLifetimeHours = 0;

    historyKeys.forEach(k => {
      const day = this.dailyHistory[k];
      if (day) {
        totalLifetimeTasks += (day.tasksCompleted || 0);
        totalLifetimeHours += ((day.focusMinutes || 0) / 60);
      }
    });

    if (past7Keys.length > 0) {
      const sumCompletion = past7Keys.reduce((acc, k) => {
        const item = this.dailyHistory[k];
        return acc + (item ? (item.completionRate || 0) : 0);
      }, 0);
      consistencyPct = Math.round(sumCompletion / past7Keys.length);
    }

    // Contextual Real-Time Cognitive Advice
    const currentHour = new Date().getHours();
    const liveAura = this.calculateAuraScore();
    const tasksDone = this.routine?.tasks?.filter(t => t.completed).length || 0;
    const totalTasks = this.routine?.tasks?.length || 1;
    const completionRatio = tasksDone / totalTasks;

    let advice = "AuraBrain is analyzing your daily routine patterns. Maintain high focus momentum.";
    let statusBadge = "⚡ Memory Synced";

    if (currentHour >= 5 && currentHour < 10) {
      if (tasksDone === 0) {
        advice = "🌅 Early morning window open. Conquer your first 2 routine blocks now to lock in effortless daily momentum.";
        statusBadge = "⚡ Morning Ignition";
      } else {
        advice = "🚀 Stellar morning start! You've already conquered early slots. Protect this energy heading into deep focus.";
        statusBadge = "🔥 Momentum High";
      }
    } else if (currentHour >= 10 && currentHour < 15) {
      if (completionRatio < 0.25) {
        advice = "🎯 Midday calibration: Eliminate distractions and execute your core AI/ML or study blocks before afternoon fatigue.";
        statusBadge = "🎯 Prime Focus Block";
      } else {
        advice = "⚡ Strong velocity detected! Stay hydrated and keep shadowing English audio between your coding sprints.";
        statusBadge = "⚡ Deep Flow Active";
      }
    } else if (currentHour >= 15 && currentHour < 20) {
      if (completionRatio >= 0.6) {
        advice = "🌟 High performance trajectory! You are well on pace for Astral or Ascendant Tier aura today.";
        statusBadge = "🌟 High Trajectory";
      } else {
        advice = "⏳ Evening sprint window: Complete remaining speech recordings and notes to defend your daily streak.";
        statusBadge = "⏳ Evening Recovery";
      }
    } else {
      // Night 8 PM - 4 AM
      if (liveAura.score >= 70) {
        advice = "👑 Masterful day completed! Transition smoothly into sleep wind-down to secure 7.5h deep neural restoration.";
        statusBadge = "👑 Day Mastered";
      } else {
        advice = "🌙 Wind down & reflect: Golden Rule #2 states sleep is cognitive fuel. Rest up and attack tomorrow fresh at 5:00 AM.";
        statusBadge = "🌙 Rest & Recover";
      }
    }

    // Special check for yesterday missed (Rule #1)
    const base = new Date(this.activeDate);
    base.setDate(base.getDate() - 1);
    const yesterdayStr = this.getTodayDateString(base);
    const yDay = this.dailyHistory[yesterdayStr];
    if (yDay && yDay.completionRate < 35 && tasksDone < 2) {
      advice = "⚠️ Golden Rule #1 Alert: 'Never miss two days in a row.' Today is your rebound day — execute without hesitation!";
      statusBadge = "⚠️ Rebound Shield";
    }

    return {
      consistencyPct,
      recordedDaysCount,
      totalLifetimeTasks,
      totalLifetimeHours: Math.round(totalLifetimeHours * 10) / 10,
      advice,
      statusBadge
    };
  }

  updateAuraBrainAdvice() {
    const intel = this.getAuraBrainIntelligence();

    // 1. Home Banner
    const homeAdvice = document.getElementById('homeBrainAdviceText');
    const homeBadge = document.getElementById('homeBrainStatusBadge');
    const homeConsistency = document.getElementById('homeBrainConsistencyVal');
    if (homeAdvice) homeAdvice.textContent = intel.advice;
    if (homeBadge) homeBadge.textContent = intel.statusBadge;
    if (homeConsistency) homeConsistency.textContent = `${intel.consistencyPct}%`;

    // 2. Modal Intel Card
    const modalAdvice = document.getElementById('modalBrainAdviceText');
    const modalBadge = document.getElementById('modalBrainStatusBadge');
    const modalConsistency = document.getElementById('modalBrainConsistencyVal');
    const modalDays = document.getElementById('modalBrainDaysMemoryVal');
    const modalLifetime = document.getElementById('modalBrainLifetimeTasksVal');
    if (modalAdvice) modalAdvice.textContent = intel.advice;
    if (modalBadge) modalBadge.textContent = intel.statusBadge;
    if (modalConsistency) modalConsistency.textContent = `${intel.consistencyPct}%`;
    if (modalDays) modalDays.textContent = `${intel.recordedDaysCount} Days`;
    if (modalLifetime) modalLifetime.textContent = `${intel.totalLifetimeTasks} Done`;

    // 3. Profile Memory Card
    const profileAdvice = document.getElementById('profileBrainAdviceText');
    const profileBadge = document.getElementById('profileBrainStatusBadge');
    const profileConsistency = document.getElementById('profileBrainConsistencyVal');
    const profileDays = document.getElementById('profileBrainDaysVal');
    const profileTasks = document.getElementById('profileBrainTasksVal');
    if (profileAdvice) profileAdvice.textContent = intel.advice;
    if (profileBadge) profileBadge.textContent = intel.statusBadge;
    if (profileConsistency) profileConsistency.textContent = `${intel.consistencyPct}%`;
    if (profileDays) profileDays.textContent = `${intel.recordedDaysCount} Days`;
    if (profileTasks) profileTasks.textContent = `${intel.totalLifetimeTasks} Tasks`;
  }

  inspectPastDay(dateStr) {
    const box = document.getElementById('dailyHistoryInspectorBox');
    const title = document.getElementById('inspectorDateTitle');
    const grid = document.getElementById('inspectorGridContent');
    if (!box || !title || !grid) return;

    const isToday = dateStr === this.activeDate;
    let data = null;

    if (isToday) {
      const aura = this.calculateAuraScore();
      const completedTasks = this.routine?.tasks?.filter(t => t.completed).length || 0;
      const totalTasks = this.routine?.tasks?.length || 0;
      const habitsDone = Object.values(this.quickHabits || {}).filter(Boolean).length;
      const habitsTotal = Object.keys(this.quickHabits || {}).length || 5;
      const water = window.wellnessSentinel ? window.wellnessSentinel.waterGlasses : 0;
      const focus = this.todayFocusMinutes || 0;

      data = {
        date: dateStr,
        tasksCompleted: completedTasks,
        totalTasks: totalTasks,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        habitsDone: habitsDone,
        habitsTotal: habitsTotal,
        waterGlasses: water,
        focusMinutes: focus,
        auraScore: aura.score,
        auraTier: `${aura.tierIcon} ${aura.tierName}`
      };
    } else {
      data = this.dailyHistory[dateStr];
    }

    if (!data) {
      title.textContent = `📅 ${this.formatDisplayDate(dateStr)} (${dateStr})`;
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 0.75rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">
          No historical activity logged for this day.
        </div>
      `;
      box.style.display = 'block';
      return;
    }

    title.textContent = `📅 ${isToday ? 'Today: ' : ''}${this.formatDisplayDate(dateStr)} (${dateStr}) Performance Breakdown`;
    grid.innerHTML = `
      <div class="history-stat-bubble">
        <span class="lbl">Aura Energy</span>
        <span class="val" style="color: #38BDF8;">${data.auraScore}%</span>
      </div>
      <div class="history-stat-bubble">
        <span class="lbl">Aura Tier</span>
        <span class="val" style="font-size:0.75rem; color: #C084FC;">${data.auraTier}</span>
      </div>
      <div class="history-stat-bubble">
        <span class="lbl">Routine Tasks</span>
        <span class="val">${data.tasksCompleted}/${data.totalTasks} (${data.completionRate}%)</span>
      </div>
      <div class="history-stat-bubble">
        <span class="lbl">Daily Habits</span>
        <span class="val">${data.habitsDone}/${data.habitsTotal}</span>
      </div>
      <div class="history-stat-bubble">
        <span class="lbl">Hydration Log</span>
        <span class="val" style="color: #22D3EE;">${data.waterGlasses} Glasses (${Math.round(data.waterGlasses * 0.25 * 10) / 10}L)</span>
      </div>
      <div class="history-stat-bubble">
        <span class="lbl">Focus Studio</span>
        <span class="val" style="color: #EC4899;">${data.focusMinutes || 0} mins</span>
      </div>
    `;

    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  openDailyControlModal() {
    this.renderDailyHUD();
    this.renderDailyHistoryStrip();
    document.getElementById('dailyControlModal')?.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }

  renderDailyHistoryStrip() {
    const container = document.getElementById('dailyHistoryStripRow');
    if (!container) return;

    const dates = [];
    const base = new Date(this.activeDate);
    for (let i = 13; i >= 0; i--) {
      const d = new Date(base);
      d.setDate(base.getDate() - i);
      dates.push(this.getTodayDateString(d));
    }

    container.innerHTML = dates.map(dateStr => {
      const isToday = dateStr === this.activeDate;
      const entry = this.dailyHistory[dateStr];
      const displayDate = this.formatDisplayDate(dateStr);
      const dayParts = displayDate.split(', ');
      const dayName = dayParts[0] || 'Day';
      const dayNum = dayParts[1] || dateStr.slice(5);

      if (isToday) {
        const aura = this.calculateAuraScore();
        return `
          <div class="history-strip-card today" style="cursor: pointer;" onclick="window.app.inspectPastDay('${dateStr}')" title="Active Day: ${dateStr} (Click to inspect)">
            <span class="history-day-name">Today</span>
            <span class="history-day-date">${dayNum}</span>
            <span class="history-day-aura-score" style="background: rgba(34, 211, 238, 0.2); color: #38BDF8;">${aura.score}%</span>
          </div>
        `;
      }

      if (entry) {
        return `
          <div class="history-strip-card" style="cursor: pointer;" onclick="window.app.inspectPastDay('${dateStr}')" title="${dateStr}: ${entry.tasksCompleted}/${entry.totalTasks} Tasks, ${entry.auraScore}% Aura (${entry.auraTier})">
            <span class="history-day-name">${dayName}</span>
            <span class="history-day-date">${dayNum}</span>
            <span class="history-day-aura-score" style="background: rgba(112, 71, 255, 0.2); color: #C084FC;">${entry.auraScore}%</span>
          </div>
        `;
      }

      return `
        <div class="history-strip-card" style="opacity: 0.45; cursor: pointer;" onclick="window.app.inspectPastDay('${dateStr}')" title="${dateStr}: No recorded activity">
          <span class="history-day-name">${dayName}</span>
          <span class="history-day-date">${dayNum}</span>
          <span class="history-day-aura-score" style="color: var(--text-muted);">-</span>
        </div>
      `;
    }).join('');
  }

  simulateNextDay() {
    const curr = new Date(this.activeDate);
    curr.setDate(curr.getDate() + 1);
    const nextDateStr = this.getTodayDateString(curr);
    this.checkDailyRollover(nextDateStr);
    document.getElementById('dailyControlModal')?.classList.remove('active');
    this.showToast('Simulated Next Day', `Advanced cycle to ${this.formatDisplayDate(nextDateStr)}`, "next_activity");
  }

  forceResetToday() {
    this.resetDailyActivities();
  }

  // =========================================================================
  // PROFILE & SYSTEM RESET SUITE ACTIONS
  // =========================================================================
  resetDailyActivities() {
    if (confirm("Reset all of today's activities? (Tasks, habits, hydration, and focus timers will be reset to 0% for today without losing your streaks or history).")) {
      this.resetDailyState(this.activeDate);
      this.render();
      if (window.soundEngine) window.soundEngine.play('complete');
      this.showToast("Today's Activities Reset", "All checkmarks, habits, and hydration reset to 0% for a fresh restart.", "delete");
      this.renderDailyHUD();
    }
  }

  resetGamificationStats() {
    if (confirm("Reset all gamification progression? (Your Level will reset to Level 1, XP to 0, and Streaks to 1. Your routine schedule will remain intact).")) {
      if (window.gamification) {
        window.gamification.xp = 0;
        window.gamification.level = 1;
        window.gamification.streak = 1;
        window.gamification.badges = [];
        window.gamification.history = [];
        window.gamification.saveState();
        window.gamification.renderHeaderUI();
      }
      try {
        localStorage.removeItem('aura_gamification');
      } catch (e) {}
      this.renderProfileView();
      if (window.soundEngine) window.soundEngine.play('complete');
      this.showToast("Progression Reset", "Gamification Level 1 (0 XP) restored.", "warning");
    }
  }

  clearHistoryArchive() {
    if (confirm("Purge AuraBrain memory archive? (All past daily history snapshots and 14-day consistency archives will be permanently deleted).")) {
      this.dailyHistory = {};
      try {
        localStorage.removeItem('aura_daily_history');
      } catch (e) {}
      this.renderDailyHistoryStrip();
      this.updateAuraBrainAdvice();
      const box = document.getElementById('dailyHistoryInspectorBox');
      if (box) box.style.display = 'none';
      if (window.soundEngine) window.soundEngine.play('complete');
      this.showToast("Memory Archive Cleared", "AuraBrain history has been wiped clean.", "delete");
    }
  }

  masterFactoryReset() {
    const confirmation = prompt("⚠️ MASTER FACTORY RESET: This will wipe ALL custom tasks, saved notes, custom vocabulary, user profile customizations, history, and wellness data back to the clean original install state.\n\nType 'RESET' to confirm:");
    if (confirmation === 'RESET' || confirmation === 'reset') {
      try {
        localStorage.clear();
      } catch (e) {}
      if (window.soundEngine) window.soundEngine.play('complete');
      alert("AuraRoutine Operating System has been reset to factory defaults. Refreshing platform...");
      window.location.reload();
    } else if (confirmation !== null) {
      alert("Reset cancelled. Confirmation phrase did not match.");
    }
  }

  exportDataBackup() {
    const backupData = {
      version: '3.0',
      appName: 'AuraRoutine',
      exportDate: new Date().toISOString(),
      activeDate: this.activeDate,
      routine: this.routine,
      quickHabits: this.quickHabits,
      dailyHistory: this.dailyHistory,
      userProfile: this.userProfile,
      gamification: localStorage.getItem('aura_gamification'),
      wellness: localStorage.getItem('aura_wellness_data'),
      englishSentences: localStorage.getItem('aura_english_sentences'),
      customVocab: localStorage.getItem('aura_custom_vocab')
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auraroutine-backup-${this.activeDate}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Backup Exported', 'AuraRoutine JSON data archive saved.', "success");
  }

  triggerImportData() {
    document.getElementById('dataBackupFileInput')?.click();
  }

  handleImportData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.routine) {
          this.routine = data.routine;
          this.saveRoutine();
        }
        if (data.quickHabits) {
          this.quickHabits = data.quickHabits;
          localStorage.setItem('aura_quick_habits_state', JSON.stringify(this.quickHabits));
        }
        if (data.dailyHistory) {
          this.dailyHistory = data.dailyHistory;
          localStorage.setItem('aura_daily_history', JSON.stringify(this.dailyHistory));
        }
        if (data.activeDate) {
          this.activeDate = data.activeDate;
          localStorage.setItem('aura_active_date', this.activeDate);
        }
        if (data.userProfile) {
          this.userProfile = data.userProfile;
          localStorage.setItem('aura_user_profile', JSON.stringify(this.userProfile));
        }
        if (data.gamification) {
          localStorage.setItem('aura_gamification', typeof data.gamification === 'string' ? data.gamification : JSON.stringify(data.gamification));
          if (window.gamification) window.gamification.loadState();
        }
        if (data.wellness) {
          localStorage.setItem('aura_wellness_data', typeof data.wellness === 'string' ? data.wellness : JSON.stringify(data.wellness));
          if (window.wellnessSentinel) window.wellnessSentinel.loadState();
        }
        this.render();
        if (window.soundEngine) window.soundEngine.play('complete');
        this.showToast('Data Restored', 'All routine, habit, and history data successfully imported.', "success");
        document.getElementById('dailyControlModal')?.classList.remove('active');
      } catch (err) {
        console.error('Import failed', err);
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  }

  calculateDuration(startTime, endTime) {
    if (!startTime || !endTime) return '30m';
    const [sH, sM] = startTime.split(':').map(Number);
    const [eH, eM] = endTime.split(':').map(Number);
    let diff = (eH * 60 + eM) - (sH * 60 + sM);
    if (diff < 0) diff += 1440;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  }

  calculateDurationMinutes(startTime, endTime) {
    if (!startTime || !endTime) return 30;
    const [sH, sM] = startTime.split(':').map(Number);
    const [eH, eM] = endTime.split(':').map(Number);
    let diff = (eH * 60 + eM) - (sH * 60 + sM);
    if (diff < 0) diff += 1440;
    return diff;
  }

  formatTime12h(time24) {
    if (!time24) return '';
    const [hStr, mStr] = time24.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr || '00';
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return `${h}:${m} ${ampm}`;
  }

  setupEventListeners() {
    // Navigation items
    document.querySelectorAll('.nav-view-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        const id = e.currentTarget.id;
        if (id === 'navItemNotes') {
          this.switchView('englishView', 'panelVocab');
        } else if (id === 'navItemResources') {
          this.switchView('englishView', 'panelReading');
        } else if (view) {
          this.switchView(view);
        }
      });
    });

    // Mobile Hamburger + Sidebar Drawer Controls
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    const appSidebar = document.getElementById('appSidebar');
    const sidebarBackdrop = document.getElementById('sidebarBackdrop');

    const openMobileSidebar = () => {
      appSidebar?.classList.add('mobile-open');
      sidebarBackdrop?.classList.add('active');
      mobileMenuBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeMobileSidebar = () => {
      appSidebar?.classList.remove('mobile-open');
      sidebarBackdrop?.classList.remove('active');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileMenuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (appSidebar?.classList.contains('mobile-open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });

    sidebarCloseBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileSidebar();
    });

    sidebarBackdrop?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileSidebar();
    });

    // Auto-close sidebar on nav item click or user card click (mobile)
    document.querySelectorAll('.app-sidebar .nav-item, .app-sidebar .sidebar-brand, .sidebar-user-card').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.innerWidth <= 1024) closeMobileSidebar();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && appSidebar?.classList.contains('mobile-open')) {
        closeMobileSidebar();
      }
    });

    // Expose drawer controls
    this.openSidebar = openMobileSidebar;
    this.closeSidebar = closeMobileSidebar;

    // Theme Toggle
    document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Audio & Alerts
    document.getElementById('soundToggleBtn')?.addEventListener('click', () => this.toggleSound());
    document.getElementById('notifyPermBtn')?.addEventListener('click', () => this.toggleNotifications());
    window.addEventListener('notification-state-changed', () => this.updateHeaderButtonBadges());

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

    // In-app toast listener with type support
    window.addEventListener('in-app-toast', (e) => {
      this.showToast(e.detail.title, e.detail.body, e.detail.type || 'info', false);
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

    // Backup File Import Listener
    document.getElementById('dataBackupFileInput')?.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        this.handleImportData(file);
        e.target.value = '';
      }
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
          this.showToast("PDF Routine Imported!", `Loaded ${parsedTasks.length} tasks from ${file.name}`, "success");
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
        const firstName = this.userProfile?.name ? this.userProfile.name.split(' ')[0] : 'Scholar';
        greetingElem.textContent = `Good ${period}, ${firstName}!`;
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
      const isFirstLoad = this.lastNotifiedTaskId === null;
      this.lastNotifiedTaskId = matched.task.id;
      if (!isFirstLoad && window.notificationEngine) {
        window.notificationEngine.notify(`Next Activity: ${matched.task.activity}`, {
          body: `Time: ${matched.task.timeDisplay} | Goal: ${matched.task.goal}`,
          soundType: 'next_activity',
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
      completeBtn.innerHTML = task.completed ? '<i data-lucide="check-check" class="btn-icon-svg"></i> Completed' : '<i data-lucide="check" class="btn-icon-svg"></i> Mark Completed';
      completeBtn.classList.toggle('completed', task.completed);
      if (window.lucide) window.lucide.createIcons();
    }
  }

  completeCurrentSlot() {
    if (this.activeTask) {
      this.toggleTask(this.activeTask.id);
      if (window.soundEngine) window.soundEngine.play('next_activity');
      this.showToast('Next Activity Connected', `Moved to the next block in schedule.`, 'next_activity');
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
            <span class="timeline-time-val"><i data-lucide="clock" class="pill-icon-svg"></i>${startTimeFormatted}</span>
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
              <div class="task-card-actions-group">
                <button class="task-check-circle" onclick="window.app.toggleTask('${task.id}')" title="Mark as done">
                  ${task.completed ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
    if (window.lucide) window.lucide.createIcons();
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

    if (this.routineCategoryFilter && this.routineCategoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category.toLowerCase() === this.routineCategoryFilter.toLowerCase());
    }

    if (this.searchQuery) {
      filtered = filtered.filter(t =>
        t.activity.toLowerCase().includes(this.searchQuery) ||
        t.goal.toLowerCase().includes(this.searchQuery) ||
        t.timeDisplay.toLowerCase().includes(this.searchQuery)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-xl); border: 1px dashed var(--border-subtle); margin: 0.5rem 0;">
          <p style="font-size: 1.05rem; color: #FFFFFF; margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <i data-lucide="search" class="svg-icon"></i> No tasks found
          </p>
          <p style="font-size: 0.8rem; margin-bottom: 1rem;">No tasks match the active filter or search term.</p>
          <button class="btn-primary" onclick="window.app.filterRoutineCategory('all')" style="display: inline-block;">Reset Filter</button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map((task, idx) => {
      const borderClass = this.getCategoryBorderClass(task.category);
      const catClass = (task.category || 'daily').toLowerCase().replace(/[^a-z0-9]/g, '');
      const duration = this.calculateDuration(task.startTime, task.endTime);
      const startTimeFormatted = this.formatTime12h(task.startTime);

      return `
        <div class="timeline-item-row">
          <div class="timeline-time-meta">
            <span class="timeline-time-val"><i data-lucide="clock" class="pill-icon-svg"></i>${startTimeFormatted}</span>
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
              <span class="task-xp-pill">+${task.xp} XP</span>
              <div class="task-card-actions-group">
                <button class="task-check-circle" onclick="window.app.toggleTask('${task.id}')" title="${task.completed ? 'Mark pending' : 'Mark completed'}">
                  ${task.completed ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                </button>
                <button class="date-nav-btn" onclick="window.app.editTask('${task.id}')" title="Edit Task"><i data-lucide="pencil" class="svg-icon"></i></button>
                <button class="date-nav-btn" onclick="window.app.deleteTask('${task.id}')" title="Delete Task"><i data-lucide="trash-2" class="svg-icon"></i></button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
    if (window.lucide) window.lucide.createIcons();
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
      this.showToast('100% Day Conquered!', 'Incredible discipline! All routine tasks completed.', "levelUp");
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

    // Dynamic Computational Study Time
    let completedStudyMins = 0;
    this.routine.tasks.forEach(t => {
      if (t.completed) {
        completedStudyMins += this.calculateDurationMinutes(t.startTime, t.endTime);
      }
    });
    completedStudyMins += (this.todayFocusMinutes || 0);
    const sH = Math.floor(completedStudyMins / 60);
    const sM = completedStudyMins % 60;
    const studyTimeStr = `${sH}h ${sM < 10 ? '0' : ''}${sM}m`;

    // Hero Stats
    const heroStudy = document.getElementById('heroStudyTimeVal');
    const heroPending = document.getElementById('heroPendingTasksVal');
    const heroGoal = document.getElementById('heroDailyGoalVal');

    if (heroStudy) heroStudy.textContent = studyTimeStr;
    if (heroPending) heroPending.textContent = `${pending} Tasks`;
    if (heroGoal) heroGoal.textContent = `${completed}/${Math.max(5, Math.ceil(total / 2))}`;

    // Quick Stats Cards
    const qsCompleted = document.getElementById('quickStatsCompleted');
    const qsPending = document.getElementById('quickStatsPending');
    const qsStudyTime = document.getElementById('quickStatsStudyTime');
    const qsWeeklyGoal = document.getElementById('quickStatsWeeklyGoal');

    if (qsCompleted) qsCompleted.textContent = completed;
    if (qsPending) qsPending.textContent = pending;
    if (qsStudyTime) qsStudyTime.textContent = studyTimeStr;
    if (qsWeeklyGoal) qsWeeklyGoal.textContent = `${Math.min(100, Math.max(20, pct + 35))}%`;

    // Timeline count pill
    const countPill = document.getElementById('timelineTasksCountPill');
    if (countPill) countPill.textContent = `${total} tasks • ${studyTimeStr}`;

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
    this.renderStudyPlanHabits();
    this.renderQuickHabits();
    this.renderDailyHUD();

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
    if (playBtn) {
      playBtn.innerHTML = '<i data-lucide="play" class="svg-icon"></i>';
      if (window.lucide) window.lucide.createIcons();
    }

    this.updateDashboardTimerUI();
  }

  toggleDashboardTimer() {
    const playBtn = document.getElementById('dashboardTimerPlayBtn');

    if (this.isDashboardTimerRunning) {
      clearInterval(this.dashboardTimerInterval);
      this.isDashboardTimerRunning = false;
      if (playBtn) {
        playBtn.innerHTML = '<i data-lucide="play" class="svg-icon"></i>';
        if (window.lucide) window.lucide.createIcons();
      }
      if (window.soundEngine) window.soundEngine.play('timer_pause');
    } else {
      this.isDashboardTimerRunning = true;
      if (playBtn) {
        playBtn.innerHTML = '<i data-lucide="pause" class="svg-icon"></i>';
        if (window.lucide) window.lucide.createIcons();
      }
      if (window.soundEngine) window.soundEngine.play('timer_start');

      this.dashboardTimerInterval = setInterval(() => {
        this.dashboardTimerSeconds--;
        this.updateDashboardTimerUI();

        if (this.dashboardTimerSeconds <= 0) {
          clearInterval(this.dashboardTimerInterval);
          this.isDashboardTimerRunning = false;
          if (playBtn) {
            playBtn.innerHTML = '<i data-lucide="play" class="svg-icon"></i>';
            if (window.lucide) window.lucide.createIcons();
          }
          const focusMinsCompleted = Math.round(this.dashboardTimerTotalSeconds / 60) || 25;
          this.todayFocusMinutes = (this.todayFocusMinutes || 0) + focusMinsCompleted;
          try { localStorage.setItem(`aura_daily_focus_${this.activeDate}`, this.todayFocusMinutes.toString()); } catch (e) {}
          this.renderDailyHUD();
          if (window.soundEngine) window.soundEngine.play('timer_finish');
          if (window.gamification) {
            window.gamification.awardXP(60, 'Focus Session Complete');
            window.gamification.unlockBadge('badge-zen');
          }
          this.showToast("Focus Complete! (+60 XP)", "Magnificent focus block conquered. Time for a restorative break!", "timer_finish", false);
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
        toggleTimerBtn.innerHTML = '<i data-lucide="play" class="btn-icon-svg"></i> Resume';
        if (window.lucide) window.lucide.createIcons();
        if (window.soundEngine) window.soundEngine.play('timer_pause');
      } else {
        this.isFocusTimerRunning = true;
        toggleTimerBtn.innerHTML = '<i data-lucide="pause" class="btn-icon-svg"></i> Pause';
        if (window.lucide) window.lucide.createIcons();
        if (window.soundEngine) window.soundEngine.play('timer_start');
        this.focusTimerInterval = setInterval(() => {
          this.focusSecondsRemaining--;
          this.updateFocusTimerDisplay();
          if (this.focusSecondsRemaining <= 0) {
            clearInterval(this.focusTimerInterval);
            this.isFocusTimerRunning = false;
            this.todayFocusMinutes = (this.todayFocusMinutes || 0) + 25;
            try { localStorage.setItem(`aura_daily_focus_${this.activeDate}`, this.todayFocusMinutes.toString()); } catch (e) {}
            this.renderDailyHUD();
            if (window.soundEngine) window.soundEngine.play('timer_finish');
            if (window.gamification) {
              window.gamification.awardXP(60, 'Completed 25m Focus Block');
              window.gamification.unlockBadge('badge-zen');
            }
            this.showToast("Focus Block Conquered! (+60 XP)", "Outstanding focus session complete. Well done!", "timer_finish", false);
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
      this.showToast("Vocabulary Added!", `"${word}" saved with +40 XP.`, "success");
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
    // Sound Button
    const soundBtn = document.getElementById('soundToggleBtn');
    const soundOn = window.soundEngine ? window.soundEngine.soundEnabled : true;
    if (soundBtn) {
      soundBtn.innerHTML = soundOn ? '<i data-lucide="volume-2" class="svg-icon"></i>' : '<i data-lucide="volume-x" class="svg-icon"></i>';
      soundBtn.title = soundOn ? 'Audio Synthesizer: ON (Click to mute)' : 'Audio Synthesizer: OFF (Click to unmute)';
      soundBtn.classList.toggle('muted', !soundOn);
    }

    // Notification Button
    const notifyBtn = document.getElementById('notifyPermBtn');
    const notifyOn = window.notificationEngine ? window.notificationEngine.enabled : true;
    if (notifyBtn) {
      notifyBtn.innerHTML = notifyOn
        ? '<i data-lucide="bell" class="svg-icon"></i><span class="notification-dot"></span>'
        : '<i data-lucide="bell-off" class="svg-icon"></i>';
      notifyBtn.title = notifyOn ? 'Notifications: ON (Click to turn off)' : 'Notifications: OFF (Click to turn on)';
      notifyBtn.classList.toggle('muted', !notifyOn);
    }

    // Dropdown indicators
    const dropNotifyStatus = document.getElementById('dropdownNotifyStatus');
    const dropSoundStatus = document.getElementById('dropdownSoundStatus');
    if (dropNotifyStatus) dropNotifyStatus.textContent = `Notifs: ${notifyOn ? 'ON' : 'OFF'}`;
    if (dropSoundStatus) dropSoundStatus.textContent = `Audio: ${soundOn ? 'ON' : 'OFF'}`;

    // Profile page toggles if present
    const profNotifyChk = document.getElementById('profileNotificationSwitch');
    const profSoundChk = document.getElementById('profileSoundSwitch');
    const notifBadge = document.getElementById('notifEngineStatusBadge');
    if (profNotifyChk) profNotifyChk.checked = notifyOn;
    if (profSoundChk) profSoundChk.checked = soundOn;
    if (notifBadge) {
      notifBadge.textContent = notifyOn ? '🔔 Sentinel Active (ON)' : '🔕 Muted (OFF)';
      notifBadge.style.color = notifyOn ? 'var(--accent-cyan)' : '#F87171';
      notifBadge.style.borderColor = notifyOn ? 'rgba(34, 211, 238, 0.3)' : 'rgba(239, 68, 68, 0.3)';
    }

    if (window.lucide) window.lucide.createIcons();
  }

  toggleSound(forceState = null) {
    const isEnabled = window.soundEngine ? window.soundEngine.toggleSound(forceState !== null ? forceState : undefined) : true;
    this.updateHeaderButtonBadges();
    this.showToast(isEnabled ? 'Audio Synthesizer Active (ON)' : 'Audio Effects Muted (OFF)', isEnabled ? 'Offline audio chimes, level-ups & cues active.' : 'All acoustic synthesized sound effects are muted.');
  }

  async toggleNotifications(forceState = null) {
    if (window.notificationEngine) {
      const isEnabled = await window.notificationEngine.toggleNotifications(forceState);
      this.updateHeaderButtonBadges();
      if (isEnabled) {
        if (window.soundEngine) window.soundEngine.play('chime');
        this.showToast('Notifications Active (ON)', 'System and in-app routine alerts & bio reminders are ON.');
      } else {
        this.showToast('Notifications Muted (OFF)', 'All notifications, routine alerts & toasts are paused.');
      }
      return isEnabled;
    }
  }

  async requestNotifyPerm() {
    return this.toggleNotifications();
  }

  showToast(title, body, type = 'info', playSound = true) {
    const container = document.getElementById('toastNotificationContainer');
    if (!container) return;

    if (playSound && window.soundEngine) {
      window.soundEngine.play(type);
    }

    const toast = document.createElement('div');
    toast.className = `in-app-toast toast-${type}`;

    const iconMap = {
      task_complete: '<i data-lucide="check-circle-2"></i>',
      complete: '<i data-lucide="check-circle-2"></i>',
      success: '<i data-lucide="check"></i>',
      achievement: '<i data-lucide="trophy"></i>',
      levelUp: '<i data-lucide="award"></i>',
      streak: '<i data-lucide="flame"></i>',
      next_activity: '<i data-lucide="clock"></i>',
      timer_start: '<i data-lucide="play"></i>',
      timer_pause: '<i data-lucide="pause"></i>',
      timer_finish: '<i data-lucide="bell"></i>',
      focus: '<i data-lucide="target"></i>',
      hydration: '<i data-lucide="droplet"></i>',
      waterDrop: '<i data-lucide="droplet"></i>',
      wellness: '<i data-lucide="heart-pulse"></i>',
      eyeRest: '<i data-lucide="eye"></i>',
      rest: '<i data-lucide="eye"></i>',
      posture: '<i data-lucide="activity"></i>',
      warning: '<i data-lucide="alert-triangle"></i>',
      alert: '<i data-lucide="alert-circle"></i>',
      delete: '<i data-lucide="trash-2"></i>',
      error: '<i data-lucide="alert-octagon"></i>',
      awakening: '<i data-lucide="sun"></i>',
      info: '<i data-lucide="info"></i>'
    };
    const iconHtml = iconMap[type] || '<i data-lucide="bell"></i>';

    toast.innerHTML = `
      <div class="toast-indicator"></div>
      <div class="toast-icon-wrap">${iconHtml}</div>
      <div class="toast-content">
        <strong>${title}</strong>
        <p>${body}</p>
      </div>
    `;
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  }

  testNotificationSound(type) {
    if (window.soundEngine) {
      window.soundEngine.play(type);
    }
    const labelMap = {
      task_complete: ['Task Conquered! (+30 XP)', '30-Day Routine schedule block completed.'],
      success: ['Operation Successful', 'Your changes and notes have been saved.'],
      levelUp: ['Level Up / Rank Advance!', 'Earned new progression level & rank badge.'],
      streak: ['Streak Multiplier Active!', 'Daily momentum consistency milestone reached.'],
      next_activity: ['Next Activity Transition', 'Time to start your next scheduled routine slot.'],
      timer_start: ['Focus Timer Initialized', '25-minute deep focus block activated.'],
      timer_finish: ['Focus Session Complete!', 'Great discipline! Time for a restorative break.'],
      waterDrop: ['Hydration Logged (+15 XP)', 'Target: 8 glasses (2.0 Liters) of water.'],
      eyeRest: ['20-20-20 Optic Relief', 'Look 20 feet away to relax ciliary eye muscles.'],
      warning: ['Attention Needed', 'Rule #1 in effect: Never miss two days in a row.'],
      awakening: ['New Day Awakened!', 'Fresh schedule loaded for today.'],
      delete: ['Item Removed', 'Schedule task or note cleared from memory.']
    };
    const info = labelMap[type] || ['Notification Sound Test', `Previewing ${type} acoustic tone.`];
    this.showToast(info[0], info[1], type, false);
  }

  // ==========================================
  // ROUTINE CATEGORY FILTERING & HABITS CHECKLIST
  // ==========================================
  filterRoutineCategory(cat) {
    this.routineCategoryFilter = cat;
    document.querySelectorAll('#routineCategoryChipsBar .category-chip').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === cat);
    });
    this.renderTaskList();
  }

  renderStudyPlanHabits() {
    const list = document.getElementById('studyPlanHabitsList');
    const badge = document.getElementById('studyPlanHabitsPct');
    if (!list || !this.routine) return;

    if (!this.routine.dailyChecklist) {
      const defaultData = typeof DEFAULT_ROUTINE_DATA !== 'undefined' ? DEFAULT_ROUTINE_DATA : null;
      this.routine.dailyChecklist = JSON.parse(JSON.stringify(defaultData?.dailyChecklist || []));
    }

    const habits = this.routine.dailyChecklist;
    const completedCount = habits.filter(h => h.checked).length;
    const pct = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

    if (badge) {
      badge.textContent = `${completedCount}/${habits.length} (${pct}%)`;
    }

    list.innerHTML = habits.map(h => `
      <div class="habit-item-row ${h.checked ? 'checked' : ''}" onclick="window.app.toggleHabitCheck('${h.id}')">
        <div class="habit-chk-box">${h.checked ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</div>
        <span class="habit-text-label">${h.text}</span>
      </div>
    `).join('');
  }

  toggleHabitCheck(habitId) {
    if (!this.routine || !this.routine.dailyChecklist) return;
    const item = this.routine.dailyChecklist.find(h => h.id === habitId);
    if (!item) return;

    item.checked = !item.checked;
    this.saveRoutine();

    if (item.checked) {
      if (window.soundEngine) window.soundEngine.play('complete');
      if (window.gamification) window.gamification.awardXP(15, `Habit: ${item.text}`);
    } else {
      if (window.soundEngine) window.soundEngine.play('tick');
    }

    this.renderStudyPlanHabits();
  }

  // ==========================================
  // THEME & PROFILE DROPDOWN
  // ==========================================
  initTheme() {
    try {
      const savedTheme = localStorage.getItem('aura_theme');
      if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        const btn = document.getElementById('themeToggleBtn');
        if (btn) {
          btn.innerHTML = '<i data-lucide="moon" class="svg-icon"></i>';
          if (window.lucide) window.lucide.createIcons();
        }
      }
    } catch (e) {}
  }

  toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.innerHTML = isLight ? '<i data-lucide="moon" class="svg-icon"></i>' : '<i data-lucide="sun" class="svg-icon"></i>';
      if (window.lucide) window.lucide.createIcons();
    }
    try {
      localStorage.setItem('aura_theme', isLight ? 'light' : 'dark');
    } catch (e) {}
    this.showToast(isLight ? 'Light Theme Activated' : 'Dark Futuristic Mode', isLight ? 'Clean high-contrast daytime mode enabled.' : 'Optimized for high-contrast deep focus.');
  }

  setupProfileDropdown() {
    const badge = document.getElementById('userProfileBadge');
    const dropdown = document.getElementById('userProfileDropdown');
    if (!badge || !dropdown) return;

    badge.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !badge.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  // ==========================================
  // USER PROFILE CONTROLLER & CUSTOMIZATION ENGINE
  // ==========================================
  initUserProfile() {
    const defaultProfile = {
      name: "Aniket Singh",
      role: "AI Engineer & Student",
      bio: "“Discipline today builds the freedom tomorrow.”",
      targetHours: 6.5,
      track: "AI & Machine Learning",
      avatarUrl: "assets/avatar_aniket.jpg",
      github: "github.com/aniketsingh",
      linkedin: "linkedin.com/in/aniketsingh"
    };

    try {
      const saved = localStorage.getItem('aura_user_profile');
      if (saved) {
        this.userProfile = { ...defaultProfile, ...JSON.parse(saved) };
      } else {
        this.userProfile = defaultProfile;
      }
    } catch (e) {
      this.userProfile = defaultProfile;
    }

    this.applyUserProfileEverywhere();
    this.populateProfileForm();
  }

  populateProfileForm() {
    if (!this.userProfile) return;
    const nameIn = document.getElementById('profileNameInput');
    const roleIn = document.getElementById('profileRoleInput');
    const bioIn = document.getElementById('profileBioInput');
    const hoursIn = document.getElementById('profileTargetHoursInput');
    const trackIn = document.getElementById('profileTrackSelect');
    const avatarIn = document.getElementById('profileAvatarUrlInput');
    const githubIn = document.getElementById('profileGithubInput');
    const linkedinIn = document.getElementById('profileLinkedinInput');

    if (nameIn) nameIn.value = this.userProfile.name || '';
    if (roleIn) roleIn.value = this.userProfile.role || '';
    if (bioIn) bioIn.value = this.userProfile.bio || '';
    if (hoursIn) hoursIn.value = this.userProfile.targetHours || 6.5;
    if (trackIn) trackIn.value = this.userProfile.track || 'AI & Machine Learning';
    if (avatarIn) avatarIn.value = this.userProfile.avatarUrl || '';
    if (githubIn) githubIn.value = this.userProfile.github || '';
    if (linkedinIn) linkedinIn.value = this.userProfile.linkedin || '';
  }

  applyUserProfileEverywhere() {
    if (!this.userProfile) return;

    const avatarUrl = this.userProfile.avatarUrl || '';
    const isImageSrc = avatarUrl.startsWith('http') || avatarUrl.startsWith('data:') || avatarUrl.includes('/');

    const setAvatar = (id) => {
      const el = document.getElementById(id);
      if (el && avatarUrl && isImageSrc) el.src = avatarUrl;
    };

    // 1. Topbar Elements
    const topName = document.getElementById('topbarUserName');
    const topRole = document.getElementById('topbarUserRole');
    if (topName) topName.textContent = this.userProfile.name;
    if (topRole) topRole.textContent = this.userProfile.role;
    setAvatar('topbarUserAvatar');

    // 2. Dropdown Elements
    const dropName = document.getElementById('dropdownUserName');
    const dropRole = document.getElementById('dropdownUserRole');
    if (dropName) dropName.textContent = this.userProfile.name;
    if (dropRole) dropRole.textContent = this.userProfile.role;
    setAvatar('dropdownUserAvatar');

    // 3. Sidebar User Card
    const sidebarName = document.getElementById('sidebarUserName');
    const sidebarLevel = document.getElementById('sidebarUserLevel');
    if (sidebarName) sidebarName.textContent = this.userProfile.name;
    if (sidebarLevel) {
      const lvl = (window.gamification && window.gamification.level) || 3;
      sidebarLevel.textContent = `Level ${lvl} Scholar`;
    }
    setAvatar('sidebarUserAvatar');

    // 4. Hero Greeting
    const greetingElem = document.getElementById('heroGreetingText');
    if (greetingElem) {
      const hours = new Date().getHours();
      let period = 'Evening';
      if (hours >= 5 && hours < 12) period = 'Morning';
      else if (hours >= 12 && hours < 17) period = 'Afternoon';
      const firstName = this.userProfile.name.split(' ')[0] || 'Scholar';
      greetingElem.textContent = `Good ${period}, ${firstName}!`;
    }

    // 5. Profile Dashboard Card Elements
    const cardName = document.getElementById('profileCardName');
    const cardRole = document.getElementById('profileCardRole');
    const cardBio = document.getElementById('profileCardBio');
    const cardTrack = document.getElementById('profileCardTrack');
    const hoursDisp = document.getElementById('profileHoursDisplay');

    if (cardName) cardName.textContent = this.userProfile.name;
    if (cardRole) cardRole.textContent = this.userProfile.role;
    if (cardBio) cardBio.textContent = this.userProfile.bio;
    if (cardTrack) cardTrack.textContent = this.userProfile.track;
    if (hoursDisp) hoursDisp.textContent = `${this.userProfile.targetHours || 6.5}h`;

    setAvatar('profileCardAvatar');
    setAvatar('avatarPreviewImg');

    // 6. Hero target hours
    const heroGoal = document.getElementById('heroDailyGoalVal');
    if (heroGoal && this.userProfile.targetHours) {
      heroGoal.textContent = `${this.userProfile.targetHours}h`;
    }
  }

  saveUserProfile() {
    const nameIn = document.getElementById('profileNameInput')?.value.trim();
    const roleIn = document.getElementById('profileRoleInput')?.value.trim();
    const bioIn = document.getElementById('profileBioInput')?.value.trim();
    const hoursIn = parseFloat(document.getElementById('profileTargetHoursInput')?.value) || 6.5;
    const trackIn = document.getElementById('profileTrackSelect')?.value;
    const githubIn = document.getElementById('profileGithubInput')?.value.trim();
    const linkedinIn = document.getElementById('profileLinkedinInput')?.value.trim();

    if (!nameIn) {
      alert("Please enter your name.");
      return;
    }

    this.userProfile = {
      name: nameIn,
      role: roleIn || 'Student',
      bio: bioIn || 'Discipline builds freedom.',
      targetHours: hoursIn,
      track: trackIn || 'General Academics',
      avatarUrl: (this.userProfile && this.userProfile.avatarUrl) || 'assets/avatar_aniket.jpg',
      github: githubIn || '',
      linkedin: linkedinIn || ''
    };

    try {
      localStorage.setItem('aura_user_profile', JSON.stringify(this.userProfile));
    } catch (e) {}

    this.applyUserProfileEverywhere();

    if (window.soundEngine) window.soundEngine.play('complete');
    if (window.confetti) {
      try { window.confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } }); } catch (e) {}
    }
    if (window.gamification) {
      window.gamification.awardXP(25, 'Personalized User Profile');
    }

    this.showToast("Profile Saved Everywhere!", `Identity updated to ${this.userProfile.name}. All views are synced.`);
  }

  createVectorAvatarDataUrl(type) {
    const iconMap = {
      'bot': `<rect x="30" y="34" width="68" height="60" rx="14" fill="none" stroke="#22d3ee" stroke-width="6"/><circle cx="50" cy="58" r="7" fill="#22d3ee"/><circle cx="78" cy="58" r="7" fill="#22d3ee"/><line x1="64" y1="18" x2="64" y2="34" stroke="#22d3ee" stroke-width="6"/><circle cx="64" cy="16" r="6" fill="#7047ff"/>`,
      'rocket': `<path d="M64 20c18 20 24 45 24 64H40c0-19 6-44 24-64z" fill="none" stroke="#7047ff" stroke-width="6"/><circle cx="64" cy="52" r="10" fill="#22d3ee"/><path d="M40 84l-14 18h24" stroke="#ff5e7e" stroke-width="5" fill="none"/><path d="M88 84l14 18H78" stroke="#ff5e7e" stroke-width="5" fill="none"/>`,
      'brain': `<path d="M50 30a16 16 0 0 0-16 16c0 5 2 9 6 12-4 3-6 7-6 12 0 9 7 16 16 16h10V30H50z" fill="none" stroke="#ec4899" stroke-width="6"/><path d="M78 30a16 16 0 0 1 16 16c0 5-2 9-6 12 4 3 6 7 6 12 0 9-7 16-16 16H68V30h10z" fill="none" stroke="#ec4899" stroke-width="6"/>`,
      'zap': `<polygon points="70 18 36 68 62 68 56 110 92 60 66 60 70 18" fill="url(#boltG)" stroke="#ffd166" stroke-width="4"/>`,
      'zen': `<circle cx="64" cy="38" r="14" fill="none" stroke="#20d6a0" stroke-width="6"/><path d="M34 94c0-18 14-30 30-30s30 12 30 30H34z" fill="none" stroke="#20d6a0" stroke-width="6"/>`,
      'shield': `<path d="M64 22l34 14v32c0 24-18 42-34 46-16-4-34-22-34-46V36l34-14z" fill="none" stroke="#ffd166" stroke-width="6"/>`
    };
    const content = iconMap[type] || iconMap['bot'];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
      <defs>
        <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0c1b32"/>
          <stop offset="100%" stop-color="#07111f"/>
        </linearGradient>
        <linearGradient id="boltG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd166"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="64" fill="url(#bgG)" stroke="#22d3ee" stroke-width="3"/>
      ${content}
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  setAvatarPreset(avatarType, btnElem) {
    document.querySelectorAll('.avatar-preset-btn').forEach(b => b.classList.remove('active'));
    if (btnElem) btnElem.classList.add('active');

    let finalAvatarUrl = avatarType;
    const isImagePath = avatarType.startsWith('http') || avatarType.startsWith('data:') || avatarType.includes('/');
    if (!isImagePath) {
      finalAvatarUrl = this.createVectorAvatarDataUrl(avatarType);
    }

    if (this.userProfile) {
      this.userProfile.avatarUrl = finalAvatarUrl;
      try {
        localStorage.setItem('aura_user_profile', JSON.stringify(this.userProfile));
      } catch (e) {}
    }

    // Update all avatar displays immediately
    const setAvatar = (id) => {
      const el = document.getElementById(id);
      if (el) el.src = finalAvatarUrl;
    };

    setAvatar('profileCardAvatar');
    setAvatar('avatarPreviewImg');
    setAvatar('topbarUserAvatar');
    setAvatar('dropdownUserAvatar');
    setAvatar('sidebarUserAvatar');

    if (window.soundEngine) window.soundEngine.play('tick');
    this.showToast('Avatar Preset Selected', 'Avatar updated and synchronized across all views.');
  }

  handleAvatarUpload(inputElem) {
    const file = inputElem.files && inputElem.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      this.showToast('File Too Large', 'Please choose an image under 5MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;

      if (this.userProfile) {
        this.userProfile.avatarUrl = dataUrl;
        try {
          localStorage.setItem('aura_user_profile', JSON.stringify(this.userProfile));
        } catch (e) {}
      }

      const setAvatar = (id) => {
        const el = document.getElementById(id);
        if (el) el.src = dataUrl;
      };

      setAvatar('profileCardAvatar');
      setAvatar('avatarPreviewImg');
      setAvatar('topbarUserAvatar');
      setAvatar('dropdownUserAvatar');
      setAvatar('sidebarUserAvatar');

      document.querySelectorAll('.avatar-preset-btn').forEach(b => b.classList.remove('active'));

      if (window.soundEngine) window.soundEngine.play('complete');
      this.showToast('Photo Uploaded!', 'Your custom profile photo is now active across the entire platform.');
    };
    reader.onerror = () => {
      this.showToast('Upload Failed', 'Could not read the image file.', 'error');
    };
    reader.readAsDataURL(file);
  }

  resetUserProfile() {
    if (confirm("Reset profile settings to default?")) {
      try {
        localStorage.removeItem('aura_user_profile');
      } catch (e) {}
      this.initUserProfile();
      if (window.soundEngine) window.soundEngine.play('complete');
      this.showToast("Profile Reset", "Default profile values restored.", "warning");
    }
  }

  renderProfileView() {
    this.populateProfileForm();
    this.applyUserProfileEverywhere();
    this.updateAuraBrainAdvice();

    if (window.gamification) {
      const xp = window.gamification.xp || 480;
      const level = window.gamification.level || 3;
      const xpForNext = window.gamification.getXPForLevel ? window.gamification.getXPForLevel(level + 1) : 600;
      const prevLvlXp = window.gamification.getXPForLevel ? window.gamification.getXPForLevel(level) : 0;
      const progressInLevel = Math.max(0, xp - prevLvlXp);
      const neededForLevel = Math.max(1, xpForNext - prevLvlXp);
      const pct = Math.min(100, Math.round((progressInLevel / neededForLevel) * 100));

      const xpDisp = document.getElementById('profileXpDisplay');
      const lvlDisp = document.getElementById('profileLevelDisplay');
      const barLbl = document.getElementById('profileXpProgressLabel');
      const barVal = document.getElementById('profileXpProgressVal');
      const barFill = document.getElementById('profileXpProgressBar');

      if (xpDisp) xpDisp.textContent = `${xp} XP`;
      if (lvlDisp) lvlDisp.textContent = `Level ${level}`;
      if (barLbl) barLbl.textContent = `Level ${level} Progress`;
      if (barVal) barVal.textContent = `${progressInLevel} / ${neededForLevel} XP`;
      if (barFill) barFill.style.width = `${pct}%`;
    }
  }

  // ==========================================
  // FEYNMAN AI EXPLAINER ENGINE
  // ==========================================
  evaluateFeynmanExplanation() {
    const topicSelect = document.getElementById('feynmanTopicSelect');
    const input = document.getElementById('feynmanExplanationInput');
    const feedbackBox = document.getElementById('feynmanFeedbackBox');

    if (!input || !feedbackBox) return;

    const text = input.value.trim();
    if (!text || text.length < 20) {
      alert("Please write at least 2-3 sentences explaining the concept in simple terms.");
      return;
    }

    const topic = topicSelect?.options[topicSelect.selectedIndex]?.text || "Selected Concept";
    const wordCount = text.split(/\s+/).length;

    const jargonWords = ['polynomial', 'eigenvector', 'asymptotic', 'stochastic', 'backpropagation', 'hyperparameter', 'quadratic', 'synchronous', 'idempotent'];
    const foundJargon = jargonWords.filter(j => text.toLowerCase().includes(j));
    
    let grade = 'A+';
    let simplicityNote = 'Excellent! You used relatable everyday analogies without dense academic jargon.';
    if (foundJargon.length > 2) {
      grade = 'B+';
      simplicityNote = `Good effort, but you used technical terms (${foundJargon.slice(0, 2).join(', ')}). Try replacing them with real-world analogies an 8-year-old would immediately grasp!`;
    } else if (foundJargon.length > 0) {
      grade = 'A';
      simplicityNote = `Very strong explanation! Minor technical terminology detected (${foundJargon.join(', ')}), but overall very accessible.`;
    }

    feedbackBox.innerHTML = `
      <div style="background: rgba(32, 214, 160, 0.1); border: 1px solid rgba(32, 214, 160, 0.3); border-radius: var(--radius-sm); padding: 0.8rem; margin-bottom: 0.65rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
          <strong style="color: var(--accent-emerald); font-size: 1rem; display: inline-flex; align-items: center; gap: 0.4rem;"><i data-lucide="target" class="svg-icon"></i> Feynman Clarity Grade: ${grade}</strong>
          <span style="font-family: var(--font-mono); color: var(--accent-cyan); font-size: 0.78rem;">${wordCount} Words</span>
        </div>
        <p style="color: #FFFFFF; font-size: 0.82rem; margin: 0;">${simplicityNote}</p>
      </div>
      <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5;">
        <strong style="color: var(--accent-gold); display: inline-flex; align-items: center; gap: 0.35rem;"><i data-lucide="lightbulb" class="svg-icon"></i> Feynman Master Rule:</strong>
        "The first principle is that you must not fool yourself — and you are the easiest person to fool." By articulating this in your own English words, you cement deep neural retention.
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();

    if (window.soundEngine) window.soundEngine.play('complete');
    if (window.gamification) {
      window.gamification.awardXP(35, `Feynman Review: ${topic}`);
    }
    this.showToast("Feynman Review Scored! (+35 XP)", `Grade: ${grade} earned for explaining ${topic.split(':')[0]}.`, "success");
  }

  // ==========================================
  // GAP FILLERS: QUICK HABITS TODAY
  // ==========================================
  initQuickHabits() {
    try {
      const saved = localStorage.getItem('aura_quick_habits_state');
      if (saved) {
        this.quickHabits = JSON.parse(saved);
      } else {
        this.quickHabits = { wake: false, workout: false, read: false, speech: false, phone: false };
      }
    } catch (e) {
      this.quickHabits = { wake: false, workout: false, read: false, speech: false, phone: false };
    }
    this.renderQuickHabits();
  }

  renderQuickHabits() {
    const keys = Object.keys(this.quickHabits || {});
    let activeCount = 0;
    keys.forEach(k => {
      const isChecked = !!this.quickHabits[k];
      if (isChecked) activeCount++;
      const item = document.getElementById(`qHabitItem-${k}`);
      const chk = document.getElementById(`qHabitChk-${k}`);
      if (item) item.classList.toggle('checked', isChecked);
      if (chk) chk.innerHTML = isChecked ? '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '';
    });
    const badge = document.getElementById('homeHabitStreakBadge');
    if (badge) {
      badge.textContent = `${activeCount}/${keys.length} Active`;
    }
  }

  toggleQuickHabit(k) {
    if (!this.quickHabits) this.quickHabits = {};
    this.quickHabits[k] = !this.quickHabits[k];
    try {
      localStorage.setItem('aura_quick_habits_state', JSON.stringify(this.quickHabits));
    } catch (e) {}

    if (this.quickHabits[k]) {
      if (window.soundEngine) window.soundEngine.play('complete');
      if (window.gamification) window.gamification.awardXP(15, `Streak Habit: ${k}`);
    } else {
      if (window.soundEngine) window.soundEngine.play('tick');
    }
    this.renderQuickHabits();
    this.renderDailyHUD();
  }

  // ==========================================
  // GAP FILLERS: AMBIENT FOCUS AUDIO GENERATOR
  // ==========================================
  initSoundscape() {
    this.soundscapePlaying = false;
    this.soundscapeMode = 'alpha';
    this.soundscapeVolume = 0.5;
    this.audioCtx = null;
    this.soundNodes = [];
  }

  toggleSoundscape() {
    if (this.soundscapePlaying) {
      this.stopSoundscape();
    } else {
      this.startSoundscape();
    }
  }

  startSoundscape() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) this.audioCtx = new AudioContext();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      this.stopSoundscapeNodes();

      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(this.soundscapeVolume, this.audioCtx.currentTime);
      masterGain.connect(this.audioCtx.destination);
      this.soundMasterGain = masterGain;

      if (this.soundscapeMode === 'alpha') {
        const oscL = this.audioCtx.createOscillator();
        const oscR = this.audioCtx.createOscillator();
        const panL = this.audioCtx.createStereoPanner ? this.audioCtx.createStereoPanner() : null;
        const panR = this.audioCtx.createStereoPanner ? this.audioCtx.createStereoPanner() : null;

        oscL.type = 'sine';
        oscL.frequency.setValueAtTime(432, this.audioCtx.currentTime);
        oscR.type = 'sine';
        oscR.frequency.setValueAtTime(442, this.audioCtx.currentTime);

        const subGain = this.audioCtx.createGain();
        subGain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);

        if (panL && panR) {
          panL.pan.value = -1;
          panR.pan.value = 1;
          oscL.connect(panL);
          panL.connect(subGain);
          oscR.connect(panR);
          panR.connect(subGain);
        } else {
          oscL.connect(subGain);
          oscR.connect(subGain);
        }

        subGain.connect(masterGain);
        oscL.start();
        oscR.start();
        this.soundNodes.push(oscL, oscR, subGain);
      } else {
        const bufferSize = 2 * this.audioCtx.sampleRate;
        const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
          b6 = white * 0.115926;
        }

        const whiteNoise = this.audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.audioCtx.createBiquadFilter();
        if (this.soundscapeMode === 'rain') {
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);
        } else if (this.soundscapeMode === 'waves') {
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(350, this.audioCtx.currentTime);
          filter.Q.setValueAtTime(1.5, this.audioCtx.currentTime);
        } else {
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);
        }

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        whiteNoise.start();
        this.soundNodes.push(whiteNoise, filter);
      }

      this.soundscapePlaying = true;
      const icon = document.getElementById('soundscapePlayIcon');
      const eq = document.getElementById('soundscapeEqBars');
      if (icon) {
        icon.innerHTML = '<i data-lucide="square" class="svg-icon"></i>';
        if (window.lucide) window.lucide.createIcons();
      }
      if (eq) eq.classList.add('active');
      this.showToast('Ambient Focus Audio Active', `Playing ${this.soundscapeMode.toUpperCase()} mode.`);
    } catch (err) {
      console.warn('Audio context error', err);
    }
  }

  stopSoundscapeNodes() {
    this.soundNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {}
    });
    this.soundNodes = [];
  }

  stopSoundscape() {
    this.stopSoundscapeNodes();
    this.soundscapePlaying = false;
    const icon = document.getElementById('soundscapePlayIcon');
    const eq = document.getElementById('soundscapeEqBars');
    if (icon) {
      icon.innerHTML = '<i data-lucide="play" class="svg-icon"></i>';
      if (window.lucide) window.lucide.createIcons();
    }
    if (eq) eq.classList.remove('active');
  }

  setSoundscapeMode(mode) {
    this.soundscapeMode = mode;
    document.querySelectorAll('.soundscape-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.sound === mode);
    });
    if (this.soundscapePlaying) {
      this.startSoundscape();
    }
  }

  setSoundscapeVolume(val) {
    this.soundscapeVolume = parseFloat(val);
    if (this.soundMasterGain && this.audioCtx) {
      this.soundMasterGain.gain.setValueAtTime(this.soundscapeVolume, this.audioCtx.currentTime);
    }
  }

  // ==========================================
  // DESIGNER NOTES SCRATCHPAD
  // ==========================================
  initScratchpad() {
    const textarea = document.getElementById('scratchpadTextarea');
    const preview = document.getElementById('scratchpadPreviewBox');
    const count = document.getElementById('scratchpadCharCount');
    const saveBtn = document.getElementById('saveScratchpadBtn');
    const clearBtn = document.getElementById('clearScratchpadBtn');

    if (!textarea) return;

    try {
      const saved = localStorage.getItem('aura_notes_scratchpad');
      if (saved) textarea.value = saved;
    } catch (e) {}

    const renderPreview = () => {
      const val = textarea.value;
      if (count) count.textContent = `${val.length} chars`;
      if (preview) {
        if (!val.trim()) {
          preview.innerHTML = '<p style="color:var(--text-muted); font-style:italic;">Live markdown preview will appear here as you write...</p>';
          return;
        }
        let html = val
          .replace(/^### (.*$)/gim, '<h3 style="color:#FFF; font-size:1.1rem; margin:0.6rem 0 0.3rem;">$1</h3>')
          .replace(/^## (.*$)/gim, '<h2 style="color:var(--accent-cyan); font-size:1.25rem; margin:0.8rem 0 0.4rem;">$1</h2>')
          .replace(/^# (.*$)/gim, '<h1 style="color:#FFF; font-size:1.4rem; font-weight:800; margin:1rem 0 0.5rem;">$1</h1>')
          .replace(/^\> (.*$)/gim, '<blockquote style="border-left:3px solid var(--accent-gold); padding-left:0.75rem; color:var(--text-secondary); margin:0.5rem 0;">$1</blockquote>')
          .replace(/\*\*(.*)\*\*/gim, '<strong style="color:#FFF;">$1</strong>')
          .replace(/\*(.*)\*/gim, '<em>$1</em>')
          .replace(/`([^`]+)`/gim, '<code style="background:rgba(120,160,255,0.15); color:var(--accent-cyan); padding:0.1rem 0.35rem; border-radius:4px; font-family:var(--font-mono); font-size:0.85em;">$1</code>')
          .replace(/^- (.*$)/gim, '<li style="margin-left:1.2rem; color:var(--text-secondary);">$1</li>')
          .replace(/^\d+\. (.*$)/gim, '<li style="margin-left:1.2rem; color:var(--text-secondary); list-style-type:decimal;">$1</li>')
          .replace(/\n\n/gim, '<br><br>');
        preview.innerHTML = html;
      }
    };

    textarea.addEventListener('input', () => {
      renderPreview();
      try {
        localStorage.setItem('aura_notes_scratchpad', textarea.value);
      } catch (e) {}
    });

    saveBtn?.addEventListener('click', () => {
      try {
        localStorage.setItem('aura_notes_scratchpad', textarea.value);
      } catch (e) {}
      if (window.soundEngine) window.soundEngine.play('complete');
      if (window.gamification) window.gamification.awardXP(15, 'Saved Lecture Notes');
      this.showToast('Notes Auto-Saved (+15 XP)', 'Your notes are securely stored in your local browser vault.');
    });

    clearBtn?.addEventListener('click', () => {
      if (confirm('Clear all scratchpad notes?')) {
        textarea.value = '';
        renderPreview();
        try {
          localStorage.removeItem('aura_notes_scratchpad');
        } catch (e) {}
        this.showToast('Scratchpad Cleared', 'Empty canvas ready for your next study session.');
      }
    });

    renderPreview();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
