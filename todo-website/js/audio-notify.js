/**
 * Audio & Notification Engine using HTML5 Web Audio API and Notification API
 * Zero external audio files required - 100% reliable offline sound synthesis.
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

  // Play synthesized acoustic effects
  play(type = 'chime') {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const now = ctx.currentTime;

    switch (type) {
      case 'complete': {
        // High-tech crisp achievement chime (E5 -> G#5 -> B5 arpeggio)
        const notes = [659.25, 830.61, 987.77];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0, now + idx * 0.08);
          gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.5);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.55);
        });
        break;
      }

      case 'levelUp': {
        // Grand futuristic level up / achievement fanfare
        const notes = [440, 554.37, 659.25, 880, 1108.73];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.09);

          gain.gain.setValueAtTime(0, now + idx * 0.09);
          gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.09 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.7);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.09);
          osc.stop(now + idx * 0.09 + 0.75);
        });
        break;
      }

      case 'waterDrop': {
        // Realistic bubbling water droplet sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(1250, now + 0.09);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }

      case 'rest':
      case 'eyeRest': {
        // Deep zen singing bowl / gentle gong for screen break & posture
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(288, now); // D4
        osc2.frequency.setValueAtTime(432, now); // A4 harmonic

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.22, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 2.3);
        osc2.stop(now + 2.3);
        break;
      }

      case 'tick': {
        // Soft tactile click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      default: {
        // Gentle modern ping
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
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

    const { soundType = 'chime', icon = 'favicon.ico', body = '', badge = '' } = options;

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

    // 3. Always dispatch in-app toast event
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
