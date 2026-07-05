"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HemodinamikHeader from "./components/HemodinamikHeader";
import { HemodinamikChart } from "./components/HemodinamikChart";
import { HemodinamikTable } from "./components/HemodinamikTable";
import { HemodinamikModal } from "./components/HemodinamikModal";
import { useHemodinamik } from "@/hooks/useHemodinamik";
import { formatTime } from "@/lib/hemodinamik.utils";
import type { HemodinamikChartData } from "@/types/hemodinamik.types";

export default function HemodinamikPage() {
  const params = useParams<{ id: string }>();
  const noRm = params?.id ?? "";
  const tanggal = new Date().toISOString().slice(0, 10);
  const hariPerawatanKe = null;

  const [systemTime, setSystemTime] = useState<string>(formatTime(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    entries,
    form,
    isSubmitting,
    isLoading,
    submitError,
    submitSuccess,
    handleChange,
    handleSubmit,
    setSubmitSuccess,
    loadEntries,
  } = useHemodinamik({
    noRm: noRm || null,
    tanggal,
    hariPerawatanKe,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(formatTime(new Date()));
    }, 30_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadEntries(noRm);
  }, [noRm, loadEntries]);

  useEffect(() => {
    if (submitSuccess) {
      const timeout = setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [submitSuccess, setSubmitSuccess]);

  const chartData: HemodinamikChartData[] = entries.map((entry) => ({
    jam: entry.jam,
    Sistol: entry.sistol,
    Diastol: entry.diastol,
    HR: entry.hr,
    MAP: entry.map,
    Temp: entry.temp,
  }));

  const handleModalSubmit = async () => {
    const success = await handleSubmit();
    if (!success) return;
  };

  return (
    <div className="space-y-5">
      <HemodinamikHeader />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
            <p className="mt-3 text-sm text-slate-600">Memuat data...</p>
          </div>
        </div>
      ) : (
        <>
          <HemodinamikChart data={chartData} />
          <HemodinamikTable entries={entries} onAddClick={() => setIsModalOpen(true)} />
        </>
      )}

      <HemodinamikModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        systemTime={systemTime}
        form={form}
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
        onFormChange={handleChange}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
