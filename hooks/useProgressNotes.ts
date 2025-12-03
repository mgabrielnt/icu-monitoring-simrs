"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import type {
  MonitoringMeta,
  ProgressNoteDTO,
  ProgressNoteState,
  SaveProgressNotesPayload,
} from "@/types/monitoring";
import { saveProgressNotes } from "@/lib/icuMonitoring";

export type ProgressNoteField =
  | "tglJam"
  | "jenis"
  | "hasilAssesmen"
  | "instruksiPPA"
  | "namaPerawat";

export interface UseProgressNotesArgs {
  meta: MonitoringMeta;
  initialNotes?: ProgressNoteDTO[] | null;
  onSaved?: () => void;
}

export function useProgressNotes({
  meta,
  initialNotes,
  onSaved,
}: UseProgressNotesArgs) {
  const [notes, setNotes] = useState<ProgressNoteState[]>(() =>
    mapInitialNotes(initialNotes, meta)
  );
  const [deletedNoteIds, setDeletedNoteIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function addNote() {
    setNotes((prev) => [...prev, createEmptyNote(meta)]);
  }

  function updateNoteField(
    localId: string,
    field: ProgressNoteField,
    value: string
  ) {
    setNotes((prev) =>
      prev.map((note) =>
        note._localId === localId ? { ...note, [field]: value } : note
      )
    );
  }

  function removeNote(localId: string) {
    setNotes((prev) => {
      const note = prev.find((n) => n._localId === localId);
      if (note?.id) {
        setDeletedNoteIds((ids) =>
          ids.includes(note.id!) ? ids : [...ids, note.id!]
        );
      }
      return prev.filter((n) => n._localId !== localId);
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!meta.noRm || !meta.tanggal) {
      setSubmitError("No. RM dan tanggal wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const payload: SaveProgressNotesPayload = {
      meta,
      notes: notes.map(stripLocalId),
      deletedNoteIds,
    };

    const res = await saveProgressNotes(payload);

    if (!res.ok) {
      setSubmitError(
        res.message ?? "Gagal menyimpan catatan perkembangan."
      );
      setIsSubmitting(false);
      return;
    }

    setSubmitSuccess(true);
    setDeletedNoteIds([]);

    if (Array.isArray(res.notes)) {
      setNotes(mapInitialNotes(res.notes, meta));
    }

    onSaved?.();

    setIsSubmitting(false);
  }

  return {
    notes,
    isSubmitting,
    submitError,
    submitSuccess,
    addNote,
    updateNoteField,
    removeNote,
    handleSubmit,
  };
}

/* ========= Helpers ========= */

function createLocalId() {
  return `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function createEmptyNote(meta: MonitoringMeta): ProgressNoteState {
  const baseDate = meta.tanggal ?? new Date().toISOString().slice(0, 10);
  const defaultTime = "08:00";
  const tglJam = `${baseDate}T${defaultTime}`;

  return {
    _localId: createLocalId(),
    id: undefined,
    tglJam,
    jenis: "O",
    hasilAssesmen: "",
    instruksiPPA: "",
    namaPerawat: "",
  };
}

function mapInitialNotes(
  notes: ProgressNoteDTO[] | null | undefined,
  meta: MonitoringMeta
): ProgressNoteState[] {
  if (!notes || notes.length === 0) {
    return [createEmptyNote(meta)];
  }

  return notes
    .slice()
    .sort((a, b) => a.tglJam.localeCompare(b.tglJam))
    .map((n) => ({
      ...n,
      _localId: createLocalId(),
    }));
}

function stripLocalId(note: ProgressNoteState): ProgressNoteDTO {
  const { _localId, ...rest } = note;
  return rest;
}
