import type { Metadata } from "next";
import { Grid, PageHead, Panel } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { templates } from "@/lib/mock/more";

export const metadata: Metadata = { title: "မက်ဆေ့ချ် ပုံစံများ" };

export default function TemplatesPage() {
  return (
    <>
      <PageHead title="မက်ဆေ့ချ် ပုံစံများ" sub="{{name}}, {{order}}, {{total}}, {{eta}} စသည် အလိုအလျောက် ဖြည့်ပေးမည်" actions={<MockButton done="ထည့်ပြီး">+ ပုံစံ အသစ်</MockButton>} />
      <Grid min={18}>
        {templates.map((t) => (
          <Panel key={t.name} title={t.name}>
            <p className="text-[0.9375rem] text-[#3b433e]">{t.body}</p>
          </Panel>
        ))}
      </Grid>
    </>
  );
}
