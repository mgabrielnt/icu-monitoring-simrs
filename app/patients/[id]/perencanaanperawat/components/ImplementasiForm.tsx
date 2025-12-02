// app/patients/[id]/perencanaanperawat/components/ImplementasiForm.tsx

"use client";

import React from "react";
import { CheckCircle, Clock } from "lucide-react";
import { KEGIATAN_UMUM } from "@/hooks/useImplementasi";

export interface ImplementasiFormData {
  jenisKegiatan: string;
  paraf: string;
  customKegiatan: string;
}

interface ImplementasiFormProps {
  systemTime: string;
  formData: ImplementasiFormData;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  handleFormChange: (
    key: "jenisKegiatan" | "paraf" | "customKegiatan",
    value: string
  ) => void;
  closeForm: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

const ImplementasiForm: React.FC<ImplementasiFormProps> = ({
  systemTime,
  formData,
  isSubmitting,
  submitError,
  submitSuccess,
  handleFormChange,
  closeForm,
  handleSubmit,
}) => {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-emerald-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
            <CheckCircle className="h-4 w-4 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Tambah / Edit Implementasi Kegiatan
            </h3>
            <p className="text-[11px] text-slate-500">
              Jam pelaksanaan diambil otomatis dari jam sistem ketika kegiatan
              disimpan.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-2 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/60 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-medium text-emerald-900">
              Jam Pelaksanaan Otomatis
            </p>
            <p className="text-[11px] text-emerald-700">
              Sistem menyimpan jam saat ini, tidak bisa diubah manual.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-900 px-3 py-1 text-[11px] font-mono font-semibold text-emerald-50 shadow-sm">
            <Clock className="h-3 w-3" />
            {systemTime}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-700">
              Jenis Kegiatan *
            </label>
            <select
              value={formData.jenisKegiatan}
              onChange={(e) => handleFormChange("jenisKegiatan", e.target.value)}
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">Pilih kegiatan</option>
              {KEGIATAN_UMUM.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
              <option value="custom">Kegiatan lain (Custom)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-700">
              Paraf Perawat *
            </label>
            <input
              type="text"
              value={formData.paraf}
              onChange={(e) => handleFormChange("paraf", e.target.value)}
              placeholder="Inisial / nama singkat perawat"
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {formData.jenisKegiatan === "custom" && (
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-700">
              Kegiatan Lain (Custom) *
            </label>
            <input
              type="text"
              value={formData.customKegiatan}
              onChange={(e) => handleFormChange("customKegiatan", e.target.value)}
              placeholder="Contoh: Edukasi keluarga, koordinasi DPJP, dll."
              required
              className="w-full rounded-lg border border-dashed border-emerald-300 bg-emerald-50/40 px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        )}

        <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-50 text-amber-500 ring-1 ring-amber-100">
              <Clock className="h-3 w-3" />
            </div>
            <p>
              Input langsung setelah tindakan dilakukan untuk menjaga{" "}
              <span className="font-semibold">akurasi waktu</span>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {submitError && (
              <p className="text-[11px] text-rose-600">{submitError}</p>
            )}
            {submitSuccess && (
              <p className="text-[11px] text-emerald-700">
                Data implementasi tersimpan. ✅
              </p>
            )}
            <button
              type="button"
              onClick={closeForm}
              className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-emerald-700 px-5 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Kegiatan"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ImplementasiForm;
