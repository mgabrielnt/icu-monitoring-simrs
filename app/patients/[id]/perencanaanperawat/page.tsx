// C:\faiq\Semester7\Zentra\icu-monitoring-simrs\app\patients\[id]\perencanaanperawat\page.tsx

"use client";

import { usePerencanaanPerawat } from "@/hooks/usePerencanaanPerawat";
import { NURSING_ACTIVITIES } from "@/lib/perencanaanPerawatConstants";
import PerencanaanPerawatForm from "./components/PerencanaanPerawatForm";
import PerencanaanPerawatTable from "./components/PerencanaanPerawatTable";
import PerencanaanPerawatHeader from "./components/PerencanaanPerawatHeader";

interface Props {
  params: {
    id: string;
  };
}

export default function PerencanaanPerawatPage({ params }: Props) {
  const patientId = params.id;

  // ========= HOOKS (Logika reusable) =========
  const { items, loading, creating, error, create } =
    usePerencanaanPerawat(patientId);

  // ========= CONSTANTS (dari lib) =========
  const activities = NURSING_ACTIVITIES;

  // ========= RENDER (UI Components) =========
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <PerencanaanPerawatHeader />

      {/* Form Section */}
      <section className="rounded-2xl border border-emerald-100 bg-white/95 shadow-sm">
        <PerencanaanPerawatForm
          activities={activities}
          onSubmit={create}
          loading={creating}
        />
        
        {/* Error Message */}
        {error && (
          <p className="px-4 pb-3 text-xs text-red-600">{error}</p>
        )}
        
        {/* Loading Message */}
        {loading && !items.length && (
          <p className="px-4 pb-3 text-xs text-emerald-700/80">
            Memuat riwayat implementasi…
          </p>
        )}
      </section>

      {/* Table Section */}
      <section>
        <PerencanaanPerawatTable items={items} loading={loading} />
      </section>
    </div>
  );
}