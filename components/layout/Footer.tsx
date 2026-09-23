import Link from "next/link";
import { FOOTER_LINKS, DISCLAIMER, SITE_NAME } from "@/lib/site";
import { CURRENCY_CODES, REGIONS } from "@/lib/regions";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-bg-elevated/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <p className="neon-text font-mono text-sm font-bold">{SITE_NAME}</p>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            A knowledge lab for how money is printed, created, and kept from losing value — plus
            literacy and investment education.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {CURRENCY_CODES.map((c) => (
              <span
                key={c}
                className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-text-dim"
                title={REGIONS[c].name}
              >
                {REGIONS[c].flag} {c}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-mint">Explore</p>
          <ul className="grid grid-cols-2 gap-1.5 text-sm">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-text-muted transition-colors hover:text-mint">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">Important</p>
          <p className="text-xs leading-relaxed text-text-muted">{DISCLAIMER}</p>
          <p className="mt-3 text-xs text-text-dim">
            Progress is stored only in your browser. No accounts, no tracking pixels.
          </p>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center font-mono text-[11px] text-text-dim">
        © {new Date().getFullYear()} {SITE_NAME} · Built for education · Not affiliated with any central bank
      </div>
    </footer>
  );
}
