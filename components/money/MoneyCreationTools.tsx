"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlossaryTip } from "@/components/glossary/GlossaryTip";
import { Card, Badge } from "@/components/ui";

const TIMELINE = [
  {
    year: "≈10,000 BCE",
    title: "Barter",
    body: "Goods swap for goods — inefficient without a double coincidence of wants.",
  },
  {
    year: "≈3000 BCE",
    title: "Commodity money",
    body: "Salt, cattle, shells, and metals become generally accepted media of exchange.",
  },
  {
    year: "≈600 BCE",
    title: "Stamped coins",
    body: "Lydia mints standardized coins — trust shifts to the stamp of authority.",
  },
  {
    year: "1100s–1300s",
    title: "Paper claims",
    body: "China and later Europe use paper receipts convertible to metal — ancestors of banknotes.",
  },
  {
    year: "1600s–1800s",
    title: "Gold standard",
    body: "Currencies promise fixed gold convertibility; supply is (in theory) constrained.",
  },
  {
    year: "1944–1971",
    title: "Bretton Woods",
    body: "Dollar pegged to gold, many currencies pegged to the dollar — a transitional order.",
  },
  {
    year: "1971 →",
    title: "Pure fiat",
    body: "USD leaves gold; modern money is fiat — created by central banks and commercial bank lending.",
  },
  {
    year: "2008 / 2020",
    title: "QE era",
    body: "Central banks buy bonds at scale, expanding reserves dramatically during crises.",
  },
  {
    year: "Today",
    title: "Digital-first money",
    body: "Most 'money' is deposit entries in bank databases; cash is a shrinking share of daily payments.",
  },
];

const TOOLS = [
  {
    id: "physical",
    label: "Physical cash",
    body: "Coins and notes are base money (M0) issued by the central bank / treasury. They enter circulation when the central bank pays for things or when banks withdraw from their accounts.",
    bullets: [
      "Printed under tight controls (see /printing)",
      "Small share of total money stock in modern economies",
      "Reserves finality: cash is a direct central bank liability",
    ],
  },
  {
    id: "bank",
    label: "Bank money",
    body: "When a bank approves a loan, it typically credits the borrower's deposit — creating new deposit money. Repaying principal destroys it. Most money you spend is this IOU from a commercial bank.",
    bullets: [
      "≈90%+ of broad money in many economies",
      "Backed by promises + capital rules, not vaults of cash",
      "Why a 'bank run' can hurt: deposits exceed physical cash",
    ],
  },
  {
    id: "cb",
    label: "Central bank tools",
    body: "Policy rate, open market operations, reserve requirements, and quantitative easing steer the price and quantity of money.",
    bullets: [
      "Raise/lower policy rate → influences all other rates",
      "OMO: buy/sell short-term government paper",
      "QE: buy longer-term securities → bank reserves swell",
    ],
  },
  {
    id: "aggregates",
    label: "M0 / M1 / M2",
    body: "Measures of money from narrowest (physical + reserves) to broad (savings and near-money).",
    bullets: [
      "M0 / monetary base — cash + bank reserves",
      "M1 — currency + demand deposits (spendable now)",
      "M2 — M1 + savings, small time deposits, retail funds",
    ],
  },
];

