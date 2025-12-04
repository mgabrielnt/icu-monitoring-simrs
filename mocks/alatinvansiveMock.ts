// D:\projek-medis\icu-monitoring-simrs\mocks\alatinvansiveMock.ts

import type { InvasiveDeviceEntry } from "@/types/alatinvansive";

export const invasiveDevicesMock: InvasiveDeviceEntry[] = [
  {
    id: "mock-1",
    patientId: "MOCK",
    jenisAlat: "IV Line",
    ukuran: "18G",
    lokasi: "V. Cephalica kanan",
    tglPasang: new Date().toISOString(),
    hariKe: 1,
    totalSkorPr: 5,
    createdAt: new Date().toISOString(),
  },
];
