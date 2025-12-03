// app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatIdentityFields.tsx
"use client";

import { Dispatch, SetStateAction } from "react";

interface Props {
  nurseName: string;
  setNurseName: Dispatch<SetStateAction<string>>;
  bedNumber: string;
  setBedNumber: Dispatch<SetStateAction<string>>;
}

export default function PerencanaanPerawatIdentityFields({
  nurseName,
  setNurseName,
  bedNumber,
  setBedNumber,
}: Props) {
  return (
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
  );
}
