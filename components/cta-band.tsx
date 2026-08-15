import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { ButtonLink, Container, Eyebrow } from "./ui";

export function CtaBand({
  eyebrow = "Next step",
  title = "Tell us what isn't landing.",
  lead = "Send three sentences about your business and the thing that frustrates you about your current site. You'll get a real reply from a person who has read them — usually within a day.",
  primary = { href: "/contact", label: "Start a project" },
  secondary = { href: "/work", label: "See the work first" },
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="blueprint-dark absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-spark/20 blur-[120px]"
      />

      <Container className="relative py-24 sm:py-32">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="paper">{eyebrow}</Eyebrow>
          <h2 className="mt-6 text-[clamp(2.4rem,6.2vw,4.75rem)] text-paper">
            {title}
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-sand-soft">
            {lead}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={primary.href} tone="spark">
              {primary.label}
            </ButtonLink>
            <ButtonLink
              href={secondary.href}
              tone="ghost"
              className="border-sand/30 text-paper hover:border-paper hover:bg-paper hover:text-ink"
            >
              {secondary.label}
            </ButtonLink>
          </div>

          <p className="mt-10 text-sm text-sand">
            Or skip the form —{" "}
            <a
              href={`mailto:${site.email}`}
              className="link-wipe font-medium text-paper"
            >
              {site.email}
            </a>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
