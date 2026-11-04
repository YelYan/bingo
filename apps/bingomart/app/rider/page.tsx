"use client";

import { useState } from "react";
import { Chip, money, type Tone } from "@/components/kit";
import { riderSteps, riderStops } from "@/lib/mock/seller-core";

export default function RiderPage() {
  const [step, setStep] = useState(0);
  const [stopIndex, setStopIndex] = useState(0);
  const done = stopIndex >= riderStops.length;
  const stop = riderStops[Math.min(stopIndex, riderStops.length - 1)];
  const state = riderSteps[step];

  const next = () => {
    if (step === riderSteps.length - 1) {
      setStopIndex(stopIndex + 1);
      setStep(0);
    } else setStep(step + 1);
  };

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-ground">
      <header className="flex items-center justify-between gap-3 bg-ink px-4 py-3 text-white">
        <div>
          <h1 className="text-base">ပို့ဆောင်သူ · ကိုမျိုး</h1>
          <p className="text-[0.8125rem] text-[#9cb0a9]">ယနေ့ လမ်းကြောင်း · {riderStops.length} အော်ဒါ</p>
        </div>
        <div className="text-right">
          <p className="text-[1.0625rem] font-bold">{riderStops.reduce((s, r) => s + r.cod, 0).toLocaleString("en-US")}</p>
          <p className="text-xs text-[#9cb0a9]">COD ကောက်ရန်</p>
        </div>
      </header>

      {done ? (
        <main id="main" className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="text-xl font-bold text-deep">ယနေ့ ပို့ဆောင်မှု ပြီးပါပြီ</p>
          <button type="button" onClick={() => setStopIndex(0)} className="btn btn-ghost">အစမှ ပြန်ကြည့်မည်</button>
        </main>
      ) : (
        <>
          <div className="flex items-center gap-3 bg-deep px-4 py-3 text-white">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-saffron font-bold text-[#2b2000]">{stopIndex + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.8125rem] text-mist">လက်ရှိ ပို့ရန်</p>
              <p className="text-[0.9375rem] font-bold break-words">{stop.township} · {stop.id}</p>
            </div>
            <Chip tone={state.tone as Tone}>{state.label}</Chip>
          </div>

          <main id="main" className="relative flex min-h-64 flex-1 items-center justify-center bg-gradient-to-br from-[#dde7e3] to-[#cbd9d3] p-3">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-14 w-14 text-teal" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11zM12 11a2 2 0 100-4 2 2 0 000 4z" /></svg>
            <div className="absolute inset-x-3 bottom-3 rounded-[0.875rem] bg-white p-3.5 shadow-md">
              <p className="text-[0.9375rem] font-bold break-words">{stop.id} · {stop.name}</p>
              <p className="text-[0.8125rem] text-soft">{stop.township}မြို့နယ်၊ {stop.address}</p>
              <div className="mt-1 flex gap-4 text-sm font-semibold text-teal">
                <a href="tel:0" className="inline-flex min-h-11 items-center">ဖုန်းခေါ်</a>
                <span className="inline-flex min-h-11 items-center">လမ်းပြ</span>
              </div>
            </div>
          </main>

          <div className="flex flex-col gap-3 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.8125rem] text-soft">ကောက်ခံရန် (COD)</p>
                <p className="text-lg font-bold">{stop.cod ? money(stop.cod) : "ငွေရှင်းပြီး"}</p>
              </div>
              <p className="text-right text-[0.8125rem] text-soft">ကျန် {riderStops.length - stopIndex - 1} ဖောက်သည်</p>
            </div>
            <button type="button" onClick={next} className="btn btn-primary min-h-14 text-lg font-bold">{state.btn}</button>
            <p className="text-center text-[0.8125rem] text-soft">တစ်ချက်နှိပ်၍ အခြေအနေ အဆင့်တိုး · အရှင်ကို အလိုအလျောက် အကြောင်းကြားမည်</p>
          </div>
        </>
      )}
    </div>
  );
}
