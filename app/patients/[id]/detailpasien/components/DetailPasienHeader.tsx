import { Patient } from "@/types/patient";
import { HeaderPatients } from "@/components/HeaderPatients";

function DetailPasienHeader({ patient }: { patient: Patient }) {
  return (
    <HeaderPatients
      patient={patient}
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