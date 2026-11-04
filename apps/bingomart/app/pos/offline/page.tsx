"use client";

import Link from "next/link";
import { Chip } from "@/components/kit";

export default function PosOfflinePage() {
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
      <Chip tone="wait">● အော့ဖ်လိုင်း</Chip>
      <h1 className="text-xl font-bold">အင်တာနက် ပြတ်နေသည်</h1>
      <p className="text-soft">စိတ်ပူစရာ မလိုပါ — ရောင်းချမှုများကို ဖုန်းထဲမှာ ဆက်မှတ်နိုင်ပါသည်။ အင်တာနက် ပြန်ရလျှင် အလိုအလျောက် sync ဖြစ်ပါမည်။</p>
      <p className="rounded-xl bg-cream px-4 py-2.5 text-[0.8125rem] text-amber">Sync လုပ်ရန် ကျန်သော ရောင်းချမှု — 3 ခု</p>
      <Link href="/pos" className="btn btn-primary">POS ဆက်သုံးမည်</Link>
    </div>
  );
}
