"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { submitSiteCheckr } from "@/lib/actions";
import { parseReport } from "@/lib/parse-report";
import { initialSiteCheckrState } from "@/lib/sitecheckr-state";
import { Spark } from "./logo";
import { Arrow } from "./ui";

const REPORT_HEADINGS = [
  "TITLE & META",
  "MOBILE & TECHNICAL",
  "SEARCH & SOCIAL",
  "THREE QUICK WINS",
] as const;

export function SiteCheckrForm() {
  const [state, formAction] = useActionState(
    submitSiteCheckr,
    initialSiteCheckrState,
  );
  const ids = useId();

  if (state.status === "success" && state.report) {
    const sections = parseReport(state.report, REPORT_HEADINGS);

    return (
      <div
        role="status"
        className="rounded-2xl border border-line bg-paper-2 p-8 sm:p-10"
      >
        <Spark className="h-3.5 w-2" />
        <h2 className="mt-5 text-2xl text-ink">
          What we found on {state.values?.url}
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
            href="/tools/sitecheckr"
            className="text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
          >
            Check another site
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

      <div>
        <label
          htmlFor={`${ids}-url`}
          className="block text-sm font-semibold text-ink"
        >
          Website URL
          <span aria-hidden="true" className="ml-1 text-spark-deep">
            *
          </span>
        </label>
        <input
          id={`${ids}-url`}
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          required
          defaultValue={state.values?.url}
          placeholder="yoursite.com"
          aria-describedby={
            state.errors?.url ? `${ids}-url-error` : undefined
          }
          aria-invalid={state.errors?.url ? true : undefined}
          className={`mt-2.5 min-h-12 w-full rounded-xl border bg-paper px-4 text-[1.0625rem] text-ink transition-colors placeholder:text-sand-ink hover:border-ink focus:border-ink ${
            state.errors?.url ? "border-spark" : "border-line"
          }`}
        />
        {state.errors?.url ? (
          <p
            id={`${ids}-url-error`}
            className="mt-2 text-sm font-medium text-spark-deep"
          >
            {state.errors.url}
          </p>
        ) : null}
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={`${ids}-hp`}>Leave this blank</label>
        <input
          id={`${ids}-hp`}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <SubmitButton />
        <p className="text-sm text-ink-soft">
          We scan the page directly — nothing saved, nothing sent anywhere else.
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
      {pending ? "Scanning…" : "Audit My Website Free"}
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
