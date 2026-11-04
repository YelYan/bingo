import type { Metadata } from "next";
import { DataTable, Meter, PageHead, Panel, money } from "@/components/kit";
import { wholesaleAccounts } from "@/lib/mock/more";

export const metadata: Metadata = { title: "လက်ကား / B2B" };

export default function WholesalePage() {
  return (
    <>
      <PageHead title="လက်ကား / B2B အကြွေး" />
      <Panel flush>
        <DataTable
          caption="B2B အကောင့်များ"
          rows={wholesaleAccounts}
          cols={[
            { key: "name", label: "အကောင့်", className: "font-semibold" },
            { key: "used", label: "သုံးပြီး / ကန့်သတ်", render: (a) => (
              <span className="inline-block w-40">
                <span className="mb-1 block text-[0.8125rem]">{money(Number(a.used))} / {money(Number(a.limit))}</span>
                <Meter value={Number(a.used)} max={Number(a.limit)} tone={Number(a.used) / Number(a.limit) > 0.9 ? "bad" : "teal"} />
              </span>
            ) },
            { key: "terms", label: "သတ်မှတ်ချက်", className: "text-soft" },
          ]}
        />
      </Panel>
    </>
  );
}
