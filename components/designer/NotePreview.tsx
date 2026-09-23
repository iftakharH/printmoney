"use client";

import { useMemo } from "react";
import type { CurrencyCode } from "@/lib/regions";
import { REGIONS } from "@/lib/regions";

export interface NoteDesign {
  region: CurrencyCode;
  denomination: number;
  bg: string;
  accent: string;
  ink: string;
  centerpiece: string;
  name: string;
  serial: string;
  features: {
    watermark: boolean;
    hologram: boolean;
    thread: boolean;
    colorShift: boolean;
    microtext: boolean;
    uvFibers: boolean;
  };
}

export const CENTERPIECES = [
  { id: "eagle", label: "Eagle" },
  { id: "building", label: "Capitol" },
  { id: "bridge", label: "Bridge" },
  { id: "portrait", label: "Portrait" },
  { id: "animal", label: "Wildlife" },
  { id: "ship", label: "Ship" },
];

export const PRESET_PALETTES = [
  { id: "mint", label: "Neon mint", bg: "#0a2e1f", accent: "#00ff9d", ink: "#e8fff5" },
  { id: "gold", label: "Vault gold", bg: "#2a2208", accent: "#ffd700", ink: "#fff8d6" },
  { id: "ocean", label: "Deep ocean", bg: "#0a1a2e", accent: "#38bdf8", ink: "#e0f2fe" },
  { id: "violet", label: "Royal violet", bg: "#1a0a2e", accent: "#c084fc", ink: "#f3e8ff" },
  { id: "crimson", label: "Crimson", bg: "#2e0a12", accent: "#ff4d6a", ink: "#ffe4e8" },
];

export function guillochePath(rings: number, amp: number, freq: number, cx: number, cy: number): string {
  const pts: string[] = [];
  const steps = 240;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r =
      rings +
      amp * Math.sin(freq * t) +
      (amp * 0.4) * Math.cos((freq + 3) * t);
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t) * 0.55;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ") + " Z";
}

function CenterpieceArt({ id, color }: { id: string; color: string }) {
  switch (id) {
    case "eagle":
      return (
        <g stroke={color} fill="none" strokeWidth="1.5">
          <path d="M40 70 Q70 40 100 70 Q70 55 40 70" fill={color} opacity="0.85" />
          <path d="M40 70 Q55 95 70 75 Q55 85 45 72" />
          <circle cx="88" cy="58" r="5" fill={color} />
          <path d="M70 75 L70 100 M60 100 L70 92 L80 100" />
        </g>
      );
    case "building":
      return (
        <g stroke={color} fill="none" strokeWidth="1.5">
          <path d="M30 100 L100 100" />
          <path d="M40 100 L40 70 L90 70 L90 100" fill={color} fillOpacity="0.15" />
          <path d="M40 70 L65 48 L90 70" />
          <rect x="55" y="78" width="20" height="22" fill={color} fillOpacity="0.3" />
          <path d="M48 78 v-8 M75 78 v-8 M65 48 v-12" />
        </g>
      );
    case "bridge":
      return (
        <g stroke={color} fill="none" strokeWidth="1.5">
          <path d="M25 95 Q65 40 105 95" />
          <path d="M25 85 H105" />
          <path d="M40 85 V70 M55 85 V58 M65 85 V55 M75 85 V58 M90 85 V70" />
          <path d="M25 100 H105" strokeWidth="2" />
        </g>
      );
    case "portrait":
      return (
        <g stroke={color} fill="none" strokeWidth="1.5">
          <ellipse cx="65" cy="55" rx="22" ry="28" fill={color} fillOpacity="0.12" />
          <path d="M40 105 Q42 78 65 78 Q88 78 90 105" fill={color} fillOpacity="0.2" />
          <circle cx="57" cy="52" r="2.5" fill={color} />
          <circle cx="73" cy="52" r="2.5" fill={color} />
          <path d="M58 66 Q65 70 72 66" />
          <path d="M48 40 Q65 28 82 40" />
        </g>
      );
    case "animal":
      return (
        <g stroke={color} fill="none" strokeWidth="1.5">
          <path d="M35 90 Q50 55 75 60 Q100 65 95 90" fill={color} fillOpacity="0.12" />
          <path d="M75 60 L85 42 L90 58" fill={color} fillOpacity="0.4" />
          <path d="M60 62 L55 45 L68 58" fill={color} fillOpacity="0.4" />
          <circle cx="70" cy="68" r="3" fill={color} />
          <path d="M45 90 V105 M55 90 V105 M80 90 V105 M90 90 V105" />
        </g>
      );
    case "ship":
      return (
        <g stroke={color} fill="none" strokeWidth="1.5">
          <path d="M30 95 Q65 105 100 95 L90 80 H40 Z" fill={color} fillOpacity="0.2" />
          <path d="M65 80 V40" />
          <path d="M65 45 L95 70 H65 Z" fill={color} fillOpacity="0.35" />
          <path d="M65 50 L38 72 H65 Z" fill={color} fillOpacity="0.25" />
          <path d="M30 105 Q45 100 55 105 Q70 110 85 105 Q95 101 105 105" />
        </g>
      );
    default:
      return null;
  }
}

