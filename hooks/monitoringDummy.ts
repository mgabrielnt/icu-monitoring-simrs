// hooks/monitoringDummy.ts

import {
  MonitoringMeta,
  MonitoringPage2DTO,
  AlatInvasifState,
  RisikoJatuhDTO,
  BalanceCairanDTO,
} from "@/types/monitoring";

export const dummyMeta: MonitoringMeta = {
  noRm: "2",
  tanggal: "2025-12-01",
  hariPerawatanKe: 1,
};

export const dummyAlatInvasifRows: AlatInvasifState[] = [
  {
    _localId: "local-1",
    id: "1",
    kodeJenisAlat: "IV_LINE",
    namaJenisAlat: "IV Line",
    jenisAlatCode: "IV_LINE",
    jenisAlatCustom: "",
    ukuran: "16G",
    lokasi: "Vena perifer kanan",
    tglPasang: "2025-12-01",
    hariKe: 1,
  },
  {
    _localId: "local-2",
    id: "2",
    kodeJenisAlat: "NGT",
    namaJenisAlat: "NGT",
    jenisAlatCode: "NGT",
    jenisAlatCustom: "",
    ukuran: "14 Fr",
    lokasi: "NGT",
    tglPasang: "2025-12-01",
    hariKe: 1,
  },
];

export const dummyRisikoJatuh: RisikoJatuhDTO = {
  riwayatJatuh: 1,
  kondisiKesehatan: 0,
  bantuanAmbulansi: 1,
  terapiIVAntikoagulan: 1,
  gayaBerjalan: 2,
  statusMental: 0,
  totalSkor: 5,
};

export const dummyBalanceCairan: BalanceCairanDTO = {
  cairanMasuk: 2500,
  cairanKeluar: 2300,
  iwl: 300,
  bc24Jam: 200,
  bcSebelumnya: -50,
  bcKumulatif: 150,
};

export const dummyPage2: MonitoringPage2DTO = {
  meta: dummyMeta,
  alatInvasif: dummyAlatInvasifRows,
  risikoJatuh: dummyRisikoJatuh,
  balanceCairan: dummyBalanceCairan,
};
