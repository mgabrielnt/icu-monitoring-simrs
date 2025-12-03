"use client";

import React from "react";
import { ClipboardList } from "lucide-react";
import type { NurseShift } from "./implementasiUiTypes";

interface NurseSectionProps {
  selectedShift: NurseShift;
  currentNurse: { namaPerawat: string; tempatTidur: string };
  updateCurrentNurseField: (
    field: "namaPerawat" | "tempatTidur",
    value: string
  ) => void;
}

const NurseSection: React.FC<NurseSectionProps> = ({
  selectedShift,
  currentNurse,
  updateCurrentNurseField,
}) => {
  return (
    <section className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-xs">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-slate-50">
          <ClipboardList className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-900">
            Perawat jaga {selectedShift.toLowerCase()}
          </p>
          <p className="text-[11px] text-slate-500">
            Isi nama perawat dan nomor tempat tidur pasien.
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="text-[11px] font-medium text-slate-800">
            Nama perawat
          </span>
          <input
            type="text"
            value={currentNurse.namaPerawat}
            onChange={(e) =>
              updateCurrentNurseField("namaPerawat", e.target.value)
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            placeholder="Tulis nama perawat jaga"
          />
        </label>

        <label className="space-y-1">
          <span className="text-[11px] font-medium text-slate-800">
            Tempat tidur
          </span>
          <input
            type="text"
            value={currentNurse.tempatTidur}
            onChange={(e) =>
              updateCurrentNurseField("tempatTidur", e.target.value)
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            placeholder="Misal: Bed 3 / TT 12"
          />
        </label>
      </div>
    </section>
  );
};

export default NurseSection;
