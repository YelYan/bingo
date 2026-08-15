"use client";

import { useMemo, useState } from "react";
import { categories, type Category, type Project } from "@/lib/projects";
import { ProjectCard } from "./project-card";

type Filter = Category | "All";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter, projects],
  );

  const options: Filter[] = ["All", ...categories];

  return (
    <div>
      {/* Radio group rather than buttons: arrow keys work, state is announced */}
      <div
        role="radiogroup"
        aria-label="Filter projects by discipline"
        className="flex flex-wrap items-center gap-2 border-y border-line py-5"
      >
        {options.map((option) => {
          const active = filter === option;
          const count =
            option === "All"
              ? projects.length
              : projects.filter((p) => p.categories.includes(option)).length;

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setFilter(option)}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {option}
              <span
                className={`tabular text-[0.6875rem] ${
                  active ? "text-sand" : "text-sand-ink"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* aria-live keeps screen-reader users informed when the grid changes */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} of {projects.length} projects
        {filter === "All" ? "" : ` in ${filter}`}.
      </p>

      <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-20 text-center text-ink-soft">
          Nothing in that discipline yet.
        </p>
      ) : null}
    </div>
  );
}
