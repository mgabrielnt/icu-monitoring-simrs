// file: app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatPageClient.tsx
"use client";

import { usePerencanaanPerawat } from "@/hooks/usePerencanaanPerawat";
import { NURSING_ACTIVITIES } from "@/lib/perencanaanPerawatConstants";
import PerencanaanPerawatForm from "./PerencanaanPerawatForm";
import PerencanaanPerawatTable from "./PerencanaanPerawatTable";
import PerencanaanPerawatHeader from "./PerencanaanPerawatHeader";

interface Props {
  patientId: string;
}

export default function PerencanaanPerawatPageClient({ patientId }: Props) {
  const { items, loading, creating, error, create } =
    usePerencanaanPerawat(patientId);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HEADER GRADIENT */}
      <PerencanaanPerawatHeader patientId={patientId} />

      {/* FORM CARD */}
      <section className="rounded-2xl border border-emerald-100 bg-white/95 shadow-sm">
        <PerencanaanPerawatForm
          activities={NURSING_ACTIVITIES}
          onSubmit={create}
          loading={creating}
        />
        {error && <p className="px-4 pb-3 text-xs text-red-600">{error}</p>}
        {loading && !items.length && (
          <p className="px-4 pb-3 text-xs text-emerald-700/80">
            Memuat riwayat implementasi…
          </p>
        )}
      </section>

      {/* TABLE CARD */}
      <section>
        <PerencanaanPerawatTable items={items} loading={loading} />
      </section>
    </div>
  );
}
