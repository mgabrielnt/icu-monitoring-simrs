// services/instruksi-obat.service.ts

import { SavedInstruksiObat, InstruksiObatFormData } from "@/types/instructionTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const INSTRUKSI_OBAT_API_URL = `${API_BASE_URL}/api/instruksi-obat`;
const INSTRUKSI_OBAT_DATA_URL = `${API_BASE_URL}/data/instruksi-obat.json`;

export class InstruksiObatService {
  private static isBackendActive = false;

  static async checkBackend(): Promise<boolean> {
    try {
      const response = await fetch(INSTRUKSI_OBAT_API_URL, {
        method: 'HEAD',
      });
      this.isBackendActive = response.ok;
      return response.ok;
    } catch {
      this.isBackendActive = false;
      return false;
    }
  }

  /**
   * Fetch semua data instruksi obat
   */
  static async getAll(): Promise<SavedInstruksiObat[]> {
    try {
      const url = this.isBackendActive ? INSTRUKSI_OBAT_API_URL : INSTRUKSI_OBAT_DATA_URL;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching instruksi obat:', error);
      throw error;
    }
  }

  /**
   * Fetch data instruksi obat berdasarkan ID
   */
  static async getById(id: string): Promise<SavedInstruksiObat | null> {
    try {
      const url = this.isBackendActive 
        ? `${INSTRUKSI_OBAT_API_URL}/${id}` 
        : INSTRUKSI_OBAT_DATA_URL;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (this.isBackendActive) {
        const result = await response.json();
        return result.data || null;
      } else {
        const result = await response.json();
        const found = result.data.find((item: SavedInstruksiObat) => item.id === id);
        return found || null;
      }
    } catch (error) {
      console.error('Error fetching instruksi obat by ID:', error);
      throw error;
    }
  }

  /**
   * Simpan data instruksi obat baru ke backend
   */
  static async create(data: InstruksiObatFormData): Promise<SavedInstruksiObat> {
    try {
      if (!this.isBackendActive) {
        // Simulate API call for dummy data
        return new Promise((resolve) => {
          setTimeout(() => {
            const newData: SavedInstruksiObat = {
              id: `INS-${Date.now()}`,
              ...data,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            resolve(newData);
          }, 500);
        });
      }

      const response = await fetch(INSTRUKSI_OBAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error creating instruksi obat:', error);
      throw error;
    }
  }

  /**
   * Update data instruksi obat yang sudah ada
   */
  static async update(id: string, data: InstruksiObatFormData): Promise<SavedInstruksiObat> {
    try {
      if (!this.isBackendActive) {
        // Simulate API call for dummy data
        return new Promise((resolve) => {
          setTimeout(() => {
            const updatedData: SavedInstruksiObat = {
              id,
              ...data,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            resolve(updatedData);
          }, 500);
        });
      }

      const response = await fetch(`${INSTRUKSI_OBAT_API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error updating instruksi obat:', error);
      throw error;
    }
  }

  /**
   * Hapus data instruksi obat
   */
  static async delete(id: string): Promise<void> {
    try {
      if (!this.isBackendActive) {
        // Simulate API call for dummy data
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 500);
        });
      }

      const response = await fetch(`${INSTRUKSI_OBAT_API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting instruksi obat:', error);
      throw error;
    }
  }
}