"use client";

import React from "react";

import ImplementasiForm from "./ImplementasiForm";
import { useImplementasiClient } from "@/hooks/useImplementasiClient";
import type { ImplementasiActivityDTO } from "@/types/monitoring";

interface ImplementasiClientProps {
  noRm: string;
  tanggal?: string;
  hariPerawatanKe?: number;
  initialActivities:
    | ImplementasiActivityDTO
    | ImplementasiActivityDTO[]
    | null;
}

const ImplementasiClient: React.FC<ImplementasiClientProps> = (
  props
) => {
  const {
    tanggal,
    activities,
    addRow,
    removeRow,
    updateRow,
    selectedShift,
    setSelectedShift,
    currentNurse,
    updateCurrentNurseField,
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit,
    handleChangeDate,
  } = useImplementasiClient(props);

  return (
    <ImplementasiForm
      tanggal={tanggal}
      onChangeDate={handleChangeDate}
      activities={activities}
      addRow={addRow}
      removeRow={removeRow}
      updateRow={updateRow}
      selectedShift={selectedShift}
      setSelectedShift={setSelectedShift}
      currentNurse={currentNurse}
      updateCurrentNurseField={updateCurrentNurseField}
      isSubmitting={isSubmitting}
      submitError={submitError}
      submitSuccess={submitSuccess}
      handleSubmit={handleSubmit}
    />
  );
};

export default ImplementasiClient;
