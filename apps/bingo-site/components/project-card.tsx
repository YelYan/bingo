import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Spark } from "./logo";
import { BrowserMockup } from "./browser-mockup";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article className="group @container relative">
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

        <div className="mt-6">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[0.6875rem] font-semibold tracking-[0.18em] text-sand-ink uppercase">
              <span className="text-ink-soft">{project.sector}</span>
              {project.categories.map((c) => (
                <span key={c} className="before:mr-3 before:content-['·']">
                  {c}
                </span>
              ))}
            </div>
            <h3 className="mt-3 text-[clamp(1.35rem,2.4vw,1.85rem)] text-ink transition-colors duration-300 group-hover:text-spark-deep">
              {project.headline}
            </h3>
            <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
              {project.summary}
            </p>
          </div>

        </div>
      </Link>

      <ul className="mt-6 grid gap-3 border-t border-line pt-5 @xl:grid-cols-3 @xl:gap-6">
        {project.highlights.slice(0, 3).map((h) => (
          <li
            key={h}
            className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-ink-soft"
          >
            <Spark className="mt-1 h-2.5 w-[0.4rem] shrink-0" />
            {h}
          </li>
        ))}
      </ul>
    </article>
  );
}