export function HistoryTimeline() {
  return (
    <div className="relative space-y-0">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-mint/60 via-gold/40 to-transparent sm:left-6" aria-hidden />
      <ol className="space-y-5">
        {TIMELINE.map((item, i) => (
          <motion.li
            key={item.year}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: Math.min(i * 0.04, 0.3) }}
            className="relative pl-10 sm:pl-14"
          >
            <span
              className="absolute left-2 top-2 h-3 w-3 rounded-full border-2 border-bg bg-mint shadow-[0_0_10px_rgba(0,255,157,0.6)] sm:left-4"
              aria-hidden
            />
            <p className="font-mono text-[11px] uppercase tracking-widest text-gold">{item.year}</p>
            <h3 className="text-base font-semibold text-text sm:text-lg">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.body}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function CreationFlow() {
  const [reserve, setReserve] = useState(10);
  const deposit = 1_000_000_000;
  const maxCreated = deposit / (reserve / 100);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <p className="font-mono text-xs uppercase tracking-widest text-mint">Fractional reserve loop</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Central bank", sub: "Reserves · policy rate · notes", color: "#00ff9d" },
            { label: "Commercial banks", sub: "Deposits · loans · reserves", color: "#ffd700" },
            { label: "You / economy", sub: "Spending · saving · investing", color: "#38bdf8" },
          ].map((n, i) => (
            <div key={n.label} className="relative rounded-xl border border-border bg-bg-elevated p-4 text-center">
              <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: n.color }}>
                {n.label}
              </p>
              <p className="mt-1 text-xs text-text-dim">{n.sub}</p>
              {i < 2 ? (
                <motion.span
                  className="absolute -right-2 top-1/2 hidden text-mint sm:block"
                  animate={{ x: [-4, 6], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
                >
                  →
                </motion.span>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-text-muted">
          Banks don&apos;t lend out one customer&apos;s cash like buckets of water — they create a matching deposit
          when they lend, constrained by capital, credit demand, and reserve rules.{" "}
          <GlossaryTip term="fractional-reserve">Fractional reserve</GlossaryTip> describes the system where
          only a fraction of deposits is held in reserve form.
        </p>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-dim">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-mint" /> Reserves / base money</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-gold" /> Deposit money</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#38bdf8]" /> Real economy</span>
        </div>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs uppercase tracking-widest text-gold">Money multiplier lab</p>
          <Badge tone="mint">Interactive</Badge>
        </div>
        <p className="mt-2 text-sm text-text-muted">
          Simplified textbook model: initial deposit ÷ reserve ratio = maximum theoretical money stock.
          Real banking is messier — capital rules and loan demand bind harder than the ratio alone.
        </p>
        <label className="mt-4 block text-sm text-text-muted">
          Reserve ratio: <span className="font-mono text-mint">{reserve}%</span>
        </label>
        <input
          type="range"
          min={1}
          max={20}
          value={reserve}
          onChange={(e) => setReserve(Number(e.target.value))}
          className="mt-2 w-full"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-bg-elevated p-3">
            <p className="font-mono text-[10px] uppercase text-text-dim">Seed deposit</p>
            <p className="mt-1 font-mono text-lg text-gold">$1.00B</p>
          </div>
          <div className="rounded-lg border border-border bg-bg-elevated p-3">
            <p className="font-mono text-[10px] uppercase text-text-dim">Multiplier (1/r)</p>
            <p className="mt-1 font-mono text-lg text-mint">×{(100 / reserve).toFixed(1)}</p>
          </div>
          <div className="rounded-lg border border-mint/40 bg-mint/5 p-3">
            <p className="font-mono text-[10px] uppercase text-text-dim">Max money stock</p>
            <p className="mt-1 font-mono text-lg text-mint">
              ${(maxCreated / 1e9).toFixed(2)}B
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <Card key={t.id} hover>
            <h3 className="font-semibold text-text">{t.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{t.body}</p>
            <ul className="mt-3 space-y-1.5">
              {t.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-xs text-text-dim">
                  <span className="text-mint">▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card className="border-gold/30">
        <p className="font-mono text-xs uppercase tracking-widest text-gold">Myths vs facts</p>
        <div className="mt-3 space-y-3">
          {[
            {
              myth: "Banks lend only money savers already deposited.",
              fact: "Loans generally create deposits; reserves arrive later via the payment system.",
            },
            {
              myth: "Printing notes is how most money is made.",
              fact: "Most money is digital deposit creation; physical notes are a minority of M2.",
            },
            {
              myth: "QE prints dollar bills into your account.",
              fact: "QE swaps assets for bank reserves — different layer from cash in wallets.",
            },
          ].map((row) => (
            <div key={row.myth} className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-red/30 bg-red/5 p-3 text-sm">
                <span className="font-mono text-[10px] uppercase text-red">Myth</span>
                <p className="mt-1 text-text-muted">{row.myth}</p>
              </div>
              <div className="rounded-lg border border-mint/30 bg-mint/5 p-3 text-sm">
                <span className="font-mono text-[10px] uppercase text-mint">Fact</span>
                <p className="mt-1 text-text-muted">{row.fact}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
