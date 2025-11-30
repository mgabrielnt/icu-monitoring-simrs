// app/dashboard/addpatient/AddPatientModal.tsx
"use client";
import React from "react";
import { X } from "lucide-react";
import PatientIdentityForm from "./PatientIdentityForm";
import PatientResponsibleForm from "./PatientResponsibleForm";
import PatientDiagnosisForm from "./PatientDiagnosisForm";
import { AddPatientFormData } from "@/types/patient";

interface AddPatientModalProps {
  isOpen: boolean;
  formData: AddPatientFormData;
  onClose: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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

  const handleAddDiagnosis = () => {
    onDiagnosisChange(formData.diagnosis.length, "");
  };

  const handleRemoveDiagnosis = (index: number) => {
    // Remove diagnosis at index dan shift semua diagnosis setelahnya
    const newDiagnosis = formData.diagnosis.filter((_, i) => i !== index);
    
    // Update semua diagnosis
    newDiagnosis.forEach((diag, i) => {
      onDiagnosisChange(i, diag);
    });
    
    // Jika semua diagnosis dihapus, set minimal 1 empty diagnosis
    if (newDiagnosis.length === 0) {
      onDiagnosisChange(0, '');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Tambah Pasien Baru</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 scroll-smooth">
          <PatientIdentityForm 
            formData={formData} 
            onInputChange={onInputChange} 
          />
          
          <PatientResponsibleForm 
            formData={formData} 
            onInputChange={onInputChange} 
          />
          
          <PatientDiagnosisForm
            diagnosis={formData.diagnosis}
            onDiagnosisChange={onDiagnosisChange}
            onAddDiagnosis={handleAddDiagnosis}
            onRemoveDiagnosis={handleRemoveDiagnosis}
          />
        </div>

        {/* Footer - Buttons */}
        <div className="border-t bg-gray-50 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition"
          >
            Batal
          </button>

          <button
            onClick={onSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
          >
            Simpan Data Pasien
          </button>
        </div>
      </div>
    </div>
  );
}