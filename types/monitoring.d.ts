// src/types/monitoring.ts

export interface MonitoringMeta {
  noRm: string | null;
  tanggal: string | null; // yyyy-MM-dd
  hariPerawatanKe: number | null;
}

/* ======================
 * PAGE 2 – ALAT INVASIF
 * ====================== */

export interface AlatInvasifItemDTO {
  id?: string;
  kodeJenisAlat: string | null;
  namaJenisAlat: string | null;
  ukuran: string | null;
  lokasi: string | null;
  tglPasang: string | null; // yyyy-MM-dd
  hariKe: number | null;
}

export interface RisikoJatuhDTO {
  riwayatJatuh: number | null;
  kondisiKesehatan: number | null;
  bantuanAmbulansi: number | null;
  terapiIVAntikoagulan: number | null;
  gayaBerjalan: number | null;
  statusMental: number | null;
  totalSkor: number | null;
}

export interface BalanceCairanDTO {
  cairanMasuk: number | null;
  cairanKeluar: number | null;
  iwl: number | null;
  bc24Jam: number | null;
  bcSebelumnya: number | null;
  bcKumulatif: number | null;
}

export interface MonitoringPage2DTO {
  meta: MonitoringMeta;
  alatInvasif: AlatInvasifItemDTO[];
  risikoJatuh: RisikoJatuhDTO | null;
  balanceCairan: BalanceCairanDTO | null;
}

export interface SaveMonitoringPage2Payload {
  meta: MonitoringMeta;
  alatInvasif: AlatInvasifItemDTO[];
  deletedAlatIds: string[];
  risikoJatuh: RisikoJatuhDTO | null;
  balanceCairan: BalanceCairanDTO | null;
}

export interface SaveMonitoringPage2Response {
  ok?: boolean;
  message?: string;
  data?: MonitoringPage2DTO;
}

/* ==========================
 * PAGE 6 – CATATAN PROGRES
 * ========================== */

export type ProgressNoteJenis = "O" | "A" | "P";

export interface ProgressNoteDTO {
  id?: string;
  tglJam: string; // "yyyy-MM-ddTHH:mm"
  jenis: ProgressNoteJenis;
  hasilAssesmen: string;
  instruksiPPA: string;
  namaPerawat: string;
}

export interface SaveProgressNotesPayload {
  meta: MonitoringMeta;
  notes: ProgressNoteDTO[];
  deletedNoteIds: string[];
}

export interface SaveProgressNotesResponse {
  ok?: boolean;
  message?: string;
  notes?: ProgressNoteDTO[];
}

/* ===========================
 * PAGE 5 – IMPLEMENTASI NURSE
 * =========================== */

export interface ImplementasiActivityDTO {
  id?: string;
  jenisKegiatan: string;
  jam: string; // "HH:mm"
  paraf: string;
}

export interface SaveImplementasiPayload {
  meta: MonitoringMeta;
  activities: ImplementasiActivityDTO[];
  deletedActivityIds: string[];
}

export interface SaveImplementasiResponse {
  ok?: boolean;
  message?: string;
  activities?: ImplementasiActivityDTO[];
}

/* ===========
 * STATE TYPES
 * =========== */

export interface AlatInvasifState extends AlatInvasifItemDTO {
  _localId: string;
}

export interface ProgressNoteState extends ProgressNoteDTO {
  _localId: string;
}

export interface ImplementasiActivityState
  extends ImplementasiActivityDTO {
  _localId: string;
}
