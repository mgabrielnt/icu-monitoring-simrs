// hooks/useAddPatientForm.ts

import { useState } from 'react';
import { AddPatientFormData } from '@/types/patient';

const initialFormState: AddPatientFormData = {
  noRM: '',
  nama: '',
  tglLahir: '',
  unit: 'ICU',
  tanggalMasuk: '',
  hariKe: 1,
  bb: '',
  tb: '',
  penanggungJawab: '',
  dokterDPJP: '',
  perawatPrimer: '',
  perawatJaga: '',
  diagnosis: ['']
};

export function useAddPatientForm() {
  const [formData, setFormData] = useState<AddPatientFormData>(initialFormState);

  const handleFormInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormDiagnosisChange = (index: number, value: string) => {
    setFormData(prev => {
      const newDiagnosis = [...prev.diagnosis];
      
      // Jika index melebihi array length, extend array
      if (index >= newDiagnosis.length) {
        newDiagnosis.push(value);
      } else {
        newDiagnosis[index] = value;
      }
      
      return {
        ...prev,
        diagnosis: newDiagnosis
      };
    });
  };

  const resetAddPatientForm = () => {
    setFormData(initialFormState);
  };

  return {
    formData,
    handleFormInputChange,
    handleFormDiagnosisChange,
    resetAddPatientForm
  };
}