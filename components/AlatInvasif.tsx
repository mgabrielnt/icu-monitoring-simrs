'use client';

import React, { useState } from 'react';
import { Shield, Plus, Trash2 } from 'lucide-react';

interface AlatInvasif {
  id: number;
  jenisAlat: string;
  ukuran: string;
  lokasi: string;
  tglPasang: string;
  hariKe: number;
  totalSkor?: number;
}

export default function AlatInvasif() {
  const [alatList, setAlatList] = useState<AlatInvasif[]>([
    { id: 1, jenisAlat: "IV Line", ukuran: "18G", lokasi: "Tangan Kanan", tglPasang: "2024-11-10", hariKe: 5 },
    { id: 2, jenisAlat: "NGT", ukuran: "14Fr", lokasi: "Hidung Kanan", tglPasang: "2024-11-10", hariKe: 5 },
    { id: 3, jenisAlat: "Catheter Urine", ukuran: "16Fr", lokasi: "Uretra", tglPasang: "2024-11-10", hariKe: 5 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jenisAlat: '',
    ukuran: '',
    lokasi: '',
    tglPasang: '',
    hariKe: 0,
    totalSkor: 0
  });

  const jenisAlatOptions = [
    "IV Line",
    "Arteri Line",
    "Swanz Ganz",
    "IABP",
    "Sheath/TPM",
    "OTT/ETT/ET",
    "NGT",
    "Drain",
    "WSD",
    "D.Cath/D.CO",
    "Epid Cath",
    "PNB Cath"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlat: AlatInvasif = {
      id: Date.now(),
      ...formData
    };
    setAlatList([...alatList, newAlat]);
    setFormData({
      jenisAlat: '',
      ukuran: '',
      lokasi: '',
      tglPasang: '',
      hariKe: 0,
      totalSkor: 0
    });
    setShowForm(false);
    alert('Data alat invasif berhasil ditambahkan!');
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      setAlatList(alatList.filter(alat => alat.id !== id));
    }
  };

  const calculateHariKe = (tglPasang: string) => {
    if (!tglPasang) return 0;
    const pasang = new Date(tglPasang);
    const sekarang = new Date();
    const diffTime = Math.abs(sekarang.getTime() - pasang.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Table Display */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-green-600" />
            Pemasangan Alat Invasif / Tube
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Alat</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jenis Alat *</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ukuran *</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Lokasi *</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tgl Pasang *</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hari Ke *</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Total Skor</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {alatList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Belum ada data alat invasif
                  </td>
                </tr>
              ) : (
                alatList.map((alat) => (
                  <tr key={alat.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">{alat.jenisAlat}</td>
                    <td className="px-6 py-4 text-gray-700">{alat.ukuran}</td>
                    <td className="px-6 py-4 text-gray-700">{alat.lokasi}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(alat.tglPasang).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold text-sm">
                        {alat.hariKe}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
                        {alat.totalSkor || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(alat.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Input */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Form Input Alat Invasif</h3>
          <p className="text-sm text-gray-600 mb-4">* Semua field wajib diisi (mandatory)</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Jenis Alat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Alat *
                </label>
                <select
                  value={formData.jenisAlat}
                  onChange={(e) => setFormData({ ...formData, jenisAlat: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                >
                  <option value="">Pilih Jenis Alat</option>
                  {jenisAlatOptions.map((jenis) => (
                    <option key={jenis} value={jenis}>{jenis}</option>
                  ))}
                </select>
              </div>

              {/* Ukuran */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ukuran *
                </label>
                <input
                  type="text"
                  value={formData.ukuran}
                  onChange={(e) => setFormData({ ...formData, ukuran: e.target.value })}
                  placeholder="Contoh: 18G, 14Fr"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>

              {/* Lokasi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi *
                </label>
                <input
                  type="text"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  placeholder="Contoh: Tangan Kanan"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>

              {/* Tanggal Pasang */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Pasang *
                </label>
                <input
                  type="date"
                  value={formData.tglPasang}
                  onChange={(e) => {
                    const tgl = e.target.value;
                    setFormData({ 
                      ...formData, 
                      tglPasang: tgl,
                      hariKe: calculateHariKe(tgl)
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>

              {/* Hari Ke */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hari Ke * (Auto calculate)
                </label>
                <input
                  type="number"
                  value={formData.hariKe}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              {/* Total Skor (PR) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Skor (PR)
                </label>
                <input
                  type="number"
                  value={formData.totalSkor}
                  onChange={(e) => setFormData({ ...formData, totalSkor: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Simpan Data
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}