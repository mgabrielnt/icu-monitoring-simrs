// types/instruksi-obat.types.ts

export interface InstruksiObatItem {
  jam: string;
  namaObat: string;
  dosisObat: string;
  caraPemberian: string;
  tglMulai: string;
  tglStop: string;
  ketPED: string;
  namaDokter: string;
  implementasi: {
    [key: string]: string;
  };
}

export interface InstruksiLainItem {
  instruksi: string;
  implementasi: {
    [key: string]: string;
  };
}

export type NutrisiJenis = 'Volume' | 'Kalori' | 'Protein' | 'Lipid';

export interface NutrisiCaranItem {
  jenis: NutrisiJenis;
  parenteral: string;
  enteral: string;
  jam: string;
}

export interface SavedInstruksiObat {
  id: string;
  hariPerawatan: number;
  instruksiObat: InstruksiObatItem[];
  instruksiLain: InstruksiLainItem[];
  nutrisiCairan: NutrisiCaranItem[];
  polaVentilasi: string;
  verifikasiDPJP: string;
  verifikasiDPJP2: string;
  createdAt: string;
  updatedAt: string;
}

export interface InstruksiObatFormData {
  hariPerawatan: number;
  instruksiObat: InstruksiObatItem[];
  instruksiLain: InstruksiLainItem[];
  nutrisiCairan: NutrisiCaranItem[];
  polaVentilasi: string;
  verifikasiDPJP: string;
  verifikasiDPJP2: string;
}

export interface InstruksiObatModalProps {
  isOpen: boolean;
  onClose: () => void;
  hariPerawatan: number;
  setHariPerawatan: (val: number) => void;
  instruksiObat: InstruksiObatItem[];
  setInstruksiObat: (val: InstruksiObatItem[]) => void;
  instruksiLain: InstruksiLainItem[];
  setInstruksiLain: (val: InstruksiLainItem[]) => void;
  nutrisiCairan: NutrisiCaranItem[];
  setNutrisiCairan: (val: NutrisiCaranItem[]) => void;
  polaVentilasi: string;
  setPolaVentilasi: (val: string) => void;
  verifikasiDPJP: string;
  setVerifikasiDPJP: (val: string) => void;
  verifikasiDPJP2: string;
  setVerifikasiDPJP2: (val: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
}