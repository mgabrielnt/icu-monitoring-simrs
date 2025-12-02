// app/patients/[id]/alatinvansive/components/AlatInvasifInvasiveTable.tsx

"use client";

import React from "react";
import { Shield } from "lucide-react";
import {
  JENIS_ALAT_OPTIONS,
  JenisAlatValue,
} from "@/hooks/useAlatInvasif";

export type AlatInvasifField =
  | "jenisAlatCode"
  | "jenisAlatCustom"
  | "ukuran"
  | "lokasi"
  | "tglPasang"
  | "hariKe";

export interface AlatInvasifRowView {
  _localId: string;
  jenisAlatCode: JenisAlatValue | "";
  jenisAlatCustom: string;
  ukuran: string;
  lokasi: string;
  tglPasang: string;
  hariKe: string | number;
}

interface AlatInvasifInvasiveTableProps {
  rows: AlatInvasifRowView[];
  addRow: () => void;
  removeRow: (localId: string) => void;
  updateRow: (
    localId: string,
    field: AlatInvasifField,
    value: string
  ) => void;
}

const AlatInvasifInvasiveTable: React.FC<AlatInvasifInvasiveTableProps> = ({
  rows,
  addRow,
  removeRow,
  updateRow,
}) => {
  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
            <Shield className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Pemasangan Alat Invasif / Tube
            </h3>
            <p className="text-[11px] text-slate-500">
              Pilih jenis alat dari list ICU standar, atau gunakan
              &quot;Lainnya&quot; bila alat tidak ada di list.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addRow}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm transition hover:bg-emerald-800"
        >
          + Tambah Alat
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/70">
        <table className="min-w-full border-separate border-spacing-0 text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              <th className="px-3 py-2 text-left">Jenis Alat</th>
              <th className="px-3 py-2 text-left">Ukuran</th>
              <th className="px-3 py-2 text-left">Lokasi</th>
              <th className="px-3 py-2 text-left">Tgl Pasang</th>
              <th className="px-3 py-2 text-left">Hari ke-</th>
              <th className="px-3 py-2 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row, idx) => (
              <tr key={row._localId} className="bg-white/95">
                <td className="px-3 py-2 align-top">
                  <div className="space-y-1">
                    <select
                      required
                      value={row.jenisAlatCode}
                      onChange={(e) =>
                        updateRow(
                          row._localId,
                          "jenisAlatCode",
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Pilih jenis alat...</option>
                      {JENIS_ALAT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {row.jenisAlatCode === "OTHER" && (
                      <input
                        required
                        value={row.jenisAlatCustom}
                        onChange={(e) =>
                          updateRow(
                            row._localId,
                            "jenisAlatCustom",
                            e.target.value
                          )
                        }
                        placeholder="Tulis nama alat lainnya"
                        className="w-full rounded-lg border border-dashed border-emerald-300 bg-emerald-50/40 px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    )}
                  </div>
                </td>
                <td className="px-3 py-2 align-top">
                  <input
                    required
                    value={row.ukuran}
                    onChange={(e) =>
                      updateRow(row._localId, "ukuran", e.target.value)
                    }
                    placeholder="16G, 7.0 mm, dll"
                    className="w-28 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:w-32 sm:text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </td>
                <td className="px-3 py-2 align-top">
                  <input
                    required
                    value={row.lokasi}
                    onChange={(e) =>
                      updateRow(row._localId, "lokasi", e.target.value)
                    }
                    placeholder="Vena perifer kanan, femoralis, dll"
                    className="w-40 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:w-48 sm:text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </td>
                <td className="px-3 py-2 align-top">
                  <input
                    required
                    type="date"
                    value={row.tglPasang}
                    onChange={(e) =>
                      updateRow(row._localId, "tglPasang", e.target.value)
                    }
                    className="w-32 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </td>
                <td className="px-3 py-2 align-top">
                  <input
                    required
                    type="number"
                    min={0}
                    value={row.hariKe}
                    onChange={(e) =>
                      updateRow(row._localId, "hariKe", e.target.value)
                    }
                    className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </td>
                <td className="px-3 py-2 text-right align-top">
                  <button
                    type="button"
                    onClick={() => removeRow(row._localId)}
                    disabled={rows.length === 1}
                    className="text-[11px] font-medium text-rose-600 hover:text-rose-700 disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    Hapus
                  </button>
                  <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                    #{idx + 1}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-slate-500">
        Jenis alat mengikuti form ICU standar: IV Line, arteri line, Swanz,
        IABP, Ott/ETT/ET, NGT, drain, WSD, D.Cath/D.CO, EPID Cath, PNB Cath,
        dan alat lainnya bila diperlukan.
      </p>
    </section>
  );
};

export default AlatInvasifInvasiveTable;
