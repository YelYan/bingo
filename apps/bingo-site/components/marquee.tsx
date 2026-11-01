import { Fragment } from "react";

/**
 * CSS-only ticker. The list is rendered twice so the -50% translate loops
 * seamlessly; the duplicate is hidden from assistive tech.
 */
export function Marquee({
  items,
  duration = 42,
  tone = "ink",
}: {
  items: string[];
  duration?: number;
  tone?: "ink" | "paper";
}) {
  const run = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
      {...(hidden ? {} : { "aria-label": "What we do" })}
    >
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <li
            className={`px-8 font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-bold tracking-[-0.04em] whitespace-nowrap ${
              tone === "paper" ? "text-paper" : "text-ink"
            }`}
          >
            {item}
          </li>
          <li aria-hidden="true" className="shrink-0">
            <span className="inline-block h-3 w-[0.6rem] -skew-x-[18deg] bg-spark" />
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div className="marquee-host relative overflow-hidden py-7">
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
