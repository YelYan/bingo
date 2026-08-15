"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A single orange dot trailing the pointer — the aha, following you around.
 * Desktop pointers only, disabled under reduced-motion, and it never
 * intercepts a click. Position is written straight to the transform in a
 * rAF loop, so it costs one composited layer and no React re-renders.
 */
export function CursorSpark() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const node = dot.current;
    if (!node) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      node.style.opacity = "1";

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role='button'], input, textarea, select, summary",
      );
      node.dataset.on = interactive ? "true" : "false";
    };

    const onLeave = () => {
      node.style.opacity = "0";
    };

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="spark-cursor opacity-0 data-[on=true]:h-9 data-[on=true]:w-9 data-[on=true]:opacity-60"
    />
  );
}
