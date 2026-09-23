"use client";

import { useRef, useState } from "react";
import { CURRENCY_CODES, REGIONS } from "@/lib/regions";
import { randomSerial, playTone } from "@/lib/audio";
import { useAppStore } from "@/store/useAppStore";
import { Card, Badge } from "@/components/ui";
import {
  NotePreview,
  CENTERPIECES,
  PRESET_PALETTES,
  type NoteDesign,
} from "./NotePreview";
import { PrintSequence, type PrintPhase } from "./PrintSequence";

const STEPS = ["Region", "Denomination", "Colors", "Centerpiece", "Security", "Finish"] as const;

function defaultDesign(region: NoteDesign["region"]): NoteDesign {
  const r = REGIONS[region];
  return {
    region,
    denomination: r.denominations[Math.min(2, r.denominations.length - 1)],
    bg: r.colorPrimary,
    accent: r.colorAccent,
    ink: "#e8fff5",
    centerpiece: "portrait",
    name: "",
    serial: randomSerial(),
    features: {
      watermark: true,
      hologram: true,
      thread: true,
      colorShift: true,
      microtext: false,
      uvFibers: true,
    },
  };
}

const FEATURE_META: { key: keyof NoteDesign["features"]; label: string; xp: number }[] = [
  { key: "watermark", label: "Watermark", xp: 0 },
  { key: "hologram", label: "Hologram", xp: 0 },
  { key: "thread", label: "Security thread", xp: 0 },
  { key: "colorShift", label: "Color-shift ink", xp: 0 },
  { key: "microtext", label: "Microtext", xp: 0 },
  { key: "uvFibers", label: "UV fibers", xp: 0 },
];

