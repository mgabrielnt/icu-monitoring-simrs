import HeaderPatients from "@/components/HeaderPatients";

function InstruksiObatHeader() {
  return (
    <HeaderPatients
      content={{
        subtitle: "Farmasi & Terapi",
        title: "Instruksi & Pemberian Obat",
        description: "Catatan pemberian obat dan instruksi medikasi dari dokter"
      }}
      badges={[
        { label: "ICU", variant: "primary", pulse: true, icon: <></> },
        { label: "Farmasi", variant: "secondary" },
        { label: "Aktif", variant: "success" }
      ]}
    />
  );
}

export default InstruksiObatHeader;
