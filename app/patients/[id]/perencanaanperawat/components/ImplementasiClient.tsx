// app/patients/[id]/perencanaanperawat/components/ImplementasiClient.tsx

"use client";

import React from "react";
import {
  ImplementasiActivityDTO,
  MonitoringMeta,
} from "@/types/monitoring";
import { useImplementasi } from "@/hooks/useImplementasi";
import ImplementasiHeader from "./ImplementasiHeader";
import ImplementasiTable from "./ImplementasiTable";
import ImplementasiForm from "./ImplementasiForm";
import ImplementasiNoteAlert from "./ImplementasiNoteAlert";

export interface ImplementasiClientProps {
  noRm?: string;
  tanggal?: string;
  hariPerawatanKe?: number;
  initialActivities?: ImplementasiActivityDTO[] | null;
  onSaved?: () => void;
}

const ImplementasiClient: React.FC<ImplementasiClientProps> = ({
  noRm,
  tanggal,
  hariPerawatanKe,
  initialActivities,
  onSaved,
}) => {
  const meta: MonitoringMeta = {
    noRm: noRm || null,
    tanggal: tanggal || null,
    hariPerawatanKe:
      typeof hariPerawatanKe === "number" ? hariPerawatanKe : null,
  };

  const {
    rows,
    systemTime,
    showForm,
    formData,
    isSubmitting,
    submitError,
    submitSuccess,
    handleFormChange,
    toggleForm,
    closeForm,
    startEdit,
    handleDeleteRow,
    handleSubmit,
  } = useImplementasi({
    meta,
    initialActivities,
    onSaved,
  });

  return (
    <div className="space-y-5">
      <ImplementasiHeader
        noRm={noRm}
        tanggal={tanggal}
        hariPerawatanKe={hariPerawatanKe}
        systemTime={systemTime}
      />

      <ImplementasiTable
        rows={rows}
        showForm={showForm}
        toggleForm={toggleForm}
        startEdit={startEdit}
        handleDeleteRow={handleDeleteRow}
      />

      {showForm && (
        <ImplementasiForm
          systemTime={systemTime}
          formData={formData}
          isSubmitting={isSubmitting}
          submitError={submitError}
          submitSuccess={submitSuccess}
          handleFormChange={handleFormChange}
          closeForm={closeForm}
          handleSubmit={handleSubmit}
        />
      )}

      <ImplementasiNoteAlert />
    </div>
  );
};

export default ImplementasiClient;
