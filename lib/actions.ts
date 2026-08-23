"use server";

import type { ContactState } from "./contact-state";
import type { RankViewState } from "./rankview-state";
import type { SiteCheckrState } from "./sitecheckr-state";
import { auditHtml } from "./site-audit";
import {
  CLAUDE_MODEL_SEARCH,
  WEB_SEARCH_TOOL,
  extractText,
  getClaudeClient,
} from "./claude";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    siteUrl: String(formData.get("site_url") ?? "").trim(),
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
    errors.brief = "A little more detail helps us actually help you — 20 characters minimum.";

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
      "We got your message and we're already thinking about your project. Expect to hear from us within one business day, usually sooner.",
  };
}

const REPORT_PROMPT = (businessName: string, location: string) => `Research the real, current online visibility of the business "${businessName}" in "${location}". Use web search to check:
1. Whether it ranks on the first page of Google for its own name plus its main service.
2. Whether it has a Google Business Profile, and roughly how many reviews and what rating it has.
3. Whether it has an active, findable presence on at least one social platform.

Then write a short, plain-English report for the business owner in exactly this structure (use these four headings verbatim, nothing before the first one):

GOOGLE SEARCH
2-3 sentences on what you actually found.

GOOGLE BUSINESS PROFILE
2-3 sentences.

SOCIAL PRESENCE
2-3 sentences.

THREE QUICK WINS
- One specific, doable-this-week fix.
- One specific, doable-this-week fix.
- One specific, doable-this-week fix.

Be honest and specific — name what you actually found, not generic advice. If you can't find the business at all, say so plainly and explain what that likely means for them.`;

export async function submitRankView(
  _prev: RankViewState,
  formData: FormData,
): Promise<RankViewState> {
  const values = {
    businessName: String(formData.get("business_name") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
  };

  // Honeypot — same pattern as the contact form. Bots that fill it never
  // reach the API call, so nothing gets spent checking them.
  if (String(formData.get("company_site") ?? "")) {
    return { status: "success", values, message: "Thanks!" };
  }

  const errors: RankViewState["errors"] = {};
  if (values.businessName.length < 2)
    errors.businessName = "Enter the business name as it appears online.";
  if (values.location.length < 2)
    errors.location = "Add a city or area so we search the right market.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "A couple of fields need another look.",
      errors,
      values,
    };
  }

  try {
    const client = await getClaudeClient();
    const message = await client.messages.create({
      model: CLAUDE_MODEL_SEARCH,
      max_tokens: 1200,
      tools: [WEB_SEARCH_TOOL],
      messages: [
        {
          role: "user",
          content: REPORT_PROMPT(values.businessName, values.location),
        },
      ],
    });

    const report = extractText(message);
    if (!report) {
      return {
        status: "error",
        message: "Couldn't generate a report just now — try again in a moment.",
        values,
      };
    }

    return { status: "success", values, report };
  } catch (err) {
    console.error("RankView error:", err);
    return {
      status: "error",
      message: "Something went wrong running the check. Try again in a moment.",
      values,
    };
  }
}

function normalizeUrl(input: string): string | null {
  let value = input.trim();
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`;

  try {
    return new URL(value).toString();
  } catch {
    return null;
  }
}

export async function submitSiteCheckr(
  _prev: SiteCheckrState,
  formData: FormData,
): Promise<SiteCheckrState> {
  const rawUrl = String(formData.get("url") ?? "").trim();

  // Honeypot — same pattern as the other tools.
  if (String(formData.get("company") ?? "")) {
    return { status: "success", values: { url: rawUrl }, message: "Thanks!" };
  }

  const normalized = normalizeUrl(rawUrl);
  if (!normalized) {
    return {
      status: "error",
      message: "A couple of fields need another look.",
      errors: { url: "Enter a real website address, like yoursite.com." },
      values: { url: rawUrl },
    };
  }

  try {
    const start = Date.now();
    const response = await fetch(normalized, {
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; BingoSiteCheckr/1.0; +https://www.bingowebstudio.com)",
      },
    });
    const elapsedMs = Date.now() - start;

    if (!response.ok) {
      return {
        status: "error",
        message: `That site responded with an error (HTTP ${response.status}). Double-check the URL and try again.`,
        values: { url: rawUrl },
      };
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return {
        status: "error",
        message: "That URL didn't return a webpage we can scan.",
        values: { url: rawUrl },
      };
    }

    const html = await response.text();
    const report = auditHtml(html, response.url || normalized, elapsedMs);

    return { status: "success", values: { url: rawUrl }, report };
  } catch (err) {
    console.error("SiteCheckr error:", err);
    return {
      status: "error",
      message: "Couldn't reach that site — check the URL and try again in a moment.",
      values: { url: rawUrl },
    };
  }
}
