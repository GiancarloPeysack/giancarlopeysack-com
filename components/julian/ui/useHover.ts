"use client";

import { PointerEvent, useCallback, useState } from "react";

/**
 * Hover state the way Framer's `enabledGestures: { hover: true }` works:
 * pointer enter/leave, ignoring touch so taps don't leave a sticky hover.
 */
export function useHover(enabled = true) {
  const [hovered, setHovered] = useState(false);
  const onPointerEnter = useCallback(
    (e: PointerEvent) => {
      if (enabled && e.pointerType !== "touch") setHovered(true);
    },
    [enabled],
  );
  const onPointerLeave = useCallback(
    (e: PointerEvent) => {
      if (e.pointerType !== "touch") setHovered(false);
    },
    [],
  );
  return [enabled && hovered, { onPointerEnter, onPointerLeave }] as const;
}
