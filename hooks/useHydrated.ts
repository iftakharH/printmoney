"use client";

import { useSyncExternalStore } from "react";

const empty = () => () => {};

export function useHydrated() {
  return useSyncExternalStore(empty, () => true, () => false);
}
