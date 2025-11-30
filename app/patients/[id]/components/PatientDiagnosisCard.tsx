// app/patients/[id]/components/PatientDiagnosisCard.tsx

import React from 'react';
import { Activity } from 'lucide-react';

interface PatientDiagnosisCardProps {
  diagnosis: string[];
}

export default function PatientDiagnosisCard({ diagnosis }: PatientDiagnosisCardProps) {
  return (
    <div className="mt-6 bg-yellow-50 rounded-lg p-6 border border-yellow-200">
      <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-yellow-600" />
        Diagnosis
      </h3>
      <ul className="space-y-3">
        {diagnosis.map((diag, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-200 text-yellow-800 font-bold text-sm mr-3 flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-gray-800 leading-relaxed">{diag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}