import { ButtonLink, Container } from "@/components/ui";
import { nav } from "@/lib/site";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="vignette relative overflow-hidden pt-40 pb-32">
      <div aria-hidden="true" className="blueprint absolute inset-0" />
      <Container className="relative">
        <p className="font-display text-[clamp(5rem,18vw,12rem)] leading-none font-extrabold tracking-[-0.06em] text-ink">
          404<span className="text-spark">.</span>
        </p>
        <h1 className="mt-6 max-w-2xl text-[clamp(1.8rem,4.4vw,3rem)] text-ink">
          No aha moment down this path.
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
          The page moved, or never existed. Either way it is our job to make
          that obvious rather than mysterious — so here are the ways back.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" tone="ink">
            Back home
          </ButtonLink>
          <ButtonLink href="/contact" tone="ghost">
            Tell us what broke
          </ButtonLink>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-7">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="link-wipe text-[0.9375rem] text-ink-soft hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
