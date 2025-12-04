// file: services/perencanaanPerawatService.ts
"use client";

import {
  CreatePerencanaanPerawatImplementationPayload,
  PerencanaanPerawatImplementation,
} from "@/types/perencanaanPerawat";
import {
  PerencanaanPerawatDTO,
  buildCreatePerencanaanDTO,
  mapPerencanaanArrayDTOToModel,
  mapPerencanaanDTOToModel,
} from "@/handlers/perencanaanPerawatHandlers";

// BASE URL BACKEND
// Contoh di .env.local:
// NEXT_PUBLIC_API_BASE_URL="http://localhost:8080/api"
const RAW_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";

// hapus trailing slash biar aman
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = "Terjadi kesalahan pada server.";
    try {
      const text = await res.text();
      if (text) message = text;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

/**
 * GET /patients/:id/perencanaan-perawat
 */
export async function fetchPerencanaanPerawat(
  patientId: string
): Promise<PerencanaanPerawatImplementation[]> {
  const url = `${API_BASE_URL}/patients/${patientId}/perencanaan-perawat`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      // kalau backend mau cache, bisa disesuaikan
    });

    const json = await handleResponse<{ data: PerencanaanPerawatDTO[] }>(res);
    return mapPerencanaanArrayDTOToModel(json.data);
  } catch (error) {
    console.error("Gagal fetch perencanaan perawat:", error);
    // hook akan menangkap error ini dan menampilkan pesan di UI
    throw error;
  }
}

/**
 * POST /patients/:id/perencanaan-perawat
 */
export async function createPerencanaanPerawat(
  patientId: string,
  payload: CreatePerencanaanPerawatImplementationPayload
): Promise<PerencanaanPerawatImplementation> {
  const url = `${API_BASE_URL}/patients/${patientId}/perencanaan-perawat`;
  const dto = buildCreatePerencanaanDTO(payload);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  const json = await handleResponse<{ data: PerencanaanPerawatDTO }>(res);
  return mapPerencanaanDTOToModel(json.data);
}
