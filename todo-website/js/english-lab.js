/**
 * English Mastery Hub & Fluency Studio
 * Comprehensive English Learning Engine
 * 1. Interactive Reading Room with Text-to-Speech Aloud Narration & WPM Reading Timer
 * 2. High-Impact Vocabulary Vault with 3 Contextual Sentences & Interactive Sentence Builder
 * 3. Custom Vocabulary Adder (Persisted in localStorage)
 * 4. Audio Speech Voice Recorder (2–5 min speech practice) with Topic Generator & Playback
 * 5. 4-Part Daily English Formula Guide (Listening, Shadowing, Read Aloud, Thinking in English)
 */
class EnglishLab {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioUrl = null;
    this.isRecording = false;
    this.recordingSeconds = 0;
    this.timerInterval = null;

    // Speech synthesis state
    this.speechUtterance = null;
    this.currentlySpeakingPassageId = null;
    this.speechRate = 1.0;

    // Read Aloud Practice Timer state
    this.readingTimers = {}; // { passageId: { startTime, interval, seconds } }

    // Storage for student created sentences and custom words
    this.savedSentences = {};
    this.customWords = [];
    this.activeReadingCategory = 'all';

    // Speaking Topics Bank for Daily Speech Practice
    this.speakingTopics = [
      "Explain how a binary search algorithm works in simple English, as if explaining to a non-technical friend.",
      "Describe what you learned in today's coding or AI/ML session without using slides or notes.",
      "Explain the concept of Neuroplasticity: how your brain physically adapts when you study consistently.",
      "Talk about Rule #1 ('Never miss two days in a row') and why momentum beats occasional intensity.",
      "Describe the difference between supervised and unsupervised machine learning in clear, plain language.",
      "Reflect on a challenging software bug you encountered and the step-by-step logic you used to resolve it.",
      "Explain why deep work and removing phone distractions is a superpower in the modern technology industry.",
      "Imagine you are presenting your portfolio website to a tech recruiter. Deliver your 2-minute elevator pitch.",
      "Describe your ideal morning routine and how physical exercise impacts your mental focus throughout the day.",
      "Explain why Richard Feynman believed that true understanding means being able to explain complex ideas simply.",
      "Discuss how practicing English speaking every single day is transforming your professional confidence.",
      "Explain the concept of time complexity and Big O notation using real-life analogies."
    ];
    this.currentTopicIndex = 0;

    this.loadStorage();

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  loadStorage() {
    try {
      const sentences = localStorage.getItem('aura_english_sentences');
      if (sentences) this.savedSentences = JSON.parse(sentences);

      const custom = localStorage.getItem('aura_custom_vocab');
      if (custom) this.customWords = JSON.parse(custom);
    } catch (e) {
      console.warn('Could not load English lab storage', e);
    }
  }

  saveStorage() {
    try {
      localStorage.setItem('aura_english_sentences', JSON.stringify(this.savedSentences));
      localStorage.setItem('aura_custom_vocab', JSON.stringify(this.customWords));
    } catch (e) {
      console.warn('Could not save English lab storage', e);
    }
  }

  init() {
    this.setupEventListeners();
    this.renderReadingLibrary();
    this.renderVocabVault();
    this.renderBookWisdomVault();
    this.displaySpeakingTopic();
    this.updateStatsBar();
  }

