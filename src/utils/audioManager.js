/**
 * Romantic Audio Engine with HTML5 Audio and Web Audio API Synthesizer Fallback
 * Ensures music always plays seamlessly without external broken links.
 */

class RomanticAudioManager {
  constructor() {
    this.audioElement = null;
    this.audioCtx = null;
    this.synthInterval = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.25;
    this.mode = 'idle'; // 'file' | 'synth'
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn({
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      mode: this.mode
    }));
  }

  initAudio(audioSrc) {
    if (this.audioElement) return;

    this.audioElement = new Audio();
    this.audioElement.preload = 'none';
    this.audioElement.loop = true;
    this.audioElement.volume = this.volume;
    this.audioElement.src = audioSrc;

    this.audioElement.addEventListener('error', () => {
      console.log('Audio file not found or failed to load. Switching seamlessly to Web Audio Romantic Synthesizer.');
      if (this.isPlaying) {
        this.startSynth();
      }
    });
  }

  async play(audioSrc) {
    this.isPlaying = true;

    // Try HTML5 audio file first
    try {
      this.initAudio(audioSrc);
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.mode = 'file';
        this.notify();
        return;
      }
    } catch {
      // Audio element failed or blocked, fall back to synthesizer
    }

    // Fallback to synthesized romantic acoustic ambience
    this.startSynth();
  }

  startSynth() {
    this.mode = 'synth';
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      this.audioCtx = new AudioContextClass();
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.synthInterval) return;

    // Romantic arpeggio chords in D major / B minor:
    // Notes frequencies (Hz): D3 (146.8), F#3 (185.0), A3 (220.0), C#4 (277.2), D4 (293.7), E4 (329.6), F#4 (369.99), A4 (440.0)
    const chordProgressions = [
      [146.83, 220.00, 277.18, 369.99, 440.00], // Dmaj9
      [123.47, 185.00, 220.00, 293.66, 369.99], // Bm7
      [98.00, 146.83, 196.00, 246.94, 293.66],  // Gmaj7
      [110.00, 164.81, 220.00, 277.18, 329.63]  // Aadd9
    ];

    let chordIdx = 0;
    let noteInChord = 0;

    const playTone = (freq, duration = 2.4) => {
      if (!this.audioCtx || this.isMuted) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      // Soft warm acoustic timbre
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Low pass filter for soft dreaminess
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.audioCtx.currentTime);

      // Gentle plucked envelope
      const now = this.audioCtx.currentTime;
      const vol = this.volume * 0.18; // soft ambient
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(vol, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    };

    // Play next note every 600ms
    this.synthInterval = setInterval(() => {
      if (!this.isPlaying || this.isMuted) return;

      const currentChord = chordProgressions[chordIdx];
      const noteFreq = currentChord[noteInChord];
      playTone(noteFreq, 2.6);

      noteInChord++;
      if (noteInChord >= currentChord.length) {
        noteInChord = 0;
        chordIdx = (chordIdx + 1) % chordProgressions.length;
      }
    }, 620);

    this.notify();
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.notify();
  }

  toggle(audioSrc) {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play(audioSrc);
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
    }
    this.notify();
  }
}

export const audioManager = new RomanticAudioManager();
