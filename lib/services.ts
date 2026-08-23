export type Service = {
  slug:
    | "web-design"
    | "local-seo"
    | "social-scheduling"
    | "website-care"
    | "ai-solutions";
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
    slug: "web-design",
    index: "01",
    title: "Websites That Actually Do Their Job",
    short: "Web Design",
    description:
      "Your website should be more than a digital business card. We design and build fast, clean, mobile-friendly websites that reflect your brand and actually convert visitors into customers — no bloated templates, no confusing navigation, no guesswork.",
    included: [
      "Custom design built around your brand",
      "Mobile-first, fast-loading pages",
      "Clear navigation & conversion-focused layout",
      "SEO-ready structure from day one",
      "Ongoing edits during the build",
    ],
    outcome:
      "A website that looks professional, loads fast, and actually gets people to take action.",
    cta: "Start Your Website",
  },
  {
    slug: "local-seo",
    index: "02",
    title: "Get Found By People Actually Looking For You",
    short: "Local SEO",
    description:
      "Ranking on Google isn't magic, it's strategy. We optimize your website, listings, and content so local customers can find you when they search, instead of scrolling past you to your competitor.",
    included: [
      "Google Business Profile optimization",
      "On-page SEO (titles, descriptions, structure)",
      "Local keyword targeting",
      "Citation & listing cleanup",
      "Monthly visibility tracking",
    ],
    outcome: "More local visibility, more clicks, more people finding you first.",
    cta: "Boost My Visibility",
  },
  {
    slug: "social-scheduling",
    index: "03",
    title: "Social Content, Powered By Your Own Website",
    short: "AI Social",
    description:
      "We use AI to turn your website content into ready-to-post social content, scheduled and published automatically, so your socials stay active without eating up your week.",
    included: [
      "AI-generated posts based on your website content",
      "Custom posting schedule",
      "Multi-platform support",
      "Brand-consistent captions & tone",
      "Monthly content calendar",
    ],
    outcome:
      "Consistent, on-brand social presence, without you writing a single caption.",
    cta: "Automate My Socials",
  },
  {
    slug: "website-care",
    index: "04",
    title: "Your Website, Actually Taken Care Of",
    short: "Site Care",
    description:
      "Websites need upkeep — updates, backups, security checks, small fixes. We handle the behind-the-scenes stuff so your site stays fast, secure, and current while you focus on your business.",
    included: [
      "Regular updates & backups",
      "Uptime & security monitoring",
      "Small content edits & fixes",
      "Performance checkups",
      "Direct support when something's off",
    ],
    outcome: "A website that just works, quietly and reliably, in the background.",
    cta: "Get Ongoing Support",
  },
  {
    slug: "ai-solutions",
    index: "05",
    title: "Smart Tools, Built Around Your Business",
    short: "AI Solutions",
    description:
      "From chatbots to automated workflows, we build simple AI solutions that save you time and handle the repetitive stuff, so you can focus on what actually needs a human.",
    included: [
      "Custom AI chatbots",
      "Workflow & task automation",
      "AI-powered customer support tools",
      "Integration with your existing site/tools",
      "Ongoing tuning as your needs change",
    ],
    outcome: "Less manual work, faster response times, more time back in your day.",
    cta: "Explore AI Solutions",
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
