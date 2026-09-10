/* ============================================================
   DADAN HANDI MUTTON HOTEL — CORE INTERACTIVE ENGINE
   Powered by Motion (motion.dev) & UI/UX Pro Max Architecture
   ============================================================ */

import { animate, stagger, inView, scroll } from "motion";

// ---- APPLICATION STATE ----
const state = {
  cart: [],
  activeBranch: 'ramjaipal',
  orderType: 'Dine-in',
  isDumUnveiled: false,
  reviewIndex: 0,
  reviewInterval: null,
};

// ---- SOUND EFFECT GENERATOR (WEB AUDIO API - ZERO EXTERNAL ASSET DEPENDENCY) ----
function playPuffSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
  } catch (e) {
    // Graceful fallback if AudioContext is restricted
  }
}

// ============================================================
// 1. PAGE PRE-LOADER & INITIALIZATION
// ============================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      animate(loader, { opacity: [1, 0] }, { duration: 0.55, easing: 'ease-out' }).finished.then(() => {
        loader.classList.add('is-hidden');
        triggerHeroReveal();
      });
    }, 600);
  } else {
    triggerHeroReveal();
  }
});

function triggerHeroReveal() {
  const heroItems = document.querySelectorAll('#hero .reveal-item');
  if (heroItems.length) {
    animate(
      heroItems,
      { opacity: [0, 1], y: [35, 0] },
      { delay: stagger(0.12, { start: 0.1 }), duration: 0.8, easing: [0.16, 1, 0.3, 1] }
    );
  }
  startCounterAnimations();
}

// ============================================================
// 2. AMBIENT CHARCOAL EMBER CANVAS
// ============================================================
const emberCanvas = document.getElementById('ember-canvas');
if (emberCanvas) {
  const ctx = emberCanvas.getContext('2d');
  let embers = [];
  const maxEmbers = 45;

  function resizeCanvas() {
    emberCanvas.width = window.innerWidth;
    emberCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Ember {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * emberCanvas.width;
      this.y = initial ? Math.random() * emberCanvas.height : emberCanvas.height + 10;
      this.radius = Math.random() * 2 + 1;
      this.speedY = Math.random() * 0.9 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.color = Math.random() > 0.4 ? '#F59E0B' : '#EA580C';
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < maxEmbers; i++) {
    embers.push(new Ember());
  }

  function loopEmbers() {
    ctx.clearRect(0, 0, emberCanvas.width, emberCanvas.height);
    for (let ember of embers) {
      ember.update();
      ember.draw();
    }
    requestAnimationFrame(loopEmbers);
  }
  loopEmbers();
}

// ============================================================
// 3. CURSOR GLOW (DESKTOP)
// ============================================================
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow && matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

// ============================================================
// 4. NAVBAR SCROLL & PROGRESS
// ============================================================
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('scroll-progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (progressBar) {
    progressBar.style.width = `${scrollPercent}%`;
  }
  if (navbar) {
    navbar.classList.toggle('is-scrolled', scrollTop > 40);
  }
});

// Mobile menu toggle & backdrop
const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');
const navBackdrop = document.getElementById('navbar-backdrop');

function closeMobileMenu() {
  if (navLinks) navLinks.classList.remove('is-open');
  if (mobileMenuBtn) {
    mobileMenuBtn.classList.remove('is-active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }
  if (navBackdrop) navBackdrop.classList.remove('is-active');
  document.body.classList.remove('menu-open');
}

function openMobileMenu() {
  if (navLinks) navLinks.classList.add('is-open');
  if (mobileMenuBtn) {
    mobileMenuBtn.classList.add('is-active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }
  if (navBackdrop) navBackdrop.classList.add('is-active');
  document.body.classList.add('menu-open');
}

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileMenu);
  }

  navLinks.querySelectorAll('.nav-link, .btn--drawer').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080 && navLinks.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
}

// Active Nav Link Scroll Spy
const sections = document.querySelectorAll('main section[id]');
const navLinkElements = document.querySelectorAll('.nav-link');

if ('IntersectionObserver' in window && sections.length > 0) {
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkElements.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));
}

