"use client";

import { InstruksiObatModalProps } from "@/types/instructionTypes";
import { JAM_IMPLEMENTASI } from "@/lib/constants/instruksiObatConstants";
import { generateEmptyObatRow, generateEmptyInstruksiLainRow } from "@/utils/instruksiObat";

export default function InstruksiObatModal(props: InstruksiObatModalProps) {
  if (!props.isOpen) return null;

  const updateObatRow = (index: number, field: string, value: string) => {
    const newData = [...props.instruksiObat];
    newData[index] = { ...newData[index], [field]: value };
    props.setInstruksiObat(newData);
  };

  const updateObatImplementasi = (rowIndex: number, jam: string, value: string) => {
    const newData = [...props.instruksiObat];
    newData[rowIndex] = {
      ...newData[rowIndex],
      implementasi: {
        ...newData[rowIndex].implementasi,
        [jam]: value
      }
    };
    props.setInstruksiObat(newData);
  };

  const addObatRow = () => {
    props.setInstruksiObat([...props.instruksiObat, generateEmptyObatRow()]);
  };

  const deleteObatRow = (index: number) => {
    props.setInstruksiObat(props.instruksiObat.filter((_, i) => i !== index));
  };

  const updateInstruksiLainRow = (index: number, field: string, value: string) => {
    const newData = [...props.instruksiLain];
    newData[index] = { ...newData[index], [field]: value };
    props.setInstruksiLain(newData);
  };

  const updateInstruksiLainImplementasi = (rowIndex: number, jam: string, value: string) => {
    const newData = [...props.instruksiLain];
    newData[rowIndex] = {
      ...newData[rowIndex],
      implementasi: {
        ...newData[rowIndex].implementasi,
        [jam]: value
      }
    };
    props.setInstruksiLain(newData);
  };

  const addInstruksiLainRow = () => {
    props.setInstruksiLain([...props.instruksiLain, generateEmptyInstruksiLainRow()]);
  };

  const deleteInstruksiLainRow = (index: number) => {
    props.setInstruksiLain(props.instruksiLain.filter((_, i) => i !== index));
  };

  const updateNutrisiRow = (index: number, field: string, value: string) => {
    const newData = [...props.nutrisiCairan];
    newData[index] = { ...newData[index], [field]: value };
    props.setNutrisiCairan(newData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[95vw] max-h-[95vh] overflow-y-auto">
        {/* HEADER */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold">Instruksi Obat</h2>
            <div className="flex items-center gap-3 mt-2">
              <label className="text-sm font-medium">HARI PERAWATAN KE:</label>
              <input
                type="number"
                className="border rounded px-3 py-1 w-24"
                value={props.hariPerawatan}
                onChange={(e) => props.setHariPerawatan(Number(e.target.value))}
              />
            </div>
          </div>
          <button onClick={props.onClose} className="text-3xl text-gray-400 hover:text-gray-600">×</button>
        </div>

        <div className="p-6 space-y-6">
          {/* TABEL INSTRUKSI OBAT */}
          <div>
            <h3 className="font-bold mb-3 uppercase text-sm">Instruksi Obat</h3>
            <div className="overflow-x-auto border rounded">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th rowSpan={2} className="border p-2">Jam</th>
                    <th rowSpan={2} className="border p-2 min-w-[150px]">Nama Obat</th>
                    <th rowSpan={2} className="border p-2">Dosis Obat</th>
                    <th rowSpan={2} className="border p-2 min-w-[120px]">Cara Pemberian</th>
                    <th rowSpan={2} className="border p-2">Tgl Mulai</th>
                    <th rowSpan={2} className="border p-2">Tgl Stop</th>
                    <th rowSpan={2} className="border p-2">Ket P/E/D</th>
                    <th rowSpan={2} className="border p-2 min-w-[120px]">Nama/TT Dokter</th>
                    <th colSpan={12} className="border p-2 bg-green-100">
                      Implementasi<br/>
                      <span className="text-xs font-normal">Tuliskan jam obat yang diberikan</span>
                    </th>
                    <th rowSpan={2} className="border p-2">Aksi</th>
                  </tr>
                  <tr className="bg-green-50">
                    {JAM_IMPLEMENTASI.map(jam => (
                      <th key={jam} className="border p-1 font-normal">{jam}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {props.instruksiObat.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="border p-1">
                        <input
                          className="w-full p-1 text-xs"
                          value={row.jam}
                          onChange={(e) => updateObatRow(i, 'jam', e.target.value)}
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          className="w-full p-1 text-xs"
                          value={row.namaObat}
                          onChange={(e) => updateObatRow(i, 'namaObat', e.target.value)}
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          className="w-full p-1 text-xs"
                          value={row.dosisObat}
                          onChange={(e) => updateObatRow(i, 'dosisObat', e.target.value)}
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          className="w-full p-1 text-xs"
                          value={row.caraPemberian}
                          onChange={(e) => updateObatRow(i, 'caraPemberian', e.target.value)}
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          type="date"
                          className="w-full p-1 text-xs"
                          value={row.tglMulai}
                          onChange={(e) => updateObatRow(i, 'tglMulai', e.target.value)}
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          type="date"
                          className="w-full p-1 text-xs"
                          value={row.tglStop}
                          onChange={(e) => updateObatRow(i, 'tglStop', e.target.value)}
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          className="w-full p-1 text-xs"
                          value={row.ketPED}
                          onChange={(e) => updateObatRow(i, 'ketPED', e.target.value)}
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          className="w-full p-1 text-xs"
                          value={row.namaDokter}
                          onChange={(e) => updateObatRow(i, 'namaDokter', e.target.value)}
                        />
                      </td>
                      {JAM_IMPLEMENTASI.map(jam => (
                        <td key={jam} className="border p-1 bg-green-50">
                          <input
                            className="w-12 p-1 text-xs text-center"
                            value={row.implementasi[jam] || ''}
                            onChange={(e) => updateObatImplementasi(i, jam, e.target.value)}
                          />
                        </td>
                      ))}
                      <td className="border p-1 text-center">
                        <button
                          onClick={() => deleteObatRow(i)}
                          className="text-red-600 text-xs hover:text-red-800"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={addObatRow}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs"
            >
              + Tambah Baris Obat
            </button>
          </div>

          {/* VERIFIKASI DPJP */}
          <div className="flex items-center gap-4 bg-gray-50 p-3 rounded">
            <span className="text-sm font-medium">Verifikasi : DPJP</span>
            <input
              className="border rounded px-3 py-1 flex-1"
              value={props.verifikasiDPJP}
              onChange={(e) => props.setVerifikasiDPJP(e.target.value)}
              placeholder="Nama DPJP"
            />
          </div>

          {/* INSTRUKSI LAIN */}
          <div>
            <h3 className="font-bold mb-3 uppercase text-sm bg-gray-100 p-2">Instruksi Lain (Pemeriksaan penunjang / Lab)</h3>
            <div className="overflow-x-auto border rounded">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border p-2 min-w-[200px]">Instruksi</th>
                    {JAM_IMPLEMENTASI.map(jam => (
                      <th key={jam} className="border p-1 bg-green-50">{jam}</th>
                    ))}
                    <th className="border p-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {props.instruksiLain.map((row, i) => (
                    <tr key={i}>
                      <td className="border p-1">
                        <input
                          className="w-full p-1 text-xs"
                          value={row.instruksi}
                          onChange={(e) => updateInstruksiLainRow(i, 'instruksi', e.target.value)}
                        />
                      </td>
                      {JAM_IMPLEMENTASI.map(jam => (
                        <td key={jam} className="border p-1 bg-green-50">
                          <input
                            className="w-12 p-1 text-xs text-center"
                            value={row.implementasi[jam] || ''}
                            onChange={(e) => updateInstruksiLainImplementasi(i, jam, e.target.value)}
                          />
                        </td>
                      ))}
                      <td className="border p-1 text-center">
                        <button
                          onClick={() => deleteInstruksiLainRow(i)}
                          className="text-red-600 text-xs"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={addInstruksiLainRow}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs"
            >
              + Tambah Instruksi Lain
            </button>
          </div>

          {/* NUTRISI / CAIRAN */}
          <div>
            <h3 className="font-bold mb-3 uppercase text-sm bg-gray-100 p-2">Nutrisi / Cairan</h3>
            <div className="overflow-x-auto border rounded">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th rowSpan={2} className="border p-2">Nutrisi / cairan</th>
                    <th colSpan={2} className="border p-2">Parenteral</th>
                    <th colSpan={2} className="border p-2">Enteral</th>
                    <th rowSpan={2} className="border p-2">Jam</th>
                    <th rowSpan={2} className="border p-2 bg-green-100">Pola Ventilasi</th>
                  </tr>
                </thead>
                <tbody>
                  {props.nutrisiCairan.map((row, i) => (
                    <tr key={i}>
                      <td className="border p-2 font-medium">{row.jenis} :</td>
                      <td colSpan={2} className="border p-1">
                        <input
                          className="w-full p-1 text-xs"
                          value={row.parenteral}
                          onChange={(e) => updateNutrisiRow(i, 'parenteral', e.target.value)}
                        />
                      </td>
                      <td colSpan={2} className="border p-1">
                        <input
                          className="w-full p-1 text-xs"
                          value={row.enteral}
                          onChange={(e) => updateNutrisiRow(i, 'enteral', e.target.value)}
                        />
                      </td>
                      <td className="border p-1">
                        <input
                          className="w-full p-1 text-xs"
                          value={row.jam}
                          onChange={(e) => updateNutrisiRow(i, 'jam', e.target.value)}
                        />
                      </td>
                      {i === 0 && (
                        <td rowSpan={4} className="border p-1 bg-green-50">
                          <textarea
                            className="w-full p-2 text-xs min-h-[100px]"
                            value={props.polaVentilasi}
                            onChange={(e) => props.setPolaVentilasi(e.target.value)}
                            placeholder="Pola ventilasi..."
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* VERIFIKASI DPJP 2 */}
          <div className="flex items-center gap-4 bg-gray-50 p-3 rounded">
            <span className="text-sm font-medium">Verifikasi DPJP :</span>
            <input
              className="border rounded px-3 py-1 flex-1"
              value={props.verifikasiDPJP2}
              onChange={(e) => props.setVerifikasiDPJP2(e.target.value)}
              placeholder="Nama DPJP"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-3">
          <button
            onClick={props.onClose}
            className="px-5 py-2 border rounded-lg hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={props.onSubmit}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
          >
            {props.isEditing ? "Update" : "Simpan"} Instruksi
          </button>
        </div>
      </div>
    </div>
  );
}