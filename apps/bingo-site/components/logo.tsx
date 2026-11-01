type Tone = "ink" | "paper";

/**
 * The mark: the browser window hiding inside the logo's `B` —
 * chrome bar, three dots, and the orange counter-shape bottom-left.
 */
export function LogoMark({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: Tone;
}) {
  const stroke = tone === "ink" ? "#24272c" : "#f7f2ea";
  const dot = tone === "ink" ? "#24272c" : "#f7f2ea";

  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <clipPath id="bingo-window">
          <rect x="4" y="4" width="32" height="32" rx="9.5" />
        </clipPath>
      </defs>

      {/* orange counter-shape, clipped to the window silhouette */}
      <g clipPath="url(#bingo-window)">
        <path d="M4 21.5h11.5V36H4z" fill="#e2622b" />
      </g>

      {/* window frame */}
      <rect
        x="4"
        y="4"
        width="32"
        height="32"
        rx="9.5"
        fill="none"
        stroke={stroke}
        strokeWidth="4"
      />

      {/* chrome bar */}
      <path
        d="M5.4 14h29.2"
        stroke={stroke}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* the three dots, straight off the mark */}
      <circle cx="10.6" cy="9.1" r="1.65" fill={dot} />
      <circle cx="15.8" cy="9.1" r="1.65" fill="#e2622b" />
      <circle cx="21" cy="9.1" r="1.65" fill="#b79e8b" />
    </svg>
  );
}

/** The lockup: mark + wordmark + the slanted orange accent from the logo's `i`. */
export function Logo({
  tone = "ink",
  className = "",
  showTagline = false,
}: {
  tone?: Tone;
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark tone={tone} className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.5rem] font-extrabold tracking-[-0.05em] ${
            tone === "ink" ? "text-ink" : "text-paper"
          }`}
        >
          Bingo
          <span
            aria-hidden="true"
            className="ml-[0.14em] inline-block h-[0.5em] w-[0.2em] -skew-x-[18deg] bg-spark align-baseline"
          />
        </span>
        {showTagline ? (
          <span className="mt-1 text-[0.5rem] font-semibold tracking-[0.34em] text-sand-ink uppercase">
            Web Design Studio
          </span>
        ) : null}
      </span>
    </span>
  );
}

/** The parallelogram on its own — used as a list bullet and section marker. */
export function Spark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block -skew-x-[18deg] bg-spark ${className}`}
    />
  );
}
