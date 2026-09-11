/**
 * Bella Beauty Makeup Studio - Gallery, Lightbox, Reels & Before/After Slider
 */

class GalleryManager {
  constructor() {
    this.currentCategory = "all";
    this.lightboxModal = document.getElementById("lightbox-modal");
    this.reelModal = document.getElementById("reel-modal");
    this.reelIframe = document.getElementById("reel-iframe");

    this.init();
  }

  init() {
    this.renderGallery();
    this.renderReels();
    this.initBeforeAfterSlider();
    this.bindEvents();
  }

  renderGallery() {
    const container = document.getElementById("gallery-grid-container");
    if (!container || !window.STUDIO_DATA) return;

    const items = window.STUDIO_DATA.gallery.filter(item => {
      if (this.currentCategory === "all") return true;
      return item.category === this.currentCategory;
    });

    container.innerHTML = items.map(item => `
      <div class="gallery-item" data-id="${item.id}" data-category="${item.category}" onclick="galleryManager.openLightbox(${item.id})">
        <img src="${item.img}" alt="${item.title}" class="gallery-item-img" loading="lazy" />
        <div class="gallery-item-overlay">
          <span class="badge-gold" style="width: fit-content; margin-bottom: 6px;">${item.category}</span>
          <h4 class="gallery-item-title">${item.title}</h4>
          <p class="gallery-item-caption">${item.caption}</p>
        </div>
      </div>
    `).join("");
  }

  renderReels() {
    const container = document.getElementById("reels-container");
    if (!container || !window.STUDIO_DATA) return;

    container.innerHTML = window.STUDIO_DATA.reels.map(reel => `
      <div class="reel-card" onclick="galleryManager.openReel('${reel.id}', '${reel.title}')">
        <img src="${reel.thumbnail}" alt="${reel.title}" class="reel-thumb-img" loading="lazy" />
        <div class="reel-play-btn" aria-label="Play Reel">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div class="reel-overlay-content">
          <span class="reel-tag">${reel.tag}</span>
          <h4 class="reel-title">${reel.title}</h4>
          <span style="font-size: 0.72rem; opacity: 0.8; margin-top: 4px; display: inline-block;">▶ ${reel.views} Views</span>
        </div>
      </div>
    `).join("");
  }

  initBeforeAfterSlider() {
    const container = document.getElementById("ba-slider-container");
    if (!container) return;

    const afterWrapper = container.querySelector(".ba-after-wrapper");
    const afterImg = afterWrapper ? afterWrapper.querySelector("img") : null;
    const handle = container.querySelector(".ba-handle");
    if (!afterWrapper || !handle) return;

    let isDown = false;

    // Synchronize inner image width to match the parent container exactly
    const syncImageDimensions = () => {
      const w = container.offsetWidth;
      if (afterImg && w > 0) {
        afterImg.style.width = w + "px";
        afterImg.style.minWidth = w + "px";
      }
    };

    syncImageDimensions();
    window.addEventListener("resize", syncImageDimensions);

    const setPosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percentage = (x / rect.width) * 100;

      afterWrapper.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    };

    // Desktop mouse events
    container.addEventListener("mousedown", (e) => {
      isDown = true;
      setPosition(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      isDown = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      setPosition(e.clientX);
    });

    // Mobile & tablet touch events
    container.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches.length > 0) {
        isDown = true;
        setPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isDown = false;
    });

    window.addEventListener("touchcancel", () => {
      isDown = false;
    });

    window.addEventListener("touchmove", (e) => {
      if (!isDown || !e.touches || e.touches.length === 0) return;
      setPosition(e.touches[0].clientX);
    }, { passive: true });

    // Initial 50% split
    afterWrapper.style.width = "50%";
    handle.style.left = "50%";
  }

  bindEvents() {
    // Gallery Filter Navigation
    const filterBtns = document.querySelectorAll(".gallery-filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.currentCategory = btn.getAttribute("data-category");
        this.renderGallery();
      });
    });

    // Close Modals on click outside or escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeLightbox();
        this.closeReel();
      }
    });
  }

  openLightbox(id) {
    const item = window.STUDIO_DATA.gallery.find(g => g.id === id);
    if (!item || !this.lightboxModal) return;

    const img = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");

    if (img) img.src = item.img;
    if (caption) caption.textContent = `${item.title} — ${item.caption}`;

    this.lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeLightbox() {
    if (!this.lightboxModal) return;
    this.lightboxModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  openReel(videoId, title) {
    if (!this.reelModal || !this.reelIframe) return;

    // Embed real YouTube Shorts player with autoplay
    this.reelIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`;
    const titleEl = document.getElementById("reel-title");
    if (titleEl) titleEl.textContent = title;

    this.reelModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeReel() {
    if (!this.reelModal || !this.reelIframe) return;
    this.reelIframe.src = "";
    this.reelModal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Global initialization helper
window.initGallery = function() {
  window.galleryManager = new GalleryManager();
};
