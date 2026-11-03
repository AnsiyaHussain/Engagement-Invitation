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
    audio.preload = 'none';
    audio.loop = true;
    audio.volume = this.volume;
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
    audio.addEventListener('error', () => {
      this.isPlaying = false;
      this.mode = 'idle';
      console.warn('Background music could not be loaded or decoded.', audio.error);
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
