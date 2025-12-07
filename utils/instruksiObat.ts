// lib/utils/instruksi-obat.utils.ts

import { InstruksiObatItem, InstruksiLainItem, NutrisiCaranItem } from "@/types/instructionTypes";
import { JAM_IMPLEMENTASI, NUTRISI_JENIS } from "@/lib/constants/instruksiObatConstants";

// =========================
// Generate Implementasi Kosong
// =========================
export const generateEmptyImplementasi = (): { [key: string]: string } => {
  const implementasi: { [key: string]: string } = {};
  JAM_IMPLEMENTASI.forEach(jam => {
    implementasi[jam] = "";
  });
  return implementasi;
};

// =========================
// Baris Baru Instruksi Obat
// =========================
export const generateEmptyObatRow = (): InstruksiObatItem => {
  return {
    jam: "",
    namaObat: "",
    dosisObat: "",
    caraPemberian: "",
    tglMulai: "",
    tglStop: "",
    ketPED: "",        // PASTIKAN huruf besar KONSISTEN
    namaDokter: "",
    implementasi: generateEmptyImplementasi()
  };
};

// =========================
// Baris Baru Instruksi Lain
// =========================
export const generateEmptyInstruksiLainRow = (): InstruksiLainItem => {
  return {
    instruksi: "",
    implementasi: generateEmptyImplementasi()
  };
};

// =========================
// Default Nutrisi/Cairan
// =========================
export const generateDefaultNutrisiCairan = (): NutrisiCaranItem[] => {
  return NUTRISI_JENIS.map(jenis => ({
    jenis,
    parenteral: "",
    enteral: "",
    jam: ""
  }));
};

// =========================
// Format DateTime
// =========================
export const formatDateTime = (dateString: string): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

// =========================
// Validator Form
// =========================
export const validateInstruksiObatForm = (
  hariPerawatan: number,
  instruksiObat: InstruksiObatItem[]
): { isValid: boolean; message?: string } => {

  if (hariPerawatan <= 0) {
    return {
      isValid: false,
      message: "Hari perawatan harus lebih dari 0"
    };
  }

  const hasFilledObat = instruksiObat.some(item => item.namaObat.trim() !== "");
  if (!hasFilledObat) {
    return {
      isValid: false,
      message: "Minimal harus ada 1 obat yang diisi"
    };
  }

  return { isValid: true };
};
