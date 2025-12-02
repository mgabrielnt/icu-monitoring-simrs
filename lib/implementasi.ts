// src/lib/implementasi.ts

import { postJson } from "@/lib/api";

export interface SaveImplementasiPayload {
  meta: {
    noRm: string | null;
    tanggal: string | null;
    hariPerawatanKe: number | null;
  };
  activity: {
    jenisKegiatan: string;
    jam: string;
    paraf: string;
  };
}

export interface SaveImplementasiResponse {
  ok?: boolean;
  message?: string;
}

export const saveImplementasiActivity = (
  payload: SaveImplementasiPayload
) => {
  return postJson<SaveImplementasiPayload, SaveImplementasiResponse>(
    "/api/monitoring/implementasi",
    payload
  );
};
