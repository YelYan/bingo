import type { ReactNode } from "react";

/**
 * The signature container: the browser chrome that lives inside the logo's `B`,
 * scaled up to hold real content. Used for the hero, project posters and
 * anything that should read as "a website, sitting on a desk".
 */
export function WindowFrame({
  children,
  label,
  tone = "light",
  className = "",
  bodyClassName = "",
}: {
  children: ReactNode;
  label?: string;
  tone?: "light" | "dark";
  className?: string;
  bodyClassName?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`overflow-hidden rounded-2xl border ${
        dark ? "border-line-dark bg-ink-2" : "border-line bg-paper"
      } ${className}`}
    >
      <div
        className={`flex items-center gap-2 border-b px-4 py-3 ${
          dark ? "border-line-dark bg-ink-3" : "border-line bg-paper-2"
        }`}
      >
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${dark ? "bg-sand-soft/40" : "bg-ink"}`}
          />
          <span className="h-2 w-2 rounded-full bg-spark" />
          <span className="h-2 w-2 rounded-full bg-sand" />
        </span>
        {label ? (
          <span
            className={`ml-2 truncate font-sans text-[0.6875rem] tracking-[0.12em] uppercase ${
              dark ? "text-sand-soft/70" : "text-sand-ink"
            }`}
          >
            {label}
          </span>
        ) : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
