// Synthesises a 40s, 120 BPM energetic loop-less track (kick/snare/hats/bass/stabs) to public/music.wav
import { writeFileSync } from "node:fs";
const SR = 44100, DUR = 40, N = SR * DUR, BPM = 120, BEAT = 60 / BPM;
const L = new Float32Array(N);
const add = (t, fn, len) => { const s = Math.floor(t * SR); for (let i = 0; i < len * SR && s + i < N; i++) L[s + i] += fn(i / SR); };
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const kick = (t, g = 1) => add(t, (x) => Math.sin(2 * Math.PI * (50 * x + 90 * (1 - Math.exp(-x * 30)) / 30 * 1)) * Math.exp(-x * 9) * g, 0.4);
const snare = (t, g = 1) => add(t, (x) => (rnd() * 0.6 + Math.sin(2 * Math.PI * 190 * x) * 0.4) * Math.exp(-x * 16) * g * 0.8, 0.25);
const hat = (t, g = 1) => add(t, (x) => rnd() * Math.exp(-x * 70) * 0.25 * g, 0.08);
const bass = (t, f, len, g = 1) => add(t, (x) => { const e = Math.min(1, x * 200) * Math.exp(-x * (1.6 / len)); const s = Math.sin(2 * Math.PI * f * x) + 0.35 * Math.sin(4 * Math.PI * f * x) + 0.2 * (((f * x) % 1) * 2 - 1); return s * e * 0.34 * g; }, len);
const stab = (t, fs, len, g = 1) => add(t, (x) => fs.reduce((a, f) => a + (((f * x) % 1) * 2 - 1) * 0.5 + Math.sin(2 * Math.PI * f * x) * 0.5, 0) * Math.exp(-x * 9) * 0.07 * g, len);
const crash = (t) => add(t, (x) => rnd() * Math.exp(-x * 2.2) * 0.35, 1.8);
const roots = [55, 55, 65.41, 73.42]; // A1 A1 C2 D2 – one bar each
const chords = [[220, 261.63, 329.63], [220, 261.63, 329.63], [261.63, 329.63, 392], [293.66, 349.23, 440]];
const bars = DUR / (BEAT * 4);
for (let bar = 0; bar < bars; bar++) {
  const t0 = bar * BEAT * 4, p = bar % 4, sec = t0;
  const intro = sec < 4, calm = sec >= 4 && sec < 8;
  for (let b = 0; b < 4; b++) {
    const t = t0 + b * BEAT;
    if (!(intro && b % 2)) kick(t, intro ? 0.8 : 1);
    if (!intro && (b === 1 || b === 3)) snare(t, calm ? 0.6 : 1);
    if (!intro) { hat(t + BEAT / 2, 1); if (!calm) { hat(t, 0.5); hat(t + BEAT / 4, 0.4); hat(t + BEAT * 0.75, 0.4); } }
    if (!intro) for (let e = 0; e < 2; e++) bass(t + e * BEAT / 2, roots[p] * (e && b % 2 ? 2 : 1), BEAT / 2, calm ? 0.7 : 1);
  }
  if (!intro && !calm) { stab(t0 + BEAT * 0.5, chords[p], 0.3); stab(t0 + BEAT * 1.5, chords[p], 0.3); stab(t0 + BEAT * 2.75, chords[p], 0.3); }
  if (bar % 4 === 0 && sec > 0) crash(t0);
}
crash(0); crash(8); crash(34); // scene-change accents; final CTA hit
kick(34, 1.3); kick(34 + BEAT, 1.2);
let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]));
const out = Buffer.alloc(44 + N * 2);
out.write("RIFF", 0); out.writeUInt32LE(36 + N * 2, 4); out.write("WAVEfmt ", 8); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(1, 22);
out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 2, 28); out.writeUInt16LE(2, 32); out.writeUInt16LE(16, 34); out.write("data", 36); out.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) { const fade = Math.min(1, (N - i) / (SR * 1.2)); out.writeInt16LE(Math.round(Math.tanh((L[i] / peak) * 1.6) * 0.85 * fade * 32767), 44 + i * 2); }
writeFileSync("public/music.wav", out); console.log("music.wav written");
