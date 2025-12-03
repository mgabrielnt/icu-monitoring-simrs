// types/monitoring.d.ts

/* ============
 * META UMUM
 * ============ */

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
 * (dipakai untuk state React, dsb.)
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

export type ImplementasiField = "jenisKegiatan" | "jam" | "paraf";


/* ===========================
 * UI TYPES – PAGE 2 (ALAT INVASIF)
 * dipakai di komponen:
 * - AlatInvasifForm
 * - DeviceGroupSection
 * - useAlatInvasif hook
 * =========================== */

export type DeviceGroup = "INVASIF" | "TUBE";

export type DeviceCode =
  | "IV_LINE"
  | "CVC"
  | "ARTERIAL_LINE"
  | "SWANZ_GANZ"
  | "OTT_NTT_TT"
  | "NGT"
  | "WSD"
  | "DRAIN"
  | "URINE_CATHETER"
  | "LUNAK";

export type DeviceField = "ukuran" | "lokasi" | "tglPasang";

export interface DeviceRowUI {
  code: DeviceCode;
  label: string;
  group: DeviceGroup;
  ukuran: string;
  lokasi: string;
  tglPasang: string;
}

/**
 * Form risiko jatuh di UI (string untuk input text/number),
 * nanti di-mapping ke RisikoJatuhDTO (number | null) sebelum kirim ke backend.
 */
export interface FallRiskForm {
  riwayatJatuh: string;
  kondisiKesehatan: string;
  bantuanAmbulansi: string;
  terapiIVAntikoagulan: string;
  gayaBerjalan: string;
  statusMental: string;
  totalSkor: string;
}

/**
 * Form balance cairan 24 jam di UI (string dulu),
 * nanti dikonversi ke number | null.
 */
export interface FluidBalanceForm {
  cairanMasuk: string;
  cairanKeluar: string;
  iwl: string;
  bc24Jam: string;
  bcSebelumnya: string;
  bcKumulatif: string;
}
