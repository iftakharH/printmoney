"use client";

import { useState } from "react";
import Link from "next/link";
import { findTerm } from "@/lib/glossary";

export function GlossaryTip({ term, children }: { term: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const entry = findTerm(term);
  if (!entry) return <>{children ?? term}</>;

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="cursor-help underline decoration-dotted decoration-mint/60 underline-offset-4 transition-colors hover:text-mint"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        aria-describedby={`gl-${entry.slug}`}
      >
        {children ?? entry.term}
      </button>
      {open ? (
        <span
          id={`gl-${entry.slug}`}
          role="tooltip"
          className="glass-card absolute bottom-full left-0 z-30 mb-2 block w-64 rounded-lg border border-border-bright p-3 text-left shadow-xl sm:w-72"
        >
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-mint">
            {entry.term}
          </span>
          <span className="block text-xs leading-relaxed text-text-muted">{entry.definition}</span>
          <Link
            href={`/glossary#${entry.slug}`}
            className="mt-2 block font-mono text-[10px] text-gold hover:underline"
            onClick={() => setOpen(false)}
          >
            Full glossary →
          </Link>
        </span>
      ) : null}
    </span>
  );
}
