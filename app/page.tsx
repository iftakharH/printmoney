import type { Metadata } from "next";
import Link from "next/link";
import { STATS_TICKER, SITE_NAME } from "@/lib/site";
import { CURRENCY_CODES, REGIONS } from "@/lib/regions";
import { Card, Section, Badge } from "@/components/ui";
import { GlossaryTip } from "@/components/glossary/GlossaryTip";
import { HeroSceneLazy } from "@/components/three/HeroSceneLazy";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Money printing, creation & financial literacy lab`,
  description:
    "Interactive lab: watch how banknotes are printed, design your own note, simulate inflation in 5 currencies, and learn to protect purchasing power.",
};

const FEATURES = [
  {
    href: "/printing",
    title: "Printing press lab",
    desc: "7-step pipeline, custom banknote designer, counterfeit game",
    icon: "🖨️",
    tag: "Flagship",
  },
  {
    href: "/money-creation",
    title: "How money is created",
    desc: "History timeline, QE, fractional reserve, M0/M1/M2",
    icon: "🏦",
    tag: "Core",
  },
  {
    href: "/inflation-lab",
    title: "Inflation simulator",
    desc: "USD · GBP · BDT · AUD · EUR purchasing power tools",
    icon: "📉",
    tag: "Interactive",
  },
  {
    href: "/learn",
    title: "Financial literacy",
    desc: "Lessons, XP ranks, graduation quiz",
    icon: "📚",
    tag: "Gamified",
  },
  {
    href: "/invest",
    title: "Investment guide",
    desc: "Risk ladder, region-aware options, checklists",
    icon: "📈",
    tag: "Education",
  },
  {
    href: "/crypto",
    title: "Crypto primer",
    desc: "What it is, scams to avoid, risk framing",
    icon: "⛓️",
    tag: "Risk-aware",
  },
  {
    href: "/glossary",
    title: "Glossary A–Z",
    desc: "Plain-English terms with inline tooltips",
    icon: "📖",
    tag: "Reference",
  },
  {
    href: "/resources",
    title: "Resource desk",
    desc: "Central banks, tools, books, official links",
    icon: "🗺️",
    tag: "Curated",
  },
];

export default function HomePage() {
  const ticker = [...STATS_TICKER, ...STATS_TICKER];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <Badge tone="mint">Money lab · educational</Badge>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Watch money <span className="neon-text">being born</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
              Explore how banknotes are designed and printed, how{" "}
              <GlossaryTip term="central banks">central banks</GlossaryTip> and commercial banks create money,
              and how to stop <GlossaryTip term="inflation">inflation</GlossaryTip> from eating your savings —
              with tools for <strong className="text-text">USD, GBP, BDT, AUD & EUR</strong>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/printing" className="btn-primary rounded-lg px-5 py-2.5 text-sm">
                Design a banknote →
              </Link>
              <Link href="/inflation-lab" className="btn-ghost rounded-lg px-5 py-2.5 text-sm">
                Open inflation lab
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {CURRENCY_CODES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-bg-card px-3 py-1 font-mono text-xs text-text-muted"
                >
                  {REGIONS[c].flag} {REGIONS[c].symbol} {c}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-[300px] rounded-2xl border border-border bg-bg-card/50 guilloche-bg sm:h-[380px]">
            <HeroSceneLazy />
            <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-mint/70">
              Live press · webgl
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-border bg-bg-elevated/80 overflow-hidden py-2.5">
        <div className="animate-ticker flex w-max gap-8 whitespace-nowrap font-mono text-xs text-text-muted">
          {ticker.map((s, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-mint">◆</span>
              <span className="text-text-dim">{s.label}</span>
              <span className="text-gold">{s.value}</span>
            </span>
          ))}
        </div>
      </div>

      <Section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint">Explore the lab</p>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Eight rooms, one money machine</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Link key={f.href} href={f.href} className="group">
              <Card hover className="h-full">
                <div className="mb-3 flex items-start justify-between">
                  <span className="text-2xl" aria-hidden>
                    {f.icon}
                  </span>
                  <Badge tone={f.tag === "Flagship" ? "gold" : "muted"}>{f.tag}</Badge>
                </div>
                <h3 className="font-semibold text-text group-hover:text-mint transition-colors">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{f.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="glass-card grid gap-6 rounded-2xl p-6 sm:p-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Why this site</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Most people never see where money comes from — or why it quietly loses value. This lab
              makes both visible, then hands you literacy tools to act on it.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mint">How to use it</p>
            <ul className="mt-2 space-y-1.5 text-sm text-text-muted">
              <li>1 · Pick your currency in the header</li>
              <li>2 · Print a note & catch the fakes</li>
              <li>3 · Simulate decades of inflation</li>
              <li>4 · Finish lessons to earn ranks</li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-red">Know this</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Everything here is education, not advice. Markets can fall. Your responsibility is to
              learn the mechanics — then decide with clear eyes.
            </p>
            <Link href="/about" className="mt-2 inline-block font-mono text-xs text-gold hover:underline">
              Full disclaimer →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
