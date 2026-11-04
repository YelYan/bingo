import type { Metadata } from "next";
import { Chip, DataTable, PageHead, Panel, Stat, StatGrid, money, type Tone } from "@/components/kit";
import { adminShopStatus, adminShops } from "@/lib/mock/ops";

export const metadata: Metadata = { title: "ဆိုင်များ စီမံရန်" };

export default function AdminPage() {
  return (
    <>
      <PageHead title="BingoMart — ဆိုင်များ စီမံရန်" />
      <StatGrid cols={3}>
        <Stat label="စုစုပေါင်း ဆိုင်" value={adminShops.length} />
        <Stat label="ဆောင်ရွက်ဆဲ" value={adminShops.filter((s) => s.status === "active").length} tone="good" />
        <Stat label="စောင့်ဆိုင်းနေသည်" value={adminShops.filter((s) => s.status === "pending").length} />
      </StatGrid>
      <Panel title="ဆိုင်များ" flush>
        <DataTable
          caption="ဆိုင်များ"
          rows={adminShops}
          cols={[
            { key: "name", label: "ဆိုင်", render: (s) => <span><span className="block font-semibold">{s.name}</span><span className="block text-[0.8125rem] text-soft">{s.owner}</span></span> },
            { key: "plan", label: "အစီအစဉ်" },
            { key: "gmv", label: "GMV", className: "font-semibold whitespace-nowrap", render: (s) => (s.gmv ? money(s.gmv) : "—") },
            { key: "status", label: "", render: (s) => { const [l, t] = adminShopStatus[s.status as keyof typeof adminShopStatus]; return <Chip tone={t as Tone}>{l}</Chip>; } },
          ]}
        />
      </Panel>
    </>
  );
}
