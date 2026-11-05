// Synthesises the sound-design track (public/sfx.wav). Every event is placed on a GLOBAL FRAME (30fps)
// that matches an animation moment in src/scenes.tsx (scene start + local delay).
import { writeFileSync } from "node:fs";
const SR = 44100, DUR = 40, N = SR * DUR, F = 30;
const L = new Float32Array(N);
let seed = 11;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const T = (f) => f / F;
const put = (t, len, fn) => { const s = Math.floor(t * SR), n = Math.floor(len * SR); for (let i = 0; i < n && s + i < N; i++) L[s + i] += fn(i / SR, i / n); };
const TAU = Math.PI * 2;

// Clean, minimal, modern UI-style voices: soft sines, short envelopes, no harsh noise or boings.
const env = (x, atk, dec) => Math.min(1, x / atk) * Math.exp(-x * dec);
// soft rounded "blip" (element appears)
const pop = (f, hz = 420, g = 1) => put(T(f), 0.14, (x) => Math.sin(TAU * (hz * 1.4 * x - (hz * 0.4 * (1 - Math.exp(-60 * x))) / 60 * 1)) * env(x, 0.003, 38) * 0.22 * g);
// transition swipe: narrow, airy, quiet, smooth bell envelope
const whoosh = (f, dur = 0.5, g = 1, hi = 0.5) => { let a1 = 0, a2 = 0, a3 = 0; const d = Math.min(dur, 0.32); put(T(f) + (dur - d) / 2, d, (x, u) => { const a = 0.03 + 0.16 * hi * Math.sin(Math.PI * u); a1 += (rnd() - a1) * a; a2 += (a1 - a2) * a; a3 += (a2 - a3) * a; return (a2 - a3) * 5.5 * Math.sin(Math.PI * u) ** 2 * g * 0.5; }); };
// soft sub "hit" (no click, no noise)
const thud = (f, g = 1) => put(T(f), 0.4, (x) => Math.sin(TAU * (52 * x + (38 * (1 - Math.exp(-22 * x))) / 22)) * env(x, 0.004, 9) * 0.55 * g);
// tiny clean click
const click = (f, g = 1) => put(T(f), 0.04, (x) => Math.sin(TAU * 1800 * x) * env(x, 0.001, 160) * 0.25 * g);
const tick = (f, hz = 1500, g = 0.5) => put(T(f), 0.035, (x) => Math.sin(TAU * hz * x) * env(x, 0.001, 150) * g * 0.35);
// soft glassy bell
const ding = (f, hz = 1318, g = 1) => put(T(f), 0.9, (x) => (Math.sin(TAU * hz * x) + 0.18 * Math.sin(TAU * 2.01 * hz * x)) * env(x, 0.004, 5.5) * 0.17 * g);
// light three-note shimmer
const sparkle = (f, g = 1) => [2093, 2637, 3136].forEach((hz, i) => put(T(f) + i * 0.06, 0.35, (x) => Math.sin(TAU * hz * x) * env(x, 0.003, 11) * 0.07 * g));
// gentle rising sine sweep (no noise)
const riser = (f, dur, g = 1) => put(T(f), dur, (x, u) => Math.sin(TAU * (220 * x + (700 * x * x) / (2 * dur))) * u * u * 0.16 * g);
// soft rounded pluck instead of a cartoon boing
const boing = (f, g = 1) => put(T(f), 0.25, (x) => Math.sin(TAU * (330 * x + 60 * (1 - Math.exp(-20 * x)) / 20)) * env(x, 0.004, 14) * 0.26 * g);
// a few quiet bubbles instead of a crackle
const crackle = (f, g = 1) => { for (let i = 0; i < 6; i++) pop(f + i * 1.6, 700 + i * 130, 0.4 * g); };

const S = { s1: 0, s2: 120, s3: 270, s4: 390, s5: 480, s6: 570, s7: 660, s8: 750, s9: 870, s10: 1020 };
const penta = [340, 380, 430, 510, 570, 680];
const at = (scene, d) => S[scene] + d;

