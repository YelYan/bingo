export const site = {
  name: "Bingo",
  legalName: "Bingo Web Design Studio",
  tagline: "Web Design Studio",
  /** The whole brand rests on this one word. */
  idea: "aha",
  description:
    "Bingo is a web design studio building sites that code, brand and rank. We design the moment someone finally gets what you do — then we ship it.",
  url: "https://www.bingowebstudio.com",
  email: "hello@bingowebstudio.com",
  phone: "+1 (555) 019-2846",
  location: "Remote-first · Working across 6 timezones",
  founded: 2019,
  socials: [
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ],
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Studio", href: "/about" },
] as const;

export const stats = [
  { value: "140+", label: "Sites shipped" },
  { value: "0.9s", label: "Median load time" },
  { value: "3.4×", label: "Average lift in organic traffic" },
  { value: "96", label: "Median Lighthouse score" },
] as const;
