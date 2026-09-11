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

  // 4b. Render Dynamic Instagram Posts Feed
  renderInstagramFeed();

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
 * Render Dynamic Instagram Posts Feed
 */
function renderInstagramFeed() {
  const container = document.getElementById("instagram-posts-container");
  if (!container || !window.STUDIO_DATA || !window.STUDIO_DATA.instagramData) return;

  const data = window.STUDIO_DATA.instagramData;
  container.innerHTML = data.posts.map(post => `
    <div class="instagram-post-card" onclick="window.open('${data.profileUrl}', '_blank')" title="View on Instagram">
      <img src="${post.image}" alt="${post.caption}" class="instagram-post-img" loading="lazy" />
      <div class="instagram-post-overlay">
        <div class="ig-overlay-top">
          <span class="badge-rose" style="font-size: 0.72rem; padding: 4px 10px;">${post.tag}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </div>
        <div>
          <div class="ig-overlay-metrics" style="margin-bottom: 8px;">
            <span style="display: inline-flex; align-items: center; gap: 4px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#FF4B72" stroke="#FF4B72"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              ${post.likes}
            </span>
            <span style="display: inline-flex; align-items: center; gap: 4px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              ${post.comments}
            </span>
          </div>
          <p class="ig-overlay-caption">${post.caption}</p>
        </div>
      </div>
    </div>
  `).join("");
}


/**
 * Theme Manager: Luxury Champagne Gold vs Midnight Velvet Glamour
 */
function initThemeManager() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  const currentTheme = localStorage.getItem("BELLA_THEME") || "midnight";

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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display:inline-block; vertical-align:-2px; margin-right:3px;">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Book Service</span>
          </button>
          <a href="https://wa.me/919217002598?text=${encodeURIComponent(`Hi Bella Beauty Studio, I'm interested in the ${s.name} (₹${s.price.toLocaleString("en-IN")}). Could you share more details?`)}" target="_blank" class="btn btn-outline btn-icon-only" title="Inquire on WhatsApp" style="color: #25D366; border-color: rgba(37, 211, 102, 0.4);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
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
