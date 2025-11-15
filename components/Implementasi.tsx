'use client';

import React, { useState } from 'react';
import { FileText, Plus, CheckCircle } from 'lucide-react';

interface ImplementasiData {
  no: number;
  jenisKegiatan: string;
  jam: string;
  paraf: string;
}

interface Props {
  currentTime: Date;
}

export default function Implementasi({ currentTime }: Props) {
  const [dataList, setDataList] = useState<ImplementasiData[]>([
    { no: 1, jenisKegiatan: "Monitor kesadaran: GCS", jam: "08:00", paraf: "RS" },
    { no: 2, jenisKegiatan: "Monitor TD, N, R, Temp, SpO2", jam: "08:00", paraf: "RS" },
    { no: 3, jenisKegiatan: "Personal Hygiene: Mandi, perineal", jam: "09:00", paraf: "RS" },
    { no: 4, jenisKegiatan: "Monitoring Balance Cairan", jam: "10:00", paraf: "RS" },
    { no: 5, jenisKegiatan: "Perawatan mulut", jam: "11:00", paraf: "RS" },
    { no: 6, jenisKegiatan: "Pengelolaan Diet melalui NGT", jam: "12:00", paraf: "BH" }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jenisKegiatan: '',
    paraf: ''
  });

  // Daftar kegiatan umum ICU
  const kegiatanUmum = [
    "Monitor kesadaran: GCS",
    "Monitor TD, N, R, Temp, SpO2",
    "Merekam EKG",
    "Mengukur CVC, arteri line",
    "Monitor Terapi O2: binasal, RM, NRM, T-Piece",
    "Monitor Nyeri",
    "Monitor setting ventilator, humidifier",
    "Monitor setting TPM, AIBP",
    "Monitor Reflek Mata, kekuatan otot",
    "Pengelolaan Diet melalui Oral/NGT",
    "Monitoring tanda pendarahan",
    "Personal Hygiene: Mandi, perineal",
    "Perawatan mulut",
    "Perawatan ETT/TT",
    "Perawatan Drain, WSD",
    "Perawatan Sheath, TPM",
    "Suctioning",
    "Fisioterapi, mobilisasi jantung",
    "Rekam EKG 12 Lead",
    "Monitor Balance Cairan",
    "Perawatan luka",
    "Alih Baring, Head Up 30°",
    "Pencegahan Jatuh Resiko Rendah/Tinggi"
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newData: ImplementasiData = {
      no: dataList.length + 1,
      jenisKegiatan: formData.jenisKegiatan,
      jam: formatTime(currentTime),
      paraf: formData.paraf
    };
    setDataList([...dataList, newData]);
    setFormData({ jenisKegiatan: '', paraf: '' });
    setShowForm(false);
    alert('Data implementasi berhasil ditambahkan!');
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Perencanaan Perawat & Implementasi</h2>
            <p className="text-green-100">
              Tuliskan jam dan paraf setelah melaksanakan instruksi / kegiatan
            </p>
          </div>
          <CheckCircle className="w-16 h-16 text-green-200" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-green-600" />
            Daftar Implementasi Kegiatan Perawatan
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kegiatan</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 w-16">No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jenis Kegiatan</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 w-32">Jam Pelaksanaan</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 w-32">Paraf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataList.map((data) => (
                <tr key={data.no} className="hover:bg-green-50 transition">
                  <td className="px-6 py-4 text-center font-bold text-gray-700">
                    {data.no}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {data.jenisKegiatan}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-mono font-bold">
                      {data.jam}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold">
                      {data.paraf}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Input */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Tambah Implementasi Kegiatan</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Jam (Real-time Auto) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Pelaksanaan (Real-time) *
                </label>
                <input
                  type="text"
                  value={formatTime(currentTime)}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 font-mono font-bold text-blue-700"
                />
                <p className="text-xs text-gray-500 mt-1">* Jam otomatis dari sistem</p>
              </div>

              {/* Jenis Kegiatan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Kegiatan *
                </label>
                <select
                  value={formData.jenisKegiatan}
                  onChange={(e) => setFormData({ ...formData, jenisKegiatan: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                >
                  <option value="">Pilih Kegiatan</option>
                  {kegiatanUmum.map((kegiatan, idx) => (
                    <option key={idx} value={kegiatan}>{kegiatan}</option>
                  ))}
                  <option value="custom">Kegiatan Lain (Custom)</option>
                </select>
              </div>

              {/* Paraf */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paraf Perawat *
                </label>
                <input
                  type="text"
                  value={formData.paraf}
                  onChange={(e) => setFormData({ ...formData, paraf: e.target.value })}
                  placeholder="Inisial perawat"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Custom Kegiatan Input */}
            {formData.jenisKegiatan === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kegiatan Lain (Custom) *
                </label>
                <input
                  type="text"
                  onChange={(e) => setFormData({ ...formData, jenisKegiatan: e.target.value })}
                  placeholder="Masukkan jenis kegiatan lain"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Simpan Kegiatan
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

      {/* Note */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Catatan:</strong> Jam pelaksanaan otomatis diambil dari waktu real-time sistem. 
              Pastikan untuk langsung input setelah melaksanakan kegiatan agar waktu tercatat akurat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}