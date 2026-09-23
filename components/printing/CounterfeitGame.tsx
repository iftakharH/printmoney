"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { COUNTERFEIT_ROUNDS } from "@/lib/printing-content";
import { playTone } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";
import { NotePreview, type NoteDesign } from "@/components/designer/NotePreview";
import { Card, Badge } from "@/components/ui";

function realNote(serial: string): NoteDesign {
  return {
    region: "USD",
    denomination: 20,
    bg: "#1a3a2a",
    accent: "#00ff9d",
    ink: "#e8fff5",
    centerpiece: "portrait",
    name: "UNITED STATES NOTE",
    serial,
    features: {
      watermark: true,
      hologram: true,
      thread: true,
      colorShift: true,
      microtext: true,
      uvFibers: true,
    },
  };
}

function fakeNote(serial: string, broken: keyof NoteDesign["features"] | null): NoteDesign {
  const features = { ...realNote(serial).features };
  if (broken) features[broken] = false;
  return {
    region: "USD",
    denomination: 20,
    bg: "#1a3a2a",
    accent: "#ff4d6a",
    ink: "#e8fff5",
    centerpiece: "building",
    name: "NOT A REAL NOTE",
    serial,
    features,
  };
}

const BROKEN_BY_ROUND: Record<string, keyof NoteDesign["features"]> = {
  watermark: "watermark",
  thread: "thread",
  colorshift: "colorShift",
};

type CardKey = "A" | "B" | "C";
interface PickCard {
  key: CardKey;
  design: NoteDesign;
  fake: boolean;
}

export function CounterfeitGame() {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<CardKey | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [seed, setSeed] = useState(1);
  const soundOn = useAppStore((s) => s.soundOn);
  const unlockBadge = useAppStore((s) => s.unlockBadge);
  const addXp = useAppStore((s) => s.addXp);

  const current = COUNTERFEIT_ROUNDS[round];

  const cards: PickCard[] = useMemo(() => {
    if (!current) return [];
    const broken = BROKEN_BY_ROUND[current.id] ?? null;
    const s = String(seed).padStart(4, "0");
    const pool: PickCard[] = [
      { key: "A", design: realNote(`RA${s} 1111 AA`), fake: false },
      { key: "B", design: fakeNote(`FX${s} 6666 XX`, broken), fake: true },
      { key: "C", design: realNote(`RB${s} 2222 BB`), fake: false },
    ];
    const order = [0, 1, 2].map((i) => (i * 7919 + seed * 104729) % 17);
    const indexed = pool.map((card, i) => ({ card, k: order[i] }));
    indexed.sort((a, b) => a.k - b.k);
    return indexed.map((x) => x.card);
  }, [current, seed]);

  const choose = (card: PickCard) => {
    if (picked || !current) return;
    setPicked(card.key);
    if (card.fake) {
      setScore((s) => s + 1);
      playTone(soundOn, "coin");
      addXp(20);
    } else {
      playTone(soundOn, "fail");
    }
  };

  const lastWasCorrect = picked !== null && cards.find((c) => c.key === picked)?.fake === true;

  const next = () => {
    const isLast = round + 1 >= COUNTERFEIT_ROUNDS.length;
    const finalScore = score;
    if (isLast) {
      setFinished(true);
      if (finalScore >= 2 || lastWasCorrect) {
        if (finalScore + (lastWasCorrect && finalScore < 2 ? 1 : 0) >= 2) {
          unlockBadge("counterfeit-catcher");
        }
      }
    } else {
      setRound((r) => r + 1);
      setPicked(null);
      setSeed((s) => s + 1);
    }
  };

  const restart = () => {
    setRound(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
    setSeed((s) => s + 100);
  };

  if (finished) {
    const shown = score;
    return (
      <Card className="text-center neon-border">
        <p className="font-mono text-xs uppercase tracking-widest text-mint">Security lab complete</p>
        <p className="mt-2 text-3xl font-bold">
          {shown} / {COUNTERFEIT_ROUNDS.length}
        </p>
        <p className="mt-2 text-sm text-text-muted">
          {shown >= 2
            ? "Counterfeit Catcher unlocked — you can read a note like an inspector."
            : "Re-check watermarks, threads, and color-shift on the rounds you missed."}
        </p>
        <button type="button" onClick={restart} className="btn-primary mt-4 rounded-lg px-4 py-2 text-sm">
          Play again
        </button>
      </Card>
    );
  }

  if (!current || cards.length === 0) return null;

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-red">
              Round {round + 1} / {COUNTERFEIT_ROUNDS.length}
            </p>
            <h3 className="mt-1 text-lg font-semibold">Spot the counterfeit</h3>
          </div>
          <Badge tone="gold">Score {score}</Badge>
        </div>
        <p className="mt-3 text-sm text-text-muted">Clues for the genuine note:</p>
        <ul className="mt-1.5 space-y-1 text-sm text-text-dim">
          {current.realHints.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-mint">▸</span>
              {h}
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card, i) => {
          const isPicked = picked === card.key;
          const reveal = picked !== null;
          return (
            <motion.button
              key={`${card.key}-${seed}-${round}`}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => choose(card)}
              disabled={reveal}
              className={`rounded-xl border p-3 text-left transition-all ${
                reveal && card.fake
                  ? "border-red bg-red/10"
                  : reveal && isPicked
                    ? "border-red bg-red/5"
                    : reveal
                      ? "border-mint/40"
                      : "border-border hover:border-mint/50"
              }`}
            >
              <div className="mb-2 flex items-center justify-between font-mono text-xs">
                <span className="text-text-muted">Note {card.key}</span>
                {reveal && card.fake ? <Badge tone="red">Fake</Badge> : null}
                {reveal && isPicked && !card.fake ? <Badge tone="red">Miss</Badge> : null}
                {reveal && !card.fake && !isPicked ? <Badge tone="mint">Real</Badge> : null}
              </div>
              <div className="pointer-events-none flex justify-center">
                <NotePreview design={card.design} id={`cf-${round}-${card.key}-${seed}`} width={320} />
              </div>
            </motion.button>
          );
        })}
      </div>

      {picked ? (
        <div className="glass-card rounded-xl p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                className={`font-mono text-xs uppercase tracking-widest ${lastWasCorrect ? "text-mint" : "text-red"}`}
              >
                {lastWasCorrect ? "Correct — that's the fake" : "Nope — that one is genuine"}
              </p>
              <p className="mt-1 text-sm text-text-muted">{current.fakeExplanation}</p>
              <p className="mt-1 text-sm text-text-dim">
                Defect: <strong className="text-gold">{current.fakeFeature}</strong>
              </p>
            </div>
            <button type="button" onClick={next} className="btn-primary shrink-0 rounded-lg px-4 py-2 text-sm">
              {round + 1 >= COUNTERFEIT_ROUNDS.length ? "Finish" : "Next round →"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
