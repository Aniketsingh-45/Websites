/**
 * Audio & Notification Engine using HTML5 Web Audio API and Notification API
 * Zero external audio files required - 100% reliable offline acoustic synthesis.
 */
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.ambientNode = null;
    this.ambientGain = null;
    this.isAmbientPlaying = false;
    this.soundEnabled = true;
    this.loadSettings();
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem('aura_sound_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.soundEnabled = parsed.soundEnabled ?? true;
      }
    } catch (e) {
      console.warn('Could not load sound settings', e);
    }
  }

  saveSettings() {
    try {
      localStorage.setItem('aura_sound_settings', JSON.stringify({
        soundEnabled: this.soundEnabled
      }));
    } catch (e) {
      console.warn('Could not save sound settings', e);
    }
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound(enabled) {
    this.soundEnabled = enabled !== undefined ? enabled : !this.soundEnabled;
    this.saveSettings();
    return this.soundEnabled;
  }

  // Synthesizes custom acoustic notification soundscapes based on type
  play(type = 'info') {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    switch (type) {
      // 1. Task Completed / Habit Checked (Crisp bright 3-note arpeggio)
      case 'complete':
      case 'task_complete': {
        const notes = [659.25, 830.61, 987.77]; // E5, G#5, B5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);

          gain.gain.setValueAtTime(0, now + idx * 0.07);
          gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.07 + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.5);
        });
        break;
      }

      // 2. Success / Data Saved / Formula Score (Bright harmonic chord)
      case 'success': {
        const chords = [523.25, 659.25, 783.99]; // C5, E5, G5
        chords.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);

          gain.gain.setValueAtTime(0, now + idx * 0.05);
          gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.05 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.65);
        });
        break;
      }

      // 3. Level Up / Badge Unlocked / 100% Day (Grand futuristic fanfare)
      case 'levelUp':
      case 'achievement': {
        const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx >= 4 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0, now + idx * 0.08);
          gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.85);
        });
        break;
      }

      // 4. Streak Multiplier / Habit Fire Spark (Rising triple frequency sweep)
      case 'streak': {
        const sparks = [0, 0.09, 0.18];
        sparks.forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const baseFreq = 580 + idx * 240;
          osc.frequency.setValueAtTime(baseFreq, now + delay);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, now + delay + 0.12);

          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.18, now + delay + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.22);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.25);
        });
        break;
      }

      // 5. Next Activity Schedule Transition Alert (Upcoming routine slot alert)
      case 'next_activity':
      case 'activity_transition': {
        const notes = [587.33, 880.00]; // D5 -> A5
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.14);

          gain.gain.setValueAtTime(0, now + idx * 0.14);
          gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.14 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.14 + 0.9);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.14);
          osc.stop(now + idx * 0.14 + 0.95);
        });
        break;
      }

      // 6. Focus Timer Start (High-tech cyber double click)
      case 'timer_start': {
        [0, 0.08].forEach((delay, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(idx === 0 ? 740 : 1100, now + delay);

          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.2, now + delay + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.09);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + 0.1);
        });
        break;
      }

      // 7. Focus Timer Pause (Soft descending cyber chirp)
      case 'timer_pause': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(420, now + 0.14);

        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
        break;
      }

      // 8. Focus Timer Finish / Pomodoro Complete (Soothing resonant focus bell / gong)
      case 'timer_finish':
      case 'alarm': {
        const fundamental = 523.25; // C5
        const harmonic = 1046.50;    // C6
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(fundamental, now);
        osc2.frequency.setValueAtTime(harmonic, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 2.5);
        osc2.stop(now + 2.5);
        break;
      }

      // 9. Water Logged / Hydration Alert (Liquid bubbling water droplet)
      case 'waterDrop':
      case 'hydration': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(1350, now + 0.08);

        gain.gain.setValueAtTime(0.32, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
        break;
      }

      // 10. Eye Rest / Posture / Wellness Alert (Tibetan singing bowl / 432Hz calming gong)
      case 'rest':
      case 'eyeRest':
      case 'wellness':
      case 'posture': {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(288, now); // D4
        osc2.frequency.setValueAtTime(432, now); // A4 432Hz harmonic

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.24, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 2.7);
        osc2.stop(now + 2.7);
        break;
      }

      // 11. Warning / Cautionary Alert (Warm dual-tone reminder)
      case 'warning':
      case 'alert': {
        const notes = [520, 390];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);

          gain.gain.setValueAtTime(0, now + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.12 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.38);
        });
        break;
      }

      // 12. Delete / Discard (Tactile low swoosh)
      case 'delete':
      case 'remove': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }

      // 13. New Day Awakening (Golden sunrise major chord)
      case 'awakening':
      case 'sunrise': {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);

          gain.gain.setValueAtTime(0, now + idx * 0.1);
          gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.1 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 1.3);
        });
        break;
      }

      // 14. Soft UI Tap / Click
      case 'tick': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      // 15. Default Info Modern Glass Ping
      default:
      case 'info':
      case 'chime': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.32);
        break;
      }
    }
  }

  // Ambient sound synthesizer (Binaural Focus Alpha Beats / Soft Rain)
  toggleAmbient(track = 'binaural') {
    this.init();
    if (!this.audioCtx) return false;

    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient(track);
      return true;
    }
  }

  startAmbient(track = 'binaural') {
    this.stopAmbient();
    this.init();
    const ctx = this.audioCtx;

    this.ambientGain = ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.05, ctx.currentTime);
    this.ambientGain.connect(ctx.destination);

    if (track === 'binaural') {
      // Binaural alpha rhythm (200Hz Carrier + 10Hz Alpha difference = 210Hz)
      const merger = ctx.createChannelMerger(2);

      const oscL = ctx.createOscillator();
      oscL.type = 'sine';
      oscL.frequency.setValueAtTime(200, ctx.currentTime);

      const oscR = ctx.createOscillator();
      oscR.type = 'sine';
      oscR.frequency.setValueAtTime(210, ctx.currentTime);

      oscL.connect(merger, 0, 0);
      oscR.connect(merger, 0, 1);

      merger.connect(this.ambientGain);
      oscL.start();
      oscR.start();
      this.ambientNode = { stop: () => { oscL.stop(); oscR.stop(); } };
    } else {
      // White / Pink rain noise generator using AudioBuffer
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filter approximation
        lastOut = (lastOut * 0.95) + (white * 0.05);
        data[i] = lastOut * 1.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      noise.connect(filter);
      filter.connect(this.ambientGain);
      noise.start();
      this.ambientNode = noise;
    }

    this.isAmbientPlaying = true;
    return true;
  }

  stopAmbient() {
    if (this.ambientNode) {
      try {
        this.ambientNode.stop();
      } catch (e) { }
      this.ambientNode = null;
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch (e) { }
      this.ambientGain = null;
    }
    this.isAmbientPlaying = false;
  }
}

