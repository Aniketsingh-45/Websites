# 🌐 Websites Workspace

> A curated collection of modern web applications, interactive AI tools, and creative front-end projects developed by **Aniket Singh**. 🚀

This repository serves as a monorepo-style home for various web designs, spanning from lightweight vanilla HTML/CSS landing pages to advanced full-stack React applications integrated with Three.js, GSAP, and Google's Gemini LLMs.

---

## 📂 Project Directory

Below is an overview of the projects contained in this workspace, organized by complexity and technology stack:

| Project Name | Folder Path | Tech Stack | Project Type | Description |
| :--- | :--- | :--- | :--- | :--- |
| **🤖 ResuSmart** | [`/resusmart_-ats-resume-builder`](./resusmart_-ats-resume-builder) | React 19, Tailwind CSS 4, Vite 6, Express, Gemini API (`@google/genai`), Firebase, HTML2PDF | Full-stack AI App | AI-powered ATS-optimized resume builder featuring interactive editor, image cropper, and PDF generator. |
| **🎙️ Myraa AI Assistant** | [`/remix_-myraa-ai-assistant`](./remix_-myraa-ai-assistant) | React 19, Tailwind CSS 4, Vite 6, Express, Gemini API (`@google/genai`), WebSockets | Full-stack AI App | Real-time interactive AI assistant with text/voice capabilities and persistent conversation memory. |
| **✨ Developer Portfolio** | [`/portfolio`](./portfolio) | Three.js, GSAP, Lenis, Split-Type, Vite | 3D Interactive Portfolio | Aniket's personal website featuring immersive 3D canvas rendering, fluid scroll physics, and text typography animations. |
| **🍳 Dadan Handi** | [`/dadan-handi`](./dadan-handi) | HTML5, CSS3, Vanilla JS, Vite | Modern Landing Page | A fully responsive, modern web page designed for the Dadan Handi restaurant. |
| **☕ Cafe Skylite** | [`/cafe`](./cafe) | HTML5, CSS3, Vanilla JS | Rich Media Website | Interactive cafe website featuring video backdrops, custom emoji fixes, and extensive menu showcases. |
| **🏥 Clinic** | [`/clinic`](./clinic) | HTML5, CSS3, Vanilla JS | Clinic Landing Page | Clean, functional, and minimal landing page layout tailored for a medical clinic. |
| **🎁 Kiara Gift Page** | [`/gift`](./gift) | HTML5, CSS3, Vanilla JS | Interactive Gift Page | A personalized celebration website featuring photo galleries, transitions, and integrated background instrumentals. |

---

## 🛠️ Getting Started & Running Projects

Depending on the project type, follow the setup instructions below:

### 1. 🤖 Full-Stack AI Projects (`resusmart_-ats-resume-builder` & `remix_-myraa-ai-assistant`)
These applications utilize a Node/Express backend (`server.ts`) and interact with the Gemini API.

1. Navigate to the project directory:
   ```bash
   cd resusmart_-ats-resume-builder
   # or
   cd remix_-myraa-ai-assistant
   ```
2. Install the required Node modules:
   ```bash
   npm install
   ```
3. Set up environment variables:
   * Copy `.env.example` or create a `.env` file at the root of the project directory.
   * Add your Gemini API key:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     ```
4. Run the development server (runs both frontend builder and backend Express server):
   ```bash
   npm run dev
   ```

### 2. ⚡ Vite-Bundled Frontend Projects (`portfolio` & `dadan-handi`)
These projects use Vite for asset compilation and building.

1. Navigate to the project directory:
   ```bash
   cd portfolio
   # or
   cd dadan-handi
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the local development server:
   ```bash
   npm run dev
   ```

### 3. 🌐 Static Web Pages (`cafe`, `clinic`, & `gift`)
These are traditional static websites composed of pure HTML, CSS, and JS. They do not require any dependency installation.

* **Option A**: Simply double-click the main HTML file (e.g., `cafe.html` or `index.html`) to open it directly in a web browser.
* **Option B**: Run them using a local development server extension like VS Code's **Live Server** for instant page reloads and smooth routing.

---

## 👤 Developer
* **Name**: Aniket Singh
* **Workspace Directory**: `d:\My Apps\Websites`

---

<p align="center">
  Made with ❤️ by <b>Aniket Singh</b>
</p>
