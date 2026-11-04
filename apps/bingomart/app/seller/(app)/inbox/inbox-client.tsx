"use client";

import { useState } from "react";
import { Avatar, Chip, money, type Tone } from "@/components/kit";
import { MockButton, Pills } from "@/components/kit-client";
import { channelColor, conversations, convTag, slipChecks, type Msg } from "@/lib/mock/seller-core";

export function InboxClient() {
  const [activeId, setActiveId] = useState("c2");
  const [threads, setThreads] = useState<Record<string, Msg[]>>(() => Object.fromEntries(conversations.map((c) => [c.id, c.msgs])));
  const [draft, setDraft] = useState("");
  const [human, setHuman] = useState(false);

  const active = conversations.find((c) => c.id === activeId)!;
  const tag = convTag[active.tag as keyof typeof convTag];

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setThreads((t) => ({ ...t, [activeId]: [...t[activeId], { from: "me", text }] }));
    setDraft("");
  };

  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-card lg:grid-cols-[19rem_minmax(0,1fr)] 2xl:grid-cols-[19rem_minmax(0,1fr)_20rem]">
      <aside className="border-line lg:border-r">
        <div className="border-b border-[#eee9dd] p-3">
          <Pills label="စစ်ထုတ်ရန်" options={["အားလုံး", "လူလိုသည် 3", "AI ဖြေနေ 9"]} />
        </div>
        <ul className="max-h-72 overflow-y-auto lg:max-h-none">
          {conversations.map((c) => {
            const t = convTag[c.tag as keyof typeof convTag];
            const last = threads[c.id].at(-1)!;
            return (
              <li key={c.id}>
                <button type="button" aria-current={c.id === activeId} onClick={() => setActiveId(c.id)} className={`flex w-full gap-3 border-b border-[#eee9dd] p-3 text-left ${c.id === activeId ? "bg-mint" : "hover:bg-ground"}`}>
                  <Avatar name={c.name} color={channelColor[c.ch]} />
                  <span className="min-w-0 flex-1">
                    <span className="flex justify-between gap-2"><span className="truncate text-[0.9375rem] font-semibold">{c.name}</span><span className="flex-none text-xs text-soft">{c.time}</span></span>
                    <span className="block truncate text-[0.8125rem] text-[#3b433e]">{last.text}</span>
                    <span className="mt-1 flex flex-wrap gap-1.5"><Chip>{c.ch}</Chip><Chip tone={t[1] as Tone}>{t[0]}</Chip></span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <section className="flex min-w-0 flex-col bg-ground">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-card px-4 py-3">
          <div className="min-w-0">
            <h2 className="text-base">{active.name} <Chip>{active.ch}</Chip></h2>
            <p className="text-[0.8125rem] text-soft">{tag[0]}{human ? " · သင်ဖြေနေသည်" : ""}</p>
          </div>
          <button type="button" aria-pressed={human} onClick={() => setHuman(!human)} className="btn btn-ghost text-sm">{human ? "AI ကို ပြန်ဖွင့်မည်" : "AI ရပ်၍ ကိုယ်တိုင်ဖြေမည်"}</button>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4" aria-live="polite">
          {threads[activeId].map((m, i) => (
            <div key={i} className={`max-w-[85%] rounded-2xl border px-3.5 py-2.5 text-[0.9375rem] break-words ${m.from === "them" ? "self-start border-line bg-card" : "self-end border-[#bfd9d1] bg-mint"}`}>
              {m.from === "ai" ? <span className="mr-1.5"><Chip tone="ship">AI</Chip></span> : null}
              {m.from === "me" ? <span className="mr-1.5"><Chip tone="ok">သင်</Chip></span> : null}
              {m.slip ? <span aria-hidden="true" className="mb-1.5 flex h-20 w-16 items-center justify-center rounded-lg bg-[#e2ecf3] text-center text-[0.6875rem] text-[#4a524d]">[ငွေလွှဲ စလစ်]</span> : null}
              {m.text}
            </div>
          ))}

          {activeId === "c2" ? (
            <div className="flex w-full max-w-lg flex-col gap-2.5 self-end rounded-2xl border border-line bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[0.9375rem]"><span className="mr-1.5"><Chip tone="ship">AI</Chip></span>ငွေစလစ် စစ်ဆေးချက်</h3>
                <Chip tone="bad">ပမာဏ မကိုက်ပါ</Chip>
              </div>
              <ul className="flex flex-col gap-2 text-sm">
                {slipChecks.map((k) => (
                  <li key={k.label} className="flex flex-wrap items-center gap-2.5">
                    <span aria-hidden="true" className={`flex h-5 w-5 flex-none items-center justify-center rounded-full text-xs font-bold ${k.ok ? "bg-mint text-[#0a5547]" : "bg-danger-wash text-danger"}`}>{k.ok ? "✓" : "!"}</span>
                    <span className="flex-1 text-[#3b433e]">{k.label}</span>
                    <span className="font-semibold">{k.value}</span>
                  </li>
                ))}
              </ul>
              <p className="rounded-xl bg-danger-wash px-3 py-2 text-[0.8125rem] text-danger">အော်ဒါ {money(128500)}၊ လွှဲငွေ {money(118500)} — {money(10000)} လိုနေသည်။ ပစ္စည်း မပို့မီ သင့်ဆုံးဖြတ်ချက် လိုသည်။</p>
              <div className="flex flex-wrap gap-2">
                <MockButton done="တောင်းပြီး">ကျန်ငွေ တောင်းရန်</MockButton>
                <MockButton done="လက်ခံပြီး" className="btn-ghost">ဤအတိုင်း လက်ခံမည်</MockButton>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2.5 border-t border-line bg-card p-3">
          {activeId === "c2" ? (
            <button type="button" onClick={() => setDraft("ငွေလွှဲပမာဏ 118,500 ကျပ် ရရှိပါသည်။ ကျန်ငွေ 10,000 ကျပ် ဆက်လွှဲပေးပါရန် မေတ္တာရပ်ခံပါသည်။")} className="rounded-xl bg-ground px-3 py-2 text-left text-[0.8125rem] text-[#3b433e]">
              <b>AI ပြန်စာ မူကြမ်း</b> · “ငွေလွှဲပမာဏ 118,500 ကျပ် ရရှိပါသည်။ ကျန်ငွေ 10,000 ကျပ် ဆက်လွှဲပေးပါရန် မေတ္တာရပ်ခံပါသည်။”
            </button>
          ) : null}
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2.5">
            <label className="flex-1"><span className="sr-only">စာရိုက်ပါ</span><input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="စာရိုက်ပါ…" className="field" /></label>
            <button type="submit" className="btn btn-primary">ပို့မည်</button>
          </form>
        </div>
      </section>

      <aside className="hidden flex-col gap-4 border-l border-line p-5 2xl:flex">
        <div className="flex items-center gap-3">
          <Avatar name={active.name} color={channelColor[active.ch]} size="h-12 w-12" />
          <div className="min-w-0"><p className="font-bold">{active.name}</p><p className="text-[0.8125rem] text-soft">09 7xx xxx 123 · ပြန်ဝယ်သူ</p></div>
        </div>
        <dl className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-ground p-3"><dt className="text-xs text-soft">အော်ဒါ အရေအတွက်</dt><dd className="text-lg font-bold">6</dd></div>
          <div className="rounded-xl bg-ground p-3"><dt className="text-xs text-soft">စုစုပေါင်း ဝယ်ယူ</dt><dd className="text-lg font-bold">842,000</dd></div>
        </dl>
        <label className="text-sm font-semibold">မှတ်စု
          <textarea rows={3} placeholder="ဖောက်သည်နှင့် ပတ်သက်သော မှတ်စု ရေးရန်" className="field mt-1 font-normal" />
        </label>
        <p className="mt-auto text-xs text-soft">AI ဖြေကြားမှုအားလုံးကို မှတ်တမ်းတင်ထားပြီး သင်ပြန်ကြည့်နိုင်သည်။</p>
      </aside>
    </div>
  );
}
