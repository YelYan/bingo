export const EARLY_ACCESS =
  "https://docs.google.com/forms/d/e/1FAIpQLSfWjZtl1qFF-oP2PirnVOIHfHas7bioAL9apqNrTU6AD78Zbw/viewform";
export const SURVEY =
  "https://docs.google.com/forms/d/e/1FAIpQLSd8kvmrGfboBFYJicniVkdQVWHQ9MFPDmDnFVPrX2YPexrwUA/viewform";

// The BingoMart app Worker, attached to this domain in Cloudflare. Demo data only.
export const APP_PREVIEW = "https://bingomart.bingowebstudio.com/screens";

// Where each menu item goes. One list for both languages, so a link cannot drift between them.
export const itemHref = {
  shop: "#shop",
  chatOrders: "#chat-orders",
  pos: "#pos",
  receipts: "#receipts",
  delivery: "#delivery",
  reports: "#reports",
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
