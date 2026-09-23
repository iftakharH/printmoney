import type { CurrencyCode } from "./regions";

/**
 * Illustrative price-level indices (approximate, rebased so 2024 ≈ latest).
 * Educational only — not official statistics.
 */
export interface InflationPoint {
  year: number;
  index: number;
}

export const INFLATION_SERIES: Record<CurrencyCode, InflationPoint[]> = {
  USD: [
    { year: 1950, index: 8.5 },
    { year: 1960, index: 10.0 },
    { year: 1970, index: 12.5 },
    { year: 1980, index: 24.5 },
    { year: 1990, index: 39.5 },
    { year: 2000, index: 50.5 },
    { year: 2010, index: 63.5 },
    { year: 2020, index: 77.5 },
    { year: 2024, index: 91.0 },
  ],
  GBP: [
    { year: 1950, index: 5.5 },
    { year: 1960, index: 6.5 },
    { year: 1970, index: 8.5 },
    { year: 1980, index: 19.0 },
    { year: 1990, index: 34.0 },
    { year: 2000, index: 45.0 },
    { year: 2010, index: 59.0 },
    { year: 2020, index: 72.0 },
    { year: 2024, index: 87.0 },
  ],
  BDT: [
    { year: 1950, index: 1.5 },
    { year: 1960, index: 2.5 },
    { year: 1970, index: 4.5 },
    { year: 1980, index: 9.5 },
    { year: 1990, index: 18.0 },
    { year: 2000, index: 32.0 },
    { year: 2010, index: 52.0 },
    { year: 2020, index: 74.0 },
    { year: 2024, index: 88.0 },
  ],
  AUD: [
    { year: 1950, index: 5.0 },
    { year: 1960, index: 6.0 },
    { year: 1970, index: 8.0 },
    { year: 1980, index: 18.5 },
    { year: 1990, index: 33.0 },
    { year: 2000, index: 44.0 },
    { year: 2010, index: 57.0 },
    { year: 2020, index: 71.0 },
    { year: 2024, index: 86.0 },
  ],
  EUR: [
    { year: 1950, index: 4.0 },
    { year: 1960, index: 5.5 },
    { year: 1970, index: 7.5 },
    { year: 1980, index: 14.5 },
    { year: 1990, index: 25.5 },
    { year: 2000, index: 35.5 },
    { year: 2010, index: 47.5 },
    { year: 2020, index: 57.5 },
    { year: 2024, index: 71.5 },
  ],
};

export function latestIndex(code: CurrencyCode): number {
  const s = INFLATION_SERIES[code];
  return s[s.length - 1].index;
}

export function indexAtYear(code: CurrencyCode, year: number): number {
  const s = INFLATION_SERIES[code];
  if (year <= s[0].year) return s[0].index;
  if (year >= s[s.length - 1].year) return s[s.length - 1].index;
  for (let i = 0; i < s.length - 1; i++) {
    const a = s[i];
    const b = s[i + 1];
    if (year >= a.year && year <= b.year) {
      const t = (year - a.year) / (b.year - a.year);
      return a.index + t * (b.index - a.index);
    }
  }
  return s[s.length - 1].index;
}

/** What `amount` from `fromYear` is worth in today's money. */
export function purchasingPower(
  amount: number,
  fromYear: number,
  code: CurrencyCode
): number {
  const then = indexAtYear(code, fromYear);
  const now = latestIndex(code);
  return (amount * now) / then;
}

/** What `amount` from today would have been worth in `toYear`. */
export function pastValue(amount: number, toYear: number, code: CurrencyCode): number {
  const now = latestIndex(code);
  const then = indexAtYear(code, toYear);
  return (amount * then) / now;
}

export interface ComparisonItem {
  label: string;
  past: string;
  present: string;
}

export const COMPARISONS: Record<CurrencyCode, ComparisonItem[]> = {
  USD: [
    { label: "Gallon of gas", past: "~$0.36 (1970)", present: "~$3.50" },
    { label: "Average house", past: "~$25k (1970)", present: "~$400k+" },
    { label: "College tuition / yr", past: "~$2k (1975)", present: "~$10k+" },
    { label: "Movie ticket", past: "~$1.50 (1980)", present: "~$12" },
  ],
  GBP: [
    { label: "Pint of beer", past: "~£0.35 (1975)", present: "~£5.50" },
    { label: "Average house", past: "~£10k (1975)", present: "~£280k+" },
    { label: "Train commute", past: "~£0.50 (1980)", present: "~£6+" },
    { label: "Stamp", past: "~£0.10 (1980)", present: "~£1.55" },
  ],
  BDT: [
    { label: "Bus ticket", past: "৳1 (1980)", present: "৳50+" },
    { label: "Rice (1kg)", past: "৳5 (1985)", present: "৳70+" },
    { label: "Dhaka flat", past: "৳2 lakh (1990)", present: "৳80 lakh+" },
    { label: "Liter of fuel", past: "৳10 (1995)", present: "৳125+" },
  ],
  AUD: [
    { label: "Loaf of bread", past: "A$0.50 (1975)", present: "A$4.50" },
    { label: "Average house", past: "A$25k (1975)", present: "A$900k+" },
    { label: "Litregas", past: "A$0.15 (1980)", present: "A$1.80+" },
    { label: "Movie ticket", past: "A$3 (1985)", present: "A$22" },
  ],
  EUR: [
    { label: "Coffee", past: "€0.50 (2000)", present: "€3.50" },
    { label: "Bread loaf", past: "€0.80 (2000)", present: "€3.20" },
    { label: "City flat / m²", past: "€1,200 (2000)", present: "€4,500+" },
    { label: "Public transport", past: "€1.00 (2000)", present: "€2.80" },
  ],
};

export function projectFuture(
  amount: number,
  years: number,
  annualRate: number,
  code: CurrencyCode
): number {
  void code;
  return amount * Math.pow(1 + annualRate, years);
}
