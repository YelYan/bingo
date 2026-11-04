"use client";

import { MockButton } from "@/components/kit-client";
import { MobileScreen } from "@/components/mobile";

export default function GiftOrderPage() {
  return (
    <MobileScreen title="လက်ဆောင် အော်ဒါ" footer={<MockButton done="ပို့ပြီး (နမူနာ)" className="btn-primary w-full">ဆက်သွားမည်</MockButton>}>
      <label className="block text-sm font-semibold">လက်ခံမည့်သူ အမည်<input className="field mt-1" placeholder="ဥပမာ — ဒေါ်မြင့်" /></label>
      <label className="block text-sm font-semibold">လက်ခံမည့်သူ ဖုန်းနံပါတ်<input type="tel" className="field mt-1" placeholder="09 ___ ___ ___" /></label>
      <label className="block text-sm font-semibold">ပေးစာ (ရွေးချယ်ခွင့်)<textarea rows={3} className="field mt-1" placeholder="မွေးနေ့ မင်္ဂလာပါ 🎉" /></label>
      <label className="flex items-center gap-2.5 text-sm font-semibold"><input type="checkbox" defaultChecked className="h-5 w-5 accent-teal" />လက်ဆောင် ထုပ်ပိုး ပေးပါ</label>
    </MobileScreen>
  );
}
