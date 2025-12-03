"use client";

import React from "react";

import type { ImplementasiActivityState } from "@/types/monitoring";
import type {
  NurseShift,
  ImplementasiField,
} from "./implementasiUiTypes";

import ImplementasiHeader from "./ImplementasiHeader";
import NurseSection from "./NurseSection";
import ActivitiesTable from "./ActivitiesTable";
import ImplementasiFooter from "./ImplementasiFooter";

interface ImplementasiFormProps {
  tanggal?: string;
  onChangeDate: (newDate: string) => void;

  activities: ImplementasiActivityState[];
  addRow: () => void;
  removeRow: (localId: string) => void;
  updateRow: (
    localId: string,
    field: ImplementasiField,
    value: string
  ) => void;

  selectedShift: NurseShift;
  setSelectedShift: (shift: NurseShift) => void;
  currentNurse: {
    namaPerawat: string;
    tempatTidur: string;
  };
  updateCurrentNurseField: (
    field: "namaPerawat" | "tempatTidur",
    value: string
  ) => void;

  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ImplementasiForm: React.FC<ImplementasiFormProps> = ({
  tanggal,
  onChangeDate,
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
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-5"
    >
      <ImplementasiHeader
        tanggal={tanggal}
        onChangeDate={onChangeDate}
        selectedShift={selectedShift}
        setSelectedShift={setSelectedShift}
      />

      <NurseSection
        selectedShift={selectedShift}
        currentNurse={currentNurse}
        updateCurrentNurseField={updateCurrentNurseField}
      />

      <ActivitiesTable
        activities={activities}
        addRow={addRow}
        removeRow={removeRow}
        updateRow={updateRow}
      />

      <ImplementasiFooter
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
      />
    </form>
  );
};

export default ImplementasiForm;
