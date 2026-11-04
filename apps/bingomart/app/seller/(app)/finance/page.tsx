import type { Metadata } from "next";
import { DataTable, PageHead, Panel, Stat, StatGrid, Toolbar, money } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { financeKpis, transactions } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ငွေစာရင်း" };

export default function FinancePage() {
  const inTotal = transactions.reduce((s, t) => s + t.in, 0);
  const outTotal = transactions.reduce((s, t) => s + t.out, 0);
  return (
    <>
      <PageHead
        title="ငွေစာရင်း"
        actions={<Toolbar><MockButton done="မှတ်ပြီး" className="btn-ghost">+ အသုံးစရိတ်</MockButton><a href="/seller/day-close" className="btn btn-primary">နေ့ပိတ်</a></Toolbar>}
      />
      <StatGrid>
        {financeKpis.map((k) => <Stat key={k.label} label={k.label} value={k.value} tone={k.good ? "good" : undefined} />)}
      </StatGrid>
      <Panel title="ယနေ့ လွှဲပြောင်းမှုများ" flush action={<span className="text-[0.8125rem] text-soft">31 အောက်တိုဘာ 2026</span>}>
        <DataTable
          caption="ယနေ့ လွှဲပြောင်းမှုများ"
          rows={transactions}
          cols={[
            { key: "time", label: "အချိန်", className: "text-soft" },
            { key: "label", label: "အကြောင်းအရာ", render: (t) => <span><span className="block font-medium">{t.label}</span><span className="block text-[0.8125rem] text-soft">{t.cat}</span></span> },
            { key: "in", label: "ဝင်", className: "font-semibold whitespace-nowrap text-[#0a5547]", render: (t) => (t.in ? `+${t.in.toLocaleString("en-US")}` : "—") },
            { key: "out", label: "ထွက်", className: "font-semibold whitespace-nowrap text-danger", render: (t) => (t.out ? `−${t.out.toLocaleString("en-US")}` : "—") },
          ]}
        />
        <div className="flex items-center justify-end gap-6 bg-[#fbf9f4] px-5 py-3 text-sm font-bold">
          <span>စုစုပေါင်း</span><span className="text-[#0a5547]">+{inTotal.toLocaleString("en-US")}</span><span className="text-danger">−{outTotal.toLocaleString("en-US")}</span>
        </div>
      </Panel>
    </>
  );
}
