// types/patient.ts

export interface Patient {
  id: number;
  noRM: string;
  nama: string;
  tglLahir: string;
  unit: string;
  tglMasuk: string;
  hariKe: number;
  bb: number;
  tb: number;
  penanggungJawab: string;
  dokterDPJP: string;
  perawatPrimer: string;
  perawatJaga?: string;
  diagnosis: string[];
}

export type SearchByType = 'noRM' | 'nama' | 'tglLahir';

export interface AddPatientFormData {
  noRM: string;
  nama: string;
  tglLahir: string;
  unit: string;
  tanggalMasuk: string;
  hariKe: number;
  bb: string;
  tb: string;
  penanggungJawab: string;
  dokterDPJP: string;
  perawatPrimer: string;
  perawatJaga: string;
  diagnosis: string[];
}