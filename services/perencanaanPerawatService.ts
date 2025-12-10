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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export class PerencanaanPerawatService {
  static async fetchPerencanaanPerawat(
    patientId: string
  ): Promise<PerencanaanPerawatImplementation[]> {
    const url = `${API_BASE_URL}/patients/${patientId}/perencanaan-perawat`;
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Gagal mengambil data perencanaan perawat");
    }

    const json = (await response.json()) as {
      data: PerencanaanPerawatDTO[];
    };

    return mapPerencanaanArrayDTOToModel(json.data);
  }

  static async createPerencanaanPerawat(
    patientId: string,
    payload: CreatePerencanaanPerawatImplementationPayload
  ): Promise<PerencanaanPerawatImplementation> {
    const url = `${API_BASE_URL}/patients/${patientId}/perencanaan-perawat`;
    const dto = buildCreatePerencanaanDTO(payload);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Gagal membuat perencanaan perawat");
    }

    const json = (await response.json()) as {
      data: PerencanaanPerawatDTO;
    };

    return mapPerencanaanDTOToModel(json.data);
  }
}

export default PerencanaanPerawatService;
