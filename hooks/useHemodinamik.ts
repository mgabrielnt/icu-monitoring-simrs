// hooks/useHemodinamik.ts

import { useState, useCallback } from "react";
import { HemodinamikService } from "@/services/hemodinamik.service";
import { createId, formatTime, validateRange } from "@/lib/hemodinamik.utils";
import { VALIDATION_RANGES } from "@/lib/hemodinamik.constants";
import type {
  HemodinamikEntry,
  HemodinamikFormData,
  HemodinamikPayload,
  HemodinamikMetadata,
} from "@/types/hemodinamik.types";

const INITIAL_FORM_STATE: HemodinamikFormData = {
  sistol: "",
  diastol: "",
  hr: "",
  map: "",
  temp: "",
  kesadaran: "",
  iramaEkg: "",
  skorNyeri: "",
  cvp: "",
};

export const useHemodinamik = (metadata?: HemodinamikMetadata) => {
  const [entries, setEntries] = useState<HemodinamikEntry[]>([]);
  const [form, setForm] = useState<HemodinamikFormData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    (field: keyof HemodinamikFormData, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM_STATE);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  const validateForm = useCallback((): boolean => {
    const { SISTOL, DIASTOL, HR, MAP, TEMP } = VALIDATION_RANGES;

    if (
      !validateRange(form.sistol, SISTOL.min, SISTOL.max) ||
      !validateRange(form.diastol, DIASTOL.min, DIASTOL.max) ||
      !validateRange(form.hr, HR.min, HR.max) ||
      !validateRange(form.map, MAP.min, MAP.max) ||
      !validateRange(form.temp, TEMP.min, TEMP.max)
    ) {
      setSubmitError(
        `Sistol, Diastol, HR, MAP (${SISTOL.min}-${SISTOL.max}) dan Temp (${TEMP.min}-${TEMP.max}) harus dalam rentang yang valid.`
      );
      return false;
    }

    return true;
  }, [form]);

  const handleSubmit = useCallback(async () => {
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      const jam = formatTime(now);

      const entry: HemodinamikEntry = {
        id: createId(),
        jam,
        sistol: Number(form.sistol),
        diastol: Number(form.diastol),
        hr: Number(form.hr),
        map: Number(form.map),
        temp: Number(form.temp),
        kesadaran: form.kesadaran,
        iramaEkg: form.iramaEkg,
        skorNyeri: form.skorNyeri,
        cvp: form.cvp || undefined,
      };

      const payload: HemodinamikPayload = {
        meta: metadata || {
          noRm: null,
          tanggal: null,
          hariPerawatanKe: null,
        },
        measurement: entry,
      };

      // Simpan ke backend
      await HemodinamikService.saveHemodinamik(payload);

      // Update local state
      setEntries((prev) => [...prev, entry]);

      resetForm();
      setSubmitSuccess(true);

      return true;
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan"
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, metadata, validateForm, resetForm]);

  const loadEntries = useCallback(async (noRm?: string) => {
    setIsLoading(true);
    try {
      const data = noRm
        ? await HemodinamikService.fetchHemodinamikByNoRm(noRm)
        : await HemodinamikService.fetchAllHemodinamik();
      setEntries(data);
    } catch (error) {
      console.error("Error loading hemodinamik entries:", error);
      setEntries([]); // Set empty array jika error
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    entries,
    form,
    isSubmitting,
    isLoading,
    submitError,
    submitSuccess,
    handleChange,
    handleSubmit,
    resetForm,
    loadEntries,
    setSubmitSuccess,
  };
};