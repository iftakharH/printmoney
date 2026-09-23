"use client";

import { useMemo, useState } from "react";
import { GLOSSARY, GLOSSARY_CATEGORIES, type GlossaryCategory } from "@/lib/glossary";

export function GlossaryExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<GlossaryCategory | "all">("all");

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    return GLOSSARY.filter((t) => {
      const catOk = cat === "all" || t.category === cat;
      const qOk =
        !query ||
        t.term.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query);
      return catOk && qOk;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [q, cat]);

  const letters = useMemo(() => {
    const set = new Set(items.map((t) => t.term[0].toUpperCase()));
    return Array.from(set).sort();
  }, [items]);

  const jump = (letter: string) => {
    const el = document.getElementById(`letter-${letter}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let lastLetter = "";

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms…"
          className="w-full rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:border-mint focus:outline-none sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-1.5">
          {GLOSSARY_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={`rounded-full border px-3 py-1.5 text-xs ${
                cat === c.id ? "border-mint bg-mint/15 text-mint" : "border-border text-text-muted"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {letters.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => jump(l)}
            className="h-7 w-7 rounded border border-border font-mono text-xs text-text-muted hover:border-mint hover:text-mint"
          >
            {l}
          </button>
        ))}
      </div>

      <p className="font-mono text-xs text-text-dim">{items.length} terms</p>

      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="rounded-lg border border-border p-6 text-center text-sm text-text-dim">
            No matches — try another keyword.
          </p>
        ) : (
          items.map((t) => {
            const letter = t.term[0].toUpperCase();
            const showLetter = letter !== lastLetter;
            lastLetter = letter;
            return (
              <div key={t.slug}>
                {showLetter ? (
                  <p id={`letter-${letter}`} className="scroll-mt-24 pt-4 pb-1 font-mono text-sm text-mint">
                    {letter}
                  </p>
                ) : null}
                <article
                  id={t.slug}
                  className="glass-card scroll-mt-24 rounded-xl p-4 transition-colors hover:border-border-bright"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-text">{t.term}</h2>
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-text-dim">
                      {t.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{t.definition}</p>
                  {t.seeAlso?.length ? (
                    <p className="mt-2 flex flex-wrap gap-2 text-xs text-text-dim">
                      See also:
                      {t.seeAlso.map((s) => (
                        <a key={s} href={`#${s}`} className="text-gold hover:underline">
                          #{s}
                        </a>
                      ))}
                    </p>
                  ) : null}
                </article>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
