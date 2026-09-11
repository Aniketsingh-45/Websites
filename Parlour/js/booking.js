/**
 * Bella Beauty Makeup Studio - Appointment Booking Engine
 */

class BookingEngine {
  constructor() {
    this.modal = document.getElementById("booking-modal");
    this.myBookingsModal = document.getElementById("my-bookings-modal");
    this.storageKey = "BELLA_USER_BOOKINGS";

    this.currentStep = 1;
    this.totalSteps = 4;

    this.selectedServices = []; // array of service objects
    this.selectedStylist = null;
    this.selectedDate = "";
    this.selectedSlot = "";
    this.promoDiscount = 0;
    this.appliedPromoCode = "";

    this.availableSlots = [
      "11:00 AM", "11:45 AM", "12:30 PM", "01:15 PM",
      "02:00 PM", "02:45 PM", "03:30 PM", "04:15 PM",
      "05:00 PM", "05:45 PM", "06:30 PM", "07:15 PM", "08:00 PM"
    ];

    this.init();
  }

  init() {
    this.renderServiceChoices();
    this.renderStylistChoices();
    this.renderSlotChoices();
    this.setDefaultDate();
    this.bindEvents();
    this.updateSummary();
  }

  setDefaultDate() {
    const dateInput = document.getElementById("booking-date-input");
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
      dateInput.value = `${yyyy}-${mm}-${dd}`;
      this.selectedDate = dateInput.value;
    }
  }

  renderServiceChoices() {
    const container = document.getElementById("booking-services-container");
    if (!container || !window.STUDIO_DATA) return;

    container.innerHTML = window.STUDIO_DATA.services.map(s => `
      <div class="booking-service-choice" data-id="${s.id}" onclick="bookingEngine.toggleServiceChoice('${s.id}')">
        <div class="service-choice-left">
          <div class="choice-checkbox">✓</div>
          <div>
            <div class="choice-name">${s.name}</div>
            <div class="choice-meta">⏱ ${s.duration} · ${s.tagline}</div>
          </div>
        </div>
        <div class="choice-price">₹${s.price.toLocaleString("en-IN")}</div>
      </div>
    `).join("");
  }

  renderStylistChoices() {
    const container = document.getElementById("booking-stylists-container");
    if (!container || !window.STUDIO_DATA) return;

    container.innerHTML = window.STUDIO_DATA.stylists.map((st, index) => `
      <div class="stylist-radio-card ${index === 0 ? 'selected' : ''}" data-id="${st.id}" onclick="bookingEngine.selectStylist('${st.id}')">
        <img src="${st.avatar}" alt="${st.name}" class="stylist-avatar-img" />
        <div class="stylist-info-box">
          <div class="stylist-name">${st.name}</div>
          <div class="stylist-role">${st.role}</div>
          <div class="stylist-exp">${st.specialty}</div>
        </div>
      </div>
    `).join("");

    this.selectedStylist = window.STUDIO_DATA.stylists[0];
  }

  renderSlotChoices() {
    const container = document.getElementById("booking-slots-container");
    if (!container) return;

    container.innerHTML = this.availableSlots.map((slot, index) => `
      <button type="button" class="slot-btn ${index === 0 ? 'selected' : ''}" data-slot="${slot}" onclick="bookingEngine.selectSlot('${slot}', this)">
        ${slot}
      </button>
    `).join("");

    this.selectedSlot = this.availableSlots[0];
  }

  toggleServiceChoice(serviceId) {
    const s = window.STUDIO_DATA.services.find(item => item.id === serviceId);
    if (!s) return;

    const el = document.querySelector(`.booking-service-choice[data-id="${serviceId}"]`);
    const existingIndex = this.selectedServices.findIndex(item => item.id === serviceId);

    if (existingIndex > -1) {
      this.selectedServices.splice(existingIndex, 1);
      if (el) el.classList.remove("selected");
    } else {
      this.selectedServices.push(s);
      if (el) el.classList.add("selected");
    }

    this.updateSummary();
  }

  selectStylist(stylistId) {
    const st = window.STUDIO_DATA.stylists.find(item => item.id === stylistId);
    if (!st) return;

    this.selectedStylist = st;
    document.querySelectorAll(".stylist-radio-card").forEach(el => {
      el.classList.toggle("selected", el.getAttribute("data-id") === stylistId);
    });
  }

  selectSlot(slot, btnEl) {
    this.selectedSlot = slot;
    document.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("selected"));
    if (btnEl) btnEl.classList.add("selected");
  }

  updateSummary() {
    const subtotal = this.selectedServices.reduce((sum, s) => sum + s.price, 0);
    const discount = this.promoDiscount;
    const total = Math.max(0, subtotal - discount);

    const subtotalEl = document.getElementById("bill-subtotal");
    const discountEl = document.getElementById("bill-discount");
    const totalEl = document.getElementById("bill-total");
    const countEl = document.getElementById("selected-services-count");

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
    if (discountEl) discountEl.textContent = discount > 0 ? `- ₹${discount.toLocaleString("en-IN")}` : "₹0";
    if (totalEl) totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
    if (countEl) countEl.textContent = `${this.selectedServices.length} Selected`;

    const nextBtn = document.getElementById("booking-next-btn");
    if (nextBtn && this.currentStep === 1) {
      nextBtn.disabled = this.selectedServices.length === 0;
      nextBtn.style.opacity = this.selectedServices.length === 0 ? "0.5" : "1";
    }
  }

  applyPromo() {
    const input = document.getElementById("promo-input");
    const msg = document.getElementById("promo-message");
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    const subtotal = this.selectedServices.reduce((sum, s) => sum + s.price, 0);

    if (code === "BELLA10") {
      this.promoDiscount = Math.round(subtotal * 0.1);
      this.appliedPromoCode = code;
      if (msg) {
        msg.textContent = `Promo code BELLA10 applied! 10% saved (₹${this.promoDiscount.toLocaleString("en-IN")})`;
        msg.style.color = "#0E9F6E";
      }
    } else if (code === "BRIDAL2026") {
      this.promoDiscount = Math.min(1000, subtotal);
      this.appliedPromoCode = code;
      if (msg) {
        msg.textContent = `Promo code BRIDAL2026 applied! Flat ₹1,000 saved`;
        msg.style.color = "#0E9F6E";
      }
    } else {
      this.promoDiscount = 0;
      this.appliedPromoCode = "";
      if (msg) {
        msg.textContent = "Invalid promo code. Try BELLA10 or BRIDAL2026.";
        msg.style.color = "#DC2626";
      }
    }

    this.updateSummary();
  }

  goToStep(step) {
    if (step < 1 || step > this.totalSteps + 1) return;

    if (step > 1 && this.selectedServices.length === 0) {
      alert("Please select at least one service before proceeding.");
      return;
    }

    this.currentStep = step;

    // Update Step panels
    for (let i = 1; i <= 5; i++) {
      const panel = document.getElementById(`booking-step-${i}`);
      if (panel) {
        panel.classList.toggle("active", i === step);
      }
    }

    // Update Stepper indicators
    document.querySelectorAll(".step-item").forEach((item, index) => {
      const sNum = index + 1;
      item.classList.toggle("active", sNum === step);
      item.classList.toggle("completed", sNum < step);
    });

    // Update footer buttons
    const prevBtn = document.getElementById("booking-prev-btn");
    const nextBtn = document.getElementById("booking-next-btn");
    const submitBtn = document.getElementById("booking-submit-btn");

    if (prevBtn) {
      prevBtn.style.display = (step > 1 && step <= this.totalSteps) ? "inline-flex" : "none";
    }

    if (nextBtn) {
      nextBtn.style.display = (step < this.totalSteps) ? "inline-flex" : "none";
    }

    if (submitBtn) {
      submitBtn.style.display = (step === this.totalSteps) ? "inline-flex" : "none";
    }

    // Scroll body to top
    const modalBody = document.querySelector(".booking-modal-body");
    if (modalBody) modalBody.scrollTop = 0;
  }

  nextStep() {
    this.goToStep(this.currentStep + 1);
  }

  prevStep() {
    this.goToStep(this.currentStep - 1);
  }

  openBooking(preSelectedServiceId = null) {
    if (!this.modal) return;

    if (preSelectedServiceId) {
      // Clear previous and pre-select this one
      this.selectedServices = [];
      document.querySelectorAll(".booking-service-choice").forEach(el => el.classList.remove("selected"));
      this.toggleServiceChoice(preSelectedServiceId);
    }

    this.goToStep(1);
    this.modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeBooking() {
    if (!this.modal) return;
    this.modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  submitBooking(form) {
    const name = form.clientName.value.trim();
    const phone = form.clientPhone.value.trim();
    const occasionDate = form.clientOccasionDate ? form.clientOccasionDate.value : "";
    const notes = form.clientNotes ? form.clientNotes.value.trim() : "";

    if (!name || !phone) {
      alert("Please provide your full name and contact number.");
      return;
    }

    const subtotal = this.selectedServices.reduce((sum, s) => sum + s.price, 0);
    const total = Math.max(0, subtotal - this.promoDiscount);
    const bookingRef = `BBL-${Math.floor(1000 + Math.random() * 9000)}`;

    const bookingRecord = {
      id: bookingRef,
      createdAt: new Date().toISOString(),
      clientName: name,
      clientPhone: phone,
      services: this.selectedServices.map(s => s.name),
      stylist: this.selectedStylist ? this.selectedStylist.name : "Assigned Artist",
      date: this.selectedDate,
      slot: this.selectedSlot,
      totalAmount: total,
      occasionDate: occasionDate,
      notes: notes,
      status: "Confirmed"
    };

    // Save to LocalStorage
    try {
      const saved = localStorage.getItem(this.storageKey);
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(bookingRecord);
      localStorage.setItem(this.storageKey, JSON.stringify(list));
    } catch (e) {
      console.error("Storage error:", e);
    }

    // Populate Step 5 confirmation screen
    const refEl = document.getElementById("confirm-booking-ref");
    const nameEl = document.getElementById("confirm-client-name");
    const servicesEl = document.getElementById("confirm-services-list");
    const dateSlotEl = document.getElementById("confirm-datetime");
    const stylistEl = document.getElementById("confirm-stylist-name");
    const totalEl = document.getElementById("confirm-total-amount");
    const waBtn = document.getElementById("confirm-whatsapp-btn");

    if (refEl) refEl.textContent = bookingRef;
    if (nameEl) nameEl.textContent = name;
    if (servicesEl) servicesEl.textContent = bookingRecord.services.join(", ");
    if (dateSlotEl) dateSlotEl.textContent = `${this.selectedDate} at ${this.selectedSlot}`;
    if (stylistEl) stylistEl.textContent = bookingRecord.stylist;
    if (totalEl) totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;

    // WhatsApp Direct Confirmation Link
    if (waBtn) {
      const message = `*✨ Appointment Booking Request - Bella Beauty Makeup Studio*
Booking ID: *${bookingRef}*
Client Name: *${name}*
Phone: *${phone}*
Services: *${bookingRecord.services.join(", ")}*
Stylist: *${bookingRecord.stylist}*
Date & Slot: *${this.selectedDate}* at *${this.selectedSlot}*
Total Amount: *₹${total.toLocaleString("en-IN")}*
Notes: ${notes || "None"}

Please confirm my appointment slot. Thank you!`;

      waBtn.href = `https://wa.me/919217002598?text=${encodeURIComponent(message)}`;
    }

    this.goToStep(5);
  }

  openMyBookings() {
    if (!this.myBookingsModal) return;
    this.renderMyBookingsList();
    this.myBookingsModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeMyBookings() {
    if (!this.myBookingsModal) return;
    this.myBookingsModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  renderMyBookingsList() {
    const container = document.getElementById("my-bookings-list");
    if (!container) return;

    let bookings = [];
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) bookings = JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }

    if (bookings.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">📅</div>
          <h4 style="font-size: 1.15rem; margin-bottom: 6px;">No Bookings Found</h4>
          <p style="font-size: 0.9rem;">You haven't booked any appointments yet. Explore our services and book your bridal or beauty session today!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = bookings.map(b => `
      <div class="glass-card" style="padding: 20px; margin-bottom: 16px; border: 1px solid var(--border-gold);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span class="badge-gold">${b.id}</span>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0E9F6E;">● ${b.status}</span>
        </div>
        <h4 style="font-size: 1.1rem; margin-bottom: 4px;">${b.services.join(", ")}</h4>
        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">
          📅 Date: <strong>${b.date}</strong> at <strong>${b.slot}</strong><br/>
          💄 Stylist: <strong>${b.stylist}</strong> · Total: <strong>₹${b.totalAmount.toLocaleString("en-IN")}</strong>
        </div>
        <div style="display: flex; gap: 10px;">
          <a href="https://wa.me/919217002598?text=${encodeURIComponent(`Hi Bella Beauty Studio, inquiring about my appointment ${b.id} for ${b.clientName}`)}" target="_blank" class="btn btn-sm btn-whatsapp">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; vertical-align:-2px; margin-right:4px;">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            WhatsApp Studio
          </a>
          <button type="button" class="btn btn-sm btn-outline" onclick="bookingEngine.cancelBooking('${b.id}')">
            Cancel
          </button>
        </div>
      </div>
    `).join("");
  }

  cancelBooking(bookingId) {
    if (!confirm(`Are you sure you want to cancel appointment ${bookingId}?`)) return;

    try {
      const saved = localStorage.getItem(this.storageKey);
      let list = saved ? JSON.parse(saved) : [];
      list = list.filter(item => item.id !== bookingId);
      localStorage.setItem(this.storageKey, JSON.stringify(list));
      this.renderMyBookingsList();
    } catch (e) {
      console.error(e);
    }
  }

  downloadCalendarEvent() {
    const name = document.getElementById("confirm-client-name")?.textContent || "Bella Beauty Client";
    const services = document.getElementById("confirm-services-list")?.textContent || "Beauty Treatment";
    const ref = document.getElementById("confirm-booking-ref")?.textContent || "BBL";
    
    // ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Bella Beauty Makeup Studio//Appointment//EN
BEGIN:VEVENT
SUMMARY:Bella Beauty Studio: ${services} (${ref})
DESCRIPTION:Appointment at Bella Beauty Makeup Studio, Sonu Market, Gola Rd, Patna. Client: ${name}.
LOCATION:Sonu Market, Gola Rd, Danapur Bazar, Patna, Bihar 801503
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Bella-Beauty-Appointment-${ref}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  bindEvents() {
    const bookingForm = document.getElementById("booking-details-form");
    if (bookingForm) {
      bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitBooking(e.target);
      });
    }

    const dateInput = document.getElementById("booking-date-input");
    if (dateInput) {
      dateInput.addEventListener("change", (e) => {
        this.selectedDate = e.target.value;
      });
    }
  }
}

// Global initialization helper
window.initBooking = function() {
  window.bookingEngine = new BookingEngine();
};
