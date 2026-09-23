"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRINT_STEPS } from "@/lib/printing-content";
import { playTone } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";
import { Quiz } from "@/components/gamification/Quiz";
import type { QuizQuestion } from "@/lib/learn-content";
import { Card } from "@/components/ui";

const PIPELINE_QUIZ: QuizQuestion[] = [
  {
    q: "What gives intaglio banknotes their raised feel?",
    options: ["Glue", "Ink pressed from engravings under high pressure", "Stickers", "Lamination"],
    correct: 1,
    explain: "Intaglio forces ink out of engraved grooves — that texture is a security feature.",
  },
  {
    q: "When are security features like watermarks added?",
    options: [
      "After the note reaches your wallet",
      "During paper/polymer making and printing",
      "Only by commercial banks",
      "They're printed as普通 ink only",
    ],
    correct: 1,
    explain: "Thread & watermark are built into the substrate; UV/holograms come during printing.",
  },
  {
    q: "Why are plate serials and destruction audits important?",
    options: [
      "Decoration only",
      "To control issuance and prevent rogue printing",
      "To make drying faster",
      "To reduce paper waste",
    ],
    correct: 1,
    explain: "Controlled plates and audit trails stop unauthorized runs of genuine plates.",
  },
];

export function PrintPipeline() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);
  const soundOn = useAppStore((s) => s.soundOn);
  const current = PRINT_STEPS[step];

  const goTo = (i: number) => {
    setStep(i);
    playTone(soundOn, "print");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {PRINT_STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setAuto(false);
              goTo(i);
            }}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] transition-all ${
              i === step
                ? "border-mint bg-mint/15 text-mint neon-border"
                : i < step
                  ? "border-mint/30 text-mint/70"
                  : "border-border text-text-dim hover:border-border-bright"
            }`}
          >
            {s.id}. {s.short}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-xl border border-border bg-bg-card aspect-[16/10] guilloche-bg">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-3 font-mono text-5xl font-bold text-mint/30">
                  {String(current.id).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-text">{current.title}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-gold">{current.short}</p>
                {auto ? (
                  <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-border">
                    <motion.div
                      key={`auto-${current.id}`}
                      className="h-full bg-mint"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4.5, ease: "linear" }}
                      onAnimationComplete={() => {
                        if (step < PRINT_STEPS.length - 1) goTo(step + 1);
                        else setAuto(false);
                      }}
                    />
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-3 left-3 right-3 flex justify-between font-mono text-[10px] text-text-dim">
              <span>Step {current.id} / {PRINT_STEPS.length}</span>
              <span>{current.fact.slice(0, 48)}…</span>
            </div>
          </div>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-text">{current.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{current.body}</p>
          <div className="mt-4 rounded-lg border border-gold/30 bg-gold/5 p-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-gold">Field note</p>
            <p className="mt-1 text-sm text-text-muted">{current.fact}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-ghost rounded-lg px-3 py-2 text-sm disabled:opacity-40"
              disabled={step === 0}
              onClick={() => goTo(step - 1)}
            >
              ← Back
            </button>
            <button
              type="button"
              className="btn-primary rounded-lg px-3 py-2 text-sm disabled:opacity-40"
              disabled={step >= PRINT_STEPS.length - 1}
              onClick={() => goTo(step + 1)}
            >
              Next step →
            </button>
            <button
              type="button"
              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                auto ? "border-mint text-mint" : "border-border text-text-muted"
              }`}
              onClick={() => {
                setAuto((v) => !v);
                if (!auto && step >= PRINT_STEPS.length - 1) setStep(0);
                playTone(soundOn, "click");
              }}
            >
              {auto ? "⏸ Pause" : "▶ Auto-play"}
            </button>
          </div>
        </Card>
      </div>

      <div>
        <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-mint">Checkpoint quiz · Press Pro</h3>
        <Quiz quizId="press-pro" questions={PIPELINE_QUIZ} badgeId="press-pro" />
      </div>
    </div>
  );
}
