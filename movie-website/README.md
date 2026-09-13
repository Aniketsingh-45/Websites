<div align="center">

# 🎬 Aniket Ka Movie — Cinema & Streaming Hub
### *Ultra-Cinematic Streaming Portal &bull; 5 Ambient Switchable Themes &bull; Multi-Tier Download Hub*

<br/>

[![Live on Vercel](https://img.shields.io/badge/Live%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aniketmovie.vercel.app/)
[![Status: Production](https://img.shields.io/badge/Status-Live%20Production-success?style=for-the-badge&logo=statuspage&logoColor=white)](https://aniketmovie.vercel.app/)
[![Theme Engine](https://img.shields.io/badge/Themes-5%20Palettes-EF4444?style=for-the-badge&logo=materialdesign&logoColor=white)](#-5-switchable-ambient-themes)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

🌐 **Live Production URL:** [**https://aniketmovie.vercel.app/**](https://aniketmovie.vercel.app/)

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Glassmorphism-Frosted%20Dark-38BDF8?style=flat-square" alt="Glassmorphism">
  <img src="https://img.shields.io/badge/Routing-Vercel%20Clean%20URLs-000000?style=flat-square&logo=vercel&logoColor=white" alt="Clean URLs">
</p>

[✨ Features](#-key-features) • [🎨 Ambient Themes](#-5-switchable-ambient-themes) • [📁 Directory Structure](#-file-structure) • [🚀 Run Locally](#-how-to-run-locally) • [☁️ Deploy to Vercel](#-how-to-deploy-on-vercel)

---

</div>

## 📖 Overview

**Aniket Ka Movie** is a modern, high-performance cinema portal designed with frosted glassmorphism, responsive grid architecture, and **5 dynamic ambient background themes**. Crafted using pure semantic HTML5, modern CSS3, and modular vanilla JavaScript, it delivers an immersive cinematic experience across desktop, tablet, and mobile displays.

---

## ✨ Key Features

* **🎨 5 Switchable Ambient Themes**:
  - Automatically persist in `localStorage` across all pages.
  - Dynamically updates primary accents, background glows, card borders, and button gradients.

* **📑 Multi-Page Architecture**:
  - `index.html` / `movie.html`: Main cinema hub with hero spotlight, trending rails, genre chips, and live search.
  - `movies.html`: Dedicated Theatrical Movies catalog (Bollywood, Hollywood, South Indian Dubbed, Dual Audio).
  - `series.html`: TV Shows & Web Series hub (Mirzapur, Panchayat, Stranger Things, etc.).
  - `genres.html`: Visual genre browser (Action, Sci-Fi, Crime, Comedy, Historical, Drama).
  - `movie-details.html`: Deep-dive details page with synopsis, cast, ratings, trailer modal, and download mirrors.

* **🔍 Real-Time Search & Category Filters**:
  - Instant debounce search across movie titles, genres, release years, and cast members.
  - Category filter pills with sort options (Trending First, Highest Rating ★, Release Year, Title A-Z).

* **🎬 Embedded HD Trailer Modal**:
  - Watch official movie trailers in responsive 16:9 modals without leaving the page.
  - Keyboard accessible (close on `Escape` or backdrop click).

* **⚡ Verified High-Speed Download Hub**:
  - Multi-tier resolution options: **480p Mobile**, **720p HD**, **1080p Full HD HEVC**, and **4K UHD HDR (2160p Atmos)**.
  - Multiple cloud storage mirrors (FastDL, Mega, Google Drive).

* **⭐ Personal Watchlist System**:
  - Save favorite titles with a single click on the bookmark button.
  - Real-time counter badge in the header with persistent `localStorage` synchronization.

---

## 🎨 5 Switchable Ambient Themes

| Theme Palette | Mood & Colorway | Dominant Accents |
| :--- | :--- | :--- |
| 🔴 **Crimson Cinema** *(Default)* | Deep obsidian `#07080b` | Ruby Red & Warm Amber |
| 🔵 **Midnight Sapphire** | Deep oceanic navy `#040914` | Electric Cyan & Ice Blue |
| 🟣 **Cyberpunk Neon** | Night violet `#0a0614` | High-Voltage Magenta & Neon Purple |
| 🟢 **Emerald Velvet** | Dark jade `#04100b` | Glowing Mint & Emerald |
| 🟡 **Gold Luxe / Noir** | Pure black `#080808` | Champagne 24K Gold & Warm Bronze |

---

## 📁 File Structure

```bash
movie-website/
├── css/
│   └── theme.css          # Design tokens, variables & 5 switchable theme palettes
├── js/
│   ├── movie-data.js      # Curated movie catalog with metadata, ratings, cast & links
│   └── app.js             # Theme switcher, search, filters, modals & pagination logic
├── logo.png               # Main branding header logo
├── favicon.png            # Browser tab icon
├── index.html             # Server discovery & canonical homepage
├── movie.html             # Legacy-compatible Home Cinema portal
├── movies.html            # All movies theatrical catalog
├── series.html            # TV & Web Series catalog
├── genres.html            # Interactive visual genre selector
├── movie-details.html     # Deep-dive movie details & download mirrors
├── 404.html               # Cinematic custom 404 error page
├── movie.css              # Master styling & responsive grid layouts
├── vercel.json            # Vercel routing, clean URLs & security headers
├── package.json           # Project metadata & npm dev scripts
├── robots.txt             # Search engine crawling rules
├── sitemap.xml            # Search engine indexing map
├── .gitignore             # Git ignore list
└── README.md              # Project documentation
```

---

## 🚀 How to Run Locally

```bash
# 1. Clone the Monorepo
git clone https://github.com/Aniketsingh-45/Websites.git
cd Websites/movie-website

# 2. Run with Node.js
npx serve .

# Or run with Python 3
python -m http.server 8080
```

---

## ⚡ How to Deploy on Vercel

1. In [Vercel Dashboard](https://vercel.com/new), select `Aniketsingh-45/Websites`.
2. Under **Root Directory**, click **Edit** and choose `movie-website`.
3. Framework Preset: **Other**.
4. Click **Deploy**!

---

## 👤 Author

**Aniket Singh**  
- **Portfolio**: [https://aniketsingh-portfolio-ruby.vercel.app/](https://aniketsingh-portfolio-ruby.vercel.app/)  
- **GitHub**: [@Aniketsingh-45](https://github.com/Aniketsingh-45)  
- **LinkedIn**: [linkedin.com/in/aniketsingh45](https://www.linkedin.com/in/aniketsingh45/)  
- **Email**: [aniketsingh4500@gmail.com](mailto:aniketsingh4500@gmail.com)  

<br/>

<div align="center">
  <sub>&copy; 2026 Aniket Ka Movie &bull; All Rights Reserved</sub>
</div>
