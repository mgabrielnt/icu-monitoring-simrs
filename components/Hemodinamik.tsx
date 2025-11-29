"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  Brain,
  HeartPulse,
  Wind,
  Thermometer,
  User,
  CalendarDays,
  Clock,
} from "lucide-react";
import { postJson } from "@/lib/api";

export interface HemodinamikProps {
  noRm?: string;
  tanggal?: string; // yyyy-mm-dd
  hariPerawatanKe?: number;
  onSaved?: () => void;
}

interface HemodinamikEntry {
  id: string;
  jam: string; // HH:MM
  // Hemodinamik utama
  hr: number;
  map: number;
  temp: number;
  kesadaran: string;
  iramaEkg: string;
  skorNyeri?: string;
  skorSedasi?: string;
  cvpIabp?: string;
  papLap?: string;
  sao2?: string;
  tprIabp?: string;

  // Respirasi
  tipeVentilasi?: string;
  fio2?: string;
  rr?: string;
  vte?: string;
  pipPlatau?: string;
  peepCpap?: string;
  minuteVolume?: string;

  // Neuro
  mata?: string;
  pupil?: string;
  reaksiCahaya?: string;
  tangan?: string;
  kaki?: string;
  gcsE?: string;
  gcsM?: string;
  gcsV?: string;
}

const createId = () => Math.random().toString(36).slice(2);

const formatTime = (date: Date) =>
  date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const opsiKesadaran = [
  "Compos mentis",
  "Apatis",
  "Somnolen",
  "Sopor",
  "Koma",
  "Gelisan",
  "Delirium",
];

const opsiIramaEkg = [
  "Sinus rhythm",
  "AF",
  "SVT",
  "VT",
  "VF",
  "PAC/PVC",
  "Blok AV",
  "Lainnya",
];

const opsiSkorSedasi = ["0", "-1", "-2", "-3", "-4", "-5"];

const opsiTipeVentilasi = [
  "Spontan",
  "NIV",
  "CPAP",
  "SIMV",
  "ACV",
  "PSV",
  "HFNC",
  "Lainnya",
];

