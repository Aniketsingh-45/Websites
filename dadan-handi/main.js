// Remove loader
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('page-loader').classList.add('hidden');
  }, 500); // minimum showing time
});

// Theme System
const themes = ['wood', 'midnight', 'spice'];
let currentThemeIndex = 0;
const themeToggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  currentThemeIndex = themes.indexOf(savedTheme);
  document.documentElement.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const newTheme = themes[currentThemeIndex];
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Scroll Progress & Sticky Navbar & Parallax
const navbar = document.getElementById('navbar');
const parallaxBg = document.querySelector('.parallax-bg');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  
  if (scrollTop > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  document.documentElement.style.setProperty('--scroll-progress', scrollTop / docHeight);

  // Parallax
  if (parallaxBg && scrollTop < window.innerHeight) {
    parallaxBg.style.transform = `translateY(${scrollTop * 0.4}px)`;
  }
});

// Mobile Menu
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');
mobileMenuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Magnetic Buttons
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = `translate(0px, 0px) scale(1)`;
  });
});

// Ripple Effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    // Set size based on width/height
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.transform = `translate(-50%, -50%) scale(0)`;
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Scroll Reveals & Intersection Observers
const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Counters logic inside reveals
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
          current += step;
          if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
          }
        };
        update();
      });

      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Carousel
const testimonials = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;
let carouselInterval;

const showNextTestimonial = () => {
  testimonials[currentTestimonial].classList.remove('active');
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  testimonials[currentTestimonial].classList.add('active');
};

const startCarousel = () => { carouselInterval = setInterval(showNextTestimonial, 4000); };
const stopCarousel = () => { clearInterval(carouselInterval); };

if (testimonials.length > 0) {
  startCarousel();
  const carouselContainer = document.getElementById('testimonial-carousel');
  carouselContainer.addEventListener('mouseenter', stopCarousel);
  carouselContainer.addEventListener('mouseleave', startCarousel);
  carouselContainer.addEventListener('touchstart', stopCarousel);
  carouselContainer.addEventListener('touchend', startCarousel);
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
document.querySelectorAll('.lightbox-trigger').forEach(item => {
  item.addEventListener('click', (e) => {
    const src = item.querySelector('img').src;
    lightboxImg.src = src;
    lightbox.classList.add('active');
  });
});
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.classList.remove('active'));
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('active'); });

// Confetti & Toast
const toastContainer = document.getElementById('toast-container');
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createConfetti(x, y) {
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: x, y: y,
      r: Math.random() * 6 + 2,
      dx: Math.random() * 10 - 5,
      dy: Math.random() * -10 - 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.dy += 0.5; // gravity
    p.x += p.dx;
    p.y += p.dy;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (p.y > canvas.height) particles.splice(i, 1);
  });
  if (particles.length > 0) requestAnimationFrame(animateConfetti);
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerText = msg;
  toastContainer.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    createConfetti(e.clientX, e.clientY);
    animateConfetti();
    showToast("Connecting you now ✓");
  });
});