// ---- scene wipes (centred on each cut) ----
[120, 270, 390, 480, 570, 660, 750, 870, 1020].forEach((b) => { whoosh(b - 9, 0.62, 1.0, 0.55); thud(b + 1, 0.5); });

// ---- S1: blank screen ----
[4, 14, 24].forEach((d, i) => pop(at("s1", d), penta[i], 1));
whoosh(at("s1", 33), 0.3, 0.6); boing(at("s1", 42), 0.9);
[58, 70, 82].forEach((d, i) => pop(at("s1", d), 900 + i * 120, 0.8));
pop(at("s1", 88), 300, 1); tick(at("s1", 20), 220, 0.0);

// ---- S2: aha -> Bingo ----
pop(at("s2", 4), 520, 0.8);
riser(at("s2", 0) + 4, 16 / F, 0.9);
thud(at("s2", 20), 1.25); pop(at("s2", 20), 300, 1.0);
thud(at("s2", 29), 0.35); thud(at("s2", 36), 0.18); // dot bounces
whoosh(at("s2", 78), 0.5, 1.1, 0.6); riser(at("s2", 70), 8 / F, 0.7);
boing(at("s2", 90), 1.2); thud(at("s2", 90), 0.7); sparkle(at("s2", 92), 1);
thud(at("s2", 100), 1.2); pop(at("s2", 100), 260, 1);
pop(at("s2", 116), 500, 0.9); sparkle(at("s2", 118), 0.6);

// ---- S3: roll call ----
pop(at("s3", 0), 500, 0.8);
[10, 22, 34, 46, 58].forEach((d, i) => { whoosh(at("s3", d), 0.28, 0.7, 0.5); thud(at("s3", d + 7), 0.45); pop(at("s3", d + 7), penta[i], 0.7); });
boing(at("s3", 70), 0.9); pop(at("s3", 84), 350, 1); sparkle(at("s3", 90), 0.7);

// ---- header pops shared by S4–S7 ----
["s4", "s5", "s6", "s7"].forEach((s) => { pop(at(s, 2), 520, 0.8); [8, 14, 20].forEach((d, i) => pop(at(s, d), penta[i] - 30, 0.7)); });
// S8 / S9 / S10 header pops handled below

// ---- S4: websites ----
pop(at("s4", 10), 300, 1); whoosh(at("s4", 10), 0.25, 0.5);
[20, 24, 30].forEach((d, i) => pop(at("s4", d), 420 + i * 60, 0.8));
[34, 40, 46].forEach((d, i) => { pop(at("s4", d), 380 + i * 90, 0.9); thud(at("s4", d + 2), 0.2); });
whoosh(at("s4", 22), 0.55, 0.35, 0.3); // cursor glide
click(at("s4", 56), 1.2); tick(at("s4", 58), 900, 0.4);
pop(at("s4", 64), 240, 1.1); ding(at("s4", 64), 1568, 0.9); sparkle(at("s4", 66), 0.6);
boing(at("s4", 44), 0.8);

// ---- S5: local SEO ----
pop(at("s5", 8), 330, 0.9);
for (let k = 0; k < 20; k++) tick(at("s5", 12) + k / 0.75, 1300 + (k % 3) * 160, 0.4); // typing
[34, 39, 44].forEach((d, i) => { pop(at("s5", d), 400 + i * 80, 0.9); whoosh(at("s5", d), 0.2, 0.35, 0.4); });
whoosh(at("s5", 56), 0.45, 1.0, 0.55); thud(at("s5", 62), 0.6);
ding(at("s5", 66), 1568, 1.0); sparkle(at("s5", 68), 0.8);
thud(at("s5", 76), 0.9); ding(at("s5", 77), 880, 0.6); [82, 87, 92].forEach((d) => ding(at("s5", d), 1760, 0.25));
boing(at("s5", 60), 0.8);

