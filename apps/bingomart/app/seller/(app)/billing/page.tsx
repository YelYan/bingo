import type { Metadata } from "next";
import Link from "next/link";
import { Chip, DataTable, Meter, PageHead, Panel, Split } from "@/components/kit";

export const metadata: Metadata = { title: "ငွေပေးချေ / အစီအစဉ်" };

const invoices = [
  { date: "1 အောက်တိုဘာ 2026", amount: "25,000 ကျပ်", status: "ok" },
  { date: "1 စက်တင်ဘာ 2026", amount: "25,000 ကျပ်", status: "ok" },
];

export default function BillingPage() {
  return (
    <>
      <PageHead title="ငွေပေးချေ / အစီအစဉ်" actions={<Link href="/seller/plans" className="btn btn-primary">အစီအစဉ် ပြောင်းရန်</Link>} />
      <Split
        main={
          <>
            <Panel title="လက်ရှိ အစီအစဉ်">
              <p className="text-lg font-bold">ကြီးထွားဆဲ · 25,000 ကျပ် / လ</p>
              <p className="mt-1 text-sm text-soft">နောက်ထပ် ငွေကောက်မည့်ရက် — 1 ဒီဇင်ဘာ 2026</p>
              <div className="mt-3">
                <p className="mb-1 text-[0.8125rem] text-soft">AI စာ သုံးစွဲမှု — 312 / 5,000</p>
                <Meter value={312} max={5000} />
              </div>
            </Panel>
            <Panel title="ငွေတောင်းခံလွှာများ" flush>
              <DataTable
                caption="ငွေတောင်းခံလွှာများ"
                rows={invoices}
                cols={[
                  { key: "date", label: "ရက်စွဲ" },
                  { key: "amount", label: "ပမာဏ", className: "font-semibold" },
                  { key: "status", label: "", render: () => <Chip tone="ok">ပေးဆောင်ပြီး</Chip> },
                ]}
              />
            </Panel>
          </>
        }
        side={
          <Panel title="ငွေပေးချေနည်း">
            <p className="text-sm text-soft">KBZPay · 09xxx…xxx333</p>
            <p className="mt-3 rounded-xl bg-cream px-3.5 py-2.5 text-[0.8125rem] text-amber">⚠ ငွေပေးချေပုံစံ မသတ်မှတ်ရသေးပါ — နမူနာသာ ဖြစ်သည်။</p>
          </Panel>
        }
      />
    </>
  );
}
