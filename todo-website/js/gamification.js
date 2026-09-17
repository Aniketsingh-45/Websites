/**
 * Gamification & Student Growth Engine
 * Tracks XP, Levels, Badges, Streaks, and celebratory particle animations
 * Uses High-End SVG Icons and Glowing Badges
 */

const SVG_ICONS = {
  sprout: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#20D6A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1687FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
  book: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#A855F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7047FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#EC4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/></svg>`,
  swords: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#F5B942" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" y1="14" x2="9" y2="18"/><line x1="7" y1="17" x2="4" y2="20"/><line x1="3" y1="19" x2="5" y2="21"/></svg>`,
  code: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FF5E7E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`,
  flame: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FF9632" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#A855F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FFD166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`,
  sunrise: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FFD166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6"/><path d="m4.93 10.93 4.24-4.24"/><path d="m19.07 10.93-4.24-4.24"/><path d="M2 18h20"/><path d="M20 22H2"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>`,
  bot: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>`,
  droplet: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#22D3EE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#20D6A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FFD166" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  headphones: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#A855F7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#20D6A0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
};

class GamificationEngine {
  constructor() {
    this.xp = 0;
    this.streak = 1;
    this.lastActiveDate = new Date().toDateString();
    this.unlockedBadges = new Set();
    this.dailyTasksCompletedCount = 0;

    this.ranks = [
      { level: 1, title: 'Novice Apprentice', minXP: 0, iconKey: 'sprout', iconSvg: SVG_ICONS.sprout },
      { level: 2, title: 'Habit Initiate', minXP: 150, iconKey: 'zap', iconSvg: SVG_ICONS.zap },
      { level: 3, title: 'Focus Explorer', minXP: 350, iconKey: 'compass', iconSvg: SVG_ICONS.compass },
      { level: 4, title: 'Consistent Scholar', minXP: 600, iconKey: 'book', iconSvg: SVG_ICONS.book },
      { level: 5, title: 'Iron Mind', minXP: 950, iconKey: 'shield', iconSvg: SVG_ICONS.shield },
      { level: 6, title: 'Neural Architect', minXP: 1400, iconKey: 'brain', iconSvg: SVG_ICONS.brain },
      { level: 7, title: 'Discipline Knight', minXP: 2000, iconKey: 'swords', iconSvg: SVG_ICONS.swords },
      { level: 8, title: 'Algorithmic Thinker', minXP: 2800, iconKey: 'code', iconSvg: SVG_ICONS.code },
      { level: 9, title: 'Polyglot Orator', minXP: 3800, iconKey: 'mic', iconSvg: SVG_ICONS.mic },
      { level: 10, title: 'High-Performance Titan', minXP: 5000, iconKey: 'flame', iconSvg: SVG_ICONS.flame },
      { level: 15, title: 'Zen Polymath', minXP: 9000, iconKey: 'sparkles', iconSvg: SVG_ICONS.sparkles },
      { level: 20, title: 'Grandmaster Ascendant', minXP: 15000, iconKey: 'crown', iconSvg: SVG_ICONS.crown }
    ];

    this.allBadges = [
      { id: 'badge-early-bird', title: 'Early Riser', desc: 'Conquered the 6:00 AM wake up block without scrolling', iconSvg: SVG_ICONS.sunrise, category: 'Discipline' },
      { id: 'badge-ai-dev', title: 'Neural Architect', desc: 'Completed both AI/ML Deep Study and Coding blocks', iconSvg: SVG_ICONS.bot, category: 'Tech' },
      { id: 'badge-polyglot', title: 'Speaking Maverick', desc: 'Recorded English speaking voice audio in the lab', iconSvg: SVG_ICONS.mic, category: 'English' },
      { id: 'badge-rule1', title: 'Rule #1 Enforcer', desc: 'Honored the Golden Rule: Never missed 2 days in a row', iconSvg: SVG_ICONS.zap, category: 'Discipline' },
      { id: 'badge-water', title: 'Hydration Titan', desc: 'Reached 8 glasses (2 Liters) of daily water intake', iconSvg: SVG_ICONS.droplet, category: 'Wellness' },
      { id: 'badge-eye-guard', title: 'Optic Defender', desc: 'Completed 20-20-20 screen eye rest sessions', iconSvg: SVG_ICONS.eye, category: 'Wellness' },
      { id: 'badge-full-day', title: 'Century Titan', desc: 'Achieved 100% routine completion for the day', iconSvg: SVG_ICONS.trophy, category: 'Mastery' },
      { id: 'badge-zen', title: 'Deep Flow State', desc: 'Completed a 30+ minute ambient focus session', iconSvg: SVG_ICONS.headphones, category: 'Focus' }
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
        this.streak++;
        this.lastActiveDate = todayStr;
        this.saveState();
      } else if (diffDays === 2) {
        if (window.notificationEngine) {
          window.notificationEngine.notify('Rule #1 in Jeopardy!', {
            body: 'You missed yesterday! "Never miss two days in a row." Complete your tasks today to save your streak!',
            soundType: 'alert'
          });
        }
        this.lastActiveDate = todayStr;
        this.saveState();
      } else if (diffDays > 2) {
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
      if (iconElem) iconElem.innerHTML = `<div class="badge-rank-sticker" style="width: 64px; height: 64px;">${newRank.iconSvg}</div>`;

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

    const modal = document.getElementById('achievementModal');
    if (modal) {
      const titleElem = document.getElementById('achievementModalTitle');
      const descElem = document.getElementById('achievementModalDesc');
      const iconElem = document.getElementById('achievementModalIcon');

      if (titleElem) titleElem.textContent = `UNLOCKED: ${badge.title}`;
      if (descElem) descElem.textContent = badge.desc;
      if (iconElem) iconElem.innerHTML = `<div class="badge-rank-sticker" style="width: 64px; height: 64px;">${badge.iconSvg}</div>`;

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
        p.vy += 0.35;
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

    if (rankTitleElem) {
      rankTitleElem.innerHTML = `<span style="display:inline-flex; align-items:center; gap:0.35rem;">${rank.iconSvg} ${rank.title}</span>`;
    }
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
            <div class="badge-rank-sticker">
              ${badge.iconSvg}
            </div>
            ${isUnlocked ? `<span class="badge-check-dot">${SVG_ICONS.check}</span>` : `<span class="badge-lock-dot">${SVG_ICONS.lock}</span>`}
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

  openModal() {
    if (window.app) {
      window.app.switchView('profileView');
      const el = document.getElementById('profileBadgesGrid');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

if (typeof window !== 'undefined') {
  window.gamification = new GamificationEngine();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GamificationEngine };
}