  setupEventListeners() {
    // English Studio Sub-Tab Switcher
    document.querySelectorAll('.english-hub-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.english-hub-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.english-hub-panel').forEach(p => p.classList.remove('active'));
        
        const btn = e.currentTarget;
        btn.classList.add('active');
        const targetId = btn.dataset.target;
        const panel = document.getElementById(targetId);
        if (panel) panel.classList.add('active');
      });
    });

    // Wisdom Book Filter Buttons
    document.querySelectorAll('.wisdom-book-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.wisdom-book-filter').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.renderBookWisdomVault(e.currentTarget.dataset.book || 'all');
      });
    });

    // Voice Recorder Buttons
    const startRecordBtn = document.getElementById('startRecordVoiceBtn');
    const stopRecordBtn = document.getElementById('stopRecordVoiceBtn');
    startRecordBtn?.addEventListener('click', () => this.startRecording());
    stopRecordBtn?.addEventListener('click', () => this.stopRecording());

    // Roll Speaking Topic Button
    document.getElementById('rollTopicBtn')?.addEventListener('click', () => this.rollSpeakingTopic());

    // Reading Category Filter Pills
    document.querySelectorAll('.reading-cat-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        document.querySelectorAll('.reading-cat-pill').forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeReadingCategory = e.currentTarget.dataset.category || 'all';
        this.renderReadingLibrary();
      });
    });

    // Vocab Search Input
    document.getElementById('vocabSearchInput')?.addEventListener('input', (e) => {
      this.renderVocabVault(e.target.value.toLowerCase());
    });

    // Custom Vocab Modal
    document.getElementById('openAddVocabBtn')?.addEventListener('click', () => {
      document.getElementById('customVocabModal')?.classList.add('active');
    });
    document.getElementById('closeCustomVocabBtn')?.addEventListener('click', () => {
      document.getElementById('customVocabModal')?.classList.remove('active');
    });
    document.getElementById('customVocabForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleCustomWordSubmit();
    });
  }

  updateStatsBar() {
    const wordsReadElem = document.getElementById('engStatWordsRead');
    const sentencesWrittenElem = document.getElementById('engStatSentences');
    const speechRecordedElem = document.getElementById('engStatRecordings');

    const totalSentences = Object.keys(this.savedSentences).length;
    const recordingsCount = localStorage.getItem('aura_recordings_count') || '0';

    if (sentencesWrittenElem) sentencesWrittenElem.textContent = totalSentences;
    if (speechRecordedElem) speechRecordedElem.textContent = recordingsCount;
  }

  // ==========================================
  // 1. INTERACTIVE READING ROOM & AUDIO NARRATOR
  // ==========================================
  renderReadingLibrary() {
    const container = document.getElementById('readingPassagesContainer');
    if (!container) return;

    const data = typeof DEFAULT_ROUTINE_DATA !== 'undefined' ? DEFAULT_ROUTINE_DATA : null;
    if (!data || !data.readingLibrary) return;

    let passages = data.readingLibrary;
    if (this.activeReadingCategory !== 'all') {
      passages = passages.filter(p => p.category.toLowerCase().includes(this.activeReadingCategory.toLowerCase()));
    }

    if (passages.length === 0) {
      container.innerHTML = `
        <div class="reading-empty-state">
          <p>No passages found for category "${this.activeReadingCategory}".</p>
          <button class="btn-ghost" onclick="window.englishLab.setReadingCategory('all')">Show All Passages</button>
        </div>
      `;
      return;
    }

    container.innerHTML = passages.map(passage => {
      const isSpeaking = this.currentlySpeakingPassageId === passage.id;
      const isTimerActive = !!this.readingTimers[passage.id];
      const timerSecs = this.readingTimers[passage.id]?.seconds || 0;
      const mins = Math.floor(timerSecs / 60);
      const secs = timerSecs % 60;
      const timerDisplay = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
      const isBook = !!passage.bookTitle;

      return `
        <article class="reading-pass-card ${isSpeaking ? 'speaking-active' : ''} ${isBook ? 'is-book-masterpiece' : ''}" id="card-${passage.id}">
          
          ${isBook ? `
            <div class="book-masterpiece-banner">
              <div class="book-banner-left">
                <span class="book-tag">📖 MASTERPIECE EXTRACT</span>
                <span class="book-title-highlight">${passage.bookTitle}</span>
                <span class="book-author-text">by ${passage.bookAuthor}</span>
              </div>
              <div class="book-chapter-badge">
                <span>🔖 ${passage.chapterHighlight}</span>
              </div>
            </div>
          ` : ''}

          <div class="reading-pass-header">
            <div class="reading-pass-meta-row">
              <span class="reading-badge-cat">${passage.category}</span>
              <span class="reading-badge-level">⚡ ${passage.level}</span>
              <span class="reading-badge-time">⏱️ ${passage.readTime} (~${passage.wordCount} words)</span>
            </div>

            <h3 class="reading-pass-title">${passage.title}</h3>
            <p class="reading-pass-summary">${passage.summary}</p>
          </div>

          <!-- Narration & Aloud Controls Bar -->
          <div class="reading-action-toolbar">
            
            <div class="narration-left-group">
              <button class="btn-audio-listen ${isSpeaking ? 'active' : ''}" onclick="window.englishLab.togglePassageSpeech('${passage.id}')">
                ${isSpeaking ? '⏹ Stop Audio' : '🎧 Listen Aloud (Native Voice)'}
              </button>

              <div class="speed-selector-group">
                <span class="speed-label">Speed:</span>
                <button class="btn-speed ${this.speechRate === 0.8 ? 'active' : ''}" onclick="window.englishLab.setSpeechRate(0.8, '${passage.id}')">0.8x</button>
                <button class="btn-speed ${this.speechRate === 1.0 ? 'active' : ''}" onclick="window.englishLab.setSpeechRate(1.0, '${passage.id}')">1.0x</button>
                <button class="btn-speed ${this.speechRate === 1.25 ? 'active' : ''}" onclick="window.englishLab.setSpeechRate(1.25, '${passage.id}')">1.25x</button>
              </div>
            </div>

            <!-- Read Aloud Practice Timer (WPM Measurement) -->
            <div class="read-aloud-timer-box">
              <span class="timer-tag">Read Aloud Timer:</span>
              <span class="timer-digits" id="readTimer-${passage.id}">${timerDisplay}</span>
              ${!isTimerActive ? `
                <button class="btn-timer-toggle start" onclick="window.englishLab.startReadAloudTimer('${passage.id}')">
                  ▶ Start Reading Aloud
                </button>
              ` : `
                <button class="btn-timer-toggle stop" onclick="window.englishLab.stopReadAloudTimer('${passage.id}', ${passage.wordCount})">
                  ⏹ Done Reading (Calculate WPM)
                </button>
              `}
            </div>

          </div>

          <!-- Iconic Quotes Callout Box (if available in passage) -->
          ${passage.quotes && passage.quotes.length > 0 ? `
            <div class="book-quotes-container">
              <div class="quotes-header-row">
                <span class="quotes-lead">💬 Iconic Lines & Quotes to Speak Aloud:</span>
                <span class="quotes-hint">Read aloud to build vocal authority & articulation</span>
              </div>
              <div class="quotes-grid">
                ${passage.quotes.map(q => `
                  <div class="book-quote-card">
                    <div class="quote-text-wrap">
                      <span class="quote-mark">“</span>
                      <p class="quote-line">${q.text}</p>
                    </div>
                    <div class="quote-context-row">
                      <span class="quote-context">💡 <em>${q.context}</em></span>
                      <div class="quote-actions">
                        <button class="btn-quote-action" onclick="window.englishLab.speakText('${q.text.replace(/'/g, "\\'")}')" title="Listen to this line">
                          🔊 Listen
                        </button>
                        <button class="btn-quote-action" onclick="window.englishLab.copyQuote('${q.text.replace(/'/g, "\\'")}')" title="Copy quote">
                          📋 Copy
                        </button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Deep Understanding & Mental Models Breakdown -->
          ${passage.understandingPoints && passage.understandingPoints.length > 0 ? `
            <div class="book-understanding-container">
              <div class="understanding-header">
                <span class="understanding-icon">🧠</span>
                <h4>Deep Understanding & Mental Models (For Reading & Life):</h4>
              </div>
              <div class="understanding-cards-row">
                ${passage.understandingPoints.map(pt => `
                  <div class="understanding-card">
                    <strong class="understanding-title">${pt.title}</strong>
                    <p class="understanding-desc">${pt.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Key Vocabulary Pills -->
          <div class="reading-vocab-pills-row">
            <span class="vocab-lead-text">💎 Key Vocabulary:</span>
            <div class="vocab-tag-cluster">
              ${passage.keyVocab.map(v => `
                <button class="vocab-jump-chip" onclick="window.englishLab.highlightVocabWord('${v}')" title="Click to view word definition & 3 sentences">
                  ${v} ➔
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Reading Content Body -->
          <div class="reading-body-text">
            ${passage.content.split('\n\n').map(para => `<p>${para}</p>`).join('')}
          </div>

          <!-- Footer & XP Rewards -->
          <div class="reading-pass-footer">
            <div class="footer-tip">
              💡 <em>Practice Shadowing: Read aloud simultaneously to match pitch, rhythm, and pauses.</em>
            </div>
            <button class="btn-complete-reading" onclick="window.englishLab.markPassageRead('${passage.id}')">
              ✓ Completed Reading Practice (+30 XP)
            </button>
          </div>

        </article>
      `;
    }).join('');
  }

  setReadingCategory(category) {
    this.activeReadingCategory = category;
    document.querySelectorAll('.reading-cat-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.category === category);
    });
    this.renderReadingLibrary();
  }

  setSpeechRate(rate, passageId) {
    this.speechRate = rate;
    if (this.currentlySpeakingPassageId === passageId) {
      this.stopPassageSpeech();
      this.speakPassage(passageId);
    } else {
      this.renderReadingLibrary();
    }
  }

  togglePassageSpeech(passageId) {
    if (this.currentlySpeakingPassageId === passageId) {
      this.stopPassageSpeech();
    } else {
      this.speakPassage(passageId);
    }
  }

  speakPassage(passageId) {
    this.stopPassageSpeech();

    const data = typeof DEFAULT_ROUTINE_DATA !== 'undefined' ? DEFAULT_ROUTINE_DATA : null;
    const passage = data?.readingLibrary?.find(p => p.id === passageId);
    if (!passage || !('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }

    this.speechUtterance = new SpeechSynthesisUtterance(passage.content);
    this.speechUtterance.lang = 'en-US';
    this.speechUtterance.rate = this.speechRate;
    this.speechUtterance.pitch = 1.0;

    this.currentlySpeakingPassageId = passageId;
    this.speechUtterance.onend = () => {
      this.currentlySpeakingPassageId = null;
      this.renderReadingLibrary();
    };
    this.speechUtterance.onerror = () => {
      this.currentlySpeakingPassageId = null;
      this.renderReadingLibrary();
    };

    window.speechSynthesis.speak(this.speechUtterance);
    this.renderReadingLibrary();
  }

  stopPassageSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentlySpeakingPassageId = null;
    this.speechUtterance = null;
    this.renderReadingLibrary();
  }

  startReadAloudTimer(passageId) {
    if (this.readingTimers[passageId]) {
      clearInterval(this.readingTimers[passageId].interval);
    }

    this.readingTimers[passageId] = {
      seconds: 0,
      interval: setInterval(() => {
        if (this.readingTimers[passageId]) {
          this.readingTimers[passageId].seconds++;
          const elem = document.getElementById(`readTimer-${passageId}`);
          if (elem) {
            const s = this.readingTimers[passageId].seconds;
            const mins = Math.floor(s / 60);
            const secs = s % 60;
            elem.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
          }
        }
      }, 1000)
    };
    this.renderReadingLibrary();
  }

  stopReadAloudTimer(passageId, wordCount) {
    const timerData = this.readingTimers[passageId];
    if (!timerData) return;

    clearInterval(timerData.interval);
    const elapsedSeconds = Math.max(5, timerData.seconds);
    delete this.readingTimers[passageId];

    // Calculate words per minute
    const wpm = Math.round((wordCount / elapsedSeconds) * 60);

    if (window.soundEngine) window.soundEngine.play('complete');
    if (window.gamification) {
      window.gamification.awardXP(35, `Read aloud at ${wpm} Words Per Minute`);
    }

    alert(`🎉 Great Vocal Practice!\n\nYou read ${wordCount} words in ${elapsedSeconds} seconds.\nCalculated Reading Speed: ${wpm} WPM (Words Per Minute).\n+35 XP Earned!`);
    this.renderReadingLibrary();
  }

  markPassageRead(passageId) {
    if (window.soundEngine) window.soundEngine.play('complete');
    if (window.gamification) {
      window.gamification.awardXP(30, 'Completed English Reading Practice');
    }
    if (window.app && typeof window.app.completeTaskById === 'function') {
      window.app.completeTaskById('task-22');
    }

    const card = document.getElementById(`card-${passageId}`);
    if (card) {
      card.classList.add('completed-flash');
      setTimeout(() => card.classList.remove('completed-flash'), 1200);
    }

    alert("✓ Reading Practice Completed! +30 XP Awarded to your profile.");
  }

  // ==========================================
  // 2. VOCABULARY VAULT & 3-SENTENCE BUILDER
  // ==========================================
  renderVocabVault(searchQuery = '') {
    const container = document.getElementById('vocabVaultContainer');
    if (!container) return;

    const data = typeof DEFAULT_ROUTINE_DATA !== 'undefined' ? DEFAULT_ROUTINE_DATA : null;
    let allWords = [...(data?.expandedVocabBank || []), ...this.customWords];

    if (searchQuery) {
      allWords = allWords.filter(w => 
        w.word.toLowerCase().includes(searchQuery) ||
        w.meaning.toLowerCase().includes(searchQuery) ||
        w.sentences.some(s => s.toLowerCase().includes(searchQuery))
      );
    }

    if (allWords.length === 0) {
      container.innerHTML = `
        <div class="vocab-empty-view">
          <p>No vocabulary words match "${searchQuery}".</p>
          <button class="btn-ghost" onclick="window.englishLab.clearVocabSearch()">Clear Search</button>
        </div>
      `;
      return;
    }

    container.innerHTML = allWords.map(item => {
      const studentSentence = this.savedSentences[item.word] || '';
      return `
        <div class="vocab-card-box" id="vocab-${item.word}">
          
          <div class="vocab-card-header">
            <div class="vocab-title-block">
              <div class="vocab-word-row">
                <h3 class="vocab-name">${item.word}</h3>
                <span class="vocab-phonetic">${item.phonetic || ''}</span>
                <span class="vocab-part-of-speech">${item.type}</span>
              </div>
              <p class="vocab-meaning"><strong>Definition:</strong> ${item.meaning}</p>
            </div>

            <button class="btn-audio-pronounce" onclick="window.englishLab.speakWord('${item.word}')" title="Listen to pronunciation">
              🔊 Pronounce
            </button>
          </div>

          <!-- 3 Contextual Example Sentences -->
          <div class="vocab-sentences-card">
            <h4 class="sentences-title">3 Contextual Real-World Sentences:</h4>
            
            <div class="sentences-trio-list">
              <div class="sentence-box s-tech">
                <div class="sentence-badge-pill"><span class="badge-dot"></span> 💻 Tech & Engineering</div>
                <p class="sentence-text">"${item.sentences[0] || ''}"</p>
              </div>

              <div class="sentence-box s-daily">
                <div class="sentence-badge-pill"><span class="badge-dot"></span> ☕ Daily Conversation</div>
                <p class="sentence-text">"${item.sentences[1] || ''}"</p>
              </div>

              <div class="sentence-box s-mindset">
                <div class="sentence-badge-pill"><span class="badge-dot"></span> 🧠 Growth Mindset</div>
                <p class="sentence-text">"${item.sentences[2] || ''}"</p>
              </div>
            </div>
          </div>

          <!-- Interactive Student Sentence Practice Builder -->
          <div class="student-practice-panel">
            <div class="practice-heading-row">
              <label for="input-sent-${item.word}" class="practice-label">
                ✍️ Write Your Own Original Sentence with <strong>"${item.word}"</strong>:
              </label>
              <span class="practice-xp-tag">+25 XP</span>
            </div>

            <div class="practice-input-group">
              <input type="text" 
                     id="input-sent-${item.word}" 
                     value="${studentSentence}" 
                     placeholder="Type a sentence you would actually say aloud..." 
                     class="student-text-input"
                     onkeydown="if(event.key==='Enter') window.englishLab.handleSentenceSubmit('${item.word}')">
              
              <button class="btn-save-practice" onclick="window.englishLab.handleSentenceSubmit('${item.word}')">
                Save & Earn XP
              </button>
            </div>

            ${studentSentence ? `
              <div class="saved-sentence-flag">
                <span class="check-glyph">✓</span>
                <span class="flag-text"><strong>Your Mastered Sentence:</strong> "${studentSentence}"</span>
              </div>
            ` : ''}
          </div>

        </div>
      `;
    }).join('');
  }

  clearVocabSearch() {
    const input = document.getElementById('vocabSearchInput');
    if (input) input.value = '';
    this.renderVocabVault('');
  }

  handleSentenceSubmit(word) {
    const input = document.getElementById(`input-sent-${word}`);
    if (input && input.value.trim()) {
      const sentence = input.value.trim();
      this.savedSentences[word] = sentence;
      this.saveStorage();

      if (window.soundEngine) window.soundEngine.play('complete');
      if (window.gamification) {
        window.gamification.awardXP(25, `Wrote sentence for "${word}"`);
      }

      this.updateStatsBar();
      this.renderVocabVault();

      if (window.app && typeof window.app.showToast === 'function') {
        window.app.showToast(`Saved Sentence (+25 XP)`, `Mastered word: "${word}"`);
      }
    }
  }

  speakWord(word) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(word);
    utt.lang = 'en-US';
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
  }

  highlightVocabWord(word) {
    // Switch to English Studio -> Vocab Tab
    if (window.app && typeof window.app.switchView === 'function') {
      window.app.switchView('englishView');
    }

    const vocabTab = document.querySelector('.english-hub-tab[data-target="panelVocab"]');
    if (vocabTab) vocabTab.click();

    setTimeout(() => {
      const card = document.getElementById(`vocab-${word}`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('glow-highlight-pulse');
        setTimeout(() => card.classList.remove('glow-highlight-pulse'), 3000);
      }
    }, 200);
  }

  handleCustomWordSubmit() {
    const wordInput = document.getElementById('customWordInput');
    const meaningInput = document.getElementById('customMeaningInput');
    const typeInput = document.getElementById('customTypeInput');
    const s1Input = document.getElementById('customS1Input');
    const s2Input = document.getElementById('customS2Input');
    const s3Input = document.getElementById('customS3Input');

    if (!wordInput || !meaningInput || !wordInput.value.trim() || !meaningInput.value.trim()) {
      alert("Please fill in the Word and Meaning fields.");
      return;
    }

    const newWord = {
      word: wordInput.value.trim(),
      type: typeInput ? typeInput.value : 'noun / verb',
      phonetic: '',
      meaning: meaningInput.value.trim(),
      sentences: [
        s1Input?.value.trim() || `I used the word ${wordInput.value.trim()} in my technical work.`,
        s2Input?.value.trim() || `In daily conversation, ${wordInput.value.trim()} helps communicate clearly.`,
        s3Input?.value.trim() || `Mastering ${wordInput.value.trim()} elevates your professional fluency.`
      ]
    };

    this.customWords.unshift(newWord);
    this.saveStorage();

    if (window.soundEngine) window.soundEngine.play('complete');
    if (window.gamification) {
      window.gamification.awardXP(40, `Added custom vocabulary: ${newWord.word}`);
    }

    // Reset form and close modal
    document.getElementById('customVocabForm')?.reset();
    document.getElementById('customVocabModal')?.classList.remove('active');
    this.renderVocabVault();
  }

  // ==========================================
  // 3. DAILY SPEECH VOICE RECORDER & TOPICS
  // ==========================================
  displaySpeakingTopic() {
    const topicElem = document.getElementById('speakingTopicText');
    if (topicElem) {
      topicElem.textContent = this.speakingTopics[this.currentTopicIndex];
    }
  }

  rollSpeakingTopic() {
    this.currentTopicIndex = (this.currentTopicIndex + 1) % this.speakingTopics.length;
    this.displaySpeakingTopic();
    if (window.soundEngine) window.soundEngine.play('tick');
  }

  async startRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Microphone access is not supported on this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioUrl = URL.createObjectURL(audioBlob);
        this.renderPlaybackUI();
        this.onRecordingCompleted();
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this.recordingSeconds = 0;

      // UI state
      document.getElementById('voiceRecordControls')?.classList.add('recording');
      const timeElem = document.getElementById('voiceRecordTimer');
      if (timeElem) timeElem.textContent = "00:00";

      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        this.recordingSeconds++;
        const mins = Math.floor(this.recordingSeconds / 60);
        const secs = this.recordingSeconds % 60;
        if (timeElem) {
          timeElem.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
      }, 1000);

    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Please grant microphone permissions in your browser.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      this.isRecording = false;
      clearInterval(this.timerInterval);
      document.getElementById('voiceRecordControls')?.classList.remove('recording');
    }
  }

  renderPlaybackUI() {
    const container = document.getElementById('voicePlaybackContainer');
    if (!container || !this.audioUrl) return;

    container.innerHTML = `
      <div class="voice-audio-playback-card">
        <div class="playback-header">
          <span class="playback-badge">🎙️ Recorded Speech Practice (${this.recordingSeconds}s)</span>
          <span class="playback-timestamp">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        
        <audio controls class="native-audio-player" src="${this.audioUrl}"></audio>
        
        <div class="playback-actions-bar">
          <a href="${this.audioUrl}" download="English_Speech_Practice_${Date.now()}.webm" class="btn-download-recording">
            💾 Download Audio File
          </a>
          <span class="playback-critique-hint">
            💡 Rule #3: Mistakes are allowed — silence is not! Listen back to observe your vocal rhythm and confidence.
          </span>
        </div>
      </div>
    `;
  }

  onRecordingCompleted() {
    if (window.soundEngine) window.soundEngine.play('complete');

    // Update recordings count
    const count = parseInt(localStorage.getItem('aura_recordings_count') || '0', 10) + 1;
    localStorage.setItem('aura_recordings_count', count.toString());

    if (window.gamification) {
      window.gamification.awardXP(50, 'Recorded English Speaking Practice');
      window.gamification.unlockBadge('badge-polyglot');
    }

    if (window.app && typeof window.app.completeTaskById === 'function') {
      window.app.completeTaskById('task-17'); // 5:20 PM English speaking task
    }

    // Mark habit item 5 (English Practice)
    const chk5 = document.getElementById('chk-item-chk-5');
    if (chk5 && !chk5.checked) {
      chk5.checked = true;
      chk5.dispatchEvent(new Event('change'));
    }

    this.updateStatsBar();
  }

  // ==========================================
  // 5. BOOK WISDOM VAULT & DAILY MINDSET QUOTES
  // ==========================================
  renderBookWisdomVault(filter = 'all') {
    const container = document.getElementById('wisdomQuotesGrid');
    if (!container) return;

    const data = typeof DEFAULT_ROUTINE_DATA !== 'undefined' ? DEFAULT_ROUTINE_DATA : null;
    if (!data || !data.bookWisdomQuotes) return;

    let list = data.bookWisdomQuotes;
    if (filter !== 'all') {
      list = list.filter(q => q.book.toLowerCase().includes(filter.toLowerCase()));
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="wisdom-empty-state">
          <p>No quotes found for "${filter}".</p>
          <button class="btn-ghost" onclick="window.englishLab.setWisdomFilter('all')">View All Quotes</button>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="wisdom-quote-card">
        <div class="wisdom-card-top">
          <span class="wisdom-book-badge">📖 ${item.book}</span>
          <span class="wisdom-author-badge">by ${item.author}</span>
        </div>

        <div class="wisdom-quote-body">
          <span class="wisdom-quote-mark">“</span>
          <p class="wisdom-quote-text">${item.quote}</p>
        </div>

        <div class="wisdom-lesson-box">
          <strong class="lesson-label">🎯 Actionable Mindset Lesson:</strong>
          <p class="lesson-text">${item.lesson}</p>
        </div>

        <div class="wisdom-card-footer">
          <button class="btn-wisdom-action speak" onclick="window.englishLab.speakText('${item.quote.replace(/'/g, "\\'")}')" title="Listen to this line aloud">
            🔊 Listen
          </button>
          <button class="btn-wisdom-action copy" onclick="window.englishLab.copyQuote('${item.quote.replace(/'/g, "\\'")}')" title="Copy quote to clipboard">
            📋 Copy Quote
          </button>
        </div>
      </div>
    `).join('');
  }

  setWisdomFilter(book) {
    document.querySelectorAll('.wisdom-book-filter').forEach(btn => {
      btn.classList.toggle('active', (btn.dataset.book || 'all') === book);
    });
    this.renderBookWisdomVault(book);
  }

  speakText(text) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.speechRate || 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  copyQuote(text) {
    const cleanText = text.replace(/&quot;/g, '"');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanText).then(() => {
        if (window.audioNotifier) {
          window.audioNotifier.showToast('✓ Quote copied to clipboard!', 'info');
          if (window.soundEngine) window.soundEngine.play('click');
        }
      }).catch(() => {
        if (window.audioNotifier) window.audioNotifier.showToast('✓ Quote copied!', 'info');
      });
    } else {
      if (window.audioNotifier) window.audioNotifier.showToast('✓ Quote copied!', 'info');
    }
  }
}

if (typeof window !== 'undefined') {
  window.englishLab = new EnglishLab();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EnglishLab };
}
