"use server";

import type { ContactState } from "./contact-state";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    brief: String(formData.get("brief") ?? "").trim(),
  };

  // Honeypot: real people leave this empty. Fail silently so bots learn nothing.
  if (String(formData.get("website") ?? "")) {
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Tell us who you are.";
  if (!EMAIL.test(values.email)) errors.email = "That address looks incomplete.";
  if (values.brief.length < 20)
    errors.brief = "A little more detail helps — 20 characters minimum.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "A couple of fields need another look.",
      errors,
      values,
    };
  }

  // ---------------------------------------------------------------
  // Delivery goes here. Drop in a transactional provider — Resend,
  // Postmark, SendGrid — or forward to a CRM webhook. Everything above
  // (validation, honeypot, error shape) already works as-is.
  //
  //   await resend.emails.send({ to: site.email, ...values })
  //
  // Until that is wired up, nothing is sent anywhere.
  // ---------------------------------------------------------------

  return {
    status: "success",
    message:
      "Got it. You'll hear back from a human within one business day — usually sooner.",
  };
}
