import type { Metadata } from "next";
import { Chip, DataTable, Notice, PageHead, Panel, Split, money, type Tone } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { returnRows, returnStatus } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ပြန်အမ်း / ပြန်လဲ" };

export default function ReturnsPage() {
  return (
    <>
      <PageHead title="ပြန်အမ်း / ပြန်လဲ" />
      <Split
        main={
          <Panel title="တောင်းဆိုမှုများ" flush>
            <DataTable
              caption="ပြန်အမ်း/ပြန်လဲ တောင်းဆိုမှုများ"
              rows={returnRows}
              cols={[
                { key: "id", label: "အော်ဒါ", className: "font-semibold" },
                { key: "reason", label: "အကြောင်းရင်း", render: (r) => <span><span className="block">{r.reason}</span><span className="block text-[0.8125rem] text-soft">{r.cust}</span></span> },
                { key: "kind", label: "အမျိုးအစား", className: "text-soft" },
                { key: "amount", label: "ပမာဏ", className: "font-semibold whitespace-nowrap", render: (r) => money(r.amount) },
                { key: "status", label: "အခြေအနေ", render: (r) => { const [l, t] = returnStatus[r.status as keyof typeof returnStatus]; return <Chip tone={t as Tone}>{l}</Chip>; } },
              ]}
            />
          </Panel>
        }
        side={
          <>
            <Panel title="#1039 — ပြန်အမ်းငွေ">
              <p className="text-sm">ဒေါ်ခင်မာ · ထမီ ပန်းနု L</p>
              <p className="mt-0.5 text-[0.8125rem] text-soft">အကြောင်း — အရွယ်အစား မတော်</p>
              <dl className="mt-3 flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between"><dt className="text-soft">ပြန်အမ်းရန်</dt><dd className="font-bold">{money(52000)}</dd></div>
                <div className="flex justify-between"><dt className="text-soft">နည်းလမ်း</dt><dd>KBZPay ပြန်လွှဲ</dd></div>
                <div className="flex justify-between"><dt className="text-soft">ကုန်ပစ္စည်း</dt><dd>စတော့ ပြန်ထည့်</dd></div>
              </dl>
              <div className="mt-3 flex gap-2">
                <MockButton done="အတည်ပြုပြီး" className="btn-primary flex-1">အတည်ပြု + ပြန်လဲ</MockButton>
                <MockButton done="ငြင်းပြီး" className="btn-danger">ငြင်း</MockButton>
              </div>
            </Panel>
            <Notice tone="ship">မူဝါဒ — ၇ ရက်အတွင်း၊ အရွယ်အစား မတော်လျှင် လဲပေးသည်။ ပြန်အမ်း/လဲ လုပ်တိုင်း စတော့နှင့် ငွေစာရင်း အလိုအလျောက် ပြင်သည်။</Notice>
          </>
        }
      />
    </>
  );
}
