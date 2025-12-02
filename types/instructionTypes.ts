export interface InstruksiObatItem {
  jam: string;
  namaObat: string;
  dosis: string;
  caraPemberian: string;
  tglMulai: string;
  tglStop: string;
  ketPEd: string;
  namaDokter: string;
  implementasi: string;
}

export interface InstruksiObatPayload {
  hariPerawatan: number;
  instruksi: InstruksiObatItem[];
  instruksiLain: string;
  nutrisi: {
    volume: number;
    kalori: number;
    protein: number;
    lipit: number;
  };
  polaVentilasi: string;
}
