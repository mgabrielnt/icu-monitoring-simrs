// src/hooks/useAlatInvasif.ts

"use client";

import { FormEvent, useCallback, useState } from "react";
import {
  AlatInvasifState,
  BalanceCairanDTO,
  MonitoringMeta,
  MonitoringPage2DTO,
  RisikoJatuhDTO,
  SaveMonitoringPage2Payload,
} from "@/types/monitoring";
import { saveMonitoringPage2 } from "@/lib/icuMonitoring";

export const JENIS_ALAT_OPTIONS = [
  { value: "IV_LINE", label: "IV Line" },
  { value: "ARTERI_LINE", label: "Arteri line" },
  { value: "SWANZ_GANZ", label: "Swanz Ganz" },
  { value: "IABP", label: "IABP" },
  { value: "SHEATH_TPM", label: "Sheath / TPM" },
  { value: "OTT_ETT_ET", label: "OTT / ETT / ET" },
  { value: "NGT", label: "NGT" },
  { value: "DRAIN", label: "Drain" },
  { value: "WSD", label: "WSD" },
  { value: "D_CATH_D_CO", label: "D. Cath / D.CO" },
  { value: "EPID_CATH", label: "EPID Cath" },
  { value: "PNB_CATH", label: "PNB Cath" },
  { value: "OTHER", label: "Lainnya (isi manual)" },
] as const;

export type JenisAlatValue = (typeof JENIS_ALAT_OPTIONS)[number]["value"];

interface DeviceRowState {
  _localId: string;
  serverId?: string;
  jenisAlatCode: JenisAlatValue | "";
  jenisAlatCustom: string;
  ukuran: string;
  lokasi: string;
  tglPasang: string;
  hariKe: string;
}

interface FallRiskFormState {
  riwayatJatuh: string;
  kondisiKesehatan: string;
  bantuanAmbulansi: string;
  terapiIVAntikoagulan: string;
  gayaBerjalan: string;
  statusMental: string;
  totalSkor: string;
}

interface FluidBalanceFormState {
  cairanMasuk: string;
  cairanKeluar: string;
  iwl: string;
  bc24Jam: string;
  bcSebelumnya: string;
  bcKumulatif: string;
}

interface UseAlatInvasifOptions {
  meta: MonitoringMeta;
  initialData?: MonitoringPage2DTO | null;
  onSaved?: () => void;
}

const createLocalId = () => Math.random().toString(36).slice(2);

const mapInitialRows = (
  data?: MonitoringPage2DTO | null
): DeviceRowState[] => {
  if (!data || !data.alatInvasif || data.alatInvasif.length === 0) {
    return [
      {
        _localId: createLocalId(),
        serverId: undefined,
        jenisAlatCode: "",
        jenisAlatCustom: "",
        ukuran: "",
        lokasi: "",
        tglPasang: "",
        hariKe: "",
      },
    ];
  }

  return data.alatInvasif.map((item) => {
    const kode = item.kodeJenisAlat || "";
    const customName =
      !kode || kode === "OTHER"
        ? item.namaJenisAlat ?? ""
        : "";

    return {
      _localId: createLocalId(),
      serverId: item.id,
      jenisAlatCode: (kode as JenisAlatValue) || "",
      jenisAlatCustom: customName,
      ukuran: item.ukuran ?? "",
      lokasi: item.lokasi ?? "",
      tglPasang: item.tglPasang ?? "",
      hariKe: item.hariKe != null ? String(item.hariKe) : "",
    };
  });
};

const mapInitialFallRisk = (
  data?: MonitoringPage2DTO | null
): FallRiskFormState => {
  const r = data?.risikoJatuh;
  return {
    riwayatJatuh: r?.riwayatJatuh != null ? String(r.riwayatJatuh) : "",
    kondisiKesehatan:
      r?.kondisiKesehatan != null ? String(r.kondisiKesehatan) : "",
    bantuanAmbulansi:
      r?.bantuanAmbulansi != null ? String(r.bantuanAmbulansi) : "",
    terapiIVAntikoagulan:
      r?.terapiIVAntikoagulan != null
        ? String(r.terapiIVAntikoagulan)
        : "",
    gayaBerjalan: r?.gayaBerjalan != null ? String(r.gayaBerjalan) : "",
    statusMental: r?.statusMental != null ? String(r.statusMental) : "",
    totalSkor: r?.totalSkor != null ? String(r.totalSkor) : "",
  };
};

