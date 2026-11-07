import Link from "next/link";
import { paths, type Lang } from "./copy";
import { FeatureScene } from "./feature-scenes";
import { featureCopy, featureSlugs, type Slug } from "./features";
import { APP_PREVIEW, EARLY_ACCESS } from "./links";
import { MartShell } from "./mart-page";

const gutter = "mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12";
const button =
  "inline-flex min-h-13 items-center justify-center rounded-full px-8 font-semibold transition-colors";
const sectionTitle = "text-[clamp(2rem,4.2vw,2.75rem)]";
const eyebrow = "text-[0.9375rem] font-semibold text-mart-teal";

// Foundable's solution-page order: hook, watch it work, the pain, three steps, six tiles, questions, one action.
export function FeaturePage({ lang, slug }: { lang: Lang; slug: Slug }) {
  const { shared, items } = featureCopy[lang];
  const f = items[slug];
  const base = paths[lang];
  const heroSize = lang === "my" ? "text-[clamp(2.1rem,5vw,3.75rem)]" : "text-[clamp(2.75rem,7vw,5.5rem)]";

  return (
    <MartShell lang={lang} suffix={`/features/${slug}`}>
      <main id="main">
        <section className={`${gutter} pt-16 pb-20 text-center lg:pt-24`}>
          <p className={eyebrow}>{f.name}</p>
          <h1 className={`mx-auto mt-4 max-w-5xl ${heroSize} text-mart-ink`}>
            {f.title[0]}{" "}
            <span className="bg-gradient-to-r from-mart-teal to-[#2f9e7f] bg-clip-text text-transparent">{f.title[1]}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mart-soft sm:text-xl">{f.lead}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={EARLY_ACCESS}
              target="_blank"
              rel="noreferrer"
              className={`${button} bg-mart-ink text-mart-paper hover:bg-mart-teal`}
            >
              {shared.join}
            </a>
            <a href={APP_PREVIEW} className={`${button} border-2 border-mart-ink text-mart-ink hover:bg-mart-ink hover:text-mart-paper`}>
              {shared.demo}
            </a>
          </div>
          <div className="mx-auto mt-14 max-w-5xl text-left">
            <FeatureScene
              slug={slug}
              scene={f.scene}
              ui={{ play: shared.play, pause: shared.pause, example: shared.example, label: `${shared.watch}: ${f.name}` }}
            />
          </div>
        </section>

        <section className="bg-mart-ink py-20 text-mart-paper lg:py-24">
          <div className={gutter}>
            <h2 className={`${sectionTitle} max-w-3xl`}>{shared.painTitle}</h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {f.pain.map(([title, detail], i) => (
                <li key={title} className="rounded-[1.5rem] bg-mart-panel p-7">
                  <span className="font-display text-sm font-bold text-mart-saffron">0{i + 1}</span>
                  <h3 className="mt-3 text-[1.5rem] text-mart-paper">{title}</h3>
                  <p className="mt-2 leading-relaxed text-[#d5e6e2]">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className={gutter}>
            <h2 className={`${sectionTitle} text-mart-ink`}>{shared.howTitle}</h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-3">
              {f.how.map(([title, detail], i) => (
                <li key={title}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mart-saffron font-display text-lg font-bold text-mart-ink">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-2xl text-mart-ink">{title}</h3>
                  <p className="mt-2 leading-relaxed text-mart-soft">{detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-mart-sand py-20 lg:py-24">
          <div className={gutter}>
            <h2 className={`${sectionTitle} text-mart-ink`}>{shared.handlesTitle}</h2>
            <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {f.handles.map(([title, detail]) => (
                <li key={title} className="rounded-2xl bg-mart-paper p-5 sm:p-6">
                  <span className="block font-display text-lg font-bold text-mart-ink">{title}</span>
                  <span className="mt-1 block text-sm text-mart-soft">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className={`${gutter} grid gap-10 lg:grid-cols-[1fr_2fr]`}>
            <h2 className={`${sectionTitle} text-mart-ink`}>{shared.faqTitle}</h2>
            <div className="border-t border-mart-line">
              {f.faq.map(([q, a]) => (
                <details key={q} className="group border-b border-mart-line">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-bold text-mart-ink [&::-webkit-details-marker]:hidden">
                    {q}
                    <span aria-hidden="true" className="text-2xl leading-none font-normal text-mart-teal transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-5 leading-relaxed text-mart-soft">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-mart-saffron py-20 text-mart-ink lg:py-24">
          <div className={`${gutter} text-center`}>
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)]">{shared.closing}</h2>
            <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-[#2b1c00]">{shared.closingLead}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={EARLY_ACCESS}
                target="_blank"
                rel="noreferrer"
                className={`${button} bg-mart-ink text-mart-paper hover:bg-mart-deep`}
              >
                {shared.join}
              </a>
              <a href={APP_PREVIEW} className={`${button} border-2 border-mart-ink hover:bg-mart-ink hover:text-mart-paper`}>
                {shared.demo}
              </a>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className={gutter}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[clamp(1.75rem,3.4vw,2.25rem)] text-mart-ink">{shared.more}</h2>
              <Link href={`${base}#features`} className="inline-flex min-h-11 items-center font-semibold text-mart-teal hover:underline">
                {shared.all} →
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {featureSlugs
                .filter((other) => other !== slug)
                .map((other) => (
                  <li key={other}>
                    <Link
                      href={`${base}/features/${other}`}
                      className="group flex h-full flex-col rounded-2xl border border-mart-line p-5 transition-colors hover:border-mart-teal hover:bg-white"
                    >
                      <span className="font-display text-lg font-bold text-mart-ink">{items[other].name}</span>
                      <span className="mt-1 text-sm leading-snug text-mart-soft">
                        {items[other].title[0]} {items[other].title[1]}
                      </span>
                      <span className="mt-auto pt-3 text-sm font-semibold text-mart-teal group-hover:underline">→</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </main>
    </MartShell>
  );
}
