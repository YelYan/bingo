import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate } from "remotion";
import { C, ease } from "./kit";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 } from "./scenes";

// [component, duration in frames @30fps, wipe colour entering this scene]
const SCENES: [React.FC, number, string][] = [
  [S1, 120, C.paper], [S2, 150, C.ink], [S3, 120, C.yellow], [S4, 90, C.teal], [S5, 90, C.lilac],
  [S6, 90, C.spark], [S7, 90, C.paper2], [S8, 120, C.ink], [S9, 150, C.paper], [S10, 180, C.spark],
];
export const TOTAL = SCENES.reduce((a, s) => a + s[1], 0); // 1200 = 40s

const starts = SCENES.map((_, i) => SCENES.slice(0, i).reduce((a, s) => a + s[1], 0));

/** Slanted colour-block wipe (nods to the logo's parallelogram) that hides each hard cut. */
const Wipe: React.FC<{ at: number; color: string }> = ({ at, color }) => {
  const f = useCurrentFrame();
  const x = f < at ? interpolate(f, [at - 9, at], [-130, 0], { extrapolateLeft: "clamp", easing: ease })
    : interpolate(f, [at, at + 9], [0, 130], { extrapolateRight: "clamp", easing: ease });
  if (f < at - 9 || f > at + 9) return null;
  return <div style={{ position: "absolute", top: 0, bottom: 0, left: "-25%", width: "150%", background: color, transform: `translateX(${x}%) skewX(-14deg)` }} />;
};

export const Promo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <Audio src={staticFile("music.wav")} volume={(fr) => 0.62 * interpolate(fr, [TOTAL - 36, TOTAL], [1, 0], { extrapolateLeft: "clamp" })} />
      <Audio src={staticFile("sfx.wav")} volume={1} />
      {SCENES.map(([Scene], i) => (
        <Sequence key={i} from={starts[i]} durationInFrames={SCENES[i][1]} layout="none">
          <Sequence from={0} durationInFrames={SCENES[i][1]}><Scene /></Sequence>
        </Sequence>
      ))}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {starts.slice(1).map((s, i) => <Wipe key={s} at={s} color={SCENES[i + 1][2]} />)}
      </AbsoluteFill>
      <div hidden>{f}</div>
    </AbsoluteFill>
  );
};
