"use client";

import React from "react";
import { ClipboardList, User, CalendarDays } from "lucide-react";

interface CatatanTerintegrasiHeaderProps {
  noRm?: string;
  tanggal?: string;
  hariPerawatanKe?: number;
}

const CatatanTerintegrasiHeader: React.FC<
  CatatanTerintegrasiHeaderProps
> = ({ noRm, tanggal, hariPerawatanKe }) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-900 via-sky-800 to-sky-700 shadow-lg">
      <div className="relative flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="relative space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-700/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-100/90 ring-1 ring-sky-500/40">
            <span className="h-[1px] w-6 bg-sky-200/80" />
            ICU • Page 6
          </div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-sky-50 sm:text-xl">
            <ClipboardList className="h-5 w-5 text-sky-200" />
            Catatan Perkembangan Terintegrasi
          </h2>
          <p className="max-w-xl text-xs text-sky-100/90">
            Dokumentasikan hasil asesmen, analisa, dan instruksi PPA secara
            kronologis untuk 1 hari perawatan.
          </p>
        </div>

        <div className="relative flex flex-col items-end gap-1 text-[11px] text-sky-100/90">
          {noRm && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-sky-200" />
              <span>
                No. RM:{" "}
                <span className="font-semibold text-sky-50">{noRm}</span>
              </span>
            </div>
          )}
          {tanggal && (
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3 text-sky-200" />
              <span>
                Tanggal:{" "}
                <span className="font-semibold text-sky-50">
                  {tanggal}
                </span>
              </span>
            </div>
          )}
          {typeof hariPerawatanKe !== "undefined" && (
            <span>
              Hari perawatan ke:{" "}
              <span className="font-semibold text-sky-50">
                {hariPerawatanKe}
              </span>
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatatanTerintegrasiHeader;
