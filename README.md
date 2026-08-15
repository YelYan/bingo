# Bingo — Web Design Studio

Portfolio site for Bingo. Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No UI kit, no page builder, no runtime animation library.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. `npm run build` needs network access the first time so `next/font` can fetch and self-host the three typefaces.

---

## The idea

**Bingo** is the noise someone makes when a thing finally clicks. The whole site is built around that one moment:

- an orange dot that snaps into place under the word **aha** in the hero
- the blueprint grid behind the hero is live: move the pointer across it and the square underneath pops up in brand orange, with its neighbours ghosting in behind ([`components/hero-grid.tsx`](components/hero-grid.tsx))
- the same slanted orange parallelogram from the logo, reused as every bullet and section marker
- the browser window hiding inside the logo's `B` — chrome bar, three dots — scaled up into the site's main container (`components/window-frame.tsx`) and used for the hero, case-study art and pull quotes
- a single orange cursor dot that follows the pointer and swells over anything clickable

Everything else is deliberately quiet: warm paper, charcoal ink, enormous whitespace. Orange appears roughly six times per page and never for decoration.

## Design system

Tokens live in one place — the `@theme` block at the top of [`app/globals.css`](app/globals.css). Change them there and the whole site follows.

| Token | Value | Role |
| --- | --- | --- |
| `--color-paper` | `#f7f2ea` | Page ground, sampled from the logo mockup |
| `--color-paper-2` | `#efe6da` | Alternating section bands |
| `--color-ink` | `#24272c` | Body text, from the logo letterforms |
| `--color-ink-2` | `#16181c` | Dark sections and the footer |
| `--color-spark` | `#e2622b` | The orange. Large text, fills, accents |
| `--color-spark-deep` | `#a94210` | Small orange text — 5.4:1 on paper |
| `--color-spark-lift` | `#f4813f` | Small orange text **on dark** — 6.8:1 |
| `--color-sand` | `#b79e8b` | Meta text on dark only — 7:1 on ink |
| `--color-sand-ink` | `#6e5c4c` | The same role on light — 5.7:1 on paper |

Three of these pairs exist purely to stay readable, and collapsing them will silently break contrast:

- `--color-spark` (the brand orange) is 3.1:1 on paper. Large text, fills and non-text marks only. Anything under 24px uses `spark-deep` on light or `spark-lift` on dark.
- `--color-sand` is 7:1 on ink but only 2.3:1 on paper. On light backgrounds use `sand-ink`. The `Eyebrow` component takes `tone="paper"` to flip.
- Orange buttons use **charcoal** text, not white — white on `#e2622b` is 3.5:1. Charcoal-on-orange is 5.1:1 and happens to be the logo's own pairing.

Every text node on all eight pages was measured against its real computed background: zero failures at WCAG AA.

**Type.** Bricolage Grotesque (display, 700/800, tight tracking) · Archivo (body) · Instrument Serif italic (the accent voice — used for promises, quotes and the word *aha*, never for more than a sentence or two).

## Structure

```
app/
  page.tsx              Home — hero, ticker, services, work, method, proof, pricing teaser
  work/                 Index with discipline filter + 6 static case studies
  services/             The three disciplines in depth, anchored per service
  pricing/              Plans with monthly/annual toggle, add-ons, FAQ
  about/  contact/  privacy/  not-found.tsx
  sitemap.ts  robots.ts  icon.svg
components/             All UI. `ui.tsx` holds Container/Button/SectionHeading/Tag
lib/                    All copy and data — the only files you need to touch for content
```

### The hero grid

`HeroGrid` maps the hero's copy — text line by line via a `Range`, everything else by its box — and refuses to light any cell that overlaps it. That is not fussiness: a solid `#e2622b` square behind the lead paragraph takes it from 5.7:1 to about 2.3:1. The effect therefore lives in the negative space (top band, gutters, the gap between columns, below the fold), which is also where it looks best.

The layer is `pointer-events: none` and listens on the parent `<section>`, so it never intercepts a click. Column count is read back from the resolved `auto-fill` grid on hover entry rather than cached at mount, and touch pointers are checked per-move so a docked hybrid device isn't stuck with the static grid.

**Content lives in `lib/`.** `site.ts` (name, contact, stats), `services.ts` (the three services + the four-step method), `projects.ts` (case studies), `pricing.ts` (plans, add-ons, FAQ). Nothing is hardcoded in a page component.

## Things to change before launch

1. **Real logo** — `components/logo.tsx` is an SVG *reconstruction* of your mark, drawn from the mockup. Swap in the original vector file when you have it, and replace `app/icon.svg` to match.
2. **Copy and prices** — everything in `lib/` is written as a plausible studio, but the case studies, team members, testimonials and plan prices are placeholders. Replace them with yours.
3. **`site.url`** in `lib/site.ts` — currently `https://bingostudio.com`. Metadata, canonicals, sitemap and JSON-LD all derive from it.
4. **Contact form delivery** — `lib/actions.ts` validates, runs a honeypot and returns success, but **sends nothing**. There is a marked block where a provider (Resend, Postmark, a CRM webhook) plugs in. Note that this file is `"use server"`, so it may only export async functions — the state type and its initial value live in `lib/contact-state.ts` for that reason. Adding a non-function export there compiles fine and then throws at request time.
5. **Case-study imagery** — each project currently renders a generated SVG composition (`components/project-poster.tsx`) in its own palette, with one orange element that animates on hover. If you'd rather show screenshots, replace `<ProjectPoster />` inside `project-card.tsx` and the case-study page with `next/image`.

## Accessibility and SEO

Built in rather than bolted on, since both are things Bingo sells:

- Skip link, visible focus rings, `aria-current` on the active nav item
- Every interactive control is at least 44px tall; filter and billing controls are real radio groups with `aria-checked`
- Form has visible labels, `aria-describedby` hints, errors attached to their own field, and an `aria-live` region on the work filter
- `prefers-reduced-motion` disables the reveal, the marquee, the cursor and smooth scrolling
- Scroll-reveal never strands content: the hiding CSS is scoped to `[data-js]` (set by an inline script before the body parses), so with JS off nothing is hidden, and the observer carries a 2s failsafe for environments that suspend `IntersectionObserver`
- Per-route metadata and canonicals, `sitemap.xml`, `robots.txt`, `ProfessionalService` JSON-LD site-wide and `FAQPage` + `OfferCatalog` on pricing
- All 19 routes prerender to static HTML; shared JS is ~102 kB

## Deploy

Vercel is the path of least resistance — import the repo, no configuration needed. Any host that runs `next build` and `next start` works, as does a static export if you first replace the server action in `lib/actions.ts` with a form endpoint.
