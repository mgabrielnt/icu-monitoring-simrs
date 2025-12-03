// file: hooks/useCurrentDateTime.ts
"use client";

import { useEffect, useState } from "react";

export function useCurrentDateTime(intervalMs: number = 1000) {
  // Awalnya null supaya SSR & client initial render SAMA
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Pertama kali mount di client, set waktu
    setNow(new Date());

    const id = setInterval(() => {
      setNow(new Date());
    }, intervalMs);

    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
