import type { Metadata } from "next";
import Link from "next/link";
import { ActionForm, Field, Submit } from "@/components/action-form";
import { login } from "../actions";

export const metadata: Metadata = { title: "ဝင်ရောက်ရန်", robots: { index: false } };

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center p-6">
      <h1 className="text-2xl text-deep">ဝင်ရောက်ရန်</h1>
      <ActionForm action={login} className="mt-5 flex flex-col gap-3">
        <Field label="ဖုန်းနံပါတ်"><input name="phone" required type="tel" inputMode="tel" autoComplete="username" placeholder="09 ___ ___ ___" className="field" /></Field>
        <Field label="စကားဝှက်"><input name="password" required type="password" autoComplete="current-password" className="field" /></Field>
        <Submit>ဝင်ရောက်မည်</Submit>
      </ActionForm>
      <p className="mt-5 text-sm text-soft">ဆိုင်မရှိသေးဘူးလား။ <Link href="/seller/signup" className="font-semibold text-teal underline">ဆိုင်ဖွင့်မည်</Link></p>
    </main>
  );
}
