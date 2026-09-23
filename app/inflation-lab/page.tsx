import type { Metadata } from "next";
import { PageHeader, Section, DisclaimerBar } from "@/components/ui";
import { InflationSimulator, CurrencyConverter } from "@/components/inflation/InflationLabTools";

export const metadata: Metadata = {
  title: "Inflation & purchasing power lab",
  description:
    "Simulate purchasing power in USD, GBP, BDT, AUD and EUR across decades, compare then-vs-now prices, convert currencies, and play the Inflation Assassin game.",
};

export default function InflationLabPage() {
  return (
    <Section>
      <PageHeader
        eyebrow="Room 03 · Inflation lab"
        title="What is your money really worth?"
        description="Run multi-decade purchasing-power simulations in five currencies, convert between them, and see which savings strategies survive inflation."
      />

      <div className="space-y-8">
        <InflationSimulator />
        <CurrencyConverter />
        <DisclaimerBar text="All indices, prices and FX rates are illustrative approximations for learning. Do not use for accounting, tax, or trading decisions." />
      </div>
    </Section>
  );
}
