export type CurrencyCode = "USD" | "GBP" | "BDT" | "AUD" | "EUR";

export interface CurrencyRegion {
  code: CurrencyCode;
  name: string;
  country: string;
  flag: string;
  symbol: string;
  centralBank: string;
  issuerLine: string;
  colorPrimary: string;
  colorSecondary: string;
  colorAccent: string;
  denominations: number[];
  noteName: string;
  locale: string;
  investmentNotes: {
    title: string;
    items: { name: string; blurb: string; risk: "low" | "medium" | "high" }[];
  };
}

export const REGIONS: Record<CurrencyCode, CurrencyRegion> = {
  USD: {
    code: "USD",
    name: "US Dollar",
    country: "United States / Global",
    flag: "🇺🇸",
    symbol: "$",
    centralBank: "Federal Reserve",
    issuerLine: "FEDERAL RESERVE NOTE",
    colorPrimary: "#1a3a2a",
    colorSecondary: "#0d2818",
    colorAccent: "#00ff9d",
    denominations: [1, 5, 10, 20, 50, 100],
    noteName: "Greenback",
    locale: "en-US",
    investmentNotes: {
      title: "US-focused options",
      items: [
        { name: "High-yield savings", blurb: "FDIC-insured cash with interest", risk: "low" },
        { name: "I-Bonds & TIPS", blurb: "Inflation-protected government bonds", risk: "low" },
        { name: "Index funds (S&P 500)", blurb: "Broad US equity exposure", risk: "medium" },
        { name: "401(k) / IRA", blurb: "Tax-advantaged retirement accounts", risk: "medium" },
        { name: "Individual stocks", blurb: "Single-company equity risk", risk: "high" },
      ],
    },
  },
  GBP: {
    code: "GBP",
    name: "Pound Sterling",
    country: "United Kingdom",
    flag: "🇬🇧",
    symbol: "£",
    centralBank: "Bank of England",
    issuerLine: "BANK OF ENGLAND",
    colorPrimary: "#2a1a3a",
    colorSecondary: "#1a0d28",
    colorAccent: "#c084fc",
    denominations: [5, 10, 20, 50],
    noteName: "Quid",
    locale: "en-GB",
    investmentNotes: {
      title: "UK-focused options",
      items: [
        { name: "Cash ISA", blurb: "Tax-free interest on savings", risk: "low" },
        { name: "Premium Bonds", blurb: "Prize-based savings (no interest)", risk: "low" },
        { name: "Stocks & Shares ISA", blurb: "Tax-free investing wrapper", risk: "medium" },
        { name: "Gilts", blurb: "UK government bonds", risk: "low" },
        { name: "Global index funds", blurb: "Diversified equity exposure", risk: "medium" },
      ],
    },
  },
  BDT: {
    code: "BDT",
    name: "Bangladeshi Taka",
    country: "Bangladesh",
    flag: "🇧🇩",
    symbol: "৳",
    centralBank: "Bangladesh Bank",
    issuerLine: "BANGLADESH BANK",
    colorPrimary: "#1a3a1a",
    colorSecondary: "#0d280d",
    colorAccent: "#4ade80",
    denominations: [5, 10, 20, 50, 100, 500, 1000],
    noteName: "Taka",
    locale: "en-BD",
    investmentNotes: {
      title: "Bangladesh-focused options",
      items: [
        { name: "Savings certificates (DPS)", blurb: "Government-backed savings schemes", risk: "low" },
        { name: "Fixed deposit / DFCD", blurb: "Bank deposits with fixed tenure", risk: "low" },
        { name: "Mutual funds (UCITS)", blurb: "Professionally managed pools", risk: "medium" },
        { name: "DSE listed shares", blurb: "Dhaka Stock Exchange equities", risk: "high" },
        { name: "Gold (physical)", blurb: "Traditional inflation hedge", risk: "medium" },
      ],
    },
  },
  AUD: {
    code: "AUD",
    name: "Australian Dollar",
    country: "Australia",
    flag: "🇦🇺",
    symbol: "A$",
    centralBank: "Reserve Bank of Australia",
    issuerLine: "RESERVE BANK OF AUSTRALIA",
    colorPrimary: "#3a2a1a",
    colorSecondary: "#28180d",
    colorAccent: "#fbbf24",
    denominations: [5, 10, 20, 50, 100],
    noteName: "Aussie dollar",
    locale: "en-AU",
    investmentNotes: {
      title: "Australia-focused options",
      items: [
        { name: "High-interest savings", blurb: "ADIs with competitive rates", risk: "low" },
        { name: "Term deposits", blurb: "Locked-rate bank deposits", risk: "low" },
        { name: "Superannuation", blurb: "Compulsory retirement wrapper", risk: "medium" },
        { name: "ASX index funds", blurb: "Australian equity exposure", risk: "medium" },
        { name: "Investment bonds", blurb: "Tax-effective savings bonds", risk: "medium" },
      ],
    },
  },
  EUR: {
    code: "EUR",
    name: "Euro",
    country: "Eurozone",
    flag: "🇪🇺",
    symbol: "€",
    centralBank: "European Central Bank",
    issuerLine: "EUROPEAN CENTRAL BANK",
    colorPrimary: "#1a2a3a",
    colorSecondary: "#0d1828",
    colorAccent: "#38bdf8",
    denominations: [5, 10, 20, 50, 100, 200],
    noteName: "Euro",
    locale: "de-DE",
    investmentNotes: {
      title: "Eurozone-focused options",
      items: [
        { name: "Deposit savings accounts", blurb: "EEA-protected bank deposits", risk: "low" },
        { name: "Government bonds", blurb: "Sovereign debt (varies by country)", risk: "low" },
        { name: "Euro Stoxx / UCITS ETFs", blurb: "Diversified European equity", risk: "medium" },
        { name: "Inflation-linked bonds", blurb: "Eurozone HICP-linked securities", risk: "low" },
        { name: "Crypto assets", blurb: "Highly volatile digital assets", risk: "high" },
      ],
    },
  },
};

export const CURRENCY_CODES: CurrencyCode[] = ["USD", "GBP", "BDT", "AUD", "EUR"];

export function getRegion(code: CurrencyCode): CurrencyRegion {
  return REGIONS[code];
}

export function detectRegion(): CurrencyCode {
  if (typeof navigator === "undefined") return "USD";
  const locales = [navigator.language, ...(navigator.languages ?? [])].filter(Boolean);
  for (const raw of locales) {
    const tag = raw.toLowerCase();
    if (tag.includes("-bd") || tag.startsWith("bn")) return "BDT";
    if (tag.includes("-gb")) return "GBP";
    if (tag.includes("-au")) return "AUD";
    if (
      tag.includes("-ie") ||
      tag.includes("-de") ||
      tag.includes("-fr") ||
      tag.includes("-es") ||
      tag.includes("-it") ||
      tag.includes("-nl") ||
      tag.includes("-pt") ||
      tag.includes("-be") ||
      tag.includes("-at")
    ) {
      return "EUR";
    }
  }
  return "USD";
}

export function formatMoney(amount: number, code: CurrencyCode): string {
  const region = REGIONS[code];
  try {
    return new Intl.NumberFormat(region.locale, {
      style: "currency",
      currency: code,
      maximumFractionDigits: amount < 10 ? 2 : 0,
    }).format(amount);
  } catch {
    return `${region.symbol}${amount.toLocaleString()}`;
  }
}
