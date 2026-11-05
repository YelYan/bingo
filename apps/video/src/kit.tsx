import React from "react";
import { AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/BricolageGrotesque";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadBody } from "@remotion/google-fonts/Archivo";

export const display = loadDisplay("normal", { weights: ["800"], subsets: ["latin"] }).fontFamily;
export const serif = loadSerif("italic", { weights: ["400"], subsets: ["latin"] }).fontFamily;
export const body = loadBody("normal", { weights: ["600"], subsets: ["latin"] }).fontFamily;

// Brand tokens (from app/globals.css) + a few punchier reel-only accents
export const C = {
  paper: "#f7f2ea", paper2: "#efe6da", ink: "#24272c", ink2: "#16181c",
  spark: "#e2622b", lift: "#f4813f", sand: "#b79e8b", sandInk: "#6e5c4c",
  yellow: "#ffcf4a", teal: "#27b8a4", lilac: "#a392ff", white: "#fffdf8",
};

export const useSp = (delay = 0, damping = 11, stiffness = 200, mass = 0.7) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness, mass } });
};

export const ease = Easing.bezier(0.7, 0, 0.2, 1);
export const ip = (f: number, a: [number, number], b: [number, number], e = ease) =>
  interpolate(f, a, b, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });

/** Hand-drawn "boiling line" look: displacement re-seeded every 3 frames. */
export const Boil: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / 3) % 7;
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="boil" x="-3%" y="-3%" width="106%" height="106%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="8" />
        </filter>
      </svg>
      <AbsoluteFill style={{ filter: "url(#boil)" }}>{children}</AbsoluteFill>
    </>
  );
};

/** Bouncy pop-in with a little rotation overshoot. */
export const Pop: React.FC<{
  delay?: number; rot?: number; style?: React.CSSProperties; children: React.ReactNode; from?: "scale" | "up" | "left" | "right"; float?: number;
}> = ({ delay = 0, rot = -6, style, children, from = "scale", float = 0 }) => {
  const f = useCurrentFrame();
  const s = useSp(delay);
  if (f < delay) return null;
  const tr =
    from === "up" ? `translateY(${(1 - s) * 260}px)` :
    from === "left" ? `translateX(${(1 - s) * -1300}px)` :
    from === "right" ? `translateX(${(1 - s) * 1300}px)` : `scale(${s})`;
  const bob = float ? Math.sin((f + delay * 3) / 16) * float * Math.min(1, s) : 0;
  const tilt = float ? Math.sin((f + delay * 5) / 23) * 0.6 : 0;
  return <div style={{ transform: `translateY(${bob}px) ${tr} rotate(${(1 - s) * rot + tilt}deg)`, transformOrigin: "50% 80%", ...style }}>{children}</div>;
};

export const H: React.FC<{ size?: number; color?: string; serifFont?: boolean; style?: React.CSSProperties; children: React.ReactNode }> = ({
  size = 120, color = C.ink, serifFont, style, children,
}) => (
  <div style={{
    fontFamily: serifFont ? serif : display, fontWeight: serifFont ? 400 : 800, fontStyle: serifFont ? "italic" : "normal",
    fontSize: size, lineHeight: 0.98, letterSpacing: serifFont ? "-0.02em" : "-0.045em", color, ...style,
  }}>{children}</div>
);

/** The original Bingo logo mark (components/logo.tsx): browser window, chrome bar, three dots, orange counter-shape. No face. */
export const Bingo: React.FC<{
  size?: number; look?: [number, number]; mood?: "happy" | "huh" | "wow" | "grin";
  blink?: boolean; style?: React.CSSProperties;
}> = ({ size = 300, style }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} style={{ overflow: "visible", transformOrigin: "50% 100%", ...style }}>
    <defs><clipPath id="bwin"><rect x="4" y="4" width="32" height="32" rx="9.5" /></clipPath></defs>
    <rect x="4" y="4" width="32" height="32" rx="9.5" fill={C.white} />
    <g clipPath="url(#bwin)"><path d="M4 21.5h11.5V36H4z" fill={C.spark} /></g>
    <rect x="4" y="4" width="32" height="32" rx="9.5" fill="none" stroke={C.ink} strokeWidth="4" />
    <path d="M5.4 14h29.2" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="10.6" cy="9.1" r="1.65" fill={C.ink} /><circle cx="15.8" cy="9.1" r="1.65" fill={C.spark} /><circle cx="21" cy="9.1" r="1.65" fill={C.sand} />
  </svg>
);

/** Squash & stretch hop for a repeating jump of `period` frames. */
export const hop = (f: number, period = 30, height = 120) => {
  const t = (f % period) / period;
  const air = t < 0.7 ? Math.sin((t / 0.7) * Math.PI) : 0;
  const y = -air * height;
  let sx = 1, sy = 1;
  if (t < 0.12) { sx = 1 + (0.12 - t) * 2.5; sy = 1 / sx; }
  else if (t < 0.7) { sy = 1 + air * 0.12; sx = 1 / sy; }
  else { const k = (t - 0.7) / 0.3; sx = 1 + 0.28 * Math.exp(-k * 4) * Math.cos(k * 9); sy = 1 / sx; }
  return { y, sx, sy };
};

