/**
 * Gamification & Student Growth Engine
 * Tracks XP, Levels, Badges, Streaks, and celebratory particle animations
 */
class GamificationEngine {
  constructor() {
    this.xp = 0;
    this.streak = 1;
    this.lastActiveDate = new Date().toDateString();
    this.unlockedBadges = new Set();
    this.dailyTasksCompletedCount = 0;

    this.ranks = [
      { level: 1, title: 'Novice Apprentice', minXP: 0, icon: '🌱' },
      { level: 2, title: 'Habit Initiate', minXP: 150, icon: '⚡' },
      { level: 3, title: 'Focus Explorer', minXP: 350, icon: '🔍' },
      { level: 4, title: 'Consistent Scholar', minXP: 600, icon: '📖' },
      { level: 5, title: 'Iron Mind', minXP: 950, icon: '🛡️' },
      { level: 6, title: 'Neural Architect', minXP: 1400, icon: '🧠' },
      { level: 7, title: 'Discipline Knight', minXP: 2000, icon: '⚔️' },
      { level: 8, title: 'Algorithmic Thinker', minXP: 2800, icon: '💻' },
      { level: 9, title: 'Polyglot Orator', minXP: 3800, icon: '🎙️' },
      { level: 10, title: 'High-Performance Titan', minXP: 5000, icon: '🔥' },
      { level: 15, title: 'Zen Polymath', minXP: 9000, icon: '🌌' },
      { level: 20, title: 'Grandmaster Ascendant', minXP: 15000, icon: '👑' }
    ];

    this.allBadges = [
      { id: 'badge-early-bird', title: 'Early Riser', desc: 'Conquered the 6:00 AM wake up block without scrolling', icon: '🌅', category: 'Discipline' },
      { id: 'badge-ai-dev', title: 'Neural Architect', desc: 'Completed both AI/ML Deep Study and Coding blocks', icon: '🤖', category: 'Tech' },
      { id: 'badge-polyglot', title: 'Speaking Maverick', desc: 'Recorded English speaking voice audio in the lab', icon: '🎙️', category: 'English' },
      { id: 'badge-rule1', title: 'Rule #1 Enforcer', desc: 'Honored the Golden Rule: Never missed 2 days in a row', icon: '⚡', category: 'Discipline' },
      { id: 'badge-water', title: 'Hydration Titan', desc: 'Reached 8 glasses (2 Liters) of daily water intake', icon: '💧', category: 'Wellness' },
      { id: 'badge-eye-guard', title: 'Optic Defender', desc: 'Completed 20-20-20 screen eye rest sessions', icon: '👁️', category: 'Wellness' },
      { id: 'badge-full-day', title: 'Century Titan', desc: 'Achieved 100% routine completion for the day', icon: '🏆', category: 'Mastery' },
      { id: 'badge-zen', title: 'Deep Flow State', desc: 'Completed a 30+ minute ambient focus session', icon: '🎧', category: 'Focus' }
    ];

    this.loadState();
    this.checkStreakContinuity();
  }

  loadState() {
    try {
      const saved = localStorage.getItem('aura_gamification');
      if (saved) {
        const data = JSON.parse(saved);
        this.xp = data.xp || 0;
        this.streak = data.streak || 1;
        this.lastActiveDate = data.lastActiveDate || new Date().toDateString();
        this.dailyTasksCompletedCount = data.dailyTasksCompletedCount || 0;
        if (Array.isArray(data.unlockedBadges)) {
          this.unlockedBadges = new Set(data.unlockedBadges);
        }
      }
    } catch (e) {
      console.warn('Could not load gamification state', e);
    }
  }

  saveState() {
    try {
      localStorage.setItem('aura_gamification', JSON.stringify({
        xp: this.xp,
        streak: this.streak,
        lastActiveDate: this.lastActiveDate,
        dailyTasksCompletedCount: this.dailyTasksCompletedCount,
        unlockedBadges: Array.from(this.unlockedBadges)
      }));
    } catch (e) {
      console.warn('Could not save gamification state', e);
    }
  }

