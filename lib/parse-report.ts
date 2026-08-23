/**
 * Splits a plain-text tool report into labelled sections, given the exact
 * heading strings the report was generated with. Shared by every tool that
 * renders a structured report (RankView, SiteCheckr) so the parsing logic
 * — and its "unrecognised format" fallback — only lives in one place.
 */
export function parseReport(report: string, headings: readonly string[]) {
  const pattern = new RegExp(`(${headings.join("|")})`, "g");
  const parts = report
    .split(pattern)
    .map((p) => p.trim())
    .filter(Boolean);

  const sections: { heading: string; body: string }[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    if ((headings as readonly string[]).includes(parts[i])) {
      sections.push({ heading: parts[i], body: parts[i + 1] ?? "" });
    }
  }
  return sections;
}
