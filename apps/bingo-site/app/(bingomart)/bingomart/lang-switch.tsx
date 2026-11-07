import Link from "next/link";
import { paths, type Lang } from "./copy";

const labels: Record<Lang, string> = { en: "EN", my: "မြန်မာ" };

// Real links, not state: each language is its own static page a seller can share.
// suffix keeps the reader on the same page, e.g. /features/web-shop, when the language changes.
export function LangSwitch({ lang, label, suffix = "", className = "" }: { lang: Lang; label: string; suffix?: string; className?: string }) {
  return (
    <nav aria-label={label} className={`inline-flex items-center rounded-full bg-mart-panel p-0.5 ${className}`}>
      {(["en", "my"] as const).map((code) => (
        <Link
          key={code}
          href={paths[code] + suffix}
          hrefLang={code}
          lang={code}
          scroll={false}
          aria-current={code === lang ? "page" : undefined}
          className={`inline-flex min-h-8 items-center rounded-full px-3 text-[0.8125rem] font-semibold transition-colors ${
            code === lang ? "bg-mart-saffron text-mart-ink" : "text-mart-mist hover:text-mart-paper"
          }`}
        >
          {labels[code]}
        </Link>
      ))}
    </nav>
  );
}
