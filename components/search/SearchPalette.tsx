"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { GLOSSARY } from "@/lib/glossary";
import { LESSONS } from "@/lib/learn-content";
import { NAV_LINKS } from "@/lib/site";

interface Result {
  id: string;
  label: string;
  sub: string;
  href: string;
  group: string;
}

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = () => {
    setQ("");
    onClose();
  };

  const results = useMemo(() => {
    const items: Result[] = [
      ...NAV_LINKS.map((n) => ({
        id: n.href,
        label: n.label,
        sub: "Page",
        href: n.href,
        group: "Pages",
      })),
      { id: "about", label: "About & disclaimer", sub: "Page", href: "/about", group: "Pages" },
      ...GLOSSARY.map((g) => ({
        id: g.slug,
        label: g.term,
        sub: g.category,
        href: `/glossary#${g.slug}`,
        group: "Glossary",
      })),
      ...LESSONS.map((l) => ({
        id: l.id,
        label: l.title,
        sub: l.blurb,
        href: `/learn#${l.id}`,
        group: "Lessons",
      })),
    ];
    const query = q.trim().toLowerCase();
    if (!query) return items.filter((i) => i.group === "Pages").slice(0, 8);
    return items
      .filter(
        (i) =>
          i.label.toLowerCase().includes(query) || i.sub.toLowerCase().includes(query)
      )
      .slice(0, 14);
  }, [q]);

  if (!open) return null;

  const go = (href: string) => {
    close();
    router.push(href);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div
        className="glass-card w-full max-w-lg overflow-hidden rounded-xl neon-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-border p-3">
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
              if (e.key === "Enter" && results[0]) go(results[0].href);
            }}
            placeholder="Search pages, glossary, lessons…"
            className="w-full bg-transparent font-mono text-sm text-text placeholder:text-text-dim focus:outline-none"
          />
        </div>
        <ul className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-4 text-sm text-text-dim">No matches</li>
          ) : (
            results.map((r) => (
              <li key={`${r.group}-${r.id}`}>
                <button
                  type="button"
                  onClick={() => go(r.href)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-mint/10"
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-text-dim w-16 shrink-0">
                    {r.group}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-text">{r.label}</span>
                    <span className="block truncate text-xs text-text-dim">{r.sub}</span>
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
        <div className="border-t border-border px-3 py-2 font-mono text-[10px] text-text-dim">
          Enter to open first result · Esc to close
        </div>
      </div>
    </div>
  );
}
