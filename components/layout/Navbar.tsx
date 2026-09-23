"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CURRENCY_CODES, REGIONS } from "@/lib/regions";
import { NAV_LINKS, SITE_NAME } from "@/lib/site";
import { rankForXp, nextRank } from "@/lib/badges";
import { useAppStore } from "@/store/useAppStore";
import { playTone } from "@/lib/audio";
import { SearchPalette } from "@/components/search/SearchPalette";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);
  const hydrated = useAppStore((s) => s.hydrated);
  const region = useAppStore((s) => s.region);
  const setRegion = useAppStore((s) => s.setRegion);
  const xp = useAppStore((s) => s.xp);
  const badges = useAppStore((s) => s.badges);
  const soundOn = useAppStore((s) => s.soundOn);
  const toggleSound = useAppStore((s) => s.toggleSound);
  const setHydrated = useAppStore((s) => s.setHydrated);
  const finishOnboarding = useAppStore((s) => s.finishOnboarding);
  const onboarded = useAppStore((s) => s.onboarded);

  useEffect(() => {
    const unsub = useAppStore.persist?.onFinishHydration?.(() => setHydrated());
    if (useAppStore.persist?.hasHydrated()) setHydrated();
    return () => unsub?.();
  }, [setHydrated]);

  const closeMenus = () => {
    setOpen(false);
    setRegionOpen(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const rank = rankForXp(xp);
  const nxt = nextRank(xp);
  const progress = nxt
    ? Math.min(100, ((xp - rank.minXp) / (nxt.minXp - rank.minXp)) * 100)
    : 100;
  const reg = REGIONS[region] ?? REGIONS.USD;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2 font-mono text-sm font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded border border-mint/50 bg-mint/10 text-mint">
              ₩
            </span>
            <span className="neon-text hidden sm:inline">{SITE_NAME}</span>
          </Link>

          <nav className="hidden flex-1 items-center gap-0.5 overflow-x-auto lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMenus}
                  className={`whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                    active
                      ? "bg-mint/10 text-mint"
                      : "text-text-muted hover:bg-bg-elevated hover:text-text"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-md border border-border px-2.5 py-1.5 text-xs text-text-dim transition-colors hover:border-mint/40 hover:text-mint sm:flex"
              aria-label="Open search"
            >
              <span>Search…</span>
              <kbd className="rounded border border-border bg-bg-elevated px-1 font-mono text-[10px]">⌘K</kbd>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setRegionOpen((v) => !v);
                  playTone(soundOn, "click");
                }}
                className="flex items-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs transition-colors hover:border-mint/40"
                aria-expanded={regionOpen}
                aria-haspopup="listbox"
              >
                <span aria-hidden>{reg.flag}</span>
                <span className="font-mono">{reg.code}</span>
                <span className="text-text-dim">▾</span>
              </button>
              {regionOpen ? (
                <ul
                  role="listbox"
                  className="absolute right-0 z-50 mt-1 w-44 rounded-lg border border-border bg-bg-elevated p-1 shadow-xl"
                >
                  {CURRENCY_CODES.map((code) => {
                    const r = REGIONS[code];
                    return (
                      <li key={code}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={region === code}
                          onClick={() => {
                            setRegion(code);
                            if (typeof localStorage !== "undefined") {
                              localStorage.setItem("printmoney-region-set", "1");
                            }
                            playTone(soundOn, "coin");
                            setRegionOpen(false);
                          }}
                          className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
                            region === code ? "bg-mint/15 text-mint" : "text-text-muted hover:bg-bg-card"
                          }`}
                        >
                          <span aria-hidden>{r.flag}</span>
                          <span className="font-mono text-xs">{r.code}</span>
                          <span className="truncate text-xs text-text-dim">{r.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>

            <button
              type="button"
              onClick={toggleSound}
              className="rounded-md border border-border px-2 py-1.5 text-xs transition-colors hover:border-mint/40"
              aria-label={soundOn ? "Mute sounds" : "Enable sounds"}
              title={soundOn ? "Sound on" : "Sound off"}
            >
              {soundOn ? "🔊" : "🔇"}
            </button>

            <div
              className="hidden min-w-[110px] flex-col gap-0.5 md:flex"
              title={`${xp} XP · ${rank.name}${badges.length ? ` · ${badges.length} badges` : ""}`}
            >
              <div className="flex items-center justify-between gap-2 font-mono text-[10px] text-text-dim">
                <span className="text-mint">{rank.name}</span>
                <span>{xp} XP</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-mint-dim to-mint transition-all duration-500"
                  style={{ width: `${hydrated ? progress : 0}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              className="rounded-md border border-border px-2 py-1.5 text-sm lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="border-t border-border bg-bg-elevated px-4 py-3 lg:hidden" aria-label="Mobile">
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMenus}
                  className={`rounded-md px-3 py-2 text-sm ${
                    pathname === l.href ? "bg-mint/10 text-mint" : "text-text-muted"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/about" onClick={closeMenus} className="rounded-md px-3 py-2 text-sm text-text-muted">
                About
              </Link>
              <button
                type="button"
                className="rounded-md px-3 py-2 text-left text-sm text-text-muted sm:hidden"
                onClick={() => setSearchOpen(true)}
              >
                Search…
              </button>
            </div>
            {hydrated && nxt ? (
              <p className="mt-3 font-mono text-[11px] text-text-dim">
                {xp} XP · {rank.name} · next: {nxt.name}
              </p>
            ) : null}
          </nav>
        ) : null}
      </header>

      {!hydrated || onboarded ? null : (
        <div className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-xl border border-mint/40 bg-bg-elevated p-4 shadow-[0_0_40px_rgba(0,255,157,0.15)]">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-mint">Welcome to the lab</p>
          <p className="text-sm text-text-muted">
            Pick a <strong className="text-text">currency</strong> in the header, earn <strong className="text-text">XP</strong> by
            finishing lessons & games, and unlock <strong className="text-text">badges</strong>. Press ⌘K to search.
          </p>
          <button
            type="button"
            className="btn-primary mt-3 rounded-lg px-4 py-2 text-sm"
            onClick={() => finishOnboarding()}
          >
            Start exploring
          </button>
        </div>
      )}

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
