"use client";

import { useState } from "react";
import Container from "@/components/Container";
import ContainerContent from "@/components/ContainerContent";

import { useAlatInvansiveState } from "@/hooks/useAlatInvansiveState";
import type {
  InvansifTubeFormData,
  InvansifTubeEntry,
  ResikoJatuhFormData,
  ResikoJatuhEntry,
  BalanceCairFormData,
  BalanceCairEntry,
} from "@/types/alatinvansive";

import AlatInvansiveHeroHeader from "./components/AlatInvansiveHeroHeader";
import AlatInvansiveSnapshotPanel from "./components/AlatInvansiveSnapshotPanel";
import AlatInvansiveFormModal from "./components/AlatInvansiveFormModal";
import ResikoJatuhFormModal from "./components/ResikoJatuhFormModal";
import BalanceCairFormModal from "./components/BalanceCairFormModal";
import AlatInvansiveTable from "./components/AlatInvansiveTable";
import ResikoJatuhTable from "./components/ResikoJatuhTable";
import BalanceCairTable from "./components/BalanceCairTable";

interface Props {
  params: {
    id: string;
  };
}

export default function AlatInvansivePage({ params }: Props) {
  const patientId = params.id;

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

  // ========= STATE =========
  const [openInvansifModal, setOpenInvansifModal] = useState(false);
  const [openResikoModal, setOpenResikoModal] = useState(false);
  const [openBalanceModal, setOpenBalanceModal] = useState(false);

  const [editingInvansifId, setEditingInvansifId] = useState<string | null>(null);
  const [editingResikoId, setEditingResikoId] = useState<string | null>(null);
  const [editingBalanceId, setEditingBalanceId] = useState<string | null>(null);

  // ========= HANDLERS =========

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
    if (!invansifEntries.find((e) => e.id === entryId)) return;
    setEditingInvansifId(entryId);
    setOpenInvansifModal(true);
  };

  const handleEditResiko = (entryId: string) => {
    if (!resikoEntries.find((e) => e.id === entryId)) return;
    setEditingResikoId(entryId);
    setOpenResikoModal(true);
  };

  const handleEditBalance = (entryId: string) => {
    if (!balanceEntries.find((e) => e.id === entryId)) return;
    setEditingBalanceId(entryId);
    setOpenBalanceModal(true);
  };

  const handleSubmitInvansif = (payload: InvansifTubeFormData) => {
    if (editingInvansifId) {
      return updateInvansif(editingInvansifId, payload).then((msg) => {
        if (!msg) {
          setOpenInvansifModal(false);
          setEditingInvansifId(null);
        }
        return msg;
      });
    }
    return submitInvansif(payload).then((msg) => {
      if (!msg) setOpenInvansifModal(false);
      return msg;
    });
  };

  const handleSubmitResiko = (payload: ResikoJatuhFormData) => {
    if (editingResikoId) {
      return updateResiko(editingResikoId, payload).then((msg) => {
        if (!msg) {
          setOpenResikoModal(false);
          setEditingResikoId(null);
        }
        return msg;
      });
    }
    return submitResiko(payload).then((msg) => {
      if (!msg) setOpenResikoModal(false);
      return msg;
    });
  };

  const handleSubmitBalance = (payload: BalanceCairFormData) => {
    if (editingBalanceId) {
      return updateBalance(editingBalanceId, payload).then((msg) => {
        if (!msg) {
          setOpenBalanceModal(false);
          setEditingBalanceId(null);
        }
        return msg;
      });
    }
    return submitBalance(payload).then((msg) => {
      if (!msg) setOpenBalanceModal(false);
      return msg;
    });
  };

  // Close handlers
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

  // ========= RENDER =========
  return (
    <Container className="p-6 space-y-6">

      {/* HEADER */}
      <ContainerContent>
        <AlatInvansiveHeroHeader />
      </ContainerContent>

      {/* SNAPSHOT + ACTION BUTTONS */}
      <ContainerContent>
        <AlatInvansiveSnapshotPanel
          snapshot={snapshot}
          onOpenInvansif={openNewInvansif}
          onOpenResikoJatuh={openNewResiko}
          onOpenBalanceCair={openNewBalance}
        />
      </ContainerContent>

      {/* TABLE SECTION */}
      <ContainerContent>
        <div className="space-y-8">
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
      </ContainerContent>

      {/* ALL MODALS */}
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

    </Container>
  );
}
