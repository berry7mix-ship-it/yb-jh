// Synthesizes a soft, romantic music box / piano rendition of wedding harmony
// using Web Audio API so it runs without external audio file dependencies.

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private currentNoteIndex = 0;

  // Canon in D inspired romantic chord progression and melody
  private melody = [
    { note: 293.66, dur: 0.6 }, // D4
    { note: 440.00, dur: 0.6 }, // A4
    { note: 369.99, dur: 0.6 }, // F#4
    { note: 293.66, dur: 0.6 }, // D4
    { note: 329.63, dur: 0.6 }, // E4
    { note: 440.00, dur: 0.6 }, // A4
    { note: 392.00, dur: 0.6 }, // G4
    { note: 329.63, dur: 0.6 }, // E4
    { note: 293.66, dur: 0.6 }, // D4
    { note: 369.99, dur: 0.6 }, // F#4
    { note: 440.00, dur: 0.6 }, // A4
    { note: 587.33, dur: 0.8 }, // D5
    { note: 554.37, dur: 0.4 }, // C#5
    { note: 493.88, dur: 0.8 }, // B4
    { note: 440.00, dur: 0.8 }, // A4
    { note: 392.00, dur: 0.6 }, // G4
    { note: 369.99, dur: 0.6 }, // F#4
    { note: 329.63, dur: 0.8 }, // E4
    { note: 293.66, dur: 1.0 }, // D4
  ];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm, soft acoustic bell / piano tone
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    // Soft attack, gentle exponential decay
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration * 1.6);
  }

  private scheduleNext() {
    if (!this.isPlaying) return;
    const item = this.melody[this.currentNoteIndex];
    this.playTone(item.note, item.dur);

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
    const delay = item.dur * 850;

    this.timer = window.setTimeout(() => {
      this.scheduleNext();
    }, delay);
  }

  public play(): boolean {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.scheduleNext();
    return true;
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      return this.play();
    }
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();
