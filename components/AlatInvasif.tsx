"use client";

import React, { useState } from "react";
import { Shield, Activity, Droplet, User, CalendarDays } from "lucide-react";
import { postJson } from "@/lib/api";

export interface AlatInvasifProps {
  noRm?: string;
  tanggal?: string; // yyyy-mm-dd
  hariPerawatanKe?: number;
  onSaved?: () => void;
}

const createId = () => Math.random().toString(36).slice(2);

const JENIS_ALAT_OPTIONS = [
  { value: "IV_LINE", label: "IV Line" },
  { value: "ARTERI_LINE", label: "Arteri line" },
  { value: "SWANZ_GANZ", label: "Swanz Ganz" },
  { value: "IABP", label: "IABP" },
  { value: "SHEATH_TPM", label: "Sheath / TPM" },
  { value: "OTT_ETT_ET", label: "OTT / ETT / ET" },
  { value: "NGT", label: "NGT" },
  { value: "DRAIN", label: "Drain" },
  { value: "WSD", label: "WSD" },
  { value: "D_CATH_D_CO", label: "D. Cath / D.CO" },
  { value: "EPID_CATH", label: "EPID Cath" },
  { value: "PNB_CATH", label: "PNB Cath" },
  { value: "OTHER", label: "Lainnya (isi manual)" },
] as const;

type JenisAlatValue = (typeof JENIS_ALAT_OPTIONS)[number]["value"];

interface DeviceRow {
  id: string;
  jenisAlatCode: JenisAlatValue | "";
  jenisAlatCustom: string;
  ukuran: string;
  lokasi: string;
  tglPasang: string; // yyyy-mm-dd
  hariKe: string; // numeric string
}

interface FallRiskForm {
  riwayatJatuh: string;
  kondisiKesehatan: string;
  bantuanAmbulansi: string;
  terapiIVAntikoagulan: string;
  gayaBerjalan: string;
  statusMental: string;
  totalSkor: string;
}

interface FluidBalanceForm {
  cairanMasuk: string;
  cairanKeluar: string;
  iwl: string;
  bc24Jam: string;
  bcSebelumnya: string;
  bcKumulatif: string;
}

