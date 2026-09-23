import type { Metadata } from "next";
import { PageHeader, Section, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resources & official links",
  description:
    "Curated links: central banks (Fed, BoE, Bangladesh Bank, RBA, ECB), investor education, tools and books.",
};

interface Resource {
  label: string;
  href: string;
  desc: string;
}

const GROUPS: { title: string; tone: string; items: Resource[] }[] = [
  {
    title: "Central banks",
    tone: "mint",
    items: [
      { label: "Federal Reserve", href: "https://www.federalreserve.gov/", desc: "US monetary policy & currency" },
      { label: "Bank of England", href: "https://www.bankofengland.co.uk/", desc: "UK notes, policy & data" },
      { label: "Bangladesh Bank", href: "https://www.bb.org.bd/", desc: "Bangladesh monetary authority" },
      { label: "Reserve Bank of Australia", href: "https://www.rba.gov.au/", desc: "AU policy & banknotes" },
      { label: "European Central Bank", href: "https://www.ecb.europa.eu/", desc: "Euro system & euro notes" },
    ],
  },
  {
    title: "Investor education (official)",
    tone: "gold",
    items: [
      { label: "Investor.gov (SEC)", href: "https://www.investor.gov/", desc: "US basics, tools & fraud alerts" },
      { label: "FCA — Consumer", href: "https://www.fca.org.uk/consumers", desc: "UK scams and product warnings" },
      { label: "ASIC MoneySmart", href: "https://moneysmart.gov.au/", desc: "AU calculators & guides" },
      { label: "ESMA — Investors", href: "https://www.esma.europa.eu/", desc: "EU market oversight & info" },
      { label: "BEFA / BB financial inclusion", href: "https://www.bb.org.bd/", desc: "BD financial literacy resources" },
    ],
  },
  {
    title: "Tools",
    tone: "mint",
    items: [
      { label: "Our inflation lab", href: "/inflation-lab", desc: "Multi-currency purchasing power" },
      { label: "Our glossary", href: "/glossary", desc: "Terms used on this site" },
      { label: "Compound calculators", href: "https://www.investor.gov/financial-tools-calculators", desc: "Official SEC tools directory" },
    ],
  },
  {
    title: "Books & courses",
    tone: "gold",
    items: [
      { label: "The Bogleheads' Guide", href: "https://www.bogleheads.org/", desc: "Low-cost index investing community" },
      { label: "MIT OpenCourseWare — Finance", href: "https://ocw.mit.edu/", desc: "Free university-level courses" },
      { label: "Your Money or Your Life", href: "https://www.yourmoneyoryourlife.com/", desc: "Classic money & life alignment" },
      { label: "The Psychology of Money", href: "https://www.morganhousebook.com/", desc: "Behavioural money lessons" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <Section>
      <PageHeader
        eyebrow="Room 08 · Resources"
        title="Trusted desks & further reading"
        description="Official institutions first, then tools and books. External links open in a new tab."
      />
      <div className="space-y-8">
        {GROUPS.map((g) => (
          <div key={g.title}>
            <h2
              className={`mb-3 font-mono text-xs uppercase tracking-[0.2em] ${
                g.tone === "mint" ? "text-mint" : "text-gold"
              }`}
            >
              {g.title}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((item) => {
                const external = item.href.startsWith("http");
                return (
                  <a
                    key={item.href + item.label}
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="glass-card group rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:border-mint/40"
                  >
                    <p className="font-semibold text-text group-hover:text-mint transition-colors">
                      {item.label}
                      {external ? <span className="ml-1 text-xs opacity-60">↗</span> : null}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">{item.desc}</p>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
        <Card>
          <p className="text-sm text-text-muted">
            Want something added? See the About page. We prioritize regulator and central bank sources over
            affiliate content — this site never takes payment for rankings on this list.
          </p>
        </Card>
      </div>
    </Section>
  );
}
