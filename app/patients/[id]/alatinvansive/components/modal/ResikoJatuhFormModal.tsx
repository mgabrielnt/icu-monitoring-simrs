// D:\projek-medis\icu-monitoring-simrs\app\patients\[id]\alatinvansive\components\ResikoJatuhFormModal.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  ResikoFieldKey,
  ResikoJatuhFormData,
} from "@/types/alatinvansive";

const FIELD_META: { key: ResikoFieldKey; label: string }[] = [
  { key: "riwayatJatuh", label: "1. Riwayat jatuh" },
  { key: "kondisiKesehatan", label: "2. Kondisi kesehatan" },
  { key: "bantuanAmbulansi", label: "3. Bantuan ambulansi" },
  { key: "terapiIvAntikoagulan", label: "4. Terapi IV / Antikoagulan" },
  { key: "gayaBerjalanBerpindah", label: "5. Gaya berjalan / berpindah" },
  { key: "statusMental", label: "6. Status mental" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ResikoJatuhFormData) => Promise<string | null>;
  isSubmitting: boolean;
}

export default function ResikoJatuhFormModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
}: Props) {
  const [scores, setScores] = useState<Record<ResikoFieldKey, string>>({
    riwayatJatuh: "",
    kondisiKesehatan: "",
    bantuanAmbulansi: "",
    terapiIvAntikoagulan: "",
    gayaBerjalanBerpindah: "",
    statusMental: "",
  });

  const [serverError, setServerError] = useState<string | null>(null);

  // HOOK 1: reset saat modal ditutup
  useEffect(() => {
    if (!open) {
      setScores({
        riwayatJatuh: "",
        kondisiKesehatan: "",
        bantuanAmbulansi: "",
        terapiIvAntikoagulan: "",
        gayaBerjalanBerpindah: "",
        statusMental: "",
      });
      setServerError(null);
    }
  }, [open]);

  // HOOK 2: total skor (harus sebelum early return)
  const totalSkor = useMemo(() => {
    return (Object.values(scores) as string[])
      .map((v) => (v === "" ? 0 : Number(v)))
      .filter((n) => !Number.isNaN(n))
      .reduce((acc, cur) => acc + cur, 0);
  }, [scores]);

  // Early return setelah semua hook
  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // validasi angka per field
    for (const meta of FIELD_META) {
      const raw = scores[meta.key];
      if (raw !== "" && Number.isNaN(Number(raw))) {
        setServerError(`${meta.label} harus berupa angka.`);
        return;
      }
    }

    const payload: ResikoJatuhFormData = {
      riwayatJatuh:
        scores.riwayatJatuh === "" ? null : Number(scores.riwayatJatuh),
      kondisiKesehatan:
        scores.kondisiKesehatan === ""
          ? null
          : Number(scores.kondisiKesehatan),
      bantuanAmbulansi:
        scores.bantuanAmbulansi === ""
          ? null
          : Number(scores.bantuanAmbulansi),
      terapiIvAntikoagulan:
        scores.terapiIvAntikoagulan === ""
          ? null
          : Number(scores.terapiIvAntikoagulan),
      gayaBerjalanBerpindah:
        scores.gayaBerjalanBerpindah === ""
          ? null
          : Number(scores.gayaBerjalanBerpindah),
      statusMental:
        scores.statusMental === "" ? null : Number(scores.statusMental),
      totalSkorPr: totalSkor || null,
    };

    const msg = await onSubmit(payload);
    if (msg) setServerError(msg);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-3">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 px-5 py-3">
          <div className="space-y-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-50">
              Resiko Jatuh (PR)
            </p>
            <h2 className="text-sm font-semibold text-white">
              Form Penilaian &amp; Total Skor
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-200/60 bg-amber-100/20 text-amber-50 transition hover:bg-amber-100/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[70vh] overflow-y-auto px-5 py-4 sm:px-6"
        >
          <div className="space-y-3">
            {/* Deskripsi singkat */}
            <div className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Ringkasan
              </span>
              <p className="text-xs leading-relaxed text-slate-600">
                Isi skor setiap parameter sesuai lembar penilaian resiko jatuh.
                Total skor akan dihitung otomatis untuk memudahkan dokumentasi
                di rekam medis.
              </p>
            </div>

            {/* Tabel parameter */}
            <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_4px_12px_rgba(15,23,42,0.03)]">
              <div className="mb-2 grid grid-cols-[2.1fr_0.9fr] gap-2 text-[11px] font-semibold text-slate-500">
                <div>Parameter</div>
                <div className="text-right">Skor</div>
              </div>

              <div className="space-y-1.5">
                {FIELD_META.map((meta) => (
                  <div
                    key={meta.key}
                    className="grid grid-cols-[2.1fr_0.9fr] items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2 transition hover:border-amber-200 hover:bg-amber-50/40"
                  >
                    <div className="text-[11px] text-slate-800">
                      {meta.label}
                    </div>
                    <div className="flex justify-end">
                      <input
                        type="number"
                        value={scores[meta.key]}
                        onChange={(e) =>
                          setScores((prev) => ({
                            ...prev,
                            [meta.key]: e.target.value,
                          }))
                        }
                        className="h-8 w-20 rounded-lg border border-slate-200 bg-white px-2 text-right text-[11px] text-slate-900 outline-none ring-amber-500/0 transition focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40"
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Total skor */}
              <div className="mt-3 grid grid-cols-[2.1fr_0.9fr] items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-semibold text-amber-900">
                    Total Skor
                  </div>
                  <p className="text-[10px] text-amber-900/80">
                    Hasil penjumlahan otomatis seluruh parameter di atas.
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <input
                    readOnly
                    value={totalSkor || 0}
                    className="h-8 w-20 rounded-lg border border-amber-300 bg-white px-2 text-right text-[12px] font-semibold text-amber-900 outline-none"
                  />
                  <span className="text-[10px] text-amber-800/80">
                    Otomatis • tidak bisa di-edit
                  </span>
                </div>
              </div>
            </div>
          </div>

          {serverError && (
            <p className="mt-3 rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {serverError}
            </p>
          )}

          {/* ACTIONS */}
          <div className="mt-4 flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-amber-500"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Skor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
