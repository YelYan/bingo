"use client";

import { useId, useState } from "react";
import { plans } from "@/lib/pricing";
import { Spark } from "./logo";
import { ButtonLink, Tag } from "./ui";

type Cycle = "monthly" | "annual";

export function PricingTable() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const groupId = useId();

  return (
    <div>
      {/* ---- billing toggle ---- */}
      <div className="flex justify-center">
        <div
          role="radiogroup"
          aria-label="Billing cycle"
          className="inline-flex items-center gap-1 rounded-full border border-line bg-paper-2 p-1"
        >
          {(["monthly", "annual"] as const).map((option) => {
            const active = cycle === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setCycle(option)}
                className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {option === "monthly" ? "Monthly" : "Annual"}
                {option === "annual" ? (
                  <span
                    className={`text-[0.6875rem] font-bold tracking-wide ${
                      active ? "text-spark" : "text-spark-deep"
                    }`}
                  >
                    −2 months
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-ink-soft">
        {cycle === "monthly"
          ? "Billed monthly. Cancel with 30 days' notice."
          : "Billed once a year. Two months free, same terms."}
      </p>

      {/* ---- plans ---- */}
      <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = cycle === "monthly" ? plan.monthly : plan.annualMonthly;
          const headingId = `${groupId}-${plan.slug}`;

          return (
            <section
              key={plan.slug}
              aria-labelledby={headingId}
              className={`relative flex h-full flex-col rounded-2xl border p-7 sm:p-8 ${
                plan.featured
                  ? "border-spark bg-ink text-paper lg:-mt-4 lg:pb-12"
                  : "border-line bg-paper"
              }`}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-8">
                  <Tag tone="spark">Most chosen</Tag>
                </span>
              ) : null}

              <h3
                id={headingId}
                className={`text-[1.75rem] ${plan.featured ? "text-paper" : "text-ink"}`}
              >
                {plan.name}
              </h3>
              <p
                className={`mt-2.5 text-sm leading-relaxed ${
                  plan.featured ? "text-sand-soft" : "text-ink-soft"
                }`}
              >
                {plan.fit}
              </p>

              <p className="mt-8 flex items-baseline gap-2">
                <span
                  className={`tabular font-display text-[3.25rem] leading-none font-extrabold tracking-[-0.055em] ${
                    plan.featured ? "text-paper" : "text-ink"
                  }`}
                >
                  ${price}
                </span>
                <span
                  className={`text-sm ${plan.featured ? "text-sand" : "text-ink-soft"}`}
                >
                  / month
                </span>
              </p>
              <p
                className={`mt-2 text-xs ${plan.featured ? "text-sand" : "text-sand-ink"}`}
              >
                {plan.setup}
              </p>

              <ButtonLink
                href="/contact"
                tone={plan.featured ? "spark" : "ghost"}
                className="mt-8 w-full"
              >
                Start with {plan.name}
              </ButtonLink>

              <div className="mt-9 flex-1">
                <h4
                  className={`text-[0.6875rem] font-semibold tracking-[0.2em] uppercase ${
                    plan.featured ? "text-sand" : "text-sand-ink"
                  }`}
                >
                  {plan.inherits
                    ? `Everything in ${plan.inherits}, plus`
                    : "What's included"}
                </h4>
                <ul className="mt-5 space-y-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3.5">
                      <Spark className="mt-2 h-2.5 w-[0.4rem] shrink-0" />
                      <span
                        className={`text-[0.9375rem] leading-snug ${
                          plan.featured ? "text-sand-soft" : "text-ink-soft"
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
