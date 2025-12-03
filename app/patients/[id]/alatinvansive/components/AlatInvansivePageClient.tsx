// D:\projek-medis\icu-monitoring-simrs\app\patients\[id]\alatinvansive\components\AlatInvansivePageClient.tsx

"use client";

import { useState } from "react";
import { useAlatInvansiveState } from "@/hooks/useAlatInvansiveState";
import type {
  InvansifTubeFormData,
  InvansifTubeEntry,
  ResikoJatuhFormData,
  ResikoJatuhEntry,
  BalanceCairFormData,
  BalanceCairEntry,
} from "@/types/alatinvansive";

import AlatInvansiveHeaderCard from "./AlatInvansiveHeaderCard";
import AlatInvansiveFormModal from "./AlatInvansiveFormModal";
import ResikoJatuhFormModal from "./ResikoJatuhFormModal";
import BalanceCairFormModal from "./BalanceCairFormModal";
import AlatInvansiveTable from "./AlatInvansiveTable";
import ResikoJatuhTable from "./ResikoJatuhTable";
import BalanceCairTable from "./BalanceCairTable";

interface Props {
  patientId: string;
}

export default function AlatInvansivePageClient({ patientId }: Props) {
  const {
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
  } = useAlatInvansiveState(patientId);

  // state buka tutup modal
  const [openInvansifModal, setOpenInvansifModal] = useState(false);
  const [openResikoModal, setOpenResikoModal] = useState(false);
  const [openBalanceModal, setOpenBalanceModal] = useState(false);

  // id yang sedang di-edit (jika null = create)
  const [editingInvansifId, setEditingInvansifId] = useState<string | null>(
    null
  );
  const [editingResikoId, setEditingResikoId] = useState<string | null>(null);
  const [editingBalanceId, setEditingBalanceId] = useState<string | null>(null);

  // ========= open modal (mode create) =========

  const openNewInvansif = () => {
    setEditingInvansifId(null);
    setOpenInvansifModal(true);
  };

  const openNewResiko = () => {
    setEditingResikoId(null);
    setOpenResikoModal(true);
  };

  const openNewBalance = () => {
    setEditingBalanceId(null);
    setOpenBalanceModal(true);
  };

  // ========= open modal (mode edit) =========

  const handleEditInvansif = (entryId: string) => {
    const entry: InvansifTubeEntry | undefined = invansifEntries.find(
      (e) => e.id === entryId
    );
    if (!entry) return;
    setEditingInvansifId(entryId);
    setOpenInvansifModal(true);
    // NOTE: untuk sekarang form belum prefill;
    // nanti bisa kita tambahkan initialValue ke modal.
  };

  const handleEditResiko = (entryId: string) => {
    const entry: ResikoJatuhEntry | undefined = resikoEntries.find(
      (e) => e.id === entryId
    );
    if (!entry) return;
    setEditingResikoId(entryId);
    setOpenResikoModal(true);
  };

  const handleEditBalance = (entryId: string) => {
    const entry: BalanceCairEntry | undefined = balanceEntries.find(
      (e) => e.id === entryId
    );
    if (!entry) return;
    setEditingBalanceId(entryId);
    setOpenBalanceModal(true);
  };

  // ========= submit handler (create / edit) =========

  const handleSubmitInvansif = (
    payload: InvansifTubeFormData
  ): Promise<string | null> => {
    if (editingInvansifId) {
      // EDIT → PUT
      return updateInvansif(editingInvansifId, payload).then(
        (msg: string | null) => {
          if (!msg) {
            setOpenInvansifModal(false);
            setEditingInvansifId(null);
          }
          return msg;
        }
      );
    }

    // CREATE → POST
    return submitInvansif(payload).then((msg: string | null) => {
      if (!msg) {
        setOpenInvansifModal(false);
      }
      return msg;
    });
  };

  const handleSubmitResiko = (
    payload: ResikoJatuhFormData
  ): Promise<string | null> => {
    if (editingResikoId) {
      return updateResiko(editingResikoId, payload).then(
        (msg: string | null) => {
          if (!msg) {
            setOpenResikoModal(false);
            setEditingResikoId(null);
          }
          return msg;
        }
      );
    }
    return submitResiko(payload).then((msg: string | null) => {
      if (!msg) {
        setOpenResikoModal(false);
      }
      return msg;
    });
  };

  const handleSubmitBalance = (
    payload: BalanceCairFormData
  ): Promise<string | null> => {
    if (editingBalanceId) {
      return updateBalance(editingBalanceId, payload).then(
        (msg: string | null) => {
          if (!msg) {
            setOpenBalanceModal(false);
            setEditingBalanceId(null);
          }
          return msg;
        }
      );
    }
    return submitBalance(payload).then((msg: string | null) => {
      if (!msg) {
        setOpenBalanceModal(false);
      }
      return msg;
    });
  };

  // ========= RENDER =========

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-3 sm:px-4 lg:px-0">
        {/* Header summary */}
        <AlatInvansiveHeaderCard
          patientId={patientId}
          snapshot={snapshot}
          onOpenInvansif={openNewInvansif}
          onOpenResikoJatuh={openNewResiko}
          onOpenBalanceCair={openNewBalance}
        />

        {/* Tables */}
        <div className="space-y-6">
          <AlatInvansiveTable
            entries={invansifEntries}
            onEdit={handleEditInvansif}
          />
          <ResikoJatuhTable
            entries={resikoEntries}
            onEdit={handleEditResiko}
          />
          <BalanceCairTable
            entries={balanceEntries}
            onEdit={handleEditBalance}
          />
        </div>
      </div>

      {/* Modals */}
      <AlatInvansiveFormModal
        open={openInvansifModal}
        onClose={() => {
          if (!submitting) {
            setOpenInvansifModal(false);
            setEditingInvansifId(null);
          }
        }}
        onSubmit={handleSubmitInvansif}
        isSubmitting={submitting}
      />

      <ResikoJatuhFormModal
        open={openResikoModal}
        onClose={() => {
          if (!submitting) {
            setOpenResikoModal(false);
            setEditingResikoId(null);
          }
        }}
        onSubmit={handleSubmitResiko}
        isSubmitting={submitting}
      />

      <BalanceCairFormModal
        open={openBalanceModal}
        onClose={() => {
          if (!submitting) {
            setOpenBalanceModal(false);
            setEditingBalanceId(null);
          }
        }}
        onSubmit={handleSubmitBalance}
        isSubmitting={submitting}
      />
    </div>
  );
}
