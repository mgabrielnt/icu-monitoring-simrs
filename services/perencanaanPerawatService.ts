// file: services/perencanaanPerawatService.ts
"use client";

import type {
  CreatePerencanaanPerawatImplementationPayload,
  PerencanaanPerawatImplementation,
} from "@/types/perencanaanPerawat";
import { NURSING_ACTIVITIES } from "@/lib/perencanaanPerawatConstants";
import {
  PerencanaanPerawatDTO,
  buildCreatePerencanaanDTO,
  mapPerencanaanArrayDTOToModel,
  mapPerencanaanDTOToModel,
} from "@/handlers/perencanaanPerawatHandlers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const STORAGE_KEY = "icu-monitoring:perencanaan-perawat";

function getStorageKey(patientId: string) {
  return `${STORAGE_KEY}:${patientId}`;
}

function getActivityLabel(activityId: number) {
  return NURSING_ACTIVITIES.find((item) => item.id === activityId)?.label || `Kegiatan ${activityId}`;
}

function makeSeed(patientId: string): PerencanaanPerawatImplementation[] {
  return [
    {
      id: `${patientId}-seed-3`,
      patientId,
      activityId: 2,
      activityLabel: getActivityLabel(2),
      nurseName: "Staff Siang",
      bedNumber: `Bed ${patientId}`,
      shift: "siang",
      time: "14:30",
      notes: "Data dummy shift siang.",
      dpjpVerification: "Verifier A",
      createdAt: "2026-07-05T07:30:00.000Z",
    },
    {
      id: `${patientId}-seed-2`,
      patientId,
      activityId: 20,
      activityLabel: getActivityLabel(20),
      nurseName: "Staff Pagi",
      bedNumber: `Bed ${patientId}`,
      shift: "pagi",
      time: "10:00",
      notes: "Data dummy shift pagi.",
      dpjpVerification: "Verifier A",
      createdAt: "2026-07-05T03:00:00.000Z",
    },
    {
      id: `${patientId}-seed-1`,
      patientId,
      activityId: 12,
      activityLabel: getActivityLabel(12),
      nurseName: "Staff Pagi",
      bedNumber: `Bed ${patientId}`,
      shift: "pagi",
      time: "08:00",
      notes: "Data contoh awal.",
      dpjpVerification: "Verifier A",
      createdAt: "2026-07-05T01:00:00.000Z",
    },
  ];
}

function readLocal(patientId: string): PerencanaanPerawatImplementation[] {
  if (typeof window === "undefined") return makeSeed(patientId);

  try {
    const raw = window.localStorage.getItem(getStorageKey(patientId));
    return raw ? (JSON.parse(raw) as PerencanaanPerawatImplementation[]) : makeSeed(patientId);
  } catch {
    return makeSeed(patientId);
  }
}

function writeLocal(patientId: string, items: PerencanaanPerawatImplementation[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getStorageKey(patientId), JSON.stringify(items));
}

export class PerencanaanPerawatService {
  static async fetchPerencanaanPerawat(
    patientId: string
  ): Promise<PerencanaanPerawatImplementation[]> {
    if (!API_BASE_URL) return readLocal(patientId);

    try {
      const url = `${API_BASE_URL}/patients/${patientId}/perencanaan-perawat`;
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) return readLocal(patientId);

      const json = (await response.json()) as { data?: PerencanaanPerawatDTO[] };
      return mapPerencanaanArrayDTOToModel(json.data ?? []);
    } catch {
      return readLocal(patientId);
    }
  }

  static async createPerencanaanPerawat(
    patientId: string,
    payload: CreatePerencanaanPerawatImplementationPayload
  ): Promise<PerencanaanPerawatImplementation> {
    const dto = buildCreatePerencanaanDTO(payload);

    if (API_BASE_URL) {
      try {
        const url = `${API_BASE_URL}/patients/${patientId}/perencanaan-perawat`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dto),
        });

        if (response.ok) {
          const json = (await response.json()) as { data: PerencanaanPerawatDTO };
          return mapPerencanaanDTOToModel(json.data);
        }
      } catch {}
    }

    const created: PerencanaanPerawatImplementation = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      patientId,
      activityId: payload.activityId,
      activityLabel: getActivityLabel(payload.activityId),
      customActivityLabel: payload.customActivityLabel,
      nurseName: payload.nurseName,
      bedNumber: payload.bedNumber,
      shift: payload.shift,
      time: payload.time,
      notes: payload.notes,
      dpjpVerification: payload.dpjpVerification,
      createdAt: new Date().toISOString(),
    };

    const items = [created, ...readLocal(patientId)];
    writeLocal(patientId, items);
    return created;
  }
}

export function fetchPerencanaanPerawat(
  patientId: string
): Promise<PerencanaanPerawatImplementation[]> {
  return PerencanaanPerawatService.fetchPerencanaanPerawat(patientId);
}

export function createPerencanaanPerawat(
  patientId: string,
  payload: CreatePerencanaanPerawatImplementationPayload
): Promise<PerencanaanPerawatImplementation> {
  return PerencanaanPerawatService.createPerencanaanPerawat(patientId, payload);
}

export default PerencanaanPerawatService;