/**
 * System Push & In-App Notification Manager
 */
class NotificationEngine {
  constructor(soundEngine) {
    this.soundEngine = soundEngine;
    this.permission = 'default';
    this.enabled = true;
    this.loadSettings();
    this.checkPermission();
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem('aura_notifications_enabled');
      if (saved !== null) {
        this.enabled = saved === 'true';
      } else {
        this.enabled = true;
      }
    } catch (e) {
      this.enabled = true;
    }
  }

  saveSettings() {
    try {
      localStorage.setItem('aura_notifications_enabled', this.enabled ? 'true' : 'false');
    } catch (e) {}
  }

  checkPermission() {
    if ('Notification' in window) {
      this.permission = Notification.permission;
    }
  }

  async requestPermission() {
    if (!('Notification' in window)) {
      return false;
    }
    try {
      const result = await Notification.requestPermission();
      this.permission = result;
      return result === 'granted';
    } catch (e) {
      console.warn('Error requesting notifications', e);
      return false;
    }
  }

  async toggleNotifications(forceState = null) {
    if (forceState !== null) {
      this.enabled = !!forceState;
    } else {
      this.enabled = !this.enabled;
    }

    if (this.enabled) {
      if ('Notification' in window && Notification.permission === 'default') {
        await this.requestPermission();
      }
    }

    this.saveSettings();
    window.dispatchEvent(new CustomEvent('notification-state-changed', {
      detail: { enabled: this.enabled }
    }));
    return this.enabled;
  }

  notify(title, options = {}) {
    // If notifications are turned OFF by user, do not send alerts
    if (!this.enabled) return;

    const { soundType = 'info', icon = 'favicon.ico', body = '', badge = '' } = options;

    // 1. Play sound if sound engine is available and active
    if (this.soundEngine) {
      this.soundEngine.play(soundType);
    }

    // 2. System notification if granted and document is hidden or user opted in
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon,
          badge,
          tag: options.tag || 'routine-alert',
          renotify: true
        });
      } catch (e) {
        console.log('Push notification failed, fallback to toast', e);
      }
    }

    // 3. Always dispatch in-app toast event with rich type metadata
    window.dispatchEvent(new CustomEvent('in-app-toast', {
      detail: { title, body, type: soundType }
    }));
  }
}

if (typeof window !== 'undefined') {
  window.soundEngine = new SoundEngine();
  window.notificationEngine = new NotificationEngine(window.soundEngine);
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SoundEngine, NotificationEngine };
}
