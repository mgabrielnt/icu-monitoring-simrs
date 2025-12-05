import { Patient } from "@/types/patient";
import HeaderPatients from "@/components/HeaderPatients";

export default function PatientHeader({ patient }: { patient: Patient }) {
  return (
    <HeaderPatients
      patient={patient}
      content={{
        title: patient.nama,          
        subtitle: "Data Pasien",      
        description: `No. RM: ${patient.noRM}` 
      }}
      badges={[
        {
          label: "Aktif",
          variant: "primary",
          pulse: true
        }
      ]}
    />
  );
}
