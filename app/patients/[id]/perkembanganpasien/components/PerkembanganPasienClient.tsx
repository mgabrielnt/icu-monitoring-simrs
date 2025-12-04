// app/patients/[id]/perkembanganpasien/components/PerkembanganPasienClient.tsx
"use client";

import { useState } from "react";
import { usePerkembanganPasien } from "@/hooks/usePerkembanganPasien";
import { handleSubmitPerkembanganPasien } from "@/handlers/perkembanganPasienHandlers";
import type {
  CreatePerkembanganPasienPayload,
  SOAPCategory,
} from "@/types/perkembanganPasien";
import { toLocalInputValue } from "@/utils/datetime";
import PerkembanganPasienHeader from "./PerkembanganPasienHeader";
import PerkembanganPasienForm from "./PerkembanganPasienForm";
import PerkembanganPasienTable from "./PerkembanganPasienTable";

interface Props {
  patientId: string;
}

export default function PerkembanganPasienClient({ patientId }: Props) {
  const { notes, loading, error, addNote } = usePerkembanganPasien({ patientId });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formValues, setFormValues] = useState<CreatePerkembanganPasienPayload>({
    patientId,
    datetime: toLocalInputValue(),
    assessment: "",
    instruction: "",
    nurseName: "",
    category: "O",
  });

  const handleChange = (
    field: keyof CreatePerkembanganPasienPayload,
    value: string | SOAPCategory,
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const isoDatetime = new Date(formValues.datetime).toISOString();
      const payload: CreatePerkembanganPasienPayload = {
        ...formValues,
        patientId,
        datetime: isoDatetime,
      };

      const created = await handleSubmitPerkembanganPasien(payload);
      addNote(created);

      // reset field teks, biar cepat input berikutnya
      setFormValues((prev) => ({
        ...prev,
        datetime: toLocalInputValue(),
        assessment: "",
        instruction: "",
        nurseName: "",
      }));
    } catch (err) {
      console.error(err);
      setSubmitError("Gagal menyimpan catatan, silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <PerkembanganPasienHeader />

      {error && (
        <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs text-rose-700">
          {error}
        </div>
      )}

      <PerkembanganPasienForm
        values={formValues}
        submitting={submitting}
        submitError={submitError}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <PerkembanganPasienTable notes={notes} loading={loading} />
    </section>
  );
}
