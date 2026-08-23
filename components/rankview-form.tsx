"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { submitRankView } from "@/lib/actions";
import { initialRankViewState } from "@/lib/rankview-state";
import { Spark } from "./logo";
import { Arrow } from "./ui";

const REPORT_HEADINGS = [
  "GOOGLE SEARCH",
  "GOOGLE BUSINESS PROFILE",
  "SOCIAL PRESENCE",
  "THREE QUICK WINS",
] as const;

/** Splits the plain-text report into its four labelled sections for display. */
function parseReport(report: string) {
  const pattern = new RegExp(`(${REPORT_HEADINGS.join("|")})`, "g");
  const parts = report.split(pattern).map((p) => p.trim()).filter(Boolean);

  const sections: { heading: string; body: string }[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    if ((REPORT_HEADINGS as readonly string[]).includes(parts[i])) {
      sections.push({ heading: parts[i], body: parts[i + 1] ?? "" });
    }
  }
  return sections;
}

export function RankViewForm() {
  const [state, formAction] = useActionState(submitRankView, initialRankViewState);
  const ids = useId();

  if (state.status === "success" && state.report) {
    const sections = parseReport(state.report);

    return (
      <div
        role="status"
        className="rounded-2xl border border-line bg-paper-2 p-8 sm:p-10"
      >
        <Spark className="h-3.5 w-2" />
        <h2 className="mt-5 text-2xl text-ink">
          {state.values?.businessName}&apos;s visibility report
        </h2>

        <div className="mt-8 space-y-7">
          {sections.length > 0
            ? sections.map((s) => (
                <div key={s.heading} className="border-t border-line pt-5">
                  <h3 className="text-[0.6875rem] font-semibold tracking-[0.2em] text-sand-ink uppercase">
                    {s.heading}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed whitespace-pre-line text-ink">
                    {s.body}
                  </p>
                </div>
              ))
            : (
                <p className="text-[0.9375rem] leading-relaxed whitespace-pre-line text-ink">
                  {state.report}
                </p>
              )}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-line pt-7">
          <a
            href="/contact"
            className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-spark px-7 text-[0.9375rem] font-semibold text-ink-2 transition-colors duration-200 hover:bg-spark-lift"
          >
            Let&apos;s fix what we found
            <Arrow />
          </a>
          <a
            href="/tools/rankview"
            className="text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
          >
            Check another business
          </a>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-6">
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-xl border border-spark/40 bg-spark-wash px-5 py-4 text-sm font-medium text-spark-deep"
        >
          {state.message}
        </p>
      ) : null}

      <Field
        id={`${ids}-business`}
        name="business_name"
        label="Business Name"
        autoComplete="organization"
        defaultValue={state.values?.businessName}
        error={state.errors?.businessName}
        required
      />
      <Field
        id={`${ids}-location`}
        name="location"
        label="City / Area"
        autoComplete="address-level2"
        defaultValue={state.values?.location}
        error={state.errors?.location}
        hint="Wherever customers would search for you — e.g. 'Bangkok' or 'Chatuchak'."
        required
      />

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={`${ids}-hp`}>Leave this blank</label>
        <input
          id={`${ids}-hp`}
          type="text"
          name="company_site"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <SubmitButton />
        <p className="text-sm text-ink-soft">
          Real search, right now — not a form that sits in an inbox.
        </p>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex min-h-13 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-spark px-8 font-semibold text-ink-2 transition-colors duration-200 hover:bg-spark-lift disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Searching…" : "Check My Visibility"}
      {pending ? (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink-2/30 border-t-ink-2"
        />
      ) : (
        <Arrow />
      )}
    </button>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  error,
  required,
  defaultValue,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-spark-deep">
            *
          </span>
        ) : null}
      </label>

      <input
        id={id}
        name={name}
        type="text"
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={`mt-2.5 min-h-12 w-full rounded-xl border bg-paper px-4 text-[1.0625rem] text-ink transition-colors placeholder:text-sand-ink hover:border-ink focus:border-ink ${
          error ? "border-spark" : "border-line"
        }`}
      />

      {hint ? (
        <p id={hintId} className="mt-2 text-sm text-ink-soft">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="mt-2 text-sm font-medium text-spark-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
