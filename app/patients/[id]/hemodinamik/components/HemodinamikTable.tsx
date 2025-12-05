// components/HemodinamikTable.tsx

"use client";

import React from "react";
import { HeartPulse, Plus, Clock } from "lucide-react";
import type { HemodinamikEntry } from "@/types/hemodinamik.types";

interface HemodinamikTableProps {
  entries: HemodinamikEntry[];
  onAddClick: () => void;
}

export const HemodinamikTable: React.FC<HemodinamikTableProps> = ({
  entries,
  onAddClick,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
            <HeartPulse className="h-4 w-4 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Data Hemodinamik 24 Jam
            </h3>
            <p className="text-[11px] text-slate-600">
              Rekap monitoring per jam
            </p>
          </div>
        </div>

        <button
          onClick={onAddClick}
          className="flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-emerald-50 shadow-sm transition hover:bg-emerald-800"
        >
          <Plus className="h-4 w-4" />
          Input Data
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-xs">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              <th className="border-b border-slate-200 px-3 py-2 text-center">
                Jam
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-center">
                Sistol
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-center">
                Diastol
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-center">
                HR
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-center">
                MAP
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-center">
                Temp
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-center">
                Kesadaran
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-center">
                Irama EKG
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-center">
                Skor Nyeri
              </th>
              <th className="border-b border-slate-200 px-3 py-2 text-center">
                CVP
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map((e) => (
              <tr
                key={e.id}
                className="bg-white/95 transition hover:bg-emerald-50/60"
              >
                <td className="px-3 py-2 text-center align-middle">
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-mono font-semibold text-sky-700 ring-1 ring-sky-100">
                    <Clock className="h-3 w-3" />
                    {e.jam}
                  </span>
                </td>
                <td className="px-3 py-2 text-center text-xs font-semibold text-slate-800">
                  {e.sistol}
                </td>
                <td className="px-3 py-2 text-center text-xs font-semibold text-slate-800">
                  {e.diastol}
                </td>
                <td className="px-3 py-2 text-center text-xs font-semibold text-red-600">
                  {e.hr}
                </td>
                <td className="px-3 py-2 text-center text-xs font-semibold text-green-600">
                  {e.map}
                </td>
                <td className="px-3 py-2 text-center text-xs font-semibold text-blue-600">
                  {e.temp}
                </td>
                <td className="px-3 py-2 text-center text-xs text-slate-700">
                  {e.kesadaran || "-"}
                </td>
                <td className="px-3 py-2 text-center text-xs text-slate-700">
                  {e.iramaEkg || "-"}
                </td>
                <td className="px-3 py-2 text-center text-xs text-slate-700">
                  {e.skorNyeri || "-"}
                </td>
                <td className="px-3 py-2 text-center text-xs text-slate-700">
                  {e.cvp || "-"}
                </td>
              </tr>
            ))}

            {entries.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-8 text-center text-xs text-slate-400"
                >
                  Belum ada data. Klik tombol "Input Data" untuk mulai mencatat
                  monitoring.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};