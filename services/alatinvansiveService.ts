// D:\projek-medis\icu-monitoring-simrs\services\alatinvansiveService.ts

import { apiClient } from "@/lib/core";
import type {
  InvansifTubeEntry,
  InvansifTubeFormData,
  ResikoJatuhEntry,
  ResikoJatuhFormData,
  BalanceCairEntry,
  BalanceCairFormData,
} from "@/types/alatinvansive";

const BASE = "/api/patients";

const invansifPath = (patientId: string) =>
  `${BASE}/${encodeURIComponent(patientId)}/alatinvansive/invansif-tube`;

const resikoPath = (patientId: string) =>
  `${BASE}/${encodeURIComponent(patientId)}/alatinvansive/resiko-jatuh`;

const balancePath = (patientId: string) =>
  `${BASE}/${encodeURIComponent(patientId)}/alatinvansive/balance-cair`;

// ============ INVANSIF / TUBE ============

export async function fetchInvansifTube(
  patientId: string
): Promise<InvansifTubeEntry[]> {
  return apiClient<InvansifTubeEntry[]>(invansifPath(patientId));
}

export async function createInvansifTube(
  patientId: string,
  payload: InvansifTubeFormData
): Promise<InvansifTubeEntry> {
  return apiClient<InvansifTubeEntry>(invansifPath(patientId), {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateInvansifTube(
  patientId: string,
  entryId: string,
  payload: InvansifTubeFormData
): Promise<InvansifTubeEntry> {
  return apiClient<InvansifTubeEntry>(
    `${invansifPath(patientId)}/${encodeURIComponent(entryId)}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}

// ============ RESIKO JATUH ============

export async function fetchResikoJatuh(
  patientId: string
): Promise<ResikoJatuhEntry[]> {
  return apiClient<ResikoJatuhEntry[]>(resikoPath(patientId));
}

export async function createResikoJatuh(
  patientId: string,
  payload: ResikoJatuhFormData
): Promise<ResikoJatuhEntry> {
  return apiClient<ResikoJatuhEntry>(resikoPath(patientId), {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateResikoJatuh(
  patientId: string,
  entryId: string,
  payload: ResikoJatuhFormData
): Promise<ResikoJatuhEntry> {
  return apiClient<ResikoJatuhEntry>(
    `${resikoPath(patientId)}/${encodeURIComponent(entryId)}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}

// ============ BALANCE CAIR ============

export async function fetchBalanceCair(
  patientId: string
): Promise<BalanceCairEntry[]> {
  return apiClient<BalanceCairEntry[]>(balancePath(patientId));
}

export async function createBalanceCair(
  patientId: string,
  payload: BalanceCairFormData
): Promise<BalanceCairEntry> {
  return apiClient<BalanceCairEntry>(balancePath(patientId), {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateBalanceCair(
  patientId: string,
  entryId: string,
  payload: BalanceCairFormData
): Promise<BalanceCairEntry> {
  return apiClient<BalanceCairEntry>(
    `${balancePath(patientId)}/${encodeURIComponent(entryId)}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
}
