// D:\projek-medis\icu-monitoring-simrs\hooks\useAlatInvansiveState.ts

"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  AlatInvansiveSnapshot,
  InvansifTubeEntry,
  ResikoJatuhEntry,
  BalanceCairEntry,
  InvansifTubeFormData,
  ResikoJatuhFormData,
  BalanceCairFormData,
} from "@/types/alatinvansive";
import {
  loadInvansifHandler,
  loadResikoHandler,
  loadBalanceHandler,
  submitInvansifHandler,
  submitResikoHandler,
  submitBalanceHandler,
  updateInvansifHandler,
  updateResikoHandler,
  updateBalanceHandler,
} from "@/handlers/alatinvansiveHandlers";

export interface UseAlatInvansiveStateResult {
  invansifEntries: InvansifTubeEntry[];
  resikoEntries: ResikoJatuhEntry[];
  balanceEntries: BalanceCairEntry[];
  snapshot: AlatInvansiveSnapshot;
  submitting: boolean;
  // create
  submitInvansif: (form: InvansifTubeFormData) => Promise<string | null>;
  submitResiko: (form: ResikoJatuhFormData) => Promise<string | null>;
  submitBalance: (form: BalanceCairFormData) => Promise<string | null>;
  // update
  updateInvansif: (
    entryId: string,
    form: InvansifTubeFormData
  ) => Promise<string | null>;
  updateResiko: (
    entryId: string,
    form: ResikoJatuhFormData
  ) => Promise<string | null>;
  updateBalance: (
    entryId: string,
    form: BalanceCairFormData
  ) => Promise<string | null>;
}

export function useAlatInvansiveState(
  patientId: string
): UseAlatInvansiveStateResult {
  const [invansifEntries, setInvansifEntries] = useState<InvansifTubeEntry[]>(
    []
  );
  const [resikoEntries, setResikoEntries] = useState<ResikoJatuhEntry[]>([]);
  const [balanceEntries, setBalanceEntries] = useState<BalanceCairEntry[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // ====== LOAD awal dari backend ======
  useEffect(() => {
    let cancelled = false;

    const loadAll = async () => {
      try {
        const [inv, res, bal] = await Promise.all([
          loadInvansifHandler(patientId),
          loadResikoHandler(patientId),
          loadBalanceHandler(patientId),
        ]);

        if (cancelled) return;
        setInvansifEntries(inv ?? []);
        setResikoEntries(res ?? []);
        setBalanceEntries(bal ?? []);
      } catch (err) {
        console.error("Gagal load alatinvansive:", err);
      }
    };

    loadAll();
    return () => {
      cancelled = true;
    };
  }, [patientId]);

  // ====== Snapshot untuk header ======
  const snapshot = useMemo<AlatInvansiveSnapshot>(() => {
    const invansifCount = invansifEntries.length;

    const latestResikoEntry =
      resikoEntries[0] ?? resikoEntries[resikoEntries.length - 1];
    const latestResiko = latestResikoEntry?.totalSkorPr ?? null;

    const latestBalanceEntry =
      balanceEntries[balanceEntries.length - 1] ?? null;
    const latestBalance = latestBalanceEntry
      ? {
          bc24Jam: latestBalanceEntry.bc24Jam,
          bcKumulatif: latestBalanceEntry.bcKumulatif,
        }
      : null;

    return {
      invansifCount,
      latestResiko,
      latestBalance,
    };
  }, [invansifEntries, resikoEntries, balanceEntries]);

  // ====== helper create ======
  const wrapCreate =
    <F, E>(
      submitFn: (pid: string, form: F) => Promise<E>,
      setEntries: React.Dispatch<React.SetStateAction<E[]>>
    ) =>
    async (form: F): Promise<string | null> => {
      setSubmitting(true);
      try {
        const saved = await submitFn(patientId, form);
        setEntries((prev) => [saved, ...prev]);
        return null;
      } catch (err) {
        return err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan data.";
      } finally {
        setSubmitting(false);
      }
    };

  // ====== helper update (replace di state) ======
  const wrapUpdate =
    <F, E extends { id: string }>(
      updateFn: (pid: string, entryId: string, form: F) => Promise<E>,
      setEntries: React.Dispatch<React.SetStateAction<E[]>>
    ) =>
    async (entryId: string, form: F): Promise<string | null> => {
      setSubmitting(true);
      try {
        const updated = await updateFn(patientId, entryId, form);
        setEntries((prev) =>
          prev.map((e) => (e.id === entryId ? updated : e))
        );
        return null;
      } catch (err) {
        return err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memperbarui data.";
      } finally {
        setSubmitting(false);
      }
    };

  const submitInvansif = wrapCreate(
    submitInvansifHandler,
    setInvansifEntries
  );
  const submitResiko = wrapCreate(submitResikoHandler, setResikoEntries);
  const submitBalance = wrapCreate(
    submitBalanceHandler,
    setBalanceEntries
  );

  const updateInvansif = wrapUpdate(
    updateInvansifHandler,
    setInvansifEntries
  );
  const updateResiko = wrapUpdate(updateResikoHandler, setResikoEntries);
  const updateBalance = wrapUpdate(
    updateBalanceHandler,
    setBalanceEntries
  );

  return {
    invansifEntries,
    resikoEntries,
    balanceEntries,
    snapshot,
    submitting,
    submitInvansif,
    submitResiko,
    submitBalance,
    updateInvansif,
    updateResiko,
    updateBalance,
  };
}
