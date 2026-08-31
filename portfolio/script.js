/**
 * Aniket Singh Portfolio - Interactive Scripts
 * Handles: Typewriter effect, Mobile Navigation, Scroll Spy, Terminal Simulator,
 * Project Filtering, Spotlight Card Effect, Copy Email, and Form Feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter-text');
    const roles = [
        "B.Tech CSE Student",
        "Python & AI Explorer",
        "Full-Stack Web Developer",
        "Prompt Engineer & Vibe Coder",
        "Problem Solver & Builder"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 90;

    function typeRole() {
        if (!typewriterElement) return;
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 90;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 1800; // Pause at end of text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400; // Pause before typing next word
        }

        setTimeout(typeRole, typeSpeed);
    }
    typeRole();

    // --- Header Scroll & Active Section Indicator ---
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let currentSection = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            mobileMenuBtn.classList.toggle('active', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close on nav link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on clicking outside header
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Card Spotlight Effect (Mouse Glow) ---
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Project Category Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // --- Interactive Developer Terminal Simulator ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    const terminalCommands = {
        help: () => `
Available commands:
  <span class="cmd-highlight">about</span>      - Quick bio and background
  <span class="cmd-highlight">skills</span>     - Summary of technical skills & tools
  <span class="cmd-highlight">projects</span>   - List of flagship projects
  <span class="cmd-highlight">certs</span>      - Verified certifications & credentials
  <span class="cmd-highlight">contact</span>    - Email and social connection links
  <span class="cmd-highlight">philosophy</span> - Development and vibe coding approach
  <span class="cmd-highlight">clear</span>      - Clear terminal output
  <span class="cmd-highlight">date</span>       - Show current system date & time
  <span class="cmd-highlight">joke</span>       - Get a quick programming joke
`,
        about: () => `
<span class="cmd-text-accent">Aniket Singh</span>
🎓 B.Tech Computer Science & Engineering @ RPS Institute of Technology, Patna (2024 - Present)
🚀 Passionate developer bridging data-driven logic and intuitive user experiences.
⚡ Strong background in Python, Web Development, and AI/ML model integration.
`,
        skills: () => `
<span class="cmd-text-accent">⚡ Tech Arsenal:</span>
  • <span class="cmd-tag">Languages:</span> Python (Advanced), JavaScript, Java, C, HTML5/CSS3
  • <span class="cmd-tag">AI / ML:</span> TensorFlow, Keras, scikit-learn, NumPy, pandas, Prompt Engineering
  • <span class="cmd-tag">Web & Backend:</span> FastAPI, Streamlit, RESTful APIs, Modern Responsive UI
  • <span class="cmd-tag">Tools:</span> Git, GitHub, Docker, VS Code, Postman, Linux CLI
`,
        projects: () => `
<span class="cmd-text-accent">🚀 Flagship Projects:</span>
  1. <span class="cmd-highlight">ResuSmart</span> - AI-powered intelligent resume analyzer & evaluator.
  2. <span class="cmd-highlight">AAPDA-MITRA</span> - Disaster management & citizen alert platform.
  3. <span class="cmd-highlight">Voice Assistant</span> - Python custom desktop AI voice automation.
  4. <span class="cmd-highlight">File Sharing QR</span> - Rapid browser-to-mobile file sharing utility.
  5. <span class="cmd-highlight">FastAPI Services</span> - High-performance REST microservices.
  6. <span class="cmd-highlight">Life Expectancy ML</span> - Machine Learning predictive analysis model.
`,
        certs: () => `
<span class="cmd-text-accent">🏆 Verified Certifications:</span>
  • AI-Machine Learning Engineer — Reliance Foundation Skilling Academy
  • Artificial Intelligence & Machine Learning — C-DAC
  • Career Edge: Young Professional — TCS iON
  • Career Edge: IT Primer — TCS iON
  • Python Essentials 1 — Cisco Networking Academy
`,
        contact: () => `
<span class="cmd-text-accent">📫 Get In Touch:</span>
  • Email:    <a href="mailto:aniketsingh4500@gmail.com" class="terminal-link">aniketsingh4500@gmail.com</a>
  • LinkedIn: <a href="https://www.linkedin.com/in/aniketsingh45/" target="_blank" class="terminal-link">linkedin.com/in/aniketsingh45</a>
  • GitHub:   <a href="https://github.com/Aniketsingh-45" target="_blank" class="terminal-link">github.com/Aniketsingh-45</a>
  • Location: Patna, Bihar, India
`,
        philosophy: () => `
<span class="cmd-text-accent">💡 Tech Philosophy:</span>
"Always learning, always building. Leveraging cutting-edge AI tools and vibe coding to accelerate execution, eliminate boilerplate, and build impactful software with surgical precision."
`,
        date: () => `Current Local Time: ${new Date().toLocaleString()}`,
        joke: () => {
            const jokes = [
                "Why do Python programmers prefer dark mode? Because light attracts bugs!",
                "There are 10 types of people in the world: those who understand binary, and those who don't.",
                "Why did the developer go broke? Because he used up all his cache.",
                "How do you comfort a JavaScript bug? You console it!"
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
    };

    if (terminalInput && terminalBody) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawCommand = terminalInput.value.trim();
                const command = rawCommand.toLowerCase();

                if (command === 'clear') {
                    terminalBody.innerHTML = '';
                    terminalInput.value = '';
                    return;
                }

                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `<span class="terminal-prompt">aniket@portfolio:~$</span> <span class="terminal-command-text">${escapeHTML(rawCommand)}</span>`;
                terminalBody.appendChild(commandLine);

                const responseLine = document.createElement('div');
                responseLine.className = 'terminal-response';

                if (terminalCommands[command]) {
                    responseLine.innerHTML = terminalCommands[command]();
                } else if (command === '') {
                    responseLine.innerHTML = '';
                } else {
                    responseLine.innerHTML = `<span class="terminal-error">Command not found: ${escapeHTML(rawCommand)}. Type <span class="cmd-highlight">help</span> for a list of valid commands.</span>`;
                }

                terminalBody.appendChild(responseLine);
                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // --- Copy Email to Clipboard ---
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyTooltip = document.getElementById('copyTooltip');

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = "aniketsingh4500@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                if (copyTooltip) {
                    copyTooltip.textContent = "Email copied!";
                    copyTooltip.classList.add('show');
                    setTimeout(() => {
                        copyTooltip.textContent = "Copy to clipboard";
                        copyTooltip.classList.remove('show');
                    }, 2000);
                }
            }).catch(() => {
                window.location.href = `mailto:${email}`;
            });
        });
    }

    // --- Contact Form Submission Simulation ---
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;

            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending message...`;
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = `<i class="fas fa-check"></i> Sent Successfully!`;
                submitBtn.style.backgroundColor = '#10b981';

                if (formFeedback) {
                    formFeedback.style.display = 'block';
                    formFeedback.className = 'form-feedback success';
                    formFeedback.innerHTML = `<strong>Thank you!</strong> Your message has been prepared. You can also reach Aniket directly at <a href="mailto:aniketsingh4500@gmail.com" class="text-accent">aniketsingh4500@gmail.com</a>.`;
                }

                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 4000);
            }, 1000);
        });
    }

    // --- Scroll-triggered Fade In Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
