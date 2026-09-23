"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

/** Ensures zustand persist hydrates and first-visit region detection runs. */
export function StoreHydration() {
  useEffect(() => {
    const { persist } = useAppStore;
    if (persist?.hasHydrated()) {
      useAppStore.getState().setHydrated();
      return;
    }
    const unsub = persist?.onFinishHydration?.(() => {
      useAppStore.getState().setHydrated();
    });
    return () => unsub?.();
  }, []);

  return null;
}
