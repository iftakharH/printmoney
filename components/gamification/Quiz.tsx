"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/learn-content";
import { playTone } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";

interface Props {
  quizId: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
  badgeId?: string;
  xpPerCorrect?: number;
}

export function Quiz({ quizId, questions, onComplete, badgeId, xpPerCorrect = 15 }: Props) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const soundOn = useAppStore((s) => s.soundOn);
  const addXp = useAppStore((s) => s.addXp);
  const unlockBadge = useAppStore((s) => s.unlockBadge);
  const setQuizScore = useAppStore((s) => s.setQuizScore);

  const q = questions[idx];
  const total = questions.length;

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === q.correct;
    if (correct) {
      setScore((s) => s + 1);
      playTone(soundOn, "coin");
      addXp(xpPerCorrect);
    } else {
      playTone(soundOn, "fail");
    }
  };

  const next = () => {
    const finalScore = picked === q.correct ? score : score;
    if (idx + 1 >= total) {
      setDone(true);
      setQuizScore(quizId, finalScore);
      if (badgeId) unlockBadge(badgeId);
      playTone(soundOn, "success");
      onComplete?.(finalScore, total);
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIdx(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const perfect = score === total;
    return (
      <div className="glass-card rounded-xl p-6 text-center neon-border">
        <p className="font-mono text-xs uppercase tracking-widest text-mint">Quiz complete</p>
        <p className="mt-2 text-3xl font-bold text-text">
          {score} / {total}
        </p>
        <p className="mt-2 text-sm text-text-muted">
          {perfect
            ? "Flawless. You're running the lab like a pro."
            : score >= total * 0.7
              ? "Solid pass — review the misses and you're golden."
              : "Worth another run. The lessons above have the answers."}
        </p>
        <button type="button" onClick={restart} className="btn-primary mt-4 rounded-lg px-4 py-2 text-sm">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] text-text-dim">
        <span>
          Question {idx + 1} / {total}
        </span>
        <span className="text-mint">Score {score}</span>
      </div>
      <div className="mb-4 h-1 overflow-hidden rounded-full bg-border">
        <div
          className="h-full bg-gradient-to-r from-mint-dim to-mint transition-all"
          style={{ width: `${((idx + (picked !== null ? 1 : 0)) / total) * 100}%` }}
        />
      </div>
      <p className="mb-4 text-base font-medium text-text sm:text-lg">{q.q}</p>
      <div className="grid gap-2">
        {q.options.map((opt, i) => {
          const state =
            picked === null
              ? "idle"
              : i === q.correct
                ? "correct"
                : i === picked
                  ? "wrong"
                  : "dim";
          return (
            <button
              key={opt}
              type="button"
              onClick={() => pick(i)}
              disabled={picked !== null}
              className={`rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                state === "idle"
                  ? "border-border hover:border-mint/50 hover:bg-mint/5"
                  : state === "correct"
                    ? "border-mint bg-mint/15 text-mint"
                    : state === "wrong"
                      ? "border-red bg-red/10 text-red"
                      : "border-border opacity-50"
              }`}
            >
              <span className="mr-2 font-mono text-xs opacity-60">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null ? (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">{q.explain}</p>
          <button type="button" onClick={next} className="btn-primary shrink-0 rounded-lg px-4 py-2 text-sm">
            {idx + 1 >= total ? "See results" : "Next"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
