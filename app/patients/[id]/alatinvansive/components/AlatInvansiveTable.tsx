"use client";

import type { InvansifTubeEntry } from "@/types/alatinvansive";

interface Props {
  entries: InvansifTubeEntry[];
  onEdit: (entryId: string) => void;
}

export default function AlatInvansiveTable({ entries, onEdit }: Props) {
  const flattenRows = entries.flatMap((entry) => {
    const rows: {
      snapshotId: string;
      createdAt: string;
      group: "Invasif" | "Tube";
      label: string;
      ukuran?: string;
      lokasi?: string;
      tanggal?: string;
    }[] = [];

    const push = (
      group: "Invasif" | "Tube",
      label: string,
      triplet?: { ukuran?: string; lokasi?: string; tanggal?: string }
    ) => {
      if (!triplet) return;
      if (!triplet.ukuran && !triplet.lokasi && !triplet.tanggal) return;
      rows.push({
        snapshotId: entry.id,
        createdAt: entry.createdAt,
        group,
        label,
        ukuran: triplet.ukuran,
        lokasi: triplet.lokasi,
        tanggal: triplet.tanggal ?? "",
      });
    };

    push("Invasif", "IV Line", entry.invansif.ivLine);
    push("Invasif", "CVC", entry.invansif.cvc);
    push("Invasif", "Arterial Line", entry.invansif.arterialLine);
    push("Invasif", "Swans Ganz", entry.invansif.swansGanz);

    push("Tube", "OTT / NTT / TT", entry.tube.ottNttTt);
    push("Tube", "NGT", entry.tube.ngt);
    push("Tube", "WSD", entry.tube.wsd);
    push("Tube", "Drain", entry.tube.drain);
    push("Tube", "Urine Kateter", entry.tube.urineKateter);
    push("Tube", "Lunak", entry.tube.lunak);

    return rows;
  });

  const seenSnapshots = new Set<string>();

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-2.5">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            Riwayat Form Invasif / Tube
          </h2>
          <p className="text-xs text-slate-500">
            Snapshot form setiap kali disimpan, ditampilkan per baris alat.
          </p>
        </div>
        {entries.length > 0 && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {entries.length} snapshot
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                No
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Snapshot
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Kelompok
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Jenis Alat
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ukuran
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Lokasi
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Tanggal
              </th>
              <th className="px-3 py-2 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {flattenRows.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-5 text-center text-sm text-slate-500"
                >
                  Belum ada data. Klik{" "}
                  <span className="font-semibold text-emerald-700">
                    "+ Invasif / Tube"
                  </span>{" "}
                  untuk mengisi form sesuai template.
                </td>
              </tr>
            ) : (
              flattenRows.map((row, index) => {
                const isFirstRowOfSnapshot = !seenSnapshots.has(
                  row.snapshotId
                );
                if (isFirstRowOfSnapshot) {
                  seenSnapshots.add(row.snapshotId);
                }

                return (
                  <tr key={`${row.snapshotId}-${row.label}-${index}`}>
                    <td className="px-3 py-2 text-xs text-slate-600">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 text-xs text-slate-500">
                      {new Date(row.createdAt).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-2 text-xs font-medium text-slate-700">
                      {row.group}
                    </td>
                    <td className="px-3 py-2 text-sm font-medium text-slate-900">
                      {row.label}
                    </td>
                    <td className="px-3 py-2 text-sm text-slate-700">
                      {row.ukuran || "-"}
                    </td>
                    <td className="px-3 py-2 text-sm text-slate-700">
                      {row.lokasi || "-"}
                    </td>
                    <td className="px-3 py-2 text-sm text-slate-700">
                      {row.tanggal
                        ? new Date(row.tanggal).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {isFirstRowOfSnapshot && (
                        <button
                          type="button"
                          onClick={() => onEdit(row.snapshotId)}
                          className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                        >
                          Edit form
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}