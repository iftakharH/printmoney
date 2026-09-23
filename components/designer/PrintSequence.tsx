"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotePreview, type NoteDesign } from "./NotePreview";

export type PrintPhase = "idle" | "printing" | "done";

const PHASES = [
  { id: "feed", label: "Feeding sheet", dur: 700 },
  { id: "offset", label: "Offset pass", dur: 900 },
  { id: "intaglio", label: "Intaglio stamp", dur: 900 },
  { id: "serial", label: "Serial head", dur: 700 },
  { id: "uv", label: "UV scan", dur: 800 },
  { id: "cut", label: "Cutter", dur: 700 },
  { id: "eject", label: "Eject", dur: 600 },
] as const;

export function PrintSequence({
  design,
  onComplete,
  onSkip,
}: {
  design: NoteDesign;
  onComplete: () => void;
  onSkip?: () => void;
}) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (done) return;
    const phase = PHASES[phaseIdx];
    if (!phase) return;
    timer.current = setTimeout(() => {
      if (phaseIdx >= PHASES.length - 1) {
        setDone(true);
        onComplete();
      } else {
        setPhaseIdx((i) => i + 1);
      }
    }, phase.dur);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [phaseIdx, done, onComplete]);

  const skip = () => {
    if (timer.current) clearTimeout(timer.current);
    setDone(true);
    setPhaseIdx(PHASES.length);
    onComplete();
    onSkip?.();
  };

  const label = done ? "Note complete" : PHASES[phaseIdx]?.label ?? "Done";

  return (
    <div className="relative overflow-hidden rounded-xl border border-mint/40 bg-bg-elevated p-6 neon-border">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-mint">Press running…</p>
        <button type="button" onClick={skip} className="btn-ghost rounded px-2 py-1 text-xs">
          Skip →
        </button>
      </div>

      <div className="relative mx-auto max-w-[640px]">
        <div className="absolute inset-x-0 top-0 z-10 h-8 overflow-hidden pointer-events-none">
          <motion.div
            className="h-full w-full bg-gradient-to-b from-mint/0 via-mint/40 to-mint/0"
            animate={{ y: [-40, 320] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative flex justify-center">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="rounded-lg shadow-[0_0_40px_rgba(0,255,157,0.25)]"
              >
                <NotePreview design={design} id="print-out" width={630} />
              </motion.div>
            ) : (
              <motion.div
                key="rolling"
                className="w-full overflow-hidden rounded-lg opacity-90"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
                    <div className="h-1 w-3/4 bg-border relative overflow-hidden rounded">
                      <div
                        className="h-full bg-mint transition-all duration-500"
                        style={{ width: `${((phaseIdx + 1) / PHASES.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="blur-[2px] saturate-50">
                    <NotePreview design={design} id="print-roll" width={630} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          {PHASES.map((p, i) => (
            <span
              key={p.id}
              className={`h-1.5 rounded-full transition-all ${
                done || i < phaseIdx ? "w-6 bg-mint" : i === phaseIdx ? "w-8 bg-gold" : "w-4 bg-border"
              }`}
            />
          ))}
        </div>
        <p className="mt-3 text-center font-mono text-xs text-text-muted">{label}</p>

        {["offset", "intaglio", "serial", "uv", "cut"].includes(PHASES[phaseIdx]?.id ?? "") ? (
          <div className="pointer-events-none absolute inset-x-8 top-8 bottom-16">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`${PHASES[phaseIdx].id}-${i}`}
                className="absolute h-0.5 rounded bg-mint/60"
                style={{ top: `${25 + i * 30}%`, left: 0, right: 0 }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 0.7, delay: i * 0.12, repeat: 1 }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
