// src/hooks/useProgressNotes.ts

"use client";

import { FormEvent, useCallback, useState } from "react";
import {
  MonitoringMeta,
  ProgressNoteDTO,
  ProgressNoteState,
  SaveProgressNotesPayload,
} from "@/types/monitoring";
import { saveProgressNotes } from "@/lib/icuMonitoring";

const createLocalId = () => Math.random().toString(36).slice(2);

const nowDateTimeLocal = () => {
  const d = new Date();
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60_000);
  return local.toISOString().slice(0, 16);
};

const mapInitialNotesToState = (
  initialNotes?: ProgressNoteDTO[] | null
): ProgressNoteState[] => {
  if (!initialNotes || initialNotes.length === 0) {
    return [
      {
        id: undefined,
        tglJam: nowDateTimeLocal(),
        jenis: "O",
        hasilAssesmen: "",
        instruksiPPA: "",
        namaPerawat: "",
        _localId: createLocalId(),
      },
    ];
  }

  return initialNotes.map((n) => ({
    ...n,
    tglJam: n.tglJam || nowDateTimeLocal(),
    _localId: createLocalId(),
  }));
};

interface UseProgressNotesOptions {
  meta: MonitoringMeta;
  initialNotes?: ProgressNoteDTO[] | null;
  onSaved?: () => void;
}

export const useProgressNotes = ({
  meta,
  initialNotes,
  onSaved,
}: UseProgressNotesOptions) => {
  const [notes, setNotes] = useState<ProgressNoteState[]>(() =>
    mapInitialNotesToState(initialNotes)
  );
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleNoteChange = useCallback(
    (
      localId: string,
      field: keyof ProgressNoteDTO,
      value: string
    ) => {
      setNotes((prev) =>
        prev.map((n) =>
          n._localId === localId ? { ...n, [field]: value } : n
        )
      );
    },
    []
  );

  const handleAddNote = useCallback(() => {
    setNotes((prev) => [
      ...prev,
      {
        id: undefined,
        tglJam: nowDateTimeLocal(),
        jenis: "O",
        hasilAssesmen: "",
        instruksiPPA: "",
        namaPerawat: "",
        _localId: createLocalId(),
      },
    ]);
  }, []);

  const handleRemoveNote = useCallback((localId: string) => {
    setNotes((prev) => {
      if (prev.length === 1) return prev;
      const target = prev.find((n) => n._localId === localId);
      if (target?.id) {
        setDeletedIds((ids) => [...ids, target.id as string]);
      }
      return prev.filter((n) => n._localId !== localId);
    });
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      try {
        const payload: SaveProgressNotesPayload = {
          meta,
          notes: notes.map(({ _localId, ...rest }) => rest),
          deletedNoteIds: deletedIds,
        };

        const res = await saveProgressNotes(payload);

        if (res.notes && Array.isArray(res.notes)) {
          setNotes(mapInitialNotesToState(res.notes));
          setDeletedIds([]);
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
    [meta, notes, deletedIds, onSaved]
  );

  return {
    notes,
    isSubmitting,
    submitError,
    submitSuccess,
    handleNoteChange,
    handleAddNote,
    handleRemoveNote,
    handleSubmit,
  };
};
