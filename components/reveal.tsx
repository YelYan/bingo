"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveal without a runtime dependency: one IntersectionObserver,
 * unobserved the moment it fires. CSS in globals.css does the animating,
 * and `prefers-reduced-motion` short-circuits the whole thing there.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.setAttribute("data-reveal", "in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-reveal", "in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);

    /* Safety net: some environments (backgrounded tabs, embedded webviews)
       suspend IntersectionObserver entirely. Never leave content stranded
       at opacity 0 because a callback didn't arrive. */
    const failsafe = window.setTimeout(() => {
      node.setAttribute("data-reveal", "in");
      observer.disconnect();
    }, 2000);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
