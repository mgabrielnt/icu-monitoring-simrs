'use client';

import React from 'react';
import { User } from 'lucide-react';

// Dummy data pasien
const patientData = {
  noRM: "RM-2024-001",
  nama: "Budi Santoso",
  tglLahir: "1965-03-15",
  unit: "ICU",
  tglMasuk: "2024-11-10",
  bb: 70,
  tb: 165,
  penanggungJawab: "Dr. Ahmad Wijaya, Sp.JP",
  dokterDPJP: "Dr. Sarah Kusuma, Sp.An",
  perawatPrimer: "Ns. Maria Indah",
  diagnosis: [
    "Post Op CABG",
    "CHF NYHA III", 
    "DM Type 2",
    "Hypertension Stage 2",
    "CKD Stage 3"
  ]
};

export default function PatientInfo() {
  const calculateHariRawat = (tglMasuk: string) => {
    const masuk = new Date(tglMasuk);
    const sekarang = new Date();
    const diffTime = Math.abs(sekarang.getTime() - masuk.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <User className="w-6 h-6 mr-2 text-blue-600" />
        Data Diri Pasien yang Dirawat
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kolom Kiri */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">No. Rekam Medis *</span>
            <span className="text-gray-900 font-medium">{patientData.noRM}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">Nama *</span>
            <span className="text-gray-900 font-medium">{patientData.nama}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">Tanggal Lahir *</span>
            <span className="text-gray-900 font-medium">
              {new Date(patientData.tglLahir).toLocaleDateString('id-ID')}
            </span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">BB (Berat Badan)</span>
            <span className="text-gray-900 font-medium">{patientData.bb} kg</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">TB (Tinggi Badan)</span>
            <span className="text-gray-900 font-medium">{patientData.tb} cm</span>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">Unit *</span>
            <span className={`px-4 py-1 rounded-full text-sm font-bold ${
              patientData.unit === 'ICU' 
                ? 'bg-red-100 text-red-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {patientData.unit}
            </span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">Tanggal Masuk *</span>
            <span className="text-gray-900 font-medium">
              {new Date(patientData.tglMasuk).toLocaleDateString('id-ID')}
            </span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">Hari Perawatan Ke *</span>
            <span className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">
              Hari ke-{calculateHariRawat(patientData.tglMasuk)}
            </span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">Penanggung Jawab Pasien *</span>
            <span className="text-gray-900 font-medium text-right">{patientData.penanggungJawab}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">Dokter DPJP</span>
            <span className="text-gray-900 font-medium text-right">{patientData.dokterDPJP}</span>
          </div>
          
          <div className="flex justify-between items-center border-b pb-3">
            <span className="font-semibold text-gray-700">Perawat Primer</span>
            <span className="text-gray-900 font-medium">{patientData.perawatPrimer}</span>
          </div>
        </div>
      </div>

      {/* Diagnosis Section */}
      <div className="mt-8">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">Diagnosis *</h3>
        <div className="grid grid-cols-1 gap-3">
          {patientData.diagnosis.map((diag, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <span className="flex-shrink-0 w-8 h-8 bg-yellow-200 text-yellow-800 rounded-full flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </span>
              <span className="text-gray-800 font-medium pt-1">{diag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}