"use client";

import { useState } from "react";

/** Copies `text` (a path gets this site's address added), or the current page's address. */
export function CopyButton({ text, label }: { text?: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-ghost text-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text ? (text.startsWith("/") ? location.origin + text : text) : location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard can be refused; the text stays visible on the page to copy by hand.
        }
      }}
    >
      {copied ? "ကော်ပီ ကူးပြီး" : label}
    </button>
  );
}
