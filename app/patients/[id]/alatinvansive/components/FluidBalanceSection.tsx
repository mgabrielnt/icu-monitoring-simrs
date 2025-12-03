"use client";

import React from "react";
import { Droplet } from "lucide-react";
import type { FluidBalanceForm } from "@/types/monitoring";

interface FluidBalanceSectionProps {
  fluidBalance: FluidBalanceForm;
  setFluidBalance: React.Dispatch<
    React.SetStateAction<FluidBalanceForm>
  >;
}

const fields: Array<[keyof FluidBalanceForm, string]> = [
  ["cairanMasuk", "Cairan masuk (24 jam)"],
  ["cairanKeluar", "Cairan keluar (24 jam)"],
  ["iwl", "IWL"],
  ["bc24Jam", "BC 24 jam"],
  ["bcSebelumnya", "BC sebelumnya"],
  ["bcKumulatif", "BC kumulatif"],
];

const FluidBalanceSection: React.FC<FluidBalanceSectionProps> = ({
  fluidBalance,
  setFluidBalance,
}) => {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-100">
            <Droplet className="h-4 w-4 text-sky-700" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Balance Cairan 24 Jam
            </h3>
            <p className="text-[11px] text-slate-600">
              Rekap cairan masuk, keluar, IWL, dan BC kumulatif 24 jam.
            </p>
          </div>
        </div>
        <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-800 ring-1 ring-sky-100">
          mL / cc
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
        {fields.map(([field, label]) => (
          <label key={field} className="space-y-1">
            <span className="block text-[11px] font-medium text-slate-800">
              {label}
            </span>
            <input
              type="number"
              min={0}
              value={fluidBalance[field]}
              onChange={(e) =>
                setFluidBalance((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </label>
        ))}
      </div>

      <p className="text-[11px] text-slate-500">
        Detail per jam dicatat di tab Balance Cairan; bagian ini hanya rekap
        24 jam.
      </p>
    </div>
  );
};

export default FluidBalanceSection;
