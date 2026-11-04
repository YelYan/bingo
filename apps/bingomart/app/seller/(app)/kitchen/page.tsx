import type { Metadata } from "next";
import { Chip, PageHead } from "@/components/kit";
import { KitchenBoard } from "./kitchen-client";

export const metadata: Metadata = { title: "မီးဖိုချောင် အော်ဒါ ဘုတ်" };

export default function KitchenPage() {
  return (
    <>
      <PageHead title="မီးဖိုချောင် အော်ဒါ ဘုတ်" actions={<><Chip tone="bad">မြင့် 2</Chip><span className="text-[0.8125rem] text-soft">peak-hour · ပျမ်းမျှ 18 မိနစ်</span></>} />
      <KitchenBoard />
    </>
  );
}
