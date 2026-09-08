# 🛍️ Looto — Premium Indian Ethnic Wear & Handicrafts
> **Curated & Crafted by Aniket Singh**

[![Vercel](https://img.shields.io/badge/Deployed%20with-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Design](https://img.shields.io/badge/Design-Dark%20Glassmorphism-FF9933?style=for-the-badge)](https://fonts.google.com/specimen/Yatra+One)
[![Zero-Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Build-2ECC71?style=for-the-badge)](#-how-to-run-locally)

---

## 📖 Overview

**Looto** is an immersive, high-end e-commerce landing page and online shopping portal dedicated to Indian ethnic fashion, traditional handicrafts, festive essentials, and heritage artifacts.

Designed with a rich Indian imperial aesthetic—combining midnight obsidian backgrounds, glowing saffron accents, royal ruby gradients, and 24K gold highlights—Looto offers a seamless and responsive shopping experience completely built with vanilla web technologies, fully optimized for instant production deployment on **Vercel**.

---

## 🚀 Deploying to Vercel (Monorepo Setup)

Because this application lives inside the **Websites Monorepo**, follow these simple steps to deploy Looto to Vercel:

### Step 1: Import Repository
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** → **Project**.
3. Select your GitHub repository: `Aniketsingh-45/Websites`.

### Step 2: Configure Root Directory
> ⚠️ **CRITICAL STEP**: By default, Vercel looks at the root of the repository. You must set the root directory to `shopping`.
1. In the **Configure Project** screen, locate **Root Directory**.
2. Click **Edit** next to the root directory path.
3. Select or type `shopping` and click **Continue**.

### Step 3: Build & Output Settings
* **Framework Preset**: `Other` (or auto-detected)
* **Build Command**: None / Leave empty (Zero-build static site)
* **Output Directory**: Leave empty / default (serves from root of `shopping`)
* **Install Command**: Leave empty / default

### Step 4: Deploy
Click **Deploy**! In less than 15 seconds, your Looto shopping app will be live globally on Vercel's edge network with:
- 🔒 **Security Headers**: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`.
- ⚡ **Edge Caching**: Immutable asset caching for styles, scripts, and media.
- 🔗 **Clean URLs**: Elegant extensionless routes via `vercel.json`.
- 👑 **Branded 404 Handling**: Custom royal dark-themed 404 fallback page.

---

## ✨ Features & Collections

### 🌟 1. Navigation & Custom Branding
* **Custom Favicon**: Custom vector SVG Diya icon (`favicon.svg`) + high-res PNG brand icon.
* **Sticky Glassmorphism Navbar**: Dynamic background blur with scroll-detection opacity shift.
* **Instant Live Search**: Search across products with automatic filtering and `Enter` key execution.
* **Interactive Cart Trigger**: Real-time counter badge with dynamic quantity tallying.

### 🥻 2. Curated Heritage Collections & Sections
1. **The Grand Utsav Bazaar (Hero Section)**: High-impact festive landing banner with floating dynamic product cards and live stats.
2. **Sarees & Lehengas**: Handwoven Banarasi silk, temple Kanjeevaram weaves, and designer georgette drapes.
3. **Women's Ethnic Collection**: Anarkali suits, Bandhani festive kurtas, and royal bridal lehengas.
4. **Men's Ethnic Wear**: Royal designer sherwanis, silk kurta-pajamas, tailored Nehru jackets, and Indo-Western fusion sets.
5. **Handicrafts & Folk Art**: Terracotta clay pottery, Madhubani folk paintings, brass antique idols, and Jaipur hand-block prints.
6. **Puja & Festival Essentials**: Handcrafted oil diyas, organic herbal incense, brass aarti thalis, and festive torans.
7. **Ayurvedic Beauty & Wellness**: Pure Kumkumadi Tailam, Vedic facial serums, and Kannauj steam-distilled rose mist.
8. **Traditional Indian Jewellery**: Royal Kundan chokers, temple gold jhumkas, bridal maang tikkas, and silk thread bangles.
9. **Authentic Ethnic Footwear**: Hand-embroidered Rajasthani mojaris, Kolhapuri leather chappals, and Punjabi thread juttis.
10. **Indian Heritage Home Decor**: Palace mandala wall art, brass deity statues, and Kashmiri handwoven rugs.
11. **Looto Darbar (VIP Lounge)**: Gold-themed membership privilege showcase.

### 🛒 3. Interactive Shopping Cart & State Management
* **Universal Direct Add-to-Cart**: Add items directly from catalog grids, jewellery sets, footwear rows, and puja essentials.
* **Slide-out Cart Sidebar**: Full backdrop overlay with smooth CSS transform slide animation.
* **Quantity Modifiers**: Increase (`+`), decrease (`−`), or remove items dynamically.
* **Live Price Calculation**: Real-time subtotal and total calculations formatted in Indian Rupee format (`₹`).
* **Persistent Cart**: Automatically saves and restores cart contents via `localStorage`.
* **Integrated Checkout Action**: One-tap checkout trigger that finalizes orders and resets cart state.

### 🎯 4. Interactive UX Polish & Micro-Animations
* **Custom Dual-Ring Cursor**: Magnetic glowing saffron dot with an expanding ruby hover ring (desktop only; automatically disabled on touch devices for fluid mobile browsing).
* **3D Physics Tilt**: Interactive 3D perspective tilt effect on product and showcase cards (`.tilt-card`).
* **Toast Notification System**: Instant feedback popups on actions (Add to Cart, Newsletter Subscription, etc.).
* **Scroll-Reveal Animations**: IntersectionObserver-powered fade and slide triggers.

---

## 🎨 Aesthetics & Design System

| Token | Hex Value | Application |
|---|---|---|
| **Base Obsidian** | `#080C18` | Main dark background with subtle mandala grid |
| **Saffron / Kesar** | `#FF9933` | Primary brand accent, glowing highlights, badges |
| **Royal Ruby** | `#E0115F` | Gradients, primary action buttons, hover states |
| **24K Gold** | `#FFD700` | VIP Looto Darbar, luxury borders, pricing badges |
| **Vedic Emerald** | `#2ECC71` | Discount tags, trust badges, success indicators |

### 🔤 Typography
* **Display & Headings**: `Yatra One` (Google Fonts) — Authentic royal Indian display typeface.
* **Body & UI**: `Poppins` (Google Fonts) — Clean, legible modern sans-serif.
* **Icons**: Font Awesome `6.4.0` CDN vector glyphs.

---

## 📁 File Structure

```
shopping/
├── .gitignore           # Git ignore rules for node_modules, .vercel & logs
├── 404.html             # Royal dark-themed 404 error page
├── cont.png             # Promotional banner asset
├── favicon.svg          # Custom vector SVG favicon (Diya & Gold emblem)
├── index.html           # Main markup structure with all 11 heritage corridors & SEO tags
├── logo.png             # Looto brand logo asset
├── package.json         # Project metadata and Vercel detection scripts
├── README.md            # Comprehensive project documentation & deployment guide
├── robots.txt           # Production search crawler rules & sitemap reference
├── shop.css             # Dark theme styling, glassmorphism, mobile touch rules & grid systems
├── shop.js              # State management, cart logic, live search & 3D tilt effects
├── sitemap.xml          # Search engine sitemap with section anchors
└── vercel.json          # Vercel deployment config, security headers & caching
```

---

## 💻 How to Run Locally

1. **Clone or Download** the repository:
   ```bash
   git clone https://github.com/Aniketsingh-45/Websites.git
   ```
2. Navigate to the `shopping` folder:
   ```bash
   cd shopping
   ```
3. Run locally using your preferred method:
   - **Double-click** `index.html` to open directly in any browser
   - **VS Code**: Use the *Live Server* extension
   - **NPM**: `npx serve .`
   - **Python**: `python -m http.server 3000`

> ⚡ **Zero build dependencies required! Instant local preview.**

---

## 👤 Author

* **Aniket Singh** — [GitHub Profile](https://github.com/Aniketsingh-45) &bull; [LinkedIn](https://www.linkedin.com/in/aniketsingh45/) &bull; [Email](mailto:aniketsingh4500@gmail.com)

---

<div align="center">
  <sub>Handcrafted with ❤️ for Indian Heritage & Culture &bull; Deployed on Vercel</sub>
</div>
