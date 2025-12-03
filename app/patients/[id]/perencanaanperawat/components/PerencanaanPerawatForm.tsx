// file: app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatForm.tsx

"use client";

import { useState, FormEvent, useMemo } from "react";
import {
  CreatePerencanaanPerawatImplementationPayload,
  Shift,
  PerencanaanPerawatActivity,
} from "@/types/perencanaanPerawat";

interface Props {
  activities: PerencanaanPerawatActivity[];
  onSubmit: (
    payload: CreatePerencanaanPerawatImplementationPayload
  ) => Promise<unknown>;
  loading?: boolean;
}

const shifts: { value: Shift; label: string; timeRange: string }[] = [
  { value: "pagi", label: "Pagi", timeRange: "07.00–14.00" },
  { value: "siang", label: "Siang", timeRange: "14.00–21.00" },
  { value: "malam", label: "Malam", timeRange: "21.00–07.00" },
];

export default function PerencanaanPerawatForm({
  activities,
  onSubmit,
  loading,
}: Props) {
  const [shift, setShift] = useState<Shift | null>(null);
  const [activityId, setActivityId] = useState<number>(activities[0]?.id ?? 1);
  const [customActivityLabel, setCustomActivityLabel] = useState("");
  const [nurseName, setNurseName] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedActivity = useMemo(
    () => activities.find((a) => a.id === activityId),
    [activities, activityId]
  );

  const isOtherActivity =
    selectedActivity?.label.toLowerCase().startsWith("kegiatan lain") ?? false;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!shift) {
      setError("Silakan pilih shift perawat jaga terlebih dahulu.");
      return;
    }
    if (!nurseName.trim() || !bedNumber.trim() || !time) {
      setError("Nama perawat, tempat tidur, dan jam wajib diisi.");
      return;
    }
    if (isOtherActivity && !customActivityLabel.trim()) {
      setError("Kegiatan lain wajib diisi.");
      return;
    }

    const payload: CreatePerencanaanPerawatImplementationPayload = {
      activityId,
      customActivityLabel: isOtherActivity
        ? customActivityLabel.trim()
        : undefined,
      nurseName,
      bedNumber,
      shift,
      time,
      notes: notes || undefined,
    };

    try {
      await onSubmit(payload);
      setSuccess("Tindakan berhasil disimpan.");
      setTime("");
      setNotes("");
      if (isOtherActivity) {
        setCustomActivityLabel("");
      }
    } catch (err: any) {
      setError(err?.message ?? "Gagal menyimpan data.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 pb-4 pt-4 sm:px-5 sm:pt-5"
    >
      {/* Shift selector */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Form Perawat Jaga
        </p>
        <p className="text-[11px] text-emerald-700/80">
          Pilih shift terlebih dahulu. Form detail akan muncul setelah shift
          dipilih.
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {shifts.map((s) => {
            const active = shift === s.value;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => setShift(s.value)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition ${
                  active
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-emerald-100 bg-white text-emerald-900 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                <span
                  className={`h-3 w-3 rounded-full border ${
                    active
                      ? "border-white bg-white"
                      : "border-emerald-400 bg-white"
                  }`}
                />
                <span>{s.label}</span>
                <span className="text-[10px] font-normal opacity-80">
                  {s.timeRange}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form detail – hanya muncul kalau shift sudah dipilih */}
      {shift && (
        <div className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-25/40 p-3 sm:p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-emerald-900">
                Nama Perawat
              </label>
              <input
                type="text"
                value={nurseName}
                onChange={(e) => setNurseName(e.target.value)}
                placeholder="Contoh: Ns. Budi, S.Kep"
                className="h-9 w-full rounded-lg border border-emerald-100 bg-white px-3 text-xs text-emerald-900 outline-none ring-emerald-500/10 placeholder:text-emerald-400 focus:border-emerald-400 focus:ring-2"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-emerald-900">
                Tempat Tidur
              </label>
              <input
                type="text"
                value={bedNumber}
                onChange={(e) => setBedNumber(e.target.value)}
                placeholder="Contoh: ICU-03 / Bed 5"
                className="h-9 w-full rounded-lg border border-emerald-100 bg-white px-3 text-xs text-emerald-900 outline-none ring-emerald-500/10 placeholder:text-emerald-400 focus:border-emerald-400 focus:ring-2"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-emerald-900">
                Jenis Kegiatan
              </label>
              <select
                value={activityId}
                onChange={(e) => setActivityId(Number(e.target.value))}
                className="h-9 w-full rounded-lg border border-emerald-100 bg-white px-3 text-xs text-emerald-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10"
              >
                {activities.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.id}. {a.label}
                  </option>
                ))}
              </select>

              {isOtherActivity && (
                <div className="mt-2 space-y-1">
                  <label className="text-[11px] font-medium text-emerald-900">
                    Kegiatan lain (tulis manual)
                  </label>
                  <input
                    type="text"
                    value={customActivityLabel}
                    onChange={(e) => setCustomActivityLabel(e.target.value)}
                    placeholder="Contoh: Edukasi keluarga tentang penggunaan alat…"
                    className="h-9 w-full rounded-lg border border-emerald-100 bg-white px-3 text-xs text-emerald-900 outline-none ring-emerald-500/10 placeholder:text-emerald-400 focus:border-emerald-400 focus:ring-2"
                  />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-emerald-900">
                Jam Pelaksanaan (24 Jam)
              </label>
              <input
                type="time"
                step={60}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-9 w-full rounded-lg border border-emerald-100 bg-white px-3 text-xs text-emerald-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-emerald-900">
              Catatan Tambahan / Instruksi PPA
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Contoh: Monitor tanda vital tiap 4 jam, edukasi keluarga terkait posisi nyaman dan latihan napas dalam…"
              className="w-full rounded-lg border border-emerald-100 bg-white px-3 py-2 text-xs text-emerald-900 outline-none placeholder:text-emerald-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[11px] text-emerald-700/80">
              Implementasi akan otomatis muncul di{" "}
              <span className="font-semibold">tabel riwayat</span> di bawah.
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-emerald-700/30 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
            >
              {loading ? "Menyimpan…" : "Simpan Implementasi"}
            </button>
          </div>

          {error && (
            <p className="text-[11px] font-medium text-red-600">{error}</p>
          )}
          {success && (
            <p className="text-[11px] font-medium text-emerald-700">
              {success}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
