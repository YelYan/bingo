import type { Metadata } from "next";
import { DataTable, Icon, Panel } from "@/components/kit";
import { channelShare, topProducts } from "@/lib/mock/seller-core";
import { ReportsClient } from "./reports-client";

export const metadata: Metadata = { title: "အစီရင်ခံစာ" };

export default function ReportsPage() {
  return (
    <>
      <ReportsClient />
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <Panel title="ရောင်းအားကောင်းဆုံး ပစ္စည်း" flush>
          <DataTable
            caption="ရောင်းအားကောင်းဆုံး ပစ္စည်း"
            rows={topProducts}
            cols={[
              { key: "n", label: "#", className: "font-bold text-[#9ca39e]" },
              { key: "name", label: "ပစ္စည်း", className: "font-semibold" },
              { key: "qty", label: "ရောင်းပြီး" },
              { key: "rev", label: "ဝင်ငွေ", className: "font-bold text-[#0a5547] whitespace-nowrap", render: (t) => `${t.rev} ကျပ်` },
            ]}
          />
        </Panel>
        <Panel title="ချန်နယ်အလိုက် အော်ဒါ">
          <ul className="flex flex-col gap-3.5">
            {channelShare.map((c) => (
              <li key={c.label}>
                <div className="flex justify-between text-sm"><span>{c.label}</span><span className="font-semibold">{c.pct}%</span></div>
                <div className="mt-1 h-2 rounded-full bg-[#eee9dd]"><div className="h-2 rounded-full" style={{ width: `${c.pct}%`, background: c.fill }} /></div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-deep px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex h-9 w-9 flex-none items-center justify-center rounded-[0.625rem] bg-saffron text-[#2b2000]"><Icon d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /></span>
          <div>
            <p className="font-bold">AI က ယခုလ လူ 2,840 နာရီစာ အလုပ် သက်သာစေခဲ့သည်</p>
            <p className="text-[0.8125rem] text-mist">စကားပြော 3,620 ဖြေ · 71% လူမလိုဘဲ ပြီးစီး</p>
          </div>
        </div>
        <p className="text-[0.8125rem] text-mist">ကိန်းဂဏန်းများ နမူနာ</p>
      </section>
    </>
  );
}
