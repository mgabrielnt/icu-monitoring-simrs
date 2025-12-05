"use client";
import  HeaderPatients from "@/components/HeaderPatients";

export default function DetailPasienHeader() {
  return (
    <HeaderPatients

      content={{
        subtitle: "Data Pasien",
        title: "Detail Informasi Pasien",
        description: "Informasi lengkap identitas dan riwayat medis pasien"
      }}
      badges={[
        { label: "Data Lengkap", variant: "primary", pulse: true, icon: <></> },
        { label: "Terverifikasi", variant: "success" }
      ]}
    />
  );
}