import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section, Card, DisclaimerBar, Badge } from "@/components/ui";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { BADGES } from "@/lib/badges";
import { CURRENCY_CODES, REGIONS } from "@/lib/regions";

export const metadata: Metadata = {
  title: "About, methodology & disclaimer",
  description: `About ${SITE_NAME}: educational mission, data methodology, FAQ, and full not-financial-advice disclaimer.`,
};

const FAQ = [
  {
    q: "Is this financial advice?",
    a: "No. PrintMoney is an educational project. We explain mechanisms and patterns; we do not know your circumstances and do not recommend specific securities.",
  },
  {
    q: "Where does the data come from?",
    a: "Historical indices, prices and FX levels are illustrative approximations inspired by public statistical ranges — labeled as such throughout. Always verify against official sources (BLS, ONS, BBS, ABS, Eurostat, etc.).",
  },
  {
    q: "Can I use the custom banknote designs as money?",
    a: "Absolutely not. Designs are fictional novelties for learning about security features. Counterfeiting is a crime in every jurisdiction we cover.",
  },
  {
    q: "Does my progress sync across devices?",
    a: "No accounts. XP, badges and settings live in your browser's localStorage only.",
  },
  {
    q: "Why five currencies?",
    a: "USD, GBP, BDT, AUD and EUR cover major reserve/English-speaking markets plus Bangladesh — you can switch any time in the header.",
  },
  {
    q: "How do I give feedback?",
    a: "Open an issue if this project is on GitHub, or share the site with someone who needs the literacy content — that helps more than anything.",
  },
];

export default function AboutPage() {
  return (
    <Section>
      <PageHeader
        eyebrow="About"
        title={`${SITE_NAME} — the money lab`}
        description={SITE_DESCRIPTION}
      />

      <div className="space-y-8">
        <DisclaimerBar text="IMPORTANT: Nothing on this site is financial, investment, tax, or legal advice. Investing involves risk of loss. Past patterns do not guarantee future results. Verify all figures independently." />

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="font-semibold text-text">Mission</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Money is the medium everyone uses and almost no one is taught. We visualize how notes are
              printed, how deposits are created, and how inflation quietly taxes cash — then point to
              literacy and investment concepts that help purchasing power grow instead of shrink.
            </p>
          </Card>
          <Card>
            <h2 className="font-semibold text-text">Methodology</h2>
            <ul className="mt-2 space-y-2 text-sm text-text-muted">
              <li>· Figures marked <strong className="text-gold">illustrative</strong> are educational approximations</li>
              <li>· FX converter uses static reference pegs, not live markets</li>
              <li>· Return examples (e.g. ~7%) are long-run nominal teaching defaults, not promises</li>
              <li>· Region-specific products are orientation lists, not endorsements</li>
            </ul>
          </Card>
        </div>

        <Card>
          <h2 className="font-semibold text-text">Gamification</h2>
          <p className="mt-2 text-sm text-text-muted">
            Earn XP for lessons and games, climb ranks from Lab Rookie to Legend, and collect badges:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span key={b.id} className="rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm">
                {b.icon} <strong className="text-text">{b.name}</strong>
                <span className="block text-xs text-text-dim">{b.description}</span>
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-text">Supported currencies</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-5">
            {CURRENCY_CODES.map((c) => (
              <div key={c} className="rounded-lg border border-border bg-bg-elevated p-3 text-center">
                <span className="text-xl" aria-hidden>
                  {REGIONS[c].flag}
                </span>
                <p className="font-mono text-sm text-mint">{c}</p>
                <p className="text-[10px] text-text-dim">{REGIONS[c].centralBank}</p>
              </div>
            ))}
          </div>
        </Card>

        <div>
          <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-mint">FAQ</h2>
          <div className="space-y-2">
            {FAQ.map((item) => (
              <details key={item.q} className="glass-card rounded-xl p-4 group">
                <summary className="cursor-pointer list-none font-medium text-text marker:hidden">
                  <span className="mr-2 text-mint">+</span>
                  {item.q}
                </summary>
                <p className="mt-2 pl-6 text-sm leading-relaxed text-text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-primary rounded-lg px-4 py-2 text-sm">
            ← Back to lab
          </Link>
          <Link href="/learn" className="btn-ghost rounded-lg px-4 py-2 text-sm">
            Start learning
          </Link>
          <Badge tone="muted">No tracking · No accounts</Badge>
        </div>
      </div>
    </Section>
  );
}
