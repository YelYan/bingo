import React from "react";
import { AbsoluteFill, random, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { Bingo, Boil, C, Corner, Doodles, H, Head, Words, Pill, Pop, Slant, body, display, hopStyle, ip, serif, useSp } from "./kit";

/** Scene background + slow "camera" push-in and sway, plus ambient doodles behind the content. */
const Bg: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => {
  const f = useCurrentFrame();
  const dark = color === C.ink;
  return (
    <Boil>
      <AbsoluteFill style={{ background: color }}>
        <Doodles tint={dark ? "rgba(247,242,234,0.16)" : "rgba(36,39,44,0.16)"} seedKey={color} />
        <AbsoluteFill style={{ transform: `scale(${1 + f * 0.0006}) rotate(${Math.sin(f / 45) * 0.35}deg)`, transformOrigin: "50% 55%" }}>{children}</AbsoluteFill>
      </AbsoluteFill>
    </Boil>
  );
};

const Box: React.FC<{ x: number; y: number; w: number; h: number; bg?: string; r?: number; bw?: number; delay?: number; rot?: number; children?: React.ReactNode; style?: React.CSSProperties }> = ({
  x, y, w, h, bg = C.white, r = 28, bw = 8, delay = 0, rot = -4, children, style,
}) => (
  <Pop delay={delay} rot={rot} float={5} style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
    <div style={{ width: "100%", height: "100%", background: bg, border: `${bw}px solid ${C.ink}`, borderRadius: r, boxSizing: "border-box", position: "relative", ...style }}>{children}</div>
  </Pop>
);

/* 1 — the problem: blank screen */
export const S1: React.FC = () => {
  const f = useCurrentFrame();
  const q = (d: number, x: number, y: number) => (
    <Pop delay={d} rot={20} style={{ position: "absolute", left: x, top: y + Math.sin((f + d) / 6) * 14 }}>
      <H serifFont size={190} color={C.spark}>?</H>
    </Pop>
  );
  return (
    <Bg color={C.paper}>
      <div style={{ position: "absolute", top: 150, left: 70 }}>
        <Words text="Ever stared" delay={4} size={158} />
        <Words text="at a blank" delay={14} size={158} />
        <Words text="screen?" delay={24} size={158} color={C.spark} />
      </div>
      <Box x={110} y={800} w={860} h={640} delay={34} bw={10} r={46}>
        <div style={{ height: 96, borderBottom: `10px solid ${C.ink}`, display: "flex", alignItems: "center", gap: 18, paddingLeft: 36 }}>
          {[C.ink, C.spark, C.sand].map((c) => <div key={c} style={{ width: 28, height: 28, borderRadius: 99, background: c }} />)}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, display: "flex", justifyContent: "center" }}>
          <Pop delay={42} from="up">
            <Bingo size={400} style={{ transform: `rotate(${Math.sin(f / 7) * 7}deg)`, transformOrigin: "50% 100%" }} />
          </Pop>
        </div>
        <div style={{ position: "absolute", left: 60, top: 140, width: 6 + (Math.floor(f / 15) % 2) * 10, height: 90, background: C.spark }} />
      </Box>
      {q(58, 80, 700)}{q(70, 860, 640)}{q(82, 480, 590)}
      <Pop delay={88} rot={-4} style={{ position: "absolute", left: 70, right: 70, top: 1550 }}>
        <H serifFont size={118} color={C.sandInk}>(yeah, us too.)</H>
      </Pop>
    </Bg>
  );
};

/* 2 — aha → Bingo */
export const S2: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const land = 20;
  const fall = spring({ frame: f - 8, fps, config: { damping: 9, stiffness: 90, mass: 1.1 } });
  const dotY = 1040 - (1 - fall) * 1300;
  const k = Math.max(0, f - land);
  const sx = f >= land ? 1 + 0.7 * Math.exp(-k / 5) * Math.cos(k / 2) : 1;
  const shake = f >= land && k < 9 ? Math.sin(k * 3) * (9 - k) * 1.4 : 0;
  const reveal = ip(f, [84, 108], [0, 2300]);
  return (
    <>
      <Bg color={C.ink}>
        <div style={{ transform: `translate(${shake}px,${shake * 0.6}px)` }}>
          <Pop delay={4} style={{ position: "absolute", top: 380, left: 0, right: 0, textAlign: "center" }}>
            <Pill bg={C.spark} color={C.ink} size={44}>that moment when it clicks</Pill>
          </Pop>
          <Pop delay={20} rot={-10} style={{ position: "absolute", top: 560, left: 0, right: 0, textAlign: "center" }}>
            <H serifFont size={470} color={C.paper}>aha</H>
          </Pop>
          <div style={{ position: "absolute", left: 540 - 46, top: dotY, width: 92, height: 92, borderRadius: 99, background: C.spark, transform: `scale(${sx},${1 / sx})`, transformOrigin: "50% 100%" }} />
        </div>
      </Bg>
      <div style={{ position: "absolute", inset: 0, clipPath: `circle(${reveal}px at 540px 1086px)` }}>
        <Bg color={C.spark}>
          <Pop delay={90} from="up" style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <Bingo size={560} mood="grin" look={[0.6, -0.2]} style={hopStyle(Math.max(0, f - 96), 45, 90)} />
          </Pop>
          <Pop delay={100} rot={8} style={{ position: "absolute", top: 1030, left: 0, right: 0, textAlign: "center" }}>
            <H size={330} color={C.ink} style={{ letterSpacing: "-0.06em" }}>Bingo<span style={{ display: "inline-block", width: "0.2em", height: "0.5em", marginLeft: "0.14em", background: C.paper, transform: "skewX(-18deg)" }} /></H>
          </Pop>
          <Pop delay={116} style={{ position: "absolute", top: 1420, left: 0, right: 0, textAlign: "center" }}>
            <H serifFont size={92} color={C.paper}>websites, SEO &amp; growth</H>
          </Pop>
        </Bg>
      </div>
    </>
  );
};

/* 3 — roll call */
export const S3: React.FC = () => {
  const f = useCurrentFrame();
  const words = ["Websites", "Local SEO", "Social", "Care", "Tools"];
  return (
    <Bg color={C.yellow}>
      <Pop delay={0} style={{ position: "absolute", top: 120, left: 70 }}><Pill size={40}>we do the whole internet thing</Pill></Pop>
      <div style={{ position: "absolute", top: 260, left: 70 }}>
        {words.map((w, i) => (
          <Pop key={w} delay={10 + i * 12} from={i % 2 ? "right" : "left"} rot={0} style={{ display: "flex", alignItems: "center", gap: 26, marginBottom: 14 }}>
            <Slant color={i === 4 ? C.ink : C.spark} />
            <H size={190} color={C.ink}>{w}</H>
          </Pop>
        ))}
      </div>
      <Pop delay={84} rot={-6} style={{ position: "absolute", top: 1480, left: 70 }}>
        <H serifFont size={140} color={C.ink}>all under <span style={{ color: C.spark }}>one roof.</span></H>
      </Pop>
      <Pop delay={70} from="up" style={{ position: "absolute", right: 60, top: 1150 }}>
        <Bingo size={230} mood="wow" style={hopStyle(Math.max(0, f - 70), 30, 80)} />
      </Pop>
    </Bg>
  );
};

/* 4 — websites */
export const S4: React.FC = () => {
  const f = useCurrentFrame();
  const cx = ip(f, [20, 52], [880, 330]);
  const cy = ip(f, [20, 52], [1500, 1140]);
  const press = f >= 56 && f < 62;
  const stamp = useSp(64, 9, 220);
  return (
    <Bg color={C.teal}>
      <Head n="01" name="Websites" lines={["Sites that", "actually do", "their job."]} />
      <Box x={90} y={760} w={900} h={800} delay={10} r={44} bw={10}>
        <div style={{ height: 80, borderBottom: "10px solid " + C.ink, display: "flex", alignItems: "center", gap: 16, paddingLeft: 32 }}>
          {[C.ink, C.spark, C.sand].map((c) => <div key={c} style={{ width: 24, height: 24, borderRadius: 99, background: c }} />)}
        </div>
      </Box>
      <Box x={130} y={870} w={820} h={250} bg={C.spark} delay={20} r={24} bw={8} />
      <Box x={170} y={1010} w={210} h={74} bg={C.white} delay={30} r={99} bw={6} style={{ transform: press ? "scale(.9)" : "none" }} />
      <Box x={170} y={910} w={440} h={26} bg={C.ink} delay={24} r={14} bw={0} />
      {[0, 1, 2].map((i) => (
        <Box key={i} x={130 + i * 285} y={1160} w={250} h={340} bg={[C.yellow, C.white, C.lilac][i]} delay={34 + i * 6} r={24} bw={8}>
          <div style={{ margin: 22, height: 120, borderRadius: 14, background: C.ink, opacity: 0.12 }} />
          <div style={{ margin: "0 22px", height: 18, borderRadius: 9, background: C.ink }} />
          <div style={{ margin: "16px 22px", height: 18, width: "60%", borderRadius: 9, background: C.ink, opacity: 0.4 }} />
        </Box>
      ))}
      {f > 20 && (
        <svg width="90" height="110" viewBox="0 0 90 110" style={{ position: "absolute", left: cx, top: cy, transform: `scale(${press ? 0.85 : 1})` }}>
          <path d="M8 6 L8 84 L28 66 L44 102 L58 96 L42 62 L70 60 Z" fill={C.ink} stroke={C.paper} strokeWidth="5" strokeLinejoin="round" />
        </svg>
      )}
      <div style={{ position: "absolute", right: 70, top: 690, transform: `scale(${stamp}) rotate(${10 - stamp * 22}deg)` }}>
        <div style={{ background: C.ink, color: C.paper, fontFamily: display, fontWeight: 800, fontSize: 70, padding: "20px 38px", borderRadius: 999, border: `6px solid ${C.paper}` }}>
          0.9s <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, color: C.lift }}>load</span>
        </div>
      </div>
      <Corner delay={44} mood="happy" />
    </Bg>
  );
};

/* 5 — local SEO */
export const S5: React.FC = () => {
  const f = useCurrentFrame();
  const q = "web designer near me";
  const typed = q.slice(0, Math.max(0, Math.floor((f - 12) * 0.75)));
  const p = spring({ frame: f - 56, fps: 30, config: { damping: 10, stiffness: 170, mass: 0.8 } });
  const slotOf = (from: number, to: number) => 880 + (from + (to - from) * p) * 195;
  const rows = [
    { from: 0, to: 1, name: "Agency A", c: C.white },
    { from: 1, to: 2, name: "Agency B", c: C.white },
    { from: 2, to: 0, name: "Your business", c: C.spark },
  ];
  const pin = useSp(76, 8, 140, 1);
  return (
    <Bg color={C.lilac}>
      <Head n="02" name="Local SEO" lines={["Be the one", "they find."]} />
      <Box x={70} y={560} w={940} h={130} delay={8} r={99} bw={9}>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 52, color: C.ink, position: "absolute", left: 60, top: 32 }}>
          {typed}<span style={{ opacity: f % 14 < 7 ? 1 : 0 }}>|</span>
        </div>
      </Box>
      {f >= 34 && rows.map((r, i) => {
        const top = slotOf(r.from, r.to) - 100;
        const lift = i === 2 ? Math.sin(p * Math.PI) * -26 : 0;
        return (
          <div key={i} style={{ position: "absolute", left: 70, width: 940, height: 165, top: top + lift, zIndex: i === 2 ? 5 : 1 }}>
            <Box x={0} y={0} w={940} h={165} bg={r.c} delay={34 + i * 5} r={36} bw={9}>
              <div style={{ position: "absolute", left: 40, top: 30, fontFamily: display, fontWeight: 800, fontSize: 56, color: C.ink }}>{r.name}</div>
              <div style={{ position: "absolute", left: 40, top: 104, height: 18, width: i === 2 ? 520 : 380, borderRadius: 9, background: C.ink, opacity: 0.25 }} />
              {i === 2 && p > 0.9 && <div style={{ position: "absolute", right: 30, top: 30 }}><Pill size={44} bg={C.ink}>#1</Pill></div>}
            </Box>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 800, top: 1480, transform: `translateY(${(1 - pin) * -500}px)` }}>
        {f > 76 && [0, 1, 2].map((r) => (
          <div key={r} style={{ position: "absolute", left: 20 - r * 34, top: 150 - r * 14 + 30, width: 80 + r * 68, height: 30 + r * 26, borderRadius: "50%", border: `7px solid ${C.ink}`, opacity: Math.max(0, 1 - ((f - 76 - r * 5) % 40) / 36) }} />
        ))}
        <svg width="120" height="170" viewBox="0 0 120 170"><path d="M60 160 C10 100 8 70 8 56 A52 52 0 0 1 112 56 C112 70 110 100 60 160Z" fill={C.spark} stroke={C.ink} strokeWidth="9" strokeLinejoin="round" /><circle cx="60" cy="56" r="20" fill={C.white} stroke={C.ink} strokeWidth="7" /></svg>
      </div>
      <Corner delay={60} mood="wow" />
    </Bg>
  );
};

/* 6 — AI social */
export const S6: React.FC = () => {
  const f = useCurrentFrame();
  const colors = [C.lilac, C.yellow, C.teal];
  return (
    <Bg color={C.spark}>
      <Head n="03" name="AI Social" lines={["Posts that", "write", "themselves."]} />
      <Box x={290} y={800} w={500} h={880} delay={10} r={74} bw={12}>
        <div style={{ width: 150, height: 14, borderRadius: 9, background: C.ink, margin: "26px auto 0" }} />
        {[0, 1, 2].map((i) => (
          <Pop key={i} delay={22 + i * 12} from="up" rot={0} style={{ margin: "28px 30px 0", position: "relative" }}>
            <div style={{ height: 210, background: colors[i], border: `7px solid ${C.ink}`, borderRadius: 30, position: "relative" }}>
              <div style={{ position: "absolute", left: 24, top: 22, width: 52, height: 52, borderRadius: 99, background: C.ink }} />
              <div style={{ position: "absolute", left: 92, top: 30, height: 16, width: 180, borderRadius: 8, background: C.ink }} />
              <div style={{ position: "absolute", left: 24, top: 110, height: 16, width: 330, borderRadius: 8, background: C.ink, opacity: 0.35 }} />
              <div style={{ position: "absolute", left: 24, top: 148, height: 16, width: 220, borderRadius: 8, background: C.ink, opacity: 0.35 }} />
            </div>
          </Pop>
        ))}
      </Box>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const t = f - 40 - i * 7;
        if (t < 0) return null;
        const life = (t % 60) / 60;
        const x = 250 + ((i * 163) % 600) + Math.sin(t / 7 + i) * 26;
        const y = 1500 - life * 760;
        return (
          <svg key={i} width="90" height="82" viewBox="0 0 90 82" style={{ position: "absolute", left: x, top: y, opacity: life < 0.8 ? 1 : (1 - life) * 5, transform: `scale(${0.7 + (i % 3) * 0.25}) rotate(${Math.sin(t / 9) * 14}deg)` }}>
            <path d="M45 76 C8 48 4 30 12 18 C22 6 38 10 45 24 C52 10 68 6 78 18 C86 30 82 48 45 76Z" fill={i % 2 ? C.paper : C.ink} stroke={C.ink} strokeWidth="6" strokeLinejoin="round" />
          </svg>
        );
      })}
      <Pop delay={60} rot={12} style={{ position: "absolute", left: 90, top: 700 }}>
        <Pill bg={C.yellow} color={C.ink} size={42}>AI-powered ✦</Pill>
      </Pop>
      <Corner delay={48} mood="grin" />
    </Bg>
  );
};

/* 7 — care */
export const S7: React.FC = () => {
  const f = useCurrentFrame();
  const items = ["Updates", "Backups", "Security", "Fixes"];
  return (
    <Bg color={C.paper2}>
      <Head n="04" name="Care" lines={["Your site,", "actually taken", "care of."]} />
      <div style={{ position: "absolute", left: 70, top: 800 }}>
        {items.map((t, i) => {
          const d = 16 + i * 16;
          const draw = ip(f, [d + 6, d + 16], [1, 0]);
          return (
            <Pop key={t} delay={d - 6} from="left" rot={0} style={{ display: "flex", alignItems: "center", gap: 30, marginBottom: 34 }}>
              <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r="56" fill={C.spark} stroke={C.ink} strokeWidth="9" />
                <path d="M36 68 L57 90 L96 44" fill="none" stroke={C.white} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100" strokeDashoffset={100 * draw} />
              </svg>
              <H size={118}>{t}</H>
            </Pop>
          );
        })}
      </div>
      <Pop delay={70} rot={-8} style={{ position: "absolute", left: 70, top: 1560 }}>
        <H serifFont size={104} color={C.sandInk}>so you never have to.</H>
      </Pop>
      <Corner delay={40} mood="happy" />
    </Bg>
  );
};

/* 8 — free tools */
export const S8: React.FC = () => {
  const f = useCurrentFrame();
  const tools = [
    { n: "PromptNest", t: "Never stare at a blank screen again.", g: ">_", c: C.spark },
    { n: "SiteCheckr", t: "Find out what's really going on with your site.", g: "✓", c: C.teal },
    { n: "RankView", t: "See how visible your business is.", g: "#1", c: C.yellow },
  ];
  return (
    <Bg color={C.ink}>
      <div style={{ position: "absolute", top: 130, left: 70 }}>
        <Pop delay={2}><Pill bg={C.spark} color={C.ink} size={40}>05 · Smart tools</Pill></Pop>
        <Pop delay={8} rot={-5}><H size={150} color={C.paper} style={{ marginTop: 30 }}>Free AI tools.</H></Pop>
        <Pop delay={16} rot={5}><H serifFont size={110} color={C.lift}>try them on the site</H></Pop>
      </div>
      {tools.map((t, i) => (
        <Pop key={t.n} float={6} delay={26 + i * 18} from={i % 2 ? "right" : "left"} rot={0} style={{ position: "absolute", left: 70, top: 640 + i * 360, width: 940 }}>
          <div style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)`, background: C.paper, border: `8px solid ${C.paper}`, borderRadius: 48, display: "flex", alignItems: "center", gap: 36, padding: "40px 40px", height: 250, boxSizing: "border-box" }}>
            <div style={{ width: 170, height: 170, borderRadius: 40, background: t.c, border: `8px solid ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontWeight: 800, fontSize: 80, color: C.ink, flexShrink: 0 }}>{t.g}</div>
            <div>
              <H size={84}>{t.n}</H>
              <div style={{ fontFamily: body, fontWeight: 600, fontSize: 36, color: C.sandInk, marginTop: 10, lineHeight: 1.2 }}>{t.t}</div>
            </div>
          </div>
        </Pop>
      ))}
      <Pop delay={90} from="up" style={{ position: "absolute", right: 60, bottom: 40 }}>
        <Bingo size={200} mood="wow" style={hopStyle(Math.max(0, f - 90), 30, 50)} />
      </Pop>
    </Bg>
  );
};

/* 9 — receipts */
export const S9: React.FC = () => {
  const f = useCurrentFrame();
  const stats = [
    { v: 140, s: "+", l: "Sites shipped", d: 0 },
    { v: 0.9, s: "s", l: "Median load time", d: 1 },
    { v: 3.4, s: "×", l: "Lift in organic traffic", d: 2 },
    { v: 96, s: "", l: "Median Lighthouse score", d: 3 },
  ];
  return (
    <Bg color={C.paper}>
      <Pop delay={2} rot={-5} style={{ position: "absolute", top: 130, left: 70 }}>
        <H size={150}>The <span style={{ fontFamily: serif, fontStyle: "italic", fontWeight: 400, color: C.spark }}>receipts.</span></H>
      </Pop>
      {stats.map((s, i) => {
        const x = 70 + (i % 2) * 480, y = 460 + Math.floor(i / 2) * 560;
        const prog = ip(f, [14 + s.d * 8, 52 + s.d * 8], [0, 1]);
        const val = s.v * prog;
        const txt = s.v < 10 ? val.toFixed(1) : Math.round(val).toString();
        return (
          <Pop key={s.l} float={6} delay={10 + s.d * 8} rot={i % 2 ? 6 : -6} style={{ position: "absolute", left: x, top: y, width: 450 }}>
            <div style={{ background: [C.yellow, C.teal, C.lilac, C.spark][i], border: `9px solid ${C.ink}`, borderRadius: 44, padding: "40px 34px", height: 480, boxSizing: "border-box" }}>
              <H size={190} color={C.ink}>{txt}{s.s}</H>
              <div style={{ fontFamily: body, fontWeight: 600, fontSize: 44, color: C.ink, marginTop: 30, lineHeight: 1.15 }}>{s.l}</div>
            </div>
          </Pop>
        );
      })}
      <Corner delay={70} mood="grin" />
    </Bg>
  );
};

/* 10 — CTA */
export const S10: React.FC = () => {
  const f = useCurrentFrame();
  const pieces = Array.from({ length: 46 }, (_, i) => {
    const a = random(`a${i}`) * Math.PI * 2, v = 14 + random(`v${i}`) * 26;
    const t = Math.max(0, f - 18);
    return {
      x: 540 + Math.cos(a) * v * t * 0.28, y: 760 + Math.sin(a) * v * t * 0.28 - 12 * t + 0.32 * t * t,
      r: random(`r${i}`) * 360 + t * (random(`s${i}`) * 14 - 7), c: [C.ink, C.paper, C.yellow, C.teal, C.lilac][i % 5], w: 28 + random(`w${i}`) * 34,
    };
  });
  const land = ip(f, [100, 118], [0, 1]);
  return (
    <Bg color={C.spark}>
      {f >= 18 && pieces.map((p, i) => (
        <div key={i} style={{ position: "absolute", left: p.x, top: p.y, transform: `rotate(${p.r}deg) skewX(-14deg)`, width: p.w, height: p.w * 1.5, background: p.c, border: `5px solid ${C.ink}` }} />
      ))}
      <Pop delay={4} from="up" style={{ position: "absolute", top: 380, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <Bingo size={460} mood="grin" look={[0, -0.3]} style={hopStyle(Math.max(0, f - 8), 36, 130)} />
      </Pop>
      <Pop delay={30} rot={-6} style={{ position: "absolute", top: 930, left: 0, right: 0, textAlign: "center" }}>
        <H size={120} color={C.ink}>Ready for your</H>
      </Pop>
      <Pop delay={42} rot={6} style={{ position: "absolute", top: 1010, left: 0, right: 0, textAlign: "center" }}>
        <H serifFont size={360} color={C.paper}>aha?</H>
      </Pop>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 480, background: C.ink, transform: `translateY(${(1 - land) * 520}px)`, borderTopLeftRadius: 70, borderTopRightRadius: 70 }}>
        <div style={{ textAlign: "center", paddingTop: 70 }}>
          <H size={86} color={C.paper}>bingowebstudio.com</H>
          <div style={{ marginTop: 26, fontFamily: serif, fontStyle: "italic", fontSize: 66, color: C.lift }}>Websites · SEO · Social · Care · Tools</div>
          <div style={{ marginTop: 22, fontFamily: body, fontWeight: 600, fontSize: 36, color: C.sand }}>Try our free tools today</div>
        </div>
      </div>
    </Bg>
  );
};
