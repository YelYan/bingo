import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Spark } from "./logo";

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

type ButtonTone = "spark" | "ink" | "ghost" | "paper";

const toneClasses: Record<ButtonTone, string> = {
  // Charcoal on orange, not white: white on #e2622b is only 3.5:1, and the
  // ink/orange pairing is the logo's own combination anyway.
  spark:
    "bg-spark text-ink-2 hover:bg-spark-lift active:bg-spark-lift border-transparent",
  ink: "bg-ink text-paper hover:bg-ink-2 active:bg-ink-3 border-transparent",
  ghost:
    "bg-transparent text-ink border-ink/25 hover:border-ink hover:bg-ink hover:text-paper",
  paper:
    "bg-paper text-ink border-transparent hover:bg-white active:bg-paper-2",
};

/** Min height 48px keeps every CTA above the 44px touch target floor. */
const buttonBase =
  "group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full border px-7 text-[0.9375rem] font-semibold tracking-[-0.01em] transition-colors duration-200";

export function ButtonLink({
  href,
  children,
  tone = "spark",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const external = href.startsWith("http") || href.startsWith("mailto:");

  if (external) {
    return (
      <a
        href={href}
        className={`${buttonBase} ${toneClasses[tone]} ${className}`}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
      >
        {children}
        <Arrow />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${buttonBase} ${toneClasses[tone]} ${className}`}
      {...rest}
    >
      {children}
      <Arrow />
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section furniture                                                   */
/* ------------------------------------------------------------------ */

/** `sand` on light backgrounds, `paper` on dark ones — the taupe needs to
 *  flip direction to stay above 4.5:1 either way. */
export function Eyebrow({
  children,
  tone = "sand",
}: {
  children: ReactNode;
  tone?: "sand" | "spark" | "paper";
}) {
  const color =
    tone === "spark"
      ? "text-spark-deep"
      : tone === "paper"
        ? "text-sand"
        : "text-sand-ink";

  return (
    <p className="flex items-center gap-2.5">
      <Spark className="h-2.5 w-[0.4rem]" />
      <span
        className={`font-sans text-[0.6875rem] font-semibold tracking-[0.22em] uppercase ${color}`}
      >
        {children}
      </span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "ink",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Eyebrow tone={tone === "paper" ? "paper" : "sand"}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2
        className={`mt-5 text-[clamp(2.1rem,5.2vw,3.9rem)] ${
          tone === "paper" ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-6 max-w-2xl text-[1.0625rem] leading-relaxed sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          } ${tone === "paper" ? "text-sand-soft" : "text-ink-soft"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** Consistent page gutter. One place to change the whole grid. */
export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}) {
  const width =
    size === "wide"
      ? "max-w-[100rem]"
      : size === "narrow"
        ? "max-w-4xl"
        : "max-w-[84rem]";
  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Tag({
  children,
  tone = "line",
}: {
  children: ReactNode;
  tone?: "line" | "spark" | "dark";
}) {
  const map = {
    line: "border-line text-ink-soft",
    spark: "border-spark/35 bg-spark-wash text-spark-deep",
    dark: "border-line-dark text-sand-soft",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-sans text-[0.6875rem] font-semibold tracking-[0.1em] uppercase ${map[tone]}`}
    >
      {children}
    </span>
  );
}
