"use client";
import HeaderPatients from "@/components/HeaderPatients";

export default function PerencanaanPerawatHeader() {
  return (
    <HeaderPatients
      content={{
        subtitle: "Dokumentasi Keperawatan",
        title: "Perencanaan & Implementasi 24 Jam",
        description: "Fokus pada rencana dan tindakan perawat per shift",
      }}
      badges={[
        { label: "ICU", variant: "primary", pulse: true, icon: <></> },
        { label: "Shift Siang", variant: "secondary" },
        { label: "Online", variant: "success" },
      ]}
    />
  );
}
