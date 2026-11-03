class RomanticAudioManager {
  constructor() {
    this.audioElement = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.28;
    this.mode = 'idle';
    this.listeners = new Set();

    document.addEventListener('visibilitychange', () => {
      if (this.audioElement?.paused && this.isPlaying) {
        this.isPlaying = false;
        this.notify();
      }
    });
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
    if (this.audioElement) return this.audioElement;

    const audio = new Audio(audioSrc);
    audio.preload = 'auto';
    audio.loop = true;
    audio.playsInline = true;
    audio.setAttribute('playsinline', 'true');
    audio.setAttribute('webkit-playsinline', 'true');
    
    try {
      audio.volume = this.volume;
    } catch {
      // iOS Safari does not allow programmatically modifying volume (hardware buttons only)
    }
    audio.muted = this.isMuted;

    audio.addEventListener('playing', () => {
      this.isPlaying = true;
      this.mode = 'file';
      this.notify();
    });

    audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notify();
    });

    // Native loop fallback for mobile browsers (Safari / Chrome power save modes)
    audio.addEventListener('ended', () => {
      try {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } catch {
        // Ignored
      }
    });

    // Graceful error handling for missing/unsupported audio or offline states
    audio.addEventListener('error', () => {
      this.isPlaying = false;
      this.mode = 'idle';
      const code = audio.error ? audio.error.code : 'unknown';
      const msg = audio.error ? audio.error.message : '';
      console.warn(`[Audio] Background music could not be loaded (code: ${code}, ${msg}). Invitation continues gracefully.`);
      this.notify();
    });

    this.audioElement = audio;
    return audio;
  }

  play(audioSrc) {
    let audio;
    try {
      audio = this.initAudio(audioSrc);
    } catch (error) {
      console.warn('Background music could not be initialized.', error);
      this.isPlaying = false;
      this.mode = 'idle';
      this.notify();
      return Promise.resolve(false);
    }

    try {
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === 'function') {
        return playPromise.then(() => {
          this.isPlaying = !audio.paused;
          this.mode = this.isPlaying ? 'file' : 'idle';
          this.notify();
          return this.isPlaying;
        }).catch(error => {
          this.isPlaying = false;
          this.mode = 'idle';
          console.warn('Background music playback was blocked or interrupted.', error);
          this.notify();
          return false;
        });
      }

      this.isPlaying = !audio.paused;
      this.mode = this.isPlaying ? 'file' : 'idle';
      this.notify();
      return Promise.resolve(this.isPlaying);
    } catch (error) {
      this.isPlaying = false;
      this.mode = 'idle';
      console.warn('Background music playback was blocked or interrupted.', error);
      this.notify();
      return Promise.resolve(false);
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
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
      try {
        this.audioElement.volume = this.volume;
      } catch {
        // iOS Safari read-only volume handled gracefully
      }
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
