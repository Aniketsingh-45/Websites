<div align="center">

# 🛍️ Looto — Premium Indian Ethnic Wear & Handicrafts
### *Curated Heritage Fashion, Folk Handicrafts, Puja Essentials & Imperial Indian Splendor*

<br/>

[![Live on Vercel](https://img.shields.io/badge/Live%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://shopping-neon-iota.vercel.app/)
[![Status: Active](https://img.shields.io/badge/Status-Live%20%26%20Active-10b981?style=for-the-badge&logo=statuspage&logoColor=white)](https://shopping-neon-iota.vercel.app/)
[![Design: Imperial Dark](https://img.shields.io/badge/Design-Imperial%20Dark%20Glassmorphism-FF9933?style=for-the-badge)](#-aesthetics--design-system)
[![Zero-Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Build-2ECC71?style=for-the-badge)](#-how-to-run-locally)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

🌐 **Live Production URL**: [**https://shopping-neon-iota.vercel.app/**](https://shopping-neon-iota.vercel.app/)

<p align="center">
  <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3"></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"></a>
  <img src="https://img.shields.io/badge/Collections-11%20Corridors-FF9933?style=flat-square" alt="11 Corridors">
  <img src="https://img.shields.io/badge/Cart-LocalStorage%20State-E0115F?style=flat-square" alt="Cart State">
</p>

[📖 Overview](#-overview) • [🥻 Heritage Collections](#-features--curated-collections) • [🛒 Cart Engine](#-interactive-shopping-cart--state-management) • [🎨 Design System](#-aesthetics--design-system) • [🚀 Run Locally](#-how-to-run-locally) • [☁️ Deploy to Vercel](#-deploying-to-vercel)

---

</div>

## 📖 Overview

**Looto** is an immersive, high-end e-commerce experience and digital marketplace dedicated to authentic Indian ethnic fashion, traditional handicrafts, festive essentials, and heritage treasures.

Designed with an opulent Indian imperial aesthetic—combining midnight obsidian backgrounds, glowing saffron accents, royal ruby gradients, and 24K gold highlights—Looto offers a seamless, high-speed shopping experience built with pure vanilla web technologies and zero external dependencies.

---

## ✨ Features & Curated Collections

### 🌟 1. Navigation & Custom Branding
* **Custom Vector Diya Favicon**: Vector SVG diya emblem (`favicon.svg`) + high-resolution PNG brand mark.
* **Sticky Glassmorphism Navbar**: Dynamic background blur with scroll-detection opacity shift.
* **Instant Live Search**: Search across products with automatic query filtering and `Enter` key focus.
* **Interactive Cart Trigger**: Real-time counter badge with dynamic quantity tallying.

### 🥻 2. 11 Curated Heritage Corridors
1. **The Grand Utsav Bazaar (Hero Banner)**: High-impact festive landing banner with floating dynamic product cards and live customer metrics.
2. **Sarees & Lehengas**: Handwoven Banarasi silk, temple Kanjeevaram weaves, and designer bridal lehengas.
3. **Women's Ethnic Collection**: Anarkali suits, Bandhani festive kurtas, and handcrafted Chikankari drapes.
4. **Men's Ethnic Wear**: Royal designer sherwanis, silk kurta-pajamas, tailored Nehru jackets, and Indo-Western sets.
5. **Handicrafts & Folk Art**: Terracotta pottery, Madhubani folk paintings, brass antique idols, and Jaipur hand-block prints.
6. **Puja & Festival Essentials**: Handcrafted brass diyas, organic herbal incense, pure sambrani dhoop, and festive torans.
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
* **Integrated Checkout Action**: One-tap checkout trigger that finalizes orders and resets cart state with toast feedback.

### 🎯 4. Interactive UX Polish & Micro-Animations
* **Custom Dual-Ring Cursor**: Magnetic glowing saffron dot with an expanding ruby hover ring (desktop only; automatically disabled on touch devices).
* **3D Physics Tilt**: Interactive 3D perspective tilt effect on product and showcase cards (`.tilt-card`).
* **Toast Notification System**: Instant feedback popups on actions (Add to Cart, Newsletter Subscription, etc.).
* **Scroll-Reveal Animations**: IntersectionObserver-powered fade and slide triggers.

---

## 🎨 Aesthetics & Design System

| Token | Hex Value | Application |
| :--- | :--- | :--- |
| **Base Obsidian** | `#080C18` | Main dark background with subtle mandala grid |
| **Saffron / Kesar** | `#FF9933` | Primary brand accent, glowing highlights, badges |
| **Royal Ruby** | `#E0115F` | Gradients, primary action buttons, hover states |
| **24K Gold** | `#FFD700` | VIP Looto Darbar, luxury borders, pricing badges |
| **Vedic Emerald** | `#2ECC71` | Discount tags, trust badges, success indicators |

* **Display Typography**: `Yatra One` (Google Fonts) — Authentic royal Indian display typeface.
* **Body Typography**: `Poppins` (Google Fonts) — Clean, legible modern sans-serif.
* **Icons**: Font Awesome `6.4.0` CDN vector glyphs.

---

## 📁 File Structure

```bash
shopping/
├── .gitignore           # Git ignore rules
├── 404.html             # Royal dark-themed 404 error page
├── cont.png             # Promotional banner asset
├── favicon.svg          # Custom vector SVG favicon (Diya & Gold emblem)
├── index.html           # Main markup structure with all 11 heritage corridors
├── logo.png             # Looto brand logo asset
├── package.json         # Project metadata and Vercel detection scripts
├── README.md            # Comprehensive project documentation
├── robots.txt           # Search crawler rules & sitemap reference
├── shop.css             # Dark theme styling, glassmorphism & responsive grid
├── shop.js              # State management, cart logic, search & 3D tilt effects
├── sitemap.xml          # Search engine sitemap with section anchors
└── vercel.json          # Vercel deployment config, security headers & caching
```

---

## 💻 How to Run Locally

```bash
# 1. Clone monorepo
git clone https://github.com/Aniketsingh-45/Websites.git

# 2. Navigate to shopping folder
cd Websites/shopping

# 3. Run with any local server (or simply double-click index.html)
npx serve .
# or
python -m http.server 8080
```

> ⚡ **Zero build dependencies required! Instant local preview.**

---

## 🚀 Deploying to Vercel

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** → **Project** and select `Aniketsingh-45/Websites`.
3. Set **Root Directory** to `shopping`.
4. Framework Preset: **Other**.
5. Click **Deploy**!

---

## 👤 Author

**Aniket Singh**  
- **Portfolio**: [https://aniketsingh-portfolio-ruby.vercel.app/](https://aniketsingh-portfolio-ruby.vercel.app/)  
- **GitHub**: [@Aniketsingh-45](https://github.com/Aniketsingh-45)  
- **LinkedIn**: [linkedin.com/in/aniketsingh45](https://www.linkedin.com/in/aniketsingh45/)  
- **Email**: [aniketsingh4500@gmail.com](mailto:aniketsingh4500@gmail.com)  

<br/>

<div align="center">
  <sub>Handcrafted with ❤️ for Indian Heritage & Culture &bull; Deployed on Vercel</sub>
</div>
