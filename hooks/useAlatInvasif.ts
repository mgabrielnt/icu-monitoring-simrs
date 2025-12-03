// hooks/useAlatInvasif.ts
"use client";

import { useState } from "react";

import type {
  MonitoringMeta,
  MonitoringPage2DTO,
  DeviceRowUI,
  DeviceCode,
  DeviceField,
  FallRiskForm,
  FluidBalanceForm,
} from "@/types/monitoring";
import { DEVICE_DEFINITIONS } from "@/lib/alatInvasifConstants";
import { saveMonitoringPage2 } from "@/services/monitoringIcuService";

interface UseAlatInvasifOptions {
  meta: MonitoringMeta;
  initialData?: MonitoringPage2DTO | null;
  onSaved?: () => void;
}

const emptyFallRisk: FallRiskForm = {
  riwayatJatuh: "",
  kondisiKesehatan: "",
  bantuanAmbulansi: "",
  terapiIVAntikoagulan: "",
  gayaBerjalan: "",
  statusMental: "",
  totalSkor: "",
};

const emptyFluidBalance: FluidBalanceForm = {
  cairanMasuk: "",
  cairanKeluar: "",
  iwl: "",
  bc24Jam: "",
  bcSebelumnya: "",
  bcKumulatif: "",
};

const buildDevices = (
  initial?: MonitoringPage2DTO | null
): DeviceRowUI[] => {
  const mapByCode = new Map<DeviceCode, MonitoringPage2DTO["alatInvasif"][number]>();

  if (initial?.alatInvasif) {
    for (const item of initial.alatInvasif) {
      if (!item.kodeJenisAlat) continue;
      mapByCode.set(item.kodeJenisAlat as DeviceCode, item);
    }
  }

  return DEVICE_DEFINITIONS.map<DeviceRowUI>((def) => {
    const dto = mapByCode.get(def.code);

    return {
      code: def.code,
      label: def.label,
      group: def.group,
      ukuran: dto?.ukuran ?? "",
      lokasi: dto?.lokasi ?? "",
      tglPasang: dto?.tglPasang ?? "",
    };
  });
};

const buildFallRisk = (
  initial?: MonitoringPage2DTO | null
): FallRiskForm => {
  if (!initial?.risikoJatuh) return { ...emptyFallRisk };
  const r = initial.risikoJatuh;

  return {
    riwayatJatuh: r.riwayatJatuh?.toString() ?? "",
    kondisiKesehatan: r.kondisiKesehatan?.toString() ?? "",
    bantuanAmbulansi: r.bantuanAmbulansi?.toString() ?? "",
    terapiIVAntikoagulan: r.terapiIVAntikoagulan?.toString() ?? "",
    gayaBerjalan: r.gayaBerjalan?.toString() ?? "",
    statusMental: r.statusMental?.toString() ?? "",
    totalSkor: r.totalSkor?.toString() ?? "",
  };
};

const buildFluidBalance = (
  initial?: MonitoringPage2DTO | null
): FluidBalanceForm => {
  if (!initial?.balanceCairan) return { ...emptyFluidBalance };
  const b = initial.balanceCairan;

  return {
    cairanMasuk: b.cairanMasuk?.toString() ?? "",
    cairanKeluar: b.cairanKeluar?.toString() ?? "",
    iwl: b.iwl?.toString() ?? "",
    bc24Jam: b.bc24Jam?.toString() ?? "",
    bcSebelumnya: b.bcSebelumnya?.toString() ?? "",
    bcKumulatif: b.bcKumulatif?.toString() ?? "",
  };
};

export function useAlatInvasif({
  meta,
  initialData,
  onSaved,
}: UseAlatInvasifOptions) {
  const [devices, setDevices] = useState<DeviceRowUI[]>(() =>
    buildDevices(initialData)
  );
  const [fallRisk, setFallRisk] = useState<FallRiskForm>(() =>
    buildFallRisk(initialData)
  );
  const [fluidBalance, setFluidBalance] = useState<FluidBalanceForm>(() =>
    buildFluidBalance(initialData)
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateDeviceField = (
    code: DeviceCode,
    field: DeviceField,
    value: string
  ) => {
    setDevices((prev) =>
      prev.map((row) =>
        row.code === code ? { ...row, [field]: value } : row
      )
    );
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      const res = await saveMonitoringPage2({
        meta,
        devices,
        fallRisk,
        fluidBalance,
      });

      if (!res.ok) {
        throw new Error(res.message || "Gagal menyimpan data");
      }

      if (res.data) {
        setDevices(buildDevices(res.data));
        setFallRisk(buildFallRisk(res.data));
        setFluidBalance(buildFluidBalance(res.data));
      }

      setSubmitSuccess(true);
      onSaved?.();
    } catch (err: any) {
      console.error("[saveMonitoringPage2] error", err);
      setSubmitError(err?.message ?? "Terjadi kesalahan saat menyimpan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    devices,
    fallRisk,
    fluidBalance,
    isSubmitting,
    submitError,
    submitSuccess,
    updateDeviceField,
    setFallRisk,
    setFluidBalance,
    handleSubmit,
  };
}
