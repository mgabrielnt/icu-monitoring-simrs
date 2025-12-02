// app/patients/[id]/alatinvansive/components/AlatInvasifFallRiskCard.tsx

"use client";

import React from "react";
import { Activity } from "lucide-react";

interface AlatInvasifFallRiskCardProps {
  fallRisk: Record<string, string>;
  setFallRisk: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
}

const AlatInvasifFallRiskCard: React.FC<AlatInvasifFallRiskCardProps> = ({
  fallRisk,
  setFallRisk,
}) => {
  const fields: Array<[keyof typeof fallRisk, string]> = [
    ["riwayatJatuh", "1. Riwayat jatuh"],
    ["kondisiKesehatan", "2. Kondisi kesehatan"],
    ["bantuanAmbulansi", "3. Bantuan ambulansi"],
    ["terapiIVAntikoagulan", "4. Terapi IV / Antikoagulan"],
    ["gayaBerjalan", "5. Gaya berjalan / berpindah"],
    ["statusMental", "6. Status mental"],
  ];

  return (
    <div className="space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 ring-1 ring-emerald-200">
            <Activity className="h-4 w-4 text-emerald-800" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Resiko Jatuh
            </h3>
            <p className="text-[11px] text-emerald-900/80">
              Input skor tiap komponen, total skor (PR) bisa dikalkulasi backend
              untuk kategori risiko.
            </p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-900 px-2 py-0.5 text-[10px] font-semibold text-emerald-50">
          Skor PR
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
        {fields.map(([field, label]) => (
          <label key={field as string} className="space-y-1">
            <span className="block text-[11px] font-medium text-slate-800">
              {label}
            </span>
            <input
              type="number"
              min={0}
              required
              value={fallRisk[field] ?? ""}
              onChange={(e) =>
                setFallRisk((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-emerald-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </label>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-emerald-200 pt-3">
        <label className="flex flex-col text-xs">
          <span className="text-[11px] font-semibold text-slate-900">
            Total Skor (PR)
          </span>
          <input
            type="number"
            min={0}
            required
            value={fallRisk.totalSkor ?? ""}
            onChange={(e) =>
              setFallRisk((prev) => ({
                ...prev,
                totalSkor: e.target.value,
              }))
            }
            className="mt-1 w-24 rounded-lg border border-emerald-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </label>
        <p className="text-[11px] text-emerald-900/80">
          Logika kategori (rendah/sedang/tinggi) bisa ditentukan di backend.
        </p>
      </div>
    </div>
  );
};

export default AlatInvasifFallRiskCard;