// ============================================================
// 5. INTERACTIVE HANDI DUM POT EXPERIENCE (दम खोलें)
// ============================================================
const breakDumBtn = document.getElementById('break-dum-btn');
const sealedState = document.getElementById('sealed-state');
const unveiledState = document.getElementById('unveiled-state');
const doughBand = document.getElementById('dough-band');
const dumStatusText = document.getElementById('dum-status-text');
const dumBtnLabel = document.getElementById('dum-btn-label');
const steamEmitter = document.getElementById('steam-emitter');

if (breakDumBtn && sealedState && unveiledState) {
  breakDumBtn.addEventListener('click', () => {
    state.isDumUnveiled = !state.isDumUnveiled;

    if (state.isDumUnveiled) {
      playPuffSound();

      // Animate dough band transition
      if (doughBand) {
        doughBand.style.transform = 'translateY(-10px) scale(0.95)';
        doughBand.style.opacity = '0';
      }

      // Trigger steam particle burst
      if (steamEmitter) {
        steamEmitter.querySelectorAll('.steam-particle').forEach((p, idx) => {
          animate(
            p,
            {
              opacity: [0, 0.9, 0],
              y: [0, -120 - idx * 25],
              x: [(idx - 2) * 15, (idx - 2) * 40],
              scale: [0.6, 2.5],
            },
            { duration: 1.4, delay: idx * 0.08, easing: 'ease-out' }
          );
        });
      }

      // Crossfade Handi visual
      sealedState.classList.add('is-opened');
      unveiledState.classList.add('is-active');

      if (dumStatusText) {
        dumStatusText.innerHTML = `
          <span class="status-indicator live"></span>
          <span class="status-msg"><strong>Dum Opened!</strong> Fragrant 100°C steam released. Tender Ahuna Mutton revealed.</span>
        `;
      }

      if (dumBtnLabel) {
        dumBtnLabel.textContent = '🔄 Seal Handi Again (सील पुनः लगाएं)';
      }

      showToast('🔥 Dum Unsealed! The aroma of pure mustard oil & roasted garlic fills the air.');
    } else {
      // Re-seal
      sealedState.classList.remove('is-opened');
      unveiledState.classList.remove('is-active');

      if (doughBand) {
        doughBand.style.transform = 'translateY(0) scale(1)';
        doughBand.style.opacity = '1';
      }

      if (dumStatusText) {
        dumStatusText.innerHTML = `
          <span class="status-indicator live"></span>
          <span class="status-msg">Handi is airtight & simmering at 100°C. Click below to unseal.</span>
        `;
      }

      if (dumBtnLabel) {
        dumBtnLabel.textContent = '✨ Break The Dum Seal (सील खोलें)';
      }
    }
  });
}

// ============================================================
// 6. SCROLL REVEAL (INTERSECTION OBSERVER)
// ============================================================
const revealItems = document.querySelectorAll('.reveal-item');
if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealItems.forEach((el) => observer.observe(el));
}

// Counters animation
function startCounterAnimations() {
  document.querySelectorAll('.counter').forEach((counter) => {
    const target = +counter.dataset.target;
    let current = 0;
    const stepTime = Math.max(10, Math.floor(1800 / target));
    const timer = setInterval(() => {
      current += 1;
      counter.textContent = current;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      }
    }, stepTime);
  });
}

// ============================================================
// 7. MENU CATEGORY TABS & FILTERING
// ============================================================
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

menuTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    menuTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    const category = tab.dataset.category;

    menuCards.forEach((card) => {
      const cardCategories = card.dataset.category || '';
      if (category === 'all' || cardCategories.includes(category)) {
        card.style.display = 'flex';
        animate(card, { opacity: [0, 1], y: [15, 0] }, { duration: 0.35, easing: 'ease-out' });
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Portion dropdown change listener
document.querySelectorAll('.portion-dropdown').forEach((select) => {
  select.addEventListener('change', (e) => {
    const card = select.closest('.menu-card');
    const priceDisplay = card.querySelector('.menu-card__price');
    const addBtn = card.querySelector('.add-to-cart-btn');
    const selectedOpt = select.selectedOptions[0];

    const price = parseInt(select.value, 10);
    const label = selectedOpt.dataset.label;

    if (priceDisplay) priceDisplay.textContent = `₹${price}`;
    if (addBtn) {
      addBtn.dataset.price = price;
      addBtn.dataset.portion = label;
    }
  });
});

// ============================================================
// 8. HANDI ORDER TRAY & LIVE WHATSAPP GENERATOR
// ============================================================
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const openCartBtn = document.getElementById('open-cart-btn');
const dockCartBtn = document.getElementById('dock-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsList = document.getElementById('cart-items-list');
const cartCounter = document.getElementById('cart-counter');
const dockCartCount = document.getElementById('dock-cart-count');
const cartSubtotalVal = document.getElementById('cart-subtotal-val');
const sendWhatsappOrderBtn = document.getElementById('send-whatsapp-order-btn');
const cartBranchSelect = document.getElementById('cart-branch');

function toggleCart(open) {
  if (cartDrawer && cartBackdrop) {
    cartDrawer.classList.toggle('is-open', open);
    cartBackdrop.classList.toggle('is-open', open);
    cartDrawer.setAttribute('aria-hidden', !open);
  }
}

if (openCartBtn) openCartBtn.addEventListener('click', () => toggleCart(true));
if (dockCartBtn) dockCartBtn.addEventListener('click', () => toggleCart(true));
if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCart(false));
if (cartBackdrop) cartBackdrop.addEventListener('click', () => toggleCart(false));

// Order Type Tab Switcher
document.querySelectorAll('.type-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.type-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    state.orderType = btn.dataset.type;
  });
});

// Add to Cart Buttons
document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price, 10);
    const portion = btn.dataset.portion || '';

    addToCart(id, name, price, portion);

    // Button animation feedback
    animate(btn, { scale: [1, 0.92, 1] }, { duration: 0.25 });
    showToast(`Added ${name} to your Handi tray!`);
  });
});

function addToCart(id, name, price, portion) {
  const itemKey = `${id}-${portion}`;
  const existing = state.cart.find((item) => item.key === itemKey);

  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      key: itemKey,
      id,
      name,
      portion,
      price,
      qty: 1,
    });
  }

  updateCartUI();
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cartCounter) cartCounter.textContent = totalCount;
  if (dockCartCount) dockCartCount.textContent = totalCount;
  if (cartSubtotalVal) cartSubtotalVal.textContent = `₹${totalPrice}`;

  if (!cartItemsList) return;

  if (state.cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty-state">
        <div class="empty-pot-icon">
          <svg viewBox="0 0 100 100" class="pot-empty-svg" fill="none">
            <ellipse cx="50" cy="80" rx="35" ry="10" fill="rgba(255,255,255,0.05)" />
            <path d="M20 50 C20 75 30 85 50 85 C70 85 80 75 80 50 C80 40 70 38 65 38 L35 38 C30 38 20 40 20 50 Z" stroke="#F59E0B" stroke-width="2" />
          </svg>
        </div>
        <p>Your Handi tray is empty.</p>
        <p class="empty-sub">Add delicious Ahuna Mutton, Chicken, or Tawa Rotis from our menu!</p>
      </div>
    `;
    return;
  }

  cartItemsList.innerHTML = '';
  state.cart.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>${item.portion ? `${item.portion} · ` : ''}₹${item.price} each</span>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-action="minus" data-key="${item.key}" aria-label="Decrease quantity">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" data-action="plus" data-key="${item.key}" aria-label="Increase quantity">+</button>
      </div>
    `;
    cartItemsList.appendChild(row);
  });

  // Attach controls
  cartItemsList.querySelectorAll('.qty-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const action = btn.dataset.action;
      const item = state.cart.find((i) => i.key === key);

      if (!item) return;

      if (action === 'plus') {
        item.qty += 1;
      } else if (action === 'minus') {
        item.qty -= 1;
        if (item.qty <= 0) {
          state.cart = state.cart.filter((i) => i.key !== key);
        }
      }
      updateCartUI();
    });
  });
}

