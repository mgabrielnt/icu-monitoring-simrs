"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Container from "@/components/Container";
import { useAlatInvansiveState } from "@/hooks/useAlatInvansiveState";
import type {
  InvansifTubeFormData,
  ResikoJatuhFormData,
  BalanceCairFormData,
} from "@/types/alatinvansive";
import AlatInvansiveHeroHeader from "./components/AlatInvansiveHeroHeader";
import AlatInvansiveSnapshotPanel from "./components/AlatInvansiveSnapshotPanel";
import AlatInvansiveFormModal from "./components/modal/AlatInvansiveFormModal";
import ResikoJatuhFormModal from "./components/modal/ResikoJatuhFormModal";
import BalanceCairFormModal from "./components/modal/BalanceCairFormModal";
import AlatInvansiveTable from "./components/table/AlatInvansiveTable";
import ResikoJatuhTable from "./components/table/ResikoJatuhTable";
import BalanceCairTable from "./components/table/BalanceCairTable";

export default function AlatInvansivePage() {
  const params = useParams<{ id: string }>();
  const patientId = params?.id ?? "";

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

  const [openInvansifModal, setOpenInvansifModal] = useState(false);
  const [openResikoModal, setOpenResikoModal] = useState(false);
  const [openBalanceModal, setOpenBalanceModal] = useState(false);
  const [editingInvansifId, setEditingInvansifId] = useState<string | null>(null);
  const [editingResikoId, setEditingResikoId] = useState<string | null>(null);
  const [editingBalanceId, setEditingBalanceId] = useState<string | null>(null);

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

  const handleEditInvansif = (entryId: string) => {
    if (!invansifEntries.find((entry) => entry.id === entryId)) return;
    setEditingInvansifId(entryId);
    setOpenInvansifModal(true);
  };

  const handleEditResiko = (entryId: string) => {
    if (!resikoEntries.find((entry) => entry.id === entryId)) return;
    setEditingResikoId(entryId);
    setOpenResikoModal(true);
  };

  const handleEditBalance = (entryId: string) => {
    if (!balanceEntries.find((entry) => entry.id === entryId)) return;
    setEditingBalanceId(entryId);
    setOpenBalanceModal(true);
  };

  const handleSubmitInvansif = (payload: InvansifTubeFormData) => {
    if (editingInvansifId) {
      return updateInvansif(editingInvansifId, payload).then((message) => {
        if (!message) {
          setOpenInvansifModal(false);
          setEditingInvansifId(null);
        }
        return message;
      });
    }

    return submitInvansif(payload).then((message) => {
      if (!message) setOpenInvansifModal(false);
      return message;
    });
  };

  const handleSubmitResiko = (payload: ResikoJatuhFormData) => {
    if (editingResikoId) {
      return updateResiko(editingResikoId, payload).then((message) => {
        if (!message) {
          setOpenResikoModal(false);
          setEditingResikoId(null);
        }
        return message;
      });
    }

    return submitResiko(payload).then((message) => {
      if (!message) setOpenResikoModal(false);
      return message;
    });
  };

  const handleSubmitBalance = (payload: BalanceCairFormData) => {
    if (editingBalanceId) {
      return updateBalance(editingBalanceId, payload).then((message) => {
        if (!message) {
          setOpenBalanceModal(false);
          setEditingBalanceId(null);
        }
        return message;
      });
    }

    return submitBalance(payload).then((message) => {
      if (!message) setOpenBalanceModal(false);
      return message;
    });
  };

  const handleCloseInvansifModal = () => {
    if (!submitting) {
      setOpenInvansifModal(false);
      setEditingInvansifId(null);
    }
  };

  const handleCloseResikoModal = () => {
    if (!submitting) {
      setOpenResikoModal(false);
      setEditingResikoId(null);
    }
  };

  const handleCloseBalanceModal = () => {
    if (!submitting) {
      setOpenBalanceModal(false);
      setEditingBalanceId(null);
    }
  };

  return (
    <>
      <AlatInvansiveHeroHeader />

      <Container>
        <div className="space-y-5">
          <AlatInvansiveSnapshotPanel
            snapshot={snapshot}
            onOpenInvansif={openNewInvansif}
            onOpenResikoJatuh={openNewResiko}
            onOpenBalanceCair={openNewBalance}
          />

          <AlatInvansiveTable entries={invansifEntries} onEdit={handleEditInvansif} />
          <ResikoJatuhTable entries={resikoEntries} onEdit={handleEditResiko} />
          <BalanceCairTable entries={balanceEntries} onEdit={handleEditBalance} />
        </div>
      </Container>

      <AlatInvansiveFormModal
        open={openInvansifModal}
        onClose={handleCloseInvansifModal}
        onSubmit={handleSubmitInvansif}
        isSubmitting={submitting}
      />

      <ResikoJatuhFormModal
        open={openResikoModal}
        onClose={handleCloseResikoModal}
        onSubmit={handleSubmitResiko}
        isSubmitting={submitting}
      />

      <BalanceCairFormModal
        open={openBalanceModal}
        onClose={handleCloseBalanceModal}
        onSubmit={handleSubmitBalance}
        isSubmitting={submitting}
      />
    </>
  );
}
