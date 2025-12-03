// hooks/useImplementasiClient.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type {
  MonitoringMeta,
  ImplementasiActivityDTO,
  ImplementasiActivityState,
  SaveImplementasiPayload,
  SaveImplementasiResponse,
} from "@/types/monitoring";

// UI-level types
export type NurseShift = "PAGI" | "SIANG" | "MALAM";
export type ImplementasiField = "jenisKegiatan" | "jam" | "paraf";

interface UseImplementasiClientParams {
  noRm: string;
  tanggal?: string;
  hariPerawatanKe?: number;
  initialActivities:
    | ImplementasiActivityDTO
    | ImplementasiActivityDTO[]
    | null;
}

// Helper: generate _localId
const createLocalId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
};

const createEmptyRow = (): ImplementasiActivityState => ({
  _localId: createLocalId(),
  id: undefined,
  jenisKegiatan: "",
  jam: "",
  paraf: "",
});

const mapDtoToState = (
  items: ImplementasiActivityDTO | ImplementasiActivityDTO[] | null
): ImplementasiActivityState[] => {
  if (!items) return [];
  const arr = Array.isArray(items) ? items : [items];

  return arr.map((a) => ({
    _localId: createLocalId(),
    id: a.id,
    jenisKegiatan: a.jenisKegiatan ?? "",
    jam: a.jam ?? "",
    paraf: a.paraf ?? "",
  }));
};

export function useImplementasiClient(params: UseImplementasiClientParams) {
  const { noRm, tanggal, hariPerawatanKe, initialActivities } = params;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [activities, setActivities] = useState<ImplementasiActivityState[]>(
    () => {
      const mapped = mapDtoToState(initialActivities);
      return mapped.length > 0 ? mapped : [createEmptyRow()];
    }
  );

  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [selectedShift, setSelectedShift] =
    useState<NurseShift>("PAGI");

  const [currentNurse, setCurrentNurse] = useState<{
    namaPerawat: string;
    tempatTidur: string;
  }>({
    namaPerawat: "",
    tempatTidur: "",
  });

  // Reset state kalau initialActivities berubah (misal ganti tanggal)
  useEffect(() => {
    const mapped = mapDtoToState(initialActivities);
    setActivities(mapped.length > 0 ? mapped : [createEmptyRow()]);
    setDeletedIds([]);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, [initialActivities]);

  // Ganti query ?tanggal= di URL
  const handleChangeDate = (newDate: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newDate) params.set("tanggal", newDate);
    else params.delete("tanggal");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // CRUD baris
  const addRow = () => {
    setActivities((prev) => [...prev, createEmptyRow()]);
  };

  const removeRow = (localId: string) => {
    setActivities((prev) => {
      const target = prev.find((r) => r._localId === localId);
      if (target?.id) {
        setDeletedIds((ids) => [...ids, target.id as string]);
      }
      const next = prev.filter((r) => r._localId !== localId);
      return next.length > 0 ? next : [createEmptyRow()];
    });
  };

  const updateRow = (
    localId: string,
    field: ImplementasiField,
    value: string
  ) => {
    setActivities((prev) =>
      prev.map((row) =>
        row._localId === localId ? { ...row, [field]: value } : row
      )
    );
  };

  const updateCurrentNurseField = (
    field: "namaPerawat" | "tempatTidur",
    value: string
  ) => {
    setCurrentNurse((prev) => ({ ...prev, [field]: value }));
  };

  // Submit ke backend
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!tanggal) {
      setSubmitError("Tanggal harus dipilih dulu sebelum menyimpan.");
      return;
    }

    const meta: MonitoringMeta = {
      noRm,
      tanggal,
      hariPerawatanKe: hariPerawatanKe ?? null,
    };

    const payload: SaveImplementasiPayload = {
      meta,
      activities: activities.map((row) => ({
        id: row.id,
        jenisKegiatan: row.jenisKegiatan,
        jam: row.jam,
        paraf: row.paraf,
      })),
      deletedActivityIds: deletedIds,
    };

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/icu/monitoring/implementasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: SaveImplementasiResponse = await res.json();

      if (data.activities) {
        const mapped = mapDtoToState(data.activities);
        setActivities(
          mapped.length > 0 ? mapped : [createEmptyRow()]
        );
        setDeletedIds([]);
      }

      setSubmitSuccess(true);
    } catch (err) {
      console.error("Gagal menyimpan implementasi:", err);
      setSubmitError("Gagal menyimpan implementasi. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    tanggal,
    activities,
    addRow,
    removeRow,
    updateRow,
    selectedShift,
    setSelectedShift,
    currentNurse,
    updateCurrentNurseField,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit,
    handleChangeDate,
  };
}
