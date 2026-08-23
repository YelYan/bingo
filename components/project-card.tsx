import Link from "next/link";
import type { Project } from "@/lib/projects";
import { BrowserMockup } from "./browser-mockup";
import { Arrow } from "./ui";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className="group relative">
      <Link
        href={`/work/${project.slug}`}
        className="block rounded-2xl outline-offset-4"
        aria-label={`${project.name} — ${project.headline}`}
      >
        <BrowserMockup
          domain={project.domain}
          screenshot={project.screenshot}
          alt={`${project.name} homepage`}
          priority={priority}
        />

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-sand-ink uppercase">
              <span className="text-ink-soft">{project.sector}</span>
              {project.categories.map((c) => (
                <span key={c} className="before:mr-3 before:content-['·']">
                  {c}
                </span>
              ))}
            </div>
            <h3 className="mt-3 text-[clamp(1.35rem,2.4vw,1.85rem)] text-ink">
              {project.headline}
            </h3>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
              {project.summary}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-spark group-hover:bg-spark group-hover:text-ink-2 sm:inline-flex"
          >
            <Arrow />
          </span>
        </div>
      </Link>

      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-5">
        {project.highlights.slice(0, 3).map((h) => (
          <li
            key={h}
            className="max-w-[16rem] text-xs leading-snug text-ink-soft"
          >
            {h}
          </li>
        ))}
      </ul>
    </article>
  );
}
