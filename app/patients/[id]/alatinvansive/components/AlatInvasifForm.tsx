// app/patients/[id]/alatinvansive/components/AlatInvasifForm.tsx
"use client";

import React from "react";
import { Shield, Activity, Droplet } from "lucide-react";
import type { useAlatInvasifForm } from "@/hooks/useAlatInvasif";
import {
  JENIS_ALAT_OPTIONS,
  JenisAlatValue,
} from "@/hooks/useAlatInvasif";

// Ambil bentuk data langsung dari hook (supaya selalu sinkron)
type AlatInvasifHookShape = ReturnType<typeof useAlatInvasifForm>;

// Props = sebagian dari hasil hook
type AlatInvasifFormProps = Pick<
  AlatInvasifHookShape,
  | "rows"
  | "fallRisk"
  | "fluidBalance"
  | "isSubmitting"
  | "submitError"
  | "submitSuccess"
  | "addRow"
  | "removeRow"
  | "updateRow"
  | "setFallRisk"
  | "setFluidBalance"
  | "handleSubmit"
>;

const AlatInvasifForm: React.FC<AlatInvasifFormProps> = ({
  rows,
  fallRisk,
  fluidBalance,
  isSubmitting,
  submitError,
  submitSuccess,
  addRow,
  removeRow,
  updateRow,
  setFallRisk,
  setFluidBalance,
  handleSubmit,
}) => {
  return (
    <form
      // Bungkus supaya React berharap return void, walaupun handleSubmit async
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-5"
    >
      {/* TABEL ALAT INVASIF */}
      <section className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <Shield className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Pemasangan Alat Invasif / Tube
              </h3>
              <p className="text-[11px] text-slate-500">
                Pilih jenis alat dari list ICU standar, atau gunakan
                &quot;Lainnya&quot; bila alat tidak ada di list.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm transition hover:bg-emerald-800"
          >
            + Tambah Alat
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/70">
          <table className="min-w-full border-separate border-spacing-0 text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                <th className="px-3 py-2 text-left">Jenis Alat</th>
                <th className="px-3 py-2 text-left">Ukuran</th>
                <th className="px-3 py-2 text-left">Lokasi</th>
                <th className="px-3 py-2 text-left">Tgl Pasang</th>
                <th className="px-3 py-2 text-left">Hari ke-</th>
                <th className="px-3 py-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row, idx) => (
                <tr key={row._localId} className="bg-white/95">
                  <td className="px-3 py-2 align-top">
                    <div className="space-y-1">
                      <select
                        required
                        value={row.jenisAlatCode}
                        onChange={(e) =>
                          updateRow(
                            row._localId,
                            "jenisAlatCode",
                            e.target.value as JenisAlatValue | ""
                          )
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="">Pilih jenis alat...</option>
                        {JENIS_ALAT_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {row.jenisAlatCode === "OTHER" && (
                        <input
                          required
                          value={row.jenisAlatCustom}
                          onChange={(e) =>
                            updateRow(
                              row._localId,
                              "jenisAlatCustom",
                              e.target.value
                            )
                          }
                          placeholder="Tulis nama alat lainnya"
                          className="w-full rounded-lg border border-dashed border-emerald-300 bg-emerald-50/40 px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-2 align-top">
                    <input
                      required
                      value={row.ukuran}
                      onChange={(e) =>
                        updateRow(row._localId, "ukuran", e.target.value)
                      }
                      placeholder="16G, 7.0 mm, dll"
                      className="w-28 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:w-32 sm:text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-3 py-2 align-top">
                    <input
                      required
                      value={row.lokasi}
                      onChange={(e) =>
                        updateRow(row._localId, "lokasi", e.target.value)
                      }
                      placeholder="Vena perifer kanan, femoralis, dll"
                      className="w-40 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:w-48 sm:text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-3 py-2 align-top">
                    <input
                      required
                      type="date"
                      value={row.tglPasang}
                      onChange={(e) =>
                        updateRow(row._localId, "tglPasang", e.target.value)
                      }
                      className="w-32 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-3 py-2 align-top">
                    <input
                      required
                      type="number"
                      min={0}
                      value={row.hariKe}
                      onChange={(e) =>
                        updateRow(row._localId, "hariKe", e.target.value)
                      }
                      className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="px-3 py-2 text-right align-top">
                    <button
                      type="button"
                      onClick={() => removeRow(row._localId)}
                      disabled={rows.length === 1}
                      className="text-[11px] font-medium text-rose-600 hover:text-rose-700 disabled:cursor-not-allowed disabled:text-slate-300"
                    >
                      Hapus
                    </button>
                    <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                      #{idx + 1}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-500">
          Jenis alat mengikuti form ICU standar: IV Line, arteri line, Swanz,
          IABP, Ott/ETT/ET, NGT, drain, WSD, D.Cath/D.CO, EPID Cath, PNB Cath,
          dan alat lainnya bila diperlukan.
        </p>
      </section>

      {/* RESIKO JATUH + BALANCE CAIRAN */}
      <section className="grid gap-4 lg:grid-cols-[1.2fr,1.3fr]">
        {/* Resiko Jatuh */}
        <div className="space-y-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 ring-1 ring-emerald-200">
                <Activity className="h-4 w-4 text-emerald-800" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Resiko Jatuh
                </h3>
                <p className="text-[11px] text-emerald-900/80">
                  Input skor tiap komponen, total skor (PR) bisa dikalkulasi
                  backend untuk kategori risiko.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-900 px-2 py-0.5 text-[10px] font-semibold text-emerald-50">
              Skor PR
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
            {(
              [
                ["riwayatJatuh", "1. Riwayat jatuh"],
                ["kondisiKesehatan", "2. Kondisi kesehatan"],
                ["bantuanAmbulansi", "3. Bantuan ambulansi"],
                ["terapiIVAntikoagulan", "4. Terapi IV / Antikoagulan"],
                ["gayaBerjalan", "5. Gaya berjalan / berpindah"],
                ["statusMental", "6. Status mental"],
              ] as const
            ).map(([field, label]) => (
              <label key={field} className="space-y-1">
                <span className="block text-[11px] font-medium text-slate-800">
                  {label}
                </span>
                <input
                  type="number"
                  min={0}
                  required
                  value={fallRisk[field]}
                  onChange={(e) =>
                    setFallRisk((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-emerald-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </label>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-emerald-200 pt-3">
            <label className="flex flex-col text-xs">
              <span className="text-[11px] font-semibold text-slate-900">
                Total Skor (PR)
              </span>
              <input
                type="number"
                min={0}
                required
                value={fallRisk.totalSkor}
                onChange={(e) =>
                  setFallRisk((prev) => ({
                    ...prev,
                    totalSkor: e.target.value,
                  }))
                }
                className="mt-1 w-24 rounded-lg border border-emerald-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </label>
            <p className="text-[11px] text-emerald-900/80">
              Logika kategori (rendah/sedang/tinggi) bisa ditentukan di
              backend.
            </p>
          </div>
        </div>

        {/* Balance Cairan */}
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-100">
                <Droplet className="h-4 w-4 text-sky-700" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Balance Cairan 24 Jam
                </h3>
                <p className="text-[11px] text-slate-600">
                  Rekap cairan masuk, keluar, IWL dan BC kumulatif untuk 24 jam.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-800 ring-1 ring-sky-100">
              Satuan mL / cc
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
            {(
              [
                ["cairanMasuk", "Cairan masuk (24 jam)"],
                ["cairanKeluar", "Cairan keluar (24 jam)"],
                ["iwl", "IWL"],
                ["bc24Jam", "BC 24 jam"],
                ["bcSebelumnya", "BC sebelumnya"],
                ["bcKumulatif", "BC kumulatif"],
              ] as const
            ).map(([field, label]) => (
              <label key={field} className="space-y-1">
                <span className="block text-[11px] font-medium text-slate-800">
                  {label}
                </span>
                <input
                  type="number"
                  min={0}
                  required
                  value={fluidBalance[field]}
                  onChange={(e) =>
                    setFluidBalance((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </label>
            ))}
          </div>

          <p className="text-[11px] text-slate-500">
            Detail per jam (line, NGT, urine, drain, dll.) tercatat di tab
            Balance Cairan; bagian ini hanya rekap 24 jam.
          </p>
        </div>
      </section>

      {/* FOOTER / SUBMIT */}
      <footer className="flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-slate-500">
          Data dikirim ke{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[10px]">
            /monitoring/page-2
          </code>{" "}
          di backend Anda untuk disimpan sebagai alat_invasif, risiko_jatuh,
          dan balance_cairan.
        </p>
        <div className="flex items-center gap-2">
          {submitError && (
            <span className="text-[11px] text-rose-600">{submitError}</span>
          )}
          {submitSuccess && (
            <span className="text-[11px] text-emerald-700">
              Data tersimpan. ✅
            </span>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-emerald-700 px-5 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Page 2"}
          </button>
        </div>
      </footer>
    </form>
  );
};

export default AlatInvasifForm;
