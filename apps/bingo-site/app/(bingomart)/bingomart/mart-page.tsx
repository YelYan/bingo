import Link from "next/link";
import { site } from "@/lib/site";
import { copy, featureIds, paths, sellerIds, shopTypeIds, type Lang } from "./copy";
import { LangSwitch } from "./lang-switch";
import { APP_PREVIEW, EARLY_ACCESS, SURVEY } from "./links";
import { Mark } from "./mark";
import { MartNav } from "./mart-nav";
import { ProductStory } from "./product-story";

const gutter = "mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12";
const button =
  "inline-flex min-h-13 items-center justify-center rounded-full px-8 font-semibold transition-colors";
const sectionTitle = "text-[clamp(2.1rem,4.4vw,3rem)]";

const orderTones = [
  "bg-mart-saffron text-[#2b1c00]",
  "bg-[#ddf0ea] text-[#0a5547]",
  "bg-[#f0f4f2] text-[#3b433e]",
];

export function MartPage({ lang }: { lang: Lang }) {
  const c = copy[lang];
  // Burmese glyphs are wide and tall: a smaller headline and a looser line height (see .mart [lang="my"]).
  const heroTitle = lang === "my" ? "text-[clamp(2.1rem,4.6vw,3.5rem)]" : "text-[clamp(2.75rem,6vw,4.75rem)]";

  return (
    <div lang={lang === "my" ? "my" : undefined}>
      <div className="bg-mart-deep text-[0.8125rem] text-mart-mist">
        <div className={`${gutter} flex min-h-11 items-center justify-between gap-4`}>
          <span className="max-sm:hidden">{c.topbar.label}</span>
          <div className="flex items-center gap-4 max-sm:w-full max-sm:justify-between">
            <LangSwitch lang={lang} label={c.topbar.switchLabel} />
            <Link
              href="/"
              className="inline-flex min-h-9 items-center font-semibold text-mart-paper underline-offset-4 hover:underline"
            >
              {c.topbar.back}
            </Link>
          </div>
        </div>
      </div>

      <MartNav gutter={gutter} nav={c.nav} home={paths[lang]} />

      <main id="main">
        <section className={`${gutter} grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-22`}>
          <div>
            <span className="inline-block rounded-full bg-[#fbebc8] px-3.5 py-1 text-[0.8125rem] font-bold text-[#5a3b05]">
              {c.hero.badge}
            </span>
            <h1 className={`mt-6 ${heroTitle} text-mart-ink`}>{c.hero.title}</h1>
            {c.hero.sub ? (
              // The English page carries a Burmese line under the headline, so its language is marked apart.
              <p
                lang="my"
                className="mt-5 text-[clamp(1.25rem,2.4vw,1.5rem)] leading-relaxed font-semibold text-mart-ink"
              >
                {c.hero.sub}
              </p>
            ) : null}
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-mart-soft">{c.hero.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#access" className={`${button} bg-mart-teal text-white hover:bg-mart-ink`}>
                {c.hero.join}
              </a>
              <a
                href="#features"
                className={`${button} border-2 border-mart-ink text-mart-ink hover:bg-mart-ink hover:text-mart-paper`}
              >
                {c.hero.see}
              </a>
              <a href={APP_PREVIEW} className={`${button} text-mart-teal underline underline-offset-4 hover:text-mart-ink`}>
                {c.hero.preview}
              </a>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-mart-ink p-5 text-mart-paper sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-lg font-bold">{c.hero.card}</span>
              <span className="text-[0.8125rem] text-mart-mist">{c.hero.example}</span>
            </div>
            <ul className="mt-4 space-y-3">
              {c.hero.orders.map((order, i) => (
                <li
                  key={order.title}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-mart-panel p-4 sm:px-5"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold">{order.title}</span>
                    <span className="block text-sm text-mart-mist">{order.detail}</span>
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[0.8125rem] font-bold whitespace-nowrap ${orderTones[i]}`}>
                    {order.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-mart-sand py-20 lg:py-22">
          <div className={gutter}>
            <h2 className={`${sectionTitle} max-w-3xl text-mart-ink`}>{c.jobs.title}</h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-3">
              {c.jobs.items.map(([title, detail]) => (
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
            <h2 className={`${sectionTitle} text-mart-ink`}>{c.features.title}</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-mart-soft">{c.story.lead}</p>
            {/* Show the screen, not a list: each step plays a small copy of the real app. */}
            <ProductStory
              steps={featureIds.map((id) => ({ id, title: c.features.items[id][0], detail: c.features.items[id][1] }))}
              story={c.story}
            />
          </div>
        </section>

        <section id="solutions" className="scroll-mt-20 bg-mart-sand py-20 lg:py-22">
          <div className={gutter}>
            <h2 className={`${sectionTitle} text-mart-ink`}>{c.who.title}</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-mart-soft">{c.who.lead}</p>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {sellerIds.map((id) => {
                const [title, pain, fix] = c.who.items[id];
                return (
                  <li key={id} id={id} className="scroll-mt-24 rounded-[1.5rem] bg-mart-paper p-7">
                    <h3 className="text-2xl text-mart-ink">{title}</h3>
                    <p className="mt-3 font-semibold text-mart-amber">{pain}</p>
                    <p className="mt-2 leading-relaxed text-mart-soft">{fix}</p>
                  </li>
                );
              })}
            </ul>
            <h3 className="mt-16 text-[1.625rem] text-mart-ink">{c.who.typesTitle}</h3>
            <ul className="mt-6 grid gap-10 md:grid-cols-3">
              {shopTypeIds.map((id) => (
                <li key={id} id={id} className="scroll-mt-24 border-t-4 border-mart-saffron pt-5">
                  <h4 className="font-display text-xl font-bold text-mart-ink">{c.who.types[id][0]}</h4>
                  <p className="mt-2 leading-relaxed text-mart-soft">{c.who.types[id][1]}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="myanmar" className="scroll-mt-20 bg-mart-ink py-20 text-mart-paper lg:py-22">
          <div className={`${gutter} grid gap-12 lg:grid-cols-[1fr_2fr]`}>
            <h2 className={sectionTitle}>{c.myanmar.title}</h2>
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {c.myanmar.items.map(([title, detail]) => (
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
            <h2 className={`${sectionTitle} text-mart-ink`}>{c.how.title}</h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-3">
              {c.how.steps.map(([title, detail], i) => (
                <li key={title}>
                  <span className="font-display text-5xl leading-none font-bold text-mart-amber">{i + 1}</span>
                  <h3 className="mt-3 text-2xl text-mart-ink">{title}</h3>
                  <p className="mt-2 leading-relaxed text-mart-soft">{detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-20 bg-mart-sand py-18">
          <div className={gutter}>
            <h2 className={`${sectionTitle} text-mart-ink`}>{c.pricing.title}</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-mart-soft">{c.pricing.body}</p>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 py-20 lg:py-22">
          <div className={`${gutter} grid gap-10 lg:grid-cols-[1fr_2fr]`}>
            <h2 className={`${sectionTitle} text-mart-ink`}>{c.faq.title}</h2>
            <div className="border-t border-mart-line">
              {c.faq.items.map(([q, a]) => (
                <details key={q} className="group border-b border-mart-line">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-bold text-mart-ink [&::-webkit-details-marker]:hidden">
                    {q}
                    <span
                      aria-hidden="true"
                      className="text-2xl leading-none font-normal text-mart-teal transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-5 leading-relaxed text-mart-soft">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="access" className="scroll-mt-20 bg-mart-saffron py-20 text-mart-ink lg:py-22">
          <div className={`${gutter} flex flex-wrap items-center justify-between gap-8`}>
            <div className="min-w-0 flex-[1_1_28rem]">
              <h2 className="text-[clamp(2.4rem,5vw,3.5rem)]">{c.access.title}</h2>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-[#2b1c00]">{c.access.body}</p>
            </div>
            <div className="flex flex-col gap-3 max-sm:w-full sm:flex-row">
              <a
                href={EARLY_ACCESS}
                target="_blank"
                rel="noreferrer"
                className={`${button} bg-mart-ink text-mart-paper hover:bg-mart-deep`}
              >
                {c.access.join}
              </a>
              <a
                href={SURVEY}
                target="_blank"
                rel="noreferrer"
                className={`${button} border-2 border-mart-ink hover:bg-mart-ink hover:text-mart-paper`}
              >
                {c.access.survey}
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
            <LangSwitch lang={lang} label={c.topbar.switchLabel} />
            <Link href="/" className="inline-flex min-h-11 items-center font-semibold text-mart-paper hover:underline">
              {c.footer.product}
            </Link>
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:underline">
              {c.footer.privacy}
            </Link>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all hover:underline">
              {site.email}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
