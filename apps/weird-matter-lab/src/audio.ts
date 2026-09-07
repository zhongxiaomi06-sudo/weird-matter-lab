// Programmatic Web Audio engine — minimal "scientific" sound design.
// No audio files: everything is synthesized on demand, so it stays tiny and offline.
// Respects an explicit mute flag; the caller decides the default (e.g. prefers-reduced-motion).

type Ctx = AudioContext | null;

let ctx: Ctx = null;
let master: GainNode | null = null;
let muted = false;
let lastPaintAt = 0;

const now = () => (ctx ? ctx.currentTime : 0);

function ensureContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
    const bed = ctx.createGain();
    bed.gain.value = 0.018;
    bed.connect(master);
    const ambient = ctx.createOscillator();
    ambient.type = 'sawtooth';
    ambient.frequency.value = 46.25;
    ambient.connect(bed);
    ambient.start();
  }
  // Browsers suspend the context until a user gesture; resume opportunistically.
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/** A single enveloped oscillator voice. */
function voice(opts: {
  type: OscillatorType;
  freq: number;
  freqTo?: number;
  duration: number;
  gain: number;
  attack?: number;
  delay?: number;
}) {
  const audio = ensureContext();
  if (!audio || !master || muted) return;
  const t0 = now() + (opts.delay ?? 0);
  const osc = audio.createOscillator();
  const env = audio.createGain();
  osc.type = opts.type;
  osc.frequency.setValueAtTime(opts.freq, t0);
  if (opts.freqTo) osc.frequency.exponentialRampToValueAtTime(Math.max(1, opts.freqTo), t0 + opts.duration);
  const attack = opts.attack ?? 0.008;
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(opts.gain, t0 + attack);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.duration);
  osc.connect(env);
  env.connect(master);
  osc.start(t0);
  osc.stop(t0 + opts.duration + 0.02);
}

/** Short filtered noise burst — used for the grainy paint/reaction texture. */
function noise(opts: { duration: number; gain: number; freq: number; q?: number }) {
  const audio = ensureContext();
  if (!audio || !master || muted) return;
  const t0 = now();
  const frames = Math.max(1, Math.floor(audio.sampleRate * opts.duration));
  const buffer = audio.createBuffer(1, frames, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  const src = audio.createBufferSource();
  src.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = opts.freq;
  filter.Q.value = opts.q ?? 1;
  const env = audio.createGain();
  env.gain.setValueAtTime(opts.gain, t0);
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.duration);
  src.connect(filter);
  filter.connect(env);
  env.connect(master);
  src.start(t0);
  src.stop(t0 + opts.duration + 0.02);
}

export const audio = {
  /** Call from a user gesture (pointerdown / button) to unlock playback. */
  unlock() {
    ensureContext();
  },
  isMuted() {
    return muted;
  },
  setMuted(value: boolean) {
    muted = value;
    if (master) master.gain.setTargetAtTime(value ? 0 : 0.5, now(), 0.02);
  },
  /** Soft granular "sand" tick while painting. Rate-limited so a drag stays gentle. */
  paint() {
    const t = performance.now();
    if (t - lastPaintAt < 45) return; // throttle to avoid a harsh buzz on fast drags
    lastPaintAt = t;
    noise({ duration: 0.05, gain: 0.06, freq: 1400 + Math.random() * 900, q: 0.8 });
  },
  /** A material reaction fired this tick — a low, hollow "settle". */
  reaction() {
    voice({ type: 'sine', freq: 320, freqTo: 150, duration: 0.16, gain: 0.09 });
    noise({ duration: 0.09, gain: 0.05, freq: 600, q: 0.6 });
  },
  /** Generic UI click — crisp, quiet. */
  ui() {
    voice({ type: 'triangle', freq: 520, duration: 0.05, gain: 0.05 });
  },
  /** Selecting a tool / material — a slightly brighter blip. */
  select() {
    voice({ type: 'sine', freq: 660, freqTo: 880, duration: 0.09, gain: 0.06 });
  },
  /** Toggle run/pause. */
  toggle() {
    voice({ type: 'triangle', freq: 440, duration: 0.06, gain: 0.05 });
  },
  /** Challenge completed — a calm rising three-note arpeggio. */
  success() {
    voice({ type: 'sine', freq: 523.25, duration: 0.5, gain: 0.08 });
    voice({ type: 'sine', freq: 659.25, duration: 0.5, gain: 0.08, delay: 0.12 });
    voice({ type: 'sine', freq: 783.99, duration: 0.6, gain: 0.09, delay: 0.24 });
  },
} as const;
