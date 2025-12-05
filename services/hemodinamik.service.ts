// services/hemodinamik.service.ts

import type { HemodinamikPayload, HemodinamikEntry } from "@/types/hemodinamik.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const HEMODINAMIK_API_URL = `${API_BASE_URL}/api/monitoring/hemodinamik`;
const HEMODINAMIK_DATA_URL = `${API_BASE_URL}/data/hemodinamik.json`;

export class HemodinamikService {
  /**
   * Fetch semua data hemodinamik dari JSON
   */
  static async fetchAllHemodinamik(): Promise<HemodinamikEntry[]> {
    try {
      const response = await fetch(HEMODINAMIK_DATA_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch hemodinamik data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching hemodinamik data:", error);
      throw error;
    }
  }

  /**
   * Fetch data hemodinamik berdasarkan No. RM
   */
  static async fetchHemodinamikByNoRm(
    noRm: string
  ): Promise<HemodinamikEntry[]> {
    try {
      const allData = await this.fetchAllHemodinamik();
      // Filter data berdasarkan noRm jika ada field metadata
      return allData.filter((entry: any) => entry.meta?.noRm === noRm);
    } catch (error) {
      console.error("Error fetching hemodinamik by noRm:", error);
      throw error;
    }
  }

  /**
   * Simpan data hemodinamik baru ke backend
   */
  static async saveHemodinamik(
    payload: HemodinamikPayload
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(HEMODINAMIK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save hemodinamik data");
      }

      return {
        success: true,
        message: "Data berhasil disimpan",
      };
    } catch (error) {
      console.error("Error saving hemodinamik:", error);
      throw error;
    }
  }
}