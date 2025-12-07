"use client";

import { SavedInstruksiObat } from "@/types/instructionTypes";

interface InstruksiObatTableProps {
  data: SavedInstruksiObat[];
  onEdit: (item: SavedInstruksiObat) => void;
  onDelete: (id: string) => void;
}

export default function InstruksiObatTable({ data, onEdit, onDelete }: InstruksiObatTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Data</h3>
          <p className="text-gray-500 mb-6">
            Klik tombol <span className="font-semibold text-teal-600">"Input Data Instruksi Obat"</span> untuk mulai mencatat
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-r">
                Hari Ke
              </th>
              <th colSpan={3} className="px-4 py-3 text-center text-xs font-bold text-teal-700 uppercase tracking-wider border-r bg-teal-50">
                Instruksi Obat
              </th>
              <th colSpan={2} className="px-4 py-3 text-center text-xs font-bold text-blue-700 uppercase tracking-wider border-r bg-blue-50">
                Instruksi Lain
              </th>
              <th colSpan={4} className="px-4 py-3 text-center text-xs font-bold text-purple-700 uppercase tracking-wider border-r bg-purple-50">
                Nutrisi / Cairan
              </th>
              <th colSpan={2} className="px-4 py-3 text-center text-xs font-bold text-green-700 uppercase tracking-wider border-r bg-green-50">
                Verifikasi DPJP
              </th>
              <th className="px-4 py-3 text-center text-xs font-bold text-red-700 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 border-r text-sm font-medium text-gray-900">
                  {item.hariPerawatan}
                </td>
                <td className="px-4 py-3 border-r text-sm text-gray-700" colSpan={3}>
                  {item.instruksiObat.length} item
                </td>
                <td className="px-4 py-3 border-r text-sm text-gray-700" colSpan={2}>
                  {item.instruksiLain.length} item
                </td>
                <td className="px-4 py-3 border-r text-sm text-gray-700" colSpan={4}>
                  {item.nutrisiCairan.map(n => `${n.jenis}: P(${n.parenteral}), E(${n.enteral})`).join("; ")}
                </td>
                <td className="px-4 py-3 border-r text-sm text-gray-700" colSpan={2}>
                  {item.verifikasiDPJP} / {item.verifikasiDPJP2}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 flex gap-2 justify-center">
                  <button 
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-800 text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}