export const site = {
  name: "Bingo",
  legalName: "Bingo Digital Studio",
  tagline: "Websites, SEO & Growth",
  /** The whole brand rests on this one word. */
  idea: "aha",
  description:
    "Bingo is a digital studio for businesses who want their online presence actually handled — websites, local SEO, AI-powered social, ongoing care, and smart AI tools, all under one roof.",
  url: "https://www.bingowebstudio.com",
  email: "bingo.officialwebstudio@gmail.com",
  phone: "+66 61 775 6151",
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
  { label: "Tools", href: "/tools" },
  { label: "Studio", href: "/about" },
] as const;

export const stats = [
  { value: "140+", label: "Sites shipped" },
  { value: "0.9s", label: "Median load time" },
  { value: "3.4×", label: "Average lift in organic traffic" },
  { value: "96", label: "Median Lighthouse score" },
] as const;
