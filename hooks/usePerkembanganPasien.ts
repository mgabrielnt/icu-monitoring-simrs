"use client";

import { useEffect, useState } from "react";
import type { PerkembanganPasienNote } from "@/types/perkembanganPasien";
import { fetchPerkembanganPasienNotes } from "@/services/perkembanganPasienService";

interface UsePerkembanganPasienOptions {
  patientId: string;
  initialData?: PerkembanganPasienNote[];
}

export function usePerkembanganPasien({
  patientId,
  initialData,
}: UsePerkembanganPasienOptions) {
  const [notes, setNotes] = useState<PerkembanganPasienNote[]>(initialData ?? []);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) return;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchPerkembanganPasienNotes(patientId);
        if (!cancelled) setNotes(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Gagal memuat perkembangan pasien.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [patientId, initialData]);

  const addNote = (note: PerkembanganPasienNote) => {
    setNotes((prev) => [note, ...prev]);
  };

  return {
    notes,
    loading,
    error,
    addNote,
  };
}
