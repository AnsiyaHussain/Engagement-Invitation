/**
 * Audio engine: playlist of MP3 files with a built-in synthesizer fallback.
 * Written for iPhone: audio.play() is called straight from the tap.
 */
import { INVITATION_CONFIG } from '../config/invitationConfig';

class RomanticAudioManager {
  constructor() {
    const m = INVITATION_CONFIG.music;
    this.tracks = m.tracks && m.tracks.length
      ? m.tracks
      : [{ title: m.trackTitle, src: m.audioSrc }];
    this.index = 0;
    this.failed = new Set();

    this.audioElement = null;
    this.audioCtx = null;
    this.synthInterval = null;

    this.isPlaying = false;
    this.isMuted = false;
    this.volume = m.defaultVolume ?? 0.28;
    this.volumeSupported = true;
    this.mode = 'idle';
    this.listeners = new Set();
  }

  get title() {
    return this.tracks[this.index]?.title || '';
  }

  get trackCount() {
    return this.tracks.length;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      volumeSupported: this.volumeSupported,
      mode: this.mode,
      title: this.title,
      trackCount: this.trackCount,
    };
    this.listeners.forEach(fn => fn(state));
  }

  /* ---------- file playback ---------- */

  ensureElement() {
    if (this.audioElement) return this.audioElement;

    const el = new Audio();
    el.preload = 'auto';
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', '');
    el.loop = this.tracks.length === 1;
    el.muted = this.isMuted;
    // iPhone ignores audio.volume: detect it so the slider can be hidden
    el.volume = 0.5;
    this.volumeSupported = Math.abs(el.volume - 0.5) < 0.01;
    el.volume = this.volume;

    el.addEventListener('ended', () => this.advance(1));
    el.addEventListener('error', () => this.handleTrackError());

    this.audioElement = el;
    return el;
  }

  loadCurrent() {
    const el = this.ensureElement();
    el.src = this.tracks[this.index].src;
  }

  handleTrackError() {
    this.failed.add(this.index);
    if (!this.isPlaying) return;
    const next = this.findPlayable(1);
    if (next === -1) {
      this.index = 0;
      this.startSynth(); // no usable file: synthesized fallback
    } else {
      this.index = next;
      this.loadCurrent();
      this.audioElement.play().catch(() => this.startSynth());
      this.notify();
    }
  }

  findPlayable(step) {
    const n = this.tracks.length;
    for (let i = 1; i <= n; i++) {
      const idx = (this.index + step * i + n * i) % n;
      if (!this.failed.has(idx)) return idx;
    }
    return -1;
  }

  /** Must be called straight from a tap handler (no awaits before it). */
  play() {
    this.isPlaying = true;
    this.unlockAudioContext();

    const el = this.ensureElement();
    if (!el.src) this.loadCurrent();

    const p = el.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        this.mode = 'file';
        this.notify();
      }).catch(() => {
        if (el.error) return;
        this.startSynth();
      });
    }
    this.notify();
  }

  advance(step) {
    if (this.tracks.length < 2) return;
    const next = this.findPlayable(step);
    if (next === -1) return;
    this.index = next;
    if (this.mode === 'synth') {
      this.notify();
      return;
    }
    this.loadCurrent();
    if (this.isPlaying) {
      this.audioElement.play().catch(() => {});
    }
    this.notify();
  }

  next() { this.advance(1); }
  previous() { this.advance(-1); }

  /* ---------- synthesizer fallback ---------- */

  unlockAudioContext() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!this.audioCtx) this.audioCtx = new Ctx();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
      const buffer = this.audioCtx.createBuffer(1, 1, 22050);
      const src = this.audioCtx.createBufferSource();
      src.buffer = buffer;
      src.connect(this.audioCtx.destination);
      src.start(0);
    } catch {
      // ignore
    }
  }

  startSynth() {
    this.mode = 'synth';
    if (!this.audioCtx) this.unlockAudioContext();
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
    if (this.synthInterval) return;

    const chordProgressions = [
      [146.83, 220.00, 277.18, 369.99, 440.00],
      [123.47, 185.00, 220.00, 293.66, 369.99],
      [98.00, 146.83, 196.00, 246.94, 293.66],
      [110.00, 164.81, 220.00, 277.18, 329.63],
    ];
    let chordIdx = 0;
    let noteInChord = 0;

    const playTone = (freq, duration = 2.4) => {
      if (!this.audioCtx || this.isMuted) return;
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      const now = ctx.currentTime;
      const vol = this.volume * 0.18;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(vol, 0.0002), now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    };

    this.synthInterval = setInterval(() => {
      if (!this.isPlaying || this.isMuted) return;
      const chord = chordProgressions[chordIdx];
      playTone(chord[noteInChord], 2.6);
      noteInChord++;
      if (noteInChord >= chord.length) {
        noteInChord = 0;
        chordIdx = (chordIdx + 1) % chordProgressions.length;
      }
    }, 620);

    this.notify();
  }

  /* ---------- controls ---------- */

  pause() {
    this.isPlaying = false;
    if (this.audioElement) this.audioElement.pause();
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.notify();
  }

  toggle() {
    if (this.isPlaying) this.pause();
    else this.play();
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) this.audioElement.volume = this.volume;
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) this.audioElement.muted = this.isMuted;
    this.notify();
  }
}

export const audioManager = new RomanticAudioManager();