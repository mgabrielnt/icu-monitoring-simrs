"use client";

import React from "react";
import { User, ArrowRight } from "lucide-react";
import { Patient } from "@/types/patient";
import { useRouter } from "next/navigation";

interface PatientHeaderProps {
  patient: Patient;
}

export default function PatientHeader({ patient }: PatientHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-yellow-600 text-white p-6 rounded-t-lg relative">

      {/* BUTTON CANTIK DI KANAN */}
      <button
        onClick={() => router.push("/dashboard")}
        className="
          absolute top-6 right-6
          flex items-center space-x-2
          px-4 py-2
          bg-white/20 backdrop-blur
          text-white font-medium
          rounded-full
          border border-white/30
          hover:bg-white/30 hover:border-white/40
          transition-all duration-300
          shadow-sm
        "
      >
        <span className="text-sm">kembali</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{patient.nama}</h1>
          <p className="text-blue-100 text-sm mt-1">No. RM: {patient.noRM}</p>
        </div>
      </div>
    </div>
  );
}
