// src/hooks/useImplementasi.ts

"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  ImplementasiActivityDTO,
  ImplementasiActivityState,
  MonitoringMeta,
  SaveImplementasiPayload,
} from "@/types/monitoring";
import { saveImplementasiList } from "@/lib/icuMonitoring";

export const KEGIATAN_UMUM = [
  "Monitor kesadaran: GCS",
  "Monitor TD, N, R, Temp, SpO2",
  "Merekam EKG",
  "Mengukur CVC, arteri line",
  "Monitor Terapi O2: binasal, RM, NRM, T-Piece",
  "Monitor Nyeri",
  "Monitor setting ventilator, humidifier",
  "Monitor setting TPM, IABP",
  "Monitor Reflek Mata, kekuatan otot",
  "Pengelolaan Diet melalui Oral/NGT",
  "Monitoring tanda perdarahan",
  "Personal Hygiene: mandi, perineal",
  "Perawatan mulut",
  "Perawatan ETT/TT",
  "Perawatan Drain, WSD",
  "Perawatan Sheath, TPM",
  "Suctioning",
  "Fisioterapi, mobilisasi jantung",
  "Rekam EKG 12 lead",
  "Monitor Balance Cairan",
  "Perawatan luka",
  "Alih Baring, Head Up 30°",
  "Pencegahan Jatuh resiko rendah/tinggi",
] as const;

const createLocalId = () => Math.random().toString(36).slice(2);

const formatTime = (date: Date) =>
  date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const mapInitialActivities = (
  activities?: ImplementasiActivityDTO[] | null
): ImplementasiActivityState[] => {
  if (!activities || activities.length === 0) return [];
  return activities.map((a) => ({
    ...a,
    _localId: createLocalId(),
  }));
};

interface UseImplementasiOptions {
  meta: MonitoringMeta;
  initialActivities?: ImplementasiActivityDTO[] | null;
  onSaved?: () => void;
}

interface ImplementasiFormState {
  jenisKegiatan: string;
  paraf: string;
  customKegiatan: string;
}

export const useImplementasi = ({
  meta,
  initialActivities,
  onSaved,
}: UseImplementasiOptions) => {
  const [rows, setRows] = useState<ImplementasiActivityState[]>(() =>
    mapInitialActivities(initialActivities)
  );
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [systemTime, setSystemTime] = useState<string>(
    formatTime(new Date())
  );
  const [showForm, setShowForm] = useState(false);
  const [editingLocalId, setEditingLocalId] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState<ImplementasiFormState>({
    jenisKegiatan: "",
    paraf: "",
    customKegiatan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSystemTime(formatTime(new Date()));
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  const handleFormChange = useCallback(
    (field: keyof ImplementasiFormState, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "jenisKegiatan" && value !== "custom"
          ? { customKegiatan: "" }
          : {}),
      }));
    },
    []
  );

  const toggleForm = useCallback(() => {
    setShowForm((prev) => !prev);
    setSubmitError(null);
    setSubmitSuccess(false);
    if (!showForm) {
      setEditingLocalId(null);
      setFormData({
        jenisKegiatan: "",
        paraf: "",
        customKegiatan: "",
      });
    }
  }, [showForm]);

  const closeForm = useCallback(() => {
    setShowForm(false);
    setEditingLocalId(null);
  }, []);

  const startEdit = useCallback(
    (localId: string) => {
      const target = rows.find((r) => r._localId === localId);
      if (!target) return;
      setShowForm(true);
      setEditingLocalId(localId);

      const isStandard = KEGIATAN_UMUM.includes(
        target.jenisKegiatan as (typeof KEGIATAN_UMUM)[number]
      );

      setFormData({
        jenisKegiatan: isStandard ? target.jenisKegiatan : "custom",
        paraf: target.paraf,
        customKegiatan: isStandard ? "" : target.jenisKegiatan,
      });
      setSubmitError(null);
      setSubmitSuccess(false);
    },
    [rows]
  );

  const handleDeleteRow = useCallback(
    async (localId: string) => {
      const target = rows.find((r) => r._localId === localId);
      if (!target) return;

      const newRows = rows.filter((r) => r._localId !== localId);
      const newDeleted = [
        ...deletedIds,
        ...(target.id ? [target.id] : []),
      ];

      setRows(newRows);
      setDeletedIds(newDeleted);
      setSubmitError(null);
      setSubmitSuccess(false);

      try {
        const payload: SaveImplementasiPayload = {
          meta,
          activities: newRows.map<ImplementasiActivityDTO>((r) => ({
            id: r.id,
            jenisKegiatan: r.jenisKegiatan,
            jam: r.jam,
            paraf: r.paraf,
          })),
          deletedActivityIds: newDeleted,
        };

        setIsSubmitting(true);
        const res = await saveImplementasiList(payload);

        if (res.activities && Array.isArray(res.activities)) {
          setRows(mapInitialActivities(res.activities));
          setDeletedIds([]);
        }

        setSubmitSuccess(true);
        if (onSaved) onSaved();
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menghapus"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [rows, deletedIds, meta, onSaved]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitError(null);
      setSubmitSuccess(false);
      setIsSubmitting(true);

      try {
        const now = new Date();
        const jamSekarang = formatTime(now);

        const finalJenisKegiatan =
          formData.jenisKegiatan === "custom"
            ? formData.customKegiatan
            : formData.jenisKegiatan;

        if (!finalJenisKegiatan) {
          throw new Error("Jenis kegiatan wajib diisi");
        }

        let newRows: ImplementasiActivityState[];

        if (editingLocalId) {
          newRows = rows.map((r) =>
            r._localId === editingLocalId
              ? {
                  ...r,
                  jenisKegiatan: finalJenisKegiatan,
                  jam: jamSekarang,
                  paraf: formData.paraf,
                }
              : r
          );
        } else {
          const newRow: ImplementasiActivityState = {
            _localId: createLocalId(),
            id: undefined,
            jenisKegiatan: finalJenisKegiatan,
            jam: jamSekarang,
            paraf: formData.paraf,
          };
          newRows = [...rows, newRow];
        }

        const payload: SaveImplementasiPayload = {
          meta,
          activities: newRows.map<ImplementasiActivityDTO>((r) => ({
            id: r.id,
            jenisKegiatan: r.jenisKegiatan,
            jam: r.jam,
            paraf: r.paraf,
          })),
          deletedActivityIds: deletedIds,
        };

        const res = await saveImplementasiList(payload);

        if (res.activities && Array.isArray(res.activities)) {
          setRows(mapInitialActivities(res.activities));
          setDeletedIds([]);
        } else {
          setRows(newRows);
        }

        setFormData({
          jenisKegiatan: "",
          paraf: "",
          customKegiatan: "",
        });
        setEditingLocalId(null);
        setShowForm(false);
        setSubmitSuccess(true);
        if (onSaved) onSaved();
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menyimpan"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [rows, deletedIds, meta, formData, editingLocalId, onSaved]
  );

  return {
    rows,
    systemTime,
    showForm,
    formData,
    isSubmitting,
    submitError,
    submitSuccess,
    handleFormChange,
    toggleForm,
    closeForm,
    startEdit,
    handleDeleteRow,
    handleSubmit,
  };
};
