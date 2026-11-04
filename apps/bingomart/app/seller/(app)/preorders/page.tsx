import type { Metadata } from "next";
import { Meter, PageHead, Panel } from "@/components/kit";
import { MockButton } from "@/components/kit-client";
import { preorders } from "@/lib/mock/more";

export const metadata: Metadata = { title: "Pre-order / Group-buy" };

export default function PreordersPage() {
  return (
    <>
      <PageHead title="Pre-order / Group-buy" actions={<MockButton done="ဖွင့်ပြီး">+ round အသစ်</MockButton>} />
      {preorders.map((p) => (
        <Panel key={p.name} title={p.name} action={<span className="text-[0.8125rem] text-soft">{p.closes}</span>}>
          <p className="mb-1.5 text-sm text-soft">{p.joined} / {p.min} ဦး ပါဝင်ပြီး · တစ်ယောက် {p.unit}</p>
          <Meter value={p.joined} max={p.min} />
        </Panel>
      ))}
    </>
  );
}
