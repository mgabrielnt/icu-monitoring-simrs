// app/patients/[id]/perkembanganpasien/components/PerkembanganPasienForm.tsx
"use client";

import type {
  CreatePerkembanganPasienPayload,
  SOAPCategory,
} from "@/types/perkembanganPasien";
import { SOAP_META } from "@/utils/perkembanganPasienMeta";
import type { FormEvent } from "react";

interface PerkembanganPasienFormProps {
  values: CreatePerkembanganPasienPayload;
  submitting: boolean;
  submitError: string | null;
  onChange: (
    field: keyof CreatePerkembanganPasienPayload,
    value: string | SOAPCategory,
  ) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function PerkembanganPasienForm({
  values,
  submitting,
  submitError,
  onChange,
  onSubmit,
}: PerkembanganPasienFormProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header form */}
      <div className="border-b border-slate-100 px-6 py-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Form Perkembangan Pasien
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Input cepat & ringkas untuk catatan harian pasien.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 px-6 pb-4 pt-4 text-xs text-slate-900"
      >
        {/* Baris 1: Tanggal/Jam + Kategori */}
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
          {/* Tanggal / Jam */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-700">
              Tanggal / Jam
            </label>
            <input
              type="datetime-local"
              value={values.datetime}
              onChange={(e) => onChange("datetime", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none ring-emerald-500/40 focus:bg-white focus:ring-2"
              required
            />
          </div>

          {/* Kategori dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-700">
              Kategori Catatan (O / A / P)
            </label>
            <div className="relative">
              <select
                value={values.category}
                onChange={(e) =>
                  onChange("category", e.target.value as SOAPCategory)
                }
                className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 pr-8 text-xs text-slate-900 outline-none ring-emerald-500/40 focus:bg-white focus:ring-2"
              >
                <option value="O">{SOAP_META.O.label}</option>
                <option value="A">{SOAP_META.A.label}</option>
                <option value="P">{SOAP_META.P.label}</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[10px] text-slate-500">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Baris 2: Hasil Asessmen Pasien */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-700">
            Hasil Asessmen Pasien
          </label>
          <textarea
            rows={4}
            value={values.assessment}
            onChange={(e) => onChange("assessment", e.target.value)}
            className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none ring-emerald-500/40 focus:bg-white focus:ring-2"
            placeholder="Contoh: TD 130/80 mmHg, Nadi 88x/menit, RR 20x/menit. Pasien tampak tenang, keluhan nyeri skala 3/10..."
            required
          />
        </div>

        {/* Baris 3: Instruksi PPA */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-slate-700">
            Instruksi PPA Termasuk Pasca Bedah
          </label>
          <textarea
            rows={4}
            value={values.instruction}
            onChange={(e) => onChange("instruction", e.target.value)}
            className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none ring-emerald-500/40 focus:bg-white focus:ring-2"
            placeholder="Contoh: Monitor tanda vital tiap 4 jam, kolaborasi pemberian analgetik, edukasi keluarga terkait posisi nyaman dan latihan napas dalam..."
            required
          />
        </div>

        {/* Baris 4: Paraf Perawat + info kecil di kanan */}
        <div className="grid gap-3 md:grid-cols-[1.3fr_minmax(0,1fr)] md:items-end">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-700">
              Paraf / Nama Perawat
            </label>
            <input
              type="text"
              value={values.nurseName}
              onChange={(e) => onChange("nurseName", e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none ring-emerald-500/40 focus:bg-white focus:ring-2"
              placeholder="Contoh: Ns. Budi, S.Kep"
              required
            />
          </div>

          <div className="hidden justify-end md:flex">
            <div className="inline-flex items-center rounded-full border border-dashed border-slate-300 bg-slate-50 px-3 py-1 text-[10px] text-slate-500">
              Catatan tersimpan & muncul di tabel riwayat di bawah.
            </div>
          </div>
        </div>

        {/* Error & tombol submit */}
        {submitError && (
          <div className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
            {submitError}
          </div>
        )}

        <div className="mt-1 flex items-center justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-emerald-600 px-4 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Menyimpan…" : "Simpan Catatan"}
          </button>
        </div>
      </form>
    </div>
  );
}
