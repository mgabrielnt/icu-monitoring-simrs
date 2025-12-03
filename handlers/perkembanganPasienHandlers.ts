// handlers/perkembanganPasienHandlers.ts
import type {
  CreatePerkembanganPasienPayload,
  PerkembanganPasienNote,
} from "@/types/perkembanganPasien";
import { createPerkembanganPasienNote } from "@/services/perkembanganPasienService";

export async function handleSubmitPerkembanganPasien(
  values: CreatePerkembanganPasienPayload,
): Promise<PerkembanganPasienNote> {
  // Jika perlu validasi ekstra, tulis di sini
  return createPerkembanganPasienNote(values);
}
