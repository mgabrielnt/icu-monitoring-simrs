// hooks/usePatientDetail.ts

import { useState, useEffect } from 'react';
import { Patient } from '@/types/patient';
import { fetchPatientById } from '@/services/patientsService';

export function usePatientDetail(patientId: number) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPatient = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchPatientById(patientId);
      setPatient(data);
    } catch (err) {
      console.error('Error loading patient:', err);
      setError(err instanceof Error ? err.message : 'Gagal memuat data pasien');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      loadPatient();
    }
  }, [patientId]);

  const refreshPatient = async () => {
    await loadPatient();
  };

  return {
    patient,
    loading,
    error,
    refreshPatient
  };
}