# 🍲 Dadan Handi Mutton Hotel (दादन हांडी मीट)
> **“शेर दिलवाले घास-फूस नहीं खाते, सिर्फ मटन खाते हैं”**  
> *Patna’s Landmark Champaran Ahuna Handi Mutton — Slow-cooked in sealed earthen clay pots over charcoal embers since 2016.*  
>  
> 🌐 **Live Website**: [**dadan-handi.vercel.app**](https://dadan-handi.vercel.app/)

[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Motion](https://img.shields.io/badge/Motion-13.1.1-EA580C?style=for-the-badge)](#)
[![Vercel](https://img.shields.io/badge/Live%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dadan-handi.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#)

---

## 📖 Overview

Welcome to the modernized web application for **Dadan Handi Mutton Hotel**, Patna’s most beloved destination for authentic Champaran Ahuna Handi Mutton. Built following the **UI/UX Pro Max** design intelligence system, this website blends historic Bihari culinary heritage with cutting-edge micro-interactions, canvas particle physics, and seamless conversion flows.

---

## ✨ Key Features & Experience

### 1. 🏺 Interactive "Break the Dum Seal (सील खोलें)" 3D Showcase
- Experience the authentic Champaran dining ritual right in your browser.
- Tap the sealed handi to crack open the fresh wheat dough seal (*aata seal*).
- Features realistic rising steam clouds, synthesis puff audio via the Web Audio API, and a smooth crossfade to reveal the simmering tender meat infused with whole roasted garlic bulbs.

### 2. 🌌 Ambient Charcoal Ember Canvas
- High-performance, GPU-accelerated HTML5 `<canvas>` simulation of glowing embers drifting upward from the virtual wood-fire.
- Battery-friendly and completely non-blocking (`pointer-events: none`).

### 3. 📋 Dynamic Menu & Custom Portion Selector
- Filter instantly by **All**, **Ahuna Mutton**, **Champaran Chicken**, **Combos & Thalis**, **Clay Pot Veg**, and **Bihari Sides**.
- Interactive portion dropdowns (e.g., 200g + 6 Roti, Half Handi 500g, Full Handi 1 Kg) with live price updates.
- Spice level gauges on each card (Champaran Teekha, Mild Whole Spice, Pepper Sizzle).

### 4. 🛒 Slide-Out Handi Order Tray & Instant WhatsApp Checkout
- Sleek slide-out cart drawer supporting **Dine-in**, **Takeaway Parcel**, and **Home Delivery**.
- Quantity controls (`+` / `-`) with live subtotal calculation.
- **One-Click WhatsApp Order Generator:** Pre-formats the exact order items, selected portion sizes, estimated total, and delivery address template, sending directly to the restaurant line at `+91 8986496574`.

### 5. 📍 4-Branch Patna Outlet Navigator
Tabbed locator with live details, operating hours (11:00 AM – 11:00 PM), verified Google rating, direct call links, and responsive Google Maps embeds:
1. **Ram Jaipal Nagar (Bailey Road / Danapur Nizamat)** — Popular outpost near Gola Road.
2. **Saguna More - Khagaul Road (Flagship)** — Flagship destination near Danapur Station & Cantt.
3. **Rukanpura Branch (Bailey Road)** — Central Patna hub near Ashiana-Digha More.
4. **BRC Danapur Cantt** — Outpost near the Bihar Regimental Centre.

### 6. 📜 The 4 Secrets of Champaran Dum Pukht
An illustrated timeline detailing the traditional 4-stage cooking process:
- **01. Raw Alluvial Clay Pot (मिट्टी की हांडी):** Cured 12 hours with mustard oil.
- **02. Whole Garlic Pods & Mustard Oil:** 100% waterless marinade using kachi ghani mustard oil.
- **03. Wheat Dough Hermetic Seal (दम सील):** High-pressure internal steam builds within the clay pot.
- **04. Charcoal Wood-Fire Simmer:** Slow-cooked for 2.5 hours on glowing embers.

### 7. 📸 Gastronomic Visual Mosaic & Lightbox
- High-resolution food photography showcasing authentic earthen handis and traditional brass thalis.
- Smooth pop-up lightbox modal with keyboard navigation (`Escape` to close).

### 8. ⭐ Verified Social Proof & Review Slider
- Real reviews from diners visiting from Bengaluru, Delhi, Mumbai, and Patna.
- Dynamic auto-advancing carousel with pause-on-hover and navigation dots.

---

## 🎨 Design System & UI/UX Pro Max Standards

Built in compliance with the **UI/UX Pro Max** framework:

| Token | Value | Meaning |
| :--- | :--- | :--- |
| `--clr-bg-obsidian` | `#0A0806` | Deep volcanic charcoal background |
| `--clr-bg-surface` | `#18130E` | Rich warm earthenware surface |
| `--clr-primary` | `#DC2626` | Appetizing crimson red |
| `--clr-ember` | `#EA580C` | Glowing fire ember |
| `--clr-gold` | `#F59E0B` | Turmeric warm gold |
| `--clr-clay` | `#C2410C` | Terracotta earthen pot |

- **Typography Pairing:**
  - Headings: `Playfair Display SC` (Prestige & Culinary Tradition)
  - Motto: `Rozha One` (Authentic Indian Heritage Calligraphy)
  - Body: `Karla` (Ultra-legible, modern humanist sans-serif)
- **Zero Emojis as Icons:** All UI icons are crisp, accessible inline SVGs.
- **Accessibility:** Text contrast exceeds **7:1** (WCAG AAA compliant), with visible `:focus-visible` rings and `prefers-reduced-motion` support.

---

## 📁 Repository Structure

```bash
dadan-handi/
├── design-system/
│   └── dadan-handi/
│       └── MASTER.md            # Persisted UI/UX Pro Max design specifications
├── dist/                        # Optimized production bundle (Vite build)
├── public/                      # Fast local static assets
│   ├── champaran_handi_dum.jpg  # Signature clay pot simmering over embers
│   ├── champaran_feast_thali.jpg# Royal Bihari brass thali feast
│   ├── chicken_handi.png        # Ahuna Chicken visual
│   ├── mutton_handi.png         # Mutton Handi visual
│   └── hero_bg.png              # Wood-fire kitchen ambience
├── index.html                   # Semantic HTML5 with Schema.org Restaurant metadata
├── style.css                    # UI/UX Pro Max CSS design system
├── main.js                      # Core JS interactive engine (Motion, Audio, Cart)
├── vercel.json                  # Vercel deployment configuration & routing
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite bundler config
└── README.md                    # Project documentation
```

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `pnpm`

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Dev Server
```bash
npm run dev
```
Open your browser at **[http://localhost:3000](http://localhost:3000)** (or the port Vite outputs).

### 4. Build for Production
```bash
npm run build
```
Generates a production-ready, minified bundle in the `dist/` directory.

---

## 🚀 Vercel Deployment

This project is pre-configured with a dedicated [vercel.json](file:///d:/My%20Apps/Websites/dadan-handi/vercel.json) for 1-click deployment on [Vercel](https://vercel.com/):

### Method 1: Deploy via Vercel Dashboard (Recommended)
1. Push your changes to GitHub.
2. Go to your [Vercel Dashboard](https://vercel.com/new).
3. Select your repository `Websites`.
4. If deploying from a monorepo workspace, set **Root Directory** to `dadan-handi`.
5. Framework Preset will auto-detect as **Vite**.
6. Click **Deploy**!

### Method 2: Deploy via Vercel CLI
```bash
cd dadan-handi
npx vercel
```
Follow the interactive CLI prompts to deploy directly.

---

## 📞 Restaurant Contact & Information

- **Brand:** Dadan Handi Mutton Hotel (दादन हांडी मीट)
- **Direct Phone / WhatsApp:** [+91 8986496574](tel:+918986496574)
- **Hours:** 11:00 AM – 11:00 PM (Monday to Sunday)
- **Prime Locations:** Ram Jaipal Nagar, Saguna-Khagaul Road, Rukanpura, and BRC Cantt, Patna, Bihar.

---

*Made with 🔥 in Patna. Preserving Champaran Culinary Heritage.*
