/**
 * Haptic Soundscapes Utility
 * Ultra-minimalist synthesized audio feedback for key interactions.
 */

class Haptics {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  toggle(state) {
    this.enabled = state;
  }

  // A tiny, mechanical "tick" sound
  tick(freq = 1500, dur = 0.005) {
    if (!this.enabled) return;
    this.init();
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + dur);

    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + dur);
  }

  // A slightly heavier "mechanical flip" for theme toggle
  flip() {
    this.tick(800, 0.05);
    setTimeout(() => this.tick(400, 0.03), 20);
  }
}

export const haptics = new Haptics();
