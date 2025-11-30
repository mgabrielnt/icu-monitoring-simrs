// app/dashboard/addpatient/PatientIdentityForm.tsx
import React from "react";
import { Section, InputField, SelectField } from "@/components/FormComponents";
import { AddPatientFormData } from "@/types/patient";

interface Props {
  formData: AddPatientFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function PatientIdentityForm({ formData, onInputChange }: Props) {
  return (
    <Section title="IDENTITAS PASIEN" color="blue">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputField
          label="No. Rekam Medis"
          name="noRM"
          value={formData.noRM}
          onChange={onInputChange}
          required
          placeholder="RM-2024-XXX"
        />

        <SelectField
          label="Unit"
          name="unit"
          value={formData.unit}
          onChange={onInputChange}
          required
          options={["ICU", "IGD / Resusitasi"]}
        />

        <InputField
          label="Nama Lengkap"
          name="nama"
          value={formData.nama}
          onChange={onInputChange}
          required
          placeholder="Nama lengkap pasien"
        />

        <InputField
          label="Tanggal Lahir"
          name="tglLahir"
          type="date"
          value={formData.tglLahir}
          onChange={onInputChange}
          required
        />

        <InputField
          label="Berat Badan (kg)"
          name="bb"
          type="number"
          value={formData.bb}
          onChange={onInputChange}
          required
          placeholder="70"
        />

        <InputField
          label="Tinggi Badan (cm)"
          name="tb"
          type="number"
          value={formData.tb}
          onChange={onInputChange}
          required
          placeholder="170"
        />

        <InputField
          label="Tanggal Masuk"
          name="tanggalMasuk"
          type="date"
          value={formData.tanggalMasuk}
          onChange={onInputChange}
          required
        />

        <InputField
          label="Hari Ke-"
          name="hariKe"
          type="number"
          min={1}
          value={formData.hariKe}
          onChange={onInputChange}
          required
          placeholder="1"
        />
      </div>
    </Section>
  );
}