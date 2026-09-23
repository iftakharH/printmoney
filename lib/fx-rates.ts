import type { CurrencyCode } from "./regions";

/**
 * Illustrative rates: how many units of each currency equal 1 USD.
 * Static educational approximations — not live market data.
 */
export const USD_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  GBP: 0.75,
  EUR: 0.92,
  AUD: 1.52,
  BDT: 120,
};

export function convert(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): number {
  const usd = amount / USD_RATES[from];
  return usd * USD_RATES[to];
}
