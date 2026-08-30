/**
 * NATH AAROGYA CLINIC — INTERACTIVE & ANIMATION ENGINE
 * Luxury Dark Theme & Smooth Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Ambient Canvas Particles
    initAmbientCanvas();

    // 2. Initialize Navigation & Mobile Drawer
    initNavigation();

    // 3. Initialize Scroll Reveals & GSAP
    initScrollAnimations();

    // 4. Initialize 3D Card Tilt Effects
    init3DTilt();

    // 5. Initialize Animated Stats Counters
    initCounters();

    // 6. Initialize Gallery & Lightbox
    initGallery();

    // 7. Initialize Reviews Slider
    initReviewsSlider();

    // 8. Initialize Appointment Form
    initAppointmentForm();

    // 9. Initialize Scroll to Top with Progress Ring
    initScrollProgress();
});

/* ==========================================================================
   1. AMBIENT CANVAS PARTICLES
   ========================================================================== */
function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 25 : 55;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 2 + 0.8;
            this.color = Math.random() > 0.6 ? 'rgba(0, 240, 160, ' : (Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(245, 158, 11, ');
            this.alpha = Math.random() * 0.35 + 0.1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `${this.color}${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 240, 160, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   2. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenuWrapper');
    const navCloseBtn = document.getElementById('navCloseBtn');
    const navBackdrop = document.getElementById('navBackdrop');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function openMenu() {
        if (hamburger) hamburger.classList.add('active');
        if (navMenu) navMenu.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Navbar Scroll Glass Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (navCloseBtn) navCloseBtn.addEventListener('click', closeMenu);
    if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);

    // Close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ScrollSpy Highlight
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-links a[href*='${sectionId}']`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    });
}

/* ==========================================================================
   3. SCROLL REVEALS & GSAP
   ========================================================================== */
function initScrollAnimations() {
    const revealItems = document.querySelectorAll('.reveal-item');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add('is-revealed'));
    }

    // Check if GSAP is loaded for smooth hero text reveal
    if (typeof gsap !== 'undefined') {
        gsap.from('.hero-badges-wrapper', { opacity: 0, y: -20, duration: 0.8, ease: 'power3.out', delay: 0.2 });
        gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, ease: 'power3.out', delay: 0.35 });
        gsap.from('.hero-description', { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', delay: 0.5 });
        gsap.from('.hero-tag', { opacity: 0, scale: 0.9, stagger: 0.08, duration: 0.6, ease: 'power3.out', delay: 0.65 });
        gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.8 });
        gsap.from('.hero-trust-stack', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.95 });
        gsap.from('.hero-spotlight-wrapper', { opacity: 0, x: 40, duration: 1.1, ease: 'power3.out', delay: 0.45 });
    }
}

/* ==========================================================================
   4. 3D CARD TILT EFFECT
   ========================================================================== */
function init3DTilt() {
    if (window.innerWidth < 1024) return; // Disable on touch/small screens for performance

    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

/* ==========================================================================
   5. STATS ANIMATED COUNTERS
   ========================================================================== */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let started = false;

    function countUp() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const isFloat = target % 1 !== 0;
            const speed = 2000; // ms
            const stepTime = 30;
            const totalSteps = speed / stepTime;
            const increment = target / totalSteps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = isFloat ? target.toFixed(1) : target;
                    clearInterval(timer);
                } else {
                    counter.innerText = isFloat ? current.toFixed(1) : Math.floor(current);
                }
            }, stepTime);
        });
    }

    const statsSection = document.getElementById('stats');
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting && !started) {
                countUp();
                started = true;
                obs.unobserve(statsSection);
            }
        }, { threshold: 0.3 });
        statsObserver.observe(statsSection);
    }
}

/* ==========================================================================
   6. GALLERY & LIGHTBOX
   ========================================================================== */
let currentGalleryIndex = 0;
let galleryImagesList = [];

function initGallery() {
    // Gallery Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Build image list for lightbox navigation
    galleryImagesList = Array.from(galleryItems).map(item => {
        const img = item.querySelector('.gallery-img');
        const caption = item.querySelector('.gallery-caption');
        return {
            src: img ? img.getAttribute('src') : '',
            caption: caption ? caption.innerText : '',
            element: item
        };
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('is-revealed'), 50);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('is-revealed');
                }
            });
        });
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevLightboxImage();
            if (e.key === 'ArrowRight') nextLightboxImage();
        }
    });
}

window.openLightbox = (src, caption = '') => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    currentGalleryIndex = galleryImagesList.findIndex(item => item.src === src);
    if (currentGalleryIndex === -1) currentGalleryIndex = 0;

    lightboxImg.src = src;
    lightboxCaption.innerText = caption || galleryImagesList[currentGalleryIndex]?.caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
};

window.prevLightboxImage = () => {
    if (galleryImagesList.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImagesList.length) % galleryImagesList.length;
    const item = galleryImagesList[currentGalleryIndex];
    document.getElementById('lightbox-img').src = item.src;
    document.getElementById('lightbox-caption').innerText = item.caption;
};

