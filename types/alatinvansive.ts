// D:\projek-medis\icu-monitoring-simrs\types\alatinvansive.ts

// ========= Invasif / Tube =========
export interface DeviceTriplet {
  ukuran?: string;
  lokasi?: string;
  tanggal?: string;
}

export type InvansifKey = "ivLine" | "cvc" | "arterialLine" | "swansGanz";

export type TubeKey =
  | "ottNttTt"
  | "ngt"
  | "wsd"
  | "drain"
  | "urineKateter"
  | "lunak";

export interface InvansifGroup {
  ivLine?: DeviceTriplet;
  cvc?: DeviceTriplet;
  arterialLine?: DeviceTriplet;
  swansGanz?: DeviceTriplet;
  [key: string]: DeviceTriplet | undefined;
}

export interface TubeGroup {
  ottNttTt?: DeviceTriplet;
  ngt?: DeviceTriplet;
  wsd?: DeviceTriplet;
  drain?: DeviceTriplet;
  urineKateter?: DeviceTriplet;
  lunak?: DeviceTriplet;
  [key: string]: DeviceTriplet | undefined;
}

export interface InvansifTubeFormData {
  invansif: InvansifGroup;
  tube: TubeGroup;
}

export interface InvansifTubeEntry extends InvansifTubeFormData {
  id: string;
  createdAt: string;
}

// ========= Resiko Jatuh =========
export type ResikoFieldKey =
  | "riwayatJatuh"
  | "kondisiKesehatan"
  | "bantuanAmbulansi"
  | "terapiIvAntikoagulan"
  | "gayaBerjalanBerpindah"
  | "statusMental";

export interface ResikoJatuhFormData {
  riwayatJatuh?: number | null;
  kondisiKesehatan?: number | null;
  bantuanAmbulansi?: number | null;
  terapiIvAntikoagulan?: number | null;
  gayaBerjalanBerpindah?: number | null;
  statusMental?: number | null;
  totalSkorPr: number | null;
}

export interface ResikoJatuhEntry extends ResikoJatuhFormData {
  id: string;
  createdAt: string;
}

// ========= Balance Cair =========
export interface BalanceCairFormData {
  masuk?: number | null;
  keluar?: number | null;
  iwl?: number | null;
  bc24Jam?: number | null;
  bcSebelumnya?: number | null;
  bcKumulatif?: number | null;
}

export interface BalanceCairEntry extends BalanceCairFormData {
  id: string;
  createdAt: string;
}
export interface InvasiveDeviceEntry {
  hariKe?: number | null;
  totalSkorPr?: number | null;
}

// ========= Snapshot untuk header =========
export interface AlatInvansiveSnapshot {
  invansifCount: number;
  latestResiko: number | null;
  latestBalance: {
    bc24Jam?: number | null;
    bcKumulatif?: number | null;
  } | null;
}
