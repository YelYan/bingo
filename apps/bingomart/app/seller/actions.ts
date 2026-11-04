"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { FormState } from "@/components/action-form";
import { api, endSession, startSession, type ApiResult } from "@/lib/api";
import { errorText } from "@/lib/copy";

const text = (form: FormData, name: string) => String(form.get(name) ?? "");
/** Empty stays undefined rather than 0, so a blank box never overwrites a number. */
const num = (form: FormData, name: string) => (text(form, name).trim() === "" ? undefined : Number(text(form, name)));

function outcome(result: ApiResult<unknown>, path: string): FormState {
  if (result.ok) {
    revalidatePath(path);
    return null;
  }
  if (result.status === 401) redirect("/seller/login");
  return { error: errorText(result.code) };
}

export async function signup(_: FormState, form: FormData): Promise<FormState> {
  const result = await api<{ token: string }>("/auth/signup", {
    body: {
      shopName: text(form, "shopName"),
      slug: text(form, "slug"),
      phone: text(form, "phone"),
      password: text(form, "password"),
      deliveryFeeMmk: num(form, "deliveryFeeMmk"),
    },
  });
  if (!result.ok) return { error: errorText(result.code) };
  await startSession(result.data.token);
  redirect("/seller/products");
}

export async function login(_: FormState, form: FormData): Promise<FormState> {
  const result = await api<{ token: string }>("/auth/login", {
    body: { phone: text(form, "phone"), password: text(form, "password") },
  });
  if (!result.ok) return { error: errorText(result.code) };
  await startSession(result.data.token);
  redirect("/seller");
}

export async function logout() {
  await endSession();
  redirect("/seller/login");
}

export async function createProduct(_: FormState, form: FormData): Promise<FormState> {
  const result = await api("/seller/products", {
    seller: true,
    body: { name: text(form, "name"), priceMmk: num(form, "priceMmk"), costMmk: num(form, "costMmk"), stock: num(form, "stock") ?? 0 },
  });
  return outcome(result, "/seller/products");
}

export async function updateProduct(_: FormState, form: FormData): Promise<FormState> {
  const result = await api(`/seller/products/${text(form, "id")}`, {
    seller: true,
    method: "PATCH",
    body: {
      name: text(form, "name"),
      priceMmk: num(form, "priceMmk"),
      costMmk: num(form, "costMmk"),
      stock: num(form, "stock"),
      active: form.get("active") === "on",
    },
  });
  return outcome(result, "/seller/products");
}

export async function saveSettings(_: FormState, form: FormData): Promise<FormState> {
  const providers = form.getAll("provider").map(String);
  const names = form.getAll("accountName").map(String);
  const numbers = form.getAll("accountNumber").map(String);
  const paymentAccounts = providers
    .map((provider, i) => ({ provider: provider.trim(), name: names[i].trim(), number: numbers[i].trim() }))
    .filter((account) => account.provider || account.name || account.number);
  const result = await api("/seller/shop", {
    seller: true,
    method: "PATCH",
    body: { shopName: text(form, "shopName"), deliveryFeeMmk: num(form, "deliveryFeeMmk") ?? 0, paymentAccounts },
  });
  return outcome(result, "/seller/settings");
}

export async function approvePayment(_: FormState, form: FormData): Promise<FormState> {
  const id = text(form, "orderId");
  return outcome(await api(`/seller/orders/${id}/payment/approve`, { seller: true, method: "POST" }), `/seller/orders/${id}`);
}

export async function rejectPayment(_: FormState, form: FormData): Promise<FormState> {
  const id = text(form, "orderId");
  return outcome(await api(`/seller/orders/${id}/payment/reject`, { seller: true, body: { reason: text(form, "reason") } }), `/seller/orders/${id}`);
}

export async function sendEvent(_: FormState, form: FormData): Promise<FormState> {
  const id = text(form, "orderId");
  const optional = (name: string) => text(form, name).trim() || undefined;
  const result = await api(`/seller/orders/${id}/events`, {
    seller: true,
    body: {
      eventId: text(form, "eventId"),
      type: text(form, "type"),
      carrier: optional("carrier"),
      etaLow: optional("etaLow"),
      etaHigh: optional("etaHigh"),
      note: optional("note"),
    },
  });
  return outcome(result, `/seller/orders/${id}`);
}
