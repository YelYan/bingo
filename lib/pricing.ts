export type Plan = {
  slug: string;
  name: string;
  /** Who this is honestly for. */
  fit: string;
  monthly: number;
  /** Annual is billed up front — two months free. */
  annualMonthly: number;
  setup: string;
  featured?: boolean;
  inherits?: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    slug: "spark",
    name: "Spark",
    fit: "One location, one story to tell, no in-house marketer.",
    monthly: 279,
    annualMonthly: 233,
    setup: "No setup fee · Cancel any month",
    features: [
      "Custom-designed site, hand-coded — up to 6 pages",
      "Domain, hosting, SSL and daily backups",
      "1 branded mailbox on your domain",
      "WCAG 2.2 AA accessibility pass",
      "10 content updates a month",
      "Core Web Vitals tuning + uptime monitoring",
      "SEO foundations: schema, sitemaps, Search Console",
      "Simple storefront, up to 25 products",
    ],
  },
  {
    slug: "signal",
    name: "Signal",
    fit: "Growing teams that need the site to actually generate pipeline.",
    monthly: 549,
    annualMonthly: 458,
    setup: "No setup fee · Cancel any month",
    featured: true,
    inherits: "Spark",
    features: [
      "Unlimited pages and content updates",
      "Full brand system: marks, type, colour, voice guide",
      "3 branded mailboxes",
      "On-page SEO programme + 2 researched articles a month",
      "Google Business Profile management",
      "Booking, CRM and email-marketing integrations",
      "Conversion tracking with a monthly read-out",
      "Configurable storefront, unlimited products",
      "Priority support, same-business-day",
    ],
  },
  {
    slug: "studio",
    name: "Studio",
    fit: "Multi-location or multi-brand operators with real complexity.",
    monthly: 949,
    annualMonthly: 791,
    setup: "Scoped per engagement · 3-month minimum",
    inherits: "Signal",
    features: [
      "Custom application work — portals, calculators, integrations",
      "Up to 6 sites, storefronts or locations under one roof",
      "5 branded mailboxes",
      "Google Business Profile management, up to 6 locations",
      "Bespoke SEO strategy with quarterly roadmap",
      "One automation or AI assistant, built and maintained",
      "Live analytics dashboard your board can read",
      "Named account lead + a standing weekly slot",
    ],
  },
];

export const everyPlan = [
  {
    title: "Designed for you, not from a template",
    detail: "No themes, no page builders. Every layout is drawn for your content.",
  },
  {
    title: "Written by hand, typed end to end",
    detail: "Real code you own. Portable the day you decide to leave.",
  },
  {
    title: "Fast on a bad phone on a bad network",
    detail: "We test on throttled 4G and mid-range Android, not just a laptop.",
  },
  {
    title: "Accessible as standard",
    detail: "Contrast, keyboard paths and screen readers checked before launch.",
  },
  {
    title: "Nothing held hostage",
    detail: "Your domain, your repo, your analytics, your brand files.",
  },
  {
    title: "A human replies",
    detail: "Same-day on weekdays. Not a ticket queue, not a bot.",
  },
] as const;

export const addOns = [
  { name: "Extra branded mailbox", price: "$14 / month" },
  { name: "Additional location or storefront", price: "$120 / month" },
  { name: "Long-form article, researched and edited", price: "$340 each" },
  { name: "Brand photography direction + shoot day", price: "from $1,800" },
  { name: "Migration from an existing platform", price: "from $600 once" },
  { name: "Custom integration or automation", price: "from $950 once" },
] as const;

export const faqs = [
  {
    q: "Why monthly instead of one big project fee?",
    a: "Because a site that never changes stops earning. A monthly plan folds design, hosting, updates and search work into one predictable line — and it means we stay accountable for results after launch, not just up to it. If you would rather pay for a project outright and take it away, we do that too; ask us for a fixed scope.",
  },
  {
    q: "Do I own the site?",
    a: "Yes, completely. Domain, code repository, brand files, analytics and content are yours from day one and stay yours if you leave. We hand over a repo and a written migration guide, no exit fee, no hostage-taking.",
  },
  {
    q: "How long until my site is live?",
    a: "Spark builds typically go live in three to four weeks, Signal in five to eight. The variable is almost never us — it is how quickly copy, photography and approvals come back. We tell you the honest date in week one and flag slippage early.",
  },
  {
    q: "What counts as a content update?",
    a: "Text edits, swapping images, publishing a post, adding a team member, adjusting prices, seasonal banners — anything that does not require new design or new functionality. Send them however you like; we do not make you learn a ticketing system.",
  },
  {
    q: "Is SEO really included, or is it a checkbox?",
    a: "On Spark you get the foundations done properly: clean information architecture, schema markup, fast pages, Search Console wired up. Signal and Studio add ongoing keyword work, published content and reporting. We will not promise rankings on a timeline — anyone who does is guessing.",
  },
  {
    q: "Can I pause or cancel?",
    a: "Cancel any month on Spark and Signal with thirty days' notice; Studio has a three-month minimum because of the build work involved. Pause for up to two months a year if your business is seasonal. We would rather you come back than feel trapped.",
  },
  {
    q: "We already have a brand. Can you just build?",
    a: "Of course. Bring your guidelines and we will work inside them, or we will quietly tell you which parts are fighting your conversion rate and let you decide.",
  },
] as const;
