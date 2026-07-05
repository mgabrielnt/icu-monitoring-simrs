"use client";

import { useParams } from "next/navigation";
import { usePerencanaanPerawat } from "@/hooks/usePerencanaanPerawat";
import { NURSING_ACTIVITIES } from "@/lib/perencanaanPerawatConstants";
import PerencanaanPerawatForm from "./components/PerencanaanPerawatForm";
import PerencanaanPerawatTable from "./components/PerencanaanPerawatTable";
import PerencanaanPerawatHeader from "./components/PerencanaanPerawatHeader";

export default function PerencanaanPerawatPage() {
  const params = useParams<{ id: string }>();
  const patientId = params?.id ?? "";
  const { items, loading, creating, error, create } = usePerencanaanPerawat(patientId);
  const activities = NURSING_ACTIVITIES;

  return (
    <div className="space-y-4 sm:space-y-6">
      <PerencanaanPerawatHeader />
      <section className="rounded-2xl border border-emerald-100 bg-white/95 shadow-sm">
        <PerencanaanPerawatForm activities={activities} onSubmit={create} loading={creating} />
        {error && <p className="px-4 pb-3 text-xs text-red-600">{error}</p>}
        {loading && !items.length && (
          <p className="px-4 pb-3 text-xs text-emerald-700/80">Loading...</p>
        )}
      </section>
      <section>
        <PerencanaanPerawatTable items={items} loading={loading} />
      </section>
    </div>
  );
}
