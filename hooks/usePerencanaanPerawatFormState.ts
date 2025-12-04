// hooks/usePerencanaanPerawatFormState.ts
"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  CreatePerencanaanPerawatImplementationPayload,
  PerencanaanPerawatActivity,
  Shift,
} from "@/types/perencanaanPerawat";

interface UsePerencanaanPerawatFormStateProps {
  activities: PerencanaanPerawatActivity[];
  onSubmit: (
    payload: CreatePerencanaanPerawatImplementationPayload
  ) => Promise<unknown>;
}

export function usePerencanaanPerawatFormState({
  activities,
  onSubmit,
}: UsePerencanaanPerawatFormStateProps) {
  const [shift, setShift] = useState<Shift | null>(null);
  const [activityId, setActivityId] = useState<number>(activities[0]?.id ?? 1);
  const [customActivityLabel, setCustomActivityLabel] = useState("");
  const [nurseName, setNurseName] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [dpjpVerification, setDpjpVerification] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedActivity = useMemo(
    () => activities.find((a) => a.id === activityId),
    [activities, activityId]
  );

  const isOtherActivity =
    selectedActivity?.label.toLowerCase().startsWith("kegiatan lain") ?? false;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!shift) {
      setError("Silakan pilih shift perawat jaga terlebih dahulu.");
      return;
    }

    if (!nurseName.trim() || !bedNumber.trim() || !time) {
      setError("Nama perawat, tempat tidur, dan jam wajib diisi.");
      return;
    }

    if (isOtherActivity && !customActivityLabel.trim()) {
      setError("Kegiatan lain wajib diisi.");
      return;
    }

    const payload: CreatePerencanaanPerawatImplementationPayload = {
      activityId,
      customActivityLabel: isOtherActivity
        ? customActivityLabel.trim()
        : undefined,
      nurseName,
      bedNumber,
      shift,
      time,
      notes: notes || undefined,
      dpjpVerification: dpjpVerification || undefined,
    };

    try {
      await onSubmit(payload);
      setSuccess("Tindakan berhasil disimpan.");

      setTime("");
      setNotes("");
      setDpjpVerification("");
      if (isOtherActivity) setCustomActivityLabel("");
    } catch (err: any) {
      setError(err?.message ?? "Gagal menyimpan data.");
    }
  };

  return {
    shift,
    setShift,
    activityId,
    setActivityId,
    customActivityLabel,
    setCustomActivityLabel,
    nurseName,
    setNurseName,
    bedNumber,
    setBedNumber,
    time,
    setTime,
    notes,
    setNotes,
    dpjpVerification,
    setDpjpVerification,
    isOtherActivity,
    error,
    success,
    handleSubmit,
  };
}