// ---- S6: AI social ----
pop(at("s6", 10), 300, 1); thud(at("s6", 12), 0.3);
[22, 34, 46].forEach((d, i) => { whoosh(at("s6", d), 0.3, 0.55, 0.45); pop(at("s6", d + 4), 400 + i * 90, 0.9); });
for (let i = 0; i < 6; i++) { pop(at("s6", 40 + i * 7), 1200 + (i % 3) * 200, 0.45); pop(at("s6", 100 + i * 7 - 60), 1300 + (i % 3) * 180, 0.0); }
pop(at("s6", 60), 700, 1); sparkle(at("s6", 62), 0.8); boing(at("s6", 48), 0.8);
for (let i = 0; i < 6; i++) pop(at("s6", 40 + 60 + i * 7), 1250 + (i % 3) * 200, i < 5 ? 0.3 : 0);

// ---- S7: care ----
[10, 26, 42, 58].forEach((d, i) => { whoosh(at("s7", d), 0.3, 0.6, 0.45); thud(at("s7", d + 6), 0.4); });
[26, 42, 58, 74].forEach((d, i) => { tick(at("s7", d), 1000 + i * 100, 0.5); ding(at("s7", d + 2), 988 * Math.pow(1.122, i * 2), 0.7); });
pop(at("s7", 70), 340, 1); boing(at("s7", 40), 0.8); sparkle(at("s7", 80), 0.6);

// ---- S8: tools ----
[2, 8, 16].forEach((d, i) => pop(at("s8", d), penta[i], 0.9));
[26, 44, 62].forEach((d, i) => { whoosh(at("s8", d), 0.35, 0.9, 0.5); thud(at("s8", d + 9), 0.8); pop(at("s8", d + 9), 300 + i * 90, 0.8); ding(at("s8", d + 11), 1175 * Math.pow(1.122, i * 2), 0.4); });
boing(at("s8", 90), 0.9); sparkle(at("s8", 92), 0.7);

// ---- S9: stats ----
pop(at("s9", 2), 400, 1);
[10, 18, 26, 34].forEach((d, i) => { pop(at("s9", d), 360 + i * 70, 0.9); thud(at("s9", d + 3), 0.3); });
[0, 1, 2, 3].forEach((i) => {
  const s = 14 + i * 8, e = 52 + i * 8;
  for (let f = s; f < e; f += 2) tick(at("s9", f), 700 + ((f - s) / (e - s)) * 1100, 0.3);
  ding(at("s9", e), 1175 * Math.pow(1.122, i * 2), 0.9); thud(at("s9", e), 0.4);
});
boing(at("s9", 70), 0.8);

// ---- S10: CTA ----
boing(at("s10", 4), 1.1);
[33, 69, 105, 141].forEach((d) => thud(at("s10", d - 5), 0.3));
whoosh(at("s10", 10), 0.35, 0.9, 0.5);
thud(at("s10", 18), 1.2); crackle(at("s10", 18), 1.2); sparkle(at("s10", 20), 1);
pop(at("s10", 30), 340, 1); pop(at("s10", 42), 260, 1.2); thud(at("s10", 44), 0.8); sparkle(at("s10", 46), 0.9);
whoosh(at("s10", 100), 0.6, 1.0, 0.5); thud(at("s10", 118), 1.0); ding(at("s10", 118), 1568, 0.9); sparkle(at("s10", 120), 1);
ding(at("s10", 132), 2093, 0.6);

let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]));
const out = Buffer.alloc(44 + N * 2);
out.write("RIFF", 0); out.writeUInt32LE(36 + N * 2, 4); out.write("WAVEfmt ", 8); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(1, 22);
out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 2, 28); out.writeUInt16LE(2, 32); out.writeUInt16LE(16, 34); out.write("data", 36); out.writeUInt32LE(N * 2, 40);
for (let i = 0; i < N; i++) out.writeInt16LE(Math.round(Math.tanh((L[i] / peak) * 1.2) * 0.85 * 32767), 44 + i * 2);
writeFileSync("public/sfx.wav", out);
console.log("sfx.wav written, raw peak", peak.toFixed(2));
