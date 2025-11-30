import React from "react";
import { Section, InputField } from "./PatientIdentityForm";

interface Props {
  diagnosis: string[];
  onDiagnosisChange: (index: number, value: string) => void;
  onAddDiagnosis: () => void;
}

export default function PatientDiagnosisForm({
  diagnosis,
  onDiagnosisChange,
  onAddDiagnosis,
}: Props) {
  return (
    <Section title="DIAGNOSIS" color="amber">
      <div className="grid grid-cols-1 gap-3">
        {diagnosis.map((diag, idx) => (
          <InputField
            key={idx}
            label={`Diagnosis ${idx + 1}`}
            required={idx === 0}
            value={diag}
            onChange={(e) => onDiagnosisChange(idx, e.target.value)}
            placeholder={`Diagnosis ${idx + 1}`}
          />
        ))}

        {/* Tombol tambah diagnosis */}
        <button
          type="button"
          onClick={onAddDiagnosis}
          className="w-fit mt-2 px-3 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition"
        >
          + Tambah Diagnosis
        </button>
      </div>
    </Section>
  );
}
