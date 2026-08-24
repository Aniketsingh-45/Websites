# 🔥 Dadan Handi Meat 🏺
> **"Sher dilwale ghas phus nahi khate, sirf mutton khate hai."**  
> *Patna's Legendary Champaran Handi Mutton — Serving authentic culinary experiences since 2016.*

[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Licence](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#)

Welcome to the official repository of the **Dadan Handi Meat** landing website. This is a highly interactive, custom-styled single-page web experience showcasing Patna's famous Champaran-style slow-cooked clay pot mutton.

---

## 📖 Table of Contents
- [✨ Key Features](#-key-features)
- [🎨 Dynamic Themes](#-dynamic-themes)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [⚙️ Setup & Installation](#️-setup--installation)
- [🔥 Micro-Interactions Details](#-micro-interactions-details)
- [🤝 Contributing](#-contributing)

---

## ✨ Key Features

This landing page goes beyond static menus by introducing micro-interactions, responsive design, and smooth animations that represent the premium brand identity:

*   **🔥 Pre-loader Experience:** A burning flame pre-loader that sets the mood while the website resources are heating up.
*   **🎨 Dynamic Theme Engine:** Support for three distinct visual modes (`wood`, `midnight`, `spice`) that instantly shift the aesthetic from warm rustic tones to neon nightlife.
*   **✨ Interactive Micro-Animations:**
    *   **Magnetic Buttons:** Links that subtly pull towards the cursor for a premium, tactile feel.
    *   **Ripple Click Effects:** Elegant circular waves originating directly from the mouse click coordinates on buttons.
    *   **Confetti & Toast Feedback:** A vibrant shower of confetti along with a helpful toast notification appears whenever order buttons are triggered.
*   **📸 Lightbox Gallery:** A seamless popup lightbox window allowing users to inspect mutton cooking visuals closely.
*   **📱 Fully Responsive Layout:** Beautifully responsive from extra-small mobile screens up to large monitors.
*   **⏳ Automated Testimonial Carousel:** An interactive review carousel that pauses when users hover or touch cards.
*   **📈 Scroll Reveal & Counters:** Numeric stats (like reviews and business age) animate upwards dynamically as they enter the browser viewport.

---

## 🎨 Dynamic Themes

The application features a tri-theme system utilizing CSS variables driven by a data-attribute (`data-theme`) selector:

| Theme Name | Description | Key Vibe |
| :--- | :--- | :--- |
| 🪵 **Wood (Default)** | Clay pot textures, rustic brown, and charcoal gray. | Traditional cooking fire |
| 🌌 **Midnight** | Deep dark background with high-contrast neon accents. | Late-night cravings |
| 🌶️ **Spice** | High-energy colors, vibrant reds, and hot mustard yellow. | Rich flavors and spices |

You can cycle through themes directly from the header navbar by clicking the **🎨 Theme Switcher** button.

---

## 🛠️ Tech Stack

*   **Core:** Semantic HTML5, Vanilla CSS3 (Custom Variables, Flexbox, CSS Grid), Vanilla Javascript (ES6+)
*   **Build System:** [Vite](https://vitejs.dev/) (Rapid Bundler & Dev Server)
*   **Fonts:** 
    *   *Playfair Display* (Sophisticated headers and headings)
    *   *Inter* (Clean, highly legible content typography)
*   **Icons:** Inline optimized SVG icons (no heavy external font packages)

---

## 📁 Folder Structure

```bash
dadan-handi/
├── dist/                  # Production builds compiled by Vite
├── public/                # Static assets served as-is
│   ├── chicken_handi.png  # Ahuna Chicken asset
│   ├── hero_bg.png        # Wood-fire hero background image
│   └── mutton_handi.png   # Signature Mutton Handi asset
├── index.html             # Main entrypoint webpage (HTML Structure)
├── main.js                # Core JS logic (Themes, magnetic effects, overlays)
├── style.css              # Custom styling definitions & theme variables
├── package.json           # Node configuration and script commands
├── package-lock.json      # Dependency lockfile
└── vite.config.js         # Vite configuration settings (Runs on Port 3000)
```

---

## ⚙️ Setup & Installation

Follow these steps to run the project locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18.0.0 or higher recommended).

### 2. Clone the Repository
```bash
git clone https://github.com/Aniketsingh-45/Website.git
cd dadan-handi
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
Launch the local Vite server:
```bash
npm run dev
```
The server will boot up quickly. Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

### 5. Build for Production
To compile and optimize the assets for deployment:
```bash
npm run build
```
This generates a highly optimized `dist/` folder ready to be deployed to static hosting providers (such as Vercel, Netlify, or GitHub Pages).

---

## 🔥 Micro-Interactions Details

### Magnetic Buttons (`main.js` & `style.css`)
We map the user's cursor position inside the bounding rect of buttons with class `.magnetic-btn` and apply inline translations to simulate magnetic pull:
```javascript
const rect = btn.getBoundingClientRect();
const x = e.clientX - rect.left - rect.width / 2;
const y = e.clientY - rect.top - rect.height / 2;
btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
```

### Dynamic Confetti Canvas
A dedicated `<canvas>` particle emitter generates multi-color physics-based falling particles upon clicking target buttons:
*   Includes customizable gravity (`dy += 0.5`).
*   Cleans up particles automatically when they fall off-screen to prevent memory leaks.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Made with 🔥 in Patna. Authenticity in every clay pot.*
