"use client";

import { useId, useState, type ReactNode } from "react";

/* The small interactive pieces. They keep state in the browser only: this is a mock. */

export function Segmented({ options, defaultValue, label, onChange }: { options: string[]; defaultValue?: string; label: string; onChange?: (v: string) => void }) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  return (
    <div role="group" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-xl border border-line bg-card p-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => {
            setValue(o);
            onChange?.(o);
          }}
          className={`min-h-10 rounded-lg px-4 text-sm font-semibold ${value === o ? "bg-ink text-white" : "text-[#3b433e] hover:bg-ground"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function Pills({ options, defaultValue, label }: { options: string[]; defaultValue?: string; label: string }) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" aria-pressed={value === o} onClick={() => setValue(o)} className={`inline-flex min-h-11 items-center rounded-full border px-4 text-[0.9375rem] font-medium ${value === o ? "border-ink bg-ink text-white" : "border-[#d9d3c4] bg-card text-[#2b332e] hover:bg-ground"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function Switch({ label, defaultChecked = false, hint }: { label: string; defaultChecked?: boolean; hint?: string }) {
  const [on, setOn] = useState(defaultChecked);
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <label htmlFor={id} className="font-semibold">{label}</label>
        {hint ? <p className="text-[0.8125rem] text-soft">{hint}</p> : null}
      </div>
      <button id={id} type="button" role="switch" aria-checked={on} onClick={() => setOn(!on)} className={`relative h-8 w-14 flex-none rounded-full transition-colors ${on ? "bg-teal" : "bg-[#cfc8b5]"}`}>
        <span className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform ${on ? "translate-x-6" : ""}`} />
      </button>
    </div>
  );
}

export function Tabs({ tabs, label }: { tabs: { id: string; label: string; content: ReactNode }[]; label: string }) {
  const [active, setActive] = useState(tabs[0].id);
  const base = useId();
  return (
    <div>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-1 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`${base}-${t.id}`}
            role="tab"
            type="button"
            aria-selected={active === t.id}
            aria-controls={`${base}-${t.id}-panel`}
            onClick={() => setActive(t.id)}
            className={`min-h-11 border-b-2 px-4 text-[0.9375rem] font-semibold ${active === t.id ? "border-teal text-teal" : "border-transparent text-soft hover:text-ink"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} id={`${base}-${t.id}-panel`} role="tabpanel" aria-labelledby={`${base}-${t.id}`} hidden={active !== t.id} className="pt-4">
          {t.content}
        </div>
      ))}
    </div>
  );
}

export function Qty({ defaultValue = 1, label, min = 0, onChange }: { defaultValue?: number; label: string; min?: number; onChange?: (n: number) => void }) {
  const [n, setN] = useState(defaultValue);
  const set = (v: number) => {
    const next = Math.max(min, v);
    setN(next);
    onChange?.(next);
  };
  return (
    <div className="flex items-center gap-2">
      <button type="button" aria-label={`${label} လျှော့ရန်`} onClick={() => set(n - 1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9d3c4] bg-card text-lg font-semibold">−</button>
      <span aria-live="polite" className="min-w-6 text-center font-bold">{n}</span>
      <button type="button" aria-label={`${label} တိုးရန်`} onClick={() => set(n + 1)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9d3c4] bg-card text-lg font-semibold">+</button>
    </div>
  );
}

/** A button that only shows it worked, for actions that have no backend yet. */
export function MockButton({ children, done, className = "btn-primary", disabled }: { children: ReactNode; done: string; className?: string; disabled?: boolean }) {
  const [clicked, setClicked] = useState(false);
  return (
    <button type="button" disabled={disabled} onClick={() => setClicked(true)} aria-live="polite" className={`btn ${clicked ? "btn-ghost" : className}`}>
      {clicked ? `✓ ${done}` : children}
    </button>
  );
}

export function Toggle({ children, defaultOpen = false, title }: { children: ReactNode; defaultOpen?: boolean; title: string }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex min-h-11 w-full items-center justify-between gap-3 text-left font-semibold">
        {title}
        <span aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open ? <div className="pt-1">{children}</div> : null}
    </div>
  );
}
