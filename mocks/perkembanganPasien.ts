// mocks/perkembanganPasien.ts
import type { PerkembanganPasienNote } from "@/types/perkembanganPasien";

export const mockPerkembanganPasienNotes: PerkembanganPasienNote[] = [
  {
    id: "1",
    patientId: "DEMO",
    datetime: new Date().toISOString(),
    category: "O",
    assessment:
      "TD 130/80 mmHg, Nadi 88x/menit, RR 20x/menit. Pasien tampak nyaman, tidak sesak.",
    instruction: "Monitor tanda vital tiap 4 jam, edukasi pasien dan keluarga.",
    nurseName: "Ns. Demo, S.Kep",
    createdAt: new Date().toISOString(),
  },
];
