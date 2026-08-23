import Image from "next/image";

/**
 * Real screenshot, dressed in the same chrome-bar treatment as the case
 * study cards — so a live site and a drawn poster read as one family.
 */
export function BrowserMockup({
  domain,
  screenshot,
  alt,
  priority = false,
}: {
  domain: string;
  screenshot: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper-2 shadow-[0_1px_2px_rgba(36,39,44,0.06)] transition-shadow duration-300 group-hover:shadow-[0_28px_60px_-24px_rgba(36,39,44,0.35)]">
      <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-3">
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink" />
          <span className="h-2 w-2 rounded-full bg-spark" />
          <span className="h-2 w-2 rounded-full bg-sand" />
        </span>
        <span className="ml-2 truncate font-sans text-[0.6875rem] tracking-[0.12em] text-sand-ink uppercase">
          {domain}
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        <Image
          src={screenshot}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          priority={priority}
        />
      </div>
    </div>
  );
}
