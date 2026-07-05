// file: services/perkembanganPasienService.ts
"use client";

import type {
  CreatePerkembanganPasienPayload,
  PerkembanganPasienNote,
} from "@/types/perkembanganPasien";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class PerkembanganPasienService {
  static async fetchNotes(patientId: string): Promise<PerkembanganPasienNote[]> {
    const url = `${API_BASE_URL}/api/patients/${patientId}/perkembangan-pasien`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error("Failed to fetch perkembangan pasien");
    }

    return response.json();
  }

  static async createNote(
    payload: CreatePerkembanganPasienPayload
  ): Promise<PerkembanganPasienNote> {
    const url = `${API_BASE_URL}/api/patients/${payload.patientId}/perkembangan-pasien`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to create perkembangan pasien note");
    }

    return response.json();
  }
}

export function fetchPerkembanganPasienNotes(
  patientId: string
): Promise<PerkembanganPasienNote[]> {
  return PerkembanganPasienService.fetchNotes(patientId);
}

export function createPerkembanganPasienNote(
  payload: CreatePerkembanganPasienPayload
): Promise<PerkembanganPasienNote> {
  return PerkembanganPasienService.createNote(payload);
}

export default PerkembanganPasienService;
