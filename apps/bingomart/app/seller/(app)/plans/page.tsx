import type { Metadata } from "next";
import { Chip, Notice } from "@/components/kit";
import { MockButton, Segmented } from "@/components/kit-client";
import { plans } from "@/lib/mock/seller-core";

export const metadata: Metadata = { title: "အစီအစဉ်နှင့် ဈေးနှုန်း" };

export default function PlansPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex max-w-xl flex-col items-center gap-2 text-center">
        <h1 className="text-[1.75rem] text-deep">သင့်ဆိုင်နှင့် ကိုက်ညီသော အစီအစဉ်</h1>
        <p className="text-[0.9375rem] text-soft">အခမဲ့ စတင်ပါ။ ဈေးရောင်းအား တိုးလာမှ အဆင့်မြှင့်ပါ။ စျေးနှုန်းများ နမူနာသာ ဖြစ်ပြီး အတည်မပြုရသေးပါ။</p>
        <Segmented label="ငွေပေးချေမည့် ကာလ" options={["လစဉ်", "နှစ်စဉ် · 2 လ အခမဲ့"]} />
      </div>

      <div className="grid w-full gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))" }}>
        {plans.map((p) => (
          <section key={p.name} className={`flex flex-col gap-4 rounded-[1.25rem] bg-card p-6 ${p.hot ? "border-2 border-teal shadow-lg" : "border border-line"}`}>
            {p.tag ? <span className="self-start"><Chip tone="ok">{p.tag}</Chip></span> : null}
            <div>
              <h2 className="text-lg">{p.name}</h2>
              <p className="text-[0.8125rem] text-soft">{p.who}</p>
            </div>
            <p className="flex flex-wrap items-baseline gap-1.5"><span className="font-display text-[1.75rem] font-bold">{p.price}</span><span className="text-sm text-soft">{p.unit}</span></p>
            <MockButton done="ရွေးပြီး (နမူနာ)" className={p.hot ? "btn-primary" : "btn-ghost"}>{p.cta}</MockButton>
            <hr className="border-[#eee9dd]" />
            <ul className="flex flex-col gap-2.5">
              {p.feats.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <span aria-hidden="true" className="font-bold text-teal">✓</span>
                  <span className="min-w-0">{f}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="flex w-full flex-col gap-3">
        <p className="rounded-2xl border border-line bg-card px-5 py-4 text-sm text-[#3b433e]"><b>အားလုံးတွင် ပါဝင်သည်:</b> မြန်မာဘာသာ UI · subdomain + SSL · COD နှင့် wallet · ဒေတာ CSV ထုတ်ယူခွင့်</p>
        <Notice tone="bad">စျေးနှုန်း၊ AI စာ ကန့်သတ်ချက်များ မသတ်မှတ်ရသေး</Notice>
      </div>
    </div>
  );
}
