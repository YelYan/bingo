export type Service = {
  slug:
    | "branding"
    | "graphic-design"
    | "ui-ux-design"
    | "website-development"
    | "mobile-development";
  index: string;
  title: string;
  /** One or two words, for nav and tight spaces. */
  short: string;
  description: string;
  included: string[];
  outcome: string;
  /** Button label for this service's CTA. */
  cta: string;
};

export const services: Service[] = [
  {
    slug: "branding",
    index: "01",
    title: "A Brand People Remember And Trust",
    short: "Branding",
    description:
      "Your brand is more than a logo. We work out who you are, who you are for, and how you should sound, then turn it into a clear identity you can use everywhere, from your shop sign to your Facebook page.",
    included: [
      "Brand strategy & positioning",
      "Naming, tagline & voice",
      "Logo & visual identity system",
      "Colour, type & usage guidelines",
      "Brand launch kit",
    ],
    outcome:
      "A brand that looks consistent, sounds like you, and is easy for customers to remember.",
    cta: "Build My Brand",
  },
  {
    slug: "graphic-design",
    index: "02",
    title: "Graphics That Stop The Scroll",
    short: "Graphic Design",
    description:
      "Posts, posters, packaging, menus, pitch decks. We design the everyday pieces your business needs so they look sharp and stay on brand, without you opening a design tool.",
    included: [
      "Social media post & ad design",
      "Print: flyers, posters, cards, menus",
      "Packaging & label design",
      "Presentation & pitch deck design",
      "Editable source files handed over",
    ],
    outcome:
      "Marketing material that looks professional and gets noticed, every time.",
    cta: "Get Designs Made",
  },
  {
    slug: "ui-ux-design",
    index: "03",
    title: "Interfaces People Understand At A Glance",
    short: "UI/UX Design",
    description:
      "Good products feel obvious. We research how your users think, map the journey, and design clean screens and flows for websites and apps, tested before a single line of code is written.",
    included: [
      "User research & journey mapping",
      "Wireframes & clickable prototypes",
      "High-fidelity UI design",
      "Design system & component library",
      "Usability testing & revisions",
    ],
    outcome:
      "A product that is easy to use, easy to build, and hard to get lost in.",
    cta: "Design My Product",
  },
  {
    slug: "website-development",
    index: "04",
    title: "Websites Built To Be Fast And Findable",
    short: "Web Development",
    description:
      "From landing pages to full web apps, we build fast, secure, mobile-first websites that load in a blink and are easy for you to update. Clean code, real hosting, no lock-in.",
    included: [
      "Responsive, mobile-first build",
      "Landing pages, business sites & web apps",
      "SEO-ready structure & fast load times",
      "CMS or admin so you can edit content",
      "Hosting, launch & handover",
    ],
    outcome:
      "A website that works on every device, loads fast, and is ready to grow with you.",
    cta: "Start My Website",
  },
  {
    slug: "mobile-development",
    index: "05",
    title: "Apps That Live In Your Customers' Pockets",
    short: "Mobile Development",
    description:
      "We build iOS and Android apps that feel native and run smoothly, from first prototype to store launch. Built for real phones and real networks, including slow ones.",
    included: [
      "iOS & Android apps from one codebase",
      "Offline-friendly, low-data design",
      "Push notifications & in-app payments",
      "Backend & API integration",
      "App Store & Google Play launch",
    ],
    outcome:
      "A reliable app your customers actually keep on their phone.",
    cta: "Plan My App",
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    detail:
      "We learn your business, your goals, and what your customers actually need to see.",
  },
  {
    step: "02",
    title: "Design & Build",
    detail:
      "We design and build your website (and everything around it) to look sharp and perform even sharper.",
  },
  {
    step: "03",
    title: "Launch & Optimize",
    detail:
      "We go live, then fine-tune for SEO, speed, and visibility so people can actually find you.",
  },
  {
    step: "04",
    title: "Support & Grow",
    detail:
      "We stick around to maintain, update, and grow your online presence as your business grows.",
  },
] as const;
