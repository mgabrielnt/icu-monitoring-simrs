// app/patients/[id]/perencanaanperawat/components/ImplementasiTable.tsx

"use client";

import React from "react";
import { FileText, Clock } from "lucide-react";

export interface ImplementasiRowView {
  _localId: string;
  jenisKegiatan: string;
  jam: string;
  paraf: string;
}

interface ImplementasiTableProps {
  rows: ImplementasiRowView[];
  showForm: boolean;
  toggleForm: () => void;
  startEdit: (localId: string) => void;
  handleDeleteRow: (localId: string) => void;
}

const ImplementasiTable: React.FC<ImplementasiTableProps> = ({
  rows,
  showForm,
  toggleForm,
  startEdit,
  handleDeleteRow,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
            <FileText className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Daftar Implementasi Kegiatan Perawatan
            </h3>
            <p className="text-[11px] text-slate-500">
              Ringkasan tindakan perawat selama 24 jam dengan jam otomatis dan
              paraf.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {rows.length > 0 && (
            <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
              Total kegiatan:{" "}
              <span className="font-semibold text-slate-800">
                {rows.length}
              </span>
            </span>
          )}
          <button
            type="button"
            onClick={toggleForm}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm transition hover:bg-emerald-800"
          >
            {showForm ? "Tutup Form" : "Tambah / Edit Kegiatan"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              <th className="sticky left-0 z-10 border-b border-slate-200 bg-slate-50 px-4 py-2 text-center">
                No
              </th>
              <th className="border-b border-slate-200 px-4 py-2 text-left">
                Jenis Kegiatan
              </th>
              <th className="border-b border-slate-200 px-4 py-2 text-center">
                Jam Pelaksanaan
              </th>
              <th className="border-b border-slate-200 px-4 py-2 text-center">
                Paraf
              </th>
              <th className="border-b border-slate-200 px-4 py-2 text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr
                key={row._localId}
                className="bg-white/95 transition hover:bg-emerald-50/60"
              >
                <td className="sticky left-0 z-0 border-r border-slate-100 px-4 py-2 text-center text-xs font-semibold text-slate-700">
                  {index + 1}
                </td>
                <td className="px-4 py-2 align-top text-xs text-slate-800">
                  {row.jenisKegiatan}
                </td>
                <td className="px-4 py-2 text-center align-middle">
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-mono font-semibold text-sky-700 ring-1 ring-sky-100">
                    <Clock className="h-3 w-3" />
                    {row.jam}
                  </span>
                </td>
                <td className="px-4 py-2 text-center align-middle">
                  <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    {row.paraf}
                  </span>
                </td>
                <td className="px-4 py-2 text-center align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(row._localId)}
                      className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(row._localId)}
                      className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-600 ring-1 ring-rose-100 hover:bg-rose-100"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-5 text-center text-xs text-slate-400"
                >
                  Belum ada implementasi yang dicatat. Tekan{" "}
                  <span className="font-semibold">“Tambah / Edit Kegiatan”</span>{" "}
                  untuk mulai input.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ImplementasiTable;
