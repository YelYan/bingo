import Link from "next/link";
import type { ReactNode } from "react";

/* Small building blocks shared by every screen. Server components, no state. */

const TONES = {
  ok: "bg-mint text-[#0a5547]",
  wait: "bg-[#fff1cc] text-amber",
  bad: "bg-danger-wash text-danger",
  ship: "bg-[#e1ecf9] text-[#1f4e8c]",
  mute: "bg-[#ece8de] text-[#4a524d]",
  dark: "bg-saffron text-[#2b2000]",
} as const;
export type Tone = keyof typeof TONES;

export function Chip({ tone = "mute", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-[0.8125rem] font-semibold whitespace-nowrap ${TONES[tone]}`}>{children}</span>;
}

export function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export function PageHead({ title, sub, actions, back }: { title: string; sub?: ReactNode; actions?: ReactNode; back?: { href: string; label: string } }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        {back ? (
          <Link href={back.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-teal">
            ← {back.label}
          </Link>
        ) : null}
        <h1 className="text-2xl break-words text-deep sm:text-[1.625rem]">{title}</h1>
        {sub ? <p className="text-sm text-soft">{sub}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export function Panel({ title, action, children, flush = false, className = "" }: { title?: string; action?: ReactNode; children: ReactNode; flush?: boolean; className?: string }) {
  return (
    <section className={`overflow-hidden rounded-2xl border border-line bg-card ${className}`}>
      {title || action ? (
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-4 pb-3">
          {title ? <h2 className="text-lg">{title}</h2> : <span />}
          {action}
        </div>
      ) : null}
      <div className={flush ? "" : `px-5 pb-5 ${title || action ? "" : "pt-5"}`}>{children}</div>
    </section>
  );
}

export function Stat({ label, value, unit, note, tone }: { label: string; value: ReactNode; unit?: string; note?: ReactNode; tone?: "good" }) {
  return (
    <div className="rounded-2xl border border-line bg-card px-5 py-4">
      <p className="text-sm text-soft">{label}</p>
      <p className="font-display text-[1.75rem] leading-tight font-bold break-words">
        {value}
        {unit ? <span className="ml-1 text-sm font-medium text-soft">{unit}</span> : null}
      </p>
      {note ? <p className={`text-[0.8125rem] ${tone === "good" ? "text-[#0a5547]" : "text-[#4a524d]"}`}>{note}</p> : null}
    </div>
  );
}

export function StatGrid({ children, cols = 4 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const map = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 xl:grid-cols-4" } as const;
  return <div className={`grid grid-cols-1 gap-4 ${map[cols]}`}>{children}</div>;
}

export type Col<T> = { key: string; label: string; render?: (row: T) => ReactNode; align?: "right"; className?: string };

export function DataTable<T extends Record<string, any>>({ cols, rows, caption, empty = "ဒေတာ မရှိသေးပါ။" }: { cols: Col<T>[]; rows: T[]; caption?: string; empty?: string }) {
  if (rows.length === 0) return <p className="px-5 pb-5 text-sm text-soft">{empty}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="bg-[#fbf9f4] text-[0.8125rem] text-soft">
          <tr>
            {cols.map((c) => (
              <th key={c.key} scope="col" className={`px-5 py-2 font-semibold ${c.align === "right" ? "text-right" : ""}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-line">
              {cols.map((c) => (
                <td key={c.key} className={`px-5 py-3 align-middle ${c.align === "right" ? "text-right" : ""} ${c.className ?? ""}`}>
                  {c.render ? c.render(row) : (row[c.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Bars({ data, highlight = -1, height = 170 }: { data: { label: string; value: number; display?: string }[]; highlight?: number; height?: number }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <ul className="flex items-end gap-2 sm:gap-4" style={{ height }} aria-label="ဇယား">
      {data.map((d, i) => (
        <li key={d.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
          <span className="text-xs text-[#4a524d]">{d.display ?? d.value}</span>
          <span
            className={`w-full max-w-14 rounded-t-lg rounded-b ${i === highlight ? "bg-teal" : "bg-[#bfd9d1]"}`}
            style={{ height: `${Math.max(4, (d.value / max) * (height - 56))}px` }}
          />
          <span className="text-[0.8125rem] text-[#4a524d]">{d.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function Meter({ value, max = 100, tone = "teal" }: { value: number; max?: number; tone?: "teal" | "bad" }) {
  return (
    <div role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} className="h-1.5 rounded-full bg-line">
      <div className={`h-1.5 rounded-full ${tone === "bad" ? "bg-danger" : "bg-teal"}`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  );
}

export function Notice({ tone = "wait", children }: { tone?: "wait" | "bad" | "ship" | "ok"; children: ReactNode }) {
  return (
    <p role={tone === "bad" ? "alert" : "note"} className={`rounded-xl px-4 py-3 text-sm ${TONES[tone]}`}>
      {children}
    </p>
  );
}

export function Avatar({ name, color = "#0e6b5b", size = "h-10 w-10" }: { name: string; color?: string; size?: string }) {
  return (
    <span aria-hidden="true" className={`flex ${size} flex-none items-center justify-center rounded-full font-bold text-white`} style={{ background: color }}>
      {Array.from(name.replace(/^(ဒေါ်|ကို|မ|ဦး)/, "").trim() || name)[0]}
    </span>
  );
}

export function KV({ items }: { items: { k: string; v: ReactNode }[] }) {
  return (
    <dl className="space-y-2 text-sm">
      {items.map((item) => (
        <div key={item.k} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
          <dt className="text-soft">{item.k}</dt>
          <dd className="min-w-0 text-right font-semibold break-words">{item.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A vertical timeline: done steps are teal, the current one saffron. */
export function Steps({ steps }: { steps: { title: string; time?: string; state: "done" | "now" | "todo" }[] }) {
  return (
    <ol>
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span aria-hidden="true" className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-sm font-bold ${s.state === "done" ? "bg-teal text-white" : s.state === "now" ? "bg-saffron text-[#2b2000]" : "bg-line text-soft"}`}>
              {s.state === "done" ? "✓" : s.state === "now" ? "•" : ""}
            </span>
            {i < steps.length - 1 ? <span aria-hidden="true" className={`min-h-6 w-0.5 flex-1 ${s.state === "done" ? "bg-teal" : "bg-line"}`} /> : null}
          </div>
          <div className="pb-3">
            <p className={`text-[0.9375rem] font-semibold ${s.state === "todo" ? "text-soft" : ""}`}>{s.title}</p>
            {s.time ? <p className="text-[0.8125rem] text-soft">{s.time}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

const TINTS = ["#e4efea", "#f3e6d3", "#e5e6f2", "#f2dfda", "#e9edd6", "#e2ecf3"];
export const tint = (i: number) => TINTS[i % TINTS.length];

/** A stand-in for a product photo. */
export function Photo({ i = 0, label, className = "h-28" }: { i?: number; label?: string; className?: string }) {
  return (
    <div role="img" aria-label={label ?? "ဓာတ်ပုံ နမူနာ"} className={`flex items-center justify-center text-[0.8125rem] text-[#4a524d] ${className}`} style={{ background: tint(i) }}>
      {label ?? "[ဓာတ်ပုံ]"}
    </div>
  );
}

export function Toolbar({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

export function Grid({ children, min = 18 }: { children: ReactNode; min?: number }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${min}rem), 1fr))` }}>
      {children}
    </div>
  );
}

/** Two columns that stack on small screens: main content and a side column. */
export function Split({ main, side, sideWidth = "22rem" }: { main: ReactNode; side: ReactNode; sideWidth?: string }) {
  return (
    <div className="grid items-start gap-4 lg:[grid-template-columns:minmax(0,1fr)_var(--side)]" style={{ ["--side" as string]: sideWidth }}>
      <div className="flex min-w-0 flex-col gap-4">{main}</div>
      <div className="flex min-w-0 flex-col gap-4">{side}</div>
    </div>
  );
}

export const money = (n: number) => `${n.toLocaleString("en-US")} ကျပ်`;
