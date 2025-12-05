// components/HemodinamikHeader.tsx

"use client";

import React from "react";
import { Activity, Clock, User, CalendarDays } from "lucide-react";

interface HemodinamikHeaderProps {
  systemTime: string;
  noRm?: string;
  tanggal?: string;
  hariPerawatanKe?: number;
}

export const HemodinamikHeader: React.FC<HemodinamikHeaderProps> = ({
  systemTime,
  noRm,
  tanggal,
  hariPerawatanKe,
}) => {
  return (
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
            Input data vital sign dan monitoring hemodinamik per jam dengan
            grafik real-time.
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
                <span className="font-semibold text-emerald-50">{tanggal}</span>
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
  );
};