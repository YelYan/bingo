import type { Metadata } from "next";
import { DataTable, PageHead, Panel, money } from "@/components/kit";
import { dealRows } from "@/lib/mock/more";

export const metadata: Metadata = { title: "တန်ဖိုးကြီး အရောင်း" };

export default function DealsPage() {
  return (
    <>
      <PageHead title="တန်ဖိုးကြီး အရောင်း" sub="ရွှေ၊ စိန် စသည့် မြင့်မားသော တန်ဖိုးရှိ အရောင်းများ" />
      <Panel flush>
        <DataTable
          caption="တန်ဖိုးကြီး အရောင်းများ"
          rows={dealRows}
          cols={[
            { key: "item", label: "ပစ္စည်း", className: "font-semibold" },
            { key: "customer", label: "ဖောက်သည်" },
            { key: "stage", label: "အဆင့်", className: "text-soft" },
            { key: "amount", label: "တန်ဖိုး", className: "font-bold whitespace-nowrap", render: (d) => `${d.amount} ကျပ်` },
          ]}
        />
      </Panel>
    </>
  );
}
