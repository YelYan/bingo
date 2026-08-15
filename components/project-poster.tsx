import type { PosterVariant } from "@/lib/projects";

/**
 * Case-study artwork, drawn rather than photographed.
 * A studio that hand-codes shouldn't ship stock imagery — so each project
 * gets a generated composition in its own palette, with a single orange
 * element that moves on hover. That element is the aha.
 */
export function ProjectPoster({
  variant,
  ink,
  spark,
  paper,
  className = "",
}: {
  variant: PosterVariant;
  ink: string;
  spark: string;
  paper: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={`h-full w-full ${className}`}
    >
      <rect width="400" height="300" fill={paper} />
      {renderVariant(variant, ink, spark)}
    </svg>
  );
}

const hover =
  "transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function renderVariant(variant: PosterVariant, ink: string, spark: string) {
  switch (variant) {
    /* A search index made visible: 48 cells, one of them the answer. */
    case "grid": {
      const cells = [];
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 8; c++) {
          const isSpark = r === 3 && c === 5;
          cells.push(
            <rect
              key={`${r}-${c}`}
              x={40 + c * 38}
              y={40 + r * 36}
              width="22"
              height="22"
              rx="4"
              fill={isSpark ? spark : ink}
              opacity={isSpark ? 1 : 0.1 + (r + c) * 0.018}
              className={isSpark ? `${hover} group-hover:scale-125` : undefined}
              style={
                isSpark
                  ? { transformOrigin: `${40 + 5 * 38 + 11}px ${40 + 3 * 36 + 11}px` }
                  : undefined
              }
            />,
          );
        }
      }
      return <g>{cells}</g>;
    }

    /* Six shops, one shared skeleton. */
    case "arc":
      return (
        <g fill="none" strokeLinecap="round">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M60 250 A ${60 + i * 42} ${60 + i * 42} 0 0 1 ${60 + (60 + i * 42) * 2} 250`}
              stroke={ink}
              strokeWidth="2"
              opacity={0.16 + i * 0.04}
            />
          ))}
          <path
            d="M60 250 A 144 144 0 0 1 348 250"
            stroke={spark}
            strokeWidth="9"
            strokeDasharray="0 90 120 400"
            className={`${hover} group-hover:[stroke-dashoffset:-120]`}
          />
          <circle cx="204" cy="250" r="5" fill={ink} />
        </g>
      );

    /* 3,400 URLs pruned to 240 — the stack thins out. */
    case "stack":
      return (
        <g>
          {[
            300, 268, 240, 216, 190, 168, 144, 122, 100, 82,
          ].map((w, i) => (
            <rect
              key={i}
              x="50"
              y={38 + i * 23}
              width={w}
              height="11"
              rx="5.5"
              fill={i === 4 ? spark : ink}
              opacity={i === 4 ? 1 : 0.13}
              className={i === 4 ? `${hover} group-hover:translate-x-6` : undefined}
            />
          ))}
        </g>
      );

    /* 900 variants orbiting one product. */
    case "orbit":
      return (
        <g>
          <circle cx="200" cy="150" r="112" fill="none" stroke={ink} strokeWidth="1.5" opacity="0.18" />
          <circle cx="200" cy="150" r="76" fill="none" stroke={ink} strokeWidth="1.5" opacity="0.24" />
          <circle cx="200" cy="150" r="40" fill={ink} opacity="0.9" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={200 + Math.cos(rad) * 112}
                cy={150 + Math.sin(rad) * 112}
                r="4.5"
                fill={ink}
                opacity="0.28"
              />
            );
          })}
          <circle
            cx={200 + 76}
            cy={150}
            r="13"
            fill={spark}
            className={`${hover} group-hover:rotate-[120deg]`}
            style={{ transformOrigin: "200px 150px" }}
          />
        </g>
      );

    /* Shelf presence: letterform blocks with one window cut through. */
    case "type":
      return (
        <g>
          <rect x="52" y="60" width="46" height="180" rx="6" fill={ink} opacity="0.88" />
          <rect x="112" y="60" width="46" height="180" rx="6" fill={ink} opacity="0.5" />
          <rect x="172" y="60" width="46" height="180" rx="6" fill={ink} opacity="0.28" />
          <rect x="232" y="60" width="46" height="180" rx="6" fill={ink} opacity="0.16" />
          <rect x="292" y="60" width="46" height="180" rx="6" fill={ink} opacity="0.1" />
          <rect
            x="112"
            y="122"
            width="46"
            height="56"
            rx="6"
            fill={spark}
            className={`${hover} group-hover:translate-y-[62px]`}
          />
        </g>
      );

    /* Water, and a season that finally opened. */
    case "wave":
      return (
        <g fill="none" strokeLinecap="round">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M20 ${88 + i * 26} C 105 ${48 + i * 26}, 190 ${128 + i * 26}, 275 ${88 + i * 26} S 380 ${48 + i * 26}, 386 ${76 + i * 26}`}
              stroke={ink}
              strokeWidth="2"
              opacity={0.3 - i * 0.035}
            />
          ))}
          <path
            d="M20 166 C 105 126, 190 206, 275 166 S 380 126, 386 154"
            stroke={spark}
            strokeWidth="6"
            className={`${hover} group-hover:translate-y-[-26px]`}
          />
        </g>
      );
  }
}
