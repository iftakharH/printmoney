"use client";

import { useAppStore } from "@/store/useAppStore";
import { rankForXp, nextRank, BADGES } from "@/lib/badges";
import { LESSONS } from "@/lib/learn-content";
import { Card } from "@/components/ui";

export function LearnProgress() {
  const hydrated = useAppStore((s) => s.hydrated);
  const xp = useAppStore((s) => s.xp);
  const lessonsDone = useAppStore((s) => s.lessonsDone);
  const badges = useAppStore((s) => s.badges);
  const quizScores = useAppStore((s) => s.quizScores);

  const rank = rankForXp(xp);
  const nxt = nextRank(xp);
  const progress = nxt ? Math.min(100, ((xp - rank.minXp) / (nxt.minXp - rank.minXp)) * 100) : 100;
  const litScore = quizScores["literacy"];
  const filteredLessons = LESSONS.filter((l) => l.id !== "designer");

  if (!hydrated) {
    return (
      <Card>
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim">Your progress</p>
        <p className="mt-2 text-sm text-text-dim">Loading store…</p>
      </Card>
    );
  }

  return (
    <Card>
      <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim">Your progress</p>
      <p className="mt-2 text-lg font-semibold text-mint">
        {rank.name} · {xp} XP
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
        <div className="h-full rounded-full bg-gradient-to-r from-mint-dim to-mint" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-1 text-xs text-text-dim">{nxt ? nxt.next ?? "Max rank" : "Max rank"}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded border border-border p-2">
          <span className="text-text-dim">Lessons</span>
          <p className="font-mono text-mint">
            {lessonsDone.filter((l) => filteredLessons.some((f) => f.id === l)).length}/{filteredLessons.length}
          </p>
        </div>
        <div className="rounded border border-border p-2">
          <span className="text-text-dim">Badges</span>
          <p className="font-mono text-gold">
            {badges.length}/{BADGES.length}
          </p>
        </div>
        <div className="rounded border border-border p-2 col-span-2">
          <span className="text-text-dim">Literacy quiz best</span>
          <p className="font-mono text-mint">{litScore != null ? `${litScore}/10` : "—"}</p>
        </div>
      </div>
    </Card>
  );
}
