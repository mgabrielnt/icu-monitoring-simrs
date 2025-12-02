// app/patients/[id]/perkembanganpasien/components/CatatanTerintegrasiClient.tsx

"use client";

import React from "react";
import { MonitoringMeta, ProgressNoteDTO } from "@/types/monitoring";
import { useProgressNotes } from "@/hooks/useProgressNotes";
import CatatanTerintegrasiHeader from "./CatatanTerintegrasiHeader";
import CatatanTerintegrasiForm from "./CatatanTerintegrasiForm";

export interface CatatanTerintegrasiClientProps {
  noRm?: string;
  tanggal?: string;
  hariPerawatanKe?: number;
  initialNotes?: ProgressNoteDTO[] | null;
  onSaved?: () => void;
}

const CatatanTerintegrasiClient: React.FC<
  CatatanTerintegrasiClientProps
> = ({ noRm, tanggal, hariPerawatanKe, initialNotes, onSaved }) => {
  const meta: MonitoringMeta = {
    noRm: noRm || null,
    tanggal: tanggal || null,
    hariPerawatanKe:
      typeof hariPerawatanKe === "number" ? hariPerawatanKe : null,
  };

  const {
    notes,
    isSubmitting,
    submitError,
    submitSuccess,
    handleNoteChange,
    handleAddNote,
    handleRemoveNote,
    handleSubmit,
  } = useProgressNotes({
    meta,
    initialNotes,
    onSaved,
  });

  return (
    <div className="space-y-5">
      <CatatanTerintegrasiHeader
        noRm={noRm}
        tanggal={tanggal}
        hariPerawatanKe={hariPerawatanKe}
      />

      <CatatanTerintegrasiForm
        notes={notes}
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
        handleNoteChange={handleNoteChange}
        handleAddNote={handleAddNote}
        handleRemoveNote={handleRemoveNote}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CatatanTerintegrasiClient;
