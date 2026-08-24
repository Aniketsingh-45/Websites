/* ============================================================
   DADAN HANDI — Premium Interactive Engine
   Powered by Motion (motion.dev) for buttery-smooth animations
   ============================================================ */

import { animate, stagger, inView, scroll } from "motion";

// ---- LOADER ----
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  setTimeout(() => {
    animate(loader, { opacity: 0 }, { duration: 0.5, easing: 'ease-out' }).finished.then(() => {
      loader.style.display = 'none';
      animateHero();
    });
  }, 600);
});

// ---- HERO ENTRANCE ----
function animateHero() {
  const badge = document.querySelector('.hero__badge');
  const titleLines = document.querySelectorAll('.hero__title-line');
  const subtitle = document.querySelector('.hero__subtitle');
  const cta = document.querySelector('.hero__cta');
  const stats = document.querySelector('.hero__stats');
  const scrollIndicator = document.querySelector('.hero__scroll');

  if (badge) {
    animate(badge, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.1, type: "spring", stiffness: 200, damping: 20 });
  }
  if (titleLines.length) {
    animate(titleLines, { opacity: [0, 1], y: [40, 0] }, { duration: 0.7, delay: stagger(0.15, { start: 0.3 }), type: "spring", stiffness: 150, damping: 18 });
  }
  if (subtitle) {
    animate(subtitle, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.8, easing: 'ease-out' });
  }
  if (cta) {
    animate(cta, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 1.0, easing: 'ease-out' });
  }
  if (stats) {
    animate(stats, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 1.2, easing: 'ease-out' });
  }
  if (scrollIndicator) {
    animate(scrollIndicator, { opacity: [0, 1] }, { duration: 0.8, delay: 1.5 });
  }
}

// ---- CURSOR GLOW ----
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow && matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// ---- SCROLL: Progress + Navbar ----
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scroll-progress');

if (scrollProgress) {
  scroll(animate(scrollProgress, { width: ['0%', '100%'] }));
}

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- MOBILE MENU ----
const burger = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    if (isActive) {
      animate(navLinks.querySelectorAll('a'),
        { opacity: [0, 1], x: [-20, 0] },
        { delay: stagger(0.05), duration: 0.3, easing: 'ease-out' }
      );
    }
  });
  navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('active');
    })
  );
}

// ---- RIPPLE EFFECT ----
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ---- SCROLL REVEAL (Motion inView) ----
document.querySelectorAll('.reveal').forEach(el => {
  inView(el, () => {
    animate(el, { opacity: [0, 1], y: [40, 0] }, { duration: 0.7, easing: [0.25, 0.46, 0.45, 0.94] });

    // Counter animation
    el.querySelectorAll('.counter').forEach(counter => {
      const target = +counter.dataset.target;
      animate(0, target, {
        duration: 2,
        easing: 'ease-out',
        onUpdate: latest => { counter.textContent = Math.ceil(latest); }
      });
    });
  }, { margin: '0px 0px -80px 0px' });
});

// ---- 3D TILT CARDS ----
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    animate(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.03
    }, { duration: 0.3, easing: 'ease-out' });
  });

  card.addEventListener('mouseleave', () => {
    animate(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1
    }, { duration: 0.5, type: "spring", stiffness: 200, damping: 20 });
  });
});

// ---- LIGHTBOX ----
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxBackdrop = document.querySelector('.lightbox__backdrop');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  animate(lightboxBackdrop, { opacity: [0, 1] }, { duration: 0.3 });
  animate(lightboxImg, { scale: [0.85, 1], opacity: [0, 1] }, { duration: 0.4, type: "spring", stiffness: 200, damping: 20 });
}

function closeLightbox() {
  animate(lightboxImg, { scale: 0.9, opacity: 0 }, { duration: 0.2 }).finished.then(() => {
    lightbox.classList.remove('active');
  });
}

document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const img = trigger.querySelector('img') || trigger;
    if (img.src) openLightbox(img.src);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox?.classList.contains('active')) closeLightbox(); });

// ---- TESTIMONIAL CAROUSEL ----
const testimonials = document.querySelectorAll('.review-card');
const dotsContainer = document.getElementById('carousel-dots');
let currentTestimonial = 0;
let carouselInterval;

if (testimonials.length > 0 && dotsContainer) {
  testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('reviews__dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.reviews__dot');

  function goToSlide(index) {
    const outgoing = testimonials[currentTestimonial];
    dots[currentTestimonial].classList.remove('active');

    animate(outgoing, { opacity: 0, x: -30 }, { duration: 0.3 }).finished.then(() => {
      outgoing.classList.remove('active');
    });

    currentTestimonial = index;
    const incoming = testimonials[currentTestimonial];
    incoming.classList.add('active');
    animate(incoming, { opacity: [0, 1], x: [30, 0] }, { duration: 0.4, easing: [0.25, 0.46, 0.45, 0.94] });
    dots[currentTestimonial].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentTestimonial + 1) % testimonials.length);
  }

  carouselInterval = setInterval(nextSlide, 4500);

  const carousel = document.getElementById('testimonial-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carousel.addEventListener('mouseleave', () => { carouselInterval = setInterval(nextSlide, 4500); });
  }
}

// ---- STORY FLOATING BADGE ----
const floatingBadge = document.querySelector('.story__floating-badge');
if (floatingBadge) {
  inView(floatingBadge, () => {
    animate(floatingBadge,
      { y: [0, -10, 0] },
      { duration: 3, repeat: Infinity, easing: 'ease-in-out' }
    );
  });
}

// ---- MENU BANNER ENTRANCE ----
const menuBanner = document.querySelector('.menu__banner');
if (menuBanner) {
  inView(menuBanner, () => {
    animate(menuBanner,
      { scale: [0.95, 1], opacity: [0, 1] },
      { duration: 0.6, easing: [0.25, 0.46, 0.45, 0.94] }
    );
  });
}

// ---- FAB PULSE ----
const fab = document.querySelector('.fab');
if (fab) {
  animate(fab,
    { scale: [1, 1.1, 1] },
    { duration: 2, repeat: Infinity, easing: 'ease-in-out' }
  );
}

// ---- CONFETTI & TOAST ----
const toastContainer = document.getElementById('toast-container');
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];

function resizeCanvas() {
  if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfetti(x, y) {
  for (let i = 0; i < 50; i++) {
    particles.push({
      x, y,
      r: Math.random() * 5 + 2,
      dx: Math.random() * 12 - 6,
      dy: Math.random() * -12 - 4,
      color: `hsl(${Math.random() * 50 + 10}, 90%, ${Math.random() * 30 + 50}%)`,
      life: 1
    });
  }
}

function animateConfetti() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.dy += 0.4;
    p.x += p.dx;
    p.y += p.dy;
    p.life -= 0.015;
    p.dx *= 0.99;
    ctx.globalAlpha = p.life;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  if (particles.length > 0) requestAnimationFrame(animateConfetti);
}

function showToast(msg) {
  if (!toastContainer) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  t.style.opacity = '0';
  toastContainer.appendChild(t);
  animate(t, { opacity: [0, 1], y: [30, 0] }, { duration: 0.4, easing: [0.175, 0.885, 0.32, 1.275] });
  setTimeout(() => {
    animate(t, { opacity: 0, y: -15 }, { duration: 0.3 }).finished.then(() => t.remove());
  }, 2800);
}

document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    createConfetti(e.clientX, e.clientY);
    animateConfetti();
    showToast('🔥 Connecting you now!');
  });
});
