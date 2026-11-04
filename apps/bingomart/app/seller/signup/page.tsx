import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm, Field, Submit } from "@/components/action-form";
import { signup } from "../actions";

export const metadata: Metadata = { title: "ဆိုင်ဖွင့်ရန်" };

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center p-6">
      <h1 className="text-2xl text-deep">ဆိုင်ဖွင့်ရန်</h1>
      <ActionForm action={signup} className="mt-5 flex flex-col gap-3">
        <Field label="ဆိုင်အမည်"><input name="shopName" required minLength={2} maxLength={100} className="field" /></Field>
        <Field label="ဆိုင်လိပ်စာ" hint="အင်္ဂလိပ်စာလုံး အသေး၊ ဂဏန်းနှင့် - သာ သုံးပါ။ ဥပမာ — aye-fashion">
          <input name="slug" required pattern="[a-z0-9][a-z0-9\-]{1,28}[a-z0-9]" autoCapitalize="none" autoCorrect="off" spellCheck={false} className="field" />
        </Field>
        <Field label="ဖုန်းနံပါတ်"><input name="phone" required type="tel" inputMode="tel" autoComplete="username" placeholder="09 ___ ___ ___" className="field" /></Field>
        <Field label="စကားဝှက်" hint="အနည်းဆုံး ၈ လုံး"><input name="password" required minLength={8} type="password" autoComplete="new-password" className="field" /></Field>
        <Field label="ပို့ခ (ကျပ်)" hint="အော်ဒါတိုင်းအတွက် တစ်ခုတည်းသော ပို့ခ"><input name="deliveryFeeMmk" type="number" min={0} step={1} inputMode="numeric" defaultValue={0} className="field" /></Field>
        <Submit>ဆိုင်ဖွင့်မည်</Submit>
      </ActionForm>
      <p className="mt-5 text-sm text-soft">ဆိုင်ရှိပြီးသားလား။ <Link href="/seller/login" className="font-semibold text-teal underline">ဝင်ရောက်မည်</Link></p>
    </main>
  );
}
