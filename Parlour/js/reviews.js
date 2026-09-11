/**
 * Bella Beauty Makeup Studio - Reviews & Testimonials System
 */

class ReviewsManager {
  constructor() {
    this.storageKey = "BELLA_USER_REVIEWS";
    this.reviewsModal = document.getElementById("review-modal");
    this.init();
  }

  init() {
    this.renderReviews();
    this.bindEvents();
  }

  getAllReviews() {
    let localReviews = [];
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) localReviews = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    return [...localReviews, ...window.STUDIO_DATA.reviews];
  }

  renderReviews() {
    const container = document.getElementById("reviews-grid-container");
    if (!container || !window.STUDIO_DATA) return;

    const all = this.getAllReviews();

    container.innerHTML = all.map(rev => {
      const initial = rev.author ? rev.author.charAt(0).toUpperCase() : "B";
      const stars = "★".repeat(rev.rating) + "☆".repeat(5 - rev.rating);

      return `
        <div class="glass-card review-card">
          <div class="review-card-top">
            <div class="review-author-info">
              <div class="review-author-avatar">${initial}</div>
              <div>
                <h4 class="review-author-name">${rev.author}</h4>
                <span class="review-date">${rev.date} · <span style="color: #0E9F6E; font-weight: 600;">${rev.source}</span></span>
              </div>
            </div>
            <div class="rating-stars" style="font-size: 1rem; color: #F59E0B;">${stars}</div>
          </div>
          <p class="review-quote">"${rev.body}"</p>
        </div>
      `;
    }).join("");
  }

  bindEvents() {
    const writeBtn = document.getElementById("write-review-btn");
    if (writeBtn) {
      writeBtn.addEventListener("click", () => this.openReviewModal());
    }

    const reviewForm = document.getElementById("review-submission-form");
    if (reviewForm) {
      reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitReview(e.target);
      });
    }

    // Star selector interaction
    const starInputs = document.querySelectorAll(".star-rating-input input");
    starInputs.forEach(input => {
      input.addEventListener("change", (e) => {
        const ratingVal = e.target.value;
        const label = document.getElementById("star-rating-value-label");
        if (label) label.textContent = `${ratingVal} Stars`;
      });
    });
  }

  openReviewModal() {
    if (!this.reviewsModal) return;
    this.reviewsModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeReviewModal() {
    if (!this.reviewsModal) return;
    this.reviewsModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  submitReview(form) {
    const name = form.authorName.value.trim();
    const service = form.serviceName.value;
    const rating = parseInt(form.rating.value) || 5;
    const body = form.reviewText.value.trim();

    if (!name || !body) {
      alert("Please fill in your name and review experience.");
      return;
    }

    const newReview = {
      id: Date.now(),
      author: name,
      date: "Just Now",
      source: `Client (${service})`,
      rating: rating,
      body: body
    };

    try {
      const saved = localStorage.getItem(this.storageKey);
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(newReview);
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }

    this.renderReviews();
    this.closeReviewModal();
    form.reset();

    alert("Thank you! Your verified review has been submitted and published.");
  }
}

// Global initialization helper
window.initReviews = function() {
  window.reviewsManager = new ReviewsManager();
};
