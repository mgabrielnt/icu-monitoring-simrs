"use client";
import HeaderPatients from "@/components/HeaderPatients";

export default function AlatInvansiveHeroHeader() {
  return (
    <HeaderPatients
      content={{
        subtitle: "Dokumentasi Keperawatan",
        title: "Alat Invasif & Balance Cair",
        description:
          "Form untuk mencatat pemasangan alat invasif, penilaian resiko jatuh, dan balance cairan 24 jam"
      }}
      badges={[
        { label: "ICU", variant: "primary", pulse: true, icon: <></> },
        { label: "Shift Pagi", variant: "secondary" },
        { label: "Online", variant: "success" }
      ]}
    />
  );
}
