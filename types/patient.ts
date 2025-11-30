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
