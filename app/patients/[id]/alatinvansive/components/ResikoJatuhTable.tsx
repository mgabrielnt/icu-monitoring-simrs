"use client";

import type { ResikoJatuhEntry } from "@/types/alatinvansive";

interface Props {
  entries: ResikoJatuhEntry[];
  onEdit: (entryId: string) => void;
}

export default function ResikoJatuhTable({ entries, onEdit }: Props) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-amber-50 bg-amber-50/60 px-4 py-3 sm:px-6">
        <div>
          <h2 className="text-sm font-semibold text-amber-900">
            Resiko Jatuh • Detail Skor PR
          </h2>
          <p className="text-xs text-amber-800/80">
            Riwayat skor per parameter dan total skor.
          </p>
        </div>
        {entries.length > 0 && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
            {entries.length} entri
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-amber-50 text-xs sm:text-sm">
          <thead className="bg-amber-50/70">
            <tr>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                No
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                Waktu Input
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                Riwayat jatuh
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                Kondisi kesehatan
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                Bantuan ambulansi
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                Terapi IV / Antikoagulan
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                Gaya berjalan / berpindah
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                Status mental
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                Total Skor PR
              </th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-amber-900">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-50 bg-white">
            {entries.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-5 text-center text-sm text-amber-900/70"
                >
                  Belum ada data. Gunakan tombol{" "}
                  <span className="font-semibold">“+ Resiko Jatuh (PR)”</span>{" "}
                  di header untuk mengisi form seperti lembar kertas.
                </td>
              </tr>
            ) : (
              entries.map((e, idx) => (
                <tr key={e.id}>
                  <td className="px-3 py-2 text-[11px] text-amber-900/90">
                    {idx + 1}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-amber-900/90">
                    {new Date(e.createdAt).toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-amber-900/90">
                    {e.riwayatJatuh ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-amber-900/90">
                    {e.kondisiKesehatan ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-amber-900/90">
                    {e.bantuanAmbulansi ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-amber-900/90">
                    {e.terapiIvAntikoagulan ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-amber-900/90">
                    {e.gayaBerjalanBerpindah ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-amber-900/90">
                    {e.statusMental ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] font-semibold text-amber-900">
                    {e.totalSkorPr ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => onEdit(e.id)}
                      className="inline-flex items-center rounded-lg border border-amber-200 bg-white px-3 py-1 text-[11px] font-medium text-amber-900 shadow-sm transition hover:bg-amber-50"
                    >
                      Edit
                    </button>
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
