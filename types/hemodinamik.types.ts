// types/hemodinamik.types.ts

export interface HemodinamikEntry {
  id: string;
  jam: string;
  sistol: number;
  diastol: number;
  hr: number;
  map: number;
  temp: number;
  kesadaran: string;
  iramaEkg: string;
  skorNyeri: string;
  cvp?: string;
}

export interface HemodinamikFormData {
  sistol: string;
  diastol: string;
  hr: string;
  map: string;
  temp: string;
  kesadaran: string;
  iramaEkg: string;
  skorNyeri: string;
  cvp: string;
}

export interface HemodinamikMetadata {
  noRm: string | null;
  tanggal: string | null;
  hariPerawatanKe: number | null;
}

export interface HemodinamikPayload {
  meta: HemodinamikMetadata;
  measurement: HemodinamikEntry;
}

export interface HemodinamikChartData {
  jam: string;
  Sistol: number;
  Diastol: number;
  HR: number;
  MAP: number;
  Temp: number;
}

export interface HemodinamikProps {
  noRm?: string;
  tanggal?: string;
  hariPerawatanKe?: number;
  onSaved?: () => void;
}