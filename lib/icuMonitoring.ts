// src/lib/icuMonitoring.ts

import { getJson, postJson } from "@/lib/api";
import type {
  MonitoringPage2DTO,
  SaveMonitoringPage2Payload,
  SaveMonitoringPage2Response,
  ProgressNoteDTO,
  SaveProgressNotesPayload,
  SaveProgressNotesResponse,
  ImplementasiActivityDTO,
  SaveImplementasiPayload,
  SaveImplementasiResponse,
} from "@/types/monitoring";

/* ===========
 * PAGE 2
 * =========== */

export async function fetchMonitoringPage2(
  noRm: string,
  tanggal: string
): Promise<MonitoringPage2DTO | null> {
  const qs = new URLSearchParams({ noRm, tanggal });
  try {
    return await getJson<MonitoringPage2DTO>(
      `/monitoring/page-2?${qs.toString()}`
    );
  } catch {
    return null;
  }
}

export function saveMonitoringPage2(
  payload: SaveMonitoringPage2Payload
): Promise<SaveMonitoringPage2Response> {
  return postJson<SaveMonitoringPage2Payload, SaveMonitoringPage2Response>(
    "/monitoring/page-2",
    payload
  );
}

/* ===========
 * PAGE 6
 * =========== */

export async function fetchProgressNotes(
  noRm: string,
  tanggal: string
): Promise<ProgressNoteDTO[] | null> {
  const qs = new URLSearchParams({ noRm, tanggal });
  try {
    return await getJson<ProgressNoteDTO[]>(
      `/monitoring/catatan?${qs.toString()}`
    );
  } catch {
    return null;
  }
}

export function saveProgressNotes(
  payload: SaveProgressNotesPayload
): Promise<SaveProgressNotesResponse> {
  return postJson<SaveProgressNotesPayload, SaveProgressNotesResponse>(
    "/monitoring/catatan",
    payload
  );
}

/* ===========
 * PAGE 5
 * =========== */

export async function fetchImplementasi(
  noRm: string,
  tanggal: string
): Promise<ImplementasiActivityDTO[] | null> {
  const qs = new URLSearchParams({ noRm, tanggal });
  try {
    return await getJson<ImplementasiActivityDTO[]>(
      `/monitoring/implementasi?${qs.toString()}`
    );
  } catch {
    return null;
  }
}

export function saveImplementasiList(
  payload: SaveImplementasiPayload
): Promise<SaveImplementasiResponse> {
  return postJson<SaveImplementasiPayload, SaveImplementasiResponse>(
    "/monitoring/implementasi",
    payload
  );
}
