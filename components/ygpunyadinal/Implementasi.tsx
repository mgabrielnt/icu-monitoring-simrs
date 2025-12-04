"use client";

import React, { useEffect, useState } from "react";
import { FileText, Plus, CheckCircle, Clock, User } from "lucide-react";
import { postJson } from "@/lib/api-client";

interface ImplementasiRow {
  no: number;
  jenisKegiatan: string;
  jam: string;
  paraf: string;
}

interface ImplementasiProps {
  noRm?: string;
  tanggal?: string;      // yyyy-mm-dd
  hariPerawatanKe?: number;
  onSaved?: () => void;
}

const KEGIATAN_UMUM = [
  "Monitor kesadaran: GCS",
  "Monitor TD, N, R, Temp, SpO2",
  "Merekam EKG",
  "Mengukur CVC, arteri line",
  "Monitor Terapi O2: binasal, RM, NRM, T-Piece",
  "Monitor Nyeri",
  "Monitor setting ventilator, humidifier",
  "Monitor setting TPM, IABP",
  "Monitor Reflek Mata, kekuatan otot",
  "Pengelolaan Diet melalui Oral/NGT",
  "Monitoring tanda perdarahan",
  "Personal Hygiene: mandi, perineal",
  "Perawatan mulut",
  "Perawatan ETT/TT",
  "Perawatan Drain, WSD",
  "Perawatan Sheath, TPM",
  "Suctioning",
  "Fisioterapi, mobilisasi jantung",
  "Rekam EKG 12 lead",
  "Monitor Balance Cairan",
  "Perawatan luka",
  "Alih Baring, Head Up 30°",
  "Pencegahan Jatuh resiko rendah/tinggi",
];

