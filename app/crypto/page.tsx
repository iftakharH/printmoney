import type { Metadata } from "next";
import { PageHeader, Section, DisclaimerBar } from "@/components/ui";
import { CryptoPrimer } from "@/components/crypto/CryptoPrimer";

export const metadata: Metadata = {
  title: "Crypto primer (risk-first)",
  description:
    "Educational cryptocurrency overview: blockchain basics, stablecoins, wallets, volatility, scams checklist — with strong risk framing.",
};

export default function CryptoPage() {
  return (
    <Section>
      <PageHeader
        eyebrow="Room 06 · Crypto"
        title="Crypto without the hype"
        description="Understand the technology and the danger in the same breath. This room is built to keep you solvent, not to sell you a token."
      />
      <CryptoPrimer />
      <div className="mt-8">
        <DisclaimerBar text="Educational only. Cryptocurrency is volatile and largely unprotected compared to bank deposits. Nothing here is a recommendation to buy or sell." />
      </div>
    </Section>
  );
}
