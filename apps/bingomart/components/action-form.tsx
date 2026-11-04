"use client";

import { createContext, startTransition, useActionState, useContext, useEffect, useRef, type FormEvent, type ReactNode } from "react";

export type FormState = { error?: string } | null;
export type FormAction = (state: FormState, formData: FormData) => Promise<FormState>;

const Pending = createContext(false);
export const PendingProvider = Pending.Provider;

export function Submit({ children, className = "btn-primary" }: { children: ReactNode; className?: string }) {
  const pending = useContext(Pending);
  return (
    <button type="submit" disabled={pending} className={`btn ${className}`}>
      {pending ? "ခဏစောင့်ပါ…" : children}
    </button>
  );
}

/**
 * Submits by hand because React clears a form after a plain `action` runs:
 * one dropped connection would wipe everything the person typed.
 */
export function keepValuesOnSubmit(formAction: (data: FormData) => void) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  };
}

/** A server-action form that shows the result beside it. */
export function ActionForm({
  action,
  children,
  className = "",
  clearOnSuccess = false,
  savedText,
}: {
  action: FormAction;
  children: ReactNode;
  className?: string;
  clearOnSuccess?: boolean;
  savedText?: string;
}) {
  const [state, formAction, pending] = useActionState<{ error?: string; saved?: number } | null, FormData>(
    async (previous, data) => (await action(previous, data)) ?? { saved: Date.now() },
    null,
  );
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (clearOnSuccess && state?.saved) form.current?.reset();
  }, [state, clearOnSuccess]);

  return (
    <form ref={form} action={formAction} onSubmit={keepValuesOnSubmit(formAction)} className={className}>
      <Pending.Provider value={pending}>{children}</Pending.Provider>
      {state?.error ? (
        <p role="alert" className="mt-3 rounded-xl bg-danger-wash px-3 py-2 text-sm font-semibold text-danger">
          {state.error}
        </p>
      ) : null}
      {state?.saved && savedText ? <p role="status" className="mt-2 text-sm font-semibold text-teal">{savedText}</p> : null}
    </form>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-[0.8125rem] text-soft">{hint}</span> : null}
    </label>
  );
}
