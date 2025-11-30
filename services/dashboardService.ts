import { Patient } from '@/types/patient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const PATIENTS_API_URL = `${API_BASE_URL}/data/datapasien.json`;

export class DashboardService {
  static async fetchAllPatients(): Promise<Patient[]> {
    try {
      const response = await fetch(PATIENTS_API_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch patients data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  }

  static async addNewPatient(patient: Patient): Promise<Patient> {
    // TODO: Implement actual API call
    // For now, just return the patient
    return patient;
  }

  static async updatePatientData(id: number, patient: Partial<Patient>): Promise<Patient> {
    // TODO: Implement actual API call
    throw new Error('Not implemented');
  }

  static async deletePatientData(id: number): Promise<void> {
    // TODO: Implement actual API call
    throw new Error('Not implemented');
  }
}

export default DashboardService;