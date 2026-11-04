import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Screen index", robots: { index: false } };

/** Internal only — every screen in this mock build, for review. Not part of the product. */
const groups: [string, [string, string][]][] = [
  ["Shopper storefront", [
    ["Storefront", "/s/aye-fashion"],
    ["Product detail", "/s/aye-fashion/p/p1"],
    ["Product reviews", "/s/aye-fashion/p/p1/reviews"],
    ["Search", "/s/aye-fashion/search"],
    ["Cart", "/s/aye-fashion/cart"],
    ["Checkout", "/s/aye-fashion/checkout"],
    ["Order placed", "/s/aye-fashion/checkout/done"],
    ["Pay and upload slip", "/s/aye-fashion/pay"],
    ["Saved / wishlist", "/s/aye-fashion/saved"],
    ["My orders (shopper)", "/s/aye-fashion/orders"],
    ["AI order chat", "/s/aye-fashion/chat"],
    ["Loyalty points (shopper)", "/s/aye-fashion/points"],
    ["Book a service", "/s/aye-fashion/book"],
    ["Restaurant table order", "/s/aye-fashion/table"],
    ["Digital goods delivery", "/s/aye-fashion/p/p1/digital"],
    ["Prescription upload", "/s/aye-fashion/p/p1/prescription"],
    ["Gift order", "/s/aye-fashion/p/p1/gift"],
    ["Reserve / offer (preloved)", "/s/aye-fashion/p/p1/reserve"],
  ]],
  ["Tracking and sign-in", [
    ["Delivery tracking (needs a real order link)", "/t/"],
    ["Phone sign-in (OTP)", "/seller/signin-phone"],
    ["Sign-up step 1 (phone)", "/join"],
    ["Category sign-up step", "/join/category"],
    ["Help and legal", "/help"],
    ["Language", "/language"],
  ]],
  ["Seller back office", [
    ["Dashboard", "/seller"],
    ["First-run / empty state", "/seller/welcome"],
    ["Orders", "/seller/orders"],
    ["Order detail (open one from Orders)", "/seller"],
    ["Products", "/seller/products"],
    ["Add product (phone)", "/seller/products/new"],
    ["Inventory", "/seller/inventory"],
    ["Stock-in (FIFO)", "/seller/stock-in"],
    ["Purchasing / suppliers", "/seller/purchasing"],
    ["Stocktake / branch transfer", "/seller/stocktake"],
    ["Excel import", "/seller/import"],
    ["Inbox (AI + channels)", "/seller/inbox"],
    ["Customers", "/seller/customers"],
    ["Broadcast", "/seller/broadcast"],
    ["Message templates", "/seller/templates"],
    ["AI settings", "/seller/ai"],
    ["AI knowledge base", "/seller/knowledge"],
    ["AI owner assistant", "/seller/assistant"],
    ["Marketing & coupons", "/seller/marketing"],
    ["Loyalty points (seller)", "/seller/loyalty"],
    ["Payments to review", "/seller/payments"],
    ["Payment check (phone)", "/seller/payment-check"],
    ["Shipments", "/seller/shipments"],
    ["Returns & refunds", "/seller/returns"],
    ["Finance / cash book", "/seller/finance"],
    ["Credit ledger", "/seller/credit"],
    ["Day close", "/seller/day-close"],
    ["Expenses & tax", "/seller/expenses"],
    ["Reports", "/seller/reports"],
    ["Staff & roles", "/seller/staff"],
    ["Delivery fee settings", "/seller/delivery"],
    ["Connect channels", "/seller/channels"],
    ["Website builder", "/seller/website"],
    ["Domain", "/seller/domain"],
    ["Notifications", "/seller/notifications"],
    ["Shop settings", "/seller/settings"],
    ["Plans & pricing", "/seller/plans"],
    ["Billing", "/seller/billing"],
    ["POS counter", "/pos"],
    ["POS offline state", "/pos/offline"],
    ["Rider app", "/rider"],
  ]],
  ["Category modules", [
    ["Food order board", "/seller/kitchen"],
    ["Booking calendar", "/seller/bookings"],
    ["Pre-order / group-buy", "/seller/preorders"],
    ["Warranty & installment", "/seller/warranty"],
    ["High-value deal (jewelry)", "/seller/deals"],
    ["Prescription review (pharmacy)", "/seller/prescriptions"],
    ["Wholesale / B2B credit", "/seller/wholesale"],
    ["Grocery weighted items", "/seller/grocery"],
    ["Furniture delivery & install", "/seller/furniture"],
    ["Fresh produce daily price", "/seller/produce"],
    ["Auto parts fitment", "/seller/autoparts"],
  ]],
  ["BingoMart admin", [
    ["Shops", "/admin"],
    ["AI moderation", "/admin/moderation"],
    ["Support", "/admin/support"],
  ]],
  ["Reference", [
    ["Loading / error / empty states", "/seller/states"],
  ]],
];

export default function ScreensPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-bold text-deep">BingoMart — screen index (internal)</h1>
      <p className="mt-1 text-soft">Every mock screen built so far, for review. Not part of the product.</p>
      {groups.map(([title, links]) => (
        <section key={title} className="mt-8">
          <h2 className="mb-2 text-lg font-bold">{title}</h2>
          <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {links.map(([label, href]) => (
              <li key={href}><Link href={href} className="text-teal underline underline-offset-2">{label}</Link></li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
