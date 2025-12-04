"use client";

import React, { useState } from "react";
import {
  Droplet,
  ArrowDownUp,
  ClipboardList,
  User,
  CalendarDays,
} from "lucide-react";
import { postJson } from "@/lib/api-client";

export interface BalanceCairanProps {
  noRm?: string;
  tanggal?: string; // yyyy-mm-dd
  hariPerawatanKe?: number;
  onSaved?: () => void;
}

interface FluidRow {
  id: string;
  namaCairan: string;
  jumlah: string;
  total: string;
}

const createId = () => Math.random().toString(36).slice(2);

const BalanceCairan: React.FC<BalanceCairanProps> = ({
  noRm,
  tanggal,
  hariPerawatanKe,
  onSaved,
}) => {
  const [lineRows, setLineRows] = useState<FluidRow[]>([
    { id: createId(), namaCairan: "", jumlah: "", total: "" },
    { id: createId(), namaCairan: "", jumlah: "", total: "" },
    { id: createId(), namaCairan: "", jumlah: "", total: "" },
  ]);

  const [enteralRows, setEnteralRows] = useState<FluidRow[]>([
    { id: createId(), namaCairan: "", jumlah: "", total: "" },
    { id: createId(), namaCairan: "", jumlah: "", total: "" },
    { id: createId(), namaCairan: "", jumlah: "", total: "" },
  ]);

  const [totalMasuk, setTotalMasuk] = useState("");
  const [keluar, setKeluar] = useState({
    ngt: "",
    urine: "",
    bab: "",
    drain: "",
    totalKeluar: "",
  });

  const [masalah, setMasalah] = useState("");
  const [tindakan, setTindakan] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateLineRow = (
    id: string,
    field: keyof FluidRow,
    value: string
  ) => {
    setLineRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const updateEnteralRow = (
    id: string,
    field: keyof FluidRow,
    value: string
  ) => {
    setEnteralRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      const payload = {
        meta: {
          noRm: noRm || null,
          tanggal: tanggal || null,
          hariPerawatanKe: hariPerawatanKe ?? null,
        },
        masuk: {
          line: lineRows.map((row) => ({
            namaCairan: row.namaCairan || null,
            jumlah: row.jumlah || null,
            total: row.total || null,
          })),
          enteral: enteralRows.map((row) => ({
            namaCairan: row.namaCairan || null,
            jumlah: row.jumlah || null,
            total: row.total || null,
          })),
          totalMasuk: totalMasuk || null,
        },
        keluar: {
          ngt: keluar.ngt || null,
          urine: keluar.urine || null,
          bab: keluar.bab || null,
          drain: keluar.drain || null,
          totalKeluar: keluar.totalKeluar || null,
        },
        ringkasan: {
          masalah: masalah || null,
          tindakanObat: tindakan || null,
        },
      };

      // biar simpel, tanpa generic eksplisit
      await postJson("/api/monitoring/balance-cairan", payload);

      setSubmitSuccess(true);
      if (onSaved) {
        onSaved();
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER – tema RS PIM */}
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
        <div className="relative flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-teal-300/10 blur-3xl" />

          <div className="relative space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90 ring-1 ring-emerald-500/40">
              <span className="h-[1px] w-6 bg-emerald-200/80" />
              ICU • Page 4
            </div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-50 sm:text-xl">
              <Droplet className="h-5 w-5 text-emerald-200" />
              Balance Cairan, Masuk &amp; Keluar
            </h2>
            <p className="max-w-xl text-xs text-emerald-100/90">
              Ringkasan cairan masuk (line &amp; enteral) dan cairan keluar,
              beserta masalah &amp; tindakan keperawatan.
            </p>
          </div>

          <div className="relative flex flex-col items-end gap-1 text-[11px] text-emerald-100/90">
            {noRm && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3 text-emerald-200" />
                <span>
                  No. RM:{" "}
                  <span className="font-semibold text-emerald-50">
                    {noRm}
                  </span>
                </span>
              </div>
            )}
            {tanggal && (
              <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3 text-emerald-200" />
                <span>
                  Tanggal:{" "}
                  <span className="font-semibold text-emerald-50">
                    {tanggal}
                  </span>
                </span>
              </div>
            )}
            {typeof hariPerawatanKe !== "undefined" && (
              <span>
                Hari perawatan ke:{" "}
                <span className="font-semibold text-emerald-50">
                  {hariPerawatanKe}
                </span>
              </span>
            )}
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-5"
      >
        {/* ===================== MASUK ===================== */}
        <section className="grid gap-4 lg:grid-cols-[1.3fr,1fr]">
          {/* MASUK – LINE */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-100">
                  <ArrowDownUp className="h-4 w-4 text-sky-700" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Masuk – Line
                  </h3>
                  <p className="text-[11px] text-slate-600">
                    Pencatatan cairan infus, darah, dan obat via line IV.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {lineRows.map((row, idx) => (
                <div
                  key={row.id}
                  className="grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:grid-cols-[1.4fr,1fr,1fr]"
                >
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-700">
                      Nama Cairan (Line #{idx + 1})
                    </label>
                    <input
                      type="text"
                      value={row.namaCairan}
                      onChange={(e) =>
                        updateLineRow(row.id, "namaCairan", e.target.value)
                      }
                      placeholder="misal: RL, NS, PRC, dsb."
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-700">
                      Jumlah
                    </label>
                    <input
                      type="text"
                      value={row.jumlah}
                      onChange={(e) =>
                        updateLineRow(row.id, "jumlah", e.target.value)
                      }
                      placeholder="contoh: 500 cc"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-medium text-slate-700">
                      Total (opsional / 6 jam)
                    </label>
                    <input
                      type="text"
                      value={row.total}
                      onChange={(e) =>
                        updateLineRow(row.id, "total", e.target.value)
                      }
                      placeholder="opsional"
                      className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* MASUK – ENTERAL */}
            <div className="mt-3 space-y-2 rounded-2xl border border-slate-200 bg-white px-3 py-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900">
                    Masuk – Enteral (NGT / oral)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Pencatatan cairan enteral, susu, nutrisi, dll.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {enteralRows.map((row, idx) => (
                  <div
                    key={row.id}
                    className="grid grid-cols-1 gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:grid-cols-[1.4fr,1fr,1fr]"
                  >
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-slate-700">
                        Nama Cairan (Enteral #{idx + 1})
                      </label>
                      <input
                        type="text"
                        value={row.namaCairan}
                        onChange={(e) =>
                          updateEnteralRow(
                            row.id,
                            "namaCairan",
                            e.target.value
                          )
                        }
                        placeholder="misal: Susu, nutrisi enteral"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-slate-700">
                        Jumlah
                      </label>
                      <input
                        type="text"
                        value={row.jumlah}
                        onChange={(e) =>
                          updateEnteralRow(row.id, "jumlah", e.target.value)
                        }
                        placeholder="contoh: 300 cc"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-slate-700">
                        Total (opsional / 6 jam)
                      </label>
                      <input
                        type="text"
                        value={row.total}
                        onChange={(e) =>
                          updateEnteralRow(row.id, "total", e.target.value)
                        }
                        placeholder="opsional"
                        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-2 text-xs">
                  <span className="text-[11px] font-semibold text-slate-800">
                    Total Masuk (24 jam)
                  </span>
                  <input
                    type="text"
                    value={totalMasuk}
                    onChange={(e) => setTotalMasuk(e.target.value)}
                    placeholder="misal: 2800 cc"
                    className="w-40 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </label>
                <p className="text-[11px] text-slate-500">
                  Total bisa dihitung per 6 jam lalu direkap 24 jam.
                </p>
              </div>
            </div>
          </div>

          {/* ===================== KELUAR ===================== */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 ring-1 ring-rose-100">
                <Droplet className="h-4 w-4 text-rose-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Keluar
                </h3>
                <p className="text-[11px] text-slate-600">
                  Pencatatan cairan keluar: NGT, urine, BAB, drain, dan total.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {(
                [
                  ["ngt", "NGT"],
                  ["urine", "Urine"],
                  ["bab", "BAB"],
                  ["drain", "Drain"],
                ] as const
              ).map(([field, label]) => (
                <label
                  key={field}
                  className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <span className="text-[11px] font-medium text-slate-800">
                    {label}
                  </span>
                  <input
                    type="text"
                    value={keluar[field]}
                    onChange={(e) =>
                      setKeluar((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    placeholder="contoh: 1500 cc"
                    className="w-40 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </label>
              ))}

              <label className="mt-1 flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-emerald-50 px-3 py-2">
                <span className="text-[11px] font-semibold text-slate-900">
                  Total Keluar (24 jam)
                </span>
                <input
                  type="text"
                  value={keluar.totalKeluar}
                  onChange={(e) =>
                    setKeluar((prev) => ({
                      ...prev,
                      totalKeluar: e.target.value,
                    }))
                  }
                  placeholder="misal: 2600 cc"
                  className="w-40 rounded-lg border border-emerald-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </label>
            </div>
          </div>
        </section>

        {/* ===================== MASALAH & TINDAKAN ===================== */}
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <ClipboardList className="h-4 w-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Masalah &amp; Tindakan / Obat
              </h3>
              <p className="text-[11px] text-slate-600">
                Dokumentasikan masalah keperawatan terkait cairan dan tindakan /
                obat yang diberikan.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-xs">
              <span className="text-[11px] font-medium text-slate-700">
                Masalah
              </span>
              <textarea
                rows={4}
                value={masalah}
                onChange={(e) => setMasalah(e.target.value)}
                placeholder="Contoh: Risiko ketidakseimbangan cairan, oliguria, dsb."
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </label>

            <label className="block text-xs">
              <span className="text-[11px] font-medium text-slate-700">
                Tindakan &amp; Obat
              </span>
              <textarea
                rows={4}
                value={tindakan}
                onChange={(e) => setTindakan(e.target.value)}
                placeholder="Contoh: Adjust cairan, kolaborasi dokter, pemberian diuretik, dsb."
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </label>
          </div>
        </section>

        {/* FOOTER / SUBMIT */}
        <footer className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-500 ring-1 ring-slate-200">
              <Droplet className="h-3 w-3" />
            </span>
            Data dikirim ke{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-[10px]">
              /api/monitoring/balance-cairan
            </code>{" "}
            untuk diolah backend sebagai rekap balance cairan 24 jam.
          </p>
          <div className="flex items-center gap-2">
            {submitError && (
              <span className="text-[11px] text-rose-600">{submitError}</span>
            )}
            {submitSuccess && (
              <span className="text-[11px] text-emerald-700">
                Data balance cairan tersimpan. ✅
              </span>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-emerald-700 px-5 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Page 4"}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default BalanceCairan;
