import HeaderPatients from "@/components/HeaderPatients";

export default function HemodinamikHeader() {
  return (
    <HeaderPatients
      content={{
        subtitle: "Monitoring Vital Sign",
        title: "Pemantauan Hemodinamik",
        description:
          "Pencatatan dan monitoring tanda-tanda vital pasien secara berkala",
      }}
      badges={[
        { label: "ICU", variant: "primary", pulse: true, icon: <></> },
        { label: "Monitoring Aktif", variant: "warning" },
        { label: "Real-time", variant: "success" },
      ]}
    />
  );
}
