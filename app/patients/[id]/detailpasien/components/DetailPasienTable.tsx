import React from "react";
import { Clock, Activity } from "lucide-react";
import type { DetailEntry } from "../../../../../types/detailPatient";

interface Props {
  entries: DetailEntry[];
}

const DetailPasienTable: React.FC<Props> = ({ entries }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
            <Activity className="h-4 w-4 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Data Detail Pasien</h3>
            <p className="text-[11px] text-slate-600">Rekap monitoring per jam</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-xs">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              <th className="sticky left-0 z-10 bg-slate-50 border-b border-r border-slate-200 px-3 py-2 text-center">Jam</th>
              <th colSpan={7} className="border-b border-slate-200 px-3 py-2 text-center bg-cyan-50">Respirasi</th>
              <th colSpan={7} className="border-b border-slate-200 px-3 py-2 text-center bg-purple-50">Neuro</th>
              <th colSpan={7} className="border-b border-slate-200 px-3 py-2 text-center bg-blue-50">Cairan Masuk</th>
              <th colSpan={5} className="border-b border-slate-200 px-3 py-2 text-center bg-amber-50">Cairan Keluar</th>
              <th colSpan={2} className="border-b border-slate-200 px-3 py-2 text-center bg-rose-50">Catatan</th>
            </tr>
            <tr className="bg-slate-50 text-[10px] font-medium text-slate-600">
              <th className="sticky left-0 z-10 bg-slate-50 border-b border-r border-slate-200 px-2 py-1.5"></th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">SaO2</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Vent</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">PEEP</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">RR</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">T.V.</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">FiO2</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Sputum</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Mata R</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Mata L</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Respon Mata</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Kaki</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Tangan</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">GCS</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">V Type</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Line (Nama)</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Line (Jml)</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Line (Tot)</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Enteral (Nama)</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Enteral (Jml)</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Enteral (Tot)</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Total Masuk</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">NGT</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Urine</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">BAB</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Drain</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Total Keluar</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Masalah</th>
              <th className="border-b border-slate-200 px-2 py-1.5 text-center">Tindakan/Obat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map((e) => (
              <tr key={e.id} className="bg-white/95 transition hover:bg-emerald-50/30">
                <td className="sticky left-0 z-10 bg-white border-r border-slate-200 px-2 py-2 text-center align-middle">
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-1 text-[10px] font-mono font-semibold text-sky-700 ring-1 ring-sky-100">
                    <Clock className="h-3 w-3" />
                    {e.jam}
                  </span>
                </td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.sao2 || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.tipeVent || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.peep || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.rr || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.tv || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.fio2 || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.sputumVol || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.mataR || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.mataL || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.mataRespon || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.kakiRespon || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.tanganRespon || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] font-semibold text-purple-700">{e.gcsE && e.gcsM && e.gcsV ? `E${e.gcsE}M${e.gcsM}V${e.gcsV}` : "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.gcsVType || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.lineNama || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.lineJumlah || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.lineTotal || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.enteralNama || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.enteralJumlah || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.enteralTotal || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] font-semibold text-blue-700">{e.masukTotal || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.ngt || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.urine || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.bab || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] text-slate-700">{e.drain || "-"}</td>
                <td className="px-2 py-2 text-center text-[10px] font-semibold text-amber-700">{e.keluarTotal || "-"}</td>
                <td className="px-2 py-2 text-[10px] text-slate-700 max-w-[150px] truncate">{e.masalah || "-"}</td>
                <td className="px-2 py-2 text-[10px] text-slate-700 max-w-[150px] truncate">{e.tindakanObat || "-"}</td>
              </tr>
            ))}

            {entries.length === 0 && (
              <tr>
                <td colSpan={29} className="px-4 py-8 text-center text-xs text-slate-400">
                  Belum ada data. Klik tombol "Input Data Detail Pasien" untuk mulai mencatat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DetailPasienTable;