export function BanknoteDesigner() {
  const [step, setStep] = useState(0);
  const [design, setDesign] = useState<NoteDesign>(() => defaultDesign("USD"));
  const [phase, setPhase] = useState<PrintPhase>("idle");
  const svgHostRef = useRef<HTMLDivElement>(null);
  const soundOn = useAppStore((s) => s.soundOn);
  const unlockBadge = useAppStore((s) => s.unlockBadge);
  const addXp = useAppStore((s) => s.addXp);
  const completeLesson = useAppStore((s) => s.completeLesson);

  const update = (patch: Partial<NoteDesign>) => setDesign((d) => ({ ...d, ...patch }));

  const startPrint = () => {
    setPhase("printing");
    playTone(soundOn, "print");
  };

  const onPrintDone = () => {
    setPhase("done");
    unlockBadge("ink-master");
    completeLesson("designer");
    addXp(50);
    playTone(soundOn, "success");
  };

  const downloadPng = async () => {
    const svg = svgHostRef.current?.querySelector("svg");
    if (!svg) return;
    const clone = svg.cloneNode(true) as SVGElement;
    clone.setAttribute("width", "1260");
    clone.setAttribute("height", "600");
    const xml = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1260;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#050807";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((b) => {
          if (b) {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.download = `printmoney-${design.region}-${design.denomination}.png`;
            a.click();
            setTimeout(() => URL.revokeObjectURL(a.href), 2000);
          }
        }, "image/png");
      }
      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  const region = REGIONS[design.region];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {STEPS.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(i)}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] transition-all ${
              i === step
                ? "border-gold bg-gold/10 text-gold"
                : i < step
                  ? "border-gold/30 text-gold/70"
                  : "border-border text-text-dim"
            }`}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          <div ref={svgHostRef} className="flex justify-center rounded-xl border border-border bg-bg-card p-4 guilloche-bg">
            <NotePreview design={design} id="designer-note" width={630} />
          </div>

          {phase === "printing" || phase === "done" ? (
            phase === "printing" ? (
              <PrintSequence design={design} onComplete={onPrintDone} />
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-mint/40 bg-mint/5 p-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-mint">Print complete</p>
                  <p className="text-sm text-text-muted">
                    Badge unlocked: Ink Master · +50 XP
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={downloadPng} className="btn-primary rounded-lg px-4 py-2 text-sm">
                    Download PNG
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      update({ serial: randomSerial() });
                      setPhase("idle");
                      setStep(0);
                    }}
                    className="btn-ghost rounded-lg px-4 py-2 text-sm"
                  >
                    Print another
                  </button>
                </div>
              </div>
            )
          ) : (
            <button type="button" onClick={startPrint} className="btn-primary w-full rounded-xl py-3 text-base">
              ⏵ Send to press
            </button>
          )}
        </div>

        <div className="lg:col-span-2">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">
                Step {step + 1} / {STEPS.length} · {STEPS[step]}
              </p>
              {phase === "idle" ? <Badge tone="muted">Draft</Badge> : <Badge tone="mint">Printing</Badge>}
            </div>

            {step === 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {CURRENCY_CODES.map((c) => {
                  const r = REGIONS[c];
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        const next = defaultDesign(c);
                        next.centerpiece = design.centerpiece;
                        next.name = design.name;
                        setDesign(next);
                        playTone(soundOn, "click");
                      }}
                      className={`rounded-lg border p-3 text-left transition-all ${
                        design.region === c ? "border-mint bg-mint/10" : "border-border hover:border-border-bright"
                      }`}
                    >
                      <span className="text-lg" aria-hidden>
                        {r.flag}
                      </span>
                      <span className="mt-1 block font-mono text-xs text-text">{c}</span>
                      <span className="block text-[10px] text-text-dim">{r.centralBank}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {step === 1 ? (
              <div className="flex flex-wrap gap-2">
                {region.denominations.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => update({ denomination: d })}
                    className={`rounded-lg border px-4 py-2 font-mono text-sm ${
                      design.denomination === d ? "border-gold bg-gold/10 text-gold" : "border-border text-text-muted"
                    }`}
                  >
                    {region.symbol}
                    {d}
                  </button>
                ))}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {PRESET_PALETTES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => update({ bg: p.bg, accent: p.accent, ink: p.ink })}
                      className="rounded-lg border border-border p-2 text-left hover:border-border-bright"
                    >
                      <span className="mb-1 flex gap-1">
                        <span className="h-4 w-4 rounded" style={{ background: p.bg }} />
                        <span className="h-4 w-4 rounded" style={{ background: p.accent }} />
                        <span className="h-4 w-4 rounded" style={{ background: p.ink }} />
                      </span>
                      <span className="text-[10px] text-text-muted">{p.label}</span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      ["bg", "Background"],
                      ["accent", "Accent"],
                      ["ink", "Ink"],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className="text-xs text-text-muted">
                      {label}
                      <input
                        type="color"
                        value={design[key]}
                        onChange={(e) => update({ [key]: e.target.value } as Partial<NoteDesign>)}
                        className="mt-1 h-8 w-full cursor-pointer rounded border border-border bg-transparent"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {CENTERPIECES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => update({ centerpiece: c.id })}
                    className={`rounded-lg border px-3 py-3 text-sm ${
                      design.centerpiece === c.id ? "border-mint bg-mint/10 text-mint" : "border-border text-text-muted"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-2">
                {FEATURE_META.map((f) => (
                  <label
                    key={f.key}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm hover:border-border-bright"
                  >
                    <span className="text-text-muted">{f.label}</span>
                    <input
                      type="checkbox"
                      checked={design.features[f.key]}
                      onChange={(e) =>
                        update({
                          features: { ...design.features, [f.key]: e.target.checked },
                        })
                      }
                      className="h-4 w-4 accent-[#00ff9d]"
                    />
                  </label>
                ))}
                <p className="text-xs text-text-dim">
                  Real notes combine all of these — more layers make counterfeiting harder.
                </p>
              </div>
            ) : null}

            {step === 5 ? (
              <div className="space-y-3">
                <label className="block text-xs text-text-muted">
                  Issuer / name line
                  <input
                    type="text"
                    maxLength={40}
                    value={design.name}
                    onChange={(e) => update({ name: e.target.value })}
                    placeholder="Your name or title"
                    className="mt-1 w-full rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-mint focus:outline-none"
                  />
                </label>
                <label className="block text-xs text-text-muted">
                  Serial number
                  <div className="mt-1 flex gap-2">
                    <input
                      type="text"
                      value={design.serial}
                      onChange={(e) => update({ serial: e.target.value.toUpperCase() })}
                      className="w-full rounded-lg border border-border bg-bg-elevated px-3 py-2 font-mono text-sm text-text focus:border-mint focus:outline-none"
                    />
                    <button
                      type="button"
                      type-button=""
                      onClick={() => update({ serial: randomSerial() })}
                      className="btn-ghost rounded-lg px-3 text-sm"
                    >
                      🎲
                    </button>
                  </div>
                </label>
                <div className="rounded-lg border border-gold/30 bg-gold/5 p-3 text-xs text-text-muted">
                  Educational novelty only. This is not legal tender and cannot be used as money.
                </div>
              </div>
            ) : null}

            <div className="mt-5 flex justify-between">
              <button
                type="button"
                className="btn-ghost rounded-lg px-3 py-2 text-sm disabled:opacity-40"
                disabled={step === 0}
                onClick={() => setStep((s) => s - 1)}
              >
                ← Prev
              </button>
              <button
                type="button"
                className="btn-primary rounded-lg px-3 py-2 text-sm disabled:opacity-40"
                disabled={step >= STEPS.length - 1}
                onClick={() => setStep((s) => s + 1)}
              >
                Next →
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
