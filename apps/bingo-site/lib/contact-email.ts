export type ContactMessage = {
  name: string;
  email: string;
  company: string;
  siteUrl: string;
  brief: string;
  interests: string[];
};

// shortcut: resend.dev only delivers to the Resend account's own address, so
// that account must use site.email; verify our domain to send anywhere else.
const FROM = "Bingo website <onboarding@resend.dev>";

/** True only once the provider accepted the message. Never throws. */
export async function sendContactEmail(
  message: ContactMessage,
  apiKey: string | undefined,
  to: string,
): Promise<boolean> {
  if (!apiKey) {
    console.error("Contact email not sent: RESEND_API_KEY is not set.");
    return false;
  }

  const text = [
    `Name: ${message.name}`,
    `Email: ${message.email}`,
    `Business: ${message.company || "-"}`,
    `Website: ${message.siteUrl || "-"}`,
    `Interested in: ${message.interests.join(", ") || "-"}`,
    "",
    message.brief,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "bingo-site",
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        reply_to: message.email,
        subject: `New enquiry from ${message.name.replace(/\s+/g, " ")}`,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error("Contact email rejected:", response.status, await response.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Contact email failed:", err);
    return false;
  }
}
