// utils/perkembanganPasienMeta.ts
import type { SOAPCategory } from "@/types/perkembanganPasien";

export const SOAP_META: Record<
  SOAPCategory,
  { label: string; short: string; desc: string }
> = {
  O: {
    label: "O - Objective",
    short: "O (Objective)",
    desc: "Data hasil pengukuran / observasi: TD, nadi, RR, suhu, hasil lab, dll.",
  },
  A: {
    label: "A - Assessmen",
    short: "A (Assessmen)",
    desc: "Analisis / interpretasi perawat berdasarkan data objektif dan keluhan pasien.",
  },
  P: {
    label: "P - Plan",
    short: "P (Plan)",
    desc: "Rencana tindak lanjut / intervensi keperawatan, edukasi, dan evaluasi.",
  },
};