export const hopStyle = (f: number, period = 30, height = 120): React.CSSProperties => {
  const h = hop(f, period, height);
  return { transform: `translateY(${h.y}px) scale(${h.sx},${h.sy})`, transformOrigin: "50% 100%" };
};

export const Slant: React.FC<{ w?: number; h?: number; color?: string; style?: React.CSSProperties }> = ({ w = 44, h = 70, color = C.spark, style }) => (
  <svg width={w + 20} height={h} viewBox={`0 0 ${w + 20} ${h}`} style={style}><path d={`M20 0 H${w + 20} L${w} ${h} H0 Z`} fill={color} stroke={C.ink} strokeWidth="6" strokeLinejoin="round" /></svg>
);

export const Pill: React.FC<{ children: React.ReactNode; bg?: string; color?: string; size?: number; style?: React.CSSProperties }> = ({ children, bg = C.ink, color = C.paper, size = 44, style }) => (
  <div style={{ display: "inline-block", fontFamily: display, fontWeight: 800, fontSize: size, color, background: bg, padding: `${size * 0.22}px ${size * 0.6}px`, borderRadius: 999, letterSpacing: "-0.02em", ...style }}>{children}</div>
);

export const Corner: React.FC<{ mood?: "happy" | "huh" | "wow" | "grin"; delay?: number }> = ({ mood = "happy", delay = 20 }) => {
  const f = useCurrentFrame();
  return (
    <Pop delay={delay} from="up" style={{ position: "absolute", bottom: 50, right: 60 }}>
      <Bingo size={220} mood={mood} look={[Math.sin(f / 14), 0.2]} style={hopStyle(Math.max(0, f - delay), 36, 60)} />
    </Pop>
  );
};

/** Section header used by the 5 service scenes. */
export const Head: React.FC<{ n: string; name: string; lines: string[]; pillBg?: string }> = ({ n, name, lines, pillBg = C.ink }) => (
  <div style={{ position: "absolute", top: 120, left: 70, right: 70 }}>
    <Pop delay={2}><Pill bg={pillBg} size={40}>{n} · {name}</Pill></Pop>
    <div style={{ marginTop: 34 }}>
      {lines.map((l, i) => <Words key={l} text={l} delay={8 + i * 6} size={112} />)}
    </div>
  </div>
);

/** Word-by-word kinetic headline: each word drops in with overshoot, squash and a tiny tilt. */
export const Words: React.FC<{ text: string; delay?: number; size?: number; color?: string; serifFont?: boolean; step?: number }> = ({ text, delay = 0, size = 112, color = C.ink, serifFont, step = 3 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <H size={size} color={color} serifFont={serifFont}>
      {text.split(" ").map((w, i) => {
        const s = spring({ frame: f - delay - i * step, fps, config: { damping: 9, stiffness: 190, mass: 0.7 } });
        const on = f >= delay + i * step;
        return (
          <span key={i} style={{ display: "inline-block", marginRight: "0.22em", opacity: on ? 1 : 0, transform: `translateY(${(1 - s) * 110}px) scale(${0.55 + 0.45 * s},${1.5 - 0.5 * s}) rotate(${(1 - s) * (i % 2 ? 9 : -9)}deg)`, transformOrigin: "50% 100%" }}>{w}</span>
        );
      })}
    </H>
  );
};

/** Ambient doodles (sparkles, plus signs, rings, squiggles) that pop in and drift – keeps the frame alive. */
export const Doodles: React.FC<{ tint: string; seedKey: string; count?: number }> = ({ tint, seedKey, count = 12 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const r = (n: string) => random(`${seedKey}-${n}-${i}`);
        const side = r("s") < 0.5 ? r("x") * 0.14 : 0.86 + r("x") * 0.14;
        const x = side * 1080, y = 60 + r("y") * 1800, size = 34 + r("z") * 44, kind = Math.floor(r("k") * 4);
        const s = spring({ frame: f - 4 - i * 3, fps, config: { damping: 8, stiffness: 160, mass: 0.6 } });
        const drift = Math.sin((f + i * 17) / 22) * 12, spin = (f + i * 9) * (r("v") * 1.2 - 0.6);
        const sw = 7;
        const shape =
          kind === 0 ? <path d="M30 4 Q34 26 56 30 Q34 34 30 56 Q26 34 4 30 Q26 26 30 4Z" fill={tint} /> :
          kind === 1 ? <path d="M30 8V52M8 30H52" stroke={tint} strokeWidth={sw + 2} strokeLinecap="round" /> :
          kind === 2 ? <circle cx="30" cy="30" r="20" fill="none" stroke={tint} strokeWidth={sw} /> :
          <path d="M4 36 Q14 14 24 32 T44 28 T58 24" fill="none" stroke={tint} strokeWidth={sw} strokeLinecap="round" />;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 60 60" style={{ position: "absolute", left: x - size / 2, top: y + drift, transform: `scale(${s}) rotate(${spin}deg)` }}>{shape}</svg>
        );
      })}
    </>
  );
};
