import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { InvestHub } from "@/components/invest/InvestHub";

export const metadata: Metadata = {
  title: "Investment options & risk ladder",
  description:
    "Educational investment guide: safety, growth, income and high-risk assets — region-aware for USD, GBP, BDT, AUD and EUR markets. Not financial advice.",
};

export default function InvestPage() {
  return (
    <Section>
      <PageHeader
        eyebrow="Room 05 · Invest"
        title="Where money can grow — and how it dies"
        description="A risk ladder from deposits to speculative assets, region-aware examples, compound comparisons, and checklists that keep you out of trouble."
      />
      <InvestHub />
    </Section>
  );
}
