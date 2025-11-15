'use client';

import React, { useState } from 'react';
import { TrendingUp, Plus, User } from 'lucide-react';

interface CatatanData {
  id: number;
  tglJam: string;
  profesional: string;
  hasilAssessment: string;
  instruksiPPA: string;
  parafPerawat: string;
  verifikasiDPJP?: string;
}

interface Props {
  currentTime: Date;
}

export default function CatatanTerintegrasi({ currentTime }: Props) {
  const [dataList, setDataList] = useState<CatatanData[]>([
    {
      id: 1,
      tglJam: "15/11/2024 - 08:00",
      profesional: "Perawat",
      hasilAssessment: "O: TD 120/80, HR 82x/menit, RR 18x/menit, Temp 36.8°C, SpO2 98%\nA: Pasien dalam kondisi stabil, kesadaran compos mentis, tidak ada keluhan\nP: Lanjutkan observasi TTV per 2 jam, monitor balance cairan",
      instruksiPPA: "Observasi TTV setiap 2 jam, catat balance cairan, mobilisasi bertahap",
      parafPerawat: "Ns. Rina Sari (RS)"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    profesional: 'Perawat',
    hasilAssessment: '',
    instruksiPPA: '',
    parafPerawat: ''
  });

  const profesionalOptions = [
    "Perawat",
    "Dokter",
    "Fisioterapi",
    "Ahli Gizi",
    "Apoteker"
  ];

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('id-ID', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' - ' + date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newData: CatatanData = {
      id: Date.now(),
      tglJam: formatDateTime(currentTime),
      ...formData
    };
    setDataList([...dataList, newData]);
    setFormData({
      profesional: 'Perawat',
      hasilAssessment: '',
      instruksiPPA: '',
      parafPerawat: ''
    });
    setShowForm(false);
    alert('Catatan perkembangan berhasil ditambahkan!');
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Catatan Perkembangan Pasien Terintegrasi</h2>
            <p className="text-purple-100">
              Tuliskan perkembangan pasien dengan Format SOAP/ADIME (disertai sasaran, tulis nama, beri paraf)
            </p>
          </div>
          <TrendingUp className="w-16 h-16 text-purple-200" />
        </div>
      </div>

      {/* Info Box SOAP */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <h3 className="font-bold text-blue-800 mb-2">Format SOAP/ADIME:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
          <div>
            <p><strong>S (Subjektif):</strong> Keluhan pasien</p>
            <p><strong>O (Objektif):</strong> Data dari hasil pengukuran</p>
          </div>
          <div>
            <p><strong>A (Assessment):</strong> Analisis kondisi pasien</p>
            <p><strong>P (Planning):</strong> Rencana tindakan pada hari tersebut</p>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Catatan</span>
        </button>
      </div>

      {/* List Catatan */}
      <div className="space-y-4">
        {dataList.map((data) => (
          <div key={data.id} className="bg-white rounded-lg shadow-lg border-l-4 border-purple-500 overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4 pb-3 border-b">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-bold text-gray-800">{data.tglJam}</p>
                    <p className="text-sm text-gray-600">{data.profesional}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  {data.parafPerawat}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Hasil Assessment */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Hasil Assessment Pasien dan Pemberian Layanan:
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
                      {data.hasilAssessment}
                    </pre>
                  </div>
                </div>

                {/* Instruksi PPA */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Instruksi PPA (Termasuk Pasca Bedah):
                  </h4>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">
                      {data.instruksiPPA}
                    </p>
                  </div>
                </div>

                {/* Verifikasi DPJP */}
                {data.verifikasiDPJP && (
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-600">
                      <strong>Verifikasi DPJP:</strong> {data.verifikasiDPJP}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Input */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn border-2 border-purple-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Plus className="w-6 h-6 mr-2 text-purple-600" />
            Tambah Catatan Perkembangan (SOAP/ADIME Format)
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Tanggal/Jam & Profesional */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal/Jam (Real-time) *
                </label>
                <input
                  type="text"
                  value={formatDateTime(currentTime)}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profesional Pemberi Asuhan *
                </label>
                <select
                  value={formData.profesional}
                  onChange={(e) => setFormData({ ...formData, profesional: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                >
                  {profesionalOptions.map((prof) => (
                    <option key={prof} value={prof}>{prof}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hasil Assessment & Pemberian Layanan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hasil Assessment Pasien dan Pemberian Layanan (Format SOAP/ADIME) *
              </label>
              <textarea
                value={formData.hasilAssessment}
                onChange={(e) => setFormData({ ...formData, hasilAssessment: e.target.value })}
                rows={8}
                placeholder="Tuliskan dengan format SOAP/ADIME:&#10;&#10;S (Subjektif): Keluhan pasien...&#10;O (Objektif): TD 120/80, HR 82x/menit, RR 18x/menit...&#10;A (Assessment): Pasien dalam kondisi stabil...&#10;P (Planning): Lanjutkan observasi TTV..."
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono text-sm"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                * Disertai sasaran, tulis nama lengkap, dan beri paraf pada akhir catatan
              </p>
            </div>

            {/* Instruksi PPA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instruksi PPA Termasuk Pasca Bedah *
              </label>
              <textarea
                value={formData.instruksiPPA}
                onChange={(e) => setFormData({ ...formData, instruksiPPA: e.target.value })}
                rows={4}
                placeholder="Instruksi ditulis dengan rinci dan jelas...&#10;Contoh: Observasi TTV setiap 2 jam, monitor balance cairan, mobilisasi bertahap..."
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>

            {/* Paraf Perawat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paraf Perawat (Nama Lengkap & Inisial) *
              </label>
              <input
                type="text"
                value={formData.parafPerawat}
                onChange={(e) => setFormData({ ...formData, parafPerawat: e.target.value })}
                placeholder="Contoh: Ns. Rina Sari (RS)"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
              >
                Simpan Catatan
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
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