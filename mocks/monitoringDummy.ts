// mocks/monitoringDummy.ts

import type {
  MonitoringPage2DTO,
  ImplementasiActivityDTO,
  ProgressNoteDTO,
} from "@/types/monitoring";

export const dummyMonitoringPage2: MonitoringPage2DTO = {
  meta: {
    noRm: "2",
    tanggal: "2025-12-03",
    hariPerawatanKe: 1,
  },
  alatInvasif: [
    {
      id: "1",
      kodeJenisAlat: "IV_LINE",
      namaJenisAlat: "IV Line",
      ukuran: "16G",
      lokasi: "Vena perifer kanan",
      tglPasang: "2025-12-03",
      hariKe: 1,
    },
    {
      id: "2",
      kodeJenisAlat: "CVC",
      namaJenisAlat: "CVC",
      ukuran: "7 Fr",
      lokasi: "Vena jugularis interna",
      tglPasang: "2025-12-03",
      hariKe: 1,
    },
  ],
  risikoJatuh: {
    riwayatJatuh: 0,
    kondisiKesehatan: 1,
    bantuanAmbulansi: 1,
    terapiIVAntikoagulan: 0,
    gayaBerjalan: 1,
    statusMental: 0,
    totalSkor: 3,
  },
  balanceCairan: {
    cairanMasuk: 2500,
    cairanKeluar: 2200,
    iwl: 500,
    bc24Jam: 800,
    bcSebelumnya: -200,
    bcKumulatif: 600,
  },
};

// alias kapital kalau masih ada import lama
export const DUMMY_MONITORING_PAGE2 = dummyMonitoringPage2;

// contoh dummy lain kalau masih mau dipakai di page 5 & 6
export const dummyImplementasiActivities: ImplementasiActivityDTO[] = [
  {
    id: "1",
    jenisKegiatan: "Pemasangan IV Line",
    jam: "08:00",
    paraf: "NS",
  },
];

export const DUMMY_IMPLEMENTASI_ACTIVITIES =
  dummyImplementasiActivities;

export const dummyProgressNotes: ProgressNoteDTO[] = [
  {
    id: "1",
    tglJam: "2025-12-03T08:00",
    jenis: "O",
    hasilAssesmen:
      "O: Pasien sadar kompos mentis, terpasang ETT.\nA: Stabil hemodinamik.\nP: Lanjut ventilator support.",
    instruksiPPA: "Monitor tanda vital tiap 1 jam.",
    namaPerawat: "Suster A",
  },
];

export const DUMMY_PROGRESS_NOTES = dummyProgressNotes;