// Generate Pre-Populated WhatsApp Message
if (sendWhatsappOrderBtn) {
  sendWhatsappOrderBtn.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('⚠️ Please select at least one item before ordering!');
      return;
    }

    const branch = cartBranchSelect ? cartBranchSelect.value : 'Ram Jaipal Nagar';
    const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    let itemsText = state.cart
      .map((item) => `• ${item.qty}x ${item.name}${item.portion ? ` (${item.portion})` : ''} — ₹${item.price * item.qty}`)
      .join('\n');

    const message = `Namaste Dadan Handi Hotel! 🍲\n\nI would like to place an authentic Champaran order:\n\n${itemsText}\n\n*Estimated Total: ₹${totalPrice}*\n*Order Type:* ${state.orderType}\n*Preferred Outlet:* ${branch}\n\nPlease confirm availability and payment details. Thank you!`;

    const whatsappUrl = `https://wa.me/918986496574?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });
}

// ============================================================
// 9. MULTI-BRANCH OUTLET NAVIGATOR
// ============================================================
const branchData = {
  ramjaipal: {
    title: 'Ram Jaipal Nagar Branch',
    address: 'Ram Jaipal Nagar, Gola Road, Danapur Nizamat, Bailey Road, Patna, Bihar 801503',
    chip: 'Popular Outpost',
    phone: '+91 8986496574',
    hours: '11:00 AM – 11:00 PM (All 7 Days)',
    mapsUrl: 'https://www.google.com/maps?q=25.6138487,85.0567988',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.0!2d85.0567988!3d25.6138487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM2JzQ5LjkiTiA4NcKwMDMnMjQuNSJF!5e0!3m2!1sen!2sin!4v1',
  },
  saguna: {
    title: 'Saguna-Khagaul Road (Flagship)',
    address: 'Saguna More - Khagaul Main Road, Near Danapur Railway Station & Cantt, Patna, Bihar 801503',
    chip: 'Main Flagship Branch',
    phone: '+91 8986496574',
    hours: '11:00 AM – 11:00 PM (All 7 Days)',
    mapsUrl: 'https://www.google.com/maps?q=Saguna+Khagaul+Road+Danapur+Patna',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14392.2!2d85.035!3d25.602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM2JzA3LjIiTiA4NcKwMDInMDYuMCJF!5e0!3m2!1sen!2sin!4v1',
  },
  rukanpura: {
    title: 'Rukanpura Branch',
    address: 'Near Ashiana-Digha More, Bailey Road, Rukanpura, Patna, Bihar 800014',
    chip: 'Central Bailey Road',
    phone: '+91 8986496574',
    hours: '11:00 AM – 11:00 PM (All 7 Days)',
    mapsUrl: 'https://www.google.com/maps?q=Rukanpura+Bailey+Road+Patna',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14390.8!2d85.08!3d25.618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM3JzA0LjgiTiA4NcKwMDQnNDguMCJF!5e0!3m2!1sen!2sin!4v1',
  },
  brc: {
    title: 'BRC Danapur Cantt Outpost',
    address: 'Near Bihar Regimental Centre Gate, Danapur Cantt, Patna, Bihar 801503',
    chip: 'Cantt Outpost',
    phone: '+91 8986496574',
    hours: '11:00 AM – 10:30 PM (All 7 Days)',
    mapsUrl: 'https://www.google.com/maps?q=Danapur+Cantt+Patna',
    iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14391.0!2d85.04!3d25.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDM3JzQ4LjAiTiA4NcKwMDInMjQuMCJF!5e0!3m2!1sen!2sin!4v1',
  },
};

const branchTabs = document.querySelectorAll('.branch-tab');
const branchTitle = document.getElementById('branch-title');
const branchAddress = document.getElementById('branch-address');
const branchChip = document.getElementById('branch-chip');
const branchHours = document.getElementById('branch-hours');
const branchMapsLink = document.getElementById('branch-maps-link');
const branchCallLink = document.getElementById('branch-call-link');
const branchMapIframe = document.getElementById('branch-map-iframe');
const branchDisplay = document.getElementById('branch-display');

branchTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    branchTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    const key = tab.dataset.branch;
    const data = branchData[key];

    if (data && branchDisplay) {
      animate(branchDisplay, { opacity: [1, 0.4, 1], y: [0, 8, 0] }, { duration: 0.3 });

      if (branchTitle) branchTitle.textContent = data.title;
      if (branchAddress) branchAddress.textContent = data.address;
      if (branchChip) branchChip.textContent = data.chip;
      if (branchHours) branchHours.textContent = data.hours;
      if (branchMapsLink) branchMapsLink.href = data.mapsUrl;
      if (branchCallLink) branchCallLink.href = `tel:${data.phone.replace(/\s+/g, '')}`;
      if (branchMapIframe) branchMapIframe.src = data.iframe;
    }
  });
});

// ============================================================
// 10. CUSTOMER REVIEWS CAROUSEL
// ============================================================
const reviewSlides = document.querySelectorAll('.review-slide');
const prevReviewBtn = document.getElementById('prev-review-btn');
const nextReviewBtn = document.getElementById('next-review-btn');
const reviewDotsContainer = document.getElementById('review-dots');

if (reviewSlides.length > 0 && reviewDotsContainer) {
  reviewSlides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = `review-dot ${idx === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to review ${idx + 1}`);
    dot.addEventListener('click', () => showReview(idx));
    reviewDotsContainer.appendChild(dot);
  });

  const dots = reviewDotsContainer.querySelectorAll('.review-dot');

  function showReview(idx) {
    reviewSlides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    state.reviewIndex = (idx + reviewSlides.length) % reviewSlides.length;
    reviewSlides[state.reviewIndex].classList.add('active');
    dots[state.reviewIndex].classList.add('active');
  }

  if (prevReviewBtn) prevReviewBtn.addEventListener('click', () => showReview(state.reviewIndex - 1));
  if (nextReviewBtn) nextReviewBtn.addEventListener('click', () => showReview(state.reviewIndex + 1));

  function startReviewAuto() {
    state.reviewInterval = setInterval(() => {
      showReview(state.reviewIndex + 1);
    }, 5500);
  }

  const sliderWrap = document.querySelector('.reviews-slider-wrapper');
  if (sliderWrap) {
    sliderWrap.addEventListener('mouseenter', () => clearInterval(state.reviewInterval));
    sliderWrap.addEventListener('mouseleave', startReviewAuto);
  }
  startReviewAuto();
}

// ============================================================
// 11. LIGHTBOX MODAL
// ============================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxBackdrop = document.getElementById('lightbox-backdrop');

function openLightbox(src) {
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', false);
    animate(lightboxImg, { scale: [0.88, 1], opacity: [0, 1] }, { duration: 0.35, easing: 'ease-out' });
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', true);
  }
}

document.querySelectorAll('.lightbox-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const src = trigger.dataset.src || trigger.querySelector('img')?.src;
    if (src) openLightbox(src);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ============================================================
// 12. TOAST NOTIFICATIONS
// ============================================================
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="icon-svg" style="color:#F59E0B;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    animate(toast, { opacity: [1, 0], x: [0, 40] }, { duration: 0.3 }).finished.then(() => toast.remove());
  }, 3200);
}
