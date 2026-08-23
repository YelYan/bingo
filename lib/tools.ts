export type Tool = {
  slug: "promptnest" | "sitecheckr" | "rankview";
  name: string;
  tagline: string;
  whatItDoes: string;
  whoFor: string;
  steps: [string, string, string];
  cta: string;
  /** Dedicated tool page, once it exists. Falls back to /contact until then. */
  href?: string;
};

export const tools: Tool[] = [
  {
    slug: "promptnest",
    name: "PromptNest",
    tagline: "Never stare at a blank screen again.",
    whatItDoes:
      "PromptNest generates ready-to-use prompts for building or improving your website — just answer a few quick questions and get a clear, usable prompt in seconds.",
    whoFor:
      "Business owners who know what they want but don't know how to explain it (yet).",
    steps: [
      "Answer a few quick questions about your business",
      "Get a custom, ready-to-use prompt instantly",
      "Use it to brief your developer, designer, or AI tool of choice",
    ],
    cta: "Try PromptNest Free",
  },
  {
    slug: "sitecheckr",
    name: "SiteCheckr",
    tagline: "Find out what's actually going on with your website.",
    whatItDoes:
      "SiteCheckr scans your website and flags what's slowing you down, hurting your SEO, or just plain broken, in plain English, not tech jargon.",
    whoFor:
      "Anyone with a website who's never had it properly checked (be honest, that's most people).",
    steps: [
      "Enter your website URL",
      "Let SiteCheckr scan your site",
      "Get a clear, easy-to-read report on what to fix",
    ],
    cta: "Audit My Website Free",
    href: "/tools/sitecheckr",
  },
  {
    slug: "rankview",
    name: "RankView",
    tagline: "See how visible your business actually is.",
    whatItDoes:
      "RankView shows you where your business stands in local search, so you know exactly how easy (or hard) you are to find online.",
    whoFor: "Businesses who want to know their real search visibility, not just guess.",
    steps: [
      "Enter your business name & location",
      "RankView checks your local visibility",
      "Get your visibility report instantly",
    ],
    cta: "Check My Visibility",
    href: "/tools/rankview",
  },
];