const AlatInvasif: React.FC<AlatInvasifProps> = ({
  noRm,
  tanggal,
  hariPerawatanKe,
  onSaved,
}) => {
  const [rows, setRows] = useState<DeviceRow[]>([
    {
      id: createId(),
      jenisAlatCode: "",
      jenisAlatCustom: "",
      ukuran: "",
      lokasi: "",
      tglPasang: "",
      hariKe: "",
    },
  ]);

  const [fallRisk, setFallRisk] = useState<FallRiskForm>({
    riwayatJatuh: "",
    kondisiKesehatan: "",
    bantuanAmbulansi: "",
    terapiIVAntikoagulan: "",
    gayaBerjalan: "",
    statusMental: "",
    totalSkor: "",
  });

  const [fluidBalance, setFluidBalance] = useState<FluidBalanceForm>({
    cairanMasuk: "",
    cairanKeluar: "",
    iwl: "",
    bc24Jam: "",
    bcSebelumnya: "",
    bcKumulatif: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateRow = (id: string, field: keyof DeviceRow, value: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
              ...(field === "jenisAlatCode" && value !== "OTHER"
                ? { jenisAlatCustom: "" }
                : {}),
            }
          : row
      )
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: createId(),
        jenisAlatCode: "",
        jenisAlatCustom: "",
        ukuran: "",
        lokasi: "",
        tglPasang: "",
        hariKe: "",
      },
    ]);
  };

  const removeRow = (id: string) => {
    setRows((prev) => (prev.length === 1 ? prev : prev.filter((r) => r.id !== id)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const alatInvasif = rows.map((r) => {
        const opt = JENIS_ALAT_OPTIONS.find((o) => o.value === r.jenisAlatCode);
        const labelFromOption = opt?.label ?? "";
        const namaJenisAlat =
          r.jenisAlatCode === "OTHER"
            ? r.jenisAlatCustom.trim()
            : labelFromOption;

        return {
          kodeJenisAlat: r.jenisAlatCode || null,
          namaJenisAlat: namaJenisAlat || null,
          ukuran: r.ukuran.trim() || null,
          lokasi: r.lokasi.trim() || null,
          tglPasang: r.tglPasang || null,
          hariKe: r.hariKe ? Number(r.hariKe) : null,
        };
      });

      const payload = {
        meta: {
          noRm: noRm || null,
          tanggal: tanggal || null,
          hariPerawatanKe: hariPerawatanKe ?? null,
        },
        alatInvasif,
        risikoJatuh: {
          riwayatJatuh: fallRisk.riwayatJatuh
            ? Number(fallRisk.riwayatJatuh)
            : null,
          kondisiKesehatan: fallRisk.kondisiKesehatan
            ? Number(fallRisk.kondisiKesehatan)
            : null,
          bantuanAmbulansi: fallRisk.bantuanAmbulansi
            ? Number(fallRisk.bantuanAmbulansi)
            : null,
          terapiIVAntikoagulan: fallRisk.terapiIVAntikoagulan
            ? Number(fallRisk.terapiIVAntikoagulan)
            : null,
          gayaBerjalan: fallRisk.gayaBerjalan
            ? Number(fallRisk.gayaBerjalan)
            : null,
          statusMental: fallRisk.statusMental
            ? Number(fallRisk.statusMental)
            : null,
          totalSkor: fallRisk.totalSkor ? Number(fallRisk.totalSkor) : null,
        },
        balanceCairan: {
          cairanMasuk: fluidBalance.cairanMasuk
            ? Number(fluidBalance.cairanMasuk)
            : null,
          cairanKeluar: fluidBalance.cairanKeluar
            ? Number(fluidBalance.cairanKeluar)
            : null,
          iwl: fluidBalance.iwl ? Number(fluidBalance.iwl) : null,
          bc24Jam: fluidBalance.bc24Jam ? Number(fluidBalance.bc24Jam) : null,
          bcSebelumnya: fluidBalance.bcSebelumnya
            ? Number(fluidBalance.bcSebelumnya)
            : null,
          bcKumulatif: fluidBalance.bcKumulatif
            ? Number(fluidBalance.bcKumulatif)
            : null,
        },
      };

      await postJson<typeof payload, { ok?: boolean; message?: string }>(
        "/api/monitoring/page-2",
        payload
      );

      setSubmitSuccess(true);
      if (onSaved) onSaved();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER GRADIENT – konsisten RS PIM */}
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
        <div className="relative flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-teal-300/10 blur-3xl" />

          <div className="relative space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90 ring-1 ring-emerald-500/40">
              <span className="h-[1px] w-6 bg-emerald-200/80" />
              ICU • Page 2
            </div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-50 sm:text-xl">
              <Shield className="h-5 w-5 text-emerald-200" />
              Alat Invasif, Resiko Jatuh &amp; Balance Cairan
            </h2>
            <p className="max-w-xl text-xs text-emerald-100/90">
              Dokumentasi pemasangan alat invasif/tube, penilaian resiko jatuh,
              dan rekap balance cairan 24 jam dalam satu tampilan yang konsisten.
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
                  Pilih jenis alat dari list ICU standar, atau gunakan opsi
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
                  <tr key={row.id} className="bg-white/95">
                    <td className="px-3 py-2 align-top">
                      <div className="space-y-1">
                        <select
                          required
                          value={row.jenisAlatCode}
                          onChange={(e) =>
                            updateRow(
                              row.id,
                              "jenisAlatCode",
                              e.target.value as string
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
                                row.id,
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
                          updateRow(row.id, "ukuran", e.target.value)
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
                          updateRow(row.id, "lokasi", e.target.value)
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
                          updateRow(row.id, "tglPasang", e.target.value)
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
                          updateRow(row.id, "hariKe", e.target.value)
                        }
                        className="w-20 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-3 py-2 text-right align-top">
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
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

        {/* RESIKO JATUH + BALANCE CAIRAN – GRID 2 KOLOM */}
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
                    Input skor tiap komponen, total skor (PR) bisa dipakai
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
                    Rekap cairan masuk, keluar, IWL dan BC kumulatif untuk 24
                    jam.
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
              /api/monitoring/page-2
            </code>{" "}
            untuk disimpan sebagai alat_invasif, risiko_jatuh, dan
            balance_cairan.
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
    </div>
  );
};

export default AlatInvasif;
