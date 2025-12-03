"use client";

import { useState, useEffect } from "react";

// ========== HOOK WAKTU – HYDRATION SAFE ==========
function useCurrentDateTime(interval: number) {
  // Mulai dari null supaya SSR & client initial render SAMA
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Set pertama kali setelah komponen mount di client
    setNow(new Date());

    const timer = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(timer);
  }, [interval]);

  return now;
}

// ========== FORMAT TANGGAL & JAM ==========
function formatIndonesianDateLong(date: Date) {
  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return `${days[date.getDay()]}, ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}

function formatTime24(date: Date) {
  // Pakai detik juga (05.58.57)
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

interface PerencanaanPerawatHeaderProps {
  patientId: string;
}

export default function PerencanaanPerawatHeader({
  patientId,
}: PerencanaanPerawatHeaderProps) {
  const now = useCurrentDateTime(1000);

  const tanggal = now ? formatIndonesianDateLong(now) : "—";
  const jam = now ? `${formatTime24(now)} WIB` : "--:--:-- WIB";

  return (
    <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 shadow-2xl">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.12),transparent_50%)]" />

      {/* Floating orbs */}
      <div
        className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl animate-pulse"
        style={{ animationDuration: "5s" }}
      />
      <div
        className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-teal-500/10 blur-3xl animate-pulse"
        style={{ animationDuration: "7s", animationDelay: "1s" }}
      />

      {/* Content */}
      <div className="relative px-5 py-5 sm:px-6 sm:py-6">
        {/* Top row: Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {/* ICU Status */}
          <div className="group relative">
            <div className="absolute -inset-0.5 rounded-full bg-emerald-400/40 blur-sm transition-all duration-300 group-hover:bg-emerald-300/50" />
            <div className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-1.5 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white shadow-sm" />
              </span>
              <span className="text-[11px] font-bold tracking-wide text-white">
                ICU
              </span>
            </div>
          </div>

          <div className="h-4 w-px bg-emerald-400/30" />

          {/* Shift (sementara statis, nanti bisa di-bind ke state shift) */}
          <div className="flex items-center gap-1.5 rounded-full bg-teal-500/25 px-3 py-1.5">
            <svg
              className="h-3 w-3 text-teal-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wide text-teal-50">
              Shift Pagi
            </span>
          </div>

          <div className="h-4 w-px bg-emerald-400/30" />

          {/* Status Online */}
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-100">
              Online
            </span>
          </div>
        </div>

        {/* Main content row */}
        <div className="flex items-center justify-between gap-6">
          {/* Left: Title */}
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-0.5 w-0.5 animate-pulse rounded-full bg-emerald-300/70"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-300/70">
                Dokumentasi Keperawatan
              </span>
            </div>

            <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
              Perencanaan &amp; Implementasi 24 Jam
            </h1>

            <div className="flex items-start gap-2">
              <svg
                className="h-4 w-4 flex-shrink-0 text-emerald-300/80 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-xs leading-relaxed text-emerald-100/75">
                Fokus pada rencana dan tindakan perawat per shift.
              </p>
            </div>

            {/* ID pasien (biar dekat dengan judul) */}
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-emerald-900 shadow-md shadow-black/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>ID Pasien: {patientId}</span>
            </div>
          </div>

          {/* Right: Time & Date */}
          <div className="space-y-1 text-right">
            <div className="text-3xl font-bold tracking-tight text-white tabular-nums drop-shadow-lg sm:text-4xl">
              {jam}
            </div>

            <div className="flex items-center justify-end gap-1.5">
              <svg
                className="h-3.5 w-3.5 text-emerald-300/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-[11px] font-semibold text-emerald-100/90">
                {tanggal}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
    </header>
  );
}
