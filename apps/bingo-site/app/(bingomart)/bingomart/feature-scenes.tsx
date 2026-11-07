"use client";

import { useEffect, useState } from "react";
import type { SceneCopy, Slug } from "./features";

// A looping, video-like walk-through built from HTML, the way Foundable shows its product: sharp at any
// size, a few KB instead of megabytes on weak internet, and every word translatable.

const FRAME_MS = 2600;
const FRAMES: Record<Slug, number> = {
  "web-shop": 5,
  "chat-orders": 6,
  "receipt-checks": 5,
  "counter-sales": 6,
  "delivery-tracking": 5,
  "profit-reports": 5,
};

// Parts appear and stay; the transition makes each frame read as motion, not a slide change.
function on(visible: boolean) {
  return `transition-all duration-500 ease-out motion-reduce:transition-none ${
    visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
  }`;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`w-full max-w-[23rem] rounded-[1.25rem] bg-white p-4 text-mart-text shadow-[0_30px_60px_-28px_rgba(10,43,39,0.7)] ${className}`}
    >
      {children}
    </div>
  );
}

const bubble = "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug";

function WebShop({ f, s }: { f: number; s: SceneCopy["web-shop"] }) {
  const swatches = ["bg-mart-ink", "bg-[#e9dcc4]", "bg-[#c9473d]"];
  return (
    <div className="relative w-full max-w-[23rem]">
      <div className={`absolute inset-x-4 -top-4 z-10 rounded-2xl bg-mart-saffron px-4 py-2.5 text-sm font-bold text-mart-ink shadow-lg ${on(f >= 4)}`}>
        {s.newOrder}
      </div>
      <Card>
        <div className="flex items-center gap-2 rounded-full bg-mart-paper px-3 py-1.5 text-xs text-mart-soft">
          <span className="h-2 w-2 rounded-full bg-mart-teal" />
          {s.url}
        </div>
        {f === 0 ? (
          <div className="py-6 text-center motion-safe:animate-[mart-rise_.5s_ease-out_both]">
            <p className="font-display font-bold text-mart-ink">{s.pick}</p>
            <div className="mt-4 flex justify-center gap-2">
              {s.types.map((t, i) => (
                <span
                  key={t}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    i === 0 ? "bg-mart-teal text-white ring-4 ring-mart-teal/20" : "bg-mart-paper text-mart-soft"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : f === 1 ? (
          <div className="py-4">
            <p className="text-center text-xs font-semibold text-mart-teal">{s.building}</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="aspect-[4/5] rounded-lg bg-mart-paper motion-safe:animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <div className="motion-safe:animate-[mart-rise_.5s_ease-out_both]">
            <p className="mt-3 font-display text-lg font-bold text-mart-ink">{s.shopName}</p>
            <ul className="mt-3 grid grid-cols-3 gap-2">
              {s.items.map(([name, price], i) => (
                <li key={name} className="rounded-xl bg-mart-paper p-2">
                  <span className={`block aspect-[4/5] rounded-lg ${swatches[i]}`} />
                  <span className="mt-1.5 block truncate text-[0.6875rem] font-semibold text-mart-ink">{name}</span>
                  <span className="block text-[0.6875rem] text-mart-soft">{price}</span>
                  <span
                    className={`mt-1.5 block rounded-full py-1 text-center text-[0.6875rem] font-semibold text-white transition-colors ${
                      f >= 4 && i === 0 ? "bg-mart-saffron text-mart-ink!" : "bg-mart-teal"
                    }`}
                  >
                    {s.add}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
      <div className={`mt-3 flex items-center justify-between gap-2 rounded-2xl bg-white/95 px-4 py-2.5 text-sm shadow-lg ${on(f === 3)}`}>
        <span className="font-semibold text-mart-ink">✓ {s.copied}</span>
        <span className="rounded-full bg-[#2aa3e0] px-3 py-1 text-xs font-semibold text-white">{s.share}</span>
      </div>
    </div>
  );
}

function ChatOrders({ f, s }: { f: number; s: SceneCopy["chat-orders"] }) {
  return (
    <Card className="space-y-2.5">
      <div className="flex items-center justify-between border-b border-mart-line pb-2 text-xs text-mart-soft">
        <span className="font-semibold text-mart-ink">Telegram</span>
        <span className="font-display text-base font-bold text-mart-ink">☾ {s.time}</span>
      </div>
      <p className={`${bubble} rounded-bl-md bg-mart-paper ${on(f >= 0)}`}>{s.shopper1}</p>
      {f === 1 ? (
        <p className="ml-auto w-fit rounded-2xl rounded-br-md bg-[#ddf0ea] px-3.5 py-2 text-xs font-semibold text-mart-teal motion-safe:animate-pulse">
          {s.typing}
        </p>
      ) : (
        <div className={`ml-auto max-w-[85%] ${on(f >= 2)}`}>
          <span className="mb-1 block text-right text-[0.6875rem] font-semibold text-mart-teal">{s.aiTag}</span>
          <p className={`${bubble} ml-auto max-w-none rounded-br-md bg-mart-teal text-white`}>{s.ai1}</p>
        </div>
      )}
      <p className={`${bubble} rounded-bl-md bg-mart-paper ${on(f >= 3)}`}>{s.shopper2}</p>
      <p className={`rounded-xl border border-dashed border-mart-teal px-3 py-2 text-center text-xs font-semibold text-mart-teal ${on(f >= 4)}`}>
        ✓ {s.created}
      </p>
      <p className={`rounded-xl bg-mart-saffron px-3 py-2 text-xs font-bold text-mart-ink ${on(f >= 5)}`}>{s.handover}</p>
    </Card>
  );
}

function ReceiptChecks({ f, s }: { f: number; s: SceneCopy["receipt-checks"] }) {
  return (
    <Card>
      <div className="flex gap-3">
        <div className={`relative w-24 shrink-0 overflow-hidden rounded-lg bg-mart-paper p-2 ${on(f >= 0)}`}>
          <span className="block h-2 w-12 rounded bg-mart-line" />
          <span className="mt-2 block font-display text-base font-bold text-mart-ink">45,000</span>
          <span className="mt-2 block h-1.5 rounded bg-mart-line" />
          <span className="mt-1 block h-1.5 w-3/4 rounded bg-mart-line" />
          <span className="mt-1 block h-1.5 w-1/2 rounded bg-mart-line" />
          <span className="mt-2 block text-[0.625rem] text-mart-soft">{s.slip}</span>
          {f === 1 ? (
            <span className="absolute inset-x-0 top-0 h-1 bg-mart-teal shadow-[0_0_12px_2px_rgba(14,107,91,0.6)] motion-safe:animate-[mart-scan_1.2s_ease-in-out_infinite]" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-xs font-semibold text-mart-teal ${on(f === 1)}`}>{s.scanning}</p>
          <dl className="space-y-1.5 text-xs">
            {s.fields.map(([k, v], i) => (
              <div key={k} className={`flex justify-between gap-2 ${on(f >= 2)}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <dt className="text-mart-soft">{k}</dt>
                <dd className={`font-semibold ${i === 2 && f >= 3 && f < 4 ? "text-[#b3261e]" : "text-mart-ink"}`}>
                  {v} {i === 2 && f >= 3 && f < 4 ? "!" : "✓"}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {f === 3 ? (
        <div className="motion-safe:animate-[mart-rise_.4s_ease-out_both]">
          <p className="mt-3 rounded-xl bg-[#fdecea] px-3 py-2 text-xs font-semibold text-[#8c1d18]">{s.dup}</p>
          <div className="mt-3 flex gap-2">
            <span className="flex-1 rounded-full bg-[#b3261e] py-1.5 text-center text-xs font-semibold text-white">{s.reject}</span>
            <span className="flex-1 rounded-full border border-mart-line py-1.5 text-center text-xs font-semibold">{s.approve}</span>
          </div>
        </div>
      ) : (
        <p className={`mt-3 rounded-xl bg-[#ddf0ea] px-3 py-2 text-center text-xs font-bold text-[#0a5547] ${on(f >= 4)}`}>
          ✓ {s.approved}
        </p>
      )}
    </Card>
  );
}

function CounterSales({ f, s }: { f: number; s: SceneCopy["counter-sales"] }) {
  const offline = f >= 1 && f < 4;
  return (
    <Card>
      <div className="flex items-center justify-between gap-2">
        <span className="font-display font-bold text-mart-ink">{s.title}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold transition-colors duration-500 ${
            offline ? "bg-[#fbebc8] text-[#5a3b05]" : f >= 4 ? "bg-[#ddf0ea] text-[#0a5547]" : "bg-mart-paper text-mart-soft"
          }`}
        >
          {offline ? `⦸ ${s.offline}` : f >= 5 ? `✓ ${s.synced}` : f >= 4 ? s.online : "●"}
        </span>
      </div>
      <ul className="mt-3 space-y-1.5 text-sm">
        {s.lines.map(([item, price]) => (
          <li key={item} className="flex justify-between gap-2">
            <span>{item}</span>
            <span className="font-semibold">{price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-between border-t border-mart-line pt-3 font-display font-bold text-mart-ink">
        <span>{s.total[0]}</span>
        <span>{s.total[1]}</span>
      </div>
      <p className="mt-2 text-xs text-mart-soft">
        <span key={f >= 3 ? "after" : "before"} className="inline-block motion-safe:animate-[mart-rise_.4s_ease-out_both]">
          {f >= 3 ? s.stockAfter : s.stockBefore}
        </span>
      </p>
      <span
        className={`mt-3 block rounded-full py-2 text-center text-sm font-semibold transition-colors duration-500 ${
          f >= 2 ? "bg-mart-ink text-mart-paper" : "bg-mart-teal text-white"
        }`}
      >
        {f >= 2 ? `✓ ${s.paid} · ${s.saved}` : s.paid}
      </span>
    </Card>
  );
}

function DeliveryTracking({ f, s }: { f: number; s: SceneCopy["delivery-tracking"] }) {
  const reached = Math.min(Math.max(f - 1, 1), 3); // steps done or current
  return (
    <div className="w-full max-w-[23rem] space-y-3">
      <div className="space-y-2">
        <p className={`${bubble} rounded-bl-md bg-white ${on(f >= 0)}`}>{s.chatQ}</p>
        <p className={`${bubble} ml-auto w-fit rounded-br-md bg-mart-teal text-white ${on(f >= 1)}`}>{s.chatA} →</p>
      </div>
      <Card className={on(f >= 2)}>
        <p className="font-display font-bold text-mart-ink">{s.order}</p>
        <ol className="mt-3">
          {s.steps.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="flex flex-col items-center">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.625rem] font-bold transition-colors duration-500 ${
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
                  <span className={`my-0.5 w-0.5 flex-1 transition-colors duration-500 ${i < reached - 1 ? "bg-mart-teal" : "bg-mart-line"}`} />
                ) : null}
              </span>
              <span className={`pb-3 text-sm ${i < reached ? "font-semibold text-mart-ink" : "text-mart-soft"}`}>{step}</span>
            </li>
          ))}
        </ol>
        <p className={`rounded-xl bg-[#ddf0ea] px-3 py-2 text-center text-xs font-bold text-[#0a5547] ${on(f >= 4)}`}>{s.eta}</p>
      </Card>
    </div>
  );
}

function ProfitReports({ f, s }: { f: number; s: SceneCopy["profit-reports"] }) {
  const heights = [38, 52, 44, 70, 58, 92, 76];
  return (
    <Card>
      <div className="flex items-end justify-between gap-2">
        <span className="text-sm text-mart-soft">{s.title}</span>
        <span className={`text-right ${on(f >= 1)}`}>
          <span className="block text-[0.6875rem] text-mart-soft">{s.profit[0]}</span>
          <span className="block font-display text-xl font-bold text-mart-ink">{s.profit[1]}</span>
        </span>
      </div>
      <div className="mt-3 flex h-28 items-end gap-1.5" aria-hidden="true">
        {heights.map((h, i) => (
          <span key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span
              className={`w-full rounded-t-md transition-all duration-700 ease-out ${i === 5 && f >= 2 ? "bg-mart-saffron" : "bg-mart-teal"}`}
              style={{ height: `${f >= 0 ? h : 4}%`, transitionDelay: `${i * 70}ms` }}
            />
            <span className="max-w-full truncate text-[0.5625rem] text-mart-soft">{s.days[i]}</span>
          </span>
        ))}
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className={`rounded-xl bg-[#ddf0ea] px-3 py-2 ${on(f >= 2)}`}>
          <dt className="text-[#0a5547]">{s.best[0]}</dt>
          <dd className="font-semibold text-mart-ink">{s.best[1]}</dd>
        </div>
        <div className={`rounded-xl bg-[#fdecea] px-3 py-2 ${on(f >= 3)}`}>
          <dt className="text-[#8c1d18]">{s.slow[0]}</dt>
          <dd className="font-semibold text-mart-ink">{s.slow[1]}</dd>
        </div>
      </dl>
      <p className={`mt-3 rounded-full bg-mart-saffron px-3 py-1.5 text-center text-xs font-bold text-mart-ink ${on(f >= 4)}`}>
        ↻ {s.restock}
      </p>
    </Card>
  );
}

export type PlayerUi = { play: string; pause: string; example: string; label: string };

export function FeatureScene({ slug, scene, ui }: { slug: Slug; scene: SceneCopy[Slug]; ui: PlayerUi }) {
  const total = FRAMES[slug];
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Reduced motion: no autoplay, show the finished picture. Otherwise play on load like a muted video.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setFrame(total - 1);
    else setPlaying(true);
  }, [total]);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => setFrame((x) => (x + 1) % total), frame === total - 1 ? FRAME_MS * 1.6 : FRAME_MS);
    return () => window.clearTimeout(t);
  }, [playing, frame, total]);

  const body = (() => {
    switch (slug) {
      case "web-shop":
        return <WebShop f={frame} s={scene as SceneCopy["web-shop"]} />;
      case "chat-orders":
        return <ChatOrders f={frame} s={scene as SceneCopy["chat-orders"]} />;
      case "receipt-checks":
        return <ReceiptChecks f={frame} s={scene as SceneCopy["receipt-checks"]} />;
      case "counter-sales":
        return <CounterSales f={frame} s={scene as SceneCopy["counter-sales"]} />;
      case "delivery-tracking":
        return <DeliveryTracking f={frame} s={scene as SceneCopy["delivery-tracking"]} />;
      case "profit-reports":
        return <ProfitReports f={frame} s={scene as SceneCopy["profit-reports"]} />;
    }
  })();

  return (
    <figure
      aria-label={ui.label}
      className="relative overflow-hidden rounded-[2rem] bg-[radial-gradient(120%_90%_at_80%_0%,#1c6b60_0%,var(--color-mart-ink)_55%,var(--color-mart-deep)_100%)] p-3 shadow-[0_40px_80px_-40px_rgba(10,43,39,0.8)] sm:p-4"
    >
      {/* Window chrome, like a screen recording. */}
      <div className="flex items-center justify-between px-2 pb-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c941]" />
        </span>
        <span className="text-[0.75rem] text-mart-mist">{ui.example}</span>
      </div>
      <div className="flex min-h-[27rem] items-center justify-center rounded-[1.5rem] bg-white/5 px-4 py-10 sm:min-h-[30rem]">
        {/* zoom, not scale: it reflows, so text stays sharp and the frame grows with it. */}
        <div className="flex w-full justify-center lg:[zoom:1.3]">{body}</div>
      </div>
      <div className="flex items-center gap-3 px-2 pt-3">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-mart-paper transition-colors hover:bg-white/20"
        >
          <span className="sr-only">{playing ? ui.pause : ui.play}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor">
            {playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" /> : <path d="M4 2.5v11l9-5.5z" />}
          </svg>
        </button>
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/15">
              {i < frame ? <span className="absolute inset-0 bg-mart-saffron" /> : null}
              {i === frame ? (
                <span
                  key={`${frame}-${playing}`}
                  className={`absolute inset-0 origin-left bg-mart-saffron ${playing ? "animate-[mart-progress_linear_both]" : ""}`}
                  style={playing ? { animationDuration: `${frame === total - 1 ? FRAME_MS * 1.6 : FRAME_MS}ms` } : undefined}
                />
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
