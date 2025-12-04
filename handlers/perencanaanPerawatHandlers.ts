// file: handlers/perencanaanPerawatHandlers.ts

import {
  CreatePerencanaanPerawatImplementationPayload,
  PerencanaanPerawatImplementation,
  Shift,
} from "@/types/perencanaanPerawat";

export interface PerencanaanPerawatDTO {
  id: string;
  patientId: string;
  activityId: number;
  activityLabel: string;
  customActivityLabel?: string | null;
  nurseName: string;
  bedNumber: string;
  shift: Shift;
  time: string;
  notes?: string | null;
  dpjpVerification?: string | null;    // ⬅️ baru
  createdAt: string;
}

export type CreatePerencanaanPerawatDTO =
  CreatePerencanaanPerawatImplementationPayload;

export function mapPerencanaanDTOToModel(
  dto: PerencanaanPerawatDTO
): PerencanaanPerawatImplementation {
  return {
    id: dto.id,
    patientId: dto.patientId,
    activityId: dto.activityId,
    activityLabel: dto.activityLabel,
    customActivityLabel: dto.customActivityLabel ?? undefined,
    nurseName: dto.nurseName,
    bedNumber: dto.bedNumber,
    shift: dto.shift,
    time: dto.time,
    notes: dto.notes ?? undefined,
    dpjpVerification: dto.dpjpVerification ?? undefined, // ⬅️ baru
    createdAt: dto.createdAt,
  };
}

export function mapPerencanaanArrayDTOToModel(
  list: PerencanaanPerawatDTO[]
): PerencanaanPerawatImplementation[] {
  return list.map(mapPerencanaanDTOToModel);
}

export function buildCreatePerencanaanDTO(
  payload: CreatePerencanaanPerawatImplementationPayload
): CreatePerencanaanPerawatDTO {
  return payload;
}
