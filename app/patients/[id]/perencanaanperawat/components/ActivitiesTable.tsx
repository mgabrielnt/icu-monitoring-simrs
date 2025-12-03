"use client";

import React from "react";
import { PlusCircle, Trash2 } from "lucide-react";

import type { ImplementasiActivityState } from "@/types/monitoring";
import type { ImplementasiField } from "./implementasiUiTypes";

const KEGIATAN_OPTIONS: readonly string[] = [
  "Monitor kesadaran: CGS",
  "Monitor TD / N / R / Temp / SpO2",
  "Merekam EKG",
  "Mengukur CVC / arteri line",
  "Monitor terapi O2 / nasal / RM / NRM / T-Piece",
  "Monitor nyeri",
  "Monitor setting ventilator / humidifier",
  "Monitor setting TPM / IABP",
  "Monitor refleks mata / kekuatan otot",
  "Pengelolaan diet oral / NGT",
  "Monitor tanda perdarahan",
  "Personal hygiene: mandi / perineal",
  "Perawatan mulut",
  "Perawatan ETT / TT",
  "Perawatan drain / WSD",
  "Perawatan sheath / TPM",
  "Suctioning",
  "Fisioterapi / mobilisasi jantung",
  "Rekam EKG 12 lead",
  "Monitor balance cairan",
  "Perawatan luka",
  "Alih baring / head up 30°",
  "Pencegahan jatuh (rendah / tinggi / shift)",
];

const OTHER_VALUE = "LAINNYA";

interface ActivitiesTableProps {
  activities: ImplementasiActivityState[];
  addRow: () => void;
  removeRow: (localId: string) => void;
  updateRow: (
    localId: string,
    field: ImplementasiField,
    value: string
  ) => void;
}

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({
  activities,
  addRow,
  removeRow,
  updateRow,
}) => {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-slate-900">
          Implementasi selama 24 jam
        </p>
        <button
          type="button"
          onClick={addRow}
          className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-slate-50 shadow-sm hover:bg-slate-800"
        >
          <PlusCircle className="h-3 w-3" />
          Tambah baris
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/70">
        <table className="min-w-full border-separate border-spacing-0 text-xs">
          <thead>
            <tr className="bg-slate-100 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              <th className="px-3 py-2 text-left">Jenis Kegiatan</th>
              <th className="px-3 py-2 text-left">Jam</th>
              <th className="px-3 py-2 text-left">Paraf</th>
              <th className="px-3 py-2 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {activities.map((row, idx) => {
              const isKnown = KEGIATAN_OPTIONS.includes(
                row.jenisKegiatan
              );
              const selectValue =
                row.jenisKegiatan === ""
                  ? ""
                  : isKnown
                  ? row.jenisKegiatan
                  : OTHER_VALUE;

              return (
                <tr key={row._localId} className="bg-white/95">
                  {/* JENIS KEGIATAN */}
                  <td className="px-3 py-2 align-top">
                    <div className="space-y-1">
                      <select
                        required
                        value={selectValue}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === OTHER_VALUE) {
                            if (isKnown) {
                              updateRow(
                                row._localId,
                                "jenisKegiatan",
                                ""
                              );
                            }
                          } else {
                            updateRow(
                              row._localId,
                              "jenisKegiatan",
                              val
                            );
                          }
                        }}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                      >
                        <option value="">Pilih kegiatan...</option>
                        {KEGIATAN_OPTIONS.map((label) => (
                          <option key={label} value={label}>
                            {label}
                          </option>
                        ))}
                        <option value={OTHER_VALUE}>
                          Kegiatan lain...
                        </option>
                      </select>

                      {selectValue === OTHER_VALUE && (
                        <input
                          required
                          type="text"
                          value={row.jenisKegiatan}
                          onChange={(e) =>
                            updateRow(
                              row._localId,
                              "jenisKegiatan",
                              e.target.value
                            )
                          }
                          placeholder="Tulis kegiatan lain"
                          className="w-full rounded-lg border border-dashed border-slate-300 bg-slate-50 px-2 py-1.5 text-[11px] focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        />
                      )}
                    </div>
                  </td>

                  {/* JAM (24 JAM) */}
                  <td className="px-3 py-2 align-top">
                    <input
                      type="time"
                      required
                      value={row.jam ?? ""}
                      onChange={(e) =>
                        updateRow(row._localId, "jam", e.target.value)
                      }
                      className="w-28 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                    />
                  </td>

                  {/* PARAF */}
                  <td className="px-3 py-2 align-top">
                    <input
                      type="text"
                      required
                      value={row.paraf ?? ""}
                      onChange={(e) =>
                        updateRow(
                          row._localId,
                          "paraf",
                          e.target.value
                        )
                      }
                      className="w-24 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[11px] focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                      placeholder="Paraf"
                    />
                  </td>

                  {/* AKSI */}
                  <td className="px-3 py-2 text-right align-top">
                    <button
                      type="button"
                      onClick={() => removeRow(row._localId)}
                      disabled={activities.length === 1}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-600 hover:text-rose-700 disabled:cursor-not-allowed disabled:text-slate-300"
                    >
                      <Trash2 className="h-3 w-3" />
                      Hapus
                    </button>
                    <span className="ml-2 inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700 ring-1 ring-slate-200">
                      #{idx + 1}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ActivitiesTable;
