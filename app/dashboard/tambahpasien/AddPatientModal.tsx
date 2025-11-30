"use client";
import React from "react";
import { X } from "lucide-react";
import PatientIdentityForm from "./PatientIdentityForm";
import PatientResponsibleForm from "./PatientResponsibleForm";
import PatientDiagnosisForm from "./PatientDiagnosisForm";

export interface FormData {
  noRM: string;
  nama: string;
  tglLahir: string;
  unit: string;
  tanggalMasuk: string;
  hariKe: number;
  bb: string;
  tb: string;
  dokterDPJP: string;
  perawatPrimer: string;
  perawatJaga: string;
  diagnosis: string[];
}

interface AddPatientModalProps {
  isOpen: boolean;
  formData: FormData;
  onClose: () => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onDiagnosisChange: (index: number, value: string) => void;
  onSubmit: () => void;
}

export default function AddPatientModal({
  isOpen,
  formData,
  onClose,
  onInputChange,
  onDiagnosisChange,
  onSubmit,
}: AddPatientModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="
          bg-white rounded-2xl shadow-xl w-full max-w-3xl 
          max-h-[85vh] overflow-y-auto scroll-smooth 
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
        "
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-t-2xl flex items-center justify-between shadow-md">
          <h3 className="text-lg font-semibold">Tambah Pasien Baru</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          <PatientIdentityForm formData={formData} onInputChange={onInputChange} />
          <PatientResponsibleForm formData={formData} onInputChange={onInputChange} />
          <PatientDiagnosisForm
            diagnosis={formData.diagnosis}
            onDiagnosisChange={onDiagnosisChange}
            onAddDiagnosis={() => {
              // Add a new empty diagnosis entry
              onDiagnosisChange(formData.diagnosis.length, "");
            }}
          />

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition"
            >
              Batal
            </button>

            <button
              onClick={onSubmit}
              className="flex-1 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
