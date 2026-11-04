"use client";

import { useState } from "react";
import { MockButton } from "@/components/kit-client";
import { MobileScreen } from "@/components/mobile";

export default function PrescriptionUploadPage() {
  const [uploaded, setUploaded] = useState(false);
  return (
    <MobileScreen title="ဆေးညွှန်း တင်ရန်" footer={uploaded ? <MockButton done="ပို့ပြီး" className="btn-primary w-full">ဆေးညွှန်း ပို့မည်</MockButton> : null}>
      <p className="text-[0.9375rem] text-soft">ဤဆေးဝါးအတွက် ဆရာဝန် ဆေးညွှန်း လိုအပ်ပါသည်။ ဓာတ်ပုံ ရိုက်တင်ပေးပါ။</p>
      <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#bfb8a6] bg-card text-sm text-soft">
        <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={() => setUploaded(true)} />
        {uploaded ? <span className="font-semibold text-teal">✓ ဆေးညွှန်း ပုံ ရွေးပြီး</span> : <span>ဆေးညွှန်း ပုံ ရိုက်ရန် သို့မဟုတ် ရွေးရန်</span>}
      </label>
      <p className="rounded-xl bg-cream px-3.5 py-2.5 text-[0.8125rem] text-amber">ဆေးဝါးပညာရှင် စစ်ဆေးပြီးမှသာ ပို့ဆောင်ပါမည်။</p>
    </MobileScreen>
  );
}
