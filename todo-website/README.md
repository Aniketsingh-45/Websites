# ⚡ AuraRoutine & StudyVault — High-Tech Student Growth & 30-Day Upgrade Routine OS

> A futuristic, high-tech student productivity, discipline, and daily routine platform crafted around the **30-Day Personal Upgrade Routine**. Built with pure vanilla HTML5, modern CSS3, and JavaScript, featuring client-side schedule PDF parsing, bio-wellness ergonomic sentinels, English speaking voice recorder lab, curated personal growth podcasts, life-changing book wisdom, and gamified XP achievements.

![AuraRoutine](https://img.shields.io/badge/AuraRoutine-v2.0-6366f1?style=for-the-badge&logo=electron&logoColor=white)
![Design](https://img.shields.io/badge/Design-Premium%20Light%20Theme-0ea5e9?style=for-the-badge)
![Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Backend-10b981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge)

---

## 📸 Overview & Design Philosophy

**AuraRoutine / StudyVault** transforms the rigid, boring paper timetable into an interactive, real-time command center. Designed with an eye-friendly **Premium Educational Light Theme** (inspired by Notion, Linear, Apple Education, and Duolingo), featuring glassmorphic elevation, soft pastel gradients, tactile micro-animations, and live HUD widgets.

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
- **Visual Glow**: The active routine card in the timeline glows with an active indicator badge.

### 3. 🎙️ English Mastery Hub & Communication Lab
Direct implementation of the **English — Daily Practice Formula**:
- **In-Browser Audio Voice Recorder**: Uses the browser's `MediaRecorder` API to record daily 2–5 minute speaking practice with instant waveform playback.
- **Communication & Speaking Exercises**:
  - ⚡ **1-Minute Impromptu Speaking Drills**: Random prompt generator with 60s countdown timer.
  - 👅 **Articulation & Tongue Twisters**: Speed levels and clarity challenges.
  - 🎭 **Real-World Scenarios**: Job interviews, tech architecture presentations, networking pitches.
  - 🚀 **Elevator Pitches**: 30-second concise value proposition practice.
- **English Reading Section**: Interactive passages with difficulty levels, word counts, and estimated read time.
- **Daily Vocabulary Builder**: Curates 50+ high-impact words with phonetic pronunciations, speech synthesis audio pronunciation, definitions, and sample technical sentences.

### 4. 🎧 Growth & Mindset Podcasts Hub
Curated video & podcast resources for self-mastery, communication, and career acceleration:
- 🎙️ **Raj Shamani (Figuring Out)**: Business, networking, communication, and mindset lessons.
- 🧘 **The Ranveer Show (TRS)**: Discipline, meditation, career growth, and mental toughness.
- 💡 **Jay Shetty (On Purpose)**: Relationship dynamics, emotional intelligence, and purpose.
- ⚡ **Ali Abdaal (Deep Dive)**: Productivity systems, smart learning, and financial freedom.
- 🧠 **Andrew Huberman (Huberman Lab)**: Neuroscience of deep focus, sleep optimization, and dopamine management.

### 5. 📚 Book Wisdom & High-Performance Quotes
Interactive library of core philosophies and key chapter breakdowns from world-class authors:
- 🛡️ *Can't Hurt Me* by David Goggins (The 40% Rule, Taking Souls, Accountability Mirror)
- ⚛️ *Atomic Habits* by James Clear (1% Compounding, Habit Stacking, Two-Minute Rule)
- 🧠 *Deep Work* by Cal Newport (Monk vs. Bimodal vs. Rhythmic scheduling, Attention Residue)
- 💰 *The Psychology of Money* by Morgan Housel (Freedom over display, Compounding patience)
- 🏆 *Rich Dad Poor Dad* by Robert Kiyosaki (Assets vs. Liabilities, Financial Literacy)

### 6. 🧘 Student Bio-Wellness & Ergonomics Sentinel
Built specifically to protect students against long screen sessions:
- **👁️ 20-20-20 Eye Rest Engine**: Monitors active screen time (20 min) and rings a zen gong with a 20-second circular countdown ring modal.
- **💧 Hydration Tracker**: 8 glasses target (2.0L) with visual water level, realistic droplet sound effects, and periodic alerts.
- **🧘 Posture & Spine Alignment Check**: Periodic ergonomic reminders to roll shoulders back and release neck tension.

### 7. 🏆 Gamification & Milestone Achievements
- **Student Levels & XP**: Earn XP by completing tasks, taking eye breaks, and logging water. Climb from Level 1 *Novice Apprentice* to Level 20 *Grandmaster Ascendant*.
- **8 Milestone Badges**: Early Riser, Neural Architect, Speaking Maverick, Rule #1 Enforcer, Hydration Titan, Optic Defender, Century Titan, Deep Flow State.
- **Fanfare & Confetti**: Celebratory canvas particle explosions on leveling up and unlocking badges.

### 8. 📄 Client-Side PDF Routine Importer
- **Client-Side PDF Parsing**: Powered by Mozilla `pdf.js` with zero server requirements.
- **Intelligent Schedule Parser**: Automatically parses time intervals, activities, goals, and auto-detects categories.

---

## 📂 Project Architecture

```
todo-website/
├── index.html              # Semantic layout, Bento grid, podcast hub, modals, HUD
├── README.md               # Documentation & usage guide
├── css/
│   ├── style.css           # Design tokens, educational light theme, typography, header, bento
│   └── components.css      # Task cards, badges, modals, voice recorder, eye rest ring, toasts
└── js/
    ├── routine-data.js     # Preloaded 30-Day Routine dataset, podcast links, book wisdom & vocab
    ├── audio-notify.js     # Web Audio API sound synthesizer & push notification dispatcher
    ├── wellness.js         # 20-20-20 Eye Rest engine, Hydration tracker, Posture alerts
    ├── gamification.js     # XP, Ranks, Badges, Streaks, Confetti particles
    ├── english-lab.js      # Speech voice recorder, vocabulary builder, communication drills
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
