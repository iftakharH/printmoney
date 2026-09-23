"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getBadge } from "@/lib/badges";
import { playTone } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";

export function BadgeUnlockToast() {
  const lastUnlock = useAppStore((s) => s.lastUnlock);
  const clear = useAppStore((s) => s.clearLastUnlock);
  const soundOn = useAppStore((s) => s.soundOn);

  useEffect(() => {
    if (!lastUnlock) return;
    playTone(soundOn, "success");
    const t = setTimeout(clear, 4200);
    return () => clearTimeout(t);
  }, [lastUnlock, clear, soundOn]);

  const badge = lastUnlock ? getBadge(lastUnlock) : undefined;

  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-[55] sm:bottom-6">
      <AnimatePresence>
        {badge ? (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            className="glass-card neon-border flex items-center gap-3 rounded-xl px-4 py-3 shadow-2xl"
          >
            <span className="text-2xl" aria-hidden>
              {badge.icon}
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold">Badge unlocked</p>
              <p className="text-sm font-semibold text-text">{badge.name}</p>
              <p className="text-xs text-text-muted">{badge.description}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
