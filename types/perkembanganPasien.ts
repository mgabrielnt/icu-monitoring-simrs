// types/perkembanganPasien.ts
export type SOAPCategory = "O" | "A" | "P";

export interface PerkembanganPasienNote {
  id: string;
  patientId: string;
  datetime: string; // ISO string
  assessment: string; // Hasil Asessmen Pasien
  instruction: string; // Instruksi PPA termasuk pasca bedah
  nurseName: string; // Paraf / nama perawat
  category: SOAPCategory; // O / A / P
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePerkembanganPasienPayload {
  patientId: string;
  datetime: string;
  assessment: string;
  instruction: string;
  nurseName: string;
  category: SOAPCategory;
}