window.nextLightboxImage = () => {
    if (galleryImagesList.length === 0) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImagesList.length;
    const item = galleryImagesList[currentGalleryIndex];
    document.getElementById('lightbox-img').src = item.src;
    document.getElementById('lightbox-caption').innerText = item.caption;
};

/* ==========================================================================
   7. REVIEWS SLIDER
   ========================================================================== */
let reviewIndex = 0;
let reviewAutoPlay;

function initReviewsSlider() {
    const track = document.getElementById('reviewSlides');
    const dotsContainer = document.getElementById('sliderDots');
    const wrapper = document.getElementById('sliderWrapper');
    if (!track || !dotsContainer) return;

    const cards = track.querySelectorAll('.review-card');
    const totalCards = cards.length;

    // Generate Dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToReview(i));
        dotsContainer.appendChild(dot);
    }

    function getVisibleCards() {
        if (window.innerWidth >= 1025) return 3;
        if (window.innerWidth >= 769) return 2;
        return 1;
    }

    function updateSlider() {
        const visible = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visible);
        if (reviewIndex > maxIndex) reviewIndex = maxIndex;
        if (reviewIndex < 0) reviewIndex = 0;

        const cardWidth = cards[0].offsetWidth + 24; // + gap
        track.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;

        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === reviewIndex);
        });
    }

    window.nextSlide = () => {
        const maxIndex = Math.max(0, totalCards - getVisibleCards());
        reviewIndex = reviewIndex >= maxIndex ? 0 : reviewIndex + 1;
        updateSlider();
    };

    window.prevSlide = () => {
        const maxIndex = Math.max(0, totalCards - getVisibleCards());
        reviewIndex = reviewIndex <= 0 ? maxIndex : reviewIndex - 1;
        updateSlider();
    };

    window.goToReview = (i) => {
        reviewIndex = i;
        updateSlider();
        resetAutoPlay();
    };

    function resetAutoPlay() {
        clearInterval(reviewAutoPlay);
        reviewAutoPlay = setInterval(window.nextSlide, 4500);
    }

    // Touch Swipe
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(reviewAutoPlay);
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) window.nextSlide();
        if (touchEndX - touchStartX > 50) window.prevSlide();
        resetAutoPlay();
    }, { passive: true });

    wrapper.addEventListener('mouseenter', () => clearInterval(reviewAutoPlay));
    wrapper.addEventListener('mouseleave', resetAutoPlay);
    window.addEventListener('resize', updateSlider);

    updateSlider();
    resetAutoPlay();
}

/* ==========================================================================
   8. APPOINTMENT FORM & SUCCESS MODAL
   ========================================================================== */
function initAppointmentForm() {
    const dateInput = document.getElementById('appointmentDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        dateInput.value = today;
    }
}

// Pre-select doctor from doctor card button
window.selectDoctor = (doctorVal) => {
    const selectEl = document.getElementById('doctorSelect');
    if (selectEl) {
        selectEl.value = doctorVal;
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

window.handleAppointmentSubmit = (event) => {
    event.preventDefault();

    const name = document.getElementById('patientName').value.trim();
    const phone = document.getElementById('patientPhone').value.trim();
    const doctor = document.getElementById('doctorSelect').value;
    const date = document.getElementById('appointmentDate').value;
    const slot = document.getElementById('timeSlot').value;
    const notes = document.getElementById('patientMessage').value.trim();

    const randomRef = 'NA-' + Math.floor(10000 + Math.random() * 90000);

    // Populate Success Modal
    document.getElementById('modalPatientName').innerText = name;
    document.getElementById('modalDoctorName').innerText = doctor;
    document.getElementById('modalSlotTime').innerText = `${date} • ${slot}`;
    document.getElementById('modalRefCode').innerText = randomRef;

    // Create WhatsApp confirmation link
    const waText = encodeURIComponent(
        `*New Appointment Request — Nath Aarogya Clinic*\n` +
        `Ref ID: ${randomRef}\n` +
        `Patient Name: ${name}\n` +
        `Mobile: ${phone}\n` +
        `Doctor: ${doctor}\n` +
        `Date: ${date}\n` +
        `Slot: ${slot}\n` +
        (notes ? `Symptoms: ${notes}` : '')
    );
    const waBtn = document.getElementById('whatsappConfirmBtn');
    if (waBtn) {
        waBtn.href = `https://wa.me/919288190052?text=${waText}`;
    }

    // Show modal
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Reset Form
    event.target.reset();
    initAppointmentForm();
};

window.closeSuccessModal = () => {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

/* ==========================================================================
   9. SCROLL PROGRESS & BACK TO TOP
   ========================================================================== */
function initScrollProgress() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    const circle = document.querySelector('.progress-ring-circle');
    if (!scrollBtn || !circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        setProgress(scrollPercent);

        if (scrollTop > 300) {
            scrollBtn.classList.add('active');
        } else {
            scrollBtn.classList.remove('active');
        }
    });
}

window.scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
