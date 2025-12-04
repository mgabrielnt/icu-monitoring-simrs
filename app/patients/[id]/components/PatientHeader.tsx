"use client";

import React from "react";
import { User, ArrowLeft, Activity } from "lucide-react";
// Import Link dari next/link
import Link from "next/link"; 

// Mock Patient type untuk demo
interface Patient {
  nama: string;
  noRM: string;
  tanggalLahir?: string;
  jenisKelamin?: string;
}

interface PatientHeaderProps {
  patient: Patient;
  // Prop onBack tidak lagi diperlukan karena kita akan menggunakan Link
  // onBack?: () => void;
}

// Hapus prop onBack dari destructuring
export default function PatientHeader({ patient }: PatientHeaderProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
      <div className="relative flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Decorative blur effects */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-teal-300/10 blur-3xl" />

        {/* Patient Info */}
        <div className="relative flex items-center gap-4">
          {/* Avatar Circle */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700/50 ring-2 ring-emerald-500/40 backdrop-blur-sm">
            <User className="h-8 w-8 text-emerald-100" />
          </div>

          {/* Patient Details */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90 ring-1 ring-emerald-500/40">
              <span className="h-[1px] w-6 bg-emerald-200/80" />
              Data Pasien
            </div>
            <h1 className="text-2xl font-bold text-emerald-50 sm:text-3xl">
              {patient.nama}
            </h1>
            <div className="flex items-center gap-2 text-sm text-emerald-100/90">
              <Activity className="h-4 w-4 text-emerald-200" />
              <span>
                No. RM:{" "}
                <span className="font-semibold text-emerald-50">
                  {patient.noRM}
                </span>
              </span>
            </div>
          </div>
        </div>

        <Link 
          href="/dashboard" 
          className="relative flex items-center gap-2 rounded-full bg-emerald-700/50 px-5 py-2.5 text-sm font-semibold text-emerald-50 ring-1 ring-emerald-500/40 backdrop-blur-sm transition-all hover:bg-emerald-600/60 hover:ring-emerald-400/50 active:scale-95"
          // Tambahkan role="button" untuk aksesibilitas jika diinginkan
          role="button" 
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali</span>
        </Link>
      </div>
    </section>
  );
}