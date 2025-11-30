// services/patientsService.ts

import { Patient } from '@/types/patient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const PATIENTS_API_URL = `${API_BASE_URL}/data/datapasien.json`;

/**
 * Fetch all patients from API
 */
export async function fetchAllPatients(): Promise<Patient[]> {
  const response = await fetch(PATIENTS_API_URL);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch patients data - Status: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Fetch single patient by ID
 */
export async function fetchPatientById(patientId: number): Promise<Patient> {
  console.log('🔍 DEBUG - Fetching patient ID:', patientId);
  
  const patients = await fetchAllPatients();
  
  console.log('🔍 DEBUG - Total patients:', patients.length);
  console.log('🔍 DEBUG - All patient IDs:', patients.map(p => p.id));
  
  const patient = patients.find(p => {
    console.log(`🔍 DEBUG - Comparing: ${p.id} (${typeof p.id}) === ${patientId} (${typeof patientId})`);
    return p.id === patientId;
  });
  
  if (!patient) {
    console.error('❌ DEBUG - Patient not found!');
    throw new Error('Pasien tidak ditemukan');
  }
  
  console.log('✅ DEBUG - Patient found:', patient.nama);
  return patient;
}

/**
 * Search patients by criteria
 */
export async function searchPatients(
  searchTerm: string,
  searchBy: 'noRM' | 'nama' | 'tglLahir'
): Promise<Patient[]> {
  const patients = await fetchAllPatients();
  const term = searchTerm.toLowerCase().trim();
  
  return patients.filter(patient => {
    switch (searchBy) {
      case 'noRM':
        return patient.noRM.toLowerCase().includes(term);
      case 'nama':
        return patient.nama.toLowerCase().includes(term);
      case 'tglLahir':
        return patient.tglLahir.includes(term);
      default:
        return true;
    }
  });
}