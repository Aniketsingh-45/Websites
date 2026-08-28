// ============================================
// CONFIGURATION
// ============================================
const correctPin = "123";
let currentPin = "";

// ============================================
// PERFORMANCE-OPTIMIZED BACKGROUND ANIMATIONS
// ============================================

const MAX_HEARTS = 18;
const MAX_SPARKLES = 15;
const MAX_PARTICLES = 12;
const MAX_EMOJI_RAIN = 22;

// Throttled element creator — prevents DOM overload
function throttledCreate(container, maxCount, className, createFn, intervalMs) {
    if (!container) return null;
    let lastTime = 0;
    const id = setInterval(() => {
        if (container.querySelectorAll('.' + className).length >= maxCount) return;
        createFn(container);
    }, intervalMs);
    return id;
}

// Floating hearts background (optimized)
function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    if (!container) return;
    const hearts = ['♥', '❤', '💕', '💖', '💗', '♡', '❣'];
    throttledCreate(container, MAX_HEARTS, 'floating-heart', (c) => {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 6 + 8) + 's';
        heart.style.color = `hsla(${340 + Math.random() * 40}, 80%, ${60 + Math.random() * 20}%, ${0.2 + Math.random() * 0.4})`;
        c.appendChild(heart);
        setTimeout(() => heart.remove(), 14000);
    }, 700);
}

// Sparkle particles (optimized)
function createSparkles() {
    const container = document.getElementById('sparklesBg');
    if (!container) return;
    throttledCreate(container, MAX_SPARKLES, 'sparkle', (c) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        const size = (Math.random() * 4 + 2) + 'px';
        sparkle.style.width = size;
        sparkle.style.height = size;
        c.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 5000);
    }, 500);
}

// Gold particles (optimized)
function createParticles() {
    const container = document.getElementById('particlesBg');
    if (!container) return;
    const colors = ['rgba(255,215,0,0.5)', 'rgba(255,200,200,0.4)', 'rgba(255,255,255,0.3)', 'rgba(255,180,180,0.4)'];
    throttledCreate(container, MAX_PARTICLES, 'particle', (c) => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
        particle.style.setProperty('--dy', (Math.random() * 200 - 100) + 'px');
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.appendChild(particle);
        setTimeout(() => particle.remove(), 7000);
    }, 600);
}

// ============================================
// UNIVERSAL EMOJI RAIN — drops on ALL screens
// ============================================
const emojiRainPool = ['❤️','👀','💕','😍','🤩','😻','🙈','🎂','🎉','🎈','🎁','🥳','💖','✨'];

function createEmojiRain() {
    // JS-based universal emoji rain has been removed.
    // We now use pure CSS hardware-accelerated emojis strictly on the first screen.
}

// Initialize all background effects
createFloatingHearts();
createSparkles();
createParticles();
createEmojiRain();

// ============================================
// PASSCODE LOGIC (Updated for box-style PIN)
// ============================================

function updatePinBoxes() {
    const boxes = document.querySelectorAll('.pin-box');
    boxes.forEach((box, index) => {
        if (index < currentPin.length) {
            box.classList.add('filled');
            box.textContent = currentPin[index];
        } else {
            box.classList.remove('filled');
            box.textContent = '';
        }
    });
}

function resetPinDisplay() {
    const display = document.getElementById('pinDisplay');
    display.classList.remove('text-mode');
    display.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const box = document.createElement('span');
        box.className = 'pin-box';
        display.appendChild(box);
    }
}

function pressKey(num) {
    if (currentPin.length < 3) {
        currentPin += num;
        updatePinBoxes();
        
        // Button press animation
        const btn = event.target;
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 300);
        
        // Haptic-like micro feedback
        if (navigator.vibrate) navigator.vibrate(10);
        
        // Auto-check when all digits entered
        if (currentPin.length === 3) {
            setTimeout(() => checkPin(), 400);
        }
    }
}

function clearPin() {
    currentPin = "";
    resetPinDisplay();
}

function checkPin() {
    const display = document.getElementById('pinDisplay');
    
    if (currentPin === correctPin) {
        // SUCCESS! 
        display.classList.add('text-mode');
        display.innerHTML = '<span class="status-text" style="color: #4ecdc4;">✓ UNLOCKED!</span>';
        
        // Epic confetti burst
        launchSuccessConfetti();
        
        // Transition to heart screen
        setTimeout(() => {
            goToScreen('screen-heart');
            launchHeartBurst();
        }, 2000);

    } else {
        // WRONG PIN
        display.classList.add('text-mode');
        display.innerHTML = '<span class="status-text" style="color: #ff6b6b;">✗ WRONG!</span>';
        
        const card = document.getElementById('polaroidCard');
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 500);
        
        setTimeout(() => {
            currentPin = "";
            resetPinDisplay();
        }, 1000);
    }
}

// ============================================
// CONFETTI EFFECTS
// ============================================

function launchSuccessConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#ff2d55', '#ffd700', '#ffffff', '#ff6b9d', '#ce93d8', '#ffab91'];
    
    (function frame() {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: colors
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: colors
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function launchCelebrationConfetti() {
    // Center burst
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#ff2d55', '#ffd700', '#ffffff', '#ff6b9d', '#7b1fa2']
    });
    
    // Side cannons
    setTimeout(() => {
        confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.6 }, colors: ['#ff2d55', '#ffd700'] });
        confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.6 }, colors: ['#ff6b9d', '#ce93d8'] });
    }, 500);
    
    setTimeout(() => {
        confetti({ particleCount: 100, spread: 120, origin: { y: 0.4 }, colors: ['#ffd700', '#ffffff', '#ffab91'] });
    }, 1000);
}

// ============================================
// HEART BURST EFFECT
// ============================================

function launchHeartBurst() {
    const container = document.getElementById('burstHearts');
    if (!container) return;
    const heartEmojis = ['💖', '💕', '💗', '💝', '❤️', '💘', '💞', '🌹', '✨', '💫'];
    
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'burst-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = '50%';
            heart.style.top = '40%';
            heart.style.fontSize = (Math.random() * 20 + 16) + 'px';
            
            const angle = (Math.PI * 2 / 40) * i;
            const distance = 200 + Math.random() * 300;
            heart.style.setProperty('--bx', Math.cos(angle) * distance + 'px');
            heart.style.setProperty('--by', Math.sin(angle) * distance + 'px');
            
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }, i * 50);
    }
}

// ============================================
// SCREEN NAVIGATION
// ============================================

// (goToScreen is defined later with gallery auto-play support)


// ============================================
// BIRTHDAY CAKE - BLOW CANDLES
// ============================================

function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    const blowBtn = document.getElementById('blowBtn');
    const wishText = document.getElementById('wishText');
    const finalBtn = document.getElementById('finalBtn');
    
    // Blow out each candle with delay
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('blown-out');
            
            // Add smoke effect
            const candle = flame.parentElement;
            const smoke = document.createElement('div');
            smoke.className = 'smoke';
            candle.appendChild(smoke);
            setTimeout(() => smoke.remove(), 1500);
        }, index * 200);
    });
    
    // After all candles are blown
    setTimeout(() => {
        blowBtn.classList.add('hidden');
        wishText.classList.remove('hidden');
        finalBtn.classList.remove('hidden');
        
        // Massive celebration!
        launchCelebrationConfetti();
        
        // Change title
        const title = document.getElementById('cakeTitle');
        title.textContent = '🎉 Your Wish Will Come True! 🎉';
        title.style.fontSize = '2rem';
    }, flames.length * 200 + 500);
}
// ============================================
// GIFT PROMPT LOGIC (Sneaky NO Button)
// ============================================
function moveNoButton() {
    const btnNo = document.getElementById('btnNo');
    
    // Switch to absolute positioning so it can fly around
    if (btnNo.style.position !== 'absolute') {
        btnNo.style.position = 'absolute';
    }
    
    // Calculate random positions within the visible window
    const safeWidth = window.innerWidth - btnNo.offsetWidth - 20;
    const safeHeight = window.innerHeight - btnNo.offsetHeight - 20;
    
    // Generate random coordinates
    const newX = Math.random() * safeWidth;
    const newY = Math.random() * safeHeight;
    
    // Apply new position with a smooth transition
    btnNo.style.left = `${Math.max(10, newX)}px`;
    btnNo.style.top = `${Math.max(10, newY)}px`;
    
    // Fun part: change text randomly when it dodges
    const funnyTexts = ["Try again! 😜", "Nope! ❌", "Click YES! 👉", "Can't catch me! 🏃"];
    const randomText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
    btnNo.innerHTML = `<span class="btn-icon">❌</span> ${randomText}`;
}

// ============================================
// GIFT BOX INTERACTIVE SHAKE
// ============================================
function animateGiftClick() {
    const box = document.getElementById('giftSvgBox');
    if (!box) return;
    
    // Trigger shake animation
    box.classList.remove('shaking');
    // Force reflow to restart animation
    void box.offsetWidth;
    box.classList.add('shaking');
    
    // Remove class after animation ends
    setTimeout(() => box.classList.remove('shaking'), 650);
    
    // Burst mini confetti from gift area
    confetti({
        particleCount: 25,
        spread: 60,
        origin: { x: 0.35, y: 0.55 },
        colors: ['#ffd700', '#ff2d55', '#ff6b9d', '#ce93d8', '#ffffff'],
        scalar: 0.8,
        startVelocity: 20,
        gravity: 0.9
    });
}

// ============================================
// GRAND FINALE EFFECTS
// ============================================

function startFinaleEffects() {
    launchCelebrationConfetti();
    createFireworks();
    
    // Continuous confetti
    const confettiInterval = setInterval(() => {
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { x: Math.random(), y: Math.random() * 0.5 },
            colors: ['#ff2d55', '#ffd700', '#ffffff', '#ce93d8']
        });
    }, 1500);
    
    // Stop after 15 seconds
    setTimeout(() => clearInterval(confettiInterval), 15000);
}

function createFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    
    const colors = ['#ff2d55', '#ffd700', '#4ecdc4', '#ce93d8', '#ff6b9d', '#ffab91', '#ffffff'];
    
    function launchFirework() {
        const x = Math.random() * 80 + 10; // % position
        const y = Math.random() * 40 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const particleCount = 20 + Math.floor(Math.random() * 20);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.left = x + '%';
            particle.style.top = y + '%';
            particle.style.background = color;
            particle.style.boxShadow = `0 0 6px ${color}`;
            
            const angle = (Math.PI * 2 / particleCount) * i;
            const distance = 50 + Math.random() * 100;
            particle.style.setProperty('--fx', Math.cos(angle) * distance + 'px');
            particle.style.setProperty('--fy', Math.sin(angle) * distance + 'px');
            particle.style.animationDuration = (1 + Math.random() * 0.5) + 's';
            
            canvas.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }
    }
    
    // Launch fireworks periodically
    let count = 0;
    const maxFireworks = 20;
    const fireworkInterval = setInterval(() => {
        launchFirework();
        if (Math.random() > 0.5) launchFirework(); // Sometimes double
        count++;
        if (count >= maxFireworks) clearInterval(fireworkInterval);
    }, 800);
}

// ============================================
// INTERACTIVE EXTRAS
// ============================================

// Cursor trail hearts (desktop only)
if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.85) {
            const trail = document.createElement('span');
            trail.textContent = '♥';
            trail.style.position = 'fixed';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.color = `hsla(${340 + Math.random() * 40}, 80%, 65%, 0.7)`;
            trail.style.fontSize = (8 + Math.random() * 12) + 'px';
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9999';
            trail.style.transition = 'all 1s ease-out';
            trail.style.transform = 'scale(1)';
            document.body.appendChild(trail);
            
            requestAnimationFrame(() => {
                trail.style.transform = `translateY(-40px) scale(0) rotate(${Math.random() * 180}deg)`;
                trail.style.opacity = '0';
            });
            
            setTimeout(() => trail.remove(), 1000);
        }
    });
}

// Touch sparkle effect (mobile)
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = (touch.clientX + (Math.random() - 0.5) * 40) + 'px';
            sparkle.style.top = (touch.clientY + (Math.random() - 0.5) * 40) + 'px';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#ffd700';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.boxShadow = '0 0 6px 2px rgba(255,215,0,0.5)';
            sparkle.style.transition = 'all 0.8s ease-out';
            document.body.appendChild(sparkle);
            
            requestAnimationFrame(() => {
                sparkle.style.transform = `translate(${(Math.random()-0.5)*60}px, ${-30-Math.random()*30}px) scale(0)`;
                sparkle.style.opacity = '0';
            });
            
            setTimeout(() => sparkle.remove(), 800);
        }, i * 50);
    }
});

// Play music on first interaction
let musicPlayed = false;
document.addEventListener('click', () => {
    if (!musicPlayed) {
        const music = document.getElementById('bgMusic');
        if (music) {
            music.play().catch(() => {});
        }
        musicPlayed = true;
    }
}, { once: false });

// Keyboard support for passcode
document.addEventListener('keydown', (e) => {
    const activeScreen = document.getElementById('screen-passcode');
    if (!activeScreen || !activeScreen.classList.contains('active-screen')) return;
    
    if (e.key >= '0' && e.key <= '9') {
        pressKey(e.key);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
        clearPin();
    } else if (e.key === 'Enter') {
        checkPin();
    }
});

// ============================================
// CHOICE SCREEN LOGIC
// ============================================
function openChoice(type) {
    const card = document.getElementById(
        type === 'gallery' ? 'choiceCamera' :
        type === 'letter'  ? 'choiceBottle' :
                             'choiceStar'
    );

    // Bounce animation on click
    if (card) {
        card.style.transform = 'scale(0.9)';
        setTimeout(() => { card.style.transform = ''; }, 200);
    }

    // Mini confetti burst
    confetti({
        particleCount: 40,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ffd700', '#ff2d55', '#ff6b9d', '#ce93d8', '#ffffff'],
        scalar: 0.9,
        startVelocity: 25,
        gravity: 0.85
    });

    // Navigate after brief delay for effect
    setTimeout(() => {
        if (type === 'gallery') {
            currentSlide = 0;
            goToScreen('screen-gallery');
        } else if (type === 'letter') {
            goToScreen('screen-message');
        } else if (type === 'finale') {
            goToScreen('screen-video');
            // Play video automatically if possible
            const vid = document.getElementById('surprise-video');
            if (vid) {
                vid.play().catch(e => console.log("Autoplay prevented:", e));
            }
        }
    }, 350);
}

// Function to transition from Video screen to Grand Finale
function goToFinale() {
    // Pause video if playing
    const vid = document.getElementById('surprise-video');
    if (vid) {
        vid.pause();
    }
    
    goToScreen('screen-finale');
    
    // Big celebration confetti for the grand finale!
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 120,
            origin: { y: 0.4 },
            colors: ['#ffd700', '#ff2d55', '#ff6b9d', '#ce93d8', '#ffffff', '#ffab91']
        });
    }, 500);
}

// ============================================
// VIDEO DOWNLOAD
// ============================================
function downloadVideo() {
    const videoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-holding-a-sparkler-at-a-party-close-up-40433-large.mp4';
    const fileName = 'Birthday_Surprise_Video.mp4';
    
    // Try fetch + blob approach first (most reliable)
    fetch(videoSrc)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            // Clean up blob URL after a short delay
            setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
        })
        .catch(() => {
            // Fallback: open video directly
            window.open(videoSrc, '_blank');
        });
}

// Attach download handler to the download link
document.addEventListener('DOMContentLoaded', () => {
    const dlBtn = document.getElementById('downloadBtn');
    if (dlBtn) {
        dlBtn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadVideo();
        });
    }
});

// ============================================
// PHOTO GALLERY SLIDESHOW
// ============================================
let currentSlide = 0;
const totalSlides = 5;
let galleryAutoPlay = null;

function updateGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots   = document.querySelectorAll('.gallery-dot');

    slides.forEach((slide, i) => {
        slide.classList.toggle('active-slide', i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active-dot', i === currentSlide);
    });
}

function changeSlide(dir) {
    currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
    updateGallery();
    resetGalleryAutoPlay();
}

function goToSlide(index) {
    currentSlide = index;
    updateGallery();
    resetGalleryAutoPlay();
}

function startGalleryAutoPlay() {
    galleryAutoPlay = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateGallery();
    }, 4000);
}

function resetGalleryAutoPlay() {
    if (galleryAutoPlay) clearInterval(galleryAutoPlay);
    startGalleryAutoPlay();
}

// Start auto-play when gallery screen opens
function goToScreen(screenId) {
    // Stop gallery autoplay if leaving gallery
    if (screenId !== 'screen-gallery' && galleryAutoPlay) {
        clearInterval(galleryAutoPlay);
        galleryAutoPlay = null;
    }

    if (screenId === 'screen-video') {
        document.body.classList.add('video-active');
    } else {
        document.body.classList.remove('video-active');
    }

    const activeScreen = document.querySelector('.screen.active-screen');
    if (activeScreen) {
        activeScreen.style.opacity = '0';
        activeScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            activeScreen.classList.remove('active-screen');
            activeScreen.style.display = 'none';

            const newScreen = document.getElementById(screenId);
            if (newScreen) {
                newScreen.style.display = 'flex';
                newScreen.style.opacity = '0';
                newScreen.offsetHeight;
                newScreen.classList.add('active-screen');
                newScreen.style.opacity = '1';
                newScreen.style.transition = 'opacity 0.8s ease';

                // Screen-specific initializations
                if (screenId === 'screen-heart') {
                    launchCelebrationConfetti();
                }
                if (screenId === 'screen-finale') {
                    startFinaleEffects();
                }
                if (screenId === 'screen-gallery') {
                    currentSlide = 0;
                    updateGallery();
                    startGalleryAutoPlay();
                }
            }
        }, 500);
    }
}

// Keyboard arrow navigation for gallery
document.addEventListener('keydown', (e) => {
    const galleryScreen = document.getElementById('screen-gallery');
    if (!galleryScreen || !galleryScreen.classList.contains('active-screen')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') changeSlide(1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   changeSlide(-1);
});

// Touch swipe support for gallery
let galleryTouchStartX = 0;
document.addEventListener('touchstart', (e) => {
    const galleryScreen = document.getElementById('screen-gallery');
    if (!galleryScreen || !galleryScreen.classList.contains('active-screen')) return;
    galleryTouchStartX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const galleryScreen = document.getElementById('screen-gallery');
    if (!galleryScreen || !galleryScreen.classList.contains('active-screen')) return;
    const dx = e.changedTouches[0].clientX - galleryTouchStartX;
    if (Math.abs(dx) > 50) changeSlide(dx < 0 ? 1 : -1);
}, { passive: true });