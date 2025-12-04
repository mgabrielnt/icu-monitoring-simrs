// D:\projek-medis\icu-monitoring-simrs\utils\invasiveDeviceStats.ts

import type {
  InvasiveDeviceEntry,
  InvasiveStats,
} from "@/types/alatinvansive";

export function calculateInvasiveStats(
  records: InvasiveDeviceEntry[]
): InvasiveStats {
  if (!records.length) {
    return {
      total: 0,
      maxHariKe: null,
      avgTotalSkorPr: null,
    };
  }

  const total = records.length;

  const hariKeValues = records
    .map((r) => r.hariKe)
    .filter((v): v is number => typeof v === "number");

  const skorValues = records
    .map((r) => r.totalSkorPr)
    .filter((v): v is number => typeof v === "number");

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
