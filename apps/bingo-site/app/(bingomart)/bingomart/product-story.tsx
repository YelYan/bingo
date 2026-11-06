"use client";

import { useEffect, useState } from "react";
import type { StoryCopy, featureIds } from "./copy";

type Id = (typeof featureIds)[number];
type Step = { id: Id; title: string; detail: string };

const STEP_MS = 6500;

// Each part of a mockup rises in after the one before it. Index-based, so no per-element timing to keep in sync.
function rise(i: number) {
  return {
    className: "motion-safe:animate-[mart-rise_.5s_ease-out_both]",
    style: { animationDelay: `${150 + i * 220}ms` },
  };
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-[22rem] rounded-[1.25rem] bg-white p-4 text-mart-text shadow-[0_24px_50px_-24px_rgba(10,43,39,0.6)] ${className}`}>
      {children}
    </div>
  );
}

function Shop({ s }: { s: StoryCopy["shop"] }) {
  const swatches = ["bg-mart-ink", "bg-[#e9dcc4]", "bg-[#c9473d]"];
  return (
    <Card>
      <div {...rise(0)} className={`${rise(0).className} flex items-center gap-2 rounded-full bg-mart-paper px-3 py-1.5 text-xs text-mart-soft`}>
        <span className="h-2 w-2 rounded-full bg-mart-teal" />
        {s.url}
      </div>
      <p {...rise(1)} className={`${rise(1).className} mt-3 font-display text-lg font-bold text-mart-ink`}>{s.name}</p>
      <ul className="mt-3 grid grid-cols-3 gap-2">
        {s.items.map(([name, price], i) => (
          <li key={name} {...rise(i + 2)} className={`${rise(i + 2).className} rounded-xl bg-mart-paper p-2`}>
            <span className={`block aspect-[4/5] rounded-lg ${swatches[i]}`} />
            <span className="mt-1.5 block truncate text-[0.6875rem] font-semibold text-mart-ink">{name}</span>
            <span className="block text-[0.6875rem] text-mart-soft">{price}</span>
            <span className="mt-1.5 block rounded-full bg-mart-teal py-1 text-center text-[0.6875rem] font-semibold text-white">
              {s.add}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Chat({ s }: { s: StoryCopy["chat"] }) {
  const bubble = "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug";
  return (
    <Card className="space-y-2.5">
      <p {...rise(0)} className={`${rise(0).className} ${bubble} rounded-bl-md bg-mart-paper`}>{s.shopper1}</p>
      <div {...rise(1)} className={`${rise(1).className} ml-auto max-w-[85%]`}>
        <span className="mb-1 block text-right text-[0.6875rem] font-semibold text-mart-teal">{s.aiTag}</span>
        <p className={`${bubble} ml-auto max-w-none rounded-br-md bg-mart-teal text-white`}>{s.ai1}</p>
      </div>
      <p {...rise(2)} className={`${rise(2).className} ${bubble} rounded-bl-md bg-mart-paper`}>{s.shopper2}</p>
      <p {...rise(3)} className={`${rise(3).className} rounded-xl border border-dashed border-mart-teal px-3 py-2 text-center text-xs font-semibold text-mart-teal`}>
        {s.created}
      </p>
    </Card>
  );
}

function Receipt({ s }: { s: StoryCopy["receipt"] }) {
  return (
    <Card>
      <div className="flex gap-3">
        <div {...rise(0)} className={`${rise(0).className} w-20 shrink-0 rounded-lg bg-mart-paper p-2`}>
          <span className="block h-2 w-10 rounded bg-mart-line" />
          <span className="mt-2 block font-display text-sm font-bold text-mart-ink">45,000</span>
          <span className="mt-2 block h-1.5 rounded bg-mart-line" />
          <span className="mt-1 block h-1.5 w-3/4 rounded bg-mart-line" />
          <span className="mt-2 block text-[0.625rem] text-mart-soft">{s.slip}</span>
        </div>
        <dl className="min-w-0 flex-1 space-y-1.5 text-xs">
          {s.fields.map(([k, v], i) => (
            <div key={k} {...rise(i + 1)} className={`${rise(i + 1).className} flex justify-between gap-2`}>
              <dt className="text-mart-soft">{k}</dt>
              <dd className={`font-semibold ${i === 2 ? "text-[#b3261e]" : "text-mart-ink"}`}>
                {v} {i === 2 ? "!" : "✓"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <p {...rise(4)} className={`${rise(4).className} mt-3 rounded-xl bg-[#fdecea] px-3 py-2 text-xs font-semibold text-[#8c1d18]`}>
        {s.dup}
      </p>
      <div {...rise(5)} className={`${rise(5).className} mt-3 flex gap-2`}>
        <span className="flex-1 rounded-full border border-mart-line py-1.5 text-center text-xs font-semibold">{s.reject}</span>
        <span className="flex-1 rounded-full bg-mart-teal py-1.5 text-center text-xs font-semibold text-white">{s.approve}</span>
      </div>
    </Card>
  );
}

function Delivery({ s }: { s: StoryCopy["delivery"] }) {
  const reached = 3; // steps done or current, in the example
  return (
    <Card>
      <p {...rise(0)} className={`${rise(0).className} font-display font-bold text-mart-ink`}>{s.order}</p>
      <ol className="mt-3">
        {s.steps.map((step, i) => (
          <li key={step} {...rise(i + 1)} className={`${rise(i + 1).className} flex gap-3`}>
            <span className="flex flex-col items-center">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.625rem] font-bold ${
                  i < reached - 1
                    ? "bg-mart-teal text-white"
                    : i === reached - 1
                      ? "bg-mart-saffron text-mart-ink ring-4 ring-mart-saffron/30"
                      : "bg-mart-line text-mart-soft"
                }`}
              >
                {i < reached - 1 ? "✓" : i + 1}
              </span>
              {i < s.steps.length - 1 ? (
                <span className={`my-0.5 w-0.5 flex-1 ${i < reached - 1 ? "bg-mart-teal" : "bg-mart-line"}`} />
              ) : null}
            </span>
            <span className={`pb-3 text-sm ${i < reached ? "font-semibold text-mart-ink" : "text-mart-soft"}`}>{step}</span>
          </li>
        ))}
      </ol>
      <p {...rise(5)} className={`${rise(5).className} rounded-xl bg-[#ddf0ea] px-3 py-2 text-center text-xs font-bold text-[#0a5547]`}>
        {s.eta}
      </p>
    </Card>
  );
}

function Pos({ s }: { s: StoryCopy["pos"] }) {
  return (
    <Card>
      <div {...rise(0)} className={`${rise(0).className} flex items-center justify-between gap-2`}>
        <span className="font-display font-bold text-mart-ink">{s.title}</span>
        <span className="rounded-full bg-[#fbebc8] px-2.5 py-0.5 text-[0.6875rem] font-bold text-[#5a3b05]">{s.offline}</span>
      </div>
      <ul className="mt-3 space-y-1.5 text-sm">
        {s.lines.map(([item, price], i) => (
          <li key={item} {...rise(i + 1)} className={`${rise(i + 1).className} flex justify-between gap-2`}>
            <span>{item}</span>
            <span className="font-semibold">{price}</span>
          </li>
        ))}
      </ul>
      <div {...rise(3)} className={`${rise(3).className} mt-3 flex justify-between border-t border-mart-line pt-3 font-display font-bold text-mart-ink`}>
        <span>{s.total[0]}</span>
        <span>{s.total[1]}</span>
      </div>
      <p {...rise(4)} className={`${rise(4).className} mt-2 text-xs text-mart-soft`}>{s.stock}</p>
      <span {...rise(5)} className={`${rise(5).className} mt-3 block rounded-full bg-mart-teal py-2 text-center text-sm font-semibold text-white`}>
        {s.paid}
      </span>
    </Card>
  );
}

function Reports({ s }: { s: StoryCopy["reports"] }) {
  const heights = [38, 52, 44, 70, 58, 92, 76];
  return (
    <Card>
      <div {...rise(0)} className={`${rise(0).className} flex items-end justify-between gap-2`}>
        <span className="text-sm text-mart-soft">{s.title}</span>
        <span className="text-right">
          <span className="block text-[0.6875rem] text-mart-soft">{s.profit[0]}</span>
          <span className="block font-display text-xl font-bold text-mart-ink">{s.profit[1]}</span>
        </span>
      </div>
      <div className="mt-3 flex h-28 items-end gap-1.5" aria-hidden="true">
        {heights.map((h, i) => (
          <span key={i} className="flex flex-1 flex-col items-center gap-1">
            <span
              className="w-full origin-bottom rounded-t-md bg-mart-teal motion-safe:animate-[mart-rise_.6s_ease-out_both]"
              style={{ height: `${h}%`, animationDelay: `${300 + i * 90}ms`, opacity: i === 5 ? 1 : 0.55 }}
            />
            <span className="max-w-full truncate text-[0.5625rem] text-mart-soft">{s.days[i]}</span>
          </span>
        ))}
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
        {[s.best, s.slow].map(([k, v], i) => (
          <div key={k} {...rise(i + 4)} className={`${rise(i + 4).className} rounded-xl bg-mart-paper px-3 py-2`}>
            <dt className="text-mart-soft">{k}</dt>
            <dd className="font-semibold text-mart-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function Stage({ id, story }: { id: Id; story: StoryCopy }) {
  const screen = {
    shop: <Shop s={story.shop} />,
    "chat-orders": <Chat s={story.chat} />,
    receipts: <Receipt s={story.receipt} />,
    delivery: <Delivery s={story.delivery} />,
    pos: <Pos s={story.pos} />,
    reports: <Reports s={story.reports} />,
  }[id];
  return (
    <div className="relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-[1.75rem] bg-[radial-gradient(120%_90%_at_80%_0%,#1c6b60_0%,var(--color-mart-ink)_55%,var(--color-mart-deep)_100%)] p-6 sm:p-10">
      <span className="absolute top-4 right-5 text-[0.75rem] text-mart-mist">{story.example}</span>
      {/* key: a new step re-mounts the screen, so its parts rise in again. */}
      <div key={id} className="flex w-full justify-center">
        {screen}
      </div>
    </div>
  );
}

export function ProductStory({ steps, story }: { steps: Step[]; story: StoryCopy }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    // Auto-advance only on wide screens when motion is welcome: on a phone the open step sits in the
    // reading flow, and moving it would jump the page. A menu link or a tap stops it for good.
    setAuto(window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches);
    const fromHash = () => {
      const i = steps.findIndex((s) => `#${s.id}` === window.location.hash);
      if (i >= 0) {
        setActive(i);
        setAuto(false);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [steps]);

  const choose = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-start">
      <ol className="lg:sticky lg:top-28">
        {steps.map((step, i) => {
          const isActive = i === active;
          return (
            <li key={step.id} id={step.id} className="scroll-mt-28 border-b border-mart-line">
              <button
                type="button"
                onClick={() => choose(i)}
                aria-expanded={isActive}
                className="block w-full cursor-pointer py-4 text-left"
              >
                <span className={`block font-display text-xl font-bold transition-colors ${isActive ? "text-mart-ink" : "text-mart-soft hover:text-mart-ink"}`}>
                  {step.title}
                </span>
                {isActive ? <span className="mt-1.5 block leading-relaxed text-mart-soft">{step.detail}</span> : null}
              </button>
              <span className="relative -mb-px block h-0.5 overflow-hidden" aria-hidden="true">
                {isActive ? (
                  <span
                    key={`${active}-${auto}`}
                    onAnimationEnd={() => setActive((a) => (a + 1) % steps.length)}
                    className={`absolute inset-0 origin-left bg-mart-teal ${auto ? "animate-[mart-progress_linear_both]" : ""}`}
                    style={auto ? { animationDuration: `${STEP_MS}ms` } : undefined}
                  />
                ) : null}
              </span>
              {isActive ? (
                <div className="pb-6 lg:hidden">
                  <Stage id={step.id} story={story} />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="hidden lg:block">
        <Stage id={steps[active].id} story={story} />
      </div>
    </div>
  );
}
