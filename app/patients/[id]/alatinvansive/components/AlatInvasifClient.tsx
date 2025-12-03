// app/patients/[id]/alatinvansive/components/AlatInvasifClient.tsx
"use client";

import React from "react";
import { Shield, User, CalendarDays } from "lucide-react";

import type {
  MonitoringMeta,
  MonitoringPage2DTO,
} from "@/types/monitoring";
import { useAlatInvasif } from "@/hooks/useAlatInvasif";
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
    noRm: noRm ?? null,
    tanggal: tanggal ?? null,
    hariPerawatanKe:
      typeof hariPerawatanKe === "number" ? hariPerawatanKe : null,
  };

  const {
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
  } = useAlatInvasif({ meta, initialData, onSaved });

  return (
    <div className="space-y-5">
      {/* HEADER GRADIENT */}
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
        <div className="relative flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-teal-300/10 blur-3xl" />

          <div className="relative space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90 ring-1 ring-emerald-500/40">
              <span className="h-[1px] w-6 bg-emerald-200/80" />
              ICU • Page 2
            </div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-50 sm:text-xl">
              <Shield className="h-5 w-5 text-emerald-200" />
              Alat Invasif, Tube, Risiko Jatuh &amp; Balance Cairan
            </h2>
            <p className="max-w-xl text-xs text-emerald-100/90">
              Input ukuran, lokasi, tanggal untuk tiap jenis alat; ditambah
              skor risiko jatuh dan rekap balance cairan 24 jam.
            </p>
          </div>

          <div className="relative flex flex-col items-end gap-1 text-[11px] text-emerald-100/90">
            {noRm && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3 text-emerald-200" />
                <span>
                  No. RM:{" "}
                  <span className="font-semibold text-emerald-50">
                    {noRm}
                  </span>
                </span>
              </div>
            )}
            {tanggal && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3 text-emerald-200" />
                <span>
                  Tanggal:{" "}
                  <span className="font-semibold text-emerald-50">
                    {tanggal}
                  </span>
                </span>
              </div>
            )}
            {typeof hariPerawatanKe !== "undefined" && (
              <span>
                Hari perawatan ke:{" "}
                <span className="font-semibold text-emerald-50">
                  {hariPerawatanKe}
                </span>
              </span>
            )}
          </div>
        </div>
      </section>

      <AlatInvasifForm
        devices={devices}
        fallRisk={fallRisk}
        fluidBalance={fluidBalance}
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
        updateDeviceField={updateDeviceField}
        setFallRisk={setFallRisk}
        setFluidBalance={setFluidBalance}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AlatInvasifClient;
