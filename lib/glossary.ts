export type GlossaryCategory =
  | "monetary"
  | "banking"
  | "investing"
  | "crypto"
  | "personal";

export interface GlossaryTerm {
  slug: string;
  term: string;
  category: GlossaryCategory;
  definition: string;
  seeAlso?: string[];
}

export const GLOSSARY_CATEGORIES: { id: GlossaryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "monetary", label: "Monetary policy" },
  { id: "banking", label: "Banking" },
  { id: "investing", label: "Investing" },
  { id: "crypto", label: "Crypto" },
  { id: "personal", label: "Personal finance" },
];

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "inflation",
    term: "Inflation",
    category: "personal",
    definition:
      "The rate at which prices for goods and services rise over time, reducing the purchasing power of money.",
    seeAlso: ["cpi", "deflation", "purchasing-power"],
  },
  {
    slug: "deflation",
    term: "Deflation",
    category: "monetary",
    definition:
      "A sustained fall in the general price level. Cash buys more over time, but borrowing and spending can slow.",
    seeAlso: ["inflation"],
  },
  {
    slug: "purchasing-power",
    term: "Purchasing power",
    category: "personal",
    definition:
      "The amount of goods and services one unit of money can buy. Inflation erodes it; wages and returns must keep up.",
    seeAlso: ["inflation", "cpi"],
  },
  {
    slug: "cpi",
    term: "CPI (Consumer Price Index)",
    category: "monetary",
    definition:
      "A basket-based measure of average price changes consumers pay. Central banks often target inflation derived from it.",
    seeAlso: ["inflation"],
  },
  {
    slug: "fiat-money",
    term: "Fiat money",
    category: "monetary",
    definition:
      "Currency not backed by a physical commodity like gold. Its value rests on trust in the issuing government and scarcity managed by the central bank.",
    seeAlso: ["legal-tender", "gold-standard"],
  },
  {
    slug: "legal-tender",
    term: "Legal tender",
    category: "monetary",
    definition:
      "Money that must be accepted for debts when offered. Notes and coins issued by the state are legal tender in their jurisdiction.",
    seeAlso: ["fiat-money"],
  },
  {
    slug: "gold-standard",
    term: "Gold standard",
    category: "monetary",
    definition:
      "A monetary system where currency was directly convertible into a fixed quantity of gold. Largely abandoned in the 20th century.",
    seeAlso: ["fiat-money"],
  },
  {
    slug: "quantitative-easing",
    term: "Quantitative easing (QE)",
    category: "monetary",
    definition:
      "A central bank buying longer-term securities to inject money into the economy and lower long-term interest rates — effectively creating new reserves.",
    seeAlso: ["money-supply", "open-market-operations"],
  },
  {
    slug: "open-market-operations",
    term: "Open market operations",
    category: "monetary",
    definition:
      "Central bank buying or selling government bonds to influence short-term interest rates and bank reserves.",
    seeAlso: ["quantitative-easing", "policy-rate"],
  },
  {
    slug: "policy-rate",
    term: "Policy rate",
    category: "monetary",
    definition:
      "The interest rate a central bank charges on loans to commercial banks (or pays on reserves) — the primary lever of monetary policy.",
    seeAlso: ["open-market-operations", "inflation"],
  },
  {
    slug: "money-supply",
    term: "Money supply (M0/M1/M2)",
    category: "monetary",
    definition:
      "Aggregates of money in an economy: M0 = base/circulation, M1 = narrow (cash + demand deposits), M2 = M1 + near-money (savings, small deposits).",
    seeAlso: ["quantitative-easing", "fractional-reserve"],
  },
  {
    slug: "fractional-reserve",
    term: "Fractional reserve",
    category: "banking",
    definition:
      "The practice where banks hold only a fraction of deposits as reserves and lend out the rest — the core of modern money creation.",
    seeAlso: ["money-multiplier", "money-supply"],
  },
  {
    slug: "money-multiplier",
    term: "Money multiplier",
    category: "banking",
    definition:
      "The theoretical maximum amount of money the banking system generates per unit of base money, roughly 1 ÷ reserve ratio (simplified).",
    seeAlso: ["fractional-reserve"],
  },
  {
    slug: "central-bank",
    term: "Central bank",
    category: "banking",
    definition:
      "The national institution that issues currency, sets policy rates, supervises banks, and acts as lender of last resort.",
    seeAlso: ["policy-rate", "fiat-money"],
  },
  {
    slug: "commercial-bank",
    term: "Commercial bank",
    category: "banking",
    definition:
      "A bank that takes deposits and makes loans to households and firms. Most money people spend exists as commercial-bank deposits.",
    seeAlso: ["fractional-reserve"],
  },
  {
    slug: "interest",
    term: "Interest",
    category: "banking",
    definition:
      "The cost of borrowing money, or the reward for saving it, usually expressed as an annual percentage.",
    seeAlso: ["policy-rate", "compound-interest"],
  },
  {
    slug: "compound-interest",
    term: "Compound interest",
    category: "investing",
    definition:
      "Interest earned on both the original principal and previously accumulated interest — growth accelerates over time.",
    seeAlso: ["interest", "real-return"],
  },
  {
    slug: "real-return",
    term: "Real return",
    category: "investing",
    definition:
      "Investment return after adjusting for inflation. A 7% nominal return with 3% inflation ≈ ~3.9% real return.",
    seeAlso: ["nominal", "inflation"],
  },
  {
    slug: "nominal",
    term: "Nominal value",
    category: "investing",
    definition:
      "A face-value number not adjusted for inflation. Nominal gains can mask real losses of purchasing power.",
    seeAlso: ["real-return"],
  },
  {
    slug: "etf",
    term: "ETF (Exchange-Traded Fund)",
    category: "investing",
    definition:
      "A fund that trades on an exchange like a stock, usually tracking an index — a common low-cost way to diversify.",
    seeAlso: ["index-fund", "diversification"],
  },
  {
    slug: "index-fund",
    term: "Index fund",
    category: "investing",
    definition:
      "A fund designed to mirror a market index (e.g. S&P 500) rather than beat it, typically with low fees.",
    seeAlso: ["etf", "diversification"],
  },
  {
    slug: "diversification",
    term: "Diversification",
    category: "investing",
    definition:
      "Spreading money across assets so no single failure wipes out the portfolio. 'Don't put all your eggs in one basket.'",
    seeAlso: ["etf", "risk"],
  },
  {
    slug: "risk",
    term: "Risk",
    category: "investing",
    definition:
      "The chance an investment loses value or fails to meet goals. Higher expected return usually comes with higher risk.",
    seeAlso: ["diversification", "volatility"],
  },
  {
    slug: "volatility",
    term: "Volatility",
    category: "investing",
    definition:
      "How sharply prices move up and down. High volatility means bigger swings — uncomfortable but not the same as permanent loss.",
    seeAlso: ["risk"],
  },
  {
    slug: "bond",
    term: "Bond",
    category: "investing",
    definition:
      "A loan to a government or company that pays periodic interest and returns principal at maturity.",
    seeAlso: ["interest", "real-return"],
  },
  {
    slug: "tips",
    term: "TIPS / inflation-linked bonds",
    category: "investing",
    definition:
      "Government bonds whose principal adjusts with inflation (e.g. US TIPS, UK index-linked gilts), protecting purchasing power.",
    seeAlso: ["bond", "inflation"],
  },
  {
    slug: "emergency-fund",
    term: "Emergency fund",
    category: "personal",
    definition:
      "Cash set aside for unexpected expenses — typically 3–6 months of essential spending in an accessible account.",
    seeAlso: ["budgeting"],
  },
  {
    slug: "budgeting",
    term: "Budgeting",
    category: "personal",
    definition:
      "Planning where income goes before it's spent. Common rule: 50% needs, 30% wants, 20% savings/debt.",
    seeAlso: ["emergency-fund", "debt-avalanche"],
  },
  {
    slug: "debt-avalanche",
    term: "Debt avalanche vs snowball",
    category: "personal",
    definition:
      "Avalanche = pay highest interest rate first (saves money). Snowball = pay smallest balance first (motivates).",
    seeAlso: ["budgeting", "interest"],
  },
  {
    slug: "credit-score",
    term: "Credit score",
    category: "personal",
    definition:
      "A number summarizing how reliably you've borrowed and repaid. It affects loan approval and interest rates.",
    seeAlso: ["interest"],
  },
  {
    slug: "blockchain",
    term: "Blockchain",
    category: "crypto",
    definition:
      "A shared distributed ledger maintained by a network of computers. Transactions are recorded in linked blocks.",
    seeAlso: ["cryptocurrency", "wallet"],
  },
  {
    slug: "cryptocurrency",
    term: "Cryptocurrency",
    category: "crypto",
    definition:
      "Digital assets secured by cryptography on a blockchain. Highly volatile; many projects fail; not the same as cash deposits.",
    seeAlso: ["blockchain", "stablecoin", "wallet"],
  },
  {
    slug: "stablecoin",
    term: "Stablecoin",
    category: "crypto",
    definition:
      "A crypto token designed to hold a steady value (often 1 USD) via reserves or algorithms. Not risk-free — reserves and issuers can fail.",
    seeAlso: ["cryptocurrency"],
  },
  {
    slug: "wallet",
    term: "Crypto wallet",
    category: "crypto",
    definition:
      "Software or hardware that stores private keys controlling on-chain assets. Lose the keys (or get phished), lose the funds.",
    seeAlso: ["cryptocurrency"],
  },
  {
    slug: "private-key",
    term: "Private key",
    category: "crypto",
    definition:
      "A secret that proves ownership of crypto. Anyone with the key controls the funds — never share it.",
    seeAlso: ["wallet"],
  },
  {
    slug: "market-cap",
    term: "Market capitalization",
    category: "investing",
    definition:
      "Total market value of a company's shares (price × shares outstanding), or of all coins of a cryptocurrency in circulation.",
    seeAlso: ["risk"],
  },
  {
    slug: "intaglio",
    term: "Intaglio printing",
    category: "banking",
    definition:
      "A printing process where ink sits in engraved grooves under high pressure, giving banknotes their raised, tactile feel.",
    seeAlso: ["security-features", "banknote"],
  },
  {
    slug: "security-features",
    term: "Security features",
    category: "banking",
    definition:
      "Anti-counterfeit elements on banknotes: watermarks, security threads, holograms, color-shifting ink, microprinting, UV fibers.",
    seeAlso: ["intaglio", "banknote"],
  },
  {
    slug: "banknote",
    term: "Banknote",
    category: "banking",
    definition:
      "A paper (or polymer) instrument issued by a central bank as legal tender — a promise of value enforced by law and trust.",
    seeAlso: ["fiat-money", "security-features"],
  },
  {
    slug: "liquidity",
    term: "Liquidity",
    category: "investing",
    definition:
      "How quickly an asset can be converted to cash without a big price cut. Cash is most liquid; property is less so.",
    seeAlso: ["risk"],
  },
  {
    slug: "dollar-cost-averaging",
    term: "Dollar-cost averaging",
    category: "investing",
    definition:
      "Investing a fixed amount on a schedule regardless of price — buys more when prices are low, less when high.",
    seeAlso: ["index-fund", "volatility"],
  },
];

export function findTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}