  checkStreakContinuity() {
    const today = new Date();
    const todayStr = today.toDateString();
    if (this.lastActiveDate !== todayStr) {
      const lastDate = new Date(this.lastActiveDate);
      const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Continuous next day
        this.streak++;
        this.lastActiveDate = todayStr;
        this.saveState();
      } else if (diffDays === 2) {
        // Missed 1 day! Rule 1 Warning!
        if (window.notificationEngine) {
          window.notificationEngine.notify('⚠️ Rule #1 in Jeopardy!', {
            body: 'You missed yesterday! "Never miss two days in a row." Complete your tasks today to save your streak!',
            soundType: 'alert'
          });
        }
        this.lastActiveDate = todayStr;
        this.saveState();
      } else if (diffDays > 2) {
        // Streak reset
        this.streak = 1;
        this.lastActiveDate = todayStr;
        this.saveState();
      }
    }
  }

  getCurrentRank() {
    let current = this.ranks[0];
    for (let i = 0; i < this.ranks.length; i++) {
      if (this.xp >= this.ranks[i].minXP) {
        current = this.ranks[i];
      } else {
        break;
      }
    }
    return current;
  }

  getNextRank() {
    const current = this.getCurrentRank();
    const currentIndex = this.ranks.findIndex(r => r.level === current.level);
    return this.ranks[currentIndex + 1] || null;
  }

  awardXP(amount, reason = '') {
    const prevRank = this.getCurrentRank();
    this.xp += amount;
    this.saveState();

    const newRank = this.getCurrentRank();
    if (newRank.level > prevRank.level) {
      this.triggerLevelUp(newRank);
    } else {
      this.showFloatingXP(amount, reason);
    }

    this.renderHeaderUI();
  }

  showFloatingXP(amount, reason) {
    const container = document.getElementById('xpToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'xp-pill-toast';
    toast.innerHTML = `<span class="xp-plus">+${amount} XP</span> <span class="xp-reason">${reason}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 2200);
  }

  triggerLevelUp(newRank) {
    if (window.soundEngine) window.soundEngine.play('levelUp');
    this.triggerConfetti();

    const modal = document.getElementById('achievementModal');
    if (modal) {
      const titleElem = document.getElementById('achievementModalTitle');
      const descElem = document.getElementById('achievementModalDesc');
      const iconElem = document.getElementById('achievementModalIcon');

      if (titleElem) titleElem.textContent = `RANK UP: ${newRank.title}!`;
      if (descElem) descElem.textContent = `Congratulations! You reached Level ${newRank.level} with ${this.xp} total XP. Keep climbing!`;
      if (iconElem) iconElem.textContent = newRank.icon;

      modal.classList.add('active');
    }
  }

  unlockBadge(badgeId) {
    if (this.unlockedBadges.has(badgeId)) return;

    const badge = this.allBadges.find(b => b.id === badgeId);
    if (!badge) return;

    this.unlockedBadges.add(badgeId);
    this.saveState();
    this.awardXP(100, `Badge: ${badge.title}`);

    if (window.soundEngine) window.soundEngine.play('levelUp');
    this.triggerConfetti();

    // Show achievement modal
    const modal = document.getElementById('achievementModal');
    if (modal) {
      const titleElem = document.getElementById('achievementModalTitle');
      const descElem = document.getElementById('achievementModalDesc');
      const iconElem = document.getElementById('achievementModalIcon');

      if (titleElem) titleElem.textContent = `UNLOCKED: ${badge.title}`;
      if (descElem) descElem.textContent = badge.desc;
      if (iconElem) iconElem.textContent = badge.icon;

      modal.classList.add('active');
    }

    this.renderBadgesGallery();
  }

  triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#38bdf8', '#f59e0b', '#ec4899']
      });
    } else {
      this.canvasConfettiFallback();
    }
  }

  canvasConfettiFallback() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#6366f1', '#10b981', '#38bdf8', '#f59e0b', '#ec4899'];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.6,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 15,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10
      });
    }

    let frames = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      frames++;
      if (frames < 90) {
        requestAnimationFrame(render);
      } else {
        canvas.remove();
      }
    }
    render();
  }

  renderHeaderUI() {
    const rank = this.getCurrentRank();
    const nextRank = this.getNextRank();

    const rankTitleElem = document.getElementById('userRankTitle');
    const rankLevelElem = document.getElementById('userRankLevel');
    const streakElem = document.getElementById('userStreakCount');
    const xpTextElem = document.getElementById('userXpProgressText');
    const xpFillElem = document.getElementById('userXpFill');

    if (rankTitleElem) rankTitleElem.textContent = `${rank.icon} ${rank.title}`;
    if (rankLevelElem) rankLevelElem.textContent = `LVL ${rank.level}`;
    if (streakElem) streakElem.textContent = `${this.streak}d`;

    if (nextRank && xpFillElem && xpTextElem) {
      const currentSpan = this.xp - rank.minXP;
      const neededSpan = nextRank.minXP - rank.minXP;
      const pct = Math.min(100, Math.max(0, Math.round((currentSpan / neededSpan) * 100)));
      xpFillElem.style.width = `${pct}%`;
      xpTextElem.textContent = `${this.xp} / ${nextRank.minXP} XP`;
    } else if (xpFillElem && xpTextElem) {
      xpFillElem.style.width = `100%`;
      xpTextElem.textContent = `${this.xp} XP (MAX)`;
    }
  }

  renderBadgesGallery() {
    const container = document.getElementById('badgesGridContainer');
    if (!container) return;

    container.innerHTML = this.allBadges.map(badge => {
      const isUnlocked = this.unlockedBadges.has(badge.id);
      return `
        <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}" title="${badge.desc}">
          <div class="badge-icon-wrap">
            <span class="badge-emoji">${badge.icon}</span>
            ${isUnlocked ? '<span class="badge-check-dot">✓</span>' : '<span class="badge-lock-dot">🔒</span>'}
          </div>
          <div class="badge-info">
            <h4 class="badge-title">${badge.title}</h4>
            <p class="badge-desc">${badge.desc}</p>
            <span class="badge-tag">${badge.category}</span>
          </div>
        </div>
      `;
    }).join('');
  }
}

if (typeof window !== 'undefined') {
  window.gamification = new GamificationEngine();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GamificationEngine };
}
