"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { RISK_LADDER, BEFORE_YOU_INVEST, RED_FLAGS } from "@/lib/invest-content";
import { REGIONS, CURRENCY_CODES } from "@/lib/regions";
import { useAppStore } from "@/store/useAppStore";
import { Card, Badge, DisclaimerBar } from "@/components/ui";
import { GlossaryTip } from "@/components/glossary/GlossaryTip";

const riskTone = { low: "mint", medium: "gold", high: "red" } as const;

export function InvestHub() {
  const code = useAppStore((s) => s.region);
  const setRegion = useAppStore((s) => s.setRegion);

  const r = REGIONS[code];

  const compoundData = useMemo(() => {
    const monthly = 100;
    const rateStocks = 0.07;
    const rateCash = 0.015;
    return Array.from({ length: 31 }, (_, year) => {
      const n = year * 12;
      const future = (p: number, annual: number) => {
        const m = annual / 12;
        if (m === 0) return p * n;
        return p * ((Math.pow(1 + m, n) - 1) / m);
      };
      return {
        year,
        stocks: future(monthly, rateStocks),
        savings: future(monthly, rateCash),
      };
    });
  }, []);

  const finalStocks = compoundData[compoundData.length - 1].stocks;
  const finalSavings = compoundData[compoundData.length - 1].savings;

  return (
    <div className="space-y-8">
      <DisclaimerBar />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-mint">Region lens</p>
          <p className="text-sm text-text-muted">Product names change by market — pick yours.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CURRENCY_CODES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setRegion(c);
              }}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs ${
                code === c ? "border-mint bg-mint/15 text-mint" : "border-border text-text-muted"
              }`}
            >
              {REGIONS[c].flag} {c}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <p className="font-mono text-xs uppercase tracking-widest text-gold">{r.investmentNotes.title}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {r.investmentNotes.items.map((item) => (
            <div key={item.name} className="rounded-lg border border-border bg-bg-elevated p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-text">{item.name}</p>
                <Badge tone={riskTone[item.risk]}>{item.risk}</Badge>
              </div>
              <p className="mt-1 text-xs text-text-muted">{item.blurb}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-text-dim">
          Examples for orientation only — availability, tax treatment and protection schemes differ by country.
        </p>
      </Card>

      <div className="space-y-6">
        <div>
          <h2 className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-mint">Risk ladder</h2>
          <p className="mb-4 text-sm text-text-muted">
            Build from the bottom. Higher rungs demand longer timelines and stronger stomachs. Learn the
            terms: <GlossaryTip term="etf">ETF</GlossaryTip>,{" "}
            <GlossaryTip term="real-return">real return</GlossaryTip>,{" "}
            <GlossaryTip term="diversification">diversification</GlossaryTip>.
          </p>
        </div>
        {RISK_LADDER.map((tier, tierIdx) => (
          <div key={tier.tier} className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-sm font-bold"
                style={{ background: `${tier.color}22`, color: tier.color, border: `1px solid ${tier.color}66` }}
              >
                {tierIdx + 1}
              </span>
              <div>
                <h3 className="font-semibold" style={{ color: tier.color }}>
                  {tier.label}
                </h3>
                <p className="text-xs text-text-muted">{tier.blurb}</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {tier.options.map((opt) => (
                <Card key={opt.name} hover className="h-full">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-text">{opt.name}</h4>
                    <Badge tone={riskTone[opt.risk]}>{opt.risk}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">{opt.what}</p>
                  <p className="mt-2 font-mono text-[11px] text-text-dim">{opt.returnNote}</p>
                  <div className="mt-3">
                    <p className="font-mono text-[10px] uppercase text-text-dim">Inflation hedge</p>
                    <div className="mt-1 flex gap-0.5" aria-label={`${opt.hedge} of 5`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className="h-1.5 w-6 rounded-full"
                          style={{ background: n <= opt.hedge ? "#00ff9d" : "#1a2e26" }}
                        />
                      ))}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1 text-xs">
                    {opt.pros.map((p) => (
                      <li key={p} className="text-mint/90">
                        + {p}
                      </li>
                    ))}
                    {opt.cons.map((c) => (
                      <li key={c} className="text-red/80">
                        − {c}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-text-dim">For: {opt.forWhom}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Card>
        <p className="font-mono text-xs uppercase tracking-widest text-gold">
          Compare · $100 / month over 30 years (illustrative 7% vs 1.5% nominal)
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-mint/40 bg-mint/5 p-3">
            <p className="text-xs text-text-dim">Index-style path</p>
            <p className="font-mono text-xl text-mint">${Math.round(finalStocks).toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-border bg-bg-elevated p-3">
            <p className="text-xs text-text-dim">Cash-only path</p>
            <p className="font-mono text-xl text-text-muted">${Math.round(finalSavings).toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-gold/40 bg-gold/5 p-3">
            <p className="text-xs text-text-dim">Difference</p>
            <p className="font-mono text-xl text-gold">
              +${Math.round(finalStocks - finalSavings).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={compoundData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <CartesianGrid stroke="#1a2e26" strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke="#5a7d70" fontSize={11} />
              <YAxis stroke="#5a7d70" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={50} />
              <Tooltip
                contentStyle={{ background: "#0a100e", border: "1px solid #1a2e26", borderRadius: 8 }}
                formatter={(value) => [`$${Math.round(Number(value ?? 0)).toLocaleString()}`, ""]}
              />
              <Line type="monotone" dataKey="stocks" stroke="#00ff9d" strokeWidth={2} dot={false} name="Index path" />
              <Line type="monotone" dataKey="savings" stroke="#ffd700" strokeWidth={2} dot={false} name="Cash path" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-text-dim">
          Fixed-return illustration, not a forecast. Real markets vary; sequence of returns matter.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="font-mono text-xs uppercase tracking-widest text-mint">Before you invest</p>
          <ul className="mt-3 space-y-2">
            {BEFORE_YOU_INVEST.map((x) => (
              <li key={x} className="flex gap-2 text-sm text-text-muted">
                <span className="text-mint">☐</span>
                {x}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="font-mono text-xs uppercase tracking-widest text-red">Red flags & scams</p>
          <ul className="mt-3 space-y-2">
            {RED_FLAGS.map((x) => (
              <li key={x} className="flex gap-2 text-sm text-text-muted">
                <span className="text-red">✕</span>
                {x}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
