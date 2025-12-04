// file: app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatTable.tsx

"use client";

import { PerencanaanPerawatImplementation } from "@/types/perencanaanPerawat";
import { formatTimeDisplay } from "@/utils/time";

interface Props {
  items: PerencanaanPerawatImplementation[];
  loading?: boolean;
}

export default function PerencanaanPerawatTable({ items, loading }: Props) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white/95 shadow-sm">
      <div className="flex items-center justify-between border-b border-emerald-50 px-4 py-3 sm:px-5">
        <div>
          <h2 className="text-sm font-semibold text-emerald-900">
            Implementasi – Jam Pelaksanaan
          </h2>
          <p className="text-[11px] text-emerald-700/80">
            Rekap semua tindakan yang sudah dilaksanakan (otomatis urut terbaru
            di atas).
          </p>
        </div>
        <span className="text-[11px] font-medium text-emerald-700/80">
          Total entri: {items.length}
        </span>
      </div>

      <div className="max-h-[360px] overflow-auto">
        <table className="min-w-full border-separate border-spacing-0 text-[11px]">
          <thead className="sticky top-0 z-10 bg-emerald-50/95 backdrop-blur">
            <tr className="text-emerald-900/90">
              <th className="sticky left-0 z-20 border-b border-emerald-100 bg-emerald-50/95 px-3 py-2 text-left font-semibold">
                Jam / Paraf
              </th>
              <th className="border-b border-emerald-100 px-3 py-2 text-left font-semibold">
                Shift
              </th>
              <th className="border-b border-emerald-100 px-3 py-2 text-left font-semibold">
                Jenis Kegiatan
              </th>
              <th className="border-b border-emerald-100 px-3 py-2 text-left font-semibold">
                Nama Perawat
              </th>
              <th className="border-b border-emerald-100 px-3 py-2 text-left font-semibold">
                Tempat Tidur
              </th>
              <th className="border-b border-emerald-100 px-3 py-2 text-left font-semibold">
                Catatan
              </th>
              <th className="border-b border-emerald-100 px-3 py-2 text-left font-semibold">
                Verifikasi DPJP{" "}
                <span className="font-normal">(Nama / TT)</span>
              </th>
              <th className="border-b border-emerald-100 px-3 py-2 text-left font-semibold">
                Tanggal Input
              </th>
            </tr>
          </thead>
          <tbody>
            {loading && !items.length && (
              <tr>
                <td
                  colSpan={8}
                  className="px-3 py-4 text-center text-[11px] text-emerald-700/80"
                >
                  Memuat data implementasi…
                </td>
              </tr>
            )}

            {!loading && !items.length && (
              <tr>
                <td
                  colSpan={8}
                  className="px-3 py-4 text-center text-[11px] text-emerald-500"
                >
                  Belum ada implementasi yang dicatat.
                </td>
              </tr>
            )}

            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-emerald-50 last:border-b-0 hover:bg-emerald-50/40"
              >
                <td className="sticky left-0 z-10 border-r border-emerald-50 bg-white/95 px-3 py-2 text-emerald-900">
                  <div className="font-semibold">
                    {formatTimeDisplay(item.time)}
                  </div>
                  <div className="text-[10px] text-emerald-500">
                    Paraf: {item.nurseName.split(",")[0] ?? "-"}
                  </div>
                </td>
                <td className="px-3 py-2 capitalize text-emerald-900">
                  {item.shift}
                </td>
                <td className="px-3 py-2 text-emerald-900">
                  {item.activityId}.{" "}
                  {item.customActivityLabel || item.activityLabel}
                </td>
                <td className="px-3 py-2 text-emerald-900">
                  {item.nurseName}
                </td>
                <td className="px-3 py-2 text-emerald-900">
                  {item.bedNumber}
                </td>
                <td className="px-3 py-2 text-emerald-900">
                  {item.notes || "-"}
                </td>
                <td className="px-3 py-2 text-emerald-900">
                  {/* kolom ini sengaja kosong, bisa diisi manual / fitur lain */}
                  -
                </td>
                <td className="px-3 py-2 text-emerald-900">
                  {new Date(item.createdAt).toLocaleString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
