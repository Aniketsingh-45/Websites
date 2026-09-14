# ⚡ AuraRoutine — High-Tech Student Growth & 30-Day Upgrade Routine OS

> A futuristic, high-tech student productivity, discipline, and daily routine platform crafted around the **30-Day Personal Upgrade Routine**. Built with pure vanilla HTML5, modern CSS3, and JavaScript, featuring client-side schedule PDF parsing, bio-wellness ergonomic sentinels, English speaking voice recorder lab, and gamified XP achievements.

![AuraRoutine](https://img.shields.io/badge/AuraRoutine-v1.0-6366f1?style=for-the-badge&logo=electron&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20PWA%20Ready-0ea5e9?style=for-the-badge)
![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Backend-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge)

---

## 📸 Overview & Design Philosophy

**AuraRoutine** transforms the rigid, boring paper timetable into an interactive, real-time command center. Designed with an obsidian dark-glassmorphism theme, vibrant cyber accents, tactile micro-animations, and live HUD widgets, AuraRoutine keeps students locked into deep focus and disciplined execution.

---

## 🚀 Key Features

### 1. 📅 Pre-Loaded Flagship "30-Day Personal Upgrade Routine"
- **26 Scheduled Execution Blocks**: Pre-configured time-blocked slots from 6:00 AM wake up to 10:30 PM sleep:
  - `6:00 AM – 6:15 AM`: Wake up + make bed + wash (*"Start immediately; no scrolling"*)
  - `6:15 AM – 7:15 AM`: Breathing, gentle stretching & morning workout
  - `8:00 AM – 9:00 AM`: English Listening, Shadowing & Read Aloud blocks
  - `9:00 AM – 10:30 AM`: AI/ML deep study (*Python / ML concepts*)
  - `10:45 AM – 12:15 PM`: Coding (*Python / practical implementation*)
  - `1:30 PM – 3:00 PM`: College study
  - `3:30 PM – 5:00 PM`: Project building (*Portfolio / AI project*)
  - `5:00 PM – 6:00 PM`: Vocabulary, English speaking recording, and pronunciation
  - `7:00 PM – 8:00 PM`: SQL / DSA / revision
  - `8:30 PM – 10:30 PM`: English reading, Articulation practice, Journaling & Sleep
- **1-Click Reset**: Instant button to restore the default routine or start fresh.

### 2. ⏱️ Live HUD Time-Slot Tracker & Real-Time Clock
- **Real-Time Clock**: Live digital HUD clock with seconds and date tracking.
- **Active Slot Billboard**: Detects current system time and highlights the ongoing routine block:
  - Remaining and elapsed minutes countdown
  - Live progression bar
  - One-click completion button
- **Visual Glow**: The active routine card in the timeline glows with a neon cyan halo and a `CURRENT` badge.

### 3. 🧘 Student Bio-Wellness & Ergonomics Sentinel
Built specifically to protect students against long screen sessions:
- **👁️ 20-20-20 Eye Rest Engine**:
  - Automatically monitors active screen time (20 minutes).
  - Rings a gentle zen singing bowl gong and displays a **20-second circular countdown ring modal** prompting the student to look at an object 20 feet away to relax eye muscles.
  - Awards **+15 XP** upon completion.
- **💧 Hydration Tracker**:
  - Daily target of 8 glasses (2.0 Liters).
  - Visual water level fill bar with **+1 Glass** / **-1 Glass** quick buttons.
  - Crisp, realistic water droplet sound effects.
  - Periodic hydration alerts every 45 minutes of screen work.
  - Unlocks the **Hydration Titan** achievement badge.
- **🧘 Posture & Spine Alignment Check**:
  - Periodic ergonomic banner reminding students to roll shoulders back, straighten spine, and release neck tension.

### 4. 📄 Client-Side PDF Routine Importer
- **Client-Side PDF Parsing**: Powered by Mozilla `pdf.js` with zero server requirements.
- **Intelligent Schedule Parser**: Automatically parses time intervals (`6:00 AM`, `9:00–10:30`), activities, goals, and auto-detects categories (`AI/ML`, `Coding`, `English`, `Fitness`, `Discipline`, `Wellness`, `College`).
- **1-Click Preset**: Button to load the 30-Day Upgrade Routine directly.

### 5. 🎙️ English Practice Studio & Voice Recorder Lab
Direct implementation of the **English — Daily Practice Formula**:
- **In-Browser Audio Voice Recorder**: Uses the browser's `MediaRecorder` API to record daily 2–5 minute speaking practice.
- **Instant Playback**: Built-in HTML5 player to listen back, inspect pauses, and self-critique.
- **Auto-Completion**: Automatically marks the 5:20 PM English Speaking task as completed, checks off the daily habit, awards **+50 XP**, and unlocks the **Speaking Maverick** badge!
- **Daily Vocabulary Builder**: Curates daily words with phonetic pronunciations, parts of speech, definitions, and sample technical sentences.
- **Practice Formula Cheat Sheet**: Guidelines for Listening, Shadowing, Read Aloud, Thinking, and Articulation.

### 6. 🏆 Gamification & Milestone Achievements
- **Student Levels & XP**: Earn XP by completing tasks, taking eye breaks, and logging water. Climb from Level 1 *Novice Apprentice* to Level 20 *Grandmaster Ascendant*.
- **8 Milestone Badges**:
  - 🌅 *Early Riser* — Conquered the 6:00 AM wake up without scrolling.
  - 🤖 *Neural Architect* — Completed AI/ML study and coding blocks.
  - 🎙️ *Speaking Maverick* — Recorded English voice practice.
  - ⚡ *Rule #1 Enforcer* — Maintained streak and never missed 2 days in a row.
  - 💧 *Hydration Titan* — Drank 8 glasses of water.
  - 👁️ *Optic Defender* — Completed 20-20-20 eye rests.
  - 🏆 *Century Titan* — 100% routine completion for the day.
  - 🎧 *Deep Flow State* — Completed a 30+ min focus session.
- **Fanfare & Confetti**: Celebratory canvas particle explosions on leveling up and unlocking badges.

### 7. 🎧 Minimalist Focus Mode & Web Audio Synthesis
- **Zero MP3 Files**: Pure Web Audio API synthesis for chimes, fanfares, water drops, and zen gongs.
- **Ambient Audio Generator**: Fullscreen dark Pomodoro timer with **40Hz Alpha Waves (Binaural Beats)** and **Soft Pink Rain** noise generator.

### 8. 📜 Daily Habits Checklist & 30-Day Rulebook
- **14 Daily Habits**: 7–9 hours sleep, workout, English listening, shadowing, speaking recording, vocabulary, AI/ML study, coding, college study, SQL/DSA, reading, phone controlled, journal, planned tomorrow.
- **30-Day Rules Drawer**: Slide-out drawer displaying all 7 golden rules and weekly roadmap themes (Confidence, Fluency, Pronunciation & Articulation, Professional Communication).

---

## 📂 Project Architecture

```
todo-website/
├── index.html              # Semantic layout, Bento grid, modals, HUD
├── README.md               # Documentation & usage guide
├── css/
│   ├── style.css           # Design tokens, obsidian dark theme, typography, header, bento
│   └── components.css      # Task cards, badges, modals, voice recorder, eye rest ring, toasts
└── js/
    ├── routine-data.js     # Preloaded 30-Day Personal Upgrade Routine dataset & formulas
    ├── audio-notify.js     # Web Audio API sound synthesizer & push notification dispatcher
    ├── wellness.js         # 20-20-20 Eye Rest engine, Hydration tracker, Posture alerts
    ├── gamification.js     # XP, Ranks, Badges, Streaks, Confetti particles
    ├── english-lab.js      # Speech voice recorder, vocabulary builder, formula guides
    ├── pdf-parser.js       # Mozilla PDF.js client-side timetable extractor
    └── app.js              # Core state coordinator, live time slot tracker, search & filter
```

---

## 💻 Getting Started

### Option 1: Open Directly
Simply double-click `index.html` in your file explorer to launch the app in any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Run via Local Server
```bash
# Using Python
python -m http.server 8080

# Or using Node http-server / npx serve
npx serve .
```
Navigate to `http://localhost:8080/` in your browser.

---

## 🎯 Keyboard Shortcuts & Quick Tips
- **Filter Tasks**: Use search bar or click filter tabs (`All`, `Active`, `Completed`) and category pills.
- **Print / PDF Export**: Click the **🖨️ Print** button in the toolbar for a clean, distraction-free printable timetable.
- **Audio Toggle**: Click **🔊 Sound ON** in the header to mute or unmute synthesized sounds.
- **Microphone Access**: Click *Allow* when prompted in the English Lab to enable speech recordings.

---

## 📜 30-Day Golden Rules
1. *Never miss two days in a row.*
2. *Don't sacrifice sleep just to wake up early.*
3. *English mistakes are allowed — silence is not.*
4. *Listen → Shadow → Read → Speak → Record → Review → Repeat.*
5. *Keep social media/short-form scrolling controlled, especially before study.*
6. *Learn → Build → Explain: explain what you learn in English.*
7. *Aim for consistency, not a perfect 10/10 day.*

---

## 📄 License
MIT License. Free for personal, academic, and open-source growth.
