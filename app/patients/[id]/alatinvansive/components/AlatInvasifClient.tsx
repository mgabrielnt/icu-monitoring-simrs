// app/patients/[id]/alatinvansive/components/AlatInvasifClient.tsx

"use client";

import React from "react";
import {
  MonitoringMeta,
  MonitoringPage2DTO,
} from "@/types/monitoring";
import { useAlatInvasifForm } from "@/hooks/useAlatInvasif";
import AlatInvasifHeader from "./AlatInvasifHeader";
import AlatInvasifForm from "./AlatInvasifForm";

export interface AlatInvasifClientProps {
  noRm?: string;
  tanggal?: string;
  hariPerawatanKe?: number;
  initialData?: MonitoringPage2DTO | null;
  onSaved?: () => void;
}

const AlatInvasifClient: React.FC<AlatInvasifClientProps> = ({
  noRm,
  tanggal,
  hariPerawatanKe,
  initialData,
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
    fallRisk,
    fluidBalance,
    isSubmitting,
    submitError,
    submitSuccess,
    updateRow,
    addRow,
    removeRow,
    setFallRisk,
    setFluidBalance,
    handleSubmit,
  } = useAlatInvasifForm({
    meta,
    initialData,
    onSaved,
  });

  return (
    <div className="space-y-5">
      <AlatInvasifHeader
        noRm={noRm}
        tanggal={tanggal}
        hariPerawatanKe={hariPerawatanKe}
      />

      <AlatInvasifForm
        rows={rows}
        fallRisk={fallRisk}
        fluidBalance={fluidBalance}
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
        addRow={addRow}
        removeRow={removeRow}
        updateRow={updateRow}
        setFallRisk={setFallRisk}
        setFluidBalance={setFluidBalance}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AlatInvasifClient;
