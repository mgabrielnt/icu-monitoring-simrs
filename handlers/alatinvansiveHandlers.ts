// D:\projek-medis\icu-monitoring-simrs\handlers\alatinvansiveHandlers.ts

import type {
  InvansifTubeFormData,
  InvansifTubeEntry,
  ResikoJatuhFormData,
  ResikoJatuhEntry,
  BalanceCairFormData,
  BalanceCairEntry,
} from "@/types/alatinvansive";
import {
  fetchInvansifTube,
  createInvansifTube,
  updateInvansifTube,
  fetchResikoJatuh,
  createResikoJatuh,
  updateResikoJatuh,
  fetchBalanceCair,
  createBalanceCair,
  updateBalanceCair,
} from "@/services/alatinvansiveService";

// ====== helper validasi ======

export function hasAnyInvansifValue(form: InvansifTubeFormData): boolean {
  const groups = [form.invansif, form.tube];

  return groups.some((group) =>
    Object.values(group || {}).some((triplet) => {
      if (!triplet) return false;
      return Boolean(triplet.ukuran || triplet.lokasi || triplet.tanggal);
    })
  );
}

export function hasAnyBalanceValue(data: BalanceCairFormData): boolean {
  return Boolean(
    data.masuk ??
      data.keluar ??
      data.iwl ??
      data.bc24Jam ??
      data.bcSebelumnya ??
      data.bcKumulatif
  );
}

export function hasAnyResikoScore(form: ResikoJatuhFormData): boolean {
  const vals = [
    form.riwayatJatuh,
    form.kondisiKesehatan,
    form.bantuanAmbulansi,
    form.terapiIvAntikoagulan,
    form.gayaBerjalanBerpindah,
    form.statusMental,
  ];
  return vals.some((v) => typeof v === "number");
}

// ====== LOAD ======

export async function loadInvansifHandler(
  patientId: string
): Promise<InvansifTubeEntry[]> {
  return fetchInvansifTube(patientId);
}

export async function loadResikoHandler(
  patientId: string
): Promise<ResikoJatuhEntry[]> {
  return fetchResikoJatuh(patientId);
}

export async function loadBalanceHandler(
  patientId: string
): Promise<BalanceCairEntry[]> {
  return fetchBalanceCair(patientId);
}

// ====== CREATE ======

export async function submitInvansifHandler(
  patientId: string,
  form: InvansifTubeFormData
): Promise<InvansifTubeEntry> {
  if (!hasAnyInvansifValue(form)) {
    throw new Error("Isi minimal satu baris invasif / tube.");
  }
  return createInvansifTube(patientId, form);
}

export async function submitResikoHandler(
  patientId: string,
  form: ResikoJatuhFormData
): Promise<ResikoJatuhEntry> {
  if (!hasAnyResikoScore(form)) {
    throw new Error("Isi minimal satu parameter skor resiko jatuh.");
  }
  if (form.totalSkorPr == null) {
    throw new Error("Total skor PR belum terisi.");
  }
  return createResikoJatuh(patientId, form);
}

export async function submitBalanceHandler(
  patientId: string,
  form: BalanceCairFormData
): Promise<BalanceCairEntry> {
  if (!hasAnyBalanceValue(form)) {
    throw new Error("Isi minimal satu kolom balance cairan.");
  }
  return createBalanceCair(patientId, form);
}

// ====== UPDATE ======

export async function updateInvansifHandler(
  patientId: string,
  entryId: string,
  form: InvansifTubeFormData
): Promise<InvansifTubeEntry> {
  if (!hasAnyInvansifValue(form)) {
    throw new Error("Isi minimal satu baris invasif / tube.");
  }
  return updateInvansifTube(patientId, entryId, form);
}

export async function updateResikoHandler(
  patientId: string,
  entryId: string,
  form: ResikoJatuhFormData
): Promise<ResikoJatuhEntry> {
  if (!hasAnyResikoScore(form)) {
    throw new Error("Isi minimal satu parameter skor resiko jatuh.");
  }
  if (form.totalSkorPr == null) {
    throw new Error("Total skor PR belum terisi.");
  }
  return updateResikoJatuh(patientId, entryId, form);
}

export async function updateBalanceHandler(
  patientId: string,
  entryId: string,
  form: BalanceCairFormData
): Promise<BalanceCairEntry> {
  if (!hasAnyBalanceValue(form)) {
    throw new Error("Isi minimal satu kolom balance cairan.");
  }
  return updateBalanceCair(patientId, entryId, form);
}