const mapInitialBalance = (
  data?: MonitoringPage2DTO | null
): FluidBalanceFormState => {
  const b = data?.balanceCairan;
  return {
    cairanMasuk: b?.cairanMasuk != null ? String(b.cairanMasuk) : "",
    cairanKeluar:
      b?.cairanKeluar != null ? String(b.cairanKeluar) : "",
    iwl: b?.iwl != null ? String(b.iwl) : "",
    bc24Jam: b?.bc24Jam != null ? String(b.bc24Jam) : "",
    bcSebelumnya:
      b?.bcSebelumnya != null ? String(b.bcSebelumnya) : "",
    bcKumulatif:
      b?.bcKumulatif != null ? String(b.bcKumulatif) : "",
  };
};

export const useAlatInvasifForm = ({
  meta,
  initialData,
  onSaved,
}: UseAlatInvasifOptions) => {
  const [rows, setRows] = useState<DeviceRowState[]>(() =>
    mapInitialRows(initialData)
  );
  const [deletedAlatIds, setDeletedAlatIds] = useState<string[]>([]);
  const [fallRisk, setFallRisk] = useState<FallRiskFormState>(() =>
    mapInitialFallRisk(initialData)
  );
  const [fluidBalance, setFluidBalance] =
    useState<FluidBalanceFormState>(() =>
      mapInitialBalance(initialData)
    );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateRow = useCallback(
    (
      localId: string,
      field: keyof Omit<
        DeviceRowState,
        "_localId" | "serverId"
      >,
      value: string
    ) => {
      setRows((prev) =>
        prev.map((row) =>
          row._localId === localId
            ? {
                ...row,
                [field]: value,
                ...(field === "jenisAlatCode" && value !== "OTHER"
                  ? { jenisAlatCustom: "" }
                  : {}),
              }
            : row
        )
      );
    },
    []
  );

  const addRow = useCallback(() => {
    setRows((prev) => [
      ...prev,
      {
        _localId: createLocalId(),
        serverId: undefined,
        jenisAlatCode: "",
        jenisAlatCustom: "",
        ukuran: "",
        lokasi: "",
        tglPasang: "",
        hariKe: "",
      },
    ]);
  }, []);

  const removeRow = useCallback((localId: string) => {
    setRows((prev) => {
      if (prev.length === 1) return prev;
      const target = prev.find((r) => r._localId === localId);
      if (target?.serverId) {
        setDeletedAlatIds((ids) => [...ids, target.serverId!]);
      }
      return prev.filter((r) => r._localId !== localId);
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      try {
        const alatInvasif = rows.map<AlatInvasifState>((r) => {
          const opt = JENIS_ALAT_OPTIONS.find(
            (o) => o.value === r.jenisAlatCode
          );
          const labelFromOption = opt?.label ?? "";
          const namaJenisAlatRaw =
            r.jenisAlatCode === "OTHER"
              ? r.jenisAlatCustom.trim()
              : labelFromOption;

          return {
            _localId: r._localId,
            id: r.serverId,
            kodeJenisAlat: r.jenisAlatCode || null,
            namaJenisAlat: namaJenisAlatRaw || null,
            ukuran: r.ukuran.trim() || null,
            lokasi: r.lokasi.trim() || null,
            tglPasang: r.tglPasang || null,
            hariKe: r.hariKe ? Number(r.hariKe) : null,
          };
        });

        const risiko: RisikoJatuhDTO | null = {
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

        const balance: BalanceCairanDTO | null = {
          cairanMasuk: fluidBalance.cairanMasuk
            ? Number(fluidBalance.cairanMasuk)
            : null,
          cairanKeluar: fluidBalance.cairanKeluar
            ? Number(fluidBalance.cairanKeluar)
            : null,
          iwl: fluidBalance.iwl
            ? Number(fluidBalance.iwl)
            : null,
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

        const payload: SaveMonitoringPage2Payload = {
          meta,
          alatInvasif: alatInvasif.map((a) => ({
            id: a.id,
            kodeJenisAlat: a.kodeJenisAlat,
            namaJenisAlat: a.namaJenisAlat,
            ukuran: a.ukuran,
            lokasi: a.lokasi,
            tglPasang: a.tglPasang,
            hariKe: a.hariKe,
          })),
          deletedAlatIds,
          risikoJatuh: risiko,
          balanceCairan: balance,
        };

        const res = await saveMonitoringPage2(payload);

        if (res.data) {
          setRows(mapInitialRows(res.data));
          setFallRisk(mapInitialFallRisk(res.data));
          setFluidBalance(mapInitialBalance(res.data));
          setDeletedAlatIds([]);
        }

        setSubmitSuccess(true);
        if (onSaved) onSaved();
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : "Terjadi kesalahan"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [rows, fallRisk, fluidBalance, meta, deletedAlatIds, onSaved]
  );

  return {
    rows,
    fallRisk,
    fluidBalance,
    isSubmitting,
    submitError,
    submitSuccess,
    updateRow,
    addRow,
    removeRow,
    setFallRisk,
    setFluidBalance,
    handleSubmit,
  };
};
