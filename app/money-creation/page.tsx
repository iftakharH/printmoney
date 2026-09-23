import type { Metadata } from "next";
import { PageHeader, Section, DisclaimerBar } from "@/components/ui";
import { HistoryTimeline, CreationFlow } from "@/components/money/MoneyCreationTools";

export const metadata: Metadata = {
  title: "How money is created",
  description:
    "History of money timeline, fractional reserve flow, money multiplier calculator, M0/M1/M2, quantitative easing myths vs facts.",
};

export default function MoneyCreationPage() {
  return (
    <Section>
      <PageHeader
        eyebrow="Room 02 · Creation"
        title="How money is actually created"
        description="Not just printing presses — deposits, reserves, policy rates, and QE. Start with five thousand years of money, then open the machine."
      />

      <div className="space-y-12">
        <div>
          <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Timeline · from barter to fiat
          </h2>
          <HistoryTimeline />
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-mint">
            Inside the machine
          </h2>
          <CreationFlow />
        </div>

        <DisclaimerBar text="Simplified educational models. Actual money creation involves capital requirements, liquidity rules, and central bank frameworks that vary by jurisdiction." />
      </div>
    </Section>
  );
}
