// app/dashboard/addpatient/PatientDiagnosisForm.tsx
import React from "react";
import { Section, InputField } from "@/components/FormComponents";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  diagnosis: string[];
  onDiagnosisChange: (index: number, value: string) => void;
  onAddDiagnosis: () => void;
  onRemoveDiagnosis?: (index: number) => void;
}

export default function PatientDiagnosisForm({
  diagnosis,
  onDiagnosisChange,
  onAddDiagnosis,
  onRemoveDiagnosis,
}: Props) {
  return (
    <Section title="DIAGNOSIS" color="amber">
      <div className="space-y-3">
        {diagnosis.map((diag, idx) => (
          <div key={idx} className="flex gap-2 items-end">
            <div className="flex-1">
              <InputField
                label={`Diagnosis ${idx + 1}`}
                required={idx === 0}
                value={diag}
                onChange={(e) => onDiagnosisChange(idx, e.target.value)}
                placeholder={`Masukkan diagnosis ${idx + 1}`}
              />
            </div>
            
            {/* Tombol hapus (hanya tampil jika lebih dari 1 diagnosis) */}
            {diagnosis.length > 1 && onRemoveDiagnosis && (
              <button
                type="button"
                onClick={() => onRemoveDiagnosis(idx)}
                className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition border-2 border-red-200"
                title="Hapus diagnosis"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}

        {/* Tombol tambah diagnosis */}
        <button
          type="button"
          onClick={onAddDiagnosis}
          className="flex items-center gap-2 mt-2 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Tambah Diagnosis
        </button>
      </div>
    </Section>
  );
}