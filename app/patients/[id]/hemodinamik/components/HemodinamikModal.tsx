// components/HemodinamikModal.tsx

"use client";

import React from "react";
import { Plus, X } from "lucide-react";
import { OPSI_KESADARAN, OPSI_IRAMA_EKG } from "@/lib/hemodinamik.constants";
import type { HemodinamikFormData } from "@/types/hemodinamik.types";

interface HemodinamikModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemTime: string;
  form: HemodinamikFormData;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  onFormChange: (field: keyof HemodinamikFormData, value: string) => void;
  onSubmit: () => void;
}

export const HemodinamikModal: React.FC<HemodinamikModalProps> = ({
  isOpen,
  onClose,
  systemTime,
  form,
  isSubmitting,
  submitError,
  submitSuccess,
  onFormChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <Plus className="h-4 w-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Input Data Hemodinamik
              </h3>
              <p className="text-[11px] text-slate-600">
                Jam: {systemTime} (otomatis)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition hover:bg-slate-100"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[70vh] space-y-4 overflow-y-auto p-5">
          {/* Tensi Pasien */}
          <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/80 p-3">
            <h4 className="text-xs font-semibold text-slate-700">
              1. Tensi Pasien (mmHg)
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Sistol *
                </label>
                <input
                  type="number"
                  min={30}
                  max={250}
                  required
                  value={form.sistol}
                  onChange={(e) => onFormChange("sistol", e.target.value)}
                  placeholder="30 – 250"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Diastol *
                </label>
                <input
                  type="number"
                  min={30}
                  max={250}
                  required
                  value={form.diastol}
                  onChange={(e) => onFormChange("diastol", e.target.value)}
                  placeholder="30 – 250"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* HR, MAP, Temp */}
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-700">
                2. HR (x/menit) *
              </label>
              <input
                type="number"
                min={30}
                max={250}
                required
                value={form.hr}
                onChange={(e) => onFormChange("hr", e.target.value)}
                placeholder="30 – 250"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-700">
                3. MAP (mmHg) *
              </label>
              <input
                type="number"
                min={30}
                max={250}
                required
                value={form.map}
                onChange={(e) => onFormChange("map", e.target.value)}
                placeholder="30 – 250"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-700">
                4. Temp (°C) *
              </label>
              <input
                type="number"
                min={30}
                max={50}
                step="0.1"
                required
                value={form.temp}
                onChange={(e) => onFormChange("temp", e.target.value)}
                placeholder="30 – 50"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Kesadaran, Irama EKG */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-700">
                5. Kesadaran
              </label>
              <select
                value={form.kesadaran}
                onChange={(e) => onFormChange("kesadaran", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">Pilih kesadaran</option>
                {OPSI_KESADARAN.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-700">
                6. Irama EKG
              </label>
              <select
                value={form.iramaEkg}
                onChange={(e) => onFormChange("iramaEkg", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">Pilih irama</option>
                {OPSI_IRAMA_EKG.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skor Nyeri, CVP */}
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-700">
                7. Skor Nyeri
              </label>
              <input
                type="text"
                value={form.skorNyeri}
                onChange={(e) => onFormChange("skorNyeri", e.target.value)}
                placeholder="contoh: 3/10"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-slate-700">
                8. CVP (optional)
              </label>
              <input
                type="text"
                value={form.cvp}
                onChange={(e) => onFormChange("cvp", e.target.value)}
                placeholder="contoh: 10 cmH₂O"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Error & Success Messages */}
          {submitError && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] text-emerald-700">
              ✅ Data berhasil disimpan!
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="rounded-full bg-emerald-700 px-5 py-2 text-xs font-semibold text-emerald-50 shadow-sm transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};