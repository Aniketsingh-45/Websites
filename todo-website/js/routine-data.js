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
  ],
  bookWisdomQuotes: [
    {
      book: "Can't Hurt Me",
      author: "David Goggins",
      quote: "You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.",
      lesson: "Embrace voluntary discomfort daily to build an unbreakable calloused mind."
    },
    {
      book: "Can't Hurt Me",
      author: "David Goggins",
      quote: "The 40% Rule: When your mind is telling you you're done, that you're exhausted, that you can't possibly go on, you are only actually at 40% of your real capacity.",
      lesson: "Your brain hits the panic button early to protect comfort. Push past the 40% threshold."
    },
    {
      book: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      quote: "The poor and the middle class work for money. The rich have money work for them.",
      lesson: "Stop chasing linear hourly wages. Build scalable skills, code, and systems that produce value."
    },
    {
      book: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      quote: "An asset puts money in your pocket. A liability takes money out of your pocket. That is all you really need to know.",
      lesson: "Invest your student hours into assets (coding skills, English fluency) instead of liabilities (dopamine scrolling, vanity purchases)."
    },
    {
      book: "Atomic Habits",
      author: "James Clear",
      quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
      lesson: "Focus on executing your daily 26 routine slots rather than daydreaming about distant targets."
    },
    {
      book: "Atomic Habits",
      author: "James Clear",
      quote: "Every action you take is a vote for the type of person you wish to become.",
      lesson: "Ticking off a single study block is not just productivity—it is forging your identity as an unstoppable builder."
    },
    {
      book: "Man's Search for Meaning",
      author: "Viktor E. Frankl",
      quote: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.",
      lesson: "When code breaks or energy dips, pause before reacting. Choose composure and curiosity over frustration."
    },
    {
      book: "Deep Work",
      author: "Cal Newport",
      quote: "To produce at your peak level you need to work for extended periods with full concentration on a single task free from distraction.",
      lesson: "Zero notifications, zero phone checks. Protect your 90-minute coding blocks like sacred ground."
    },
    {
      book: "The Psychology of Money",
      author: "Morgan Housel",
      quote: "The highest form of wealth is the ability to wake up every morning and say, 'I can do whatever I want today.'",
      lesson: "True wealth is not luxury possessions; it is autonomy over your time and mental energy."
    }
  ],
  readingLibrary: [
    {
      id: "reading-1",
      title: "The Neural Landscape: How Modern AI Learns",
      category: "AI & Tech",
      level: "Intermediate",
      readTime: "2 min",
      wordCount: 215,
      summary: "Understand the shift from heuristic code to pattern synthesis in neural networks.",
      content: `Artificial intelligence represents a fundamental paradigm shift in computational problem-solving. In traditional software engineering, developers explicitly articulate every conditional rule and logical branch. In modern machine learning, however, systems synthesize complex patterns directly from multidimensional datasets through iterative optimization.

When training a deep neural network, millions of parameters adjust dynamically via gradient descent to minimize error. Rather than memorizing raw examples, the model learns abstract representations—discovering latent features that human programmers could never manually encode. Understanding these underlying mathematical foundations empowers developers not merely to consume pre-built APIs, but to engineer robust, scalable systems that genuinely solve real-world problems.

As an aspiring engineer, your duty is to build pragmatic mental models. Do not merely copy syntax; dissect the algorithmic mechanisms, benchmark their computational efficiency, and explain your discoveries aloud in lucid English.`,
      keyVocab: ["Paradigm", "Synthesize", "Iterative", "Pragmatic"]
    },
    {
      id: "reading-2",
      title: "The Law of 1%: Compounding Daily Discipline",
      category: "Discipline & Habits",
      level: "Core Mindset",
      readTime: "2 min",
      wordCount: 205,
      summary: "Why microscopic daily gains crush sporadic bursts of motivation.",
      content: `Most ambitious individuals fail not from a lack of talent, but from an addiction to dramatic intensity over unglamorous consistency. They wait for emotional inspiration, sprint fiercely for three days, burn out, and abandon their goals.

The high-performance upgrade protocol operates on the mathematics of compounding. Improving your skills by just one percent every single day makes you thirty-seven times better by the end of a single year. Consistency creates momentum; momentum turns difficult cognitive labor into effortless automated habits.

This is the exact reason Rule Number One exists: never miss two days in a row. A single missed day is an unfortunate anomaly; two consecutive missed days is the inception of a destructive new habit. When energy is low, do not abandon the routine—simply reduce the scope, maintain the streak, and protect your identity as an unstoppable builder.`,
      keyVocab: ["Compounding", "Momentum", "Anomaly", "Resilient"]
    },
    {
      id: "reading-3",
      title: "The Vocal Engine: Speaking with Clarity & Authority",
      category: "English Communication",
      level: "Articulation",
      readTime: "2 min",
      wordCount: 220,
      summary: "Techniques to eliminate filler words, control vocal cadence, and articulate technical ideas.",
      content: `Fluent communication is not about speaking at rapid speed; it is about deliberate articulation, measured resonance, and effortless coherence. Many students stumble into awkward hesitations because their mouth attempts to race ahead of their conceptual thoughts.

To develop vocal command, you must practice the language loop: Listen, Shadow, Read, Speak, and Review. When shadowing native audio, do not merely mimic the vocabulary—absorb the natural rhythm, the intentional pauses, and the rising and falling intonation. Silence is a powerful rhetorical tool; pausing before an important insight conveys confidence, whereas nervous filler words erode your authority.

Remember Rule Number Three: English mistakes are allowed, but silence is not. Fluency is a muscle forged through repeated vocal vibrations. Record yourself daily, analyze your pronunciation without self-judgment, and explain technical concepts until complex ideas sound brilliantly simple.`,
      keyVocab: ["Articulation", "Resonance", "Coherence", "Rhetorical"]
    },
    {
      id: "reading-4",
      title: "Cognitive Fortitude: Building Laser-Sharp Focus",
      category: "Focus & Productivity",
      level: "Advanced",
      readTime: "2.5 min",
      wordCount: 235,
      summary: "Conquering dopamine distraction and building deep cognitive endurance.",
      content: `We live in an age of ubiquitous digital stimuli, where algorithmically curated short-form videos wage war against human attention spans. Every notification, endless social media scroll, and abrupt task switch fractures your cognitive continuity, leaving behind a destructive residue called attention fragmentation.

To master deep coding, algorithm design, and conceptual machine learning, you must cultivate cognitive fortitude. Deep work is the ability to focus without distraction on a cognitively demanding task. It is an increasingly rare superpower in our modern economy, which makes it extraordinarily valuable.

Before you begin a study block, implement aggressive environmental defense: place your phone in another room, eliminate irrelevant browser tabs, and enter a dedicated focus ritual. When your mind instinctively craves cheap dopamine, recognize the urge, take three deep belly breaths, and redirect your focus back to the problem at hand. Discipline is the deliberate sacrifice of immediate gratification for lasting mastery.`,
      keyVocab: ["Ubiquitous", "Fortitude", "Fragmentation", "Gratification"]
    },
    {
      id: "reading-5",
      title: "Neuroplasticity: Rewiring Your Brain for Complex Skills",
      category: "Learning Science",
      level: "Intermediate",
      readTime: "2 min",
      wordCount: 210,
      summary: "How deliberate cognitive strain physically alters synaptic pathways.",
      content: `The human brain is not a static organ; it is a dynamic neural matrix possessing extraordinary neuroplasticity. Every time you struggle through a convoluted algorithm or wrestle with unfamiliar English sentence structures, your neurons physically remodel their synaptic connections.
      
Cognitive discomfort is not an indicator of inadequacy; it is the physiological precondition for neural adaptation. When you push past the initial friction of mental exertion, myelin sheaths wrap around active axon pathways, accelerating electrical transmission speeds and cementing new competencies into muscle memory.

To maximize neuroplastic adaptation, apply deliberate spaced repetition. Do not merely read passively—actively recall complex mechanisms, write original code without copying templates, and explain algorithmic architectures aloud in structured English sentences every single day.`,
      keyVocab: ["Neuroplasticity", "Adaptation", "Cadence", "Dissect"]
    },
    {
      id: "reading-6",
      title: "The Feynman Technique: Explaining Complex Tech in Lucid English",
      category: "Tech & Communication",
      level: "Advanced",
      readTime: "2.5 min",
      wordCount: 225,
      summary: "Rule #6: Learn → Build → Explain. The ultimate filter for true mastery.",
      content: `Nobel laureate Richard Feynman famously argued that if you cannot explain a concept in simple, accessible language, you do not truly understand it yourself. Many engineers hide behind impenetrable technical jargon to obscure their own superficial comprehension.

Rule Number Six of the upgrade routine instructs: Learn → Build → Explain. When you study backpropagation, convolutional neural networks, or dynamic programming, immediately challenge yourself to articulate the core concept as if teaching an intelligent ten-year-old.

Eliminate vague buzzwords. Strip the mechanism down to its fundamental axioms. Use tangible real-world analogies: compare gradient descent to a hiker descending a foggy mountain, or compare a cache to a quick-reference notebook on your desk. By verbalizing these explanations aloud in English, you transform abstract textbook theory into enduring engineering intuition.`,
      keyVocab: ["Axiom", "Coherence", "Intuition", "Articulate"]
    },
    {
      id: "reading-7",
      title: "Can't Hurt Me: The 40% Rule & The Accountability Mirror",
      bookTitle: "Can't Hurt Me",
      bookAuthor: "David Goggins",
      chapterHighlight: "Chapter 2 & Chapter 4: The Accountability Mirror & The 40% Rule",
      category: "Book Masterpieces",
      level: "Unbreakable Mindset",
      readTime: "3.5 min",
      wordCount: 385,
      summary: "From 297 pounds spraying roaches to Navy SEAL: How David Goggins calloused his mind and unlocked the hidden 60% of human capability.",
      story: `At twenty-four years old, David Goggins was depressed, insecure, and weighed almost three hundred pounds. He spent his nights spraying cockroaches in fast-food restaurants for nine hundred dollars a month. One morning at 6:00 AM, drinking chocolate milk on his couch, he stumbled upon a television documentary showcasing the brutal crucible of Navy SEAL training: men shivering in hypothermic surf, carrying logs, refusing to quit.

Something inside Goggins detonated. He stood in front of his bathroom mirror, shaved his head, and confronted the raw, unvarnished truth. He took sticky notes and plastered them across the glass: his test failures, his laziness, his excuses. This became 'The Accountability Mirror'. To qualify for SEAL training, he had to shed one hundred and six pounds in less than three months. He woke up at 4:30 AM, cycled for hours on a stationary bike, and starved himself through grueling runs. Through sheer volcanic willpower, he transformed his body, conquered three Hell Weeks, and proved that human limits are largely self-imposed illusions.`,
      quotes: [
        {
          text: "You are in danger of living a life so comfortable and soft, that you will die without ever realizing your true potential.",
          context: "Comfort is the silent killer of student ambition. Growth demands friction."
        },
        {
          text: "The 40% Rule: When your mind is telling you you're done, that you're exhausted, that you can't possibly go on, you are only actually at 40% of your real capacity.",
          context: "Your brain is hardwired to seek safety. Recognize fatigue as a false alarm."
        },
        {
          text: "Don't stop when you're tired. Stop when you're done.",
          context: "Finish every scheduled time block completely, regardless of emotional resistance."
        },
        {
          text: "We all need an Accountability Mirror. Stop lying to yourself. You are responsible for your current reality, and you are the only one who can fix it.",
          context: "Brutal self-honesty is the starting line of genuine self-mastery."
        }
      ],
      understandingPoints: [
        {
          title: "The Calloused Mind",
          desc: "Just as lifting heavy weights creates thick callouses on your hands to protect your palms, enduring daily cognitive discomfort (early wakeups, tough algorithms, speech recordings) builds mental armor that makes future hardships feel effortless."
        },
        {
          title: "The 40% Governor",
          desc: "Car engines have speed governors to prevent overheating. Your brain has an emotional governor that screams 'quit!' when you hit 40% exertion. When you feel like closing your laptop during study, realize you still have 60% left in reserve."
        },
        {
          title: "The Cookie Jar Method",
          desc: "Whenever you feel overwhelmed or doubt your capability, mentally reach into your 'Cookie Jar'—a mental repository of every past obstacle, exam, or hard day you have successfully conquered. Use your past victories as immediate fuel."
        }
      ],
      content: `At twenty-four years old, David Goggins was depressed, insecure, and weighed almost three hundred pounds. He spent his nights spraying cockroaches in fast-food restaurants for nine hundred dollars a month. One morning at 6:00 AM, drinking chocolate milk on his couch, he stumbled upon a television documentary showcasing the brutal crucible of Navy SEAL training: men shivering in hypothermic surf, carrying logs, refusing to quit.

Something inside Goggins detonated. He stood in front of his bathroom mirror, shaved his head, and confronted the raw, unvarnished truth. He took sticky notes and plastered them across the glass: his test failures, his laziness, his excuses. This became 'The Accountability Mirror'. To qualify for SEAL training, he had to shed one hundred and six pounds in less than three months. He woke up at 4:30 AM, cycled for hours on a stationary bike, and starved himself through grueling runs.

Through this crucible, Goggins discovered the '40% Rule'. Most people operate at a fraction of their true capability because the human brain is hardwired to preserve energy and seek comfortable safety. When your mind tells you that you are utterly exhausted, that you cannot write another line of code or practice English for another minute, you have only reached approximately forty percent of your true threshold.

By deliberately choosing the path of most resistance every day, Goggins forged what he calls a 'Calloused Mind'. In your own student journey, you do not need to endure Navy SEAL Hell Week, but you must conquer the daily micro-battles: waking up at 6:00 AM without touching social media, staying in your chair for deep coding, and speaking English aloud despite fear of judgment. When you master your internal monologue, nothing in the outside world can hurt you.`,
      keyVocab: ["Calloused", "Fortitude", "Crucible", "Unvarnished"]
    },
    {
      id: "reading-8",
      title: "Rich Dad Poor Dad: Escaping the Rat Race & The Asset Code",
      bookTitle: "Rich Dad Poor Dad",
      bookAuthor: "Robert T. Kiyosaki",
      chapterHighlight: "Chapter 1 & 2: The Rich Don't Work for Money & Financial Literacy",
      category: "Book Masterpieces",
      level: "Wealth & Life Strategy",
      readTime: "3.5 min",
      wordCount: 365,
      summary: "Why traditional schooling traps graduates in the 9-to-5 rat race, and how mastering assets, code, and financial literacy creates true freedom.",
      story: `As a nine-year-old boy in Hawaii, Robert Kiyosaki asked his school teacher how to become wealthy. The teacher had no answer, so Robert teamed up with his childhood friend Mike. They approached Mike's father—a charismatic entrepreneur with no formal degree ('Rich Dad'). Rich Dad offered them a lesson, but instead of lecturing, he put them to work in his grocery store for ten cents an hour, dusting canned goods on Saturdays.

After three weeks of aching backs and tiny wages, Robert was furious and wanted to quit. Rich Dad smiled and revealed the lesson: 'Most people spend their entire lives working for a paycheck, trapped by fear and greed. They wake up, work, pay bills, wake up, work, pay bills. That is the Rat Race. If you want true wealth, you must learn that the rich do not work for money; they create assets that make money work for them.' This fundamental insight altered Robert's entire destiny.`,
      quotes: [
        {
          text: "The poor and the middle class work for money. The rich have money work for them.",
          context: "Trading time directly for hourly wages guarantees you will work until the day you die."
        },
        {
          text: "An asset puts money in your pocket. A liability takes money out of your pocket. That is all you really need to know.",
          context: "Simplicity is brilliance. Acquire income-generating assets, not depreciating status toys."
        },
        {
          text: "The single most powerful asset we all have is our mind. If it is trained well, it can create enormous wealth in what seems to be an instant.",
          context: "Deep study in AI, algorithms, and English communication is high-leverage intellectual capital."
        },
        {
          text: "In the real world, the smartest people are people who make mistakes and learn. In school, the smartest people don't make mistakes.",
          context: "Embrace rapid bugs, failed code, and broken English sentences as the price of true mastery."
        }
      ],
      understandingPoints: [
        {
          title: "The Asset vs. Liability Rule",
          desc: "An asset generates value independently (codebases, software products, scalable skills, investments). A liability consumes money and attention (expensive phones on debt, impulse shopping, endless subscription services). Accumulate assets relentlessly."
        },
        {
          title: "The Two Human Emotions: Fear and Greed",
          desc: "Fear of being without money drives people to work frantically at jobs they dislike. Greed or desire prompts them to blow their salary on shiny consumer goods, forcing them back into fear. Break this cycle through financial discipline."
        },
        {
          title: "Skills That Compound for Life",
          desc: "Kiyosaki emphasizes that the most critical real-world skills are never taught in school: financial literacy, technical building, and articulate communication/sales. Your 30-day upgrade routine trains all three simultaneously."
        }
      ],
      content: `In his seminal work 'Rich Dad Poor Dad', Robert Kiyosaki highlights the stark contrast between two mindsets. His biological father, 'Poor Dad', held a PhD, worked tirelessly in government education, and preached: 'Study hard, get good grades, and look for a safe, secure job.' Yet despite his high salary, Poor Dad struggled financially his entire life. Meanwhile, 'Rich Dad', who never completed eighth grade, built an empire of real estate, businesses, and investments.

The core distinction lies in how they defined income. The middle class trades their finite physical hours for a fragile salary. When they stop working, their cash flow immediately ceases. In contrast, the wealthy focus obsessively on acquiring and constructing assets. An asset is anything that deposits cash or compounding value into your pocket whether you are awake or asleep.

For an ambitious student or software engineer, the greatest asset you possess is your brain. When you invest two hours every morning into Python, machine learning algorithms, and fluent English articulation, you are constructing intellectual equity. Code is digital real estate; once written and deployed, software serves millions without requiring your physical presence.

Kiyosaki warns against the 'Rat Race'—the endless loop of earning, spending on lifestyle inflation, and working harder to service bills. Escaping the rat race begins with internal discipline. Treat your daily schedule as an asset management system: protect your focus, reject mindless distraction, and continuously build products that provide lasting value.`,
      keyVocab: ["Liability", "Trajectory", "Pragmatic", "Synthesize"]
    },
    {
      id: "reading-9",
      title: "Atomic Habits: Identity-Based Systems & 1% Compounding",
      bookTitle: "Atomic Habits",
      bookAuthor: "James Clear",
      chapterHighlight: "Chapter 1 & 2: The Surprising Power of Atomic Habits & Identity Shift",
      category: "Book Masterpieces",
      level: "Habit Architecture",
      readTime: "3 min",
      wordCount: 340,
      summary: "How tiny 1% adjustments compound into exponential life transformations, and why systems always defeat fleeting motivation.",
      story: `In 2003, British Cycling was in a pathetic state. In nearly one hundred and ten years, British riders had won only a single gold medal at the Olympic Games. Professional bike manufacturers even refused to sell bikes to the team because they feared it would hurt their reputation.

Then they hired Dave Brailsford as performance director. Brailsford did not implement a radical, painful overnight overhaul. Instead, he committed to a philosophy called 'the aggregation of marginal gains'—searching for a tiny one percent margin of improvement in everything they did. They redesigned bike seats for ergonomics, tested fabrics in wind tunnels, taught riders the best hand-washing techniques to avoid colds, and tested mattresses for optimal sleep. Five years later, the British Cycling team dominated the 2008 Beijing Olympics, winning sixty percent of available gold medals, and went on to win six Tour de France victories in seven years.`,
      quotes: [
        {
          text: "You do not rise to the level of your goals. You fall to the level of your systems.",
          context: "Having ambitious goals is easy; engineering a watertight daily timetable is what actually produces results."
        },
        {
          text: "Every action you take is a vote for the type of person you wish to become.",
          context: "Each completed task card is undeniable proof of your emerging high-performance identity."
        },
        {
          text: "If you can get 1% better each day for one year, you'll end up thirty-seven times better by the time you're done.",
          context: "Compounding mathematics rewards patience and penalizes erratic sporadic sprints."
        },
        {
          text: "The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.",
          context: "Shift from outcome-based thinking to deep identity-based transformation."
        }
      ],
      understandingPoints: [
        {
          title: "The Plateau of Latent Potential",
          desc: "When you start a new routine, progress is invisible for weeks. This is the 'Valley of Disappointment'. Think of heating an ice cube: from 25°F to 31°F, nothing changes visibly. But at 32°F, the ice suddenly melts. Your daily work is accumulating energy beneath the surface."
        },
        {
          title: "Identity-Based Habits",
          desc: "Never tell yourself 'I am trying to learn coding' or 'I am trying to speak English.' Instead assert: 'I am a software engineer' and 'I am an articulate communicator.' Your behaviors naturally realign to match your self-image."
        },
        {
          title: "The 4 Laws of Behavior Change",
          desc: "To build a great habit: Make it Obvious, Make it Attractive, Make it Easy, and Make it Satisfying. To break bad habits (like morning phone addiction), make them Invisible and Difficult."
        }
      ],
      content: `In 'Atomic Habits', James Clear presents a revolutionary framework for personal transformation. Society romanticizes quantum leaps and dramatic overnight success stories, but sustainable greatness is built upon the quiet accumulation of microscopic decisions.

Consider the mathematics: if you improve by just one percent each day, the compounding multiplier (1.01 raised to the power of 365) means you will be thirty-seven times better after twelve months. Conversely, if you decline by one percent each day, you spiral downward almost to zero.

Clear emphasizes that setting goals is fundamentally overrated. Winners and losers in every domain share the exact same ambitions. The differentiator is never the goal; it is the precision of the operating system. Your 30-Day Upgrade Routine is that exact system. It removes decision fatigue by prescribing exact time slots for breathing, AI deep study, coding, and English practice.

Furthermore, true behavioral change must be anchored in identity. When you check off your tasks each day, you are not merely completing chores; you are casting tangible votes for your future self. Over thirty days, these aggregated votes create an unshakeable belief that you are a disciplined, elite technical professional.`,
      keyVocab: ["Trajectory", "Compounding", "Aggregation", "Momentum"]
    },
    {
      id: "reading-10",
      title: "Man's Search for Meaning: The Ultimate Human Freedom",
      bookTitle: "Man's Search for Meaning",
      bookAuthor: "Viktor E. Frankl",
      chapterHighlight: "Part 1: Experiences in a Concentration Camp & Logotherapy",
      category: "Book Masterpieces",
      level: "Unshakeable Resilience",
      readTime: "3.5 min",
      wordCount: 360,
      summary: "How psychiatrist Viktor Frankl survived the horrors of Auschwitz by discovering that human dignity and purpose can never be stripped away.",
      story: `In 1942, prominent Viennese psychiatrist Viktor Frankl was arrested alongside his wife and parents, stripped of all possessions, and transported into the dark abyss of Nazi concentration camps, including Auschwitz and Dachau. He endured freezing winters in rags, brutal forced labor with frostbitten feet, and starved on a single piece of bread and watery soup per day. His parents, brother, and pregnant wife were all murdered.

Yet amidst this unspeakable dehumanization, Frankl observed a profound psychological phenomenon: those who surrendered to hopelessness succumbed within days, while those who held onto an inner purpose—a book to write, a loved one to reunite with, an unshakeable moral dignity—possessed extraordinary physical endurance. One freezing dawn, marching under rifle point, Frankl communed with the image of his wife and realized the timeless truth: love is the ultimate and highest goal to which man can aspire, and suffering ceases to be suffering the moment it finds meaning.`,
      quotes: [
        {
          text: "Everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances, to choose one's own way.",
          context: "Circumstances do not define you; your conscious chosen response defines you."
        },
        {
          text: "Those who have a 'why' to live, can bear with almost any 'how.'",
          context: "Anchor your 30-day routine to a sacred purpose: your family, your career, your growth."
        },
        {
          text: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.",
          context: "Pause before frustration or laziness. Choose self-mastery over impulse."
        },
        {
          text: "When we are no longer able to change a situation, we are challenged to change ourselves.",
          context: "Stop complaining about difficult exam questions or complex code. Level up yourself."
        }
      ],
      understandingPoints: [
        {
          title: "The Stimulus-Response Space",
          desc: "Animals react automatically to stimuli (hunger → eat; pain → lash out). Humans possess self-awareness. When your alarm rings at 6:00 AM (stimulus), you have a sacred space of choice. Do not react with snooze; step into that space and choose discipline."
        },
        {
          title: "Tragic Optimism",
          desc: "Frankl calls for 'tragic optimism'—the capacity to remain hopeful, productive, and kind even in the face of suffering, guilt, and human mortality. View every difficult coding bug or stressful day as an invitation to deepen your character."
        },
        {
          title: "The 3 Sources of Meaning",
          desc: "According to Logotherapy, meaning is discovered in three places: 1) Creating a work or doing a deed (your projects and code); 2) Experiencing something or encountering someone (nature, art, love); and 3) The attitude we take toward unavoidable suffering."
        }
      ],
      content: `Viktor Frankl's 'Man's Search for Meaning' stands as one of the most enduring psychological masterworks in human history. Written in nine breathless days following his liberation from the concentration camps, the book offers a profound blueprint for psychological sovereignty.

Frankl posited that man's deepest drive is not the pursuit of pleasure (as Freud argued) nor the pursuit of power (as Adler believed), but the 'will to meaning'. In our comfortable modern world, many students suffer not from physical hardship, but from what Frankl diagnosed as an 'existential vacuum'—a pervasive sense of boredom, aimlessness, and lack of purpose that leads to mindless phone scrolling and procrastination.

The antidote to the existential vacuum is deliberate responsibility. When you dedicate yourself to mastering technical craftsmanship, solving meaningful software problems, and honoring your biological wellness, your daily hours become infused with purpose.

Whenever you face internal resistance—whether it is cold morning air, a perplexing bug in your neural network, or awkward pauses in your English speaking practice—remember Frankl's supreme insight: you alone hold the sovereign power to choose your attitude. Difficulties are not barriers to your life; they are the very raw material from which your character is sculpted.`,
      keyVocab: ["Sovereignty", "Endurance", "Resilient", "Fortitude"]
    },
    {
      id: "reading-11",
      title: "Deep Work: Attention Capital & The Superpower of Focus",
      bookTitle: "Deep Work",
      bookAuthor: "Cal Newport",
      chapterHighlight: "Chapter 1: Deep Work is Valuable, Rare, and Meaningful",
      category: "Book Masterpieces",
      level: "Cognitive Mastery",
      readTime: "3 min",
      wordCount: 335,
      summary: "Why the ability to concentrate deeply without distraction is becoming the rarest and most lucrative competitive advantage in the modern economy.",
      story: `In the 1920s, renowned psychiatrist Carl Jung found himself engulfed by demanding clinical duties, correspondence, and public lectures in Zurich. To formulate his most radical psychological concepts, Jung realized that city noise and social demands were fracturing his cognitive depth.

He traveled to the shores of Lake Zurich in the village of Bollingen and built a two-story stone tower with his own hands. It had no electricity, no telephone, and no external interruptions. Jung would wake early, make his own fire, brew coffee, and retreat to an isolated private room on the second floor to write for hours in absolute silence. This dedicated fortress of solitude enabled Jung to produce the groundbreaking ideas that revolutionized analytical psychology.`,
      quotes: [
        {
          text: "To produce at your peak level you need to work for extended periods with full concentration on a single task free from distraction.",
          context: "Half-hearted multitasking produces mediocre, buggy code."
        },
        {
          text: "The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy.",
          context: "While the masses drown in TikTok and Reels, the student who can focus for 90 minutes becomes unstoppable."
        },
        {
          text: "Clarity about what matters provides clarity about what does not.",
          context: "Ruthlessly eliminate low-value meetings, notifications, and gossip."
        },
        {
          text: "Deep work is not some nostalgic affectation of writers and early-twentieth-century philosophers. It is instead an indispensable skill.",
          context: "Treat focused attention like a professional athlete treats physical training."
        }
      ],
      understandingPoints: [
        {
          title: "The Law of Attention Residue",
          desc: "When you switch from writing Python code to quickly checking WhatsApp or Discord for 15 seconds, your attention does not switch back immediately. A thick 'residue' of mental distraction lingers, degrading your problem-solving capacity for up to 20 minutes."
        },
        {
          title: "Deep vs. Shallow Work",
          desc: "Deep Work consists of professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit (writing algorithms, studying ML). Shallow Work consists of non-cognitively demanding tasks (checking emails, tweaking UI colors, reorganizing folders)."
        },
        {
          title: "Environmental Defense Rituals",
          desc: "Willpower alone is never enough to resist algorithmic temptation. Create physical barriers: place your smartphone in another room during study blocks, use full-screen focus mode, and treat your study desk as an interruption-free zone."
        }
      ],
      content: `In his influential treatise 'Deep Work', Georgetown computer science professor Cal Newport articulates a central economic thesis: the modern workforce is undergoing a profound bifurcation. On one side are the masses whose cognitive capacity is fragmented by infinite feeds, pinging notifications, and shallow reactive communication. On the other side are the elite few who have trained their minds to enter uninterrupted states of deep focus.

High-level software engineering, machine learning modeling, and complex language mastery are non-trivial intellectual endeavors. They demand the sustained firing of complex synaptic circuits. When you permit notifications or social media tabs to intrude upon your study hours, you trigger 'attention residue', severely limiting your working memory and conceptual depth.

Newport emphasizes that the ability to perform deep work is not an innate talent, but a rigorous skill that must be cultivated through deliberate practice. Just as physical athletes build cardiovascular endurance, cognitive athletes must build distraction resistance.

Embrace the 9:00 AM to 12:15 PM deep study blocks in your routine as sacred time. Shut down your messaging apps, activate your focus ambient sound, and give your full, undivided attention to the algorithmic challenge before you. Depth is where real breakthroughs happen.`,
      keyVocab: ["Fortitude", "Fragmentation", "Pragmatic", "Cadence"]
    },
    {
      id: "reading-12",
      title: "The Psychology of Money: Freedom Over Status",
      bookTitle: "The Psychology of Money",
      bookAuthor: "Morgan Housel",
      chapterHighlight: "Chapter 7: Freedom & Chapter 3: Never Enough",
      category: "Book Masterpieces",
      level: "Wisdom & Strategy",
      readTime: "3 min",
      wordCount: 325,
      summary: "Why financial success is driven by behavioral discipline rather than high IQ, and why owning your time is the highest dividend wealth can pay.",
      story: `In 2014, a quiet 92-year-old man named Ronald Read passed away in rural Vermont. To the outside world, Read was completely ordinary: he was the first in his family to graduate high school, worked as a gas station mechanic for twenty-five years, and swept floors as a janitor for seventeen years.

When he died, the local community was stunned to discover that Read had bequeathed six million dollars to his local library and hospital, leaving two million dollars to his stepchildren. He had not won the lottery, nor inherited money. Read simply spent far less than he earned and consistently invested his modest savings into blue-chip stocks for decades, allowing the quiet law of compound interest to multiply his capital. Meanwhile, Harvard-educated executives were filing for bankruptcy because they could not control their ego, greed, and lifestyle inflation.`,
      quotes: [
        {
          text: "The highest form of wealth is the ability to wake up every morning and say, 'I can do whatever I want today.'",
          context: "Autonomy is the ultimate metric of human flourishing."
        },
        {
          text: "Doing well with money has a little to do with how smart you are and a lot to do with how you behave.",
          context: "Emotional self-control beats high intellectual horsepower every single time."
        },
        {
          text: "Spending money to show people how much money you have is the fastest way to have less money.",
          context: "Status flexing is an expensive psychological trap. True wealth is silent."
        },
        {
          text: "Compounding works best when you give an asset years and decades to grow. The real secret is uninterrupted continuity.",
          context: "Rule #1 applies to wealth and skills: never interrupt the compound chain."
        }
      ],
      understandingPoints: [
        {
          title: "Freedom Over Luxury",
          desc: "The greatest intrinsic value of money—far exceeding sports cars or designer clothes—is the ability to control your time. It gives you the power to say 'no' to toxic employers, study what excites you, and live on your own terms."
        },
        {
          title: "The Seduction of 'Never Enough'",
          desc: "Modern social media creates an artificial comparison treadmill. When you compare your behind-the-scenes reality to other people's curated highlight reels, you fall into reckless envy. Define what 'enough' means for your life."
        },
        {
          title: "Reasonable Beats Hyper-Rational",
          desc: "Do not construct a life or study plan that is so extreme that you burn out after seven days. Build a routine that is reasonable, enjoyable, and sustainable over months and years."
        }
      ],
      content: `In 'The Psychology of Money', Morgan Housel dismantles the conventional notion that financial mastery is a branch of mathematics or finance. Instead, wealth is fundamentally a psychological discipline rooted in emotional restraint, patience, and humility.

The story of Ronald Read illustrates the astonishing leverage of compounding continuity. Read did not possess insider Wall Street knowledge or an elite Ivy League pedigree. His competitive advantage was purely behavioral: he mastered his desires, lived simply, and refused to interrupt the compounding process for five consecutive decades.

Conversely, many brilliant engineers and professionals earn exceptional incomes only to remain perpetually stressed and financially trapped. They succumb to lifestyle inflation, upgrading their cars and apartments with every promotion, confusing outward luxury with inward freedom.

As an ambitious student, recognize that technical acumen without emotional self-regulation is dangerous. Cultivate the discipline to live below your means, invest your surplus energy into compounding skills, and remember that true prosperity is measured not by the applause of strangers, but by the sovereign ownership of your daily time.`,
      keyVocab: ["Compounding", "Trajectory", "Pragmatic", "Resilient"]
    }
  ],
  expandedVocabBank: [
    {
      word: "Articulate",
      type: "verb / adj",
      phonetic: "/ɑːrˈtɪk.jə.leɪt/",
      meaning: "Express an idea or feeling fluently and coherently.",
      sentences: [
        "In technical interviews, you must articulate your algorithmic strategy before writing code.",
        "She gave an articulate and persuasive presentation on machine learning ethics.",
        "Practice speaking aloud daily so you can articulate your thoughts without hesitation."
      ]
    },
    {
      word: "Pragmatic",
      type: "adj",
      phonetic: "/præɡˈmæt.ɪk/",
      meaning: "Dealing with things sensibly and realistically based on practical rather than theoretical considerations.",
      sentences: [
        "We took a pragmatic engineering decision to deploy a clean MVP rather than over-engineering.",
        "A pragmatic student schedules breaks and protects sleep instead of pulling exhausting all-nighters.",
        "His pragmatic approach to learning English focused on daily conversational speaking."
      ]
    },
    {
      word: "Synthesize",
      type: "verb",
      phonetic: "/ˈsɪn.θə.saɪz/",
      meaning: "Combine multiple elements, concepts, or ideas into a coherent and unified whole.",
      sentences: [
        "Rule 6 demands that you learn new ideas, build real projects, and synthesize what you know.",
        "The neural network was trained to synthesize audio waveforms with realistic intonation.",
        "After reading three research papers, she synthesized the findings into an actionable summary."
      ]
    },
    {
      word: "Resilient",
      type: "adj",
      phonetic: "/rɪˈzɪl.jənt/",
      meaning: "Able to withstand or recover quickly from difficult conditions, bugs, or setbacks.",
      sentences: [
        "Disciplined students remain resilient even when faced with complex debugging sessions.",
        "He built a resilient data pipeline that automatically handles network disconnections.",
        "Developing a resilient mindset ensures you never allow one bad day to derail your entire month."
      ]
    },
    {
      word: "Ubiquitous",
      type: "adj",
      phonetic: "/juːˈbɪk.wə.təs/",
      meaning: "Present, appearing, or found everywhere at the same time.",
      sentences: [
        "Smartphones and digital notifications have become ubiquitous in modern student life.",
        "Python has become the ubiquitous programming language for data science and AI research.",
        "High-performance habits should become ubiquitous across every hour of your daily routine."
      ]
    },
    {
      word: "Elucidate",
      type: "verb",
      phonetic: "/iˈluː.sə.deɪt/",
      meaning: "To make something clear; explain in lucid detail.",
      sentences: [
        "Can you elucidate how gradient descent optimizes the weights during backpropagation?",
        "The professor used intuitive diagrams to elucidate the intricacies of distributed databases.",
        "Explaining concepts to peers is the most effective way to elucidate gaps in your own understanding."
      ]
    },
    {
      word: "Tenacity",
      type: "noun",
      phonetic: "/təˈnæs.ə.ti/",
      meaning: "The quality or fact of being very determined; persistence; grip.",
      sentences: [
        "Her tenacity in solving Data Structures and Algorithms problems led to multiple top job offers.",
        "Mastering English pronunciation requires relentless daily tenacity over weeks and months.",
        "With unwavering tenacity, he stuck to the 30-day upgrade routine without missing a single block."
      ]
    },
    {
      word: "Paradigm",
      type: "noun",
      phonetic: "/ˈpær.ə.daɪm/",
      meaning: "A typical example, pattern, or overarching framework of ideas.",
      sentences: [
        "Large language models represent a new computing paradigm for human-machine interaction.",
        "Adopting the 30-day discipline protocol shifted his entire psychological paradigm around productivity.",
        "Functional programming offers a completely different paradigm compared to object-oriented code."
      ]
    },
    {
      word: "Cadence",
      type: "noun",
      phonetic: "/ˈkeɪ.dəns/",
      meaning: "A modulation or inflection of the voice; a rhythmic flow of sounds or activity.",
      sentences: [
        "Notice the vocal cadence of native speakers and replicate their pauses during shadowing.",
        "Establishing a steady daily study cadence prevents burnout during exam preparation.",
        "His speech had an engaging cadence that kept the entire engineering team captivated."
      ]
    },
    {
      word: "Fortitude",
      type: "noun",
      phonetic: "/ˈfɔːr.tɪ.tuːd/",
      meaning: "Courage in pain, fatigue, or adversity; mental resilience and strength.",
      sentences: [
        "It takes cognitive fortitude to resist checking your phone during a 90-minute deep study block.",
        "She demonstrated great fortitude while debugging a production error under strict deadlines.",
        "Discipline is the fortitude to execute your routine when motivation has faded."
      ]
    },
    {
      word: "Dissect",
      type: "verb",
      phonetic: "/daɪˈsɛkt/",
      meaning: "Analyze something in minute detail; break down a complex system into components.",
      sentences: [
        "Before writing code, dissect the problem constraints and edge cases carefully.",
        "We dissected the open-source machine learning library to understand its tensor operations.",
        "Dissect your spoken English recordings to identify filler words and rhythm issues."
      ]
    },
    {
      word: "Coherence",
      type: "noun",
      phonetic: "/koʊˈhɪr.əns/",
      meaning: "The quality of being logical, orderly, and clearly connected.",
      sentences: [
        "Structure your technical documentation with coherence so that any newcomer can understand it.",
        "His explanation gained tremendous coherence after he removed unnecessary technical jargon.",
        "Daily reading practice significantly improves the coherence and flow of your spoken English."
      ]
    },
    {
      word: "Calloused",
      type: "adj",
      phonetic: "/ˈkæl.əst/",
      meaning: "Hardened and resilient through repeated exposure to friction, difficulty, or discomfort (from David Goggins' Can't Hurt Me).",
      sentences: [
        "By refusing to touch his phone before deep coding, he developed a calloused mind resistant to cheap dopamine.",
        "Navy SEAL training created a calloused physical and psychological endurance that could not be broken.",
        "Do not run away from challenging algorithmic problems; they are the friction that builds a calloused brain."
      ]
    },
    {
      word: "Liability",
      type: "noun",
      phonetic: "/ˌlaɪ.əˈbɪl.ə.t̬i/",
      meaning: "Something that takes money, focus, or energy away from your long-term growth (from Rich Dad Poor Dad).",
      sentences: [
        "In modern tech, spending five hours a day doomscrolling short videos is your greatest cognitive liability.",
        "Rich Dad taught that an asset generates value, while a liability drains your finite resources.",
        "Untested and unmaintained spaghetti code becomes a costly liability for any engineering team."
      ]
    },
    {
      word: "Trajectory",
      type: "noun",
      phonetic: "/trəˈdʒek.tɚ.i/",
      meaning: "The curved path or long-term direction along which someone or something develops over time.",
      sentences: [
        "James Clear showed that your daily habits determine your ultimate trajectory far more than your current net worth.",
        "Committing to 90 minutes of focused AI study every morning altered the entire trajectory of her career.",
        "Even small 1% daily improvements compound into an astonishing upward life trajectory."
      ]
    },
    {
      word: "Sovereignty",
      type: "noun",
      phonetic: "/ˈsɑːv.rən.ti/",
      meaning: "Supreme independent power and inner authority; total ownership over one's thoughts and choices (from Viktor Frankl).",
      sentences: [
        "Viktor Frankl taught that no external circumstance can steal your inner sovereignty to choose your response.",
        "True wealth is time sovereignty—the absolute freedom to decide what you will create each morning.",
        "Maintaining composure during high-pressure technical presentations demonstrates profound psychological sovereignty."
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.DEFAULT_ROUTINE_DATA = DEFAULT_ROUTINE_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_ROUTINE_DATA };
}

