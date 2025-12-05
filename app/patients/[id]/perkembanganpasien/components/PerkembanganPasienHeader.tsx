"use client";
import  HeaderPatients  from "@/components/HeaderPatients";

export default function InstruksiObatHeader() {
  return (
    <HeaderPatients
      content={{
        subtitle: "Progress Note",
        title: "Perkembangan Kondisi Pasien",
        description: "Catatan perkembangan kondisi dan respon terapi pasien"
      }}
      badges={[
        { label: "ICU", variant: "primary", pulse: true, icon: <></> },
        { label: "Progress Note", variant: "secondary" },
        { label: "Terkini", variant: "success" }
      ]}
    />
  );
}
