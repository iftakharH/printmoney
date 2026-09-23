"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { rankForXp, BADGES } from "@/lib/badges";
import { SITE_NAME } from "@/lib/site";
import { playTone } from "@/lib/audio";
import { Card } from "@/components/ui";

export function ShareCard() {
  const hydrated = useAppStore((s) => s.hydrated);
  const xp = useAppStore((s) => s.xp);
  const badges = useAppStore((s) => s.badges);
  const soundOn = useAppStore((s) => s.soundOn);
  const [busy, setBusy] = useState(false);

  if (!hydrated) {
    return (
      <Card>
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-dim">Share card</p>
        <p className="mt-2 text-sm text-text-dim">Loading…</p>
      </Card>
    );
  }

  const rank = rankForXp(xp);

  const download = async () => {
    setBusy(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const grad = ctx.createLinearGradient(0, 0, 1200, 630);
      grad.addColorStop(0, "#050807");
      grad.addColorStop(1, "#0a1f16");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 630);

      ctx.strokeStyle = "#00ff9d";
      ctx.lineWidth = 4;
      ctx.strokeRect(24, 24, 1152, 582);

      ctx.fillStyle = "#00ff9d";
      ctx.font = "bold 36px monospace";
      ctx.fillText(SITE_NAME.toUpperCase(), 64, 100);

      ctx.fillStyle = "#8fb5a6";
      ctx.font = "24px sans-serif";
      ctx.fillText("Money Lab · Achievement Card", 64, 145);

      ctx.fillStyle = "#ffd700";
      ctx.font = "bold 64px sans-serif";
      ctx.fillText(rank.name, 64, 250);

      ctx.fillStyle = "#e8fff5";
      ctx.font = "48px monospace";
      ctx.fillText(`${xp} XP`, 64, 330);

      ctx.fillStyle = "#8fb5a6";
      ctx.font = "28px sans-serif";
      ctx.fillText(`Badges: ${badges.length} / ${BADGES.length}`, 64, 400);

      let x = 64;
      let y = 470;
      for (const id of badges) {
        const b = BADGES.find((d) => d.id === id);
        if (!b) continue;
        const label = `${b.icon} ${b.name}`;
        ctx.font = "22px sans-serif";
        const w = ctx.measureText(label).width + 24;
        if (x + w > 1130) {
          x = 64;
          y += 48;
        }
        ctx.fillStyle = "rgba(0,255,157,0.12)";
        ctx.strokeStyle = "rgba(0,255,157,0.45)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y - 28, w, 40, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#e8fff5";
        ctx.fillText(label, x + 12, y);
        x += w + 12;
      }

      ctx.fillStyle = "#5a7d70";
      ctx.font = "20px monospace";
      ctx.fillText("Educational only · Not financial advice", 64, 590);

      canvas.toBlob((blob) => {
        if (blob) {
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = `printmoney-${rank.name.toLowerCase().replace(/\s+/g, "-")}.png`;
          a.click();
          setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        }
        setBusy(false);
      }, "image/png");
      playTone(soundOn, "success");
    } catch {
      setBusy(false);
    }
  };

  return (
    <Card>
      <p className="font-mono text-[10px] uppercase tracking-widest text-gold">Share card</p>
      <p className="mt-1 text-sm text-text-muted">
        Export your rank + badges as a PNG to share.
      </p>
      <button
        type="button"
        onClick={download}
        disabled={busy}
        className="btn-primary mt-3 rounded-lg px-4 py-2 text-sm disabled:opacity-50"
      >
        {busy ? "Rendering…" : "Download achievement PNG"}
      </button>
    </Card>
  );
}
