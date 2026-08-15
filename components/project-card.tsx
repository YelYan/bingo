import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectPoster } from "./project-poster";
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
        <div className="overflow-hidden rounded-2xl border border-line bg-paper-2">
          {/* chrome bar, straight off the mark */}
          <div className="flex items-center gap-2 border-b border-line bg-paper px-4 py-3">
            <span aria-hidden="true" className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ink" />
              <span className="h-2 w-2 rounded-full bg-spark" />
              <span className="h-2 w-2 rounded-full bg-sand" />
            </span>
            <span className="ml-2 truncate font-sans text-[0.6875rem] tracking-[0.12em] text-sand-ink uppercase">
              {project.slug}.com
            </span>
            <span className="ml-auto tabular font-sans text-[0.6875rem] tracking-[0.12em] text-sand-ink">
              {project.year}
            </span>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
            <ProjectPoster
              variant={project.poster.variant}
              ink={project.poster.ink}
              spark={project.poster.spark}
              paper={project.poster.paper}
              className={priority ? "" : ""}
            />
          </div>
        </div>

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

      {/* headline result, pulled out so the card sells the outcome */}
      <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-5">
        {project.results.slice(0, 3).map((r) => (
          <div key={r.label}>
            <dt className="sr-only">{r.label}</dt>
            <dd>
              <span className="tabular block font-display text-xl font-bold tracking-[-0.04em] text-spark-deep">
                {r.value}
              </span>
              <span className="mt-0.5 block max-w-[12rem] text-xs leading-snug text-ink-soft">
                {r.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
