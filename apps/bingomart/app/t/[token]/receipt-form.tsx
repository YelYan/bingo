"use client";

import { useState } from "react";
import { ActionForm, Submit, type FormAction } from "@/components/action-form";
import { errorText } from "@/lib/copy";

const MAX_BYTES = 5 * 1024 * 1024;

export function ReceiptForm({ action }: { action: FormAction }) {
  const [tooBig, setTooBig] = useState(false);
  return (
    <ActionForm action={action} className="card border-2 border-dashed border-[#bfb8a6]">
      <label className="block">
        <span className="font-semibold">ငွေလွှဲ စလစ် ပုံ တင်ပါ</span>
        <input
          type="file"
          name="receipt"
          required
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setTooBig((e.target.files?.[0]?.size ?? 0) > MAX_BYTES)}
          className="field mt-2 !min-h-0 text-sm"
        />
      </label>
      {tooBig ? <p role="alert" className="mt-2 text-sm font-semibold text-danger">{errorText("FILE_TOO_BIG")}</p> : null}
      <div className={tooBig ? "hidden" : "mt-3"}>
        <Submit className="btn-primary w-full">စလစ် ပို့မည်</Submit>
      </div>
      <p className="mt-2 text-[0.8125rem] text-soft">ဆိုင်ရှင်က စစ်ဆေးပြီး အတည်ပြုပေးပါမည်။</p>
    </ActionForm>
  );
}
