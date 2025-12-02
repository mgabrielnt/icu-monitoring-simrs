// mocks/monitoringDummy.ts

import type { MonitoringPage2DTO } from "@/types/monitoring";

export const DUMMY_MONITORING_PAGE2: MonitoringPage2DTO = {
  alatInvasif: [
    {
      id: 1,
      jenisAlatCode: "IV_LINE",
      jenisAlatCustom: "",
      ukuran: "16G",
      lokasi: "Vena perifer kanan",
      tglPasang: "2024-12-01",
      hariKe: "1",
    },
    {
      id: 2,
      jenisAlatCode: "NGT",
      jenisAlatCustom: "",
      ukuran: "14",
      lokasi: "NGT nasal kiri",
      tglPasang: "2024-12-01",
      hariKe: "1",
    },
  ],
  fallRisk: {
    riwayatJatuh: "0",
    kondisiKesehatan: "1",
    bantuanAmbulansi: "1",
    terapiIVAntikoagulan: "0",
    gayaBerjalan: "1",
    statusMental: "0",
    totalSkor: "3",
  },
  fluidBalance: {
    cairanMasuk: "2500",
    cairanKeluar: "2200",
    iwl: "400",
    bc24Jam: "-100",
    bcSebelumnya: "0",
    bcKumulatif: "-100",
  },
};
