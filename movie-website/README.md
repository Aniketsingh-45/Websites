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
├── .gitignore             # Git ignore list (.vercel, node_modules, etc.)
└── README.md              # Documentation
```

---

## 🚀 How to Run Locally

### Option 1: Using Node & Serve (Recommended)
```bash
npx serve .
```

### Option 2: Local HTTP Server (Python)
```bash
python -m http.server 8080
```
Then navigate to: [http://localhost:8080/](http://localhost:8080/)

---

## ⚡ How to Deploy on Vercel

### Method 1: Deploy via Vercel Web Dashboard (GitHub Integration - Recommended)

1. **Push your code to GitHub**:
   Ensure your changes are committed and pushed to your GitHub repository (`Websites` or `Movie-website`).

2. **Open Vercel Dashboard**:
   - Go to [https://vercel.com/new](https://vercel.com/new) and log in with GitHub.

3. **Import Project**:
   - **If importing the `Websites` monorepo**:
     - Click **Import** next to `Websites`.
     - In **Project Settings**, find **Root Directory** and click **Edit**.
     - Select `movie-website` and click **Continue**.
     - Framework Preset: Choose **Other** (it's a static site).
     - Click **Deploy**!
   - **If importing standalone `Movie-website` repository**:
     - Click **Import** next to `Movie-website`.
     - Framework Preset: **Other**.
     - Click **Deploy**!

4. **Done!**
   Vercel will give you a live production URL (e.g., `https://aniket-ka-movie.vercel.app`) with automatic SSL, global CDN, clean URLs, and automatic redeployment on git push.

---

### Method 2: Deploy via Vercel CLI (Direct from Terminal)

1. Open PowerShell or Terminal inside `movie-website/`:
   ```bash
   cd "d:\My Apps\Websites\movie-website"
   ```

2. Run Vercel CLI directly without installing:
   ```bash
   npx vercel
   ```

3. Follow the on-screen prompts:
   - `Set up and deploy?` &rarr; Type `y` and hit **Enter**.
   - `Which scope?` &rarr; Select your Vercel account.
   - `Link to existing project?` &rarr; Type `n` (for first time).
   - `What's your project's name?` &rarr; Press **Enter** (defaults to `movie-website`).
   - `In which directory is your code located?` &rarr; Press **Enter** (`./`).
   - `Want to modify these settings?` &rarr; Type `n` and hit **Enter**.

4. For production release:
   ```bash
   npx vercel --prod
   ```

---

&copy; 2026 Aniket Ka Movie. All rights reserved.

