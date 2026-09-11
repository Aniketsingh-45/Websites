/**
 * Bella Beauty Makeup Studio - Master Application Script
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Theme
  initThemeManager();

  // 2. Initialize Real-Time Studio Hours Indicator
  initStudioStatus();

  // 3. Render Dynamic Services Grid
  renderServices();

  // 4. Render Dynamic FAQs
  renderFAQs();

  // 5. Setup Sticky Header & Scrollspy
  initNavigation();

  // 6. Initialize Modular Components
  if (typeof window.initThreeExperience === "function") window.initThreeExperience();
  if (typeof window.initGallery === "function") window.initGallery();
  if (typeof window.initReviews === "function") window.initReviews();
  if (typeof window.initBooking === "function") window.initBooking();

  // 7. Initialize Scroll Reveal Observers
  initScrollAnimations();
});

/**
 * Theme Manager: Luxury Champagne Gold vs Midnight Velvet Glamour
 */
function initThemeManager() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  const currentTheme = localStorage.getItem("BELLA_THEME") || "champagne";

  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = activeTheme === "midnight" ? "champagne" : "midnight";

      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("BELLA_THEME", nextTheme);
      updateThemeIcon(nextTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const iconWrap = document.getElementById("theme-toggle-icon");
  if (!iconWrap) return;

  if (theme === "midnight") {
    // Show Sun icon for switching back to daytime champagne
    iconWrap.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    iconWrap.setAttribute("title", "Switch to Daytime Champagne");
  } else {
    // Show Moon icon for switching to midnight glamour
    iconWrap.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    iconWrap.setAttribute("title", "Switch to Midnight Velvet Glamour");
  }
}

/**
 * Studio Operating Hours Live Status Checker
 */
function initStudioStatus() {
  const statusEls = document.querySelectorAll(".live-status-text");
  if (!statusEls.length) return;

  const now = new Date();
  const currentHour = now.getHours();

  // Operating hours: 11:00 AM (11) to 09:00 PM (21)
  const isOpen = currentHour >= 11 && currentHour < 21;

  statusEls.forEach(el => {
    if (isOpen) {
      el.innerHTML = `<span class="status-indicator"><span class="status-dot"></span> Open Today Until 9:00 PM</span>`;
    } else {
      el.innerHTML = `<span class="status-indicator" style="color: #F59E0B;"><span class="status-dot" style="background:#F59E0B; box-shadow: 0 0 0 2px rgba(245,158,11,0.25);"></span> Closed · Opens at 11:00 AM</span>`;
    }
  });
}

/**
 * Render Services Grid with Category Filtering
 */
let activeServiceCategory = "all";

function renderServices() {
  const container = document.getElementById("services-grid-container");
  if (!container || !window.STUDIO_DATA) return;

  const list = window.STUDIO_DATA.services.filter(s => {
    if (activeServiceCategory === "all") return true;
    return s.category === activeServiceCategory;
  });

  container.innerHTML = list.map(s => `
    <div class="glass-card service-card" data-category="${s.category}">
      <div class="service-card-img-wrap">
        <img src="${s.image}" alt="${s.name}" class="service-card-img" loading="lazy" />
        ${s.popular ? `<span class="service-popular-badge">⭐ Studio Signature</span>` : ''}
      </div>
      <div class="service-card-body">
        <div class="service-meta-row">
          <span class="service-duration">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${s.duration}
          </span>
          <span class="service-price">₹${s.price.toLocaleString("en-IN")}</span>
        </div>
        <h3 class="service-title">${s.name}</h3>
        <p class="service-tagline">${s.tagline}</p>
        
        <ul class="service-inclusions-list">
          ${s.inclusions.map(inc => `
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${inc}</span>
            </li>
          `).join("")}
        </ul>

        <div class="service-card-footer">
          <button type="button" class="btn btn-primary" style="flex: 1;" onclick="bookingEngine.openBooking('${s.id}')">
            Book Service
          </button>
          <a href="https://wa.me/919217002598?text=${encodeURIComponent(`Hi Bella Beauty Studio, I'm interested in the ${s.name} (₹${s.price.toLocaleString("en-IN")}). Could you share more details?`)}" target="_blank" class="btn btn-outline btn-icon-only" title="Inquire on WhatsApp">
            💬
          </a>
        </div>
      </div>
    </div>
  `).join("");

  // Bind service category filters
  const filterBtns = document.querySelectorAll(".service-filter-nav .filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeServiceCategory = btn.getAttribute("data-category");
      renderServices();
    });
  });
}

/**
 * Render FAQ Accordion
 */
function renderFAQs() {
  const container = document.getElementById("faq-list-container");
  if (!container || !window.STUDIO_DATA) return;

  container.innerHTML = window.STUDIO_DATA.faqs.map((faq, index) => `
    <div class="faq-item ${index === 0 ? 'active' : ''}">
      <div class="faq-header" onclick="toggleFAQ(this)">
        <span>${faq.q}</span>
        <svg class="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      <div class="faq-body" ${index === 0 ? 'style="max-height: 200px;"' : ''}>
        <p>${faq.a}</p>
      </div>
    </div>
  `).join("");
}

function toggleFAQ(headerEl) {
  const item = headerEl.parentElement;
  const body = item.querySelector(".faq-body");
  const isActive = item.classList.contains("active");

  // Close all other items
  document.querySelectorAll(".faq-item").forEach(other => {
    if (other !== item) {
      other.classList.remove("active");
      const otherBody = other.querySelector(".faq-body");
      if (otherBody) otherBody.style.maxHeight = null;
    }
  });

  if (isActive) {
    item.classList.remove("active");
    body.style.maxHeight = null;
  } else {
    item.classList.add("active");
    body.style.maxHeight = body.scrollHeight + 30 + "px";
  }
}
window.toggleFAQ = toggleFAQ;

/**
 * Sticky Navigation & Mobile Menu Logic
 */
function initNavigation() {
  const header = document.querySelector(".main-header");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scrollspy
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  });

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isOpen = navMenu.classList.contains("open");
      mobileBtn.innerHTML = isOpen ? `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ` : `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }
}

/**
 * Intersection Observer for Reveal on Scroll
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}
