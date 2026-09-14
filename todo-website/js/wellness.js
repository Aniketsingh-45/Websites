/**
 * Student Bio-Wellness & Ergonomics Sentinel
 * 1. 20-20-20 Eye Rest Engine (20 min work -> 20s eye rest)
 * 2. Hydration Tracker & Water Intake Reminders
 * 3. Spine & Posture Alignment Alerts
 */
class WellnessSentinel {
  constructor() {
    this.screenTimeSeconds = 0;
    this.postureTimerSeconds = 0;
    this.waterTimerSeconds = 0;

    this.eyeIntervalSeconds = 20 * 60; // 20 minutes
    this.eyeBreakDuration = 20; // 20 seconds
    this.waterIntervalSeconds = 45 * 60; // 45 minutes
    this.postureIntervalSeconds = 30 * 60; // 30 minutes

    this.eyeRestActive = false;
    this.eyeCountdown = 20;
    this.eyeCountdownTimer = null;

    // Daily state
    this.dailyWaterTarget = 8;
    this.waterGlasses = 0;
    this.eyeBreaksTaken = 0;
    this.postureStretches = 0;

    // Toggles
    this.eyeRestEnabled = true;
    this.waterReminderEnabled = true;
    this.postureAlertEnabled = true;

    this.loadState();
    this.startMasterClock();
  }

  loadState() {
    try {
      const today = new Date().toDateString();
      const saved = localStorage.getItem('aura_wellness_data');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.date === today) {
          this.waterGlasses = data.waterGlasses || 0;
          this.eyeBreaksTaken = data.eyeBreaksTaken || 0;
          this.postureStretches = data.postureStretches || 0;
        }
        if (data.settings) {
          this.eyeRestEnabled = data.settings.eyeRestEnabled ?? true;
          this.waterReminderEnabled = data.settings.waterReminderEnabled ?? true;
          this.postureAlertEnabled = data.settings.postureAlertEnabled ?? true;
          this.dailyWaterTarget = data.settings.dailyWaterTarget || 8;
        }
      }
    } catch (e) {
      console.warn('Could not load wellness state', e);
    }
  }

  saveState() {
    try {
      const today = new Date().toDateString();
      localStorage.setItem('aura_wellness_data', JSON.stringify({
        date: today,
        waterGlasses: this.waterGlasses,
        eyeBreaksTaken: this.eyeBreaksTaken,
        postureStretches: this.postureStretches,
        settings: {
          eyeRestEnabled: this.eyeRestEnabled,
          waterReminderEnabled: this.waterReminderEnabled,
          postureAlertEnabled: this.postureAlertEnabled,
          dailyWaterTarget: this.dailyWaterTarget
        }
      }));
    } catch (e) {
      console.warn('Could not save wellness state', e);
    }
  }

  startMasterClock() {
    setInterval(() => {
      // 1. Screen / Eye timer
      if (this.eyeRestEnabled && !this.eyeRestActive) {
        this.screenTimeSeconds++;
        if (this.screenTimeSeconds >= this.eyeIntervalSeconds) {
          this.triggerEyeBreak();
        }
      }

      // 2. Hydration timer
      if (this.waterReminderEnabled) {
        this.waterTimerSeconds++;
        if (this.waterTimerSeconds >= this.waterIntervalSeconds) {
          this.triggerWaterReminder();
        }
      }

      // 3. Posture timer
      if (this.postureAlertEnabled) {
        this.postureTimerSeconds++;
        if (this.postureTimerSeconds >= this.postureIntervalSeconds) {
          this.triggerPostureAlert();
        }
      }

      this.updateWellnessBadgeIndicators();
    }, 1000);
  }

  triggerEyeBreak() {
    this.screenTimeSeconds = 0;
    this.eyeRestActive = true;
    this.eyeCountdown = this.eyeBreakDuration;

    if (window.soundEngine) {
      window.soundEngine.play('eyeRest');
    }

    if (window.notificationEngine) {
      window.notificationEngine.notify('👁️ 20-20-20 Eye Rest Alert', {
        body: 'You have been on screen for 20 mins! Look 20 feet away for 20 seconds to relax ciliary eye muscles.',
        soundType: 'eyeRest',
        tag: 'eye-rest'
      });
    }

    // Open Eye Rest Modal
    this.showEyeRestModal();
  }

  showEyeRestModal() {
    const modal = document.getElementById('eyeRestModal');
    if (!modal) return;
    modal.classList.add('active');

    const countdownElem = document.getElementById('eyeCountdownValue');
    const ringCircle = document.getElementById('eyeProgressRing');

    if (countdownElem) countdownElem.textContent = this.eyeCountdown;

    clearInterval(this.eyeCountdownTimer);
    this.eyeCountdownTimer = setInterval(() => {
      this.eyeCountdown--;
      if (countdownElem) countdownElem.textContent = this.eyeCountdown;

      if (ringCircle) {
        const offset = 283 - (283 * (20 - this.eyeCountdown)) / 20;
        ringCircle.style.strokeDashoffset = offset;
      }

      if (this.eyeCountdown <= 0) {
        clearInterval(this.eyeCountdownTimer);
        this.completeEyeBreak();
      }
    }, 1000);
  }

  completeEyeBreak() {
    clearInterval(this.eyeCountdownTimer);
    this.eyeRestActive = false;
    this.screenTimeSeconds = 0;
    this.eyeBreaksTaken++;
    this.saveState();

    const modal = document.getElementById('eyeRestModal');
    if (modal) modal.classList.remove('active');

    if (window.soundEngine) window.soundEngine.play('complete');
    if (window.gamification) {
      window.gamification.awardXP(15, 'Completed 20-20-20 Eye Rest');
    }
    this.renderHydrationWidget();
  }

  dismissEyeBreak() {
    clearInterval(this.eyeCountdownTimer);
    this.eyeRestActive = false;
    this.screenTimeSeconds = 0;
    const modal = document.getElementById('eyeRestModal');
    if (modal) modal.classList.remove('active');
  }

  triggerWaterReminder() {
    this.waterTimerSeconds = 0;
    if (window.soundEngine) {
      window.soundEngine.play('waterDrop');
    }
    if (window.notificationEngine) {
      window.notificationEngine.notify('💧 Hydration Checkpoint', {
        body: `Stay sharp! Drink a fresh glass of water. (${this.waterGlasses}/${this.dailyWaterTarget} glasses today)`,
        soundType: 'waterDrop',
        tag: 'water-alert'
      });
    }
  }

  triggerPostureAlert() {
    this.postureTimerSeconds = 0;
    if (window.soundEngine) {
      window.soundEngine.play('rest');
    }
    if (window.notificationEngine) {
      window.notificationEngine.notify('🧘 Ergonomic & Posture Alignment', {
        body: 'Straighten your spine, roll shoulders back, uncross legs, and release neck tension.',
        soundType: 'rest',
        tag: 'posture-alert'
      });
    }

    // Show in-app banner
    const banner = document.getElementById('postureBanner');
    if (banner) {
      banner.classList.add('visible');
      setTimeout(() => {
        banner.classList.remove('visible');
      }, 9000);
    }
  }

  addWaterGlass() {
    if (this.waterGlasses < 16) {
      this.waterGlasses++;
      this.saveState();
      if (window.soundEngine) window.soundEngine.play('waterDrop');
      if (window.gamification) {
        window.gamification.awardXP(10, 'Hydration +1 Glass');
        if (this.waterGlasses >= this.dailyWaterTarget) {
          window.gamification.unlockBadge('badge-water');
        }
      }
      this.renderHydrationWidget();
    }
  }

  removeWaterGlass() {
    if (this.waterGlasses > 0) {
      this.waterGlasses--;
      this.saveState();
      this.renderHydrationWidget();
    }
  }

  renderHydrationWidget() {
    const countElem = document.getElementById('waterCountDisplay');
    const countElemFull = document.getElementById('waterCountDisplayFull');
    const fillBar = document.getElementById('waterProgressBar');
    const fillBarFull = document.getElementById('waterProgressBarFull');
    const targetElem = document.getElementById('waterTargetDisplay');
    const targetElemFull = document.getElementById('waterTargetDisplayFull');
    const eyeBreaksElem = document.getElementById('eyeBreaksDisplay');
    const eyeBreaksElemFull = document.getElementById('eyeBreaksDisplayFull');
    const cupsContainer = document.getElementById('waterCupsGrid');
    const cupsContainerFull = document.getElementById('waterCupsGridFull');

    const countText = `${this.waterGlasses} / ${this.dailyWaterTarget} Glasses`;
    const targetText = `${(this.waterGlasses * 0.25).toFixed(1)}L / ${(this.dailyWaterTarget * 0.25).toFixed(1)}L`;

    if (countElem) countElem.textContent = countText;
    if (countElemFull) countElemFull.textContent = countText;

    if (targetElem) targetElem.textContent = targetText;
    if (targetElemFull) targetElemFull.textContent = targetText;

    if (eyeBreaksElem) eyeBreaksElem.textContent = this.eyeBreaksTaken;
    if (eyeBreaksElemFull) eyeBreaksElemFull.textContent = this.eyeBreaksTaken;

    const pct = Math.min(100, Math.round((this.waterGlasses / this.dailyWaterTarget) * 100));
    if (fillBar) fillBar.style.width = `${pct}%`;
    if (fillBarFull) fillBarFull.style.width = `${pct}%`;

    let cupsHtml = '';
    for (let i = 1; i <= this.dailyWaterTarget; i++) {
      const isFilled = i <= this.waterGlasses;
      cupsHtml += `
        <button type="button" class="water-cup-item ${isFilled ? 'filled' : 'empty'}" 
                onclick="window.wellnessSentinel.setWaterGlasses(${i})" 
                title="Glass ${i} (250ml) - Click to log">
          <span class="cup-icon">${isFilled ? '💧' : '🥛'}</span>
          <span class="cup-num">${i}</span>
        </button>
      `;
    }

    if (cupsContainer) cupsContainer.innerHTML = cupsHtml;
    if (cupsContainerFull) cupsContainerFull.innerHTML = cupsHtml;
  }

  setWaterGlasses(num) {
    if (this.waterGlasses === num && num > 0) {
      this.waterGlasses = num - 1;
    } else {
      this.waterGlasses = num;
    }
    this.saveState();
    if (window.soundEngine) window.soundEngine.play('waterDrop');
    if (window.gamification) {
      window.gamification.awardXP(10, `Hydration Log: ${this.waterGlasses} Glasses`);
      if (this.waterGlasses >= this.dailyWaterTarget) {
        window.gamification.unlockBadge('badge-water');
      }
    }
    this.renderHydrationWidget();
  }

  updateWellnessBadgeIndicators() {
    const eyeTimerElem = document.getElementById('eyeScreenTimerDisplay');
    const eyeTimerElemFull = document.getElementById('eyeScreenTimerDisplayFull');
    if ((eyeTimerElem || eyeTimerElemFull) && this.eyeRestEnabled) {
      const remainingSec = Math.max(0, this.eyeIntervalSeconds - this.screenTimeSeconds);
      const mins = Math.floor(remainingSec / 60);
      const secs = remainingSec % 60;
      const timeStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      if (eyeTimerElem) eyeTimerElem.textContent = timeStr;
      if (eyeTimerElemFull) eyeTimerElemFull.textContent = timeStr;
    }
  }
}

if (typeof window !== 'undefined') {
  window.wellnessSentinel = new WellnessSentinel();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WellnessSentinel };
}
