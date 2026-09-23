import type { Metadata } from "next";
import { PageHeader, Section, DisclaimerBar } from "@/components/ui";
import { PrintPipeline } from "@/components/printing/PrintPipeline";
import { BanknoteDesigner } from "@/components/designer/BanknoteDesigner";
import { CounterfeitGame } from "@/components/printing/CounterfeitGame";

export const metadata: Metadata = {
  title: "Printing press & banknote designer",
  description:
    "Learn how banknotes are designed and printed in 7 steps, design your own custom animated banknote, and play the counterfeit detection game.",
};

export default function PrintingPage() {
  return (
    <Section>
      <PageHeader
        eyebrow="Room 01 · Press"
        title="How money gets printed"
        description="From engraving steel to cutting sheets into legal tender — then design your own educational note and hunt counterfeits."
      />

      <div className="space-y-12">
        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-mint">
            Pipeline · 7 steps
          </h2>
          <PrintPipeline />
        </div>

        <div>
          <h2 className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Custom banknote designer
          </h2>
          <p className="mb-4 max-w-2xl text-sm text-text-muted">
            Build a note across five currencies, toggle real security features, then send it through an
            animated press sequence. Educational novelty only — not legal tender.
          </p>
          <BanknoteDesigner />
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-red">
            Security lab · Spot the fake
          </h2>
          <CounterfeitGame />
        </div>

        <DisclaimerBar text="Banknote designs are fictional educational novelties. Counterfeiting currency is illegal — this page teaches detection, not forgery." />
      </div>
    </Section>
  );
}