export function NotePreview({
  design,
  id,
  width = 630,
}: {
  design: NoteDesign;
  id?: string;
  width?: number;
}) {
  const region = REGIONS[design.region];
  const paths = useMemo(() => {
    return [55, 40, 28].map((r, i) => guillochePath(r, 8 + i * 2, 6 + i, 315, 150));
  }, []);

  const holoOn = design.features.hologram;
  const threadOn = design.features.thread;
  const watermarkOn = design.features.watermark;
  const uvOn = design.features.uvFibers;
  const microOn = design.features.microtext;
  const shiftOn = design.features.colorShift;

  return (
    <svg
      id={id}
      viewBox="0 0 630 300"
      width={width}
      height={(width / 630) * 300}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Custom ${design.denomination} ${design.region} banknote`}
      style={{ maxWidth: "100%", height: "auto", borderRadius: 8 }}
    >
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={design.bg} />
          <stop offset="100%" stopColor="#050807" />
        </linearGradient>
        <linearGradient id={`shift-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={design.accent} />
          <stop offset="100%" stopColor={design.ink} />
        </linearGradient>
        <pattern id={`micro-${id}`} width="40" height="8" patternUnits="userSpaceOnUse">
          <text x="0" y="6" fontSize="5" fill={design.accent} opacity="0.5" fontFamily="monospace">
            SECURE•{design.region}•LAB•
          </text>
        </pattern>
      </defs>

      <rect width="630" height="300" rx="10" fill={`url(#grad-${id})`} />
      <rect x="6" y="6" width="618" height="288" rx="7" fill="none" stroke={design.accent} strokeOpacity="0.45" strokeWidth="2" />
      <rect x="12" y="12" width="606" height="276" rx="5" fill="none" stroke={design.accent} strokeOpacity="0.2" strokeWidth="1" />

      <g opacity="0.35" stroke={design.accent} fill="none" strokeWidth="0.6">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
        <path d={guillochePath(48, 6, 9, 120, 150)} />
        <path d={guillochePath(35, 5, 7, 510, 150)} />
      </g>

      {threadOn ? (
        <g>
          <rect x="312" y="14" width="5" height="272" fill={design.accent} opacity="0.35" />
          <rect x="313" y="20" width="3" height="14" fill={design.ink} opacity="0.7" rx="1" />
          <rect x="313" y="50" width="3" height="14" fill={design.ink} opacity="0.7" rx="1" />
          <rect x="313" y="80" width="3" height="14" fill={design.ink} opacity="0.7" rx="1" />
        </g>
      ) : null}

      {watermarkOn ? (
        <g opacity="0.18">
          <ellipse cx="520" cy="150" rx="55" ry="70" fill={design.ink} />
          <ellipse cx="520" cy="140" rx="32" ry="38" fill={design.bg} />
        </g>
      ) : null}

      <g transform="translate(70,70)">
        <CenterpieceArt id={design.centerpiece} color={design.accent} />
      </g>

      <text x="36" y="36" fill={design.accent} fontSize="11" fontFamily="monospace" letterSpacing="3">
        {region.issuerLine}
      </text>
      <text x="36" y="54" fill={design.ink} fontSize="9" fontFamily="monospace" opacity="0.7">
        {region.centralBank} · MONEY LAB ISSUE
      </text>

      <text x="480" y="48" fill={shiftOn ? `url(#shift-${id})` : design.accent} fontSize="48" fontWeight="700" fontFamily="monospace" textAnchor="middle">
        {region.symbol}
        {design.denomination}
      </text>
      <text x="60" y="260" fill={design.ink} fontSize="40" fontWeight="700" fontFamily="monospace" opacity="0.95">
        {region.symbol}
        {design.denomination}
      </text>
      <text x="540" y="260" fill={design.ink} fontSize="40" fontWeight="700" fontFamily="monospace" textAnchor="middle" opacity="0.95">
        {region.symbol}
        {design.denomination}
      </text>

      <text x="315" y="278" fill={design.ink} fontSize="12" fontFamily="monospace" textAnchor="middle" opacity="0.85">
        {design.serial}
      </text>
      <text x="315" y="230" fill={design.ink} fontSize="11" fontFamily="sans-serif" textAnchor="middle" opacity="0.75" fontStyle="italic">
        {design.name || "FOR EDUCATION ONLY"}
      </text>

      {holoOn ? (
        <g transform="translate(250,40)">
          <rect width="70" height="110" rx="6" fill="#000" opacity="0.35" />
          <rect x="4" y="4" width="62" height="102" rx="4" fill={`url(#shift-${id})`} opacity="0.55" />
          <text x="35" y="50" fill="#050807" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            HOLO
          </text>
          <text x="35" y="70" fill="#050807" fontSize="10" textAnchor="middle" fontFamily="monospace">
            {region.code}
          </text>
          <path d="M10 85 Q35 70 60 85" stroke="#050807" fill="none" strokeWidth="2" />
        </g>
      ) : null}

      {microOn ? (
        <rect x="14" y="284" width="200" height="8" fill={`url(#micro-${id})`} />
      ) : null}

      {uvOn ? (
        <g opacity="0.7">
          <line x1="100" y1="100" x2="108" y2="112" stroke="#7c3aed" strokeWidth="1.5" />
          <line x1="400" y1="80" x2="410" y2="95" stroke="#a78bfa" strokeWidth="1.5" />
          <line x1="500" y1="200" x2="512" y2="214" stroke="#7c3aed" strokeWidth="1.5" />
          <line x1="200" y1="220" x2="208" y2="232" stroke="#c4b5fd" strokeWidth="1.5" />
          <text x="480" y="90" fill="#a78bfa" fontSize="8" fontFamily="monospace">
            UV • {region.code} • LAB
          </text>
        </g>
      ) : null}
    </svg>
  );
}
