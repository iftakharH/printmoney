"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import {
  CURRENCY_CODES,
  REGIONS,
  formatMoney,
  type CurrencyCode,
} from "@/lib/regions";
import {
  INFLATION_SERIES,
  COMPARISONS,
  purchasingPower,
  pastValue,
  latestIndex,
  indexAtYear,
} from "@/lib/inflation-data";
import { convert } from "@/lib/fx-rates";
import { playTone } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";
import { Card, Badge } from "@/components/ui";

export function InflationSimulator() {
  const code = useAppStore((s) => s.region);
  const setRegion = useAppStore((s) => s.setRegion);
  const soundOn = useAppStore((s) => s.soundOn);
  const markCurrencyUsed = useAppStore((s) => s.markCurrencyUsed);
  const unlockBadge = useAppStore((s) => s.unlockBadge);
  const currenciesUsed = useAppStore((s) => s.currenciesUsed);

  const [amount, setAmount] = useState(1000);
  const [fromYear, setFromYear] = useState(1990);
  const [mode, setMode] = useState<"then-to-now" | "now-to-then">("then-to-now");

  useEffect(() => {
    markCurrencyUsed(code);
    if (currenciesUsed.length >= 5) unlockBadge("world-currencies");
  }, [code, markCurrencyUsed, currenciesUsed.length, unlockBadge]);

  const result =
    mode === "then-to-now"
      ? purchasingPower(amount, fromYear, code)
      : pastValue(amount, fromYear, code);

  const lostPct =
    mode === "then-to-now"
      ? ((amount - amount * (indexAtYear(code, fromYear) / latestIndex(code))) / amount) * 100
      : 0;

  const series = useMemo(() => {
    return INFLATION_SERIES[code].map((p) => ({
      year: p.year,
      value: purchasingPower(1000, p.year, code),
      index: p.index,
    }));
  }, [code]);

  const comparisons = COMPARISONS[code];

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs uppercase tracking-widest text-mint">Purchasing power engine</p>
          <Badge tone="gold">{REGIONS[code].flag} {code}</Badge>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {CURRENCY_CODES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setRegion(c);
                playTone(soundOn, "coin");
              }}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs ${
                code === c ? "border-mint bg-mint/15 text-mint" : "border-border text-text-muted hover:border-border-bright"
              }`}
            >
              {REGIONS[c].flag} {c}
            </button>
          ))}
        </div>

        <div className="mb-4 flex gap-2">
          {(
            [
              ["then-to-now", "Then → today"],
              ["now-to-then", "Today → then"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-lg border px-3 py-2 text-sm ${
                mode === m ? "border-gold bg-gold/10 text-gold" : "border-border text-text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-text-muted">
            Amount
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-3">
              <span className="font-mono text-mint">{REGIONS[code].symbol}</span>
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) => setAmount(Math.max(1, Number(e.target.value) || 0))}
                className="w-full bg-transparent py-2.5 font-mono text-text focus:outline-none"
              />
            </div>
          </label>
          <label className="text-sm text-text-muted">
            Year {mode === "then-to-now" ? "(money was held from)" : "(money target year)"}
            <input
              type="range"
              min={1950}
              max={2024}
              step={1}
              value={fromYear}
              onChange={(e) => setFromYear(Number(e.target.value))}
              className="mt-3 w-full"
            />
            <span className="mt-1 block font-mono text-mint">{fromYear}</span>
          </label>
        </div>

        <div className="mt-5 rounded-xl border border-mint/40 bg-mint/5 p-5 text-center neon-border">
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-dim">
            {mode === "then-to-now"
              ? `Worth in ${new Date().getFullYear()} purchasing power`
              : `Equivalent buying power in ${fromYear}`}
          </p>
          <p className="mt-1 text-3xl font-bold text-mint sm:text-4xl">
            {formatMoney(result, code)}
          </p>
          {mode === "then-to-now" && amount > 0 ? (
            <p className="mt-2 text-sm text-text-muted">
              {lostPct > 0.5
                ? `Purchasing power lost since ${fromYear}: ~${lostPct.toFixed(1)}%`
                : "Little decay in this window"}
            </p>
          ) : null}
          <p className="mt-1 text-xs text-text-dim">Illustrative indices — not official CPI releases.</p>
        </div>
      </Card>

      <Card>
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">
          $1,000 equivalent if held since each decade
        </p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
              <defs>
                <linearGradient id="pp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00ff9d" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#00ff9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1a2e26" strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke="#5a7d70" fontSize={11} />
              <YAxis stroke="#5a7d70" fontSize={11} tickFormatter={(v) => formatMoney(v, code)} width={90} />
              <Tooltip
                contentStyle={{ background: "#0a100e", border: "1px solid #1a2e26", borderRadius: 8 }}
                labelStyle={{ color: "#00ff9d" }}
                formatter={(value) => [formatMoney(Number(value ?? 0), code), "Equivalent value of 1000 then"]}
              />
              <Area type="monotone" dataKey="value" stroke="#00ff9d" fill="url(#pp)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {comparisons.map((c) => (
          <Card key={c.label} hover>
            <p className="font-semibold text-text">{c.label}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border bg-bg-elevated p-3">
                <p className="font-mono text-[10px] uppercase text-text-dim">Then</p>
                <p className="mt-1 text-gold">{c.past}</p>
              </div>
              <div className="rounded-lg border border-border bg-bg-elevated p-3">
                <p className="font-mono text-[10px] uppercase text-text-dim">Now</p>
                <p className="mt-1 text-mint">{c.present}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <InflationAssassin code={code} />
    </div>
  );
}

const ASSASSIN_ASSETS = [
  { id: "cash", label: "Idle cash under mattress", real: -2 },
  { id: "savings", label: "Basic savings account", real: -0.5 },
  { id: "bonds", label: "Nominal bonds @ 3%", real: 0 },
  { id: "tips", label: "Inflation-linked bonds", real: 1.5 },
  { id: "equity", label: "Diversified stock index", real: 4 },
  { id: "gold", label: "Gold", real: 1 },
  { id: "debt", label: "High-interest credit debt", real: -12 },
];

function InflationAssassin({ code }: { code: CurrencyCode }) {
  const unlockBadge = useAppStore((s) => s.unlockBadge);
  const addXp = useAppStore((s) => s.addXp);
  const soundOn = useAppStore((s) => s.soundOn);
  const [picks, setPicks] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setPicks((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    setShowResult(false);
  };

  const run = () => {
    if (picks.length === 0) return;
    setShowResult(true);
    unlockBadge("inflation-survivor");
    addXp(35);
    playTone(soundOn, "success");
  };

  const years = 30;
  const results = useMemo(() => {
    return ASSASSIN_ASSETS
      .filter((a) => picks.includes(a.id))
      .map((a) => {
        const start = 10000;
        const end = start * Math.pow(1 + a.real / 100, years);
        const realEnd = start * Math.pow(1 + a.real / 100, years);
        return { ...a, start, end, realEnd };
      });
  }, [picks]);

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-red">Mini-game · Inflation Assassin</p>
          <p className="mt-1 text-sm text-text-muted">
            Pick a 30-year mix. We&apos;ll show rough real trajectories under ~3% inflation (illustrative).
          </p>
        </div>
        <Badge tone="muted">{code}</Badge>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {ASSASSIN_ASSETS.map((a) => {
          const on = picks.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                on ? "border-mint bg-mint/10 text-mint" : "border-border text-text-muted hover:border-border-bright"
              }`}
            >
              {on ? "✓ " : ""}
              {a.label}
            </button>
          );
        })}
      </div>

      <button type="button" onClick={run} disabled={picks.length === 0} className="btn-primary mt-4 rounded-lg px-4 py-2 text-sm disabled:opacity-40">
        Run 30-year simulation
      </button>

      {showResult && results.length > 0 ? (
        <div className="mt-4 space-y-3">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={Array.from({ length: 31 }, (_, y) => {
                  const row: Record<string, number> = { year: y };
                  for (const r of results) {
                    row[r.id] = r.start * Math.pow(1 + r.real / 100, y);
                  }
                  return row;
                })}
                margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
              >
                <CartesianGrid stroke="#1a2e26" strokeDasharray="3 3" />
                <XAxis dataKey="year" stroke="#5a7d70" fontSize={11} />
                <YAxis stroke="#5a7d70" fontSize={11} width={70} />
                <Tooltip
                  contentStyle={{ background: "#0a100e", border: "1px solid #1a2e26", borderRadius: 8 }}
                />
                {results.map((r, i) => (
                  <Line
                    key={r.id}
                    type="monotone"
                    dataKey={r.id}
                    stroke={["#00ff9d", "#ffd700", "#ff4d6a", "#38bdf8", "#c084fc", "#f59e0b", "#4ade80"][i % 7]}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((r) => (
              <span key={r.id} className="rounded border border-border px-2 py-1 font-mono text-[11px] text-text-muted">
                {r.label}: {formatMoney(r.end, code)} · real ~{r.real > 0 ? "+" : ""}
                {r.real}%/yr model
              </span>
            ))}
          </div>
          <p className="text-xs text-text-dim">
            Models use fixed nominal/real assumptions for teaching — actual returns vary wildly by year and country.
          </p>
        </div>
      ) : null}
    </Card>
  );
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("EUR");

  const out = convert(amount, from, to);

  return (
    <Card>
      <p className="font-mono text-xs uppercase tracking-widest text-gold">Quick converter · 5 currencies</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <label className="text-sm text-text-muted">
          From
          <div className="mt-1 flex gap-2">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value as CurrencyCode)}
              className="rounded-lg border border-border bg-bg-elevated px-2 py-2.5 font-mono text-sm text-text focus:border-mint focus:outline-none"
            >
              {CURRENCY_CODES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2.5 font-mono text-sm text-text focus:border-mint focus:outline-none"
            />
          </div>
        </label>
        <button
          type="button"
          className="btn-ghost rounded-lg px-3 py-2.5 text-sm justify-self-center"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
          aria-label="Swap currencies"
        >
          ⇄
        </button>
        <label className="text-sm text-text-muted">
          To
          <div className="mt-1 flex gap-2">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value as CurrencyCode)}
              className="rounded-lg border border-border bg-bg-elevated px-2 py-2.5 font-mono text-sm text-text focus:border-mint focus:outline-none"
            >
              {CURRENCY_CODES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="flex w-full items-center rounded-lg border border-mint/40 bg-mint/5 px-3 py-2.5 font-mono text-sm text-mint">
              {formatMoney(out, to)}
            </div>
          </div>
        </label>
      </div>
      <p className="mt-3 text-xs text-text-dim">
        Static illustrative rates (1 USD pegs) — not live FX. For education only.
      </p>
    </Card>
  );
}
