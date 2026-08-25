/* ============================================================
   THE SKYLIGHT CAFE — Ultra-Premium JavaScript Engine v2.0
   28 Feature Modules | GSAP + Custom Animations
   ============================================================ */
(function () {
  'use strict';

  // ════════════════════════════════════════════════════════
  // MODULE 1 — PRELOADER
  // ════════════════════════════════════════════════════════
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('preloaderFill');
    const pct = document.getElementById('preloaderPct');
    const tips = [
      'Preparing your experience...',
      'Firing up the tandoor...',
      'Mixing the spices...',
      'Plating your meal...',
      'Almost ready!'
    ];
    const tipEl = document.getElementById('preloaderTip');

    let progress = 0;
    let tipIdx = 0;
    const tipInterval = setInterval(() => {
      tipIdx = (tipIdx + 1) % tips.length;
      if (tipEl) tipEl.textContent = tips[tipIdx];
    }, 600);

    const interval = setInterval(() => {
      const step = Math.random() * 12 + 4;
      progress = Math.min(progress + step, 95);
      if (fill) fill.style.width = progress + '%';
      if (pct) pct.textContent = Math.floor(progress) + '%';
    }, 120);

    function hidePreloader() {
      clearInterval(interval);
      clearInterval(tipInterval);
      progress = 100;
      if (fill) fill.style.width = '100%';
      if (pct) pct.textContent = '100%';
      setTimeout(() => {
        if (preloader) preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initHeroAnimations();
      }, 400);
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('load', () => setTimeout(hidePreloader, 1800));
    setTimeout(hidePreloader, 4500);
  }

  // ════════════════════════════════════════════════════════
  // MODULE 2 — CUSTOM CURSOR (disabled)
  // ════════════════════════════════════════════════════════
  function initCursor() {
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('customCursorFollower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function loop() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll('a, button, .clickable, .nav-link, .nav-cta, .flip-card, .menu-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }


  // ════════════════════════════════════════════════════════
  // MODULE 3 — SCROLL PROGRESS
  // ════════════════════════════════════════════════════════
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    function update() {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (scrolled / total * 100) + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 4 — SMART HEADER
  // ════════════════════════════════════════════════════════
  function initSmartHeader() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    let lastScroll = 0;
    const SHOW_THRESHOLD = 80;

    function onScroll() {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > SHOW_THRESHOLD);

      // Hide on scroll down, show on scroll up
      if (y > lastScroll && y > 300) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      lastScroll = y;

      // Back to top
      const btt = document.getElementById('backToTop');
      if (btt) btt.classList.toggle('visible', y > 500);

      updateActiveNav();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 5 — ACTIVE NAV
  // ════════════════════════════════════════════════════════
  function updateActiveNav() {
    const sects = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    const pos = window.scrollY + 200;
    let cur = '';
    sects.forEach(s => { if (s.offsetTop <= pos) cur = s.id; });
    links.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 6 — MOBILE NAV
  // ════════════════════════════════════════════════════════
  function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    const navOverlay = document.getElementById('navOverlay');
    let navOpen = false;

    function setNav(open) {
      navOpen = open;
      mainNav.classList.toggle('is-open', open);
      navOverlay.classList.toggle('active', open);
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', String(open));
    }

    if (hamburger) hamburger.addEventListener('click', () => setNav(!navOpen));
    if (navOverlay) navOverlay.addEventListener('click', () => setNav(false));
    if (mainNav) mainNav.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
      if (window.innerWidth <= 992) setNav(false);
    }));
    window.addEventListener('resize', () => { if (window.innerWidth > 992 && navOpen) setNav(false); });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 7 — SMOOTH SCROLL
  // ════════════════════════════════════════════════════════
  function initSmoothScroll() {
    const header = document.getElementById('siteHeader');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (!id || id === '#') return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        const top = el.offsetTop - (header ? header.offsetHeight : 0) - 10;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
    const btt = document.getElementById('backToTop');
    if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ════════════════════════════════════════════════════════
  // MODULE 8 — HERO ANIMATIONS (Smooth Line-by-Line)
  // ════════════════════════════════════════════════════════
  function initHeroAnimations() {
    // Smooth line-by-line subtitle animation (no typewriter)
    const subtitleEl = document.getElementById('typedSubtitle');
    if (subtitleEl) {
      const lines = [
        'Patna\'s Finest Rooftop Experience.',
        'Where Every Meal Meets the Sky.',
        'The perfect place for family dinners & celebrations.',
        'Authentic Indian, Chinese, Continental & Bar.'
      ];
      let currentIndex = 0;
      
      function showNextLine() {
        // Fade out
        subtitleEl.style.opacity = '0';
        subtitleEl.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          subtitleEl.textContent = lines[currentIndex];
          // Fade in
          subtitleEl.style.opacity = '1';
          subtitleEl.style.transform = 'translateY(0)';
          
          currentIndex = (currentIndex + 1) % lines.length;
        }, 600);
      }
      
      // Initial display
      subtitleEl.textContent = lines[0];
      subtitleEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      // Change every 4 seconds
      setInterval(showNextLine, 4000);
    }

    // 3D tilt on hero visual
    const tiltCard = document.getElementById('heroTiltCard');
    const heroVisual = document.getElementById('heroVisual');
    if (tiltCard && window.matchMedia('(hover: hover)').matches) {
      heroVisual.addEventListener('mousemove', e => {
        const rect = heroVisual.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        tiltCard.style.transform = `perspective(800px) rotateY(${dx * 14}deg) rotateX(${-dy * 10}deg)`;
      });
      heroVisual.addEventListener('mouseleave', () => {
        tiltCard.style.transition = 'transform 0.6s cubic-bezier(0.22,0.61,0.36,1)';
        tiltCard.style.transform = '';
        setTimeout(() => { tiltCard.style.transition = ''; }, 600);
      });
    }
  }

  // ════════════════════════════════════════════════════════
  // MODULE 9 — FOOD PARTICLES CANVAS
  // ════════════════════════════════════════════════════════
  function initFoodParticles() {
    const canvas = document.getElementById('foodCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const foods = [];

    let W, H, mouseX = -9999, mouseY = -9999;
    const particles = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    });
    canvas.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = -Math.random() * 0.8 - 0.2;
        this.size = Math.random() * 18 + 14;
        this.emoji = foods[Math.floor(Math.random() * foods.length)];
        this.opacity = Math.random() * 0.4 + 0.15;
        this.spin = (Math.random() - 0.5) * 0.03;
        this.angle = Math.random() * Math.PI * 2;
        this.wobble = Math.random() * 0.02 + 0.005;
        this.wobblePhase = Math.random() * Math.PI * 2;
      }
      update() {
        this.wobblePhase += this.wobble;
        this.x += this.vx + Math.sin(this.wobblePhase) * 0.3;
        this.y += this.vy;
        this.angle += this.spin;

        // Repel from cursor
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += dx / dist * force * 3;
          this.y += dy / dist * force * 3;
        }

        if (this.y < -30 || this.x < -40 || this.x > W + 40) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.font = `${this.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, 0, 0);
        ctx.restore();
      }
    }

    for (let i = 0; i < 22; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ════════════════════════════════════════════════════════
  // MODULE 10 — SPARKLE TRAIL (disabled)
  // ════════════════════════════════════════════════════════
  function initSparkleTrail() { /* removed */ }

  // ════════════════════════════════════════════════════════
  // MODULE 11 — SCROLL REVEAL
  // ════════════════════════════════════════════════════════
  function initScrollReveal() {
    const items = document.querySelectorAll('.sr, .sr-left, .sr-right, .sr-fade');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.sr,.sr-left,.sr-right,.sr-fade') || []);
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 80, 500));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    items.forEach(i => obs.observe(i));
  }

  // ════════════════════════════════════════════════════════
  // MODULE 12 — ODOMETER COUNTERS
  // ════════════════════════════════════════════════════════
  function initCounters() {
    const counters = document.querySelectorAll('.odometer');
    let done = false;

    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done) {
        done = true;
        counters.forEach((el, i) => setTimeout(() => animateCounter(el), i * 200));
        obs.disconnect();
      }
    }, { threshold: 0.3 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) obs.observe(statsBar);

    function animateCounter(el) {
      const target = parseFloat(el.dataset.count);
      const decimal = el.dataset.decimal;
      const suffix = el.dataset.suffix || '';
      const duration = 2200;
      const start = performance.now();

      // Color shift during count
      const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C084FC'];
      let colorIdx = 0;
      const colorInterval = setInterval(() => {
        el.style.backgroundImage = `linear-gradient(135deg, ${colors[colorIdx % colors.length]}, ${colors[(colorIdx + 1) % colors.length]})`;
        colorIdx++;
      }, 200);

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        let val = Math.floor(ease * target);

        if (decimal !== undefined && decimal !== '') {
          const decVal = Math.floor(ease * parseInt(decimal, 10));
          el.textContent = (progress >= 1) ? target + '.' + decimal + suffix : val + '.' + decVal + suffix;
        } else {
          el.textContent = val + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          clearInterval(colorInterval);
          el.style.backgroundImage = '';
          // Show verified badge + particle burst
          const item = el.closest('.stat-item');
          if (item) {
            item.classList.add('counted');
            burstParticles(item);
          }
        }
      }
      requestAnimationFrame(update);
    }

    function burstParticles(container) {
      const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#C2185B'];
      for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
          position:absolute; width:6px; height:6px; border-radius:50%;
          background:${colors[i % colors.length]};
          top:50%; left:50%; pointer-events:none; z-index:10;
          transform: translate(-50%,-50%);
          animation: burst${i} 0.8s ease-out forwards;
        `;
        const angle = (i / 8) * Math.PI * 2;
        const dist = 40 + Math.random() * 20;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        const style = document.createElement('style');
        style.textContent = `@keyframes burst${i} { to { transform: translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0); opacity:0; } }`;
        document.head.appendChild(style);
        container.appendChild(p);
        setTimeout(() => { p.remove(); style.remove(); }, 900);
      }
    }
  }

  // ════════════════════════════════════════════════════════
  // MODULE 13 — MAGNETIC BUTTONS
  // ════════════════════════════════════════════════════════
  function initMagneticButtons() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    document.querySelectorAll('.magnetic-btn, .btn-primary, .nav-cta').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.18;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.22,0.61,0.36,1)';
        btn.style.transform = '';
        setTimeout(() => btn.style.transition = '', 500);
      });
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 14 — MENU CARD 3D TILT
  // ════════════════════════════════════════════════════════
  function initMenuCardTilt() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    document.querySelectorAll('.menu-cat-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-8px) scale(1.02) perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.5s cubic-bezier(0.22,0.61,0.36,1)';
        card.style.transform = '';
        setTimeout(() => card.style.transition = '', 500);
      });
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 15 — REVIEW STARS ANIMATION
  // ════════════════════════════════════════════════════════
  function initStarAnimation() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const starsEl = entry.target.querySelector('.review-stars-anim');
          if (starsEl) {
            setTimeout(() => starsEl.classList.add('animated'), 300);
            const stars = parseInt(starsEl.dataset.stars || 5);
            const starSpans = starsEl.querySelectorAll('span');
            starSpans.forEach((s, i) => {
              if (i < stars) {
                setTimeout(() => { s.style.color = '#FFD93D'; s.style.transform = 'scale(1.3)'; setTimeout(() => s.style.transform = '', 200); }, i * 120 + 500);
              }
            });
            // Confetti for 5-star reviews
            if (stars === 5) {
              setTimeout(() => {
                if (window.confetti) {
                  const r = entry.target.getBoundingClientRect();
                  confetti({ particleCount: 30, spread: 60, startVelocity: 25, origin: { x: (r.left + r.width / 2) / window.innerWidth, y: r.top / window.innerHeight }, colors: ['#FFD93D', '#FF6B6B', '#6BCB77', '#C2185B'] });
                }
              }, 1000);
            }
          }
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.review-card').forEach(c => obs.observe(c));
  }

  // ════════════════════════════════════════════════════════
  // MODULE 16 — VIDEO PLAYERS
  // ════════════════════════════════════════════════════════
  function initVideoPlayers() {
    function setup(videoId, overlayId, playBtnId, controlsId) {
      const video = document.getElementById(videoId);
      const overlay = document.getElementById(overlayId);
      const playBtn = document.getElementById(playBtnId);
      const controls = document.getElementById(controlsId);
      if (!video) return;

      const progressFill = controls?.querySelector('.video-progress-fill');
      const thumb = controls?.querySelector('.video-thumb');
      const timeEl = controls?.querySelector('.vid-time');
      const playPauseBtn = controls?.querySelector('#vidPlayPause');
      const muteBtn = controls?.querySelector('#vidMute');
      const pipBtn = controls?.querySelector('#vidPip');

      function fmt(t) {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
      }

      function play() { video.play(); overlay.classList.add('playing'); }
      function pause() { video.pause(); overlay.classList.remove('playing'); }

      if (playBtn) {
        playBtn.addEventListener('click', e => { e.stopPropagation(); play(); });
      }
      if (overlay) {
        overlay.addEventListener('click', () => play());
      }
      video.addEventListener('click', () => { if (video.paused) play(); else pause(); });
      video.addEventListener('ended', () => { overlay.classList.remove('playing'); });

      // Progress bar update
      video.addEventListener('timeupdate', () => {
        if (!video.duration) return;
        const pct = (video.currentTime / video.duration) * 100;
        if (progressFill) progressFill.style.width = pct + '%';
        if (thumb) thumb.style.left = pct + '%';
        if (timeEl) timeEl.textContent = `${fmt(video.currentTime)} / ${fmt(video.duration)}`;
      });

      if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => { if (video.paused) play(); else pause(); });
      }
      if (muteBtn) {
        muteBtn.addEventListener('click', () => { video.muted = !video.muted; muteBtn.innerHTML = video.muted ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>` : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>`; });
      }
      if (pipBtn) {
        pipBtn.addEventListener('click', async () => { try { await video.requestPictureInPicture(); } catch (e) { } });
      }

      // Touch gestures
      let touchStart = 0;
      video.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
      video.addEventListener('touchend', e => {
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 60) video.currentTime += diff > 0 ? 10 : -10;
      }, { passive: true });

      // Double tap like
      let lastTap = 0;
      video.addEventListener('touchend', e => {
        const now = Date.now();
        if (now - lastTap < 300) {
          if (window.confetti) {
            confetti({ particleCount: 40, spread: 80, origin: { x: 0.5, y: 0.5 }, colors: ['#FF6B6B', '#FFD93D', '#C2185B'] });
          }
        }
        lastTap = now;
      }, { passive: true });
    }

    setup('showcaseVideo', 'videoOverlayUI', 'videoPlayBtn', 'videoControls');
    setup('showcaseVideo2', 'videoOverlayUI2', 'videoPlayBtn2', null);
  }

  // ════════════════════════════════════════════════════════
  // MODULE 17 — GALLERY FILTER & LIGHTBOX
  // ════════════════════════════════════════════════════════
  function initGallery() {
    // Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        galleryItems.forEach(item => {
          const cat = item.dataset.category;
          if (filter === 'all' || cat === filter) {
            item.classList.remove('hidden');
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                item.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
                item.style.opacity = '1';
                item.style.transform = '';
              });
            });
          } else {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => item.classList.add('hidden'), 320);
          }
        });
      });
    });

    // Instagram-style heart
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) activeFilter.click();

    document.querySelectorAll('.gallery-heart').forEach(heart => {
      heart.addEventListener('click', e => {
        e.stopPropagation();
        const liked = heart.dataset.liked === 'true';
        heart.dataset.liked = !liked;
        heart.innerHTML = !liked ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="var(--crimson)" stroke="var(--crimson)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>` : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
        heart.classList.toggle('liked', !liked);
        if (!liked && window.confetti) {
          const r = heart.getBoundingClientRect();
          confetti({ particleCount: 20, spread: 60, startVelocity: 20, origin: { x: r.left / window.innerWidth, y: r.top / window.innerHeight }, colors: ['#FF6B6B', '#FFD93D', '#C2185B'] });
        }
      });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');
    let images = [], idx = 0;

    function collectImages(clickedImg) {
      images = [];
      const isGallery = clickedImg.closest('#galleryGrid');
      if (isGallery) {
        document.querySelectorAll('#galleryGrid .gallery-item:not(.hidden) img').forEach(img => images.push(img.src));
      } else {
        images.push(clickedImg.src);
      }
    }

    document.querySelectorAll('#galleryGrid .gallery-item img, .about-img-main, .about-img-accent, .flip-card-front .food-card-img img, .event-img-wrap img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', e => {
        e.stopPropagation();
        collectImages(e.currentTarget);
        idx = images.indexOf(e.currentTarget.src);
        if (idx < 0) idx = 0;
        openLB();
      });
    });

    function openLB() {
      lbImg.src = images[idx];
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLB() {
      lightbox.classList.remove('active');
      lbImg.src = '';
      document.body.style.overflow = '';
    }
    function navLB(d) {
      idx = (idx + d + images.length) % images.length;
      lbImg.style.animation = 'none';
      void lbImg.offsetWidth;
      lbImg.style.animation = 'zoomIn 0.3s ease both';
      lbImg.src = images[idx];
    }

    if (lbClose) lbClose.addEventListener('click', closeLB);
    if (lbPrev) lbPrev.addEventListener('click', e => { e.stopPropagation(); navLB(-1); });
    if (lbNext) lbNext.addEventListener('click', e => { e.stopPropagation(); navLB(1); });
    if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });

    // Swipe lightbox
    let lbTouchX = 0;
    if (lightbox) {
      lightbox.addEventListener('touchstart', e => { lbTouchX = e.changedTouches[0].clientX; }, { passive: true });
      lightbox.addEventListener('touchend', e => {
        const diff = lbTouchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 60) navLB(diff > 0 ? 1 : -1);
      }, { passive: true });
    }

    // Lightbox keyboard
    window.addEventListener('keydown', e => {
      if (!lightbox?.classList.contains('active')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') navLB(-1);
      if (e.key === 'ArrowRight') navLB(1);
    });

    // Lightbox heart
    const lbHeart = document.getElementById('lightboxHeart');
    if (lbHeart) {
      lbHeart.addEventListener('click', () => {
        lbHeart.innerHTML = lbHeart.innerHTML.includes('fill="var(--crimson)"') ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>` : `<svg viewBox="0 0 24 24" width="18" height="18" fill="var(--crimson)" stroke="var(--crimson)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
        lbHeart.style.transform = 'scale(1.5)';
        setTimeout(() => lbHeart.style.transform = '', 200);
        if (window.confetti) confetti({ particleCount: 30, spread: 70, origin: { x: 0.08, y: 0.08 }, colors: ['#FF6B6B', '#FFD93D'] });
      });
    }
  }

  // ════════════════════════════════════════════════════════
  // MODULE 18 — REVIEWS CAROUSEL
  // ════════════════════════════════════════════════════════
  function initReviews() {
    const track = document.getElementById('reviewsTrack');
    const dotsEl = document.getElementById('reviewsDots');
    if (!track) return;
    let cards, perPage, totalPages, page = 0, timer;

    function setup() {
      cards = track.querySelectorAll('.review-card');
      if (!cards.length) return;
      perPage = window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
      totalPages = Math.ceil(cards.length / perPage);
      if (dotsEl) {
        dotsEl.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
          const d = document.createElement('button');
          d.className = 'reviews-dot' + (i === 0 ? ' active' : '');
          d.setAttribute('aria-label', `Go to page ${i + 1}`);
          d.addEventListener('click', () => goTo(i));
          dotsEl.appendChild(d);
        }
      }
      goTo(0);
      startAuto();
    }

    function goTo(p) {
      page = p;
      const w = (cards[0]?.offsetWidth || 300) + 20;
      track.style.transform = `translateX(-${p * perPage * w}px)`;
      dotsEl?.querySelectorAll('.reviews-dot').forEach((d, i) => d.classList.toggle('active', i === p));
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(() => goTo((page + 1) % totalPages), 5000);
    }

    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', startAuto);

    let tx = 0;
    track.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = tx - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && page < totalPages - 1) goTo(page + 1);
        else if (diff < 0 && page > 0) goTo(page - 1);
        startAuto();
      }
    }, { passive: true });

    setup();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(setup, 200); });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 19 — CONTACT FORM
  // ════════════════════════════════════════════════════════
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Character count ring
    const msg = document.getElementById('message');
    const charRing = document.getElementById('charRingFill');
    const charCount = document.getElementById('charCount');
    const MAX_CHARS = 300;
    const CIRCUMFERENCE = 100;

    if (msg && charRing) {
      msg.addEventListener('input', () => {
        const len = msg.value.length;
        const pct = len / MAX_CHARS;
        const offset = CIRCUMFERENCE - pct * CIRCUMFERENCE;
        charRing.style.strokeDashoffset = offset;
        if (charCount) charCount.textContent = `${len}/${MAX_CHARS}`;
        charRing.style.stroke = pct > 0.9 ? '#ef5350' : pct > 0.7 ? '#FFD93D' : 'var(--crimson)';
      });
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('email')?.value || '';
      const fm = document.getElementById('formMessage');
      const btn = document.getElementById('submitBtn');

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        fm.textContent = 'Please enter a valid email address.';
        fm.className = 'form-message error';
        form.classList.add('form-shake');
        setTimeout(() => form.classList.remove('form-shake'), 500);
        return;
      }

      if (btn) { btn.classList.add('loading'); btn.disabled = true; }
      fm.textContent = '';
      fm.className = 'form-message';

      await new Promise(r => setTimeout(r, 1400));

      if (btn) { btn.classList.remove('loading'); btn.classList.add('success-state'); }
      fm.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg>` + ' Message sent! We\'ll get back to you soon.';
      fm.className = 'form-message success';
      form.reset();
      if (msg && charRing && charCount) {
        charRing.style.strokeDashoffset = CIRCUMFERENCE;
        charCount.textContent = `0/${MAX_CHARS}`;
      }

      // Confetti
      if (window.confetti) {
        confetti({ particleCount: 80, spread: 90, origin: { x: 0.5, y: 0.6 }, colors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#C2185B', '#4D96FF'] });
      }

      setTimeout(() => {
        if (btn) { btn.classList.remove('success-state'); btn.disabled = false; }
        fm.className = 'form-message';
      }, 5000);
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 20 — DARK MODE TOGGLE (Device Preference)
  // ════════════════════════════════════════════════════════
  function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const icon = toggle?.querySelector('.theme-icon');
    const html = document.documentElement;

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use stored preference, fallback to system preference
    let isDark;
    const stored = localStorage.getItem('tk-theme');
    if (stored) {
      isDark = stored === 'dark';
    } else {
      isDark = prefersDark;
    }
    
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (icon) icon.innerHTML = isDark ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>` : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;

    // Listen to system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('tk-theme')) {
        isDark = e.matches;
        html.setAttribute('data-theme', isDark ? 'dark' : 'light');
        if (icon) icon.innerHTML = isDark ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>` : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
      }
    });

    if (toggle) {
      toggle.addEventListener('click', () => {
        isDark = !isDark;
        html.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('tk-theme', isDark ? 'dark' : 'light');
        if (icon) icon.innerHTML = isDark ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>` : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;
      });
    }
  }

  // ════════════════════════════════════════════════════════
  // MODULE 21 — SOUND TOGGLE (placeholder — sounds disabled)
  // ════════════════════════════════════════════════════════
  function initSoundToggle() {
    const btn = document.getElementById('soundToggle');
    const icon = btn?.querySelector('.sound-icon');
    let soundOn = false;

    if (btn) {
      btn.addEventListener('click', () => {
        soundOn = !soundOn;
        if (icon) icon.innerHTML = soundOn ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>` : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
        // Sound implementation placeholder
        if (soundOn) {
          // Would initialize Web Audio API here
          console.log('Sound enabled');
        }
      });
    }
  }

  // ════════════════════════════════════════════════════════
  // MODULE 22 — ORDER NOW CONFETTI
  // ════════════════════════════════════════════════════════
  function initOrderConfetti() {
    const orderBtn = document.getElementById('orderNowBtn');
    const whatsappBtn = document.getElementById('whatsappOrderBtn');

    [orderBtn, whatsappBtn].forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        if (window.confetti) {
          confetti({ particleCount: 100, spread: 120, origin: { y: 0.5 }, colors: ['#FF6B6B', '#FFD93D', '#6BCB77', '#C2185B', '#4D96FF', '#C084FC'] });
        }
      });
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 23 — TABLE BOOKING MODAL
  // ════════════════════════════════════════════════════════
  function initBookingModal() {
    const modal = document.getElementById('bookingModal');
    const openBtn = document.getElementById('openBookingBtn');
    const closeBtn = document.getElementById('closeBookingModal');

    if (openBtn) openBtn.addEventListener('click', () => { modal.classList.add('active'); });
    if (closeBtn) closeBtn.addEventListener('click', () => { modal.classList.remove('active'); });
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') modal?.classList.remove('active'); });
  }



  // ════════════════════════════════════════════════════════
  // MODULE 25 — CHATBOT
  // ════════════════════════════════════════════════════════
  function initChatbot() {
    const toggle = document.getElementById('chatbotToggle');
    const window_ = document.getElementById('chatbotWindow');
    const chatIcon = toggle?.querySelector('.chat-icon');
    const closeIcon = toggle?.querySelector('.chat-close-icon');
    const messages = document.getElementById('chatMessages');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    const badge = toggle?.querySelector('.chatbot-badge');
    if (!toggle) return;

    let isOpen = false;

    function openChat() {
      isOpen = true;
      window_.style.display = 'block';
      chatIcon.style.display = 'none';
      closeIcon.style.display = 'block';
      if (badge) badge.style.display = 'none';
    }
    function closeChat() {
      isOpen = false;
      window_.style.display = 'none';
      chatIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }

    toggle.addEventListener('click', () => { if (isOpen) closeChat(); else openChat(); });

    const responses = {
      'timings': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> We're open daily from **11 AM to 11 PM**. Come anytime!`,
      'hours': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> We're open daily from **11 AM to 11 PM**.`,
      'delivery': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg> We deliver via **Zomato & Swiggy**. Free delivery within 3km on orders above ₹300!`,
      'best dish': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg> Our bestsellers are **Crispy Chilli Starters (₹309)**, **Chicken Special (₹339)**, and **Naan & Paneer Combo (₹349)**!`,
      'menu': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg> We serve 133+ dishes — Indian, Chinese, Tandoori & Continental. Our menu categories are visible on the website!`,
      'price': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg> Our prices range from ₹25 (Roti) to ₹599 (Tandoori). Very affordable!`,
      'reserve': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> You can book a table via WhatsApp at +91 9031023202 or use the "Book a Table" button!`,
      'address': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> 6th Floor, KV Complex, Bailey Road, above Silk House Hotel, RPS More, Kaliket Nagar, Patna, Bihar 801503.`,
      'phone': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.19 12a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> Call us: 09031023202`,
      'order': `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg> You can order via WhatsApp, Zomato, or Swiggy! Delivery is free within 3km for orders over ₹300.`,
    };

    function findResponse(msg) {
      const m = msg.toLowerCase();
      for (const [key, val] of Object.entries(responses)) {
        if (m.includes(key)) return val;
      }
      return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M6 13.87A4 4 0 013.13 11 4 4 0 016 4a4 4 0 018 0 4 4 0 012.87 7 4 4 0 01-2.87 2.87V18a2 2 0 01-2 2H8a2 2 0 01-2-2z"/></svg> Great question! For the best answers, please WhatsApp us at 09031023202. We're always happy to help!`;
    }

    function addMsg(text, type) {
      const div = document.createElement('div');
      div.className = `chat-msg ${type}`;
      div.innerHTML = `<span>${text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</span>`;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return div;
    }

    function typing() {
      const div = document.createElement('div');
      div.className = 'chat-msg bot chat-typing';
      div.innerHTML = `<span><div class="typing-dots"><div></div><div></div><div></div></div></span>`;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return div;
    }

    function handleSend() {
      const text = input?.value.trim();
      if (!text) return;
      addMsg(text, 'user');
      input.value = '';
      const t = typing();
      setTimeout(() => {
        t.remove();
        addMsg(findResponse(text), 'bot');
      }, 1000 + Math.random() * 800);
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

    document.querySelectorAll('.quick-reply').forEach(qr => {
      qr.addEventListener('click', () => {
        if (input) input.value = qr.dataset.msg || '';
        handleSend();
      });
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 26 — AURORA / BACKGROUND EFFECTS
  // ════════════════════════════════════════════════════════
  function initAuroraMouseParallax() {
    const blobs = document.querySelectorAll('.blob-1, .blob-2, .blob-3, .blob-4');
    if (!blobs.length || !window.matchMedia('(hover: hover)').matches) return;

    document.addEventListener('mousemove', e => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      blobs.forEach((blob, i) => {
        const factor = (i + 1) * 8;
        blob.style.transform = `translate(${dx * factor}px, ${dy * factor}px) scale(1)`;
      });
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 27 — NAV BLOB EFFECT
  // ════════════════════════════════════════════════════════
  function initNavBlob() {
    const navBlob = document.getElementById('navBlob');
    const links = document.querySelectorAll('.nav-link');
    if (!navBlob || !window.matchMedia('(hover: hover)').matches) return;

    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const r = link.getBoundingClientRect();
        const nr = navBlob.parentElement.getBoundingClientRect();
        navBlob.style.opacity = '1';
        navBlob.style.left = (r.left - nr.left + r.width / 2 - 30) + 'px';
        navBlob.style.width = (r.width + 20) + 'px';
        navBlob.style.height = r.height + 'px';
        navBlob.style.borderRadius = '8px';
      });
      link.addEventListener('mouseleave', () => { navBlob.style.opacity = '0'; });
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 28 — MISC & INIT
  // ════════════════════════════════════════════════════════
  function initMisc() {
    // Lazy image fade
    document.querySelectorAll('img').forEach(img => {
      if (img.complete) return;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      img.addEventListener('load', () => { img.style.opacity = '1'; });
    });

    // About exp badge parallax on scroll
    window.addEventListener('scroll', () => {
      const badge = document.querySelector('.about-exp-badge');
      if (badge) {
        const scrolled = window.scrollY * 0.05;
        badge.style.transform = `translateY(${-scrolled}px)`;
      }
    }, { passive: true });

    // Easter egg — logo click sequence
    const brand = document.querySelector('.brand');
    let clickCount = 0;
    let clickTimer;
    if (brand) {
      brand.addEventListener('click', e => {
        e.preventDefault();
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 1500);
        if (clickCount >= 5) {
          clickCount = 0;
          if (window.confetti) confetti({ particleCount: 200, spread: 180, origin: { y: 0 }, colors: ['#FFD700', '#DAA520', '#B8860B', '#FFD8A6', '#ffffff'] });
          alert('Easter Egg! Use code SKYLITESECRET for 10% off your next order! Show this to our team.');
        }
      });
    }
  }

  // ════════════════════════════════════════════════════════
  // BOOT — Initialize all modules
  // ════════════════════════════════════════════════════════
  function boot() {
    initDarkMode();
    initPreloader();
    initScrollProgress();
    initSmartHeader();
    initMobileNav();
    initSmoothScroll();
    initScrollReveal();
    initCounters();
    initMagneticButtons();
    initMenuCardTilt();
    initStarAnimation();
    initVideoPlayers();
    initGallery();
    initReviews();
    initContactForm();
    initSoundToggle();
    initOrderConfetti();
    initBookingModal();

    initChatbot();
    initAuroraMouseParallax();
    initNavBlob();
    initMisc();

    // Initial scroll
    window.dispatchEvent(new Event('scroll'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();

// ═══════ MENU TABS LOGIC ═══════
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.menu-tab');
  const contents = document.querySelectorAll('.menu-tab-content');
  
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
});