export interface InvestOption {
  name: string;
  what: string;
  returnNote: string;
  hedge: number; // 0-5 inflation hedge score
  risk: "low" | "medium" | "high";
  pros: string[];
  cons: string[];
  forWhom: string;
}

export const RISK_LADDER: {
  tier: "safe" | "growth" | "income" | "risk";
  label: string;
  color: string;
  blurb: string;
  options: InvestOption[];
}[] = [
  {
    tier: "safe",
    label: "Safety first",
    color: "#00ff9d",
    blurb: "Capital stability, modest returns — the foundation.",
    options: [
      {
        name: "High-yield savings / easy access",
        what: "Interest-bearing cash account, often deposit-insured up to limits.",
        returnNote: "Varies with policy rates; often below or near inflation.",
        hedge: 2,
        risk: "low",
        pros: ["Liquid", "Low/no loss risk", "FDIC/FSSC/etc. cover in many countries"],
        cons: ["Real returns can be negative", "Rate cuts hurt yields"],
        forWhom: "Emergency funds and money needed within ~2 years",
      },
      {
        name: "Inflation-linked bonds (TIPS, linkers)",
        what: "Government debt whose principal rises with a consumer price index.",
        returnNote: "Real yield + inflation adjustment.",
        hedge: 5,
        risk: "low",
        pros: ["Direct inflation hedge", "Sovereign credit (where issued)"],
        cons: ["Can lag if inflation spikes then falls", "Sold early can lose in nominal terms"],
        forWhom: "Preservation-focused savers worried about inflation",
      },
      {
        name: "Term deposits / fixed deposits",
        what: "Lock cash for a fixed tenure at a known rate.",
        returnNote: "Guaranteed rate for the term.",
        hedge: 2,
        risk: "low",
        pros: ["Predictable", "No market swings"],
        cons: ["Locked liquidity", "Rate may lag inflation"],
        forWhom: "Money with a known future date of use",
      },
    ],
  },
  {
    tier: "growth",
    label: "Long-term growth",
    color: "#ffd700",
    blurb: "Higher expected returns with equity volatility — decades, not days.",
    options: [
      {
        name: "Broad stock index funds / ETFs",
        what: "One fund holding hundreds or thousands of companies.",
        returnNote: "Historically ~6–10% nominal/yr over long windows (varies by market — not a promise).",
        hedge: 4,
        risk: "medium",
        pros: ["Diversified", "Low fees", "Historically outran cash long-term"],
        cons: ["Can fall 30–50% in bad years", "Requires patience"],
        forWhom: "Money you won't need for 7+ years",
      },
      {
        name: "Target-date / lifecycle funds",
        what: "Auto-shifts from stocks to bonds as a target year approaches.",
        returnNote: "Blend of underlying assets.",
        hedge: 3,
        risk: "medium",
        pros: ["Set-and-forget glide path", "Built-in rebalancing"],
        cons: ["Less control", "One-size-feel may not fit you"],
        forWhom: "Retirement savers who want simplicity",
      },
      {
        name: "Global / international funds",
        what: "Equities across many countries, not just your home market.",
        returnNote: "Tracks global markets.",
        hedge: 3,
        risk: "medium",
        pros: ["Geographic diversification", "Currency diversification"],
        cons: ["Currency moves add noise", "Home bias debate continues"],
        forWhom: "Investors wanting beyond single-country risk",
      },
    ],
  },
  {
    tier: "income",
    label: "Income & real assets",
    color: "#f59e0b",
    blurb: "Cash flow and hard-asset exposure alongside growth.",
    options: [
      {
        name: "Bonds (government & high-grade corporate)",
        what: "Lend money for periodic coupons and principal at maturity.",
        returnNote: "Yields move with interest rates.",
        hedge: 2,
        risk: "medium",
        pros: ["Income stream", "Can stabilize a stock-heavy portfolio"],
        cons: ["Prices fall when rates rise", "Credit risk on corporates"],
        forWhom: "Balancing portfolios and near-term income needs",
      },
      {
        name: "Dividend stocks",
        what: "Shares of companies that distribute part of profits as cash.",
        returnNote: "Dividends + price change.",
        hedge: 3,
        risk: "medium",
        pros: ["Regular cash distributions", "Some inflation pass-through"],
        cons: ["Can cut dividends", "Equity downside still applies"],
        forWhom: "Income seekers who accept stock risk",
      },
      {
        name: "REITs / property funds",
        what: "Pooled real estate exposure without buying a building.",
        returnNote: "Rental income + property value changes.",
        hedge: 4,
        risk: "medium",
        pros: ["Real-asset link", "Liquid vs physical property"],
        cons: ["Sensitive to rates", "Can crash with property cycles"],
        forWhom: "Diversifiers wanting property without a mortgage",
      },
      {
        name: "Gold / precious metals",
        what: "Metal held as a store of value (coins, funds, allocated accounts).",
        returnNote: "No yield — price only.",
        hedge: 3,
        risk: "medium",
        pros: ["Crisis hedge narrative", "Doesn't default like debt"],
        cons: ["No dividends", "Volatile and emotional"],
        forWhom: "Small diversifier slice, not a whole portfolio",
      },
    ],
  },
  {
    tier: "risk",
    label: "Higher risk",
    color: "#ff4d6a",
    blurb: "Only with money you can afford to lose or ignore for years.",
    options: [
      {
        name: "Individual stocks",
        what: "Picking single companies.",
        returnNote: "Anything from moonshot to near-zero.",
        hedge: 3,
        risk: "high",
        pros: ["Big upside if right", "Concentrated conviction"],
        cons: ["Company-specific blowups", "Requires real research"],
        forWhom: "A satellite position, not the core",
      },
      {
        name: "Crypto assets",
        what: "Volatile digital tokens on public chains.",
        returnNote: "Extremely wide outcomes; drawdowns of 50–80% happen.",
        hedge: 1,
        risk: "high",
        pros: ["24/7 markets", "Uncorrelated at times", "Technology upside narrative"],
        cons: ["Extreme volatility", "Scams & custody risk", "No inflation linkage"],
        forWhom: "Small speculative allocation only after core finances are solid",
      },
      {
        name: "Options & leveraged products",
        what: "Derivatives that amplify moves — or expire worthless.",
        returnNote: "Can lose 100% quickly.",
        hedge: 1,
        risk: "high",
        pros: ["Defined risk if used carefully", "Hedging uses"],
        cons: ["Time decay", "Easy to misunderstand", "Leverage cuts both ways"],
        forWhom: "Experienced investors who fully understand the mechanics",
      },
    ],
  },
];

export const BEFORE_YOU_INVEST = [
  "Emergency fund is funded (3–6 months)",
  "High-interest debt is under control",
  "You know when you'll need the money",
  "You understand you can lose principal",
  "Fees are low and transparent",
  "You have a written plan you can stick to in a crash",
];

export const RED_FLAGS = [
  "\"Guaranteed high returns\" — no legitimate market guarantees this",
  "Pressure to act today / secrecy / 'only for invited people'",
  "Unregistered sellers or no regulatory oversight",
  "Complex strategies you can't explain to a friend",
  "Asking for wallet seed phrases or remote PC access",
  "Referral-heavy 'programs' that pay more for recruiting",
];

export const CRYPTO_CHECKLIST = [
  "I understand crypto can drop 50%+ and stay down for years",
  "I only use money I can afford to lose entirely",
  "I store keys securely and never share seed phrases",
  "I use reputable, regulated venues where available",
  "I can spot 'guaranteed profit' and recruitment schemes",
  "I've checked whether crypto is even permitted in my jurisdiction",
  "My emergency fund and core investments come first",
];
