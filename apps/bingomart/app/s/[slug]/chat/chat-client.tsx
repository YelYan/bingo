"use client";

import { useState } from "react";

type Bubble = { from: "ai" | "me"; text: string };

const START: Bubble[] = [
  { from: "ai", text: "မင်္ဂလာပါ 🙏 ဘာကူညီပေးရမလဲ? ပစ္စည်း၊ ဈေးနှုန်း၊ ပို့ဆောင်ရေး မေးနိုင်ပါတယ်။" },
  { from: "me", text: "ရှပ်အင်္ကျီ အဖြူ M ရှိလား? ဘယ်လောက်လဲ?" },
  { from: "ai", text: "ရှပ်အင်္ကျီ အဖြူ M ရှိပါတယ် (ကျန် 12 ထည်)။ တစ်ထည် 28,000 ကျပ် ဖြစ်ပါတယ်။" },
];

const REPLIES: Record<string, string> = {
  "ဒါဆို ဒီအတိုင်း ယူမယ်": "ကောင်းပါပြီ ✅ အော်ဒါထဲ ထည့်လိုက်ပါပြီ။ ဖုန်းနံပါတ်နဲ့ ပို့ဆောင်မည့် မြို့နယ် ပြောပေးပါ။ ပို့ဆောင်ချိန် ခန့်မှန်းပြီး ပြပေးပါမယ်။",
  "အရောင်တခြား ရှိလား?": "လောလောဆယ် အဖြူနဲ့ အနက် ရှိပါတယ်။ ဘယ်အရောင် ယူမလဲ?",
  "ပို့ခ ဘယ်လောက်လဲ?": "ရန်ကုန်တွင်း ပို့ခ 2,000 ကျပ် ဖြစ်ပါတယ်။ ဘယ်မြို့နယ်ကို ပို့ရမလဲ?",
};

export function ChatClient() {
  const [messages, setMessages] = useState(START);
  const [draft, setDraft] = useState("");

  const say = (text: string) => {
    const reply = REPLIES[text] ?? "ဆိုင်ရှင်ထံ လွှဲပေးလိုက်ပါမယ်။ လူနဲ့ မကြာမီ ပြန်ပြောပေးပါမယ်။";
    setMessages((m) => [...m, { from: "me", text }, { from: "ai", text: reply }]);
    setDraft("");
  };

  return (
    <div className="flex flex-1 flex-col bg-[#e7eeec]">
      <p className="flex items-center justify-center bg-cream px-4 py-2 text-center text-[0.8125rem] text-amber">ဤသည်မှာ AI ဖြစ်သည်။ လူနှင့်ပြောလိုပါက အချိန်မရွေး ပြောနိုင်သည်။</p>
      <div className="flex flex-1 flex-col gap-2.5 p-4" aria-live="polite">
        {messages.map((m, i) => (
          <p key={i} className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[0.9375rem] break-words ${m.from === "ai" ? "self-start bg-white" : "self-end bg-teal text-white"}`}>{m.text}</p>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 px-3.5 py-2">
        {Object.keys(REPLIES).map((q) => (
          <button key={q} type="button" onClick={() => say(q)} className="min-h-11 rounded-full border border-teal bg-white px-3.5 text-sm font-semibold text-teal">{q}</button>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (draft.trim()) say(draft.trim()); }} className="sticky bottom-0 flex items-center gap-2.5 border-t border-[#d9e0dd] bg-white p-3">
        <label className="flex-1"><span className="sr-only">စာရိုက်ပါ</span><input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="စာရိုက်ပါ…" className="field !rounded-full !bg-[#f0f4f2]" /></label>
        <button type="submit" className="btn btn-primary !rounded-full">ပို့မည်</button>
      </form>
    </div>
  );
}
