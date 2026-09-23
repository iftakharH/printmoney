import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 ${className}`}>
      {children}
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-8 sm:mb-12">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-mint">{eyebrow}</p>
      <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">{title}</h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function Card({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`glass-card rounded-xl p-5 ${hover ? "transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(0,255,157,0.08)]" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  tone = "mint",
}: {
  children: ReactNode;
  tone?: "mint" | "gold" | "red" | "muted";
}) {
  const tones: Record<string, string> = {
    mint: "border-mint/40 text-mint bg-mint/10",
    gold: "border-gold/40 text-gold bg-gold/10",
    red: "border-red/40 text-red bg-red/10",
    muted: "border-border text-text-muted bg-bg-elevated",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function DisclaimerBar({ text }: { text?: string }) {
  return (
    <div className="rounded-lg border border-gold/30 bg-gold/5 px-4 py-3 text-xs leading-relaxed text-gold/90 sm:text-sm">
      <strong className="font-semibold">Disclaimer:</strong>{" "}
      {text ??
        "Educational content only — not financial advice. Investments can lose value. Historical figures are illustrative."}
    </div>
  );
}
