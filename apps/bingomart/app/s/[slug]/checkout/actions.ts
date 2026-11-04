"use server";

import { api } from "@/lib/api";
import { errorText } from "@/lib/copy";

export type PlaceState = { error?: string; trackingToken?: string } | null;

export async function placeOrder(_: PlaceState, form: FormData): Promise<PlaceState> {
  const slug = String(form.get("slug"));
  let items: unknown;
  try {
    items = JSON.parse(String(form.get("items")));
  } catch {
    return { error: errorText("INVALID_INPUT") };
  }
  const result = await api<{ trackingToken: string }>(`/shops/${encodeURIComponent(slug)}/orders`, {
    body: {
      idempotencyKey: form.get("idempotencyKey"),
      items,
      paymentMethod: form.get("paymentMethod"),
      customer: {
        name: form.get("name"),
        phone: form.get("phone"),
        region: form.get("region"),
        township: form.get("township"),
        address: form.get("address"),
      },
    },
  });
  return result.ok ? { trackingToken: result.data.trackingToken } : { error: errorText(result.code) };
}
