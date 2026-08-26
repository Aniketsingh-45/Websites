# 🎬 Aniket Ka Movie - Glassmorphism Edition

An elegant, dark-themed, and fully responsive movie listing and download web portal. Crafted using clean, semantic HTML5 and vanilla CSS3 to deliver a **premium cinematic glassmorphism user interface**.

---

## ✨ Features

* **Premium Glassmorphism UI**: A visually stunning backdrop featuring a cinematic background wallpaper matched with translucent, frosted glass containers (`backdrop-filter`) for a highly modern and immersive look.
* **Modern CSS Grid Layout**: A clean, uniform fluid grid display for movie poster cards that adapts effortlessly from large 4K displays down to mobile screens.
* **Beautiful Micro-Interactions**: Hover over movie cards to watch them lift smoothly with an enhanced neon glow. The download buttons feature a vibrant, animated gradient hover effect.
* **Quick Filter Buttons**: Frosted glass tag buttons to filter content instantly across categories: **Bollywood**, **Hollywood**, **South (Hindi Dubbed)**, **Dual Audio**, and **Web Series**.
* **Global Navigation Hub**: Includes quick navigation options:
  - 🏠 HOME
  - 🎬 MOVIES
  - 🔗 GENRE
  - 📅 YEAR
  - ☠️ QUALITY
  - 📺 TV SHOWS
  - 🌐 WEB SERIES
* **Interactive Search Utility**: Sleek, transparent search bar that expands its glow upon focus, giving users an elegant querying interface.
* **Trailer & Download Links**:
  - Select movies feature direct poster links to YouTube trailers.
  - Every card features a vibrant call-to-action button linking directly to high-speed downloads.

---

## 🎨 Theme & Styling Details

The visual system is designed around a modern frosted glass palette with high-contrast accent gradients:

| Attribute | Value & Implementation |
| :--- | :--- |
| **Primary Background** | High-quality cinematic image overlayed with a dark radial gradient |
| **Glass Containers** | `rgba(25, 25, 30, 0.5)` with `backdrop-filter: blur(16px)` |
| **Typography** | `Outfit`, Google's sleek sans-serif font for all interface text |
| **Action Gradients** | Call-to-action buttons feature a vivid neon gradient (`#ff0f7b` to `#f89b29`) with dynamic hover lighting |
| **Shadow Highlights** | Deep, smooth drop shadows (`box-shadow: 0 10px 30px rgba(0,0,0,0.3)`) to separate glass layers from the background |

---

## 📁 File Structure

```bash
movie/
├── logo.png       # The main branding header logo
├── movie.html     # Semantic structure of the portal (Search, Grid, Pagination)
├── movie.css      # Core style sheet containing all Glassmorphism rules & animations
└── README.md      # Documentation (This file)
```

---

## 🚀 How to Run the Project

### Option 1: Direct File Launch
Simply double-click the `movie.html` file in your directory to open it in any modern browser (Chrome, Edge, Safari, Firefox).

### Option 2: Live Server (VS Code Extension)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Click **Go Live** in the status bar at the bottom right to run it locally.

### Option 3: Local HTTP Server (Python)
If you have Python installed, launch a local server by running the following command in your terminal:
```bash
python -m http.server 8000
```
Then, open [http://localhost:8000/movie.html](http://localhost:8000/movie.html) in your browser.

---

## 🍿 Curated Movie Library

The portal displays high-demand titles with full high-resolution covers:
1. **SardarJi 3 (2025)** (Includes YouTube Trailer)
2. **Anand (1971)**
3. **Maa (2025)**
4. **Raid (2025)**
5. **Sitaare Zameen Par (2025)**
6. **Kesari 2 (2025)**
7. **Sabarmati Report (2024)**
8. **Housefull 5 (2025)**
9. **Jaat (2025)**
10. **Bhool-Chuk-Maaf (2025)**
11. **Chhaava (2025)**
12. **Azaad (2025)**
13. **Sky-Force (2025)**
14. **Namastey-London (2007)**
15. **Shaadi-Mein-Zaroor-Aana (2017)**
16. **Vicky-Vidya-Ka-Woh-Wala-Video (2024)**
17. **Do-Patti (2024)**
18. **Sarfira (2024)**
19. **Khel-Khel-Mein (2024)**
