export const EARLY_ACCESS =
  "https://docs.google.com/forms/d/e/1FAIpQLSfWjZtl1qFF-oP2PirnVOIHfHas7bioAL9apqNrTU6AD78Zbw/viewform";
export const SURVEY =
  "https://docs.google.com/forms/d/e/1FAIpQLSd8kvmrGfboBFYJicniVkdQVWHQ9MFPDmDnFVPrX2YPexrwUA/viewform";

// The BingoMart app Worker, attached to this domain in Cloudflare. Demo data only.
export const APP_PREVIEW = "https://bingomart.bingowebstudio.com/screens";

// Where each menu item goes. One list for both languages, so a link cannot drift between them.
export const itemHref = {
  // "./" = relative to the language's BingoMart home, so /bingomart/my keeps readers in Burmese.
  shop: "./features/web-shop",
  chatOrders: "./features/chat-orders",
  pos: "./features/counter-sales",
  receipts: "./features/receipt-checks",
  delivery: "./features/delivery-tracking",
  reports: "./features/profit-reports",
  chatSellers: "#chat-sellers",
  counterShops: "#counter-shops",
  shippers: "#shippers",
  fashion: "#fashion",
  beauty: "#beauty",
  food: "#food",
  myanmar: "#myanmar",
  how: "#how",
  faq: "#faq",
  access: "#access",
  demo: APP_PREVIEW,
  survey: SURVEY,
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
} as const;

export type ItemId = keyof typeof itemHref;

// base is the language's BingoMart home (/bingomart or /bingomart/my). In-page anchors get it too,
// so a menu link works from a feature page as well as from the landing page.
export function resolveHref(id: ItemId, base: string): string {
  const href: string = itemHref[id];
  if (href.startsWith("#")) return base + href;
  if (href.startsWith("./")) return base + href.slice(1);
  return href;
}
