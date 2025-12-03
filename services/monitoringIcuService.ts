// services/monitoringIcuService.ts

import type {
  MonitoringMeta,
  SaveMonitoringPage2Payload,
  SaveMonitoringPage2Response,
  AlatInvasifItemDTO,
  RisikoJatuhDTO,
  BalanceCairanDTO,
  DeviceRowUI,
  FallRiskForm,
  FluidBalanceForm,
} from "@/types/monitoring";

// Frontend pakai route Next.js sendiri.
// Nanti kalau mau langsung ke backend luar, cukup ganti jadi URL backend.
const PAGE2_ENDPOINT = "/api/icu/monitoring/page-2";

const toNumberOrNull = (value: string): number | null => {
  if (!value) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

const mapDevicesToDto = (rows: DeviceRowUI[]): AlatInvasifItemDTO[] =>
  rows
    // hanya kirim baris yang ada minimal satu kolom terisi
    .filter((r) => r.ukuran || r.lokasi || r.tglPasang)
    .map<AlatInvasifItemDTO>((r) => ({
      id: undefined,
      kodeJenisAlat: r.code,
      namaJenisAlat: r.label,
      ukuran: r.ukuran || null,
      lokasi: r.lokasi || null,
      tglPasang: r.tglPasang || null,
      hariKe: null,
    }));

const mapFallRiskForm = (form: FallRiskForm): RisikoJatuhDTO | null => {
  const anyFilled = Object.values(form).some((v) => v !== "");
  if (!anyFilled) return null;

  return {
    riwayatJatuh: toNumberOrNull(form.riwayatJatuh),
    kondisiKesehatan: toNumberOrNull(form.kondisiKesehatan),
    bantuanAmbulansi: toNumberOrNull(form.bantuanAmbulansi),
    terapiIVAntikoagulan: toNumberOrNull(form.terapiIVAntikoagulan),
    gayaBerjalan: toNumberOrNull(form.gayaBerjalan),
    statusMental: toNumberOrNull(form.statusMental),
    totalSkor: toNumberOrNull(form.totalSkor),
  };
};

const mapFluidBalanceForm = (
  form: FluidBalanceForm
): BalanceCairanDTO | null => {
  const anyFilled = Object.values(form).some((v) => v !== "");
  if (!anyFilled) return null;

  return {
    cairanMasuk: toNumberOrNull(form.cairanMasuk),
    cairanKeluar: toNumberOrNull(form.cairanKeluar),
    iwl: toNumberOrNull(form.iwl),
    bc24Jam: toNumberOrNull(form.bc24Jam),
    bcSebelumnya: toNumberOrNull(form.bcSebelumnya),
    bcKumulatif: toNumberOrNull(form.bcKumulatif),
  };
};

export async function saveMonitoringPage2(params: {
  meta: MonitoringMeta;
  devices: DeviceRowUI[];
  fallRisk: FallRiskForm;
  fluidBalance: FluidBalanceForm;
}): Promise<SaveMonitoringPage2Response> {
  const payload: SaveMonitoringPage2Payload = {
    meta: params.meta,
    alatInvasif: mapDevicesToDto(params.devices),
    deletedAlatIds: [], // form statis, tidak ada delete ID
    risikoJatuh: mapFallRiskForm(params.fallRisk),
    balanceCairan: mapFluidBalanceForm(params.fluidBalance),
  };

  const res = await fetch(PAGE2_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Gagal menyimpan data monitoring page 2");
  }

  return (await res.json()) as SaveMonitoringPage2Response;
}
