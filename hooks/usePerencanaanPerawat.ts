// file: hooks/usePerencanaanPerawat.ts

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CreatePerencanaanPerawatImplementationPayload,
  PerencanaanPerawatImplementation,
} from "@/types/perencanaanPerawat";
import {
  createPerencanaanPerawat,
  fetchPerencanaanPerawat,
} from "@/services/perencanaanPerawatService";

export function usePerencanaanPerawat(patientId: string) {
  const [items, setItems] = useState<PerencanaanPerawatImplementation[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!patientId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPerencanaanPerawat(patientId);
      setItems(data);
    } catch (err: any) {
      setError(err?.message ?? "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (payload: CreatePerencanaanPerawatImplementationPayload) => {
      setCreating(true);
      setError(null);
      try {
        const created = await createPerencanaanPerawat(patientId, payload);
        setItems((prev) => [created, ...prev]);
        return created;
      } catch (err: any) {
        setError(err?.message ?? "Gagal menyimpan data");
        throw err;
      } finally {
        setCreating(false);
      }
    },
    [patientId]
  );

  return { items, loading, creating, error, reload: load, create };
}
