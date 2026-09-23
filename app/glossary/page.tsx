import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui";
import { GlossaryExplorer } from "@/components/glossary/GlossaryExplorer";

export const metadata: Metadata = {
  title: "Financial glossary A–Z",
  description:
    "Plain-English definitions for monetary policy, banking, investing, crypto and personal finance terms — searchable and linkable.",
};

export default function GlossaryPage() {
  return (
    <Section>
      <PageHeader
        eyebrow="Room 07 · Reference"
        title="Glossary A–Z"
        description="Every technical term used across the site in plain English. Hash-linkable — share or bookmark any entry."
      />
      <GlossaryExplorer />
    </Section>
  );
}
