export type Category = "Website" | "Branding" | "SEO";

export type Project = {
  slug: string;
  name: string;
  /** Real, live domain — shown in the browser-chrome mockup. */
  domain: string;
  url: string;
  /** What they do, in four words or fewer. */
  sector: string;
  categories: Category[];
  /** The card headline. What the site is, plainly. */
  headline: string;
  summary: string;
  /** Observable facts about the build — no invented outcomes or metrics. */
  highlights: string[];
  screenshot: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "archform",
    name: "ArchForm",
    domain: "archformfea.com",
    url: "https://archformfea.com/",
    sector: "Structural engineering SaaS",
    categories: ["Website"],
    headline: "A product site for cloud-based structural analysis software",
    summary:
      "ArchForm needed a marketing site that could explain 3D/2D FEM analysis and AI-assisted modeling to structural engineers, with a clear path from pitch to sign-up.",
    highlights: [
      "Product-led homepage with parallel 'Discover Product' and 'Start for free' paths",
      "Dedicated Product, Resources, Blog and Pricing sections for a technical buyer",
      "Written for engineers rather than simplified into generic SaaS marketing copy",
    ],
    screenshot: "/work/shots/archformfea.png",
    featured: true,
  },
  {
    slug: "zippybooks",
    name: "Zippybooks",
    domain: "zippy-books.store",
    url: "https://www.zippy-books.store/",
    sector: "Children's ebook store",
    categories: ["Website"],
    headline: "A storefront for digital children's storybooks",
    summary:
      "An ecommerce catalogue for digital storybooks aimed at ages 4–12, built around instant download and reading straight in the browser.",
    highlights: [
      "Shop, Free Books and Learn sections, with a clear free-vs-paid split",
      "Featured-book layout with an instant 'Get it Free' path alongside paid titles",
      "Cart, login and sign-up wired into the header for a real storefront flow",
    ],
    screenshot: "/work/shots/zippybooks.png",
    featured: true,
  },
  {
    slug: "premium-seaman-service",
    name: "Premium Seaman Service",
    domain: "premiummeptstudy.com",
    url: "https://www.premiummeptstudy.com/",
    sector: "Maritime training",
    categories: ["Website"],
    headline: "A Myanmar-language course site for MEPT exam preparation",
    summary:
      "Built for seafarers preparing for the Marine English Proficiency Test, with course enrolment and free-class booking as the two primary paths.",
    highlights: [
      "Fully localised in Burmese, navigation and calls-to-action included",
      "Course tracks split into Standard and Premium tiers",
      "Dual CTA pattern on the hero: enrol now, or book a class first",
    ],
    screenshot: "/work/shots/premiummept.png",
    featured: true,
  },
  {
    slug: "lone-wolf-studio",
    name: "Lone Wolf Studio",
    domain: "lonewolfstudio.vercel.app",
    url: "https://lonewolfstudio.vercel.app/",
    sector: "Tattoo studio",
    categories: ["Website"],
    headline: "A bilingual booking site for a Bangkok tattoo studio",
    summary:
      "A dark, editorial site for a custom tattoo studio in Bangkok, built bilingual in Thai and English with an installable app shell.",
    highlights: [
      "Thai/English language toggle and a light/dark mode switch in the header",
      "Install-to-home-screen prompt, so regulars can open it like an app",
      "Portfolio and consultation booking set as the two primary calls-to-action",
    ],
    screenshot: "/work/shots/lonewolf.png",
  },
  {
    slug: "ceta-myanmar",
    name: "CETA",
    domain: "cetamyanmar.com",
    url: "https://cetamyanmar.com/",
    sector: "Education & travel",
    categories: ["Website"],
    headline: "A site for a Canada-focused youth education and travel agency",
    summary:
      "Built for Canada Education Travel Agency and its affiliated Canadian International College, aimed at Myanmar youth interested in study and travel programmes.",
    highlights: [
      "Home, Academics, Admission, Activities and Programme sections",
      "Separate Mission, History and Faculty panels for the affiliated college",
      "Hero leads straight into programme details via a single 'Learn More' path",
    ],
    screenshot: "/work/shots/cetamyanmar.png",
  },
  {
    slug: "miba-college",
    name: "MIBA College",
    domain: "mibacollege.com",
    url: "https://mibacollege.com/",
    sector: "Higher education",
    categories: ["Website"],
    headline: "An admissions site for a Myanmar college",
    summary:
      "A bilingual (Burmese/English) site covering programmes, student support and alumni for a college in Myanmar.",
    highlights: [
      "Home, About Us, Programmes, Student Alumni and Student Support navigation",
      "Rotating hero carousel built around graduation ceremony photography",
      "Dropdown menus grouping each section's sub-pages for a large course catalogue",
    ],
    screenshot: "/work/shots/mibacollege.png",
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
