import { apiClient } from "@/lib/api-client";
import type {
  CreatePerkembanganPasienPayload,
  PerkembanganPasienNote,
} from "@/types/perkembanganPasien";

export async function fetchPerkembanganPasienNotes(
  patientId: string,
): Promise<PerkembanganPasienNote[]> {
  return apiClient.get<PerkembanganPasienNote[]>(
    `/api/patients/${patientId}/perkembangan-pasien`,
  );
}

export async function createPerkembanganPasienNote(
  payload: CreatePerkembanganPasienPayload,
): Promise<PerkembanganPasienNote> {
  return apiClient.post<PerkembanganPasienNote>(
    `/api/patients/${payload.patientId}/perkembangan-pasien`,
    payload,
  );
}
