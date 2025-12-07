"use client"; 

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, User, Activity, Stethoscope, Clock } from "lucide-react";
import ContainerContent from "@/components/ContainerContent";
import { usePatientDetail } from "@/hooks/usePatientDetail";
import { createPatientDetailHandlers } from "@/handlers/patientHandlers";
import { formatDateIndonesia } from "@/utils/dashboardUtils";
import PatientHeaderBasic from "./components/PatientHeader";
import PatientInfoCard from "./components/PatientInfoCard";
import PatientDiagnosisCard from "./components/PatientDiagnosisCard";

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = Number(params.id);

  const { patient, loading, error } = usePatientDetail(patientId);
  const { goBack } = createPatientDetailHandlers(router);

  if (loading) {
    return (
      <ContainerContent className="text-center py-12">
        <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Memuat data pasien...</p>
      </ContainerContent>
    );
  }

  if (error || !patient) {
    return (
      <ContainerContent className="text-center border border-red-200 bg-red-50 py-8">
        <div className="text-red-600 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">Error</h2>
        <p className="text-red-600 mb-4">{error || "Pasien tidak ditemukan"}</p>
        <button
          onClick={goBack}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Kembali
        </button>
      </ContainerContent>
    );
  }

  return (
    <div className="space-y-6">

    <div className="space-y-5">
      <PatientHeaderBasic patient={patient} />
    </div>

      {/* GRID INFO PASIEN */}
      <ContainerContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PatientInfoCard icon={Activity} iconColor="text-blue-600" label="No. Rekam Medis" value={patient.noRM} />
          <PatientInfoCard icon={User} iconColor="text-blue-600" label="Nama Lengkap" value={patient.nama} />
          <PatientInfoCard icon={Calendar} iconColor="text-blue-600" label="Tanggal Lahir" value={formatDateIndonesia(patient.tglLahir)} />

          <PatientInfoCard icon={Activity} iconColor="text-green-600" label="Unit Perawatan" value={patient.unit} />
          <PatientInfoCard icon={Clock} iconColor="text-green-600" label="Tanggal Masuk" value={formatDateIndonesia(patient.tglMasuk)} />
          <PatientInfoCard icon={Calendar} iconColor="text-green-600" label="Hari Rawat" value={`Hari ke-${patient.hariKe}`} />

          <PatientInfoCard icon={Activity} iconColor="text-purple-600" label="Berat Badan" value={`${patient.bb} kg`} />
          <PatientInfoCard icon={Activity} iconColor="text-purple-600" label="Tinggi Badan" value={`${patient.tb} cm`} />

          <PatientInfoCard icon={Stethoscope} iconColor="text-red-600" label="Dokter DPJP" value={patient.dokterDPJP} />
          <PatientInfoCard icon={User} iconColor="text-red-600" label="Perawat Primer" value={patient.perawatPrimer} />

          {patient.perawatJaga && (
            <PatientInfoCard icon={User} iconColor="text-red-600" label="Perawat Jaga" value={patient.perawatJaga} />
          )}

          <PatientInfoCard icon={User} iconColor="text-orange-600" label="Penanggung Jawab" value={patient.penanggungJawab || "-"} />
        </div>
      </ContainerContent>

      {/* DIAGNOSIS */}
      <ContainerContent>
        <PatientDiagnosisCard diagnosis={patient.diagnosis} />
      </ContainerContent>

      {/* FOOTER INFO */}
      <ContainerContent>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-sm">
            💡 <strong>Info:</strong> Gunakan menu di atas untuk navigasi ke halaman lain.
          </p>
        </div>
      </ContainerContent>

    </div>
  );
}
