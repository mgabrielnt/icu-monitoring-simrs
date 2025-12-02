// mocks/monitoringDummy.ts

import type {
  MonitoringPage2DTO,
  ImplementasiActivityDTO,
  ProgressNoteDTO,
} from "@/types/monitoring";

/**
 * Dummy Page 2 – Alat Invasif, Resiko Jatuh, Balance Cairan
 */
export const DUMMY_MONITORING_PAGE2: MonitoringPage2DTO = {
  alatInvasif: [
    {
      id: 1,
      jenisAlatCode: "IV_LINE",
      jenisAlatCustom: "",
      ukuran: "18G",
      lokasi: "V. perifer tangan kanan",
      tglPasang: "2024-12-01",
      hariKe: "1",
    },
    {
      id: 2,
      jenisAlatCode: "NGT",
      jenisAlatCustom: "",
      ukuran: "14 Fr",
      lokasi: "NGT via hidung kiri",
      tglPasang: "2024-12-01",
      hariKe: "1",
    },
  ],
  fallRisk: {
    riwayatJatuh: "0",
    kondisiKesehatan: "10",
    bantuanAmbulansi: "15",
    terapiIVAntikoagulan: "20",
    gayaBerjalan: "10",
    statusMental: "10",
    totalSkor: "65",
  },
  fluidBalance: {
    cairanMasuk: "2500",
    cairanKeluar: "2100",
    iwl: "500",
    bc24Jam: "-100",
    bcSebelumnya: "200",
    bcKumulatif: "100",
  },
};

/**
 * Dummy Implementasi – Page 5
 */
export const DUMMY_IMPLEMENTASI_ACTIVITIES: ImplementasiActivityDTO[] = [
  {
    id: 1,
    jenisKegiatan: "Monitor TD, N, R, Temp, SpO2",
    jam: "08:00",
    paraf: "AN",
  },
  {
    id: 2,
    jenisKegiatan: "Perawatan mulut",
    jam: "10:30",
    paraf: "BK",
  },
  {
    id: 3,
    jenisKegiatan: "Monitor setting ventilator, humidifier",
    jam: "14:15",
    paraf: "AN",
  },
];

/**
 * Dummy Catatan Terintegrasi – Page 6
 */
export const DUMMY_PROGRESS_NOTES: ProgressNoteDTO[] = [
  {
    id: 1,
    tglJam: "2024-12-01T08:00",
    jenis: "O",
    namaPerawat: "Ani, S.Kep., Ners",
    hasilAssesmen:
      "O: Pasien tampak lemah, GCS 13 (E4V4M5), TD 110/70, N 96x/menit, R 22x/menit, SpO2 96% dengan NRM 10 L/menit.",
    instruksiPPA:
      "Pantau tanda vital tiap 2 jam, pertahankan SpO2 > 94%, lapor bila GCS turun ≥ 2 poin.",
  },
  {
    id: 2,
    tglJam: "2024-12-01T12:00",
    jenis: "A",
    namaPerawat: "Budi, S.Kep.",
    hasilAssesmen:
      "A: Resiko penurunan perfusi jaringan serebral, kebutuhan oksigen meningkat.",
    instruksiPPA:
      "Lanjutkan oksigen NRM, jaga posisi head up 30°, edukasi keluarga terkait pembatasan pengunjung.",
  },
  {
    id: 3,
    tglJam: "2024-12-01T16:00",
    jenis: "P",
    namaPerawat: "Ani, S.Kep., Ners",
    hasilAssesmen:
      "P: Evaluasi ulang tanda vital dan GCS pukul 18.00, monitor output urine dan balance cairan.",
    instruksiPPA:
      "Catat intake–output setiap shift, kolaborasi DPJP bila urine output < 0.5 ml/kg/jam.",
  },
];
