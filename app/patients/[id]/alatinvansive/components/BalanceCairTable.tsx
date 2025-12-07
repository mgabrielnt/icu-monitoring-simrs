"use client";

import type { BalanceCairEntry } from "@/types/alatinvansive";

interface Props {
  entries: BalanceCairEntry[];
  onEdit: (entryId: string) => void;
}

export default function BalanceCairTable({ entries, onEdit }: Props) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-sky-50 bg-sky-50/70 px-4 py-2.5">
        <div>
          <h2 className="text-sm font-semibold text-sky-900">
            Balance Cairan 24 Jam
          </h2>
          <p className="text-xs text-sky-900/70">
            Ringkasan IWL, BC 24 jam, sebelumnya, dan kumulatif.
          </p>
        </div>
        {entries.length > 0 && (
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-900">
            {entries.length} entri
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-sky-50 text-xs sm:text-sm">
          <thead className="bg-sky-50/70">
            <tr>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-sky-900">
                No
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-sky-900">
                Waktu Input
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-sky-900">
                Masuk (cc)
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-sky-900">
                Keluar (cc)
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-sky-900">
                IWL (cc)
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-sky-900">
                BC 24 Jam (cc)
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-sky-900">
                BC Sebelumnya (cc)
              </th>
              <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-sky-900">
                BC Kumulatif (cc)
              </th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-sky-900">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-50 bg-white">
            {entries.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="px-4 py-5 text-center text-sm text-sky-900/70"
                >
                  Belum ada data. Gunakan tombol{" "}
                  <span className="font-semibold">"Balance Cair 24 Jam"</span>{" "}
                  untuk mengisi form.
                </td>
              </tr>
            ) : (
              entries.map((e, idx) => (
                <tr key={e.id}>
                  <td className="px-3 py-2 text-[11px] text-sky-900/90">
                    {idx + 1}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-sky-900/90">
                    {new Date(e.createdAt).toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-sky-900/90">
                    {e.masuk ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-sky-900/90">
                    {e.keluar ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-sky-900/90">
                    {e.iwl ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-sky-900/90">
                    {e.bc24Jam ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] text-sky-900/90">
                    {e.bcSebelumnya ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-[11px] font-semibold text-sky-900">
                    {e.bcKumulatif ?? "-"}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => onEdit(e.id)}
                      className="inline-flex items-center rounded-lg border border-sky-200 bg-white px-3 py-1 text-[11px] font-medium text-sky-900 shadow-sm transition hover:bg-sky-50"
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