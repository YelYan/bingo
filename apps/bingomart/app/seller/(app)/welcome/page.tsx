import type { Metadata } from "next";
import Link from "next/link";
import { Icon, Meter, PageHead, Panel } from "@/components/kit";

export const metadata: Metadata = { title: "စတင်ရန်" };

/** Design 52: what a seller sees on day one, before any product or order exists. */
const steps = [
  { done: true, title: "ဆိုင်ဖွင့်ပြီး", sub: "ဆိုင်အမည်နှင့် လိပ်စာ သတ်မှတ်ပြီး", href: "/seller/settings", cta: "ကြည့်မည်", icon: "M3 11l9-8 9 8M5 10v10h14V10" },
  { done: false, title: "ပထမဆုံး ပစ္စည်း ထည့်ပါ", sub: "ဖုန်းမှ ဓာတ်ပုံ ရိုက်ပြီး ဈေးနှုန်း ထည့်ရုံ", href: "/seller/products/new", cta: "ပစ္စည်းထည့်မည်", icon: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" },
  { done: false, title: "ငွေလက်ခံမည့် အကောင့် ထည့်ပါ", sub: "KBZPay၊ Wave စသည် — ဖောက်သည်က စလစ် ပို့ပါမည်", href: "/seller/settings", cta: "အကောင့်ထည့်မည်", icon: "M3 6h18v12H3zM3 10h18" },
  { done: false, title: "ပို့ခ သတ်မှတ်ပါ", sub: "မြို့အလိုက် သို့မဟုတ် တစ်ခုတည်း", href: "/seller/delivery", cta: "သတ်မှတ်မည်", icon: "M2 6h12v10H2zM14 10h4l3 3v3h-7" },
  { done: false, title: "Messenger / Viber ချိတ်ပါ", sub: "AI က စကားပြောပြီး အော်ဒါ လက်ခံပေးမည်", href: "/seller/channels", cta: "ချိတ်မည်", icon: "M4 5h16v11H9l-5 4V5z" },
];

export default function WelcomePage() {
  const done = steps.filter((s) => s.done).length;
  return (
    <>
      <PageHead title="ကြိုဆိုပါတယ်၊ အေးအေး ဖက်ရှင်" sub="ပထမ အော်ဒါ မရမီ ၅ ခု လုပ်ပါ — ၁၀ မိနစ်ခန့်သာ ကြာမည်" />
      <Panel title={`စတင်ရန် အဆင့်များ — ${done} / ${steps.length}`}>
        <div className="mb-3"><Meter value={done} max={steps.length} /></div>
        <ol className="flex flex-col divide-y divide-line">
          {steps.map((s) => (
            <li key={s.title} className="flex flex-wrap items-center gap-3 py-3">
              <span aria-hidden="true" className={`flex h-10 w-10 flex-none items-center justify-center rounded-full ${s.done ? "bg-teal text-white" : "bg-ground text-deep"}`}>
                {s.done ? "✓" : <Icon d={s.icon} className="h-5 w-5" />}
              </span>
              <span className="min-w-0 flex-[1_1_12rem]">
                <span className={`block font-semibold ${s.done ? "text-soft line-through" : ""}`}>{s.title}</span>
                <span className="block text-sm text-soft">{s.sub}</span>
              </span>
              <Link href={s.href} className={`btn !min-h-11 flex-none ${s.done ? "btn-ghost" : "btn-primary"}`}>{s.cta}</Link>
            </li>
          ))}
        </ol>
      </Panel>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {["ယနေ့ ရောင်းရငွေ", "အော်ဒါအသစ်", "မက်ဆေ့ချ်"].map((l) => (
          <Panel key={l} title={l}>
            <div className="flex flex-col items-center gap-2 py-3 text-center">
              <span aria-hidden="true" className="text-3xl">📭</span>
              <p className="text-sm text-soft">ဒေတာ မရှိသေးပါ — ပထမ အော်ဒါ ရလာရင် ဒီမှာ ပေါ်လာမည်</p>
            </div>
          </Panel>
        ))}
      </div>
      <p className="mt-4 text-sm text-soft">အကူအညီ လိုလား။ <Link href="/help" className="font-semibold text-teal underline">အကူအညီ စင်တာ</Link> သို့မဟုတ် ကျွန်ုပ်တို့ အဖွဲ့က ဖုန်းဖြင့် တပ်ဆင်ပေးနိုင်သည်။</p>
    </>
  );
}
