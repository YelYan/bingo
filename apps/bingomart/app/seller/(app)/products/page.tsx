import type { Metadata } from "next";
import { ActionForm, Field, Submit } from "@/components/action-form";
import { sellerApi } from "@/lib/api";
import { createProduct, updateProduct } from "../../actions";

export const metadata: Metadata = { title: "ပစ္စည်းများ" };

type Product = { id: string; name: string; priceMmk: number; costMmk: number; stock: number; active: boolean };

const money = { type: "number", min: 0, step: 1, inputMode: "numeric", className: "field" } as const;

export default async function ProductsPage() {
  const products = await sellerApi<Product[]>("/seller/products");
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-deep">ပစ္စည်းများ</h1>

      <section className="card">
        <h2 className="font-bold">ပစ္စည်း အသစ် ထည့်ရန်</h2>
        <ActionForm action={createProduct} clearOnSuccess className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2"><Field label="ပစ္စည်းအမည်"><input name="name" required maxLength={200} className="field" /></Field></div>
          <Field label="ရောင်းဈေး (ကျပ်)"><input name="priceMmk" required {...money} min={1} /></Field>
          <Field label="အရင်းဈေး (ကျပ်)" hint="ဖောက်သည် မမြင်ရပါ"><input name="costMmk" {...money} /></Field>
          <Field label="လက်ကျန်"><input name="stock" required {...money} defaultValue={0} /></Field>
          <div className="self-end"><Submit className="btn-primary w-full">ထည့်မည်</Submit></div>
        </ActionForm>
      </section>

      {products.length === 0 ? (
        <p className="text-center text-soft">ပစ္စည်း မရှိသေးပါ။</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {products.map((product) => (
            <li key={product.id} className="card">
              <ActionForm action={updateProduct} savedText="သိမ်းပြီး" className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr_1fr_auto_auto] sm:items-end">
                <input type="hidden" name="id" value={product.id} />
                <Field label="အမည်"><input name="name" required maxLength={200} defaultValue={product.name} className="field" /></Field>
                <Field label="ရောင်းဈေး"><input name="priceMmk" required {...money} min={1} defaultValue={product.priceMmk} /></Field>
                <Field label="အရင်းဈေး"><input name="costMmk" {...money} defaultValue={product.costMmk} /></Field>
                <Field label="လက်ကျန်"><input name="stock" required {...money} defaultValue={product.stock} /></Field>
                <label className="flex min-h-11 items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" name="active" defaultChecked={product.active} className="h-5 w-5 accent-teal" />
                  ရောင်းမည်
                </label>
                <Submit className="btn-ghost">သိမ်းမည်</Submit>
              </ActionForm>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
