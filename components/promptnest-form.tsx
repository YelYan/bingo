"use client";

import { useActionState, useId, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitPromptNest } from "@/lib/actions";
import { initialPromptNestState } from "@/lib/promptnest-state";
import { Spark } from "./logo";
import { Arrow } from "./ui";

export function PromptNestForm() {
  const [state, formAction] = useActionState(
    submitPromptNest,
    initialPromptNestState,
  );
  const ids = useId();
  const [copied, setCopied] = useState(false);

  if (state.status === "success" && state.prompt) {
    const copy = async () => {
      try {
        await navigator.clipboard.writeText(state.prompt ?? "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard API unavailable — the textarea below is selectable manually.
      }
    };

    return (
      <div
        role="status"
        className="rounded-2xl border border-line bg-paper-2 p-8 sm:p-10"
      >
        <Spark className="h-3.5 w-2" />
        <h2 className="mt-5 text-2xl text-ink">Your prompt is ready</h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
          Paste this into Claude, ChatGPT, or whichever AI tool you're
          building with — it has everything it needs to get started.
        </p>

        <div className="relative mt-6">
          <textarea
            readOnly
            value={state.prompt}
            rows={16}
            className="w-full resize-y rounded-xl border border-line bg-paper px-4 py-3.5 font-mono text-sm leading-relaxed text-ink"
          />
          <button
            type="button"
            onClick={copy}
            className="absolute top-3 right-3 inline-flex min-h-9 cursor-pointer items-center rounded-full border border-line bg-paper px-4 text-xs font-semibold text-ink transition-colors hover:border-ink"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-line pt-7">
          <a
            href="/contact"
            className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-spark px-7 text-[0.9375rem] font-semibold text-ink-2 transition-colors duration-200 hover:bg-spark-lift"
          >
            Let&apos;s build it for you instead
            <Arrow />
          </a>
          <a
            href="/tools/promptnest"
            className="text-sm font-medium text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
          >
            Start over
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
        id={`${ids}-services`}
        name="services"
        label="Services You Offer"
        hint="e.g. Residential plumbing, drain cleaning, water heater repair"
        defaultValue={state.values?.services}
        error={state.errors?.services}
        required
      />

      <Field
        id={`${ids}-description`}
        name="description"
        label="Describe Your Business"
        textarea
        hint="What do you do? Who are your customers? What makes you different? A sentence or two is plenty."
        defaultValue={state.values?.description}
        error={state.errors?.description}
        required
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${ids}-location`}
          name="location"
          label="Service Area / Address"
          autoComplete="address-level2"
          defaultValue={state.values?.location}
        />
        <Field
          id={`${ids}-website`}
          name="website_url"
          label="Existing Website"
          autoComplete="url"
          hint="If you have one — no worries if not."
          defaultValue={state.values?.websiteUrl}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${ids}-phone`}
          name="phone"
          label="Phone Number"
          autoComplete="tel"
          defaultValue={state.values?.phone}
        />
        <Field
          id={`${ids}-email`}
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          defaultValue={state.values?.email}
        />
      </div>

      <Field
        id={`${ids}-colors`}
        name="colors"
        label="Website Colors / Style"
        hint="e.g. Blue and white, dark theme — or leave blank and let the AI decide."
        defaultValue={state.values?.colors}
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
          Generated instantly — nothing sent to an AI model until you paste it.
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
      {pending ? "Generating…" : "Generate My Website Prompt"}
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
  type = "text",
  hint,
  error,
  textarea,
  required,
  defaultValue,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  hint?: string;
  error?: string;
  textarea?: boolean;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const shared = `mt-2.5 w-full rounded-xl border bg-paper px-4 text-[1.0625rem] text-ink transition-colors placeholder:text-sand-ink hover:border-ink focus:border-ink ${
    error ? "border-spark" : "border-line"
  }`;

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

      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={3}
          required={required}
          defaultValue={defaultValue}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={`${shared} resize-y py-3.5 leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={`${shared} min-h-12`}
        />
      )}

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
