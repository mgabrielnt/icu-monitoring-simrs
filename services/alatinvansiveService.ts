// file: services/alatinvansiveService.ts
"use client";

import type {
  InvansifTubeEntry,
  InvansifTubeFormData,
  ResikoJatuhEntry,
  ResikoJatuhFormData,
  BalanceCairEntry,
  BalanceCairFormData,
} from "@/types/alatinvansive";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class AlatInvansiveService {
  static async fetchInvansifTube(patientId: string): Promise<InvansifTubeEntry[]> {
    const res = await fetch(`${API_BASE_URL}/api/patients/${patientId}/alatinvansive/invansif-tube`);
    if (!res.ok) throw new Error("Failed to fetch invansif tube");
    return res.json();
  }

  static async createInvansifTube(
    patientId: string,
    payload: InvansifTubeFormData
  ): Promise<InvansifTubeEntry> {
    const res = await fetch(`${API_BASE_URL}/api/patients/${patientId}/alatinvansive/invansif-tube`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create invansif tube");
    return res.json();
  }

  static async updateInvansifTube(
    patientId: string,
    entryId: string,
    payload: InvansifTubeFormData
  ): Promise<InvansifTubeEntry> {
    const res = await fetch(
      `${API_BASE_URL}/api/patients/${patientId}/alatinvansive/invansif-tube/${entryId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) throw new Error("Failed to update invansif tube");
    return res.json();
  }

  static async deleteInvansifTube(patientId: string, entryId: string): Promise<void> {
    const res = await fetch(
      `${API_BASE_URL}/api/patients/${patientId}/alatinvansive/invansif-tube/${entryId}`,
      { method: "DELETE" }
    );
    if (!res.ok) throw new Error("Failed to delete invansif tube");
  }

  static async fetchResikoJatuh(patientId: string): Promise<ResikoJatuhEntry[]> {
    const res = await fetch(`${API_BASE_URL}/api/patients/${patientId}/alatinvansive/resiko-jatuh`);
    if (!res.ok) throw new Error("Failed to fetch resiko jatuh");
    return res.json();
  }

  static async createResikoJatuh(
    patientId: string,
    payload: ResikoJatuhFormData
  ): Promise<ResikoJatuhEntry> {
    const res = await fetch(`${API_BASE_URL}/api/patients/${patientId}/alatinvansive/resiko-jatuh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create resiko jatuh");
    return res.json();
  }

  static async updateResikoJatuh(
    patientId: string,
    entryId: string,
    payload: ResikoJatuhFormData
  ): Promise<ResikoJatuhEntry> {
    const res = await fetch(
      `${API_BASE_URL}/api/patients/${patientId}/alatinvansive/resiko-jatuh/${entryId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) throw new Error("Failed to update resiko jatuh");
    return res.json();
  }

  static async deleteResikoJatuh(patientId: string, entryId: string): Promise<void> {
    const res = await fetch(
      `${API_BASE_URL}/api/patients/${patientId}/alatinvansive/resiko-jatuh/${entryId}`,
      { method: "DELETE" }
    );
    if (!res.ok) throw new Error("Failed to delete resiko jatuh");
  }

  static async fetchBalanceCair(patientId: string): Promise<BalanceCairEntry[]> {
    const res = await fetch(`${API_BASE_URL}/api/patients/${patientId}/alatinvansive/balance-cair`);
    if (!res.ok) throw new Error("Failed to fetch balance cair");
    return res.json();
  }

  static async createBalanceCair(
    patientId: string,
    payload: BalanceCairFormData
  ): Promise<BalanceCairEntry> {
    const res = await fetch(`${API_BASE_URL}/api/patients/${patientId}/alatinvansive/balance-cair`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create balance cair");
    return res.json();
  }

  static async updateBalanceCair(
    patientId: string,
    entryId: string,
    payload: BalanceCairFormData
  ): Promise<BalanceCairEntry> {
    const res = await fetch(
      `${API_BASE_URL}/api/patients/${patientId}/alatinvansive/balance-cair/${entryId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!res.ok) throw new Error("Failed to update balance cair");
    return res.json();
  }

  static async deleteBalanceCair(patientId: string, entryId: string): Promise<void> {
    const res = await fetch(
      `${API_BASE_URL}/api/patients/${patientId}/alatinvansive/balance-cair/${entryId}`,
      { method: "DELETE" }
    );
    if (!res.ok) throw new Error("Failed to delete balance cair");
  }
}

export default AlatInvansiveService;
