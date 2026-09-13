<div align="center">

<img src="images/cafe-skylite-rps-more-patna-restaurants-ba4zejy.avif" alt="Cafe Skylite Logo" width="130" style="border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);" />

# 🌟 Cafe Skylite — Rooftop Lounge & Dining
### *Where Every Meal Meets The Open Sky &bull; Patna's Premier Rooftop Landmark*

<br/>

[![Live on Vercel](https://img.shields.io/badge/Live%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://cafe-silk-psi.vercel.app/)
[![Status: Production](https://img.shields.io/badge/Status-Live%20%26%20Active-10b981?style=for-the-badge&logo=statuspage&logoColor=white)](https://cafe-silk-psi.vercel.app/)
[![GSAP 3](https://img.shields.io/badge/Animations-GSAP%203%20%26%20ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Justdial Rating](https://img.shields.io/badge/Patna-RPS%20More%2C%20Bailey%20Rd-EA580C?style=for-the-badge&logo=google-maps&logoColor=white)](#-location--operating-hours)

<br/>

🌐 **Live Production URL:** [**https://cafe-silk-psi.vercel.app/**](https://cafe-silk-psi.vercel.app/)

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP">
  <img src="https://img.shields.io/badge/Typed.js-FF6F00?style=flat-square" alt="Typed.js">
  <img src="https://img.shields.io/badge/Confetti-Canvas-9333EA?style=flat-square" alt="Canvas Confetti">
</p>

[✨ Experience & Highlights](#-experience--key-features) • [🍽️ Menu Showcase](#%EF%B8%8F-culinary-repertoire) • [🛠️ Tech Architecture](#%EF%B8%8F-built-with) • [🚀 Local Setup](#-getting-started-locally) • [☁️ Deploy to Vercel](#-deploy-to-vercel) • [📍 Location](#-location--operating-hours)

---

</div>

## 📖 Overview

**Cafe Skylite** is a visually captivating, ultra-responsive digital web experience engineered for Patna’s premier open-air rooftop restaurant and lounge situated at **KV Complex, RPS More, Bailey Road, Patna**.

Designed to mirror the breathtaking transition from sunset golden hours into starlit evening dinners, the portal blends high-performance **GSAP ScrollTrigger choreography**, interactive sound effects, custom cursor dynamics, dual-theme mood switching, and real-time table reservations.

---

## ✨ Experience & Key Features

* **🌓 Dual-Mood Ambience (Dark & Light Mode)**:
  - **Starlight Obsidian (Dark)**: Deep sky velvet with glowing neon amber highlights tailored for nighttime lounge vibes.
  - **Sunlit Rooftop (Light)**: Crisp ivory and warm cappuccino tones for afternoon brunches.
  - State dynamically persists across visits via `localStorage`.

* **🚀 Choreographed GSAP & ScrollTrigger Animations**:
  - Silky smooth parallax hero reveal, staggered culinary card entrances, and floating ambient elements.
  - Scroll progress tracking with GPU-accelerated CSS transforms.

* **🖱️ Custom Desktop Micro-Interactions**:
  - Interactive magnetic cursor that scales and glows across interactive menu items and CTA buttons.
  - Typed.js dynamic typewriter hero slogans cycling through culinary specialties.

* **🎶 Immersive Audio FX & Confetti Celebrations**:
  - Ambient relaxing rooftop acoustic track toggle with sound wave animation.
  - Multi-colored canvas confetti burst on successful table reservation bookings.

* **📅 Interactive Table Reservation Engine**:
  - Client-side validated reservation form supporting guest counts, dining preferences (Indoor Lounge / Open Sky Rooftop), and date/time selection.

---

## 🍽️ Culinary Repertoire

| Category | Specialty Highlights | Atmosphere |
| :--- | :--- | :--- |
| **🍛 Royal Indian & Mughlai** | Paneer Tikka Masala, Dum Biryani, Garlic Naan, Kadhai Gravies | Traditional rich spices, clay-oven roasted aromas |
| **🥢 Pan-Asian & Chinese** | Crispy Chilli Babycorn, Hakka Noodles, Manchurian, Spring Rolls | Wok-tossed, high-heat sizzling flavors |
| **🍕 Italian & Continental** | Wood-fired Pizzas, Creamy Alfredo Pastas, Cheese Garlic Bread | Fresh mozzarella, herbs, and golden crusts |
| **☕ Artisan Beverages & Mocktails** | Blue Lagoon, Hazelnut Cold Coffee, Mint Mojito, Skylite Special Shake | Chilled, refreshing crafted rooftop drinks |

---

## 📁 Directory Structure

```bash
cafe/
├── images/                      # High-resolution food & ambience assets
│   ├── cafe-skylite-rps-more...avif # Brand showcase logo
│   ├── ...                      # Culinary dishes & rooftop patio imagery
├── index.html                   # Master semantic HTML5 landing page
├── cafe.html                    # Alias entry point for backward compatibility
├── cafe.css                     # Design tokens, variables & responsive styling
├── cafe.js                      # GSAP timelines, Typed.js, audio & cart logic
├── vercel.json                  # Vercel caching, security headers & clean URLs
├── .gitignore                   # Version control ignore list
└── README.md                    # Visual documentation & deployment guide
```

---

## 🛠️ Built With

* **HTML5**: Semantic document outline, Open Graph tags, and accessibility hooks.
* **CSS3**: CSS Custom Properties (`--variables`), backdrop blur glassmorphism, fluid clamp typography, and responsive CSS Grid.
* **JavaScript (ES6+)**: Modular interaction controllers with zero heavyweight framework baggage.
* **[GSAP 3](https://gsap.com/) & ScrollTrigger**: Industry standard high-performance scroll motion.
* **[Typed.js](https://mattboldt.com/demos/typed-js/)**: Smooth typewriter effect.
* **Canvas Confetti**: Lightweight particle burst celebrations.

---

## 🚀 Getting Started Locally

### 1. Clone the Monorepo
```bash
git clone https://github.com/Aniketsingh-45/Websites.git
cd Websites/cafe
```

### 2. Launch the Application
No compilers or node packages required! You can open the project immediately:

* **Direct Browser**: Double-click `index.html` (or `cafe.html`) to open directly in Chrome, Edge, or Safari.
* **Node.js**:
  ```bash
  npx serve .
  ```
* **Python 3**:
  ```bash
  python -m http.server 8080
  # Navigate to http://localhost:8080
  ```

---

## ☁️ Deploy to Vercel

The project is pre-configured with [`vercel.json`](file:///d:/My%20Apps/Websites/cafe/vercel.json) for 1-click deployment on [Vercel](https://vercel.com/):

### Option A: From Websites Monorepo (Recommended)
1. In your [Vercel Dashboard](https://vercel.com/dashboard), click **Add New...** → **Project**.
2. Select your repository `Aniketsingh-45/Websites`.
3. Set **Root Directory** to `cafe`.
4. Framework Preset: **Other**.
5. Click **Deploy**!

### Option B: Via Vercel CLI
```bash
cd cafe
npx vercel
# Follow prompts, then deploy to production:
npx vercel --prod
```

---

## 📍 Location & Operating Hours

<div align="center">

| Property | Details |
| :--- | :--- |
| **📍 Address** | KV Complex, 4th Floor Rooftop, Near RPS More, Bailey Road, Patna, Bihar — 801503 |
| **🕒 Operating Hours** | Monday – Sunday: 11:00 AM – 11:00 PM |
| **📞 Inquiries** | Direct reservations via website or on-premise desk |
| **⭐ Experience** | Open-Air Rooftop, Ambient Starlight Dining, Private Family Cabanas |

</div>

---

## 👤 Author & Credits

Designed & Crafted with ❤️ by **Aniket Singh**  
- **Portfolio**: [https://aniketsingh-portfolio-ruby.vercel.app/](https://aniketsingh-portfolio-ruby.vercel.app/)  
- **GitHub**: [@Aniketsingh-45](https://github.com/Aniketsingh-45)  
- **LinkedIn**: [linkedin.com/in/aniketsingh45](https://www.linkedin.com/in/aniketsingh45/)  
- **Email**: [aniketsingh4500@gmail.com](mailto:aniketsingh4500@gmail.com)  

<br/>

<div align="center">
  <sub>&copy; 2026 Cafe Skylite &bull; Crafted for Patna's Discerning Diners &bull; All Rights Reserved</sub>
</div>
