"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  HeartPulse,
  User,
  CalendarDays,
  Clock,
  Plus,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface HemodinamikProps {
  noRm?: string;
  tanggal?: string;
  hariPerawatanKe?: number;
  onSaved?: () => void;
}

interface HemodinamikEntry {
  id: string;
  jam: string;
  sistol: number;
  diastol: number;
  hr: number;
  map: number;
  temp: number;
  kesadaran: string;
  iramaEkg: string;
  skorNyeri: string;
  cvp?: string;
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
  "Gelisah",
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

const Hemodinamik: React.FC<HemodinamikProps> = ({
  noRm,
  tanggal,
  hariPerawatanKe,
  onSaved,
}) => {
  const [systemTime, setSystemTime] = useState<string>(formatTime(new Date()));
  const [entries, setEntries] = useState<HemodinamikEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(formatTime(new Date()));
    }, 30_000);
    return () => clearInterval(timer);
  }, []);

  const [form, setForm] = useState({
    sistol: "",
    diastol: "",
    hr: "",
    map: "",
    temp: "",
    kesadaran: "",
    iramaEkg: "",
    skorNyeri: "",
    cvp: "",
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

  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitSuccess(false);

    if (
      !validateRange(form.sistol, 30, 250) ||
      !validateRange(form.diastol, 30, 250) ||
      !validateRange(form.hr, 30, 250) ||
      !validateRange(form.map, 30, 250) ||
      !validateRange(form.temp, 30, 50)
    ) {
      setSubmitError(
        "Sistol, Diastol, HR, MAP (30-250) dan Temp (30-50) harus dalam rentang yang valid."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      const jam = formatTime(now);

      const entry: HemodinamikEntry = {
        id: createId(),
        jam,
        sistol: Number(form.sistol),
        diastol: Number(form.diastol),
        hr: Number(form.hr),
        map: Number(form.map),
        temp: Number(form.temp),
        kesadaran: form.kesadaran,
        iramaEkg: form.iramaEkg,
        skorNyeri: form.skorNyeri,
        cvp: form.cvp || undefined,
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

      // Kirim ke backend
      try {
        const response = await fetch("/api/monitoring/hemodinamik", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          console.error("POST /api/monitoring/hemodinamik gagal");
        }
      } catch (err) {
        console.error("POST /api/monitoring/hemodinamik gagal:", err);
      }

      setForm({
        sistol: "",
        diastol: "",
        hr: "",
        map: "",
        temp: "",
        kesadaran: "",
        iramaEkg: "",
        skorNyeri: "",
        cvp: "",
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 1500);

      if (onSaved) onSaved();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare data untuk chart
  const chartData = entries.map((e) => ({
    jam: e.jam,
    Sistol: e.sistol,
    Diastol: e.diastol,
    HR: e.hr,
    MAP: e.map,
    Temp: e.temp,
  }));

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
        <div className="relative flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-teal-300/10 blur-3xl" />

          <div className="relative space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90 ring-1 ring-emerald-500/40">
              <span className="h-[1px] w-6 bg-emerald-200/80" />
              ICU • HEMODINAMIK
            </div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-50 sm:text-xl">
              <Activity className="h-5 w-5 text-emerald-200" />
              Monitoring Hemodinamik 24 Jam
            </h2>
            <p className="max-w-xl text-xs text-emerald-100/90">
              Input data vital sign dan monitoring hemodinamik per jam dengan grafik real-time.
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
                  <span className="font-semibold text-emerald-50">{noRm}</span>
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

      {/* GRAFIK HEMODINAMIK */}
      <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
            <Activity className="h-4 w-4 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Grafik Hemodinamik
            </h3>
            <p className="text-[11px] text-slate-600">
              Visualisasi data Temp, MAP, HR, Sistol, Diastol per jam
            </p>
          </div>
        </div>

        {entries.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="jam"
                tick={{ fontSize: 11 }}
                stroke="#64748b"
              />
              <YAxis
                domain={[0, 250]}
                tick={{ fontSize: 11 }}
                stroke="#64748b"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.95)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "11px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "11px" }}
                iconType="line"
              />
              <Line
                type="monotone"
                dataKey="Temp"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Temp (°C)"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="MAP"
                stroke="#10b981"
                strokeWidth={2}
                name="MAP (mmHg)"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="HR"
                stroke="#ef4444"
                strokeWidth={2}
                name="HR (x/menit)"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="Sistol"
                stroke="#000000"
                strokeWidth={2}
                name="Sistol (mmHg)"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="Diastol"
                stroke="#1f2937"
                strokeWidth={2}
                name="Diastol (mmHg)"
                dot={{ r: 3 }}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="relative h-[350px] rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  tick={{ fontSize: 11 }}
                  stroke="#64748b"
                  label={{ value: "Jam", position: "insideBottom", offset: -5, fontSize: 11 }}
                />
                <YAxis
                  domain={[0, 250]}
                  tick={{ fontSize: 11 }}
                  stroke="#64748b"
                  label={{ value: "Nilai", angle: -90, position: "insideLeft", fontSize: 11 }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px" }}
                  iconType="line"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Activity className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                <p className="text-sm font-medium text-slate-500">
                  Grafik Belum Tersedia
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Mulai input data untuk melihat visualisasi grafik
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* TABEL DATA */}
      <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <HeartPulse className="h-4 w-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Data Hemodinamik 24 Jam
              </h3>
              <p className="text-[11px] text-slate-600">
                Rekap monitoring per jam
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-emerald-50 shadow-sm hover:bg-emerald-800 transition"
          >
            <Plus className="h-4 w-4" />
            Input Data
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-xs">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  Jam
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  Sistol
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  Diastol
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
                  Skor Nyeri
                </th>
                <th className="border-b border-slate-200 px-3 py-2 text-center">
                  CVP
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
                  <td className="px-3 py-2 text-center text-xs font-semibold text-slate-800">
                    {e.sistol}
                  </td>
                  <td className="px-3 py-2 text-center text-xs font-semibold text-slate-800">
                    {e.diastol}
                  </td>
                  <td className="px-3 py-2 text-center text-xs font-semibold text-red-600">
                    {e.hr}
                  </td>
                  <td className="px-3 py-2 text-center text-xs font-semibold text-green-600">
                    {e.map}
                  </td>
                  <td className="px-3 py-2 text-center text-xs font-semibold text-blue-600">
                    {e.temp}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-700">
                    {e.kesadaran || "-"}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-700">
                    {e.iramaEkg || "-"}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-700">
                    {e.skorNyeri || "-"}
                  </td>
                  <td className="px-3 py-2 text-center text-xs text-slate-700">
                    {e.cvp || "-"}
                  </td>
                </tr>
              ))}

              {entries.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-8 text-center text-xs text-slate-400"
                  >
                    Belum ada data. Klik tombol "Input Data" untuk mulai mencatat monitoring.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL INPUT */}
      {isModalOpen && (
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
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 hover:bg-slate-100 transition"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
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
                      onChange={(e) => handleChange("sistol", e.target.value)}
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
                      onChange={(e) => handleChange("diastol", e.target.value)}
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
                    onChange={(e) => handleChange("hr", e.target.value)}
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
                    onChange={(e) => handleChange("map", e.target.value)}
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
                    onChange={(e) => handleChange("temp", e.target.value)}
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
                    onChange={(e) => handleChange("kesadaran", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="">Pilih kesadaran</option>
                    {opsiKesadaran.map((o) => (
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
                    onChange={(e) => handleChange("iramaEkg", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="">Pilih irama</option>
                    {opsiIramaEkg.map((o) => (
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
                    onChange={(e) => handleChange("skorNyeri", e.target.value)}
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
                    onChange={(e) => handleChange("cvp", e.target.value)}
                    placeholder="contoh: 10 cmH₂O"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Error & Success Messages */}
              {submitError && (
                <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-[11px] text-rose-700">
                  {submitError}
                </div>
              )}
              {submitSuccess && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-[11px] text-emerald-700">
                  ✅ Data berhasil disimpan!
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="rounded-full bg-emerald-700 px-5 py-2 text-xs font-semibold text-emerald-50 shadow-sm hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70 transition"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Data"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hemodinamik;