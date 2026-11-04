import Link from "next/link";
import type { Product } from "@/lib/products";
import { flagship, otherProducts } from "@/lib/products";
import { Reveal } from "./reveal";
import { Arrow } from "./ui";

/** The two-letter square every Bingo product is known by. Size via className. */
export function ProductTile({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center font-display font-extrabold tracking-[-0.04em] ${product.tile} ${className}`}
    >
      {product.letters}
    </span>
  );
}

/** Every product except the flagship, which gets the spotlight instead. */
export function ProductGrid() {
  return (
    <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {otherProducts.map((product, i) => (
        <Reveal
          key={product.slug}
          as="li"
          delay={i * 70}
          className="border-t border-line pt-7"
        >
          <Link href={product.href} className="group flex h-full flex-col">
            <ProductTile
              product={product}
              className="h-14 w-14 rounded-2xl text-[1.375rem]"
            />
            <h3 className="mt-5 text-2xl text-ink transition-colors group-hover:text-spark-deep">
              {product.name}
            </h3>
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
              {product.summary}
            </p>
            <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-spark-deep">
              {product.cta}
              <Arrow />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

const sampleDay = [
  ["New order from chat", "Telegram · 45,000 MMK", "Taken by AI"],
  ["Payment receipt read", "Amount, date and transaction ID", "You approve"],
  ["Parcel on its way", "Bus gate to Mandalay", "2 to 3 days"],
] as const;

/** The flagship's own colours, inside the parent site. */
export function FlagshipSpotlight() {
  return (
    <section className="bg-mart-ink py-24 text-mart-paper sm:py-28">
      <div className="mx-auto grid w-full max-w-[84rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <Reveal>
          <span className="inline-block rounded-full bg-mart-saffron px-3.5 py-1 text-[0.8125rem] font-bold text-[#2b1c00]">
            {flagship.status}
          </span>
          <h2 className="mt-6 text-[clamp(3rem,7vw,5rem)]">{flagship.name}</h2>
          <p className="mt-5 max-w-xl text-[clamp(1.25rem,2.4vw,1.625rem)] leading-tight font-medium">
            Sell, get paid and deliver from one place.
          </p>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-mart-mist">
            {flagship.summary}
          </p>
          <Link
            href={flagship.href}
            className="group mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-mart-saffron px-7 font-bold text-[#2b1c00] transition-colors hover:bg-white"
          >
            {flagship.cta}
            <Arrow />
          </Link>
        </Reveal>

        <Reveal delay={100}>
          <ul className="space-y-3">
            {sampleDay.map(([title, detail, state]) => (
              <li
                key={title}
                className="flex items-center justify-between gap-4 rounded-2xl bg-mart-panel px-5 py-4 sm:px-6"
              >
                <span className="min-w-0">
                  <span className="block font-semibold">{title}</span>
                  <span className="block text-sm text-mart-mist">{detail}</span>
                </span>
                <span className="shrink-0 text-[0.8125rem] font-bold text-mart-saffron">
                  {state}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-right text-[0.8125rem] text-mart-mist">
            Example data
          </p>
        </Reveal>
      </div>
    </section>
  );
}
