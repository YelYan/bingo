"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { submitContact } from "@/lib/actions";
import { initialContactState } from "@/lib/contact-state";
import { Spark } from "./logo";
import { Arrow } from "./ui";

const budgets = [
  "Not sure yet",
  "Spark — $279/mo",
  "Signal — $549/mo",
  "Studio — $949+/mo",
  "One-off project",
];

const interests = ["Website", "Branding", "SEO"];

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialContactState);
  const ids = useId();

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-spark/40 bg-spark-wash p-8 sm:p-10"
      >
        <Spark className="h-3.5 w-2" />
        <h2 className="mt-5 text-3xl text-ink">Bingo.</h2>
        <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
          {state.message}
        </p>
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

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${ids}-name`}
          name="name"
          label="Your name"
          autoComplete="name"
          defaultValue={state.values?.name}
          error={state.errors?.name}
          required
        />
        <Field
          id={`${ids}-email`}
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          defaultValue={state.values?.email}
          error={state.errors?.email}
          required
        />
      </div>

      <Field
        id={`${ids}-company`}
        name="company"
        label="Company or project"
        autoComplete="organization"
        defaultValue={state.values?.company}
        hint="Optional — a link works fine too."
      />

      <fieldset>
        <legend className="text-sm font-semibold text-ink">
          What do you need?
        </legend>
        <p className="mt-1 text-sm text-ink-soft">Pick as many as apply.</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {interests.map((interest) => (
            <label
              key={interest}
              className="group inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-line px-5 text-sm font-medium text-ink-soft transition-colors has-checked:border-ink has-checked:bg-ink has-checked:text-paper hover:border-ink hover:text-ink"
            >
              <input
                type="checkbox"
                name="interest"
                value={interest}
                className="sr-only"
              />
              {interest}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor={`${ids}-budget`}
          className="block text-sm font-semibold text-ink"
        >
          Rough budget
        </label>
        <select
          id={`${ids}-budget`}
          name="budget"
          defaultValue={budgets[0]}
          className="mt-2.5 min-h-12 w-full cursor-pointer rounded-xl border border-line bg-paper px-4 text-[1.0625rem] text-ink transition-colors hover:border-ink focus:border-ink"
        >
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <Field
        id={`${ids}-brief`}
        name="brief"
        label="What isn't working?"
        textarea
        defaultValue={state.values?.brief}
        error={state.errors?.brief}
        hint="Three sentences is plenty. The frustration is the useful part."
        required
      />

      {/* honeypot — hidden from people, irresistible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor={`${ids}-website`}>Website</label>
        <input
          id={`${ids}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <SubmitButton />
        <p className="text-sm text-ink-soft">
          No newsletter, no CRM drip. One reply from one person.
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
      {pending ? "Sending…" : "Send it"}
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
      {/* Visible label, always — placeholders are not labels */}
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
          rows={5}
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

      {/* Error sits with the field it belongs to, not in a summary at the top */}
      {error ? (
        <p id={errorId} className="mt-2 text-sm font-medium text-spark-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
