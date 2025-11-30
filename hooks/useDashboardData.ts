// hooks/useDashboardData.ts

import { useState, useEffect } from 'react';
import { Patient } from '@/types/patient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const PATIENTS_API_URL = `${API_BASE_URL}/data/datapasien.json`;

export function useDashboardData() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch(PATIENTS_API_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch patients data');
      }
      
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Gagal memuat data pasien');
    } finally {
      setLoading(false);
    }
  };

  const addPatientToList = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
  };

  const getNextPatientId = () => {
    return patients.length > 0 
      ? Math.max(...patients.map(p => p.id)) + 1 
      : 1;
  };

  return { 
    patients, 
    loading, 
    addPatientToList, 
    getNextPatientId,
    refreshPatients: fetchPatients
  };
}