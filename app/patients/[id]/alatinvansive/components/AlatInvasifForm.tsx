// app/patients/[id]/alatinvansive/components/AlatInvasifForm.tsx
"use client";

import React from "react";

import type {
  DeviceRowUI,
  DeviceCode,
  DeviceField,
  FallRiskForm,
  FluidBalanceForm,
} from "@/types/monitoring";

import DeviceGroupSection from "./DeviceGroupSection";
import FallRiskSection from "./FallRiskSection";
import FluidBalanceSection from "./FluidBalanceSection";
import AlatInvasifFooter from "./AlatInvasifFooter";

interface AlatInvasifFormProps {
  devices: DeviceRowUI[];
  fallRisk: FallRiskForm;
  fluidBalance: FluidBalanceForm;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  updateDeviceField: (
    code: DeviceCode,
    field: DeviceField,
    value: string
  ) => void;
  setFallRisk: React.Dispatch<React.SetStateAction<FallRiskForm>>;
  setFluidBalance: React.Dispatch<
    React.SetStateAction<FluidBalanceForm>
  >;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AlatInvasifForm: React.FC<AlatInvasifFormProps> = ({
  devices,
  fallRisk,
  fluidBalance,
  isSubmitting,
  submitError,
  submitSuccess,
  updateDeviceField,
  setFallRisk,
  setFluidBalance,
  handleSubmit,
}) => {
  const invasifRows = devices.filter((d) => d.group === "INVASIF");
  const tubeRows = devices.filter((d) => d.group === "TUBE");

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-5"
    >
      {/* INVASIF + TUBE */}
      <section className="space-y-3">
        <DeviceGroupSection
          title="Invasif"
          rows={invasifRows}
          updateDeviceField={updateDeviceField}
        />
        <DeviceGroupSection
          title="Tube"
          rows={tubeRows}
          updateDeviceField={updateDeviceField}
        />
      </section>

      {/* RISIKO JATUH + BALANCE CAIRAN */}
      <section className="grid gap-4 lg:grid-cols-[1.2fr,1.3fr]">
        <FallRiskSection
          fallRisk={fallRisk}
          setFallRisk={setFallRisk}
        />
        <FluidBalanceSection
          fluidBalance={fluidBalance}
          setFluidBalance={setFluidBalance}
        />
      </section>

      {/* FOOTER / SUBMIT */}
      <AlatInvasifFooter
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
      />
    </form>
  );
};

export default AlatInvasifForm;
