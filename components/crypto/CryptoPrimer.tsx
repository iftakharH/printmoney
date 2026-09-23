"use client";

import { useState } from "react";
import { CRYPTO_CHECKLIST } from "@/lib/invest-content";
import { GlossaryTip } from "@/components/glossary/GlossaryTip";
import { useAppStore } from "@/store/useAppStore";
import { playTone } from "@/lib/audio";
import { Card, Badge } from "@/components/ui";

const BASICS = [
  {
    id: "what",
    title: "What is crypto?",
    body: "Digital assets secured by cryptography on decentralized networks. Bitcoin (2009) was first; thousands of projects followed — most will fail or fade.",
    link: "blockchain",
  },
  {
    id: "btc-eth",
    title: "BTC, ETH & the rest",
    body: "Bitcoin aims to be scarce digital cash/narrative gold. Ethereum is a programmable network. Thousands of 'alts' range from useful protocols to pure speculation.",
    link: "cryptocurrency",
  },
  {
    id: "stable",
    title: "Stablecoins",
    body: "Tokens pegged (usually) to 1 USD via reserves. Convenient rails — but issuers can freeze, reserves can disappoint, de-pegs happen.",
    link: "stablecoin",
  },
  {
    id: "keys",
    title: "Wallets & keys",
    body: "Not your keys, not your coins. Exchanges can fail or freeze accounts; self-custody means YOU secure the seed phrase forever.",
    link: "private-key",
  },
];

const RISK_FACTORS = [
  { label: "Volatility", detail: "50–80% drawdowns are historically normal for majors", score: 95 },
  { label: "Regulatory risk", detail: "Rules differ sharply by country; access can vanish", score: 70 },
  { label: "Custody / hacks", detail: "Phishing, exchange collapses, smart-contract bugs", score: 85 },
  { label: "Scam density", detail: "Rugs, fake support, 'guaranteed' yield schemes", score: 90 },
  { label: "Inflation linkage", detail: "No CPI adjustment — unlike TIPS/linkers", score: 15 },
];

export function CryptoPrimer() {
  const [checked, setChecked] = useState<string[]>([]);
  const unlockBadge = useAppStore((s) => s.unlockBadge);
  const addXp = useAppStore((s) => s.addXp);
  const soundOn = useAppStore((s) => s.soundOn);
  const hydrated = useAppStore((s) => s.hydrated);
  const badges = useAppStore((s) => s.badges);

  const toggle = (item: string) => {
    setChecked((c) => (c.includes(item) ? c.filter((x) => x !== item) : [...c, item]));
    playTone(soundOn, "click");
  };

  const allChecked = checked.length === CRYPTO_CHECKLIST.length;
  const hasBadge = badges.includes("scam-spotter");

  const reviewComplete = () => {
    if (allChecked && hydrated && !hasBadge) {
      unlockBadge("scam-spotter");
      addXp(30);
      playTone(soundOn, "success");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-red/40 bg-red/5 p-4 text-sm text-red/90">
        <strong className="font-semibold">High risk zone.</strong> Crypto can go to zero. This page is
        education and safety — never a buy recommendation. Check local law before touching assets.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {BASICS.map((b) => (
          <Card key={b.id} hover>
            <h3 className="font-semibold text-text">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              <GlossaryTip term={b.link}>{b.body.split(" ")[0]}</GlossaryTip>
              {b.body.slice(b.body.split(" ")[0].length)}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <p className="font-mono text-xs uppercase tracking-widest text-gold">Risk meter (vs cash)</p>
        <div className="mt-4 space-y-3">
          {RISK_FACTORS.map((f) => (
            <div key={f.label}>
              <div className="flex justify-between text-sm">
                <span className="text-text">{f.label}</span>
                <span className="font-mono text-xs text-text-dim">{f.score}/100</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-mint via-gold to-red"
                  style={{ width: `${f.score}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-text-dim">{f.detail}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <p className="font-mono text-xs uppercase tracking-widest text-mint">
          Scam-spotter checklist · unlock 🛡️
        </p>
        <ul className="mt-4 space-y-2">
          {CRYPTO_CHECKLIST.map((item) => {
            const on = checked.includes(item);
            return (
              <li key={item}>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border px-3 py-2.5 text-sm hover:border-border-bright">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => toggle(item)}
                    className="mt-0.5 h-4 w-4 accent-[#00ff9d]"
                  />
                  <span className={on ? "text-mint" : "text-text-muted"}>{item}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={reviewComplete}
          disabled={!allChecked}
          className="btn-primary mt-4 rounded-lg px-4 py-2 text-sm disabled:opacity-40"
        >
          {hasBadge ? "✓ Badge earned" : allChecked ? "Claim Scam Spotter badge" : `Check all (${checked.length}/${CRYPTO_CHECKLIST.length})`}
        </button>
      </Card>

      <Card>
        <p className="font-mono text-xs uppercase tracking-widest text-red">Red flags hall of shame</p>
        <ul className="mt-3 space-y-2 text-sm text-text-muted">
          {[
            "「Guaranteed daily returns」 — crypto has no yield magic button",
            "DMs offering to 'help recover' funds — recovery scams prey on victims",
            "Projects where the only utility is recruiting more buyers",
            "Unaudited contracts asking for unlimited token approvals",
            "Influencers shilling without conflict disclosure",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="text-red">✕</span>
              {x}
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Badge tone="muted">Not financial advice</Badge>
        <Badge tone="muted">Do your own research</Badge>
        <Badge tone="muted">Laws vary by country</Badge>
      </div>
    </div>
  );
}
