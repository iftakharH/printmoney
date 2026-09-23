export interface Lesson {
  id: string;
  title: string;
  blurb: string;
  xp: number;
  body: string[];
  tips: string[];
}

export const LESSONS: Lesson[] = [
  {
    id: "emergency-fund",
    title: "Emergency fund first",
    blurb: "3–6 months of expenses before you invest aggressively.",
    xp: 40,
    body: [
      "An emergency fund is cash set aside for job loss, medical bills, or urgent repairs — money you can reach within a day without selling investments at a loss.",
      "Target 3–6 months of essential spending (rent, food, utilities, debt payments). If income is unstable, aim higher.",
      "Keep it boring: a high-yield savings or easy-access account. It's insurance, not an investment.",
    ],
    tips: [
      "Automate a small transfer on payday",
      "Replenish immediately after using it",
      "Separate account so you're not tempted",
    ],
  },
  {
    id: "budget-50-30-20",
    title: "Budget: 50 / 30 / 20",
    blurb: "A simple split for needs, wants, and the future.",
    xp: 40,
    body: [
      "50% of after-tax income → needs (housing, groceries, transport, minimum debt payments).",
      "30% → wants (dining, streaming, hobbies).",
      "20% → savings, investing, and extra debt repayment.",
      "Adjust ratios to your city and income — the habit matters more than perfect numbers.",
    ],
    tips: [
      "Track one month to see your real split",
      "Pay savings first ('pay yourself first')",
      "Review quarterly, not daily",
    ],
  },
  {
    id: "compound-interest",
    title: "Compound interest is the engine",
    blurb: "Time in the market beats timing — and beats inflation.",
    xp: 50,
    body: [
      "Compounding means your returns earn returns. Small amounts + long time can outgrow large amounts invested late.",
      "Example: $200/month at ~7% nominal for 30 years ≈ over $240,000 — most of which is growth, not contributions.",
      "Inflation is the silent opponent: if prices rise 3%, you need your money to outrun that just to stand still.",
    ],
    tips: [
      "Start earlier rather than larger",
      "Reinvest dividends",
      "Check real (after-inflation) progress",
    ],
  },
  {
    id: "debt-strategy",
    title: "Kill expensive debt",
    blurb: "Avalanche vs snowball — pick your weapon.",
    xp: 40,
    body: [
      "High-interest debt (credit cards especially) compounds against you faster than most investments compound for you.",
      "Avalanche: pay minimums on everything, throw extra at the highest interest rate — saves the most money.",
      "Snowball: pay smallest balances first for quick wins and motivation — saves less but keeps many people going.",
      "Never carry a card balance at 20%+ while chasing 7% market returns.",
    ],
    tips: [
      "Ask for a lower APR or consider a balance transfer",
      "Stop new charges while payoff is in progress",
      "Celebrate milestones without new debt",
    ],
  },
  {
    id: "risk-diversification",
    title: "Risk & diversification",
    blurb: "Spread eggs so one bad basket doesn't empty you.",
    xp: 50,
    body: [
      "Diversification means owning different assets that don't all fail at the same time — countries, sectors, bonds vs stocks.",
      "Index funds give instant diversification across hundreds of companies for very low fees.",
      "Your time horizon matters: money you need in 1 year shouldn't be in volatile stocks.",
      "Risk capacity (can you afford losses?) and risk tolerance (can you stomach them?) are different things.",
    ],
    tips: [
      "Match assets to your timeline",
      "Rebalance once a year",
      "Ignore day-to-day noise if long-term",
    ],
  },
  {
    id: "credit-basics",
    title: "Credit scores demystified",
    blurb: "What moves the number lenders care about.",
    xp: 35,
    body: [
      "Payment history (pay on time, every time) is the biggest factor in most scoring models.",
      "Utilization: keep card balances well under the limit — under 30% is a common target, under 10% is better.",
      "Length of history, credit mix, and recent applications also matter.",
      "A good score = cheaper mortgages, lower card APRs, better rental terms in many markets.",
    ],
    tips: [
      "Autopay at least the minimum",
      "Don't close your oldest card casually",
      "Check your report for errors yearly",
    ],
  },
  {
    id: "inflation-defense",
    title: "Defending against inflation",
    blurb: "Cash that sleeps loses. Here's the playbook.",
    xp: 50,
    body: [
      "Inflation quietly cuts the value of idle cash. If inflation is 3%, $10,000 buys ~25% less in 10 years.",
      "Defenses: invest long-term money in diversified equities, use inflation-linked bonds (TIPS/gilts) for ballast, keep only near-term needs in cash.",
      "Skills and career income are also inflation hedges — wages that rise with prices protect you directly.",
      "Real estate and commodities can help some portfolios, but each has its own risks and costs.",
    ],
    tips: [
      "Don't keep 'future money' in a zero-interest drawer",
      "Review cash holdings yearly",
      "Raise savings rate when you get raises",
    ],
  },
  {
    id: "money-mistakes",
    title: "Common money mistakes",
    blurb: "Traps that quietly drain wealth.",
    xp: 40,
    body: [
      "Lifestyle inflation: every raise fully spent before it arrives.",
      "Chasing hot tips / crypto pumps without understanding the asset.",
      "No emergency fund → one surprise bill becomes high-interest debt.",
      "Checking portfolios daily → panic selling on red days.",
      "Paying only minimums on revolving debt.",
      "Skipping employer match on retirement plans — that's free money left on the table.",
    ],
    tips: [
      "Automate good defaults",
      "Sleep 48h on big financial decisions",
      "Pre-commit an investment plan and write it down",
    ],
  },
];

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export const LITERACY_QUIZ: QuizQuestion[] = [
  {
    q: "What does an emergency fund primarily protect you from?",
    options: ["Market crashes", "Unexpected expenses without debt", "Inflation", "Taxes"],
    correct: 1,
    explain: "It's cash for surprises — so you don't finance them on a credit card.",
  },
  {
    q: "In the 50/30/20 rule, the 20% goes to…",
    options: ["Wants", "Needs", "Savings & debt payoff", "Charity"],
    correct: 2,
    explain: "Future you: savings, investing, extra debt repayment.",
  },
  {
    q: "Compound interest means…",
    options: [
      "Interest only on your deposit",
      "Interest on interest — growth accelerates",
      "A type of tax",
      "Bank fees that stack",
    ],
    correct: 1,
    explain: "Returns earn returns; time is the multiplier.",
  },
  {
    q: "Debt avalanche method prioritizes…",
    options: ["Smallest balance", "Highest interest rate", "Oldest debt", "Random order"],
    correct: 1,
    explain: "Highest APR first saves the most total interest.",
  },
  {
    q: "A cheap way to diversify hundreds of stocks at once is…",
    options: ["One hot stock", "An index fund", "Savings account", "Lottery tickets"],
    correct: 1,
    explain: "Index funds track a whole market slice in one trade.",
  },
  {
    q: "If inflation is 3% and your savings earn 1%, your real return is…",
    options: ["+4%", "+3%", "About −2%", "Break-even"],
    correct: 2,
    explain: "1% − 3% ≈ −2% — purchasing power is shrinking.",
  },
  {
    q: "Keeping card utilization under which level is a common tip?",
    options: ["90%", "50%", "30%", "100%"],
    correct: 2,
    explain: "Under 30% of your limit (under 10% is even better).",
  },
  {
    q: "Which is NOT an emergency-fund-worthy event?",
    options: ["Job loss", "Car repair", "Planned holiday", "Medical bill"],
    correct: 2,
    explain: "Planned expenses should be budgeted and saved for separately.",
  },
  {
    q: "Dollar-cost averaging means…",
    options: [
      "Buying only on dips",
      "Investing a fixed amount on a schedule",
      "Splitting money across 100 banks",
      "Timing the market perfectly",
    ],
    correct: 1,
    explain: "Fixed amount + regular schedule — regardless of price.",
  },
  {
    q: "Who should hold volatile stocks for money needed next month?",
    options: ["Everyone", "Aggressive traders only", "Nobody with a short timeline", "Retirees"],
    correct: 2,
    explain: "Short timelines need stability, not volatility.",
  },
];

export interface LearnQuizResult {
  score: number;
  total: number;
}
