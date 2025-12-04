// app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatActivityTimeFields.tsx
"use client";

import { Dispatch, SetStateAction } from "react";
import { PerencanaanPerawatActivity } from "@/types/perencanaanPerawat";

interface Props {
  activities: PerencanaanPerawatActivity[];
  activityId: number;
  setActivityId: (id: number) => void;
  isOtherActivity: boolean;
  customActivityLabel: string;
  setCustomActivityLabel: Dispatch<SetStateAction<string>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
}

export default function PerencanaanPerawatActivityTimeFields({
  activities,
  activityId,
  setActivityId,
  isOtherActivity,
  customActivityLabel,
  setCustomActivityLabel,
  time,
  setTime,
}: Props) {
  return (
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
  );
}
