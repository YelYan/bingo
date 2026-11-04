/**
 * The Bingo product family. One entry here puts a product in the Products
 * menu, the home page, /products and the footer; nothing else needs editing.
 */
export type Product = {
  slug: string;
  name: string;
  /** The two letters on its tile. */
  letters: string;
  /** Tile colours. Letters must stay above 4.5:1 on the background. */
  tile: string;
  href: string;
  /** A few words, for the menu. */
  short: string;
  summary: string;
  cta: string;
  status?: string;
};

export const products: Product[] = [
  {
    slug: "bingomart",
    name: "BingoMart",
    letters: "Bm",
    tile: "bg-mart-ink text-mart-saffron",
    href: "/bingomart",
    short: "Online shop for Myanmar sellers",
    summary:
      "The online shop for Myanmar sellers who take orders through chat. Orders, payment receipts and parcels, all in one place.",
    cta: "Explore BingoMart",
    status: "In development",
  },
  {
    slug: "studio",
    name: "Bingo Studio",
    letters: "St",
    tile: "bg-spark text-ink-2",
    href: "/services",
    short: "Websites, SEO, social, care and AI",
    summary:
      "Websites, local SEO, social scheduling, care and AI, all run by one team.",
    cta: "See services",
  },
  {
    slug: "sitecheckr",
    name: "SiteCheckr",
    letters: "Sc",
    tile: "bg-[#1f4e8c] text-paper",
    href: "/tools/sitecheckr",
    short: "Free website audit",
    summary:
      "Find out what is slowing your website down or hurting your SEO, in plain English. Free.",
    cta: "Audit my website",
  },
  {
    slug: "rankview",
    name: "RankView",
    letters: "Rv",
    tile: "bg-[#5b3a8c] text-paper",
    href: "/tools/rankview",
    short: "Free local visibility check",
    summary:
      "See where your business stands in local search, and how easy you are to find. Free.",
    cta: "Check my visibility",
  },
  {
    slug: "promptnest",
    name: "PromptNest",
    letters: "Pn",
    tile: "bg-[#8f2a17] text-paper",
    href: "/tools/promptnest",
    short: "Free website brief generator",
    summary:
      "Answer a few questions and get a clear brief for your website in seconds. Free.",
    cta: "Try PromptNest",
  },
];

export const flagship = products[0];
export const otherProducts = products.slice(1);
