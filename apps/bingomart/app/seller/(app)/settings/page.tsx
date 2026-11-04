import type { Metadata } from "next";
import { ActionForm, Field, Submit } from "@/components/action-form";
import { CopyButton } from "@/components/copy-button";
import { PageHead, Panel } from "@/components/kit";
import { sellerApi } from "@/lib/api";
import { saveSettings } from "../../actions";

export const metadata: Metadata = { title: "ဆက်တင်" };

const ROWS = 3;
type Account = { provider: string; name: string; number: string };

export default async function SettingsPage() {
  const shop = await sellerApi("/seller/shop");
  const accounts: (Account | undefined)[] = Array.from({ length: ROWS }, (_, i) => shop.paymentAccounts[i]);

  return (
    <>
      <PageHead title="ဆက်တင်" />

      <Panel className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0 text-sm">
          <p className="font-semibold">ဆိုင်လင့်ခ်</p>
          <p className="break-all text-soft">/s/{shop.slug}</p>
        </div>
        <CopyButton text={`/s/${shop.slug}`} label="လင့်ခ် ကော်ပီ" />
      </Panel>

      <Panel title="ဆိုင် သတင်းအချက်အလက်">
        <ActionForm action={saveSettings} savedText="သိမ်းပြီး" className="flex flex-col gap-3">
          <Field label="ဆိုင်အမည်"><input name="shopName" required minLength={2} maxLength={100} defaultValue={shop.name} className="field" /></Field>
          <Field label="ပို့ခ (ကျပ်)" hint="အော်ဒါတိုင်းအတွက် တစ်ခုတည်းသော ပို့ခ">
            <input name="deliveryFeeMmk" type="number" min={0} step={1} inputMode="numeric" defaultValue={shop.deliveryFeeMmk} className="field" />
          </Field>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 font-bold">ငွေလွှဲအကောင့်များ</legend>
            <p className="text-[0.8125rem] text-soft">ငွေလွှဲရွေးသော ဖောက်သည်များ မြင်ရမည်။</p>
            {accounts.map((account, i) => (
              <div key={i} className="grid gap-2 sm:grid-cols-3">
                <Field label={`ငွေလွှဲနည်း ${i + 1}`}><input name="provider" maxLength={40} defaultValue={account?.provider} placeholder="KBZPay" className="field" /></Field>
                <Field label="အကောင့်အမည်"><input name="accountName" maxLength={100} defaultValue={account?.name} className="field" /></Field>
                <Field label="အကောင့်နံပါတ်"><input name="accountNumber" maxLength={40} defaultValue={account?.number} className="field" /></Field>
              </div>
            ))}
          </fieldset>
          <Submit>သိမ်းမည်</Submit>
        </ActionForm>
      </Panel>
    </>
  );
}
