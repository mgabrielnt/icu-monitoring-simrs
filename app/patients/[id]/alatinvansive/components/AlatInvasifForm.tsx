// app/patients/[id]/alatinvansive/components/AlatInvasifForm.tsx

"use client";

import React from "react";
import AlatInvasifInvasiveTable, {
  AlatInvasifRowView,
  AlatInvasifField,
} from "./AlatInvasifInvasiveTable";
import AlatInvasifFallRiskCard from "./AlatInvasifFallRiskCard";
import AlatInvasifFluidBalanceCard from "./AlatInvasifFluidBalanceCard";
import AlatInvasifFooter from "./AlatInvasifFooter";

interface AlatInvasifFormProps {
  rows: AlatInvasifRowView[];
  fallRisk: Record<string, string>;
  fluidBalance: Record<string, string>;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  addRow: () => void;
  removeRow: (localId: string) => void;
  updateRow: (
    localId: string,
    field: AlatInvasifField,
    value: string
  ) => void;
  setFallRisk: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  setFluidBalance: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

const AlatInvasifForm: React.FC<AlatInvasifFormProps> = ({
  rows,
  fallRisk,
  fluidBalance,
  isSubmitting,
  submitError,
  submitSuccess,
  addRow,
  removeRow,
  updateRow,
  setFallRisk,
  setFluidBalance,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-5"
    >
      <AlatInvasifInvasiveTable
        rows={rows}
        addRow={addRow}
        removeRow={removeRow}
        updateRow={updateRow}
      />

      <section className="grid gap-4 lg:grid-cols-[1.2fr,1.3fr]">
        <AlatInvasifFallRiskCard
          fallRisk={fallRisk}
          setFallRisk={setFallRisk}
        />
        <AlatInvasifFluidBalanceCard
          fluidBalance={fluidBalance}
          setFluidBalance={setFluidBalance}
        />
      </section>

      <AlatInvasifFooter
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
      />
    </form>
  );
};

export default AlatInvasifForm;
