# 💄 Bella Beauty Makeup Studio — Luxury Web Experience & Booking Portal

<div align="center">

[![Vercel Deployment](https://img.shields.io/badge/Deploy%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https://github.com/Aniketsingh-45/Websites&root-directory=Parlour)
[![Three.js](https://img.shields.io/badge/3D%20WebGL-Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![JavaScript](https://img.shields.io/badge/ES6+-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![Justdial Rating](https://img.shields.io/badge/Justdial-5.0%20%E2%98%85%20(154%2B)-FF6F00?style=for-the-badge&logo=google-maps&logoColor=white)](https://www.justdial.com)
[![License](https://img.shields.io/badge/License-MIT-E83D75?style=for-the-badge)](LICENSE)

<br />

**A high-converting, editorial luxury digital portal and real-time appointment booking engine crafted for Patna's premier bridal makeover studio.**

[🚀 Deploy with Vercel](#-deploy-to-vercel) • [✨ Key Features](#-key-features) • [🛠️ Vercel Optimizations](#%EF%B8%8F-vercel-production-optimizations) • [📂 Project Structure](#-project-structure) • [📍 Studio Contact](#-studio-information)

---

</div>

## 📖 Overview

**Bella Beauty Makeup Studio & Salon** is an elite beauty and bridal transformation destination located at **Sonu Market, Gola Road, Danapur Bazar / Ram Jaipal Nagar, Patna, Bihar (801503)**. 

This web platform bridges ultra-luxury visual storytelling with practical salon utility. Built from the ground up with pure modern HTML5, CSS3 variables, and vanilla ES6+ JavaScript, it features an interactive **Three.js 3D WebGL beauty laboratory**, a split-screen **Before & After makeover comparison slider**, seamless **dual-theme mood switching**, and a **5-step smart booking engine** with instant **WhatsApp confirmation sync**.

---

## 🚀 Deploy to Vercel

This repository is pre-configured and 100% production-ready for **Vercel** with instant zero-config edge hosting, custom security headers, and asset caching.

### Option 1: One-Click Deploy (Instant)

Click the button below to fork and deploy directly to your Vercel account:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Aniketsingh-45/Websites&root-directory=Parlour)

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (or run with `npx`):
   ```bash
   npm i -g vercel
   ```

2. **Navigate into the project directory**:
   ```bash
   cd "d:/My Apps/Websites/Parlour"
   ```

3. **Deploy to Preview**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

### Option 3: Connect via Vercel Web Dashboard

1. Push your repository to GitHub.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import your repository (`Websites`).
4. In the **Project Settings**:
   - **Framework Preset**: `Other`
   - **Root Directory**: `Parlour`
   - **Build Command**: *(Leave empty or `npm run build`)*
   - **Output Directory**: `.` *(Root)*
5. Click **Deploy**. Your site will go live globally across Vercel’s Anycast Edge Network with an automatic SSL certificate.

---

## ⚙️ Vercel Production Optimizations

This project includes a tailor-made [`vercel.json`](file:///d:/My%20Apps/Websites/Parlour/vercel.json) configured for maximum performance, security, and search engine visibility:

| Feature | Configuration Detail | Benefit |
| :--- | :--- | :--- |
| **Clean URLs** | `"cleanUrls": true` | Strips unnecessary `.html` extensions from URLs |
| **Trailing Slash** | `"trailingSlash": false` | Canonicalizes standard slash routes |
| **Immutable Caching** | `/assets/(.*)` &rarr; `max-age=31536000, immutable` | Instant load times for photos, logos, and textures |
| **Edge Stale-While-Revalidate** | `/(css\|js)/(.*)` &rarr; `max-age=86400, stale-while-revalidate` | Guarantees instant caching with non-blocking updates |
| **Security Headers** | `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` | Defends against MIME sniffing and clickjacking |
| **Content Security** | `Referrer-Policy: strict-origin-when-cross-origin` | Protects visitor data across outbound requests |
| **Branded 404 Fallback** | `404.html` | Custom luxury error page keeping visitors engaged |
| **Search Engine Discovery** | `robots.txt` + `sitemap.xml` | Instant Google, Bing, and Justdial crawler indexing |
| **PWA Readiness** | `site.webmanifest` + theme color | Add to Home Screen support on iOS & Android |

---

## ✨ Key Features & Interactive Architecture

### 1. 🌓 Dual-Mood Luxury Design System
- **Midnight Velvet & 24K Gold (`data-theme="midnight"`)**: Default opulent dark theme featuring deep velvet plum (`#090207`), rich burgundy glows, and warm gold foil gradients (`#FAD97B` &rarr; `#9E7412`).
- **Daytime Champagne & Rose Quartz (`data-theme="champagne"`)**: Crisp, bridal morning aesthetic with pearl blush backdrops (`#FCFBF8`), soft rose golds, and dark plum typography.
- **Zero-Flash Theme Bootstrapper**: Inlined `localStorage` logic inside `<head>` prevents any flash-of-unstyled-theme (FOUC).
- **Luxury Typography**: Curated pairing of *Playfair Display*, *Cinzel*, and *Plus Jakarta Sans*.

### 2. 💎 Interactive 3D WebGL Compact Mirror (Three.js)
- Fully interactive 3D cosmetic compact mirror rendered in real time.
- Physically Based Rendering (PBR) metallic rose-gold chassis with reflective mirror facet and crystal gemstone centerpiece.
- Dynamic floating golden sparkle particle system with depth physics.
- Dual interaction modes: **Gyro / Mouse-Follow Tilt** and **Touch / Click Drag-to-Rotate**.

### 3. 🪞 Interactive Before & After Makeover Slider
- Real client bridal makeover comparison between pre-makeover skin and the signature reception look.
- Interactive split-screen drag slider with custom gold handle and responsive touch gesture handling.

### 4. 📅 5-Step Smart Appointment Booking Engine
- **Step 1 — Service Selection**: Interactive service catalog with multi-select checkboxes, category filtering, live cost calculation, and duration estimate.
- **Step 2 — Stylist Choice**: Select your preferred specialist (Chief Bridal Makeup Specialist, Lead Hair Designer, Skin Aesthetician, or First Available).
- **Step 3 — Date & Time Slot**: Interactive date picker with intelligent slot availability (11:00 AM – 8:00 PM, 45-min slots).
- **Step 4 — Client Details & Promo Discount**: Promo code validation (`BELLA10` for 10% off, `BRIDAL2026` for ₹1,000 off bridal packages).
- **Step 5 — Instant Booking Confirmation**:
  - Auto-generated Booking Reference ID (e.g. `BBL-9412`).
  - **One-Tap WhatsApp Sync**: Generates an encoded message directly addressed to the salon's primary desk (`+91 92170 02598`).
  - **Calendar Export**: Downloads a standard `.ics` file for Google Calendar, Apple Calendar, and Outlook.
  - **"My Bookings" Drawer**: Client appointments stored persistently in `localStorage` for easy lookup and cancellation.

### 5. 🎬 YouTube Shorts Vertical Reels
- Built-in video reel gallery featuring 8 authentic bridal makeover transformations from the studio's official channel.
- Native 9:16 vertical video player modal with smooth overlay backdrop and instant playback.

### 6. 📸 Filterable Portfolio Gallery & Lightbox
- High-resolution client transformations and studio ambience images.
- Filter tabs: *All Looks*, *Signature Bridal*, *Hair Styling*, *Studio Ambience*, *Skin Care*, and *Nail Art*.
- Fullscreen lightbox viewer with keyboard navigation (`Esc`, `←`, `→`).

### 7. ⭐ 5.0★ Justdial Testimonials & Review Engine
- Showcases verified 5-star customer testimonials from Patna clients (Najiya Sultana, Amrita Kumari, Vishal, Pankaj Yadav, Chinki Singh).
- Interactive "Leave a Review" modal with star rating selector and instant `localStorage` publishing.

### 8. 🕒 Real-Time Studio Open / Closed Indicator
- Live status banner dynamically computes open status based on Patna IST time (11:00 AM – 9:00 PM every day).

---

## 📂 Project Structure

```
Parlour/
├── .gitignore                   # Git ignore for Vercel, node_modules & OS files
├── 404.html                     # Luxury branded 404 error page for Vercel
├── index.html                   # Master semantic HTML5 web platform
├── package.json                 # Project manifest & local dev scripts
├── README.md                    # Visual documentation & deployment guide
├── robots.txt                   # Search engine crawler instructions
├── sitemap.xml                  # Canonical XML sitemap for SEO
├── site.webmanifest             # PWA manifest & mobile app metadata
├── vercel.json                  # Vercel configuration (Headers, Caching, Clean URLs)
├── assets/                      # Media assets, brand logos, transformation imagery
│   ├── bella_after.jpg          # HD bridal makeover after result
│   ├── bella_before.jpg         # Client before makeover reference
│   ├── bella_logo.jpg           # Official studio brand emblem & icon
│   └── ig_post_1.jpg ... 6.jpg  # Instagram showcase feed snapshots
├── css/
│   ├── style.css                # Master luxury design tokens, typography & layout
│   ├── animations.css           # Shimmer effects, keyframe motions & transitions
│   └── booking.css              # Multi-step booking engine, drawer & modal styles
└── js/
    ├── app.js                   # Master coordinator, navigation & theme controller
    ├── booking.js               # Multi-step booking engine, WhatsApp & .ics export
    ├── data.js                  # Master dataset (services, reels, photos, reviews)
    ├── gallery.js               # Portfolio lightbox & YouTube Shorts reel player
    ├── reviews.js               # Verified testimonial engine & review submitter
    └── threeExperience.js       # Three.js 3D WebGL compact mirror with PBR shader
```

---

## 💻 Local Development

You can run and test this project locally using any modern static server:

### Option A: Using npm (Recommended)
```bash
# Run using npx serve
npm run dev
```

### Option B: Using Python 3
```bash
python -m http.server 8080
```
Visit `http://localhost:8080` in your web browser.

### Option C: VS Code Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 📍 Studio Information & Verification

| Property | Details |
| :--- | :--- |
| **Studio Name** | **Bella Beauty Makeup Studio & Salon** |
| **Address** | Sonu Market, Gola Road, Danapur Bazar / Ram Jaipal Nagar, Patna, Bihar — 801503 |
| **Primary Desk** | [+91 82352 15577](tel:+918235215577) |
| **Inquiry Line** | [+91 84605 56685](tel:+918460556685) |
| **WhatsApp Desk** | [+91 92170 02598](https://wa.me/919217002598) |
| **Studio Hours** | Monday – Sunday: 11:00 AM – 09:00 PM *(Open All 7 Days)* |
| **Justdial Rating** | **5.0 ★★★★★** *(154+ Verified Client Reviews)* |
| **Instagram** | [@bellabeautymakeupstudio](https://www.instagram.com/bellabeautymakeupstudio/) |
| **YouTube Channel** | [The Bella Beauty Makeup Studio & Salon](https://www.youtube.com/channel/UCvMZ7w2DMKlsxrEf_BgVXsw) |

---

<div align="center">

**Crafted with Passion for Patna's Most Radiant Brides.**  
© 2026 Bella Beauty Makeup Studio. All Rights Reserved.

</div>
