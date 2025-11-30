// utils/dashboardUtils.ts

import { Patient, SearchByType } from '@/types/patient';

/**
 * Filter patients berdasarkan search term dan search type
 */
export function filterPatientsBySearch(
  patients: Patient[], 
  searchTerm: string, 
  searchBy: SearchByType
): Patient[] {
  if (!searchTerm.trim()) return patients;
  
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

/**
 * Format tanggal ke format Indonesia
 */
export function formatDateIndonesia(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Hitung umur dari tanggal lahir
 */
export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}