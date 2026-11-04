import type { Metadata } from "next";
import { Chip, Grid, Notice, PageHead, Panel, type Tone } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { channelConnections } from "@/lib/mock/more";

export const metadata: Metadata = { title: "ချန်နယ် ချိတ်ဆက်ရန်" };

export default function ChannelsPage() {
  return (
    <>
      <PageHead title="ချန်နယ် ချိတ်ဆက်ရန်" />
      <p className="max-w-2xl text-[0.9375rem] text-soft">သင့်စီးပွားရေးနှင့် ကိုက်ညီသော ချန်နယ်ကိုသာ ချိတ်ပါ။ အားလုံး inbox တစ်ခုတည်း၊ ဖောက်သည် profile တစ်ခုတည်း၊ AI တစ်ခုတည်းသို့ ဝင်မည်။</p>
      <Grid min={16}>
        {channelConnections.map((c) => (
          <Panel key={c.name}>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-[2.875rem] w-[2.875rem] flex-none items-center justify-center rounded-xl font-bold text-white" style={{ background: c.color }}>{c.mark}</span>
              <span className="min-w-0 flex-1"><span className="block font-bold">{c.name}</span><span className="block text-[0.8125rem] text-soft">{c.sub}</span></span>
              <Chip tone={(c.on ? "ok" : "mute") as Tone}>{c.on ? "ချိတ်ပြီး" : "မချိတ်ရသေး"}</Chip>
            </div>
            <p className="mt-3 text-[0.8125rem] text-[#3b433e]">{c.detail}</p>
            <MockButton done="ဆောင်ရွက်ပြီး" className={c.on ? "btn-ghost mt-3.5 w-full" : "btn-primary mt-3.5 w-full"}>{c.on ? "စီမံရန်" : "ချိတ်ဆက်မည်"}</MockButton>
          </Panel>
        ))}
      </Grid>
      <Notice>⚠ ချန်နယ်တစ်ခုစီ၏ ချိတ်ဆက်နည်းနှင့် စည်းမျဉ်း (Meta app review၊ Viber partner၊ message pricing) ကို ကုမ္ပဏီ၏ လက်ရှိ သတ်မှတ်ချက်နှင့် တိုက်စစ်ရန် လိုအပ်သည်။</Notice>
    </>
  );
}
