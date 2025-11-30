import React from "react";
import { FormData } from "./AddPatientModal";

interface Props {
  formData: FormData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
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

/* ===== Reusable small components (boleh dipakai ulang di file lain juga) ===== */

function Section({
  title,
  color,
  children,
}: {
  title: string;
  color: "blue" | "green" | "amber";
  children: React.ReactNode;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    green: "bg-green-50 border-green-200 text-green-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
  };

  return (
    <div className={`rounded-xl p-4 border ${colors[color]}`}>
      <h4 className="font-semibold text-base mb-3">{title}</h4>
      {children}
    </div>
  );
}

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

function InputField({
  label,
  required,
  ...props
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        {...props}
        className={`
          w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm
          ${props.className || ""}
        `}
      />
    </div>
  );
}

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  required?: boolean;
}

function SelectField({
  label,
  options,
  required,
  ...props
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <select
        {...props}
        className={`
          w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm
          ${props.className || ""}
        `}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export { Section, InputField, SelectField };
