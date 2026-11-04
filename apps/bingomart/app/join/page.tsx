"use client";

import Link from "next/link";
import { useState } from "react";

/** Design 53: sign-up step 1, phone number. Mock: no code is sent. */
export default function JoinPhonePage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-card">
      <div className="px-5 pt-4 pb-2">
        <div aria-hidden="true" className="mb-4 flex gap-1.5">
          <span className="h-[5px] flex-1 rounded-full bg-teal" />
          <span className="h-[5px] flex-1 rounded-full bg-line" />
          <span className="h-[5px] flex-1 rounded-full bg-line" />
        </div>
        <p className="text-[0.8125rem] text-soft">အဆင့် 1 / 3</p>
        <h1 className="mt-1 text-[1.4375rem] leading-snug">သင့်ဖုန်းနံပါတ် ထည့်ပါ</h1>
        <p className="mt-1 text-sm text-soft">ဆိုင်ဖွင့်ရန်နှင့် နောက်ထပ် ဝင်ရောက်ရန် ဒီနံပါတ်ကို သုံးမည်ဖြစ်သည်။</p>
      </div>

      <main id="main" className="flex flex-1 flex-col gap-4 px-5 py-3">
        <label className="block text-sm font-semibold">ဖုန်းနံပါတ်
          <input type="tel" inputMode="tel" autoComplete="tel" placeholder="09 ___ ___ ___" className="field mt-1" />
        </label>
        {sent ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">၆ လုံး ကုဒ် ထည့်ပါ</p>
            <div className="flex justify-between gap-2">
              {Array.from({ length: 6 }, (_, i) => (
                <input key={i} inputMode="numeric" maxLength={1} aria-label={`ကုဒ် ဂဏန်း ${i + 1}`} className="field h-14 w-full text-center text-xl" />
              ))}
            </div>
            <p className="text-[0.8125rem] text-soft">ကုဒ် မရသေးဘူးလား။ စက္ကန့် 30 ကြာမှ ပြန်ပို့နိုင်သည်။</p>
          </div>
        ) : null}
        <p className="text-[0.8125rem] text-soft">ဆက်သွားခြင်းဖြင့် <Link href="/help" className="text-teal underline">စည်းမျဉ်းနှင့် ကိုယ်ရေးအချက်အလက် မူဝါဒ</Link> ကို လက်ခံသည်။</p>
      </main>

      <div className="sticky bottom-0 flex flex-col gap-2 border-t border-[#eee9dd] bg-card p-5">
        {sent ? (
          <Link href="/join/category" className="btn btn-primary min-h-13 w-full text-[1.0625rem] font-bold">အတည်ပြုပြီး ဆက်သွားမည် →</Link>
        ) : (
          <button type="button" onClick={() => setSent(true)} className="btn btn-primary min-h-13 w-full text-[1.0625rem] font-bold">OTP ကုဒ် ပို့ပါ</button>
        )}
        <p className="text-center text-sm text-soft">ဆိုင်ရှိပြီးသားလား။ <Link href="/seller/signin-phone" className="font-semibold text-teal underline">ဝင်ရောက်မည်</Link></p>
      </div>
    </div>
  );
}
