import Link from "next/link";
import { flagship } from "@/lib/products";
import { site } from "@/lib/site";
import { Mark } from "./mark";
import { APP_PREVIEW, MartNav, SURVEY } from "./mart-nav";

const EARLY_ACCESS =
  "https://docs.google.com/forms/d/e/1FAIpQLSfWjZtl1qFF-oP2PirnVOIHfHas7bioAL9apqNrTU6AD78Zbw/viewform";

const gutter ="mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12";
const button =
  "inline-flex min-h-13 items-center justify-center rounded-full px-8 font-semibold transition-colors";
const sectionTitle = "text-[clamp(2.1rem,4.4vw,3rem)]";

const sampleOrders = [
  {
    title: "Order #1042 · Telegram",
    detail: "45,000 MMK · taken by the AI assistant",
    state: "Receipt to approve",
    tone: "bg-mart-saffron text-[#2b1c00]",
  },
  {
    title: "Order #1041 · Web shop",
    detail: "28,500 MMK · bus gate to Mandalay",
    state: "2 to 3 days",
    tone: "bg-[#ddf0ea] text-[#0a5547]",
  },
  {
    title: "Order #1040 · Counter sale",
    detail: "12,000 MMK · saved offline, synced later",
    state: "Paid",
    tone: "bg-[#f0f4f2] text-[#3b433e]",
  },
];

const jobs = [
  ["Orders buried in chats", "Orders arrive as messages, at all hours, and some get lost."],
  ["Receipts to check by hand", "Every transfer slip needs a look, and some are fake or reused."],
  ["Parcels nobody can track", "Riders, couriers and bus gates, and shoppers keep asking where it is."],
];

// The id is the anchor the Product menu links to.
const features = [
  ["shop", "A shop on your own web address", "A storefront built from templates for your category. Share the link anywhere."],
  ["chat-orders", "Orders from chat and the web", "An AI assistant answers shoppers day and night, takes orders and calls you when a person is needed."],
  ["receipts", "Receipts checked, you decide", "BingoMart reads the amount, date and transaction ID and flags repeats. You approve."],
  ["delivery", "Parcels shoppers can follow", "Your rider, a courier or a bus gate: record each step and show a delivery window."],
  ["pos", "Counter sales and stock", "A point of sale that keeps working when the internet drops, with stock and cost price in one list."],
  ["reports", "Reports that show profit", "Income, profit, best sellers and slow sellers, by day, month or year."],
];

// Anchors for the Solutions menu. Who first, from the seller research: shops feeling the pain now.
const sellers = [
  ["chat-sellers", "Chat sellers", "Orders get lost between messages.", "Every chat order lands in one list, and the AI assistant answers while you sleep."],
  ["counter-shops", "Shops with a counter", "Stock in a notebook, sales in two places.", "One stock list for the counter and the web shop. The counter keeps working offline."],
  ["shippers", "Sellers who ship", "“Where is my parcel?” all day.", "Record each step and send shoppers a tracking link with a delivery window."],
];

const shopTypes = [
  ["fashion", "Fashion", "Sizes and colours on every item, and new drops shared as one link."],
  ["beauty", "Beauty", "Shades and sets, with best sellers and slow sellers in your reports."],
  ["food", "Food", "Daily orders from chat, delivered by your own riders."],
];

const myanmar = [
  ["Burmese first", "Prices in kyat, in Burmese and English."],
  ["Works on weak internet", "Record sales and parcel steps offline. They sync later."],
  ["Chat where shoppers are", "Web chat and Telegram first, then Messenger and Viber."],
  ["You stay in control", "The AI says it is an AI, and you approve every receipt."],
];

const steps = [
  ["Sign up with your phone", "Pick your category: fashion, beauty or food."],
  ["Add your products", "Type them in, import a spreadsheet, or ask our team to set up for you."],
  ["Share your shop link", "Connect web chat and Telegram, then take your first order."],
];

export default function BingoMartPage() {
  return (
    <>
      <div className="bg-mart-deep text-[0.8125rem] text-mart-mist">
        <div className={`${gutter} flex min-h-9 items-center justify-between gap-4`}>
          <span>BingoMart is a Bingo product</span>
          <Link
            href="/"
            className="inline-flex min-h-9 items-center font-semibold text-mart-paper underline-offset-4 hover:underline"
          >
            Back to Bingo
          </Link>
        </div>
      </div>

      <MartNav gutter={gutter} />

      <main id="main">
        <section className={`${gutter} grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-22`}>
          <div>
            <span className="inline-block rounded-full bg-[#fbebc8] px-3.5 py-1 text-[0.8125rem] font-bold text-[#5a3b05]">
              {flagship.status} · Early access open
            </span>
            <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.75rem)] text-mart-ink">
              Sell, get paid and deliver from one place.
            </h1>
            {/* Draft Burmese: needs a native speaker's check. */}
            <p lang="my" className="mt-5 text-[clamp(1.25rem,2.4vw,1.5rem)] leading-relaxed font-semibold text-mart-ink">
              သင့်ဆိုင်ကို တစ်နေရာတည်းမှာ စီမံပါ
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-mart-soft">
              The online shop for Myanmar sellers who take orders through chat.
              Fashion, beauty and food shops come first.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#access" className={`${button} bg-mart-teal text-white hover:bg-mart-ink`}>
                Join early access
              </a>
              <a href="#features" className={`${button} border-2 border-mart-ink text-mart-ink hover:bg-mart-ink hover:text-mart-paper`}>
                See what it does
              </a>
              <a href={APP_PREVIEW} className={`${button} text-mart-teal underline underline-offset-4 hover:text-mart-ink`}>
                Preview the app (demo)
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-mart-ink p-5 text-mart-paper sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-lg font-bold">Today in your shop</span>
              <span className="text-[0.8125rem] text-mart-mist">Example data</span>
            </div>
            <ul className="mt-4 space-y-3">
              {sampleOrders.map((order) => (
                <li
                  key={order.title}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-mart-panel p-4 sm:px-5"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold">{order.title}</span>
                    <span className="block text-sm text-mart-mist">{order.detail}</span>
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[0.8125rem] font-bold whitespace-nowrap ${order.tone}`}>
                    {order.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-mart-sand py-20 lg:py-22">
          <div className={gutter}>
            <h2 className={`${sectionTitle} max-w-3xl text-mart-ink`}>
              Three jobs that eat a shop owner&apos;s day
            </h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-3">
              {jobs.map(([title, detail]) => (
                <li key={title} className="border-t-4 border-mart-saffron pt-5">
                  <h3 className="text-[1.625rem] text-mart-ink">{title}</h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-mart-soft">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="features" className="scroll-mt-20 py-20 lg:py-22">
          <div className={gutter}>
            <h2 className={`${sectionTitle} text-mart-ink`}>
              What BingoMart will do for your shop
            </h2>
            <ul className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(([id, title, detail]) => (
                <li key={id} id={id} className="scroll-mt-24">
                  <h3 className="text-2xl text-mart-ink">{title}</h3>
                  <p className="mt-2 leading-relaxed text-mart-soft">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="solutions" className="scroll-mt-20 bg-mart-sand py-20 lg:py-22">
          <div className={gutter}>
            <h2 className={`${sectionTitle} text-mart-ink`}>Who BingoMart is for</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-mart-soft">
              Small shops that sell through chat. Yangon and Mandalay first.
            </p>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {sellers.map(([id, title, pain, fix]) => (
                <li key={id} id={id} className="scroll-mt-24 rounded-[1.5rem] bg-mart-paper p-7">
                  <h3 className="text-2xl text-mart-ink">{title}</h3>
                  <p className="mt-3 font-semibold text-mart-amber">{pain}</p>
                  <p className="mt-2 leading-relaxed text-mart-soft">{fix}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-16 text-[1.625rem] text-mart-ink">First shop types</h3>
            <ul className="mt-6 grid gap-10 md:grid-cols-3">
              {shopTypes.map(([id, title, detail]) => (
                <li key={id} id={id} className="scroll-mt-24 border-t-4 border-mart-saffron pt-5">
                  <h4 className="font-display text-xl font-bold text-mart-ink">{title}</h4>
                  <p className="mt-2 leading-relaxed text-mart-soft">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="myanmar" className="scroll-mt-20 bg-mart-ink py-20 text-mart-paper lg:py-22">
          <div className={`${gutter} grid gap-12 lg:grid-cols-[1fr_2fr]`}>
            <h2 className={sectionTitle}>Built for how Myanmar sells</h2>
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {myanmar.map(([title, detail]) => (
                <li key={title}>
                  <h3 className="text-[1.375rem] text-mart-saffron">{title}</h3>
                  <p className="mt-1.5 leading-relaxed text-[#d5e6e2]">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="how" className="scroll-mt-20 py-20 lg:py-22">
          <div className={gutter}>
            <h2 className={`${sectionTitle} text-mart-ink`}>How opening a shop will work</h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-3">
              {steps.map(([title, detail], i) => (
                <li key={title}>
                  <span className="font-display text-5xl leading-none font-bold text-mart-amber">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-2xl text-mart-ink">{title}</h3>
                  <p className="mt-2 leading-relaxed text-mart-soft">{detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-20 bg-mart-sand py-18">
          <div className={gutter}>
            <h2 className={`${sectionTitle} text-mart-ink`}>Pricing</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-mart-soft">
              We plan a free way to open your shop, with paid plans for more.
              Prices in kyat come after we test with real shops.
            </p>
          </div>
        </section>

        <section id="access" className="scroll-mt-20 bg-mart-saffron py-20 text-mart-ink lg:py-22">
          <div className={`${gutter} flex flex-wrap items-center justify-between gap-8`}>
            <div className="min-w-0 flex-[1_1_28rem]">
              <h2 className="text-[clamp(2.4rem,5vw,3.5rem)]">Be one of our first shops</h2>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-[#2b1c00]">
                Leave your contact details, or take the short survey to tell us
                how you sell today. Both forms are in Burmese.
              </p>
            </div>
            <div className="flex flex-col gap-3 max-sm:w-full sm:flex-row">
              <a
                href={EARLY_ACCESS}
                target="_blank"
                rel="noreferrer"
                className={`${button} bg-mart-ink text-mart-paper hover:bg-mart-deep`}
              >
                Join early access
              </a>
              <a
                href={SURVEY}
                target="_blank"
                rel="noreferrer"
                className={`${button} border-2 border-mart-ink hover:bg-mart-ink hover:text-mart-paper`}
              >
                Take the seller survey
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-mart-deep py-12 text-sm text-mart-mist">
        <div className={`${gutter} flex flex-wrap items-center justify-between gap-6`}>
          <span className="flex items-center gap-2.5 font-display text-[1.375rem] font-bold text-mart-paper">
            <Mark inverted className="h-8 w-8 rounded-[0.5625rem] text-[0.8125rem]" />
            BingoMart
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link href="/" className="inline-flex min-h-11 items-center font-semibold text-mart-paper hover:underline">
              A product of Bingo
            </Link>
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:underline">
              Privacy
            </Link>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all hover:underline">
              {site.email}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
