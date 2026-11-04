import type { Metadata } from "next";
import { PageHead, Panel, Stat, StatGrid, money } from "@/components/kit";
import { Switch } from "@/components/kit-client";
import { loyaltyTiers } from "@/lib/mock/more";

export const metadata: Metadata = { title: "Loyalty အမှတ်" };

export default function LoyaltyPage() {
  return (
    <>
      <PageHead title="Loyalty အမှတ်" />
      <StatGrid cols={3}>
        <Stat label="ပါဝင်သူ" value="842" unit="ဦး" />
        <Stat label="ယခု ထုတ်ပြီး အမှတ်" value="1.2M" />
        <Stat label="ပြန်သုံးပြီး" value="340,000" note="ယခုလ" />
      </StatGrid>
      <Panel title="Loyalty စီမံရန်"><Switch label="Loyalty ပရိုဂရမ် ဖွင့်ထားသည်" defaultChecked /></Panel>
      <Panel title="အဆင့်များ" flush>
        <ul className="divide-y divide-[#f3efe4]">
          {loyaltyTiers.map((t) => (
            <li key={t.name} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <span className="font-semibold">{t.name}</span>
              <span className="min-w-0 flex-1 text-[0.9375rem] text-[#3b433e]">{t.perk}</span>
              <span className="text-[0.8125rem] whitespace-nowrap text-soft">{t.min > 0 ? `${money(t.min)}+` : "စတင်"}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
