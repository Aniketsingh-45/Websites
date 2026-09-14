/**
 * English Speaking Practice Lab & Audio Voice Recorder
 * Provides in-browser speech recording for the 2–5 min requirement,
 * daily vocabulary words, and formula practice integration.
 */
class EnglishLab {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.audioUrl = null;
    this.isRecording = false;
    this.recordingSeconds = 0;
    this.timerInterval = null;

    this.vocabBank = [
      { word: "Articulate", type: "verb / adj", phonetic: "/ɑːrˈtɪk.jə.leɪt/", meaning: "Express an idea fluently and coherently.", sentence: "He was able to articulate the machine learning architecture with exceptional clarity." },
      { word: "Pragmatic", type: "adj", phonetic: "/præɡˈmæt.ɪk/", meaning: "Dealing with things sensibly and realistically based on practical considerations.", sentence: "She took a pragmatic approach to writing clean, maintainable SQL queries." },
      { word: "Elucidate", type: "verb", phonetic: "/iˈluː.sə.deɪt/", meaning: "To make something clear or easy to understand; explain.", sentence: "Can you elucidate how gradient descent optimizes the loss function?" },
      { word: "Resilient", type: "adj", phonetic: "/rɪˈzɪl.jənt/", meaning: "Able to withstand or recover quickly from difficult conditions.", sentence: "A disciplined student is resilient in the face of bug fixes and algorithmic challenges." },
      { word: "Synthesize", type: "verb", phonetic: "/ˈsɪn.θə.saɪz/", meaning: "Combine a number of things into a coherent whole.", sentence: "Rule 6 requires us to synthesize what we learn and explain it aloud in English." },
      { word: "Ubiquitous", type: "adj", phonetic: "/juːˈbɪk.wə.təs/", meaning: "Present, appearing, or found everywhere.", sentence: "Artificial intelligence tools are rapidly becoming ubiquitous in software engineering." },
      { word: "Tenacity", type: "noun", phonetic: "/təˈnæs.ə.ti/", meaning: "The quality of being determined or persistent.", sentence: "Tenacity in daily coding habits builds world-class engineering mastery." }
    ];

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => this.initEventListeners());
    } else {
      this.initEventListeners();
    }
  }

  initEventListeners() {
    // Modal open/close
    const openBtn = document.getElementById('openEnglishLabBtn');
    const closeBtn = document.getElementById('closeEnglishLabModal');
    const modal = document.getElementById('englishLabModal');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        this.renderDailyVocab();
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    // Recorder buttons
    const startRecordBtn = document.getElementById('startRecordVoiceBtn');
    const stopRecordBtn = document.getElementById('stopRecordVoiceBtn');

    if (startRecordBtn) {
      startRecordBtn.addEventListener('click', () => this.startRecording());
    }
    if (stopRecordBtn) {
      stopRecordBtn.addEventListener('click', () => this.stopRecording());
    }
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
      alert('Could not access microphone. Please ensure microphone permissions are granted in browser settings.');
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
      <div class="voice-audio-card">
        <div class="voice-card-header">
          <span class="voice-tag">🎙️ Recorded Session (${this.recordingSeconds}s)</span>
          <span class="voice-date">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <audio controls class="voice-native-player">
          <source src="${this.audioUrl}" type="audio/webm">
          Your browser does not support audio playback.
        </audio>
        <p class="voice-tip-text">💡 <strong>Self-Review Tip:</strong> Notice rhythm, pauses, and clarity. Did you hesitate? Don't worry about minor grammar slips—clarity and confidence come first!</p>
      </div>
    `;
  }

  onRecordingCompleted() {
    if (window.soundEngine) window.soundEngine.play('complete');

    // Award XP
    if (window.gamification) {
      window.gamification.awardXP(50, 'Recorded English Voice Practice');
      window.gamification.unlockBadge('badge-polyglot');
    }

    // Automatically check off task 17 in the routine
    if (window.app && typeof window.app.completeTaskById === 'function') {
      window.app.completeTaskById('task-17');
    }

    // Also check off checklist item 5
    const chk5 = document.getElementById('chk-item-chk-5');
    if (chk5 && !chk5.checked) {
      chk5.checked = true;
      chk5.dispatchEvent(new Event('change'));
    }
  }

  renderDailyVocab() {
    const container = document.getElementById('dailyVocabContainer');
    if (!container) return;

    // Pick 3-4 random or daily words based on day of month
    const day = new Date().getDate();
    const startIndex = day % (this.vocabBank.length - 3);
    const words = this.vocabBank.slice(startIndex, startIndex + 3);

    container.innerHTML = words.map(v => `
      <div class="vocab-word-card">
        <div class="vocab-top">
          <span class="vocab-word">${v.word}</span>
          <span class="vocab-phonetic">${v.phonetic}</span>
          <span class="vocab-type">${v.type}</span>
        </div>
        <p class="vocab-meaning"><strong>Definition:</strong> ${v.meaning}</p>
        <p class="vocab-sentence"><strong>Example:</strong> "${v.sentence}"</p>
      </div>
    `).join('');
  }
}

if (typeof window !== 'undefined') {
  window.englishLab = new EnglishLab();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EnglishLab };
}
