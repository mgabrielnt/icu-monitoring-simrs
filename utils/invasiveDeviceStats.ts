// utils/invasiveDeviceStats.ts

import { InvasiveDeviceEntry } from "@/types/alatinvansive";

export interface InvasiveStats {
  total: number;
  maxHariKe: number | null;
  avgTotalSkorPr: number | null;
}

export function calculateInvasiveStats(
  records: Partial<InvasiveDeviceEntry>[] = []
): InvasiveStats {
  if (!Array.isArray(records) || records.length === 0) {
    return {
      total: 0,
      maxHariKe: null,
      avgTotalSkorPr: null,
    };
  }

  const total = records.length;

  const hariKeValues = records
    .map((r) => r?.hariKe)
    .filter((v): v is number => typeof v === "number" && !isNaN(v));

  const skorValues = records
    .map((r) => r?.totalSkorPr)
    .filter((v): v is number => typeof v === "number" && !isNaN(v));

  const maxHariKe = hariKeValues.length
    ? Math.max(...hariKeValues)
    : null;

  const avgTotalSkorPr = skorValues.length
    ? skorValues.reduce((acc, cur) => acc + cur, 0) / skorValues.length
    : null;

  return {
    total,
    maxHariKe,
    avgTotalSkorPr,
  };
}
