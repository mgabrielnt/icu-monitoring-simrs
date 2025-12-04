"use client";

import React, { useEffect, useState } from "react";
import {
  ClipboardList,
  Clock,
  User
} from "lucide-react";

import {
  InstruksiObatItem,
  InstruksiObatHeaderProps,
} from "@/types/instructionTypes";

export default function InstruksiObatHeader({
  hariPerawatan,
  instruksi,
  noRm,
  tanggal,
}: InstruksiObatHeaderProps) {

  const first = instruksi[0] || null;

  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString("id-ID", { hour12: false }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
      <div className="relative flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Background blur effect */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-teal-300/10 blur-3xl" />

        {/* Title */}
        <div className="relative space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90 ring-1 ring-emerald-500/40">
            <span className="h-[1px] w-6 bg-emerald-200/80" />
            ICU • Instruksi Obat
          </div>

          <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-50 sm:text-xl">
            <ClipboardList className="h-5 w-5 text-emerald-200" />
            Instruksi Obat - Hari Perawatan Ke-{hariPerawatan}
          </h2>

          <p className="max-w-xl text-xs text-emerald-100/90">
            Dokumentasi instruksi pemberian obat dan terapi medis pasien ICU
            untuk hari perawatan ke-{hariPerawatan}.
          </p>
        </div>

        {/* Informasi kanan */}
        <div className="relative flex flex-col items-end gap-1 text-[11px] text-emerald-100/90">
          {/* Jam realtime */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/70 px-3 py-1 ring-1 ring-emerald-500/40">
            <Clock className="h-3.5 w-3.5 text-emerald-200" />
            <span>
              Jam sistem:{" "}
              <span className="font-mono font-semibold text-emerald-50">
                {systemTime}
              </span>
            </span>
          </div>

          {/* No RM */}
          {noRm && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-emerald-200" />
              <span>
                No. RM:{" "}
                <span className="font-semibold text-emerald-50">{noRm}</span>
              </span>
            </div>
          )}

          {/* Tanggal */}
          {tanggal && (
            <span>
              Tanggal:{" "}
              <span className="font-semibold text-emerald-50">{tanggal}</span>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
