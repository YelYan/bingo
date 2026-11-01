/**
 * Deterministic, zero-cost website audit — no external API, no LLM call.
 * Fetches the page's own HTML and checks it against plain-text rules.
 * Regex rather than a DOM parser on purpose: this runs on the Cloudflare
 * Workers runtime, where a full HTML parser is unavailable (or heavy) and
 * a handful of tag checks don't need one.
 */

type Check = {
  ok: boolean;
  /** Shown only when `ok` is false — becomes a candidate "quick win". */
  issue?: string;
  /** Priority for picking the top 3 issues — lower runs first. */
  weight?: number;
};

function hasTag(html: string, pattern: RegExp): boolean {
  return pattern.test(html);
}

export function auditHtml(
  html: string,
  finalUrl: string,
  elapsedMs: number,
): string {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "";

  const descMatch =
    html.match(
      /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i,
    ) ??
    html.match(
      /<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i,
    );
  const description = descMatch ? descMatch[1].trim() : "";

  const hasViewport = hasTag(html, /<meta[^>]+name=["']viewport["']/i);
  const isHttps = finalUrl.startsWith("https://");
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const imgsMissingAlt = imgTags.filter((tag) => !/\balt\s*=/i.test(tag)).length;
  const hasOgTitle = hasTag(html, /<meta[^>]+property=["']og:title["']/i);
  const hasOgImage = hasTag(html, /<meta[^>]+property=["']og:image["']/i);
  const hasJsonLd = hasTag(
    html,
    /<script[^>]+type=["']application\/ld\+json["']/i,
  );
  const noindex = hasTag(
    html,
    /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i,
  );

  const checks: Record<string, Check> = {
    noindex: {
      ok: !noindex,
      weight: 0,
      issue:
        "This page tells search engines not to index it (a 'noindex' tag). If that's not intentional, it's the reason you're not showing up in search at all.",
    },
    title: {
      ok: title.length >= 10 && title.length <= 70,
      weight: 1,
      issue: !title
        ? "No <title> tag found — this is the headline Google shows in search results, and browser tabs show it too."
        : title.length < 10
          ? `The title tag ("${title}") is very short — it's not giving search engines or visitors much to go on.`
          : `The title tag is ${title.length} characters — Google typically truncates titles past ~60 characters.`,
    },
    description: {
      ok: description.length >= 50 && description.length <= 165,
      weight: 2,
      issue: !description
        ? "No meta description — Google will auto-generate a snippet instead of using copy you control."
        : description.length < 50
          ? "The meta description is quite short for what shows up in search results."
          : `The meta description is ${description.length} characters — Google usually cuts it off around 160.`,
    },
    viewport: {
      ok: hasViewport,
      weight: 3,
      issue:
        "No mobile viewport tag — the page likely renders zoomed-out or badly scaled on phones.",
    },
    https: {
      ok: isHttps,
      weight: 4,
      issue:
        "This page isn't served over HTTPS — browsers flag it as 'not secure', and it hurts search ranking.",
    },
    speed: {
      ok: elapsedMs < 2000,
      weight: 5,
      issue: `The page took ${(elapsedMs / 1000).toFixed(1)}s to respond — visitors and search crawlers both tend to bail past 2-3 seconds.`,
    },
    h1: {
      ok: h1Count === 1,
      weight: 6,
      issue:
        h1Count === 0
          ? "No <h1> heading found — search engines use it to understand what the page is actually about."
          : `${h1Count} <h1> headings found — having more than one dilutes which one search engines treat as the main heading.`,
    },
    social: {
      ok: hasOgTitle && hasOgImage,
      weight: 7,
      issue:
        "No Open Graph tags — when this page is shared on social media or WhatsApp, the preview card will look bare or broken.",
    },
    altText: {
      ok: imgsMissingAlt === 0,
      weight: 8,
      issue: `${imgsMissingAlt} of ${imgTags.length} images have no alt text — that's a missed SEO signal and a real accessibility gap.`,
    },
    schema: {
      ok: hasJsonLd,
      weight: 9,
      issue:
        "No structured data (schema.org) found — adding it can unlock rich results like star ratings or FAQs in search.",
    },
  };

  const issues = Object.values(checks)
    .filter((c) => !c.ok && c.issue)
    .sort((a, b) => (a.weight ?? 99) - (b.weight ?? 99));

  const quickWins =
    issues.length > 0
      ? issues.slice(0, 3).map((c) => `- ${c.issue}`)
      : [
          "- Nothing broken here — the basics are covered. Worth a deeper look at content and Core Web Vitals next.",
        ];

  return `TITLE & META
Title: ${title ? `"${title}" (${title.length} characters)` : "missing"}. Meta description: ${description ? `present, ${description.length} characters` : "missing"}.

MOBILE & TECHNICAL
Mobile viewport tag: ${hasViewport ? "present" : "missing"}. HTTPS: ${isHttps ? "yes" : "no"}. Server response: ${(elapsedMs / 1000).toFixed(1)}s.${noindex ? " Warning: this page is marked 'noindex'." : ""}

SEARCH & SOCIAL
Main heading (H1): ${h1Count === 1 ? "one found, as expected" : `${h1Count} found`}. Social preview tags (Open Graph): ${hasOgTitle && hasOgImage ? "present" : "missing or incomplete"}. Structured data: ${hasJsonLd ? "present" : "not found"}. Images missing alt text: ${imgsMissingAlt} of ${imgTags.length}.

THREE QUICK WINS
${quickWins.join("\n")}`;
}
