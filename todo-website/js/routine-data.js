/**
 * Flagship Default Routine: 30-Day Personal Upgrade
 * Extracted from high-performance student daily routine guide
 */
const DEFAULT_ROUTINE_DATA = {
  title: "30-DAY PERSONAL UPGRADE",
  subtitle: "Daily Routine • English Speaking • AI/ML • Fitness • Communication • Discipline",
  weeklyFocus: [
    { week: 1, theme: "Confidence", description: "Overcome fear of speaking, build daily consistency, and establish your waking rhythm." },
    { week: 2, theme: "Fluency", description: "Smooth transition between thoughts, eliminate mid-sentence hesitations, and code daily." },
    { week: 3, theme: "Pronunciation & Articulation", description: "Master difficult phonemes, speak clearly without rushing, and nail ML concepts." },
    { week: 4, theme: "Professional Communication", description: "Explain complex technical ideas in simple English, portfolio review & readiness." }
  ],
  tasks: [
    {
      id: "task-1",
      startTime: "06:00",
      endTime: "06:15",
      timeDisplay: "6:00 AM – 6:15 AM",
      activity: "Wake up + make bed + wash",
      goal: "Start immediately; no scrolling",
      category: "Discipline",
      priority: "high",
      xp: 30,
      completed: false
    },
    {
      id: "task-2",
      startTime: "06:15",
      endTime: "06:30",
      timeDisplay: "6:15 AM – 6:30 AM",
      activity: "Breathing + gentle stretching",
      goal: "Calm mind + posture",
      category: "Fitness",
      priority: "medium",
      xp: 20,
      completed: false
    },
    {
      id: "task-3",
      startTime: "06:30",
      endTime: "07:15",
      timeDisplay: "6:30 AM – 7:15 AM",
      activity: "Workout / light walk",
      goal: "Strength & fitness",
      category: "Fitness",
      priority: "high",
      xp: 40,
      completed: false
    },
    {
      id: "task-4",
      startTime: "07:15",
      endTime: "08:00",
      timeDisplay: "7:15 AM – 8:00 AM",
      activity: "Bath + grooming + breakfast",
      goal: "Personal care & nourish body",
      category: "Wellness",
      priority: "medium",
      xp: 25,
      completed: false
    },
    {
      id: "task-5",
      startTime: "08:00",
      endTime: "08:20",
      timeDisplay: "8:00 AM – 8:20 AM",
      activity: "English listening",
      goal: "Listen → understand → notice pronunciation",
      category: "English",
      priority: "high",
      xp: 30,
      completed: false
    },
    {
      id: "task-6",
      startTime: "08:20",
      endTime: "08:40",
      timeDisplay: "8:20 AM – 8:40 AM",
      activity: "Shadowing",
      goal: "Copy pronunciation, rhythm & pauses",
      category: "English",
      priority: "high",
      xp: 30,
      completed: false
    },
    {
      id: "task-7",
      startTime: "08:40",
      endTime: "09:00",
      timeDisplay: "8:40 AM – 9:00 AM",
      activity: "Read aloud",
      goal: "Articulation + fluency",
      category: "English",
      priority: "medium",
      xp: 25,
      completed: false
    },
    {
      id: "task-8",
      startTime: "09:00",
      endTime: "10:30",
      timeDisplay: "9:00 AM – 10:30 AM",
      activity: "AI/ML deep study",
      goal: "Python / ML concepts",
      category: "AI/ML",
      priority: "high",
      xp: 50,
      completed: false
    },
    {
      id: "task-9",
      startTime: "10:30",
      endTime: "10:45",
      timeDisplay: "10:30 AM – 10:45 AM",
      activity: "Break & Screen Rest",
      goal: "Walk + hydrate + 20-20-20 eye rest",
      category: "Wellness",
      priority: "low",
      xp: 15,
      completed: false
    },
    {
      id: "task-10",
      startTime: "10:45",
      endTime: "12:15",
      timeDisplay: "10:45 AM – 12:15 PM",
      activity: "Coding",
      goal: "Python / practical implementation",
      category: "Coding",
      priority: "high",
      xp: 50,
      completed: false
    },
    {
      id: "task-11",
      startTime: "12:15",
      endTime: "13:00",
      timeDisplay: "12:15 PM – 1:00 PM",
      activity: "Lunch",
      goal: "Eat + relax & digest",
      category: "Wellness",
      priority: "medium",
      xp: 20,
      completed: false
    },
    {
      id: "task-12",
      startTime: "13:00",
      endTime: "13:30",
      timeDisplay: "1:00 PM – 1:30 PM",
      activity: "Rest / power nap",
      goal: "Recovery & cognitive reboot",
      category: "Wellness",
      priority: "medium",
      xp: 25,
      completed: false
    },
    {
      id: "task-13",
      startTime: "13:30",
      endTime: "15:00",
      timeDisplay: "1:30 PM – 3:00 PM",
      activity: "College study",
      goal: "Subjects + assignments",
      category: "College",
      priority: "high",
      xp: 45,
      completed: false
    },
    {
      id: "task-14",
      startTime: "15:00",
      endTime: "15:30",
      timeDisplay: "3:00 PM – 3:30 PM",
      activity: "Break",
      goal: "Movement + refresh",
      category: "Wellness",
      priority: "low",
      xp: 15,
      completed: false
    },
    {
      id: "task-15",
      startTime: "15:30",
      endTime: "17:00",
      timeDisplay: "3:30 PM – 5:00 PM",
      activity: "Project building",
      goal: "Portfolio / AI project",
      category: "AI/ML",
      priority: "high",
      xp: 50,
      completed: false
    },
    {
      id: "task-16",
      startTime: "17:00",
      endTime: "17:20",
      timeDisplay: "5:00 PM – 5:20 PM",
      activity: "Vocabulary",
      goal: "5–7 useful words + sentences",
      category: "English",
      priority: "medium",
      xp: 25,
      completed: false
    },
    {
      id: "task-17",
      startTime: "17:20",
      endTime: "17:40",
      timeDisplay: "5:20 PM – 5:40 PM",
      activity: "English speaking",
      goal: "2–5 min recording",
      category: "English",
      priority: "high",
      xp: 40,
      completed: false
    },
    {
      id: "task-18",
      startTime: "17:40",
      endTime: "18:00",
      timeDisplay: "5:40 PM – 6:00 PM",
      activity: "Pronunciation",
      goal: "Difficult sounds + clear speech",
      category: "English",
      priority: "medium",
      xp: 25,
      completed: false
    },
    {
      id: "task-19",
      startTime: "18:00",
      endTime: "19:00",
      timeDisplay: "6:00 PM – 7:00 PM",
      activity: "Walk / outdoor time",
      goal: "Fitness + refresh mind",
      category: "Fitness",
      priority: "medium",
      xp: 35,
      completed: false
    },
    {
      id: "task-20",
      startTime: "19:00",
      endTime: "20:00",
      timeDisplay: "7:00 PM – 8:00 PM",
      activity: "SQL / DSA / revision",
      goal: "Career fundamentals",
      category: "Coding",
      priority: "high",
      xp: 45,
      completed: false
    },
    {
      id: "task-21",
      startTime: "20:00",
      endTime: "20:30",
      timeDisplay: "8:00 PM – 8:30 PM",
      activity: "Dinner",
      goal: "Relaxed meal without screens",
      category: "Wellness",
      priority: "low",
      xp: 20,
      completed: false
    },
    {
      id: "task-22",
      startTime: "20:30",
      endTime: "21:00",
      timeDisplay: "8:30 PM – 9:00 PM",
      activity: "English reading",
      goal: "Comprehension + vocabulary",
      category: "English",
      priority: "medium",
      xp: 30,
      completed: false
    },
    {
      id: "task-23",
      startTime: "21:00",
      endTime: "21:30",
      timeDisplay: "9:00 PM – 9:30 PM",
      activity: "Articulation practice",
      goal: "Explain today's learning in English",
      category: "English",
      priority: "high",
      xp: 35,
      completed: false
    },
    {
      id: "task-24",
      startTime: "21:30",
      endTime: "22:00",
      timeDisplay: "9:30 PM – 10:00 PM",
      activity: "Journal + tomorrow plan",
      goal: "Review progress + plan next day",
      category: "Discipline",
      priority: "high",
      xp: 35,
      completed: false
    },
    {
      id: "task-25",
      startTime: "22:00",
      endTime: "22:30",
      timeDisplay: "10:00 PM – 10:30 PM",
      activity: "Phone off + wind down",
      goal: "Prepare for sleep; zero blue light",
      category: "Discipline",
      priority: "high",
      xp: 30,
      completed: false
    },
    {
      id: "task-26",
      startTime: "22:30",
      endTime: "06:00",
      timeDisplay: "10:30 PM – 6:00 AM",
      activity: "Sleep",
      goal: "Target ~7.5 hours deep sleep",
      category: "Wellness",
      priority: "high",
      xp: 50,
      completed: false
    }
  ],
  englishFormula: [
    { practice: "Listening", whatToDo: "10–20 min English video/podcast; subtitles first, then without.", icon: "headphones" },
    { practice: "Shadowing", whatToDo: "Speaker says a sentence → immediately repeat with the same rhythm and pauses.", icon: "mic" },
    { practice: "Read Aloud", whatToDo: "1–2 pages: slow → normal → expressive reading.", icon: "book-open" },
    { practice: "Vocabulary", whatToDo: "Learn only 5–7 useful words; meaning + 3 original sentences + speak them.", icon: "bookmark" },
    { practice: "Speaking", whatToDo: "Record yourself for 2–5 minutes. Do not stop for every grammar mistake.", icon: "audio-lines" },
    { practice: "Thinking", whatToDo: "Describe simple activities mentally in English instead of translating every sentence.", icon: "brain" },
    { practice: "Articulation", whatToDo: "Speak clearly and slowly; practise difficult sounds, not just speed.", icon: "sparkles" }
  ],
  dailyChecklist: [
    { id: "chk-1", text: "7–9 hours sleep", checked: false },
    { id: "chk-2", text: "Workout", checked: false },
    { id: "chk-3", text: "English listening", checked: false },
    { id: "chk-4", text: "Shadowing", checked: false },
    { id: "chk-5", text: "English speaking recording", checked: false },
    { id: "chk-6", text: "Vocabulary", checked: false },
    { id: "chk-7", text: "AI/ML study", checked: false },
    { id: "chk-8", text: "Coding / project", checked: false },
    { id: "chk-9", text: "College study", checked: false },
    { id: "chk-10", text: "SQL / DSA / revision", checked: false },
    { id: "chk-11", text: "Reading", checked: false },
    { id: "chk-12", text: "Phone controlled", checked: false },
    { id: "chk-13", text: "Journal", checked: false },
    { id: "chk-14", text: "Planned tomorrow", checked: false }
  ],
  rules: [
    { num: 1, title: "Rule of Continuity", text: "Never miss two days in a row.", highlight: true },
    { num: 2, title: "Biological Foundation", text: "Don't sacrifice sleep just to wake up early.", highlight: false },
    { num: 3, title: "Vocal Courage", text: "English mistakes are allowed — silence is not.", highlight: true },
    { num: 4, title: "Language Loop", text: "Listen → Shadow → Read → Speak → Record → Review → Repeat.", highlight: false },
    { num: 5, title: "Dopamine Guard", text: "Keep social media/short-form scrolling controlled, especially before study.", highlight: true },
    { num: 6, title: "Mastery Principle", text: "Learn → Build → Explain: explain what you learn in English.", highlight: false },
    { num: 7, title: "Sustainable Growth", text: "Aim for consistency, not a perfect 10/10 day.", highlight: true }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_ROUTINE_DATA };
}