const Hemodinamik: React.FC<HemodinamikProps> = ({
  noRm,
  tanggal,
  hariPerawatanKe,
  onSaved,
}) => {
  const [systemTime, setSystemTime] = useState<string>(formatTime(new Date()));
  const [entries, setEntries] = useState<HemodinamikEntry[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(formatTime(new Date()));
    }, 30_000);
    return () => clearInterval(timer);
  }, []);

  const [form, setForm] = useState({
    // Hemodinamik
    hr: "",
    map: "",
    temp: "",
    kesadaran: "",
    iramaEkg: "",
    skorNyeri: "",
    skorSedasi: "",
    cvpIabp: "",
    papLap: "",
    sao2: "",
    tprIabp: "",
    // Respirasi
    tipeVentilasi: "",
    fio2: "",
    rr: "",
    vte: "",
    pipPlatau: "",
    peepCpap: "",
    minuteVolume: "",
    // Neuro
    mata: "",
    pupil: "",
    reaksiCahaya: "",
    tangan: "",
    kaki: "",
    gcsE: "",
    gcsM: "",
    gcsV: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateRange = (value: string, min: number, max: number) => {
    if (!value.trim()) return false;
    const n = Number(value);
    if (Number.isNaN(n)) return false;
    return n >= min && n <= max;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (
      !validateRange(form.hr, 0, 250) ||
      !validateRange(form.map, 0, 250) ||
      !validateRange(form.temp, 0, 250)
    ) {
      setSubmitError("HR, MAP, dan Temp harus antara 0–250.");
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      const jam = formatTime(now);

      const entry: HemodinamikEntry = {
        id: createId(),
        jam,
        hr: Number(form.hr),
        map: Number(form.map),
        temp: Number(form.temp),
        kesadaran: form.kesadaran,
        iramaEkg: form.iramaEkg,
        skorNyeri: form.skorNyeri || undefined,
        skorSedasi: form.skorSedasi || undefined,
        cvpIabp: form.cvpIabp || undefined,
        papLap: form.papLap || undefined,
        sao2: form.sao2 || undefined,
        tprIabp: form.tprIabp || undefined,

        tipeVentilasi: form.tipeVentilasi || undefined,
        fio2: form.fio2 || undefined,
        rr: form.rr || undefined,
        vte: form.vte || undefined,
        pipPlatau: form.pipPlatau || undefined,
        peepCpap: form.peepCpap || undefined,
        minuteVolume: form.minuteVolume || undefined,

        mata: form.mata || undefined,
        pupil: form.pupil || undefined,
        reaksiCahaya: form.reaksiCahaya || undefined,
        tangan: form.tangan || undefined,
        kaki: form.kaki || undefined,
        gcsE: form.gcsE || undefined,
        gcsM: form.gcsM || undefined,
        gcsV: form.gcsV || undefined,
      };

      setEntries((prev) => [...prev, entry]);

      const payload = {
        meta: {
          noRm: noRm || null,
          tanggal: tanggal || null,
          hariPerawatanKe: hariPerawatanKe ?? null,
        },
        measurement: entry,
      };

      // Kirim ke backend (boleh diabaikan dulu sampai backend jadi)
      try {
        await postJson<typeof payload, { ok?: boolean; message?: string }>(
          "/api/monitoring/hemodinamik",
          payload
        );
      } catch (err) {
        console.error("POST /api/monitoring/hemodinamik gagal:", err);
      }

      setForm({
        hr: "",
        map: "",
        temp: "",
        kesadaran: "",
        iramaEkg: "",
        skorNyeri: "",
        skorSedasi: "",
        cvpIabp: "",
        papLap: "",
        sao2: "",
        tprIabp: "",
        tipeVentilasi: "",
        fio2: "",
        rr: "",
        vte: "",
        pipPlatau: "",
        peepCpap: "",
        minuteVolume: "",
        mata: "",
        pupil: "",
        reaksiCahaya: "",
        tangan: "",
        kaki: "",
        gcsE: "",
        gcsM: "",
        gcsV: "",
      });

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
      {/* HEADER – sama tema RS PIM */}
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
        <div className="relative flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-teal-300/10 blur-3xl" />

          <div className="relative space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90 ring-1 ring-emerald-500/40">
              <span className="h-[1px] w-6 bg-emerald-200/80" />
              ICU • Page 3
            </div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-50 sm:text-xl">
              <Activity className="h-5 w-5 text-emerald-200" />
              Hemodinamik, Respirasi &amp; Neuro 24 Jam
            </h2>
            <p className="max-w-xl text-xs text-emerald-100/90">
              Input lengkap hemodinamik, parameter respirasi, dan status
              neurologis per jam. Jam pengukuran diambil otomatis dari sistem.
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

      {/* FORM UTAMA – mirip isi kertas 06/10 */}
      <section className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-5">
        {/* Jam otomatis */}
        <div className="mb-4 flex flex-col gap-2 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/60 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-medium text-emerald-900">
              Jam Input (otomatis)
            </p>
            <p className="text-[11px] text-emerald-700">
              Sistem menggunakan jam saat ini (24 jam). Jam{" "}
              <span className="font-semibold">tidak bisa diedit</span> agar
              dokumentasi sesuai waktu real.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-900 px-3 py-1 text-[11px] font-mono font-semibold text-emerald-50 shadow-sm">
            <Clock className="h-3 w-3" />
            {systemTime}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* HEMODINAMIK */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                <HeartPulse className="h-4 w-4 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Hemodinamik
                </h3>
                <p className="text-[11px] text-slate-600">
                  HR, MAP, temperatur, kesadaran, irama EKG, skor nyeri, sedasi,
                  dan parameter invasif lain.
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  HR (x/menit) *
                </label>
                <input
                  type="number"
                  min={0}
                  max={250}
                  required
                  value={form.hr}
                  onChange={(e) => handleChange("hr", e.target.value)}
                  placeholder="0 – 250"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  MAP (mmHg) *
                </label>
                <input
                  type="number"
                  min={0}
                  max={250}
                  required
                  value={form.map}
                  onChange={(e) => handleChange("map", e.target.value)}
                  placeholder="0 – 250"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Temp (°C) *
                </label>
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-slate-500" />
                  <input
                    type="number"
                    min={0}
                    max={250}
                    required
                    value={form.temp}
                    onChange={(e) => handleChange("temp", e.target.value)}
                    placeholder="0 – 250"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Kesadaran
                </label>
                <select
                  value={form.kesadaran}
                  onChange={(e) => handleChange("kesadaran", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Pilih tingkat kesadaran</option>
                  {opsiKesadaran.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Irama EKG
                </label>
                <select
                  value={form.iramaEkg}
                  onChange={(e) => handleChange("iramaEkg", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Pilih irama</option>
                  {opsiIramaEkg.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                  <option value="Lainnya (tulis di bawah)">
                    Lainnya (tulis di bawah)
                  </option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Skor Nyeri (0–10)
                </label>
                <input
                  type="text"
                  value={form.skorNyeri}
                  onChange={(e) => handleChange("skorNyeri", e.target.value)}
                  placeholder="contoh: 3/10"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Skor Sedasi
                </label>
                <select
                  value={form.skorSedasi}
                  onChange={(e) => handleChange("skorSedasi", e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Pilih</option>
                  {opsiSkorSedasi.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  CVP / IABP
                </label>
                <input
                  type="text"
                  value={form.cvpIabp}
                  onChange={(e) => handleChange("cvpIabp", e.target.value)}
                  placeholder="misal: 10 cmH₂O / ON"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  PAP / LAP
                </label>
                <input
                  type="text"
                  value={form.papLap}
                  onChange={(e) => handleChange("papLap", e.target.value)}
                  placeholder="opsional"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  SaO₂ / SpO₂ (%)
                </label>
                <input
                  type="text"
                  value={form.sao2}
                  onChange={(e) => handleChange("sao2", e.target.value)}
                  placeholder="contoh: 98%"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* RESPIRASI */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-100">
                <Wind className="h-4 w-4 text-sky-700" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Respirasi
                </h3>
                <p className="text-[11px] text-slate-600">
                  Tipe ventilasi, FiO₂, RR, VtE, PIP, PEEP/CPAP, dan minute
                  volume.
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Tipe Ventilasi
                </label>
                <select
                  value={form.tipeVentilasi}
                  onChange={(e) =>
                    handleChange("tipeVentilasi", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Pilih tipe</option>
                  {opsiTipeVentilasi.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  FiO₂ (%)
                </label>
                <input
                  type="text"
                  value={form.fio2}
                  onChange={(e) => handleChange("fio2", e.target.value)}
                  placeholder="contoh: 40%"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  RR (x/menit)
                </label>
                <input
                  type="text"
                  value={form.rr}
                  onChange={(e) => handleChange("rr", e.target.value)}
                  placeholder="misal: 18"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  VtE (mL)
                </label>
                <input
                  type="text"
                  value={form.vte}
                  onChange={(e) => handleChange("vte", e.target.value)}
                  placeholder="misal: 450"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  PIP / P-Platau (cmH₂O)
                </label>
                <input
                  type="text"
                  value={form.pipPlatau}
                  onChange={(e) => handleChange("pipPlatau", e.target.value)}
                  placeholder="opsional"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  PEEP / CPAP (cmH₂O)
                </label>
                <input
                  type="text"
                  value={form.peepCpap}
                  onChange={(e) => handleChange("peepCpap", e.target.value)}
                  placeholder="misal: 5"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Minute Volume (L/menit)
                </label>
                <input
                  type="text"
                  value={form.minuteVolume}
                  onChange={(e) =>
                    handleChange("minuteVolume", e.target.value)
                  }
                  placeholder="misal: 7,5"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* NEURO */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                <Brain className="h-4 w-4 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Neuro (GCS &amp; Motorik)
                </h3>
                <p className="text-[11px] text-slate-600">
                  Pupil, reaksi cahaya, kekuatan tangan &amp; kaki, serta GCS
                  (E, M, V).
                </p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Mata (R/L)
                </label>
                <input
                  type="text"
                  value={form.mata}
                  onChange={(e) => handleChange("mata", e.target.value)}
                  placeholder="contoh: R/L terbuka"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Ukuran Pupil
                </label>
                <input
                  type="text"
                  value={form.pupil}
                  onChange={(e) => handleChange("pupil", e.target.value)}
                  placeholder="contoh: isokor / anisokor"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Reaksi Cahaya
                </label>
                <input
                  type="text"
                  value={form.reaksiCahaya}
                  onChange={(e) =>
                    handleChange("reaksiCahaya", e.target.value)
                  }
                  placeholder="contoh: +/+ , -/-"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Tangan (R/L)
                </label>
                <input
                  type="text"
                  value={form.tangan}
                  onChange={(e) => handleChange("tangan", e.target.value)}
                  placeholder="contoh: 5/5, hemiparese"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  Kaki (R/L)
                </label>
                <input
                  type="text"
                  value={form.kaki}
                  onChange={(e) => handleChange("kaki", e.target.value)}
                  placeholder="contoh: 4/5"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-medium text-slate-700">
                  GCS (E / M / V)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={form.gcsE}
                    onChange={(e) => handleChange("gcsE", e.target.value)}
                    placeholder="E"
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-center focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    value={form.gcsM}
                    onChange={(e) => handleChange("gcsM", e.target.value)}
                    placeholder="M"
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-center focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    value={form.gcsV}
                    onChange={(e) => handleChange("gcsV", e.target.value)}
                    placeholder="V"
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-center focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER / SUBMIT */}
          <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-500 ring-1 ring-slate-200">
                <Activity className="h-3 w-3" />
              </span>
              Setiap submit akan mencatat{" "}
              <span className="font-semibold">1 baris monitoring</span> untuk
              jam tersebut, mirip 1 kolom di grafik kertas 24 jam.
            </p>
            <div className="flex items-center gap-2">
              {submitError && (
                <span className="text-[11px] text-rose-600">{submitError}</span>
              )}
              {submitSuccess && (
                <span className="text-[11px] text-emerald-700">
                  Data hemodinamik tersimpan. ✅
                </span>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-emerald-700 px-5 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Input Jam Ini"}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* RIWAYAT INPUT (24 jam terakhir) */}
      <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <Activity className="h-4 w-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Rekap Input Hemodinamik 24 Jam
              </h3>
              <p className="text-[11px] text-slate-600">
                Tampilan ringkas tiap jam. Detail lengkap tetap terkirim ke
                backend.
              </p>
            </div>
          </div>
          {entries.length > 0 && (
            <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
              Total pengukuran:{" "}
              <span className="font-semibold text-slate-800">
                {entries.length}
              </span>
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  Jam
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  HR
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  MAP
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  Temp
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  Kesadaran
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  Irama EKG
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  FiO₂ / RR
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  SaO₂ / GCS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {entries.map((e) => (
                <tr
                  key={e.id}
                  className="bg-white/95 transition hover:bg-emerald-50/60"
                >
                  <td className="px-3 py-2 text-center align-middle">
                    <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-mono font-semibold text-sky-700 ring-1 ring-sky-100">
                      <Clock className="h-3 w-3" />
                      {e.jam}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-800">
                    {e.hr}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-800">
                    {e.map}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-800">
                    {e.temp}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-800">
                    {e.kesadaran || "-"}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-800">
                    {e.iramaEkg || "-"}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-800">
                    {(e.fio2 || "-") + " / " + (e.rr || "-")}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-800">
                    {(e.sao2 || "-") +
                      " / " +
                      [e.gcsE, e.gcsM, e.gcsV].filter(Boolean).join("-")}
                  </td>
                </tr>
              ))}

              {entries.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-5 text-center text-xs text-slate-400"
                  >
                    Belum ada data. Isi form di atas untuk mulai mencatat
                    monitoring 24 jam.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Hemodinamik;
