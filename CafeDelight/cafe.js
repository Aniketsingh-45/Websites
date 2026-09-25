/* ============================================================
   CAFE DE-LIGHT — Comprehensive Modern JavaScript Engine v3.0
   Danapur & Saguna More, Patna | Multicuisine Restaurant & Lounge
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
    const tipEl = document.getElementById('preloaderTip');
    if (!preloader) return;

    const tips = [
      'Preparing your delightful experience...',
      'Steaming authentic Momos...',
      'Brewing fresh espresso & artisan shakes...',
      'Simmering slow-cooked Dum Biryani...',
      'Setting up your cozy table at Saguna More...',
      'Welcome to Cafe De-Light!'
    ];

    let progress = 0;
    let tipIdx = 0;
    const tipInterval = setInterval(() => {
      tipIdx = (tipIdx + 1) % tips.length;
      if (tipEl) tipEl.textContent = tips[tipIdx];
    }, 500);

    const interval = setInterval(() => {
      const step = Math.random() * 15 + 8;
      progress = Math.min(progress + step, 96);
      if (fill) fill.style.width = progress + '%';
      if (pct) pct.textContent = Math.floor(progress) + '%';
    }, 100);

    function hidePreloader() {
      clearInterval(interval);
      clearInterval(tipInterval);
      if (fill) fill.style.width = '100%';
      if (pct) pct.textContent = '100%';
      setTimeout(() => {
        preloader.classList.add('hidden');
        preloader.style.display = 'none';
        document.body.style.overflow = '';
        if (typeof initHeroAnimations === 'function') {
          initHeroAnimations();
        }
      }, 200);
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('load', () => setTimeout(hidePreloader, 300));
    setTimeout(hidePreloader, 1200); // safety fallback
  }

  // ════════════════════════════════════════════════════════
  // MODULE 2 — CUSTOM CURSOR
  // ════════════════════════════════════════════════════════
  function initCursor() {
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('customCursorFollower');
    if (!cursor || !follower || window.innerWidth < 1024) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function loop() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll('a, button, .clickable, .nav-link, .nav-cta, .flip-card, .menu-item-card, .gallery-item, .rs-box').forEach(el => {
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
  // MODULE 3 — SCROLL PROGRESS BAR
  // ════════════════════════════════════════════════════════
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    function update() {
      const scrollY = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrollY / total) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ════════════════════════════════════════════════════════
  // MODULE 4 — SMART HEADER & MOBILE NAV
  // ════════════════════════════════════════════════════════
  function initSmartHeader() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    let lastY = 0;

    function onScroll() {
      const y = window.scrollY;
      if (y > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      if (y > 250 && y > lastY) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // Highlight active nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#mainNav .nav-link');
    function updateActiveNav() {
      const scrollPos = window.scrollY + 140;
      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // Mobile nav drawer
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const closeDrawer = document.getElementById('closeDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobile(open) {
      if (mobileDrawer) mobileDrawer.classList.toggle('active', open);
      if (backdrop) backdrop.classList.toggle('active', open);
      if (menuToggle) menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    if (menuToggle) menuToggle.addEventListener('click', () => toggleMobile(true));
    if (closeDrawer) closeDrawer.addEventListener('click', () => toggleMobile(false));
    if (backdrop) backdrop.addEventListener('click', () => toggleMobile(false));
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobile(false));
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 5 — DYNAMIC IST OPEN/CLOSED STATUS
  // ════════════════════════════════════════════════════════
  function updateLiveStatus() {
    const headerPill = document.getElementById('headerStatusPill');
    const contactPill = document.getElementById('contactStatusPill');
    
    // Convert to Indian Standard Time (UTC + 5:30)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (3600000 * 5.5));
    const hours = ist.getHours();
    const mins = ist.getMinutes();
    const timeVal = hours + mins / 60;

    // Operating hours: 11:00 AM to 11:00 PM (11:00 to 23:00)
    const isOpen = timeVal >= 11 && timeVal < 23;

    if (headerPill) {
      headerPill.innerHTML = isOpen 
        ? '<span class="status-dot open"></span> Open Now • 11 AM - 11 PM'
        : '<span class="status-dot closed"></span> Closed Now • Opens 11 AM';
      headerPill.className = `live-status-pill ${isOpen ? 'is-open' : 'is-closed'}`;
    }
    if (contactPill) {
      contactPill.innerHTML = isOpen
        ? '<span class="status-dot open"></span> Open Today (11:00 AM – 11:00 PM)'
        : '<span class="status-dot closed"></span> Closed (Opens 11:00 AM)';
      contactPill.className = `live-status-pill ${isOpen ? 'is-open' : 'is-closed'}`;
    }
  }

  // ════════════════════════════════════════════════════════
  // MODULE 6 — HERO ROTATING SUBTITLES & 3D TILT
  // ════════════════════════════════════════════════════════
  function initHeroAnimations() {
    const subtitleEl = document.getElementById('typedSubtitle');
    if (subtitleEl) {
      const lines = [
        "Danapur's Favorite Multicuisine Cafe & Lounge",
        "Authentic Steamed, Fried & Kurkure Momos",
        "Slow-Cooked Chicken & Veg Dum Biryani",
        "Sizzling Chilli Chicken, Noodles & Pizzas",
        "Artisan Cold Coffee, Shakes & Warm Ambience",
        "Best Casual Dining Spot on Saguna Khagaul Road"
      ];
      let currentIndex = 1;

      function rotateLine() {
        subtitleEl.style.opacity = '0';
        subtitleEl.style.transform = 'translateY(8px)';
        setTimeout(() => {
          subtitleEl.textContent = lines[currentIndex];
          subtitleEl.style.opacity = '1';
          subtitleEl.style.transform = 'translateY(0)';
          currentIndex = (currentIndex + 1) % lines.length;
        }, 400);
      }

      subtitleEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      setInterval(rotateLine, 3500);
    }

    // 3D tilt on hero visual
    const tiltCard = document.getElementById('heroTiltCard');
    const heroVisual = document.getElementById('heroVisual');
    if (tiltCard && heroVisual && window.matchMedia('(hover: hover)').matches) {
      heroVisual.addEventListener('mousemove', e => {
        const rect = heroVisual.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        tiltCard.style.transform = `perspective(1000px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      heroVisual.addEventListener('mouseleave', () => {
        tiltCard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
      });
    }
  }

  // ════════════════════════════════════════════════════════
  // MODULE 7 — STATS COUNTERS (GSAP / Vanilla)
  // ════════════════════════════════════════════════════════
  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target') || 0);
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1800;
          const startTime = performance.now();

          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            current = ease * target;
            el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current) + '+';
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              el.textContent = isDecimal ? target.toFixed(1) : target + '+';
            }
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  // ════════════════════════════════════════════════════════
  // MODULE 8 — VIDEO TOUR CONTROLLER (AUTHENTIC VIDEO)
  // ════════════════════════════════════════════════════════
  function initVideoPlayer() {
    const video = document.getElementById('showcaseVideo');
    const overlay = document.getElementById('videoOverlayUI');
    const playBtn = document.getElementById('videoPlayBtn');
    const controls = document.getElementById('videoControls');
    if (!video) return;

    const progressFill = controls?.querySelector('.video-progress-fill');
    const timeEl = controls?.querySelector('.vid-time');
    const playPauseBtn = controls?.querySelector('#vidPlayPause');
    const muteBtn = controls?.querySelector('#vidMute');
    const pipBtn = controls?.querySelector('#vidPip');

    function fmt(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    function playVideo() {
      video.play().then(() => {
        if (overlay) overlay.classList.add('playing');
        if (playPauseBtn) {
          playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        }
      }).catch(err => console.log('Video play error:', err));
    }

    function pauseVideo() {
      video.pause();
      if (overlay) overlay.classList.remove('playing');
      if (playPauseBtn) {
        playPauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      }
    }

    if (playBtn) playBtn.addEventListener('click', (e) => { e.stopPropagation(); playVideo(); });
    if (overlay) overlay.addEventListener('click', () => playVideo());
    video.addEventListener('click', () => { if (video.paused) playVideo(); else pauseVideo(); });
    video.addEventListener('ended', () => { if (overlay) overlay.classList.remove('playing'); });

    // Update progress
    video.addEventListener('timeupdate', () => {
      if (!video.duration) return;
      const pct = (video.currentTime / video.duration) * 100;
      if (progressFill) progressFill.style.width = pct + '%';
      if (timeEl) timeEl.textContent = `${fmt(video.currentTime)} / ${fmt(video.duration)}`;
    });

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        if (video.paused) playVideo(); else pauseVideo();
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted
          ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
          : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
      });
    }

    if (pipBtn) {
      pipBtn.addEventListener('click', async () => {
        try {
          if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
          } else if (document.pictureInPictureEnabled) {
            await video.requestPictureInPicture();
          }
        } catch (e) {
          console.warn('PiP error:', e);
        }
      });
    }

    // Interactive scrub on progress bar click
    const progressBar = document.getElementById('videoProgressBar');
    if (progressBar) {
      progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickPos = (e.clientX - rect.left) / rect.width;
        if (video.duration) {
          video.currentTime = clickPos * video.duration;
        }
      });
    }
  }

  // ════════════════════════════════════════════════════════
  // MODULE 9 — MENU CATEGORY TABS FILTER
  // ════════════════════════════════════════════════════════
  function initMenuTabs() {
    const tabBtns = document.querySelectorAll('.menu-tab-btn');
    const menuCards = document.querySelectorAll('.menu-item-card');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetCategory = btn.getAttribute('data-category');

        menuCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (targetCategory === 'all' || cardCat === targetCategory) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }


  function initBookingModal() {
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.getElementById('closeBookingModal');
    const form = document.getElementById('tableBookingForm');
    const openBtns = [
      document.getElementById('openBookingBtn'),
      document.getElementById('openBookingBtn2'),
      document.getElementById('heroReserveBtn'),
      document.getElementById('mobileReserveBtn')
    ].filter(Boolean);

    // Default booking date to tomorrow
    const bookDate = document.getElementById('bookDate');
    if (bookDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      bookDate.value = `${yyyy}-${mm}-${dd}`;
      bookDate.min = `${yyyy}-${mm}-${dd}`;
    }

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
    });

    // Form submit -> WhatsApp redirect & confetti burst
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('bookName')?.value.trim() || 'Guest';
        const phone = document.getElementById('bookPhone')?.value.trim() || '';
        const guests = document.getElementById('bookGuests')?.value || '2 Guests';
        const date = document.getElementById('bookDate')?.value || '';
        const time = document.getElementById('bookTime')?.value || '';
        const special = document.getElementById('bookSpecial')?.value.trim() || 'Regular Dining';

        // Confetti burst
        if (window.confetti) {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#F59E0B', '#D97706', '#10B981', '#EAB308', '#FFFFFF']
          });
        }

        // WhatsApp message payload for Cafe De-Light: +91 79030 29008
        const message = encodeURIComponent(
          `*Table Reservation Request — Cafe De-Light (Danapur)*\n\n` +
          `👤 *Name:* ${name}\n` +
          `📞 *Phone:* ${phone}\n` +
          `👥 *Guests:* ${guests}\n` +
          `📅 *Date:* ${date}\n` +
          `⏰ *Time:* ${time}\n` +
          `✨ *Occasion/Notes:* ${special}\n\n` +
          `_Please confirm table availability. Thank you!_`
        );

        const waUrl = `https://wa.me/917903029008?text=${message}`;
        window.open(waUrl, '_blank');

        setTimeout(() => {
          closeModal();
          alert(`Thank you ${name}! Your booking details have been directed to Cafe De-Light on WhatsApp (+91 79030 29008). Our team will confirm shortly.`);
          form.reset();
        }, 600);
      });
    }
  }

  // ════════════════════════════════════════════════════════
  // MODULE 12 — CONTACT FORM WITH REAL-TIME VALIDATION
  // ════════════════════════════════════════════════════════
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const msg = document.getElementById('message');
    const charRing = document.getElementById('charRingFill');
    const charCount = document.getElementById('charCount');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    const MAX_CHARS = 300;
    const CIRCUMFERENCE = 100;

    if (msg && charRing && charCount) {
      msg.addEventListener('input', () => {
        const len = msg.value.length;
        const pct = len / MAX_CHARS;
        const offset = CIRCUMFERENCE - pct * CIRCUMFERENCE;
        charRing.style.strokeDashoffset = offset;
        charCount.textContent = `${len}/${MAX_CHARS}`;
        charRing.style.stroke = pct > 0.9 ? '#EF4444' : pct > 0.7 ? '#F59E0B' : '#10B981';
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const text = msg?.value.trim() || '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Message...';
      }

      await new Promise(r => setTimeout(r, 800));

      if (formMessage) {
        formMessage.className = 'form-message success';
        formMessage.innerHTML = `✓ Thank you ${name}! Your message has been received. You can also reach our manager directly at <a href="tel:+917903029008" style="color:var(--crimson);text-decoration:underline;">+91 79030 29008</a>.`;
      }

      if (window.confetti) {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#D97706', '#10B981']
        });
      }

      form.reset();
      if (charRing) charRing.style.strokeDashoffset = CIRCUMFERENCE;
      if (charCount) charCount.textContent = `0/${MAX_CHARS}`;

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Message Sent!</span>';
        setTimeout(() => {
          submitBtn.innerHTML = '<span>Send Message</span>';
        }, 3000);
      }
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 13 — THEME TOGGLE (DARK / LIGHT MODE)
  // ════════════════════════════════════════════════════════
  function initDarkMode() {
    const btn = document.getElementById('darkModeToggle');
    if (!btn) return;
    const icon = btn.querySelector('.theme-icon');

    const sunIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    const moonIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

    // Default to dark mode for luxury cafe look
    const savedTheme = localStorage.getItem('cafe-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (icon) icon.innerHTML = savedTheme === 'dark' ? sunIcon : moonIcon;

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('cafe-theme', next);
      if (icon) icon.innerHTML = next === 'dark' ? sunIcon : moonIcon;
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 14 — SOUND TOGGLE (AMBIENT AUDIO)
  // ════════════════════════════════════════════════════════
  function initSoundToggle() {
    const btn = document.getElementById('soundToggle');
    if (!btn) return;
    const icon = btn.querySelector('.sound-icon');
    let soundOn = false;

    btn.addEventListener('click', () => {
      soundOn = !soundOn;
      if (icon) {
        icon.innerHTML = soundOn
          ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`
          : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
      }
      btn.classList.toggle('active', soundOn);
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 15 — CAFE DE-LIGHT INTELLIGENT CHATBOT
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
    const quickReplies = document.querySelectorAll('.quick-reply');
    if (!toggle || !window_) return;

    let isOpen = false;

    function openChat() {
      isOpen = true;
      window_.style.display = 'block';
      if (chatIcon) chatIcon.style.display = 'none';
      if (closeIcon) closeIcon.style.display = 'block';
      if (badge) badge.style.display = 'none';
      if (input) input.focus();
    }

    function closeChat() {
      isOpen = false;
      window_.style.display = 'none';
      if (chatIcon) chatIcon.style.display = 'block';
      if (closeIcon) closeIcon.style.display = 'none';
    }

    toggle.addEventListener('click', () => {
      if (isOpen) closeChat(); else openChat();
    });

    // Authentic Knowledgebase for Cafe De-Light
    const responses = {
      'timings': `🕒 <strong>Operating Hours:</strong> We are open <strong>Everyday from 11:00 AM to 11:00 PM</strong> at Saguna More, Danapur!`,
      'hours': `🕒 We are open daily from <strong>11:00 AM to 11:00 PM</strong>. Come by anytime for lunch, evening snacks, or dinner!`,
      'menu': `🍽️ <strong>Our Top Specialties:</strong><br>• Kurkure &amp; Steamed Momos (₹110 - ₹180)<br>• Chicken Dum Biryani (₹240)<br>• Chilli Chicken &amp; Hakka Noodles (₹180 - ₹260)<br>• Cheesy Farmhouse Pizza (₹240)<br>• Signature Iced Cold Coffee (₹130)`,
      'dishes': `🥟 Guests love our <strong>Steamed Momos</strong>, <strong>Special Dum Biryani</strong>, <strong>Chilli Chicken</strong>, and <strong>Thick Cold Coffee</strong>!`,
      'price': `💰 <strong>Average Cost:</strong> Around <strong>₹650 to ₹800 for two people</strong> (approx. ₹200–₹400 per person). Very pocket-friendly!`,
      'cost': `💰 Cost for two is approximately <strong>₹700</strong>. We also offer 10% off for advance table bookings!`,
      'address': `📍 <strong>Address:</strong> Balaji Nagar, Kaliket Nagar, Danapur, Saguna Khagaul Road, Saguna More, Patna - 801503, Bihar. Right on the main road!`,
      'location': `📍 We are located at <strong>Saguna Khagaul Road, Saguna More, Danapur</strong>. You can navigate directly using our Google Maps button on the site!`,
      'phone': `📞 <strong>Call Us:</strong> <a href="tel:+917903029008" style="color:var(--crimson);font-weight:bold;">+91 79030 29008</a> or <a href="tel:+918862984404" style="color:var(--crimson);font-weight:bold;">+91 88629 84404</a>.`,
      'contact': `📞 Reach us at <strong>+91 79030 29008</strong> for quick table bookings and takeaway orders.`,
      'reserve': `📅 You can reserve a table by clicking the <strong>Reserve Table</strong> button on our site or by messaging us on WhatsApp at <strong>+91 79030 29008</strong>!`,
      'booking': `📅 Table reservations are available for small groups, couples, and birthday celebrations. Advance booking gives priority seating!`,
      'delivery': `🛵 We offer takeaway orders directly, and home delivery across Danapur &amp; Patna via <strong>Zomato and Swiggy</strong>!`,
      'party': `🎉 Yes! We host birthday parties, anniversary dinners, and family get-togethers with customized balloon decor and booth seating.`
    };

    function findResponse(msg) {
      const m = msg.toLowerCase();
      for (const [key, val] of Object.entries(responses)) {
        if (m.includes(key)) return val;
      }
      return `Thank you for asking! For immediate bookings or special party requests, please call our manager directly at <a href="tel:+917903029008" style="color:var(--crimson);font-weight:bold;">+91 79030 29008</a> or message us on WhatsApp!`;
    }

    function addMessage(html, type) {
      const div = document.createElement('div');
      div.className = `chat-msg ${type}`;
      div.innerHTML = `<span>${html}</span>`;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return div;
    }

    function handleSend(userText) {
      const text = userText || input?.value.trim();
      if (!text) return;
      addMessage(text, 'user');
      if (input) input.value = '';

      // Bot typing simulation
      const typingDiv = document.createElement('div');
      typingDiv.className = 'chat-msg bot chat-typing';
      typingDiv.innerHTML = `<span><div class="typing-dots"><div></div><div></div><div></div></div></span>`;
      messages.appendChild(typingDiv);
      messages.scrollTop = messages.scrollHeight;

      setTimeout(() => {
        typingDiv.remove();
        addMessage(findResponse(text), 'bot');
      }, 700 + Math.random() * 400);
    }

    if (sendBtn) sendBtn.addEventListener('click', () => handleSend());
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }

    quickReplies.forEach(qr => {
      qr.addEventListener('click', () => {
        const query = qr.getAttribute('data-msg');
        handleSend(query);
      });
    });
  }

  // ════════════════════════════════════════════════════════
  // MODULE 16 — SCROLL REVEAL & GSAP ENHANCEMENT
  // ════════════════════════════════════════════════════════
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.sr');
    if (!reveals.length) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      reveals.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    } else {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      reveals.forEach(r => obs.observe(r));
    }
  }
  // ════════════════════════════════════════════════════════
  // MODULE 10 — PHOTO GALLERY FILTER, LIGHTBOX & HEARTS
  // ════════════════════════════════════════════════════════
  function initGallery() {
    const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card, .gallery-item');
    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightboxOverlay');
    const lbImg = document.getElementById('lightboxImg');
    const lbCaption = document.getElementById('lightboxCaption');
    const lbDesc = document.getElementById('lightboxDesc');
    const lbBadge = document.getElementById('lightboxBadge');
    const lbCounter = document.getElementById('lightboxCounter');
    const lbClose = document.getElementById('lightboxClose');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');
    const lbBackdrop = document.getElementById('lightboxBackdrop');
    const lbReserveBtn = document.getElementById('lightboxReserveBtn');
    const lbThumbTrack = document.getElementById('lightboxThumbnails');

    let currentImages = [];
    let currentIdx = 0;

    // ── Build active image list from visible cards ──
    function buildImageList() {
      currentImages = [];
      galleryCards.forEach(card => {
        if (card.style.display === 'none') return;
        const img = card.querySelector('img');
        const src = card.getAttribute('data-src') || (img ? img.getAttribute('src') : '');
        const title = card.getAttribute('data-title') || (img ? img.getAttribute('alt') : 'Cafe De-Light');
        const desc = card.getAttribute('data-desc') || 'Authentic dining ambiance and multicuisine flavors at Cafe De-Light Danapur.';
        const badge = card.getAttribute('data-badge') || 'Cafe Highlights';

        if (src) {
          currentImages.push({
            src: src,
            title: title,
            desc: desc,
            badge: badge
          });
        }
      });
    }

    // ── Render interactive thumbnail carousel inside lightbox ──
    function renderThumbnails() {
      if (!lbThumbTrack) return;
      lbThumbTrack.innerHTML = '';
      currentImages.forEach((item, idx) => {
        const btn = document.createElement('button');
        btn.className = 'lb-thumb-btn' + (idx === currentIdx ? ' active' : '');
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-label', `View photo ${idx + 1} of ${currentImages.length}: ${item.title}`);
        btn.title = item.title;
        btn.innerHTML = `<img src="${item.src}" alt="${item.title}" loading="lazy" />`;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          currentIdx = idx;
          updateLightbox();
        });
        lbThumbTrack.appendChild(btn);
      });
    }

    // ── Update Lightbox Active Slide ──
    function updateLightbox() {
      if (!currentImages.length) return;
      if (currentIdx < 0) currentIdx = currentImages.length - 1;
      if (currentIdx >= currentImages.length) currentIdx = 0;

      const item = currentImages[currentIdx];
      if (!item || !lbImg) return;

      const frame = document.getElementById('lightboxImgFrame') || lbImg.parentElement;
      if (frame) frame.classList.add('loading');

      // Preload image for instant rendering
      const tempImg = new Image();
      tempImg.onload = () => {
        lbImg.src = item.src;
        lbImg.alt = item.title;
        if (lbCaption) lbCaption.textContent = item.title;
        if (lbDesc) lbDesc.textContent = item.desc;
        if (lbBadge) lbBadge.textContent = item.badge;
        if (lbCounter) lbCounter.textContent = `${currentIdx + 1} / ${currentImages.length}`;
        if (frame) frame.classList.remove('loading');
      };
      tempImg.onerror = () => {
        if (frame) frame.classList.remove('loading');
      };
      tempImg.src = item.src;

      // Update active state in thumbnail strip
      if (lbThumbTrack) {
        const allThumbs = lbThumbTrack.querySelectorAll('.lb-thumb-btn');
        allThumbs.forEach((btn, i) => {
          if (i === currentIdx) {
            btn.classList.add('active');
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          } else {
            btn.classList.remove('active');
          }
        });
      }
    }

    // ── Filter Tabs & Smooth Animated Sorting ──
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter') || 'all';

        // Toggle .is-filtered on grid so columns adapt uniformly
        if (galleryGrid) {
          if (filter === 'all') {
            galleryGrid.classList.remove('is-filtered');
          } else {
            galleryGrid.classList.add('is-filtered');
          }
        }

        galleryCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          const shouldShow = (filter === 'all' || cat === filter);
          if (shouldShow) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px) scale(0.97)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 30);
          } else {
            card.style.display = 'none';
          }
        });

        buildImageList();
        renderThumbnails();
      });
    });

    // ── Open Lightbox ──
    function openLightbox(idx) {
      buildImageList();
      if (!currentImages.length) return;
      currentIdx = Math.max(0, Math.min(idx, currentImages.length - 1));
      renderThumbnails();
      updateLightbox();
      if (lightbox) {
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    // ── Close Lightbox ──
    function closeLightbox() {
      if (lightbox) lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    // ── Click Card to Open Lightbox ──
    galleryCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.gallery-heart-btn')) return;
        buildImageList();
        const visibleCards = Array.from(galleryCards).filter(el => el.style.display !== 'none');
        const idx = visibleCards.indexOf(card);
        openLightbox(idx >= 0 ? idx : 0);
      });
    });

    // ── Interactive Heart Buttons with LocalStorage ──
    try {
      const savedHearts = JSON.parse(localStorage.getItem('cdl_hearts') || '[]');
      document.querySelectorAll('.gallery-heart-btn').forEach((btn, i) => {
        if (savedHearts.includes(i)) btn.classList.add('liked');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          btn.classList.toggle('liked');
          const currentHearts = [];
          document.querySelectorAll('.gallery-heart-btn').forEach((b, j) => {
            if (b.classList.contains('liked')) currentHearts.push(j);
          });
          localStorage.setItem('cdl_hearts', JSON.stringify(currentHearts));

          btn.style.transform = 'scale(1.35)';
          setTimeout(() => { btn.style.transform = ''; }, 300);
        });
      });
    } catch(err) {
      console.warn('LocalStorage error:', err);
    }

    // ── Lightbox Navigation Controls ──
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    if (lbPrev) {
      lbPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentImages.length) return;
        currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length;
        updateLightbox();
      });
    }

    if (lbNext) {
      lbNext.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!currentImages.length) return;
        currentIdx = (currentIdx + 1) % currentImages.length;
        updateLightbox();
      });
    }

    if (lbReserveBtn) {
      lbReserveBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
        const modal = document.getElementById('bookingModal');
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        } else {
          const contact = document.getElementById('contact');
          if (contact) contact.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Keyboard shortcuts (ArrowLeft, ArrowRight, Escape)
    window.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length;
        updateLightbox();
      }
      if (e.key === 'ArrowRight') {
        currentIdx = (currentIdx + 1) % currentImages.length;
        updateLightbox();
      }
    });

    // Touch swipe gesture support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    if (lightbox) {
      lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 45) {
          if (diff < 0) {
            currentIdx = (currentIdx + 1) % currentImages.length;
            updateLightbox();
          } else {
            currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length;
            updateLightbox();
          }
        }
      }, { passive: true });
    }

    // Update filter counts dynamically
    const catCounts = { all: galleryCards.length };
    galleryCards.forEach(c => {
      const cat = c.getAttribute('data-category');
      if (cat) catCounts[cat] = (catCounts[cat] || 0) + 1;
    });
    filterBtns.forEach(b => {
      const f = b.getAttribute('data-filter');
      const countSpan = b.querySelector('.filter-count');
      if (countSpan && catCounts[f] !== undefined) {
        countSpan.textContent = catCounts[f];
      }
    });

    // Initial build
    buildImageList();
  }

  // ════════════════════════════════════════════════════════
  // MODULE: SIGNATURE DELICACIES (3D FLIP CARDS CONTROLLER)
  // ════════════════════════════════════════════════════════
  function initSignatureDelicacies() {
    const cards = document.querySelectorAll('.flip-card');
    if (!cards.length) return;

    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    cards.forEach(card => {
      // Click or tap to toggle flipped state
      card.addEventListener('click', (e) => {
        // Do not intercept if clicking external WhatsApp order button or child link
        if (e.target.closest('a') || e.target.closest('.flip-order-btn')) {
          return;
        }

        // Handle explicit flip back button
        if (e.target.closest('.flip-back-btn')) {
          e.stopPropagation();
          card.classList.remove('is-flipped');
          return;
        }

        // Toggle card flip
        card.classList.toggle('is-flipped');
      });

      // Accessible keyboard control
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!e.target.closest('a') && !e.target.closest('button')) {
            e.preventDefault();
            card.classList.toggle('is-flipped');
          }
        }
      });
    });

    // Close flipped cards when clicking outside on touch devices
    if (isTouch) {
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.flip-card')) {
          cards.forEach(c => c.classList.remove('is-flipped'));
        }
      });
    }
  }

  // ════════════════════════════════════════════════════════
  // BOOTSTRAP ALL MODULES
  // ════════════════════════════════════════════════════════
  function boot() {
    initPreloader();
    initCursor();
    initScrollProgress();
    initSmartHeader();
    updateLiveStatus();
    setInterval(updateLiveStatus, 60000);
    initCounters();
    initVideoPlayer();
    initSignatureDelicacies();
    initMenuTabs();
    initGallery();
    initBookingModal();
    initContactForm();
    initDarkMode();
    initSoundToggle();
    initChatbot();
    initScrollReveal();

    // Back to top button
    const btt = document.getElementById('backToTop');
    if (btt) {
      btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
