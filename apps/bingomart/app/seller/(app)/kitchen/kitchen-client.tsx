"use client";

import { useState } from "react";
import { Chip, type Tone } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { kitchenColumns } from "@/lib/mock/more";

export function KitchenBoard() {
  const [taken, setTaken] = useState<Set<string>>(new Set());
  return (
    <div className="flex flex-col gap-3.5 lg:flex-row lg:items-stretch">
      {kitchenColumns.map((col) => (
        <section key={col.title} className="min-w-0 flex-1 overflow-hidden rounded-2xl bg-ground">
          <header className="flex items-center justify-between gap-3 border-b-2 px-4 py-3" style={{ borderColor: col.color }}>
            <h2 className="font-bold">{col.title}</h2>
            <span className="rounded-full px-2.5 py-0.5 text-[0.8125rem] font-bold text-white" style={{ background: col.color }}>{col.tickets.length}</span>
          </header>
          <ul className="flex flex-col gap-3 p-3">
            {col.tickets.map((t) => (
              <li key={t.id} className="flex flex-col gap-2 rounded-xl border border-line bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold">{t.id}</span>
                  <Chip tone={(t.urgent ? "bad" : "mute") as Tone}>{t.timer}</Chip>
                </div>
                <p className="text-[0.8125rem] text-[#3b433e]">{t.items}</p>
                <div className="flex justify-between text-[0.8125rem] text-soft"><span>{t.mode}</span><span>{t.cust}</span></div>
                {taken.has(t.id) ? <p className="text-center text-sm font-semibold text-teal">✓ {t.btn}</p> : <MockButton done="ပြီးစီး" className="btn-ghost w-full text-sm">{t.btn}</MockButton>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
