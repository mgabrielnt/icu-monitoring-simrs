// app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatNotesDpjpFields.tsx
"use client";

import { Dispatch, SetStateAction } from "react";

interface Props {
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
  dpjpVerification: string;
  setDpjpVerification: Dispatch<SetStateAction<string>>;
}

export default function PerencanaanPerawatNotesDpjpFields({
  notes,
  setNotes,
  dpjpVerification,
  setDpjpVerification,
}: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
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

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-emerald-900">
          Verifikasi DPJP (Nama / TT)
          <span className="ml-1 text-[10px] font-normal text-emerald-500">
            (opsional)
          </span>
        </label>
        <input
          type="text"
          value={dpjpVerification}
          onChange={(e) => setDpjpVerification(e.target.value)}
          placeholder="Contoh: dr. Andi, Sp.PD / 123456"
          className="h-9 w-full rounded-lg border border-emerald-100 bg-white px-3 text-xs text-emerald-900 outline-none ring-emerald-500/10 placeholder:text-emerald-400 focus:border-emerald-400 focus:ring-2"
        />
      </div>
    </div>
  );
}
