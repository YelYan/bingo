"use client";

import { useState } from "react";
import { Avatar, Chip, DataTable, money } from "@/components/kit";
import { Segmented } from "@/components/kit-client";
import { channelColor, customers } from "@/lib/mock/seller-core";

const FILTERS: Record<string, (c: (typeof customers)[number]) => boolean> = {
  အားလုံး: () => true,
  VIP: (c) => c.tag === "vip",
  အသစ်: (c) => c.tag === "new",
  ပြန်မဝယ်သေး: (c) => c.orders === 1,
};

export function CustomersTable() {
  const [filter, setFilter] = useState("အားလုံး");
  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="border-b border-[#eee9dd] p-3">
        <Segmented label="ဖောက်သည် စစ်ထုတ်ရန်" options={Object.keys(FILTERS)} onChange={setFilter} />
      </div>
      <DataTable
        caption="ဖောက်သည်များ"
        rows={customers.filter(FILTERS[filter])}
        cols={[
          {
            key: "name",
            label: "အမည်",
            render: (r) => (
              <span className="flex items-center gap-2.5">
                <Avatar name={r.name} color={channelColor[r.ch]} size="h-9 w-9" />
                <span>
                  <span className="block font-semibold">{r.name}</span>
                  {r.tag === "vip" ? <Chip tone="wait">VIP</Chip> : r.tag === "new" ? <Chip tone="ok">အသစ်</Chip> : null}
                </span>
              </span>
            ),
          },
          { key: "ch", label: "ချန်နယ်", className: "text-soft" },
          { key: "orders", label: "အော်ဒါ", className: "font-semibold" },
          { key: "spent", label: "သုံးငွေ", className: "font-bold text-[#0a5547] whitespace-nowrap", render: (r) => money(r.spent) },
          { key: "last", label: "နောက်ဆုံး", className: "text-soft" },
        ]}
      />
    </section>
  );
}
