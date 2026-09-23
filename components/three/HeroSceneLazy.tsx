"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center font-mono text-xs text-text-dim">
        Loading mint…
      </div>
    ),
  }
);

export function HeroSceneLazy() {
  return <HeroScene />;
}
