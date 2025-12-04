// app/patients/[id]/perkembanganpasien/components/PerkembanganPasienTable.tsx
"use client";

import type { PerkembanganPasienNote } from "@/types/perkembanganPasien";
import { SOAP_META } from "@/utils/perkembanganPasienMeta";
import { formatDisplayDateTime } from "@/utils/datetime";

interface PerkembanganPasienTableProps {
  notes: PerkembanganPasienNote[];
  loading: boolean;
}

export default function PerkembanganPasienTable({
  notes,
  loading,
}: PerkembanganPasienTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Riwayat Perkembangan Pasien
          </h2>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Kolom: Tgl/Jam • Kategori • Hasil Asessmen Pasien • Instruksi PPA Termasuk
            Pasca Bedah • Paraf Perawat.
          </p>
        </div>
        {loading && (
          <p className="text-[11px] text-slate-400">Memuat catatan…</p>
        )}
      </div>

      <div className="max-h-[420px] overflow-auto">
        <table className="min-w-full border-collapse text-[11px]">
          <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur">
            <tr className="border-b border-slate-200 text-slate-600">
              <th className="w-40 px-3 py-2 text-left font-semibold">
                Tgl / Jam
              </th>
              <th className="w-32 px-3 py-2 text-left font-semibold">
                Kategori
              </th>
              <th className="w-[30%] px-3 py-2 text-left font-semibold">
                Hasil Asessmen Pasien
              </th>
              <th className="w-[32%] px-3 py-2 text-left font-semibold">
                Instruksi PPA Termasuk Pasca Bedah
              </th>
              <th className="w-40 px-3 py-2 text-left font-semibold">
                Paraf Perawat
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.length === 0 && !loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-[11px] text-slate-400"
                >
                  Belum ada catatan perkembangan.
                </td>
              </tr>
            ) : (
              notes.map((note, index) => (
                <tr
                  key={note.id}
                  className={[
                    "border-t border-slate-100 transition",
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                    "hover:bg-emerald-50/60",
                  ].join(" ")}
                >
                  {/* Tanggal / Jam */}
                  <td className="whitespace-nowrap px-3 py-2 align-top text-slate-700">
                    <div className="font-medium text-slate-900">
                      {formatDisplayDateTime(note.datetime)}
                    </div>
                  </td>

                  {/* Kategori O / A / P */}
                  <td className="px-3 py-2 align-top">
                    <div className="inline-flex flex-col gap-0.5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-900">
                      <span className="flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{note.category}</span>
                      </span>
                      <span className="text-[9px] font-normal text-emerald-800/80">
                        {SOAP_META[note.category].label}
                      </span>
                    </div>
                  </td>

                  {/* Hasil Asessmen Pasien */}
                  <td className="px-3 py-2 align-top text-[11px] leading-relaxed text-slate-700">
                    {note.assessment}
                  </td>

                  {/* Instruksi PPA */}
                  <td className="px-3 py-2 align-top text-[11px] leading-relaxed text-slate-700">
                    {note.instruction}
                  </td>

                  {/* Paraf Perawat */}
                  <td className="px-3 py-2 align-top text-[11px] text-slate-700">
                    <div className="font-medium text-slate-900">
                      {note.nurseName}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
