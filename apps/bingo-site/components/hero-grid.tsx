"use client";

import { useEffect, useRef, useState } from "react";

/** Same 88px module the static .blueprint background uses, so lines align. */
const CELL = 88;

/** Covers a laptop before the first measurement; surplus cells are clipped. */
const SEED = 20 * 12;

/**
 * The blueprint grid, but it reacts. As the pointer crosses the hero, the
 * square under it pops up in brand orange and its neighbours ghost in behind.
 *
 * Three deliberate constraints:
 *  - Cells overlapping copy never light up. A solid #e2622b square behind the
 *    lead paragraph would take that text from 5.7:1 to about 2.3:1, so the
 *    effect is confined to negative space. Text is mapped line by line, not
 *    by its box, so the ragged right of the headline stays live.
 *  - Column count is read back from the resolved grid and re-read whenever the
 *    field's dimensions change. Caching it at mount silently misaligns every
 *    index the moment the viewport differs from what was measured.
 *  - The layer is pointer-events:none and listens on the parent section, so
 *    squares light up over the headline without ever stealing a click.
 */
export function HeroGrid() {
  const field = useRef<HTMLDivElement>(null);
  const [pool, setPool] = useState(SEED);

  useEffect(() => {
    const node = field.current;
    const host = node?.parentElement;
    if (!node || !host) return;

    /* Touch pointers have no hover to speak of, so they get the static grid.
       Checked per-move rather than once at mount: hybrid machines gain and
       lose a fine pointer when a keyboard is docked or a stylus wakes up. */
    const fine = window.matchMedia("(pointer: fine)");

    const blocked = new Set<number>();
    let box = node.getBoundingClientRect();
    let cols = 1;
    let rows = 1;
    let lastW = -1;
    let lastH = -1;

    const blockRect = (r: DOMRect) => {
      if (r.width === 0 || r.height === 0) return;
      const c0 = Math.max(0, Math.floor((r.left - box.left) / CELL));
      const c1 = Math.min(cols - 1, Math.floor((r.right - box.left) / CELL));
      const r0 = Math.max(0, Math.floor((r.top - box.top) / CELL));
      const r1 = Math.min(rows - 1, Math.floor((r.bottom - box.top) / CELL));
      for (let row = r0; row <= r1; row++) {
        for (let col = c0; col <= c1; col++) blocked.add(row * cols + col);
      }
    };

    const remap = () => {
      box = node.getBoundingClientRect();
      const tracks = getComputedStyle(node).gridTemplateColumns;
      cols = tracks === "none" ? 1 : tracks.split(" ").filter(Boolean).length;
      rows = Math.ceil(node.children.length / cols);

      blocked.clear();

      /* Text is measured line by line via a Range. Blocking the whole h1 box
         would discard the empty half of every ragged line — most of the room
         the effect actually has to play in. */
      for (const el of host.querySelectorAll<HTMLElement>("h1, h2, h3, p")) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const lines = range.getClientRects();
        if (lines.length === 0) blockRect(el.getBoundingClientRect());
        for (const line of lines) blockRect(line as DOMRect);
      }

      /* Everything else keeps its full box: these carry real backgrounds or
         are interactive, so a square behind them is never wanted. */
      for (const el of host.querySelectorAll<HTMLElement>(
        "dl, ol, ul, a, button, [data-grid-avoid]",
      )) {
        blockRect(el.getBoundingClientRect());
      }

      /* The header is fixed and fully transparent at the top of the page, so
         a square lighting up under it reads as a mistake rather than an
         effect. It lives outside this section, hence the separate lookup. */
      const header = document.querySelector("header");
      if (header) blockRect(header.getBoundingClientRect());
    };

    /* Re-read only when the field's dimensions actually changed. Called on
       hover entry rather than per-move so it never forces a reflow mid-sweep. */
    const ensure = () => {
      const w = node.offsetWidth;
      const h = node.offsetHeight;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;

      const need =
        (Math.ceil(w / CELL) + 1) * (Math.ceil(Math.max(h, w * 0.5) / CELL) + 1);
      // Grow-only: a short measurement must never strip the hero of cells.
      setPool((prev) => (need > prev ? need : prev));
      remap();
    };
    ensure();

    let lit: HTMLElement[] = [];
    let current = -1;

    const clear = () => {
      for (const el of lit) el.removeAttribute("data-lit");
      lit = [];
    };

    const light = (index: number) => {
      if (index === current) return;
      current = index;
      clear();
      if (index < 0 || blocked.has(index)) return;

      const main = node.children[index] as HTMLElement | undefined;
      if (!main) return;
      main.setAttribute("data-lit", "on");
      lit.push(main);

      const col = index % cols;
      const row = (index - col) / cols;
      const around: [number, number][] = [
        [col - 1, row],
        [col + 1, row],
        [col, row - 1],
        [col, row + 1],
      ];
      for (const [c, r] of around) {
        if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
        const i = r * cols + c;
        if (blocked.has(i)) continue;
        const el = node.children[i] as HTMLElement | undefined;
        if (!el) continue;
        el.setAttribute("data-lit", "near");
        lit.push(el);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (!fine.matches) return;
      if (current === -1) ensure(); // first move of a hover session
      const col = Math.floor((e.clientX - box.left) / CELL);
      const row = Math.floor((e.clientY - box.top) / CELL);
      const inside = col >= 0 && row >= 0 && col < cols && row < rows;
      light(inside ? row * cols + col : -1);
    };

    const onLeave = () => {
      current = -1;
      clear();
    };

    // Scrolling only shifts the origin; the copy map itself stays valid.
    const onScroll = () => {
      box = node.getBoundingClientRect();
    };

    const onResize = () => {
      lastW = -1;
      ensure();
    };

    host.addEventListener("pointerenter", ensure);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(ensure);
    ro.observe(node);

    return () => {
      host.removeEventListener("pointerenter", ensure);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      clear();
    };
  }, [pool]);

  return (
    <div ref={field} aria-hidden="true" className="blueprint grid-field">
      {Array.from({ length: pool }, (_, i) => (
        <span key={i} className="grid-cell" />
      ))}
    </div>
  );
}
