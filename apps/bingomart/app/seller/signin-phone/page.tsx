"use client";

import { useState } from "react";
import { MockButton } from "@/components/kit-client";

export default function SigninPhonePage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 p-6">
      <div>
        <h1 className="text-2xl text-deep">{sent ? "OTP ကုဒ် ထည့်ပါ" : "ဖုန်းနံပါတ်ဖြင့် ဝင်ရောက်ပါ"}</h1>
        <p className="mt-1 text-sm text-soft">{sent ? "09 455 xxx 788 သို့ ပို့ထားသည့် ၆ လုံး ကုဒ်" : "OTP ကုဒ် ပို့ပေးပါမည်"}</p>
      </div>
      {sent ? (
        <div className="flex justify-between gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <input key={i} inputMode="numeric" maxLength={1} aria-label={`ကုဒ် ဂဏန်း ${i + 1}`} className="field h-14 w-full text-center text-xl" defaultValue={i < 4 ? "•" : ""} />
          ))}
        </div>
      ) : (
        <label className="block text-sm font-semibold">ဖုန်းနံပါတ်
          <input type="tel" inputMode="tel" placeholder="09 ___ ___ ___" className="field mt-1" />
        </label>
      )}
      {sent ? (
        <MockButton done="ဝင်ရောက်ပြီး (နမူနာ)" className="btn-primary min-h-13">အတည်ပြုမည်</MockButton>
      ) : (
        <button type="button" onClick={() => setSent(true)} className="btn btn-primary min-h-13">OTP ပို့ပါ</button>
      )}
    </div>
  );
}
