import type { Metadata } from "next";
import { DataTable, KV, PageHead, Panel, Split, money } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { expenseCategories, taxSummary } from "@/lib/mock/ops";

export const metadata: Metadata = { title: "အသုံးစရိတ်နှင့် အခွန်" };

export default function ExpensesPage() {
  return (
    <>
      <PageHead title="အသုံးစရိတ်နှင့် အခွန်" sub="အောက်တိုဘာ 2026" actions={<MockButton done="မှတ်ပြီး">+ အသုံးစရိတ်</MockButton>} />
      <Split
        main={
          <Panel title="အသုံးစရိတ် အမျိုးအစားအလိုက်" flush>
            <DataTable
              caption="အသုံးစရိတ်"
              rows={expenseCategories}
              cols={[
                { key: "label", label: "အမျိုးအစား", className: "font-semibold" },
                { key: "amount", label: "ပမာဏ", className: "font-semibold whitespace-nowrap", render: (e) => money(e.amount) },
              ]}
            />
          </Panel>
        }
        side={
          <Panel title="ကုန်သွယ်ခွန် (ခန့်မှန်း)">
            <KV items={[{ k: "ဝင်ငွေ", v: money(taxSummary.income) }, { k: "ခွင့်ပြု အသုံးစရိတ်", v: money(taxSummary.deductible) }, { k: "ခန့်မှန်း အခွန်", v: money(taxSummary.estimated) }]} />
            <p className="mt-3 rounded-xl bg-cream px-3.5 py-2.5 text-[0.8125rem] text-amber">⚠ စာရင်းကိုင်ဝန်ထမ်းနှင့် ညှိနှိုင်းပြီးမှ တရားဝင် တင်သွင်းပါ။</p>
          </Panel>
        }
      />
    </>
  );
}
