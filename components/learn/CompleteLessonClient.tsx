"use client";

import { useEffect } from "react";
import { playTone } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";

export function CompleteLessonClient({ id, xp }: { id: string; xp: number }) {
  const hydrated = useAppStore((s) => s.hydrated);
  const done = useAppStore((s) => s.lessonsDone.includes(id));
  const completeLesson = useAppStore((s) => s.completeLesson);
  const addXp = useAppStore((s) => s.addXp);
  const soundOn = useAppStore((s) => s.soundOn);

  const mark = () => {
    if (done) return;
    completeLesson(id);
    addXp(xp);
    playTone(soundOn, "success");
  };

  useEffect(() => {
    // auto-open handled by details
  }, []);

  if (!hydrated) {
    return <p className="mt-2 text-xs text-text-dim">Loading…</p>;
  }

  return (
    <div className="mt-3">
      <button type="button" onClick={mark} disabled={done} className="btn-primary rounded-lg px-4 py-2 text-sm disabled:opacity-50">
        {done ? "✓ Completed" : `Complete lesson (+${xp} XP)`}
      </button>
    </div>
  );
}
