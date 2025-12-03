// file: app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatHeader.tsx
"use client";

import { useCurrentDateTime } from "@/hooks/useCurrentDateTime";
import { formatIndonesianDateLong, formatTime24 } from "@/utils/times";

interface PerencanaanPerawatHeaderProps {
  patientId: string;
}

export default function PerencanaanPerawatHeader({
  patientId,
}: PerencanaanPerawatHeaderProps) {
  const now = useCurrentDateTime(1000);
  const tanggal = formatIndonesianDateLong(now);
  const jam = `${formatTime24(now)} WIB`;

  return (
    <header className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
      <div className="relative px-4 py-4 sm:px-6 sm:py-5">
        {/* Dekorasi halus, tetap minimal */}
        <div className="pointer-events-none absolute -right-32 inset-y-0 w-64 bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.45),transparent_65%)] opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.55),transparent_40%,transparent_70%,rgba(15,23,42,0.65))] mix-blend-soft-light" />

        <div className="relative flex flex-col gap-4 sm:gap-5">
          {/* Bar atas: pill ICU + ID pasien */}
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/25 px-3 py-1 text-[11px] font-medium text-emerald-50/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span>ICU • Perencanaan Perawat</span>
            </div>

            <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-emerald-900 shadow-sm shadow-black/30">
              ID Pasien:{" "}
              <span className="ml-1 tabular-nums text-[11px] font-semibold">
                {patientId}
              </span>
            </span>
          </div>

          {/* Konten utama: kiri judul, kanan waktu */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            {/* Judul di kiri */}
            <div className="text-emerald-50">
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
                Perencanaan &amp; Implementasi 24 Jam
              </h1>
              <p className="mt-1 text-[11px] sm:text-xs text-emerald-100/80">
                Fokus pada rencana dan tindakan perawat per shift.
              </p>
            </div>

            {/* Waktu & tanggal di kanan */}
            <div className="text-right">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-100/70">
                Waktu Sistem
              </p>
              <p className="mt-1 text-2xl sm:text-3xl font-semibold text-emerald-50 tabular-nums">
                {jam}
              </p>
              <p className="mt-1 text-xs text-emerald-100/85">{tanggal}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
