import type { Metadata } from "next";
import Link from "next/link";
import { Bars, Chip, DataTable, Icon, PageHead, Panel, Split, Stat, StatGrid, money, type Tone } from "@/components/kit";
import { alerts, channelColor, kpis, lowStock, owner, payLabel, shipLabel, todayOrders, week } from "@/lib/mock/seller-core";

export const metadata: Metadata = { title: "ပင်မ" };

export default function DashboardPage() {
  return (
    <>
      <PageHead
        title={`မင်္ဂလာပါ ${owner.name}`}
        sub={`စနေနေ့ · 31 အောက်တိုဘာ 2026 · ${owner.domain}`}
        actions={
          <>
            <Link href="/seller/notifications" aria-label="သတိပေးချက်များ" className="btn btn-ghost !p-0 h-11 w-11"><Icon d="M6 17V11a6 6 0 0112 0v6l2 2H4zM10 21h4" /></Link>
            <Link href="/pos" className="btn btn-primary">POS ဖွင့်ရန်</Link>
          </>
        }
      />

      <StatGrid>
        {kpis.map((k) => <Stat key={k.label} {...k} />)}
      </StatGrid>

      <Split
        main={
          <>
            <Panel title="ယနေ့အော်ဒါများ" flush action={<Link href="/seller/orders" className="inline-flex min-h-11 items-center text-sm font-semibold text-teal">အားလုံးကြည့်ရန် →</Link>}>
              <DataTable
                caption="ယနေ့အော်ဒါများ"
                rows={[...todayOrders]}
                cols={[
                  { key: "id", label: "အော်ဒါ", className: "font-semibold" },
                  { key: "name", label: "ဖောက်သည်" },
                  { key: "channel", label: "ချန်နယ်", render: (o) => <span className="inline-flex items-center gap-1.5"><span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: channelColor[o.channel] }} />{o.channel}</span> },
                  { key: "amount", label: "ပမာဏ", className: "font-semibold whitespace-nowrap", render: (o) => money(o.amount) },
                  { key: "pay", label: "ငွေပေးချေမှု", render: (o) => <Chip tone={payLabel[o.pay][1] as Tone}>{payLabel[o.pay][0]}</Chip> },
                  { key: "ship", label: "ပို့ဆောင်ရေး", render: (o) => <Chip tone={shipLabel[o.ship][1] as Tone}>{shipLabel[o.ship][0]}</Chip> },
                ]}
              />
            </Panel>
            <Panel title="ရောင်းချမှု ၇ ရက်" action={<span className="text-[0.8125rem] text-soft">အောက်တိုဘာ 25 – 31 · သိန်း</span>}>
              <Bars data={week} highlight={6} />
            </Panel>
          </>
        }
        side={
          <>
            <section className="flex flex-col gap-3.5 rounded-2xl bg-deep p-5 text-white">
              <div className="flex items-center gap-2.5">
                <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-[0.625rem] bg-saffron text-[#2b2000]"><Icon d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /></span>
                <h2 className="text-lg">AI အကူအညီ</h2>
              </div>
              <p className="text-[0.9375rem] text-[#d6ebe5]">AI က ယနေ့ စကားပြော 126 ခုကို ဖြေပေးပြီး အော်ဒါ 41 ခု လက်ခံခဲ့သည်။ ငွေစစ်ရန် 5 ခု ကျန်သည်။</p>
              <dl className="grid grid-cols-3 gap-2.5">
                {[["126", "စကားပြော"], ["41", "အော်ဒါ"], ["92%", "လူမလိုဘဲ"]].map(([v, l]) => (
                  <div key={l} className="rounded-xl bg-panel p-2.5">
                    <dd className="font-display text-[1.375rem] font-bold">{v}</dd>
                    <dt className="text-[0.8125rem] text-[#d6ebe5]">{l}</dt>
                  </div>
                ))}
              </dl>
              <Link href="/seller/inbox" className="btn bg-saffron font-bold text-[#2b2000] hover:bg-white">AI စကားပြောများ ကြည့်ရန်</Link>
            </section>

            <Panel title="သင်ကြည့်ရန်လိုသည်">
              <ul className="flex flex-col gap-2.5">
                {alerts.map((a) => (
                  <li key={a.text} className="flex items-start gap-3 rounded-xl bg-[#fbf9f4] px-3 py-2.5 text-sm">
                    <Chip tone={a.tone as Tone}>{a.tag}</Chip>
                    <span className="min-w-0">{a.text}</span>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="ကုန်လက်ကျန် နည်းနေသည်" action={<Link href="/seller/inventory" className="inline-flex min-h-11 items-center text-sm font-semibold text-teal">လက်ကျန် →</Link>}>
              <ul className="flex flex-col gap-2.5 text-sm">
                {lowStock.map((l) => (
                  <li key={l.name} className="flex items-center justify-between gap-3">
                    <span className="min-w-0">{l.name}</span>
                    <Chip tone="bad">{l.left} ခုသာ ကျန်</Chip>
                  </li>
                ))}
              </ul>
            </Panel>
          </>
        }
      />
    </>
  );
}
