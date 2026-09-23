export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const BADGES: Badge[] = [
  {
    id: "ink-master",
    name: "Ink Master",
    description: "Design and print a custom banknote",
    icon: "🖨️",
  },
  {
    id: "press-pro",
    name: "Press Pro",
    description: "Ace the printing pipeline quiz",
    icon: "🏭",
  },
  {
    id: "counterfeit-catcher",
    name: "Counterfeit Catcher",
    description: "Spot the fake note in the security lab",
    icon: "🕵️",
  },
  {
    id: "inflation-survivor",
    name: "Inflation Survivor",
    description: "Finish the Inflation Assassin mini-game",
    icon: "📉",
  },
  {
    id: "world-currencies",
    name: "World Currencies",
    description: "Run the inflation tool in all 5 currencies",
    icon: "🌍",
  },
  {
    id: "literacy-graduate",
    name: "Literacy Graduate",
    description: "Pass the financial literacy quiz",
    icon: "📚",
  },
  {
    id: "scam-spotter",
    name: "Scam Spotter",
    description: "Review the crypto red-flags checklist",
    icon: "🛡️",
  },
  {
    id: "money-master",
    name: "Money Master",
    description: "Reach the Money Master rank",
    icon: "👑",
  },
];

export const RANKS: { minXp: number; name: string; next?: string }[] = [
  { minXp: 0, name: "Lab Rookie", next: "Money Apprentice at 100 XP" },
  { minXp: 100, name: "Money Apprentice", next: "Analyst at 300 XP" },
  { minXp: 300, name: "Analyst", next: "Money Master at 600 XP" },
  { minXp: 600, name: "Money Master", next: "Legend at 1000 XP" },
  { minXp: 1000, name: "Legend", next: undefined },
];

export function rankForXp(xp: number): (typeof RANKS)[number] {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) current = r;
  }
  return current;
}

export function nextRank(xp: number): (typeof RANKS)[number] | undefined {
  return RANKS.find((r) => r.minXp > xp);
}

export function getBadge(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}
