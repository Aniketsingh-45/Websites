# 💄 Bella Beauty Makeup Studio — Luxury Web Experience & Booking Portal

A luxury, high-converting, fully responsive web platform for **Bella Beauty Makeup Studio & Salon**, located at **Sonu Market, Gola Road, Danapur Bazar / Ram Jaipal Nagar, Patna, Bihar (801503)**.

Designed with an editorial luxury aesthetic, dual-mood themes, real-time 3D WebGL interactions, authentic customer reviews, and a complete working multi-step appointment booking engine with one-tap WhatsApp confirmation.

---

## 🌟 Key Features

### 1. Dual-Mood Luxury Design System
- **Daytime Champagne & Rose Gold (`data-theme="champagne"`)**: Warm pearl blush (`#FAF4F6`), soft rose gold (`#D44D7D`), rich wine text (`#260D1A`), and radiant champagne gold accents (`#C59B27`).
- **Midnight Velvet & Gold (`data-theme="midnight"`)**: Deep velvet plum/black (`#0B0409`), high-contrast gold gradients (`#E5C365`), and shimmering rose quartz highlights.
- **Instant Mood Toggle**: Persisted in `localStorage` across user visits.
- **Editorial Typography**: Pairing Google Fonts *Playfair Display*, *Cinzel*, and *Plus Jakarta Sans*.

### 2. Interactive 3D Beauty Showcase (Three.js / WebGL)
- A custom 3D sculpted luxury cosmetic compact mirror rendered in real time.
- PBR metallic rose-gold casing, reflective mirror inset, and central crystal gemstone.
- Dynamic floating golden sparkle particle system.
- Smooth mouse-follow tilt physics and manual drag-to-rotate interaction.

### 3. Interactive Before & After Makeover Slider
- Split-screen comparison slider with a draggable gold handle.
- Compare pre-makeover natural skin with the finished signature bridal look.
- Fully touch-enabled for mobile devices.

### 4. Bespoke Service Catalog & Live Price Guide
- Filterable categories: **Bridal & Occasion**, **Hair Care & Styling**, **Skin & Facials**, **Nails & Lash Art**, and **Pre-Bridal Packages**.
- Transparent starting prices, treatment durations, and detailed inclusion checklists (MAC, Huda Beauty, Temptu Airbrush, Kryolan, etc.).
- Direct "Book Service" button pre-selecting that item in the booking engine.

### 5. Multi-Step Appointment Booking Engine
- **Step 1 — Services**: Multi-service selector with live bill tally and duration estimation.
- **Step 2 — Stylist**: Choose between Chief Bridal Specialist, Lead Hair Stylist, Skin Aesthetician, or First Available Artist.
- **Step 3 — Date & Slot**: Date selector with 45-minute slots between 11:00 AM and 8:00 PM.
- **Step 4 — Client Info & Bill**: Client contact details, special requests, and promo codes (`BELLA10` for 10% off, `BRIDAL2026` for ₹1,000 off).
- **Step 5 — Instant Confirmation**:
  - Auto-generated Booking Reference ID (e.g. `BBL-8942`).
  - **One-Tap WhatsApp Sync**: Generates an encoded booking message to the studio number (`+91 9217002598`).
  - **Add to Calendar**: Exports `.ics` calendar appointment.
  - **"My Bookings" Drawer**: Stored in `localStorage` so clients can view, track, or cancel their bookings anytime.

### 6. YouTube Shorts Video Transformation Reels
- Grid carousel of 8 real YouTube Shorts from the studio's official channel (`@UCvMZ7w2DMKlsxrEf_BgVXsw`).
- In-site 9:16 vertical video player modal allowing visitors to watch real makeover videos directly.

### 7. Curated Photo Gallery & Lightbox
- Real high-resolution portfolio images from Justdial and Magicpin.
- Category filters (Bridal Looks, Hair Styling, Studio Ambience, Skin & Spa, Nail Art).
- Fullscreen lightbox viewer with zoom and captions.

### 8. Verified 5.0 Justdial Customer Reviews
- Highlights authentic 5.0-star reviews (Najiya Sultana, Amrita Kumari, Vishal, Pankaj Yadav, Chinki Singh).
- Interactive "Leave a Review" modal with star rating selector and instant `localStorage` publishing.

### 9. Location, Hours & Direct Contact Hub
- Direct click-to-call (`+91 8235215577` & `+91 8460556685`).
- One-tap WhatsApp chat (`+91 9217002598`).
- Google Maps responsive embed at Sonu Market, Gola Road, Patna.
- Real-time "Open Now / Closed" indicator based on actual local time.

---

## 📂 Project Structure

```
Parlour/
├── index.html                   # Master semantic HTML5 web application
├── README.md                    # Project documentation & guide
├── css/
│   ├── style.css                # Design system tokens, themes, typography, layout
│   ├── animations.css           # Micro-animations, keyframes, shimmers, hover states
│   └── booking.css              # Multi-step booking engine styles & drawer modals
└── js/
    ├── data.js                  # Master dataset (services, real photos, reels, reviews)
    ├── threeExperience.js       # Three.js 3D WebGL interactive cosmetic model
    ├── gallery.js               # Photo gallery lightbox & YouTube Shorts reel player
    ├── reviews.js               # Verified testimonial display & live review submitter
    ├── booking.js               # Step-by-step booking engine, slots & WhatsApp sync
    └── app.js                   # Master coordination script, theme toggle & navigation
```

---

## 🚀 How to Run Locally

You can run this project using any static web server:

### Using Python:
```bash
cd "d:\My Apps\Websites\Parlour"
python -m http.server 8085
```
Then open your browser and navigate to:
```
http://localhost:8085
```

### Using Node / npx:
```bash
npx serve .
```

---

## 📍 Studio Information

- **Studio Name**: Bella Beauty Makeup Studio (The Bella Beauty Makeup Studio & Salon)
- **Address**: Sonu Market, Gola Road, Near By Balajii Medical, Vastu Ganga Colony, Danapur Bazar / Ram Jaipal Nagar, Patna, Bihar - 801503
- **Primary Phone**: +91 82352 15577
- **Inquiry Phone**: +91 84605 56685
- **WhatsApp**: +91 92170 02598
- **Hours**: Monday to Sunday: 11:00 AM – 09:00 PM (Open All 7 Days)
- **Rating**: 5.0 ★ (154+ Customer Reviews on Justdial)
- **Instagram**: [@bellabeautymakeupstudio](https://www.instagram.com/bellabeautymakeupstudio/)
- **YouTube**: [The Bella beauty Makeup studio and salon](https://www.youtube.com/channel/UCvMZ7w2DMKlsxrEf_BgVXsw)

---

© 2026 Bella Beauty Makeup Studio. Crafted for Patna's Discerning Brides.
