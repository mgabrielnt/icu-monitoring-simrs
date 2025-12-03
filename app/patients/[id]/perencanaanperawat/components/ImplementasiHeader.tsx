"use client";

import React from "react";
import { Calendar } from "lucide-react";
import type { NurseShift } from "./implementasiUiTypes";

interface ImplementasiHeaderProps {
  tanggal?: string;
  onChangeDate: (newDate: string) => void;
  selectedShift: NurseShift;
  setSelectedShift: (shift: NurseShift) => void;
}

const ImplementasiHeader: React.FC<ImplementasiHeaderProps> = ({
  tanggal,
  onChangeDate,
  selectedShift,
  setSelectedShift,
}) => {
  const shifts: NurseShift[] = ["PAGI", "SIANG", "MALAM"];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Shift selector */}
      <div className="inline-flex overflow-hidden rounded-full border border-slate-200 bg-slate-50 text-[11px]">
        {shifts.map((shift) => {
          const active = shift === selectedShift;
          return (
            <button
              key={shift}
              type="button"
              onClick={() => setSelectedShift(shift)}
              className={[
                "px-3 py-1.5 font-medium transition",
                active
                  ? "bg-slate-900 text-slate-50"
                  : "text-slate-700 hover:bg-slate-100",
              ].join(" ")}
            >
              Jaga {shift.toLowerCase()}
            </button>
          );
        })}
      </div>

      {/* Tanggal monitoring */}
      <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
        <Calendar className="h-4 w-4 text-slate-500" />
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Tanggal monitoring
          </span>
          <input
            type="date"
            value={tanggal ?? ""}
            onChange={(e) => onChangeDate(e.target.value)}
            className="mt-0.5 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
      </label>
    </div>
  );
};

export default ImplementasiHeader;
