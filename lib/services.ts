export type Service = {
  slug: "websites" | "branding" | "seo";
  index: string;
  title: string;
  /** One or two words, for nav and tight spaces. */
  short: string;
  /** One line. Said out loud, it should sound like a person. */
  promise: string;
  body: string;
  deliverables: string[];
  tools: string[];
  timeline: string;
};

export const services: Service[] = [
  {
    slug: "websites",
    index: "01",
    title: "Websites, actually coded",
    short: "Websites",
    promise: "No page builders. No 4MB of plugin soup. Hand-built and fast.",
    body:
      "We design in the browser and write the code ourselves, which means the thing you approve is the thing that ships — pixel for pixel, at 60fps, on a three-year-old Android. Every build is component-driven, typed end to end, and handed over with documentation you can actually give to a developer later.",
    deliverables: [
      "Design system + component library",
      "Next.js / React front end, typed",
      "Headless CMS so your team can edit copy",
      "Accessibility to WCAG 2.2 AA",
      "Core Web Vitals in the green",
      "Analytics, forms and CRM wiring",
    ],
    tools: ["Next.js", "TypeScript", "Tailwind", "Sanity", "Vercel"],
    timeline: "4–8 weeks",
  },
  {
    slug: "branding",
    index: "02",
    title: "Branding with a spine",
    short: "Branding",
    promise: "A mark, a voice, and the rules that keep both from drifting.",
    body:
      "Identity work only pays off if the fiftieth person to touch it can stay on brand without asking you. So we go past the logo: type scale, colour with contrast ratios already checked, photography direction, tone of voice with real before-and-afters, and a living guideline site your team can bookmark.",
    deliverables: [
      "Positioning + messaging platform",
      "Logo system and responsive marks",
      "Colour, type and layout rules",
      "Voice guide with worked examples",
      "Social, deck and print templates",
      "Hosted brand guidelines site",
    ],
    tools: ["Figma", "Illustrator", "Fontsmith", "Notion"],
    timeline: "3–6 weeks",
  },
  {
    slug: "seo",
    index: "03",
    title: "SEO that survives updates",
    short: "SEO",
    promise: "Technical foundations first, content that earns the click second.",
    body:
      "We start with the boring, decisive part — crawlability, schema, internal linking, page speed, index hygiene — because no amount of blog posts rescues a site Google struggles to read. Then we build a topic map around the questions your buyers actually type, and report on revenue, not vanity impressions.",
    deliverables: [
      "Technical audit + fix implementation",
      "Keyword and intent mapping",
      "Structured data / schema markup",
      "Content briefs and editorial calendar",
      "Local SEO + Google Business Profile",
      "Monthly reporting you can read in 5 minutes",
    ],
    tools: ["Ahrefs", "GSC", "Screaming Frog", "GA4", "Looker"],
    timeline: "Ongoing, 90-day cycles",
  },
];

export const process = [
  {
    step: "01",
    title: "Dig",
    detail:
      "A week of interviews, analytics archaeology and competitor teardowns. We come back with the uncomfortable finding, not the flattering one.",
  },
  {
    step: "02",
    title: "Angle",
    detail:
      "We write the sentence your site has to make land. Everything after this — layout, colour, copy, code — is in service of that one sentence.",
  },
  {
    step: "03",
    title: "Bingo",
    detail:
      "Design in the browser, reviewed on real devices. You see three routes, we kill two. The survivor gets built properly.",
  },
  {
    step: "04",
    title: "Ship & sharpen",
    detail:
      "Launch, then measure. Ninety-day cycles of SEO, content and conversion work — because a site is a product, not a poster.",
  },
] as const;
