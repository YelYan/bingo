export type Category = "Website" | "Branding" | "SEO";

export type PosterVariant = "grid" | "arc" | "stack" | "orbit" | "type" | "wave";

export type Project = {
  slug: string;
  name: string;
  /** What they do, in four words or fewer. */
  sector: string;
  year: string;
  categories: Category[];
  /** The card headline. Should read like a result, not a service. */
  headline: string;
  summary: string;
  /** The uncomfortable finding from discovery. */
  problem: string;
  approach: string[];
  results: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string };
  stack: string[];
  poster: { variant: PosterVariant; ink: string; spark: string; paper: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "meridian-lab",
    name: "Meridian Lab",
    sector: "Diagnostics",
    year: "2025",
    categories: ["Website", "Branding"],
    headline: "A lab that stopped looking like a laboratory",
    summary:
      "Twelve years of clinical credibility hidden behind a site that read like a compliance document. We rebuilt the whole thing around one idea: results you can hold.",
    problem:
      "Meridian converted 0.6% of clinician traffic. Interviews found the reason fast — specialists could not tell within thirty seconds whether Meridian ran the assay they needed. The information existed. It was on page four of a PDF.",
    approach: [
      "Rebuilt the test catalogue as a filterable, deep-linkable index — 340 assays, each with its own URL and schema markup",
      "New identity: a clinical navy softened by a warm paper ground, so the science reads accurate without reading cold",
      "Ordering flow cut from nine steps to three, with saved requisition templates for repeat clinics",
      "Static-generated pages behind a headless CMS so the lab's own scientists publish updates without a ticket",
    ],
    results: [
      { value: "4.1%", label: "Clinician conversion, from 0.6%" },
      { value: "-71%", label: "Time to find an assay" },
      { value: "0.7s", label: "Largest Contentful Paint" },
    ],
    quote: {
      text:
        "We had been told our problem was traffic. Bingo showed us it was the fourth click. Fixing that was worth more than a year of ads.",
      author: "Dr. Ilse Marchetti",
      role: "Commercial Director, Meridian Lab",
    },
    stack: ["Next.js", "Sanity", "Algolia", "Vercel"],
    poster: { variant: "grid", ink: "#1d2733", spark: "#e2622b", paper: "#eee6da" },
    featured: true,
  },
  {
    slug: "flour-and-ash",
    name: "Flour & Ash",
    sector: "Bakery group",
    year: "2025",
    categories: ["Branding", "SEO"],
    headline: "Six bakeries that finally sounded like one",
    summary:
      "An identity system loose enough for six neighbourhood shops, tight enough to be recognisable from across the street — plus the local SEO to match.",
    problem:
      "Each shop had drifted into its own logo, its own signage, its own Instagram voice. Customers did not know they were the same business, so loyalty never compounded across locations.",
    approach: [
      "One wordmark, six district stamps — shared skeleton, local personality",
      "A voice guide built from actual counter conversations, not brand adjectives",
      "Six Google Business Profiles rebuilt with correct categories, hours, service areas and photo cadence",
      "Location pages with LocalBusiness schema and genuinely local copy, not spun templates",
    ],
    results: [
      { value: "+212%", label: "Map pack impressions" },
      { value: "+38%", label: "Cross-location repeat visits" },
      { value: "6→1", label: "Brand systems to maintain" },
    ],
    quote: {
      text:
        "They spent two days behind the counter before showing us anything. It shows in every line of the guide.",
      author: "Tomas Vela",
      role: "Founder, Flour & Ash",
    },
    stack: ["Figma", "Astro", "GBP", "Ahrefs"],
    poster: { variant: "arc", ink: "#2b2119", spark: "#e2622b", paper: "#f0e5d6" },
    featured: true,
  },
  {
    slug: "northbay-legal",
    name: "Northbay Legal",
    sector: "Employment law",
    year: "2024",
    categories: ["SEO", "Website"],
    headline: "Ranked for the questions people ask at 2am",
    summary:
      "A technical rebuild plus eighteen months of intent-mapped content took a five-partner firm to first-page for the terms that actually generate consultations.",
    problem:
      "Northbay ranked well for its own name and nothing else. The 4,000-page site was 87% thin duplicate content from a legacy directory plugin, and Google was crawling all of it.",
    approach: [
      "Pruned 3,400 low-value URLs and consolidated equity into 240 real pages",
      "Rebuilt on a static front end — crawl budget spent on pages that matter",
      "Mapped 60 questions from intake call transcripts to a hub-and-spoke content model",
      "FAQ and Attorney schema, plus a consultation flow that survives mobile thumbs",
    ],
    results: [
      { value: "3.4×", label: "Organic sessions in 18 months" },
      { value: "+147", label: "First-page keywords" },
      { value: "22", label: "Qualified consultations / month" },
    ],
    stack: ["Next.js", "Screaming Frog", "GSC", "GA4"],
    poster: { variant: "stack", ink: "#1b2b26", spark: "#e2622b", paper: "#e9e6dc" },
    featured: true,
  },
  {
    slug: "atelier-kova",
    name: "Atelier Kova",
    sector: "Furniture",
    year: "2024",
    categories: ["Website"],
    headline: "A catalogue that loads before you can blink",
    summary:
      "900 product variants, full-bleed photography, and a first paint under 700ms on 4G. The constraint drove the design.",
    problem:
      "Kova's photography was the entire sales pitch, and the old store took eleven seconds to show any of it. Mobile bounce sat at 74%.",
    approach: [
      "Art-directed responsive images: four crops per product, AVIF first, blurhash placeholders",
      "Variant switching handled client-side with zero layout shift",
      "Editorial product pages — each piece gets a story, a maker and a room",
      "Checkout kept boring on purpose; every experiment there lost money",
    ],
    results: [
      { value: "0.68s", label: "LCP on 4G" },
      { value: "-46%", label: "Mobile bounce rate" },
      { value: "+29%", label: "Revenue per session" },
    ],
    stack: ["Next.js", "Shopify", "Cloudinary"],
    poster: { variant: "orbit", ink: "#26221f", spark: "#e2622b", paper: "#efe8dc" },
  },
  {
    slug: "hallow-coffee",
    name: "Hallow Coffee",
    sector: "Specialty roaster",
    year: "2023",
    categories: ["Branding"],
    headline: "Shelf presence for a roaster nobody could pronounce",
    summary:
      "A naming fix, a modular label system across 24 SKUs, and a wholesale kit that closed three regional grocers in a quarter.",
    problem:
      "Great coffee, invisible packaging. On a crowded shelf the bags read as generic craft — same kraft paper, same hand-lettering, same everything as eleven competitors.",
    approach: [
      "Kept the name, fixed the phonetics with a stress mark built into the wordmark",
      "A single die-cut window shape that reveals bean colour — origin becomes the graphic",
      "Colour-coded roast levels legible at two metres",
      "Wholesale sell sheet and shelf-talker system in the same kit",
    ],
    results: [
      { value: "3", label: "Regional grocers signed in Q1" },
      { value: "24", label: "SKUs on one system" },
      { value: "+61%", label: "Direct-to-consumer subscriptions" },
    ],
    stack: ["Illustrator", "Figma", "Litho"],
    poster: { variant: "type", ink: "#2a1f1a", spark: "#e2622b", paper: "#f1e9de" },
  },
  {
    slug: "tidewater-rowing",
    name: "Tidewater Rowing",
    sector: "Community club",
    year: "2023",
    categories: ["Website", "SEO"],
    headline: "A volunteer-run club with a professional's website",
    summary:
      "Membership, regatta results, boat booking and a newsletter — all editable by a committee of seven with wildly different comfort levels.",
    problem:
      "Every update went through one exhausted volunteer with FTP access. When he went on holiday, the site froze for three weeks — during registration season.",
    approach: [
      "Editing model designed around the least technical committee member, then tested with her",
      "Boat booking built as a simple calendar with hard conflict rules, no training required",
      "Results archive with structured data — now the top result for the regatta name",
      "Hosting bill kept under a hundred dollars a year, on purpose",
    ],
    results: [
      { value: "7", label: "Volunteers now publishing" },
      { value: "+54%", label: "Season registrations" },
      { value: "#1", label: "For 'tidewater regatta results'" },
    ],
    stack: ["Astro", "Netlify CMS", "Cal.com"],
    poster: { variant: "wave", ink: "#1a2530", spark: "#e2622b", paper: "#e8e8de" },
  },
];

export const categories: Category[] = ["Website", "Branding", "SEO"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function adjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
