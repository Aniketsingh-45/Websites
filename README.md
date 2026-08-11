# 🎬 Aniket Ka Movie

An elegant, dark-themed, and fully responsive movie listing and download web portal. Crafted using clean, semantic HTML5 and vanilla CSS3 to deliver a premium cinematic user interface.

---

## ✨ Features

* **Premium Dark Mode UI**: A visually stunning backdrop featuring deep dark colors (`#09090b`) matched with a textured background pattern for a clean, immersive look.
* **Modern CSS Grid Layout**: A clean, uniform 4-column display for movie poster cards on desktop screens, which adapts fluidly on smaller devices.
* **Quick Filter Buttons**: Interactive tags to filter content instantly across categories: **Bollywood**, **Hollywood**, **South (Hindi Dubbed)**, **Dual Audio**, and **Web Series**.
* **Global Navigation Hub**: Includes quick navigation options:
  - 🏠 HOME
  - 🎬 MOVIES
  - 🔗 GENRE
  - 📅 YEAR
  - ☠️ QUALITY
  - 📺 TV SHOWS
  - 🌐 WEB SERIES
* **Interactive Search Utility**: Styled search bar with a transparent entry interface and custom-designed query search icon.
* **Trailer & Download Links**:
  - Select movies (e.g., *SardarJi 3*) feature direct poster links to YouTube trailers.
  - Every card features a vibrant call-to-action button linking directly to high-speed downloads.
* **Advanced Pagination**: Sleek, bottom-aligned page numbering (`1`, `2`, `3`, `4`, `5`, and `Next Page`) for simple navigation control.
* **Tailored Mobile Responsiveness**: Optimizations via media queries for screens under `400px` that stack the header vertically, wrap categories into grid slots, and format the movie catalog into a comfortable 2-column grid.

---

## 🎨 Theme & Styling Details

The visual system is designed around a modern slate and zinc palette with high-contrast accent gradients:

| Attribute | Value & Implementation |
| :--- | :--- |
| **Primary Background** | Slate/Black `#09090b` with subtle textured backdrop |
| **Component Cards** | Dark zinc `#27272a` body shifting to `#5a5a5a` on hover |
| **Typography** | `Segoe UI`, `Tahoma`, and `Geneva` for interface text; modern `Franklin Gothic Medium` for movie headings |
| **Action Gradients** | Call-to-action buttons feature a vivid neon gradient (`#ff0000` to `#ff00ff`) transitioning smoothly to deep red on hover |
| **Shadow Highlights** | White outline shadows (`box-shadow: 0 0 10px #fff`) to highlight focused cards and content containers |

---

## 📁 File Structure

```bash
movie/
├── logo.png       # The main branding header logo
├── movie.html     # Semantic structure of the portal (Search, Grid, Pagination)
├── movie.css      # Core style sheet, animations, hover effects, and responsive breakpoints
└── README.md      # Documentation (This file)
```

---

## 🚀 How to Run the Project

### Option 1: Direct File Launch
Simply double-click the `movie.html` file in your directory to open it in any modern browser (Chrome, Edge, Safari, Firefox).

### Option 2: Live Server (VS Code Extension)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension.
3. Click **Go Live** in the status bar at the bottom right to run it locally on `http://127.0.0.1:5500/movie.html`.

### Option 3: Local HTTP Server (Python)
If you have Python installed, launch a local server by running the following command in your terminal:
```bash
python -m http.server 8000
```
Then, open [http://localhost:8000/movie.html](http://localhost:8000/movie.html) in your browser.

### Option 4: Local Server (Node.js)
Using npm, run the static server package directly:
```bash
npx serve .
```
Then, access the URL provided in the console (usually `http://localhost:3000`).

---

## 🍿 Curated Movie Library

The portal displays 19 high-demand titles with full high-resolution covers:
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
