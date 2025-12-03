// file: types/perencanaanPerawat.ts

export type Shift = "pagi" | "siang" | "malam";

export interface PerencanaanPerawatActivity {
  id: number;
  label: string;
}

export interface PerencanaanPerawatImplementation {
  id: string;
  patientId: string;
  activityId: number;
  activityLabel: string;
  customActivityLabel?: string;
  nurseName: string;
  bedNumber: string;
  shift: Shift;
  time: string; // "HH:mm"
  notes?: string;
  /** Nama / TT DPJP yang memverifikasi baris ini (opsional) */
  dpjpVerification?: string;
  createdAt: string; // ISO
}

export interface CreatePerencanaanPerawatImplementationPayload {
  activityId: number;
  customActivityLabel?: string;
  nurseName: string;
  bedNumber: string;
  shift: Shift;
  time: string; // "HH:mm"
  notes?: string;
  /** Nama / TT DPJP (opsional) */
  dpjpVerification?: string;
}
