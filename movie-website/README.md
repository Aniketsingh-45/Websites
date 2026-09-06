# 🎬 Aniket Ka Movie - Ultra Cinematic Streaming & Download Portal

A modern, multi-page, high-performance cinema portal designed with frosted glassmorphism, responsive grid architecture, and **5 dynamic background themes**. Crafted using pure semantic HTML5, modern CSS3, and modular vanilla JavaScript.

---

## ✨ Features

* **🎨 5 Switchable Ambient Themes**:
  - 🔴 **Crimson Cinema** (Default): Deep obsidian `#07080b` with ruby red and warm amber glows.
  - 🔵 **Midnight Sapphire**: Deep navy `#040914` with electric cyan and ice blue.
  - 🟣 **Cyberpunk Neon**: Night violet `#0a0614` with magenta and purple accents.
  - 🟢 **Emerald Velvet**: Dark jade `#04100b` with glowing emerald and mint accents.
  - 🟡 **Gold Luxe / Noir**: Pure black `#080808` with champagne gold and warm accents.
  *Themes automatically persist in `localStorage` across all pages.*

* **📑 Full Multi-Page Architecture**:
  - `movie.html` / `index.html`: Main cinema hub with hero spotlight banner, trending section, filter chips, and live search.
  - `movies.html`: Dedicated Theatrical Movies catalog (Bollywood, Hollywood, South Indian Dubbed, Dual Audio).
  - `series.html`: TV Shows & Web Series hub (Mirzapur, Panchayat, Stranger Things, etc.).
  - `genres.html`: Visual genre browser (Action, Sci-Fi, Crime, Comedy, Historical, Drama).
  - `movie-details.html`: Dynamic movie details page with synopsis, cast, ratings, trailer player, and multi-server download links.

* **🔍 Real-Time Search & Category Filters**:
  - Instant debounce search across movie titles, genres, release years, and cast.
  - Category filter pills for Bollywood, Hollywood, South, Dual Audio, and Web Series.
  - Sorting options: Trending First, Highest Rating ★, Release Year (Newest), and Title (A-Z).

* **🎬 Embedded HD Trailer Modal**:
  - Watch official movie trailers in responsive 16:9 modals without leaving the page.
  - Easily closed via the close button, clicking outside, or pressing the `Escape` key.

* **⚡ Verified High-Speed Download Hub**:
  - Multi-tier resolution options: **480p Mobile**, **720p HD**, **1080p Full HD HEVC**, and **4K UHD HDR (2160p Atmos)**.
  - Multiple cloud storage mirrors (FastDL, Mega, Google Drive).

* **⭐ Personal Watchlist System**:
  - Save favorite titles with a single click on the card bookmark button.
  - Live watchlist counter badge in the header with persistent `localStorage` storage.

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
├── movie.html             # Primary Home Cinema portal
├── index.html             # Server discovery entry point
├── movies.html            # All movies theatrical catalog
├── series.html            # TV & Web Series catalog
├── genres.html            # Interactive visual genre selector
├── movie-details.html     # Deep-dive movie details & download mirrors
├── movie.css              # Master styling & responsive grid layouts
└── README.md              # Documentation
```

---

## 🚀 How to Run the Website

### Option 1: Direct File Launch
Simply double-click `movie.html` (or `index.html`) to open directly in any modern web browser.

### Option 2: Local HTTP Server (Python)
Run the following command in the project folder:
```bash
python -m http.server 8080
```
Then navigate to: [http://localhost:8080/movie.html](http://localhost:8080/movie.html)

---

&copy; 2026 Aniket Ka Movie. All rights reserved.