const formatTime = (date: Date) =>
  date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const Implementasi: React.FC<ImplementasiProps> = ({
  noRm,
  tanggal,
  hariPerawatanKe,
  onSaved,
}) => {
  const [dataList, setDataList] = useState<ImplementasiRow[]>([]);
  const [systemTime, setSystemTime] = useState<string>(formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      setSystemTime(formatTime(new Date()));
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{
    jenisKegiatan: string;
    paraf: string;
    customKegiatan: string;
  }>({
    jenisKegiatan: "",
    paraf: "",
    customKegiatan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    key: "jenisKegiatan" | "paraf" | "customKegiatan",
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === "jenisKegiatan" && value !== "custom") {
      setFormData((prev) => ({ ...prev, customKegiatan: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      const now = new Date();
      const jamSekarang = formatTime(now);

      const finalJenisKegiatan =
        formData.jenisKegiatan === "custom"
          ? formData.customKegiatan
          : formData.jenisKegiatan;

      const newRow: ImplementasiRow = {
        no: dataList.length + 1,
        jenisKegiatan: finalJenisKegiatan,
        jam: jamSekarang,
        paraf: formData.paraf,
      };

      setDataList((prev) => [...prev, newRow]);

      const payload = {
        meta: {
          noRm: noRm || null,
          tanggal: tanggal || null,
          hariPerawatanKe: hariPerawatanKe ?? null,
        },
        activity: {
          jenisKegiatan: finalJenisKegiatan,
          jam: jamSekarang,
          paraf: formData.paraf,
        },
      };

      try {
        await postJson<typeof payload, { ok?: boolean; message?: string }>(
          "/api/monitoring/implementasi",
          payload
        );
      } catch (err) {
        console.error("Gagal kirim ke /api/monitoring/implementasi:", err);
      }

      setFormData({
        jenisKegiatan: "",
        paraf: "",
        customKegiatan: "",
      });
      setShowForm(false);
      setSubmitSuccess(true);
      if (onSaved) onSaved();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER – sama tema gradient */}
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
        <div className="relative flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-teal-300/10 blur-3xl" />

          <div className="relative space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90 ring-1 ring-emerald-500/40">
              <span className="h-[1px] w-6 bg-emerald-200/80" />
              ICU • Page 5
            </div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-50 sm:text-xl">
              <CheckCircle className="h-5 w-5 text-emerald-200" />
              Perencanaan Perawat &amp; Implementasi
            </h2>
            <p className="max-w-xl text-xs text-emerald-100/90">
              Jam pelaksanaan tercatat otomatis dari jam sistem saat kegiatan
              disimpan. Perawat fokus pilih kegiatan dan paraf.
            </p>
          </div>

          <div className="relative flex flex-col items-end gap-1 text-[11px] text-emerald-100/90">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/70 px-3 py-1 ring-1 ring-emerald-500/40">
              <Clock className="h-3.5 w-3.5 text-emerald-200" />
              <span>
                Jam sistem:{" "}
                <span className="font-mono font-semibold text-emerald-50">
                  {systemTime}
                </span>
              </span>
            </div>
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
              <span>
                Tanggal:{" "}
                <span className="font-semibold text-emerald-50">
                  {tanggal}
                </span>
              </span>
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

      {/* CARD TABEL */}
      <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <FileText className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Daftar Implementasi Kegiatan Perawatan
              </h3>
              <p className="text-[11px] text-slate-500">
                Ringkasan tindakan perawat selama 24 jam dengan jam otomatis dan
                paraf.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {dataList.length > 0 && (
              <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
                Total kegiatan:{" "}
                <span className="font-semibold text-slate-800">
                  {dataList.length}
                </span>
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                setShowForm((prev) => !prev);
                setSubmitError(null);
                setSubmitSuccess(false);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm transition hover:bg-emerald-800"
            >
              <Plus className="h-4 w-4" />
              {showForm ? "Tutup Form" : "Tambah Kegiatan"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                <th className="sticky left-0 z-10 border-b border-slate-200 bg-slate-50 px-4 py-2 text-center">
                  No
                </th>
                <th className="border-b border-slate-200 px-4 py-2 text-left">
                  Jenis Kegiatan
                </th>
                <th className="border-b border-slate-200 px-4 py-2 text-center">
                  Jam Pelaksanaan
                </th>
                <th className="border-b border-slate-200 px-4 py-2 text-center">
                  Paraf
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataList.map((row) => (
                <tr
                  key={row.no}
                  className="bg-white/95 transition hover:bg-emerald-50/60"
                >
                  <td className="sticky left-0 z-0 border-r border-slate-100 px-4 py-2 text-center text-xs font-semibold text-slate-700">
                    {row.no}
                  </td>
                  <td className="px-4 py-2 align-top text-xs text-slate-800">
                    {row.jenisKegiatan}
                  </td>
                  <td className="px-4 py-2 text-center align-middle">
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-mono font-semibold text-sky-700 ring-1 ring-sky-100">
                      <Clock className="h-3 w-3" />
                      {row.jam}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center align-middle">
                    <span className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                      {row.paraf}
                    </span>
                  </td>
                </tr>
              ))}

              {dataList.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-5 text-center text-xs text-slate-400"
                  >
                    Belum ada implementasi yang dicatat. Tekan{" "}
                    <span className="font-semibold">“Tambah Kegiatan”</span>{" "}
                    untuk mulai input.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* FORM INPUT */}
      {showForm && (
        <section className="rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-emerald-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                <CheckCircle className="h-4 w-4 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Tambah Implementasi Kegiatan
                </h3>
                <p className="text-[11px] text-slate-500">
                  Jam pelaksanaan diambil otomatis dari jam sistem ketika
                  kegiatan disimpan.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 px-4 py-4 sm:px-6"
          >
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
                  onChange={(e) =>
                    handleChange("jenisKegiatan", e.target.value)
                  }
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
                  onChange={(e) => handleChange("paraf", e.target.value)}
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
                  onChange={(e) =>
                    handleChange("customKegiatan", e.target.value)
                  }
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
                  onClick={() => setShowForm(false)}
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
      )}

      <section className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/80 p-3 text-[11px] text-amber-800">
        <div className="flex gap-2">
          <svg
            className="mt-[2px] h-4 w-4 flex-none text-amber-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p>
            <span className="font-semibold">Catatan:</span> Jam pelaksanaan
            hanya diambil dari sistem ketika tombol{" "}
            <span className="font-semibold">“Simpan Kegiatan”</span> ditekan,
            tidak bisa diubah manual.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Implementasi;
