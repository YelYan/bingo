/**
 * Builds a ready-to-paste AI website-building prompt from a few plain-
 * English answers. Pure template interpolation — no model call, so this
 * costs nothing to run no matter how many times it's used.
 */

export type PromptNestInput = {
  businessName: string;
  services: string;
  description: string;
  location: string;
  websiteUrl: string;
  colors: string;
  phone: string;
  email: string;
};

export function generateWebsitePrompt(input: PromptNestInput): string {
  const contactLines = [
    input.phone ? `- Phone: ${input.phone}` : null,
    input.email ? `- Email: ${input.email}` : null,
    input.location ? `- Service area / address: ${input.location}` : null,
  ].filter((line): line is string => line !== null);

  const lines = [
    `Build me a clean, modern, mobile-friendly website for ${input.businessName}.`,
    "",
    "ABOUT THE BUSINESS",
    `- What we do: ${input.services}`,
    `- What makes us different: ${input.description}`,
    ...(input.websiteUrl
      ? [`- Existing site to reference or rebuild: ${input.websiteUrl}`]
      : []),
    "",
  ];

  if (contactLines.length > 0) {
    lines.push("CONTACT DETAILS TO INCLUDE", ...contactLines, "");
  }

  lines.push(
    "STYLE",
    input.colors
      ? `- Colors / visual style: ${input.colors}`
      : "- Colors / visual style: use your best judgement for a modern, trustworthy look that fits this kind of business",
    "",
    "WHAT THE SITE NEEDS",
    "- A homepage that leads with what we do and who it's for, not a generic hero line",
    "- A clear way to get in touch — phone, email, or a contact form, whichever fits",
    "- Fast-loading and genuinely usable on a phone, not just responsive in theory",
    "- Calls to action that match how a real customer would actually reach out",
    "",
    "TONE",
    "Professional but approachable — write like a person who understands this business, not generic marketing copy.",
  );

  return lines.join("\n");
}
