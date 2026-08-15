/**
 * Native <details> — keyboard-operable, findable by in-page search,
 * and it works before a single byte of JS arrives.
 */
export function Faq({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-8 py-6 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="max-w-2xl text-[1.125rem] leading-snug font-semibold tracking-[-0.01em] text-ink transition-colors group-open:text-spark-deep sm:text-xl">
              {item.q}
            </h3>
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors group-open:border-spark group-open:bg-spark group-open:text-ink-2"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M3 8h10" />
                <path
                  d="M8 3v10"
                  className="origin-center transition-transform duration-300 group-open:scale-y-0"
                />
              </svg>
            </span>
          </summary>
          <p className="max-w-3xl pt-1 pb-7 text-[1.0625rem] leading-relaxed text-ink-soft">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
