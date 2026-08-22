
        // Hamburger Menu
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const navItems = document.querySelectorAll('.nav-links li a');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            });
        });

        // Navbar Scroll Effect
        const navbarEl = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbarEl.classList.add('scrolled');
            } else {
                navbarEl.classList.remove('scrolled');
            }
        });

        // Intersection Observer for fade-in animations
        const fadeElements = document.querySelectorAll('.fade-in-section');
        const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        
        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);
        
        fadeElements.forEach(element => appearOnScroll.observe(element));

        // Animated Counters
        const counters = document.querySelectorAll('.counter');
        let hasCounted = false;

        const startCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const isFloat = target % 1 !== 0;
                const inc = target / 50;

                if (count < target) {
                    if(isFloat) counter.innerText = (count + inc).toFixed(1);
                    else counter.innerText = Math.ceil(count + inc);
                    setTimeout(startCounters, 30);
                } else {
                    counter.innerText = target + (target > 50 ? '+' : '');
                }
            });
        };

        const statsSection = document.getElementById('stats');
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                startCounters();
                hasCounted = true;
            }
        }, { threshold: 0.5 });
        
        if(statsSection) statsObserver.observe(statsSection);

        // Lightbox
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        window.openLightbox = (src) => {
            lightbox.style.display = 'flex';
            lightboxImg.src = src;
        };
        window.closeLightbox = () => { lightbox.style.display = 'none'; };

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') closeLightbox();
        });

        // Reviews Slider (Touch & Responsive)
        const slidesContainer = document.getElementById('reviewSlides');
        const dots = document.querySelectorAll('.dot');
        const wrapper = document.getElementById('sliderWrapper');
        let slideIndex = 0;
        let slideInterval;
        let startX = 0;
        let currentX = 0;

        function getCardsPerView() {
            if (window.innerWidth >= 769) return 3;
            if (window.innerWidth >= 481) return 2;
            return 1;
        }

        function updateSlider() {
            const totalSlides = document.querySelectorAll('.review-card').length;
            const cardsPerView = getCardsPerView();
            // Max index prevents scrolling past the last set of cards
            const maxIndex = Math.max(0, totalSlides - cardsPerView);
            
            if (slideIndex > maxIndex) slideIndex = maxIndex;
            if (slideIndex < 0) slideIndex = 0;
            
            const cardWidth = document.querySelector('.review-card').offsetWidth + 20; // + gap
            slidesContainer.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === slideIndex || (i === dots.length-1 && slideIndex === maxIndex));
            });
        }

        window.goToSlide = (n) => {
            slideIndex = n;
            updateSlider();
            resetInterval();
        };

        function nextSlide() {
            const totalSlides = document.querySelectorAll('.review-card').length;
            const maxIndex = Math.max(0, totalSlides - getCardsPerView());
            if (slideIndex < maxIndex) {
                slideIndex++;
            } else {
                slideIndex = 0; // loop back
            }
            updateSlider();
        }

        function prevSlide() {
            if (slideIndex > 0) slideIndex--;
            updateSlider();
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 4000);
        }

        // Touch events for swiping
        wrapper.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            clearInterval(slideInterval);
        }, {passive: true});

        wrapper.addEventListener('touchmove', e => {
            currentX = e.touches[0].clientX;
        }, {passive: true});

        wrapper.addEventListener('touchend', e => {
            if (startX && currentX) {
                const diff = startX - currentX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) nextSlide();
                    else prevSlide();
                }
            }
            startX = 0;
            currentX = 0;
            resetInterval();
        });

        wrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
        wrapper.addEventListener('mouseleave', resetInterval);

        window.addEventListener('resize', updateSlider);
        
        // Init
        updateSlider();
        resetInterval();

    
