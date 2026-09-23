import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrencyCode } from "@/lib/regions";
import { detectRegion } from "@/lib/regions";
import { rankForXp } from "@/lib/badges";

interface AppState {
  region: CurrencyCode;
  xp: number;
  badges: string[];
  lessonsDone: string[];
  quizScores: Record<string, number>;
  currenciesUsed: CurrencyCode[];
  soundOn: boolean;
  onboarded: boolean;
  hydrated: boolean;
  lastUnlock: string | null;
  setRegion: (c: CurrencyCode) => void;
  addXp: (amount: number) => void;
  unlockBadge: (id: string) => void;
  completeLesson: (id: string) => void;
  setQuizScore: (id: string, score: number) => void;
  markCurrencyUsed: (c: CurrencyCode) => void;
  toggleSound: () => void;
  finishOnboarding: () => void;
  clearLastUnlock: () => void;
  setHydrated: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      region: "USD",
      xp: 0,
      badges: [],
      lessonsDone: [],
      quizScores: {},
      currenciesUsed: [],
      soundOn: false,
      onboarded: false,
      hydrated: false,
      lastUnlock: null,

      setRegion: (c) => set({ region: c }),

      addXp: (amount) => {
        if (amount <= 0) return;
        const prev = get().xp;
        const xp = prev + amount;
        const badges = [...get().badges];
        let lastUnlock = get().lastUnlock;
        if (rankForXp(xp).name === "Money Master" && !badges.includes("money-master")) {
          badges.push("money-master");
          lastUnlock = "money-master";
        }
        set({ xp, badges, lastUnlock: lastUnlock ?? null });
      },

      unlockBadge: (id) => {
        if (get().badges.includes(id)) return;
        set({ badges: [...get().badges, id], lastUnlock: id });
      },

      completeLesson: (id) => {
        if (get().lessonsDone.includes(id)) return;
        set({ lessonsDone: [...get().lessonsDone, id] });
      },

      setQuizScore: (id, score) => {
        set({ quizScores: { ...get().quizScores, [id]: Math.max(score, get().quizScores[id] ?? 0) } });
      },

      markCurrencyUsed: (c) => {
        const used = get().currenciesUsed;
        if (used.includes(c)) return;
        const currenciesUsed = [...used, c];
        const badges = [...get().badges];
        let lastUnlock = get().lastUnlock;
        if (currenciesUsed.length >= 5 && !badges.includes("world-currencies")) {
          badges.push("world-currencies");
          lastUnlock = "world-currencies";
        }
        set({ currenciesUsed, badges, lastUnlock: lastUnlock ?? null });
      },

      toggleSound: () => set({ soundOn: !get().soundOn }),

      finishOnboarding: () => set({ onboarded: true }),

      clearLastUnlock: () => set({ lastUnlock: null }),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "printmoney-store",
      partialize: (s) => ({
        region: s.region,
        xp: s.xp,
        badges: s.badges,
        lessonsDone: s.lessonsDone,
        quizScores: s.quizScores,
        currenciesUsed: s.currenciesUsed,
        soundOn: s.soundOn,
        onboarded: s.onboarded,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
          if (typeof navigator !== "undefined" && !localStorage.getItem("printmoney-region-set")) {
            state.setRegion(detectRegion());
          }
        }
      },
    }
  )
);

export function useRegion(): CurrencyCode {
  return useAppStore((s) => s.region);
}
