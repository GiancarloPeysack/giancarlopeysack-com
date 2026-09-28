"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/julian/ui/Label";

const FORMAT = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Madrid" } as const;

/**
 * "MADRID, ES · 18:42". The clock says someone is actually there, which is
 * the point of the label. It renders the plain place on the server and adds
 * the time after mount, so there is no hydration mismatch.
 */
export function LocalTime({ place }: { place: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-GB", FORMAT).format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  return <Label title={time ? `${place} · ${time}` : place} />;
}
