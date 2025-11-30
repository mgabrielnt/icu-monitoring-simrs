import React from "react";
import { FormData } from "./AddPatientModal";
import { Section, InputField } from "./PatientIdentityForm";

interface Props {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PatientResponsibleForm({
  formData,
  onInputChange,
}: Props) {
  return (
    <Section title="PENANGGUNG JAWAB PASIEN" color="green">
      <div className="grid grid-cols-1 gap-3">
        <InputField
          label="Dokter DPJP"
          name="dokterDPJP"
          value={formData.dokterDPJP}
          onChange={onInputChange}
          required
          placeholder="Dr. Nama Dokter, Sp.XX"
        />

        <InputField
          label="Perawat Primer"
          name="perawatPrimer"
          value={formData.perawatPrimer}
          onChange={onInputChange}
          required
          placeholder="Ns. Nama Perawat"
        />

        <InputField
          label="Perawat Jaga"
          name="perawatJaga"
          value={formData.perawatJaga}
          onChange={onInputChange}
          required
          placeholder="Ns. Nama Perawat (Pagi/Sore/Malam)"
        />
      </div>
    </Section>
  );
}
