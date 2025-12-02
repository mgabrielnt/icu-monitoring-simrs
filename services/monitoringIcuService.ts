// src/services/monitoringIcuService.ts

import { JENIS_ALAT_OPTIONS } from "@/lib/constants";
import type {
  DeviceRowUI,
  FallRiskForm,
  FluidBalanceForm,
  MonitoringMeta,
  SaveMonitoringPage2Payload,
} from "@/types/monitoring";

export const createAlatInvasifId = () =>
  Math.random().toString(36).slice(2);

export const createEmptyDeviceRow = (): DeviceRowUI => ({
  id: createAlatInvasifId(),
  jenisAlatCode: "",
  jenisAlatCustom: "",
  ukuran: "",
  lokasi: "",
  tglPasang: "",
  hariKe: "",
});

export const buildMonitoringPage2Payload = (args: {
  meta: MonitoringMeta;
  rows: DeviceRowUI[];
  fallRisk: FallRiskForm;
  fluidBalance: FluidBalanceForm;
}): SaveMonitoringPage2Payload => {
  const { meta, rows, fallRisk, fluidBalance } = args;

  const alatInvasif = rows.map((r) => {
    const opt = JENIS_ALAT_OPTIONS.find(
      (o) => o.value === r.jenisAlatCode
    );
    const labelFromOption = opt?.label ?? "";
    const namaJenisAlat =
      r.jenisAlatCode === "OTHER"
        ? r.jenisAlatCustom.trim()
        : labelFromOption;

    return {
      kodeJenisAlat: r.jenisAlatCode || null,
      namaJenisAlat: namaJenisAlat || null,
      ukuran: r.ukuran.trim() || null,
      lokasi: r.lokasi.trim() || null,
      tglPasang: r.tglPasang || null,
      hariKe: r.hariKe ? Number(r.hariKe) : null,
    };
  });

  const risikoJatuh = {
    riwayatJatuh: fallRisk.riwayatJatuh
      ? Number(fallRisk.riwayatJatuh)
      : null,
    kondisiKesehatan: fallRisk.kondisiKesehatan
      ? Number(fallRisk.kondisiKesehatan)
      : null,
    bantuanAmbulansi: fallRisk.bantuanAmbulansi
      ? Number(fallRisk.bantuanAmbulansi)
      : null,
    terapiIVAntikoagulan: fallRisk.terapiIVAntikoagulan
      ? Number(fallRisk.terapiIVAntikoagulan)
      : null,
    gayaBerjalan: fallRisk.gayaBerjalan
      ? Number(fallRisk.gayaBerjalan)
      : null,
    statusMental: fallRisk.statusMental
      ? Number(fallRisk.statusMental)
      : null,
    totalSkor: fallRisk.totalSkor
      ? Number(fallRisk.totalSkor)
      : null,
  };

  const balanceCairan = {
    cairanMasuk: fluidBalance.cairanMasuk
      ? Number(fluidBalance.cairanMasuk)
      : null,
    cairanKeluar: fluidBalance.cairanKeluar
      ? Number(fluidBalance.cairanKeluar)
      : null,
    iwl: fluidBalance.iwl ? Number(fluidBalance.iwl) : null,
    bc24Jam: fluidBalance.bc24Jam
      ? Number(fluidBalance.bc24Jam)
      : null,
    bcSebelumnya: fluidBalance.bcSebelumnya
      ? Number(fluidBalance.bcSebelumnya)
      : null,
    bcKumulatif: fluidBalance.bcKumulatif
      ? Number(fluidBalance.bcKumulatif)
      : null,
  };

  return {
    meta,
    alatInvasif,
    risikoJatuh,
    balanceCairan,
  };
};
