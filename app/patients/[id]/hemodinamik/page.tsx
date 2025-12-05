// page.tsx

"use client";

import React, { useEffect, useState } from "react";
import HemodinamikHeader from "./components/HemodinamikHeader";
import { HemodinamikChart } from "./components/HemodinamikChart";
import { HemodinamikTable } from "./components/HemodinamikTable";
import { HemodinamikModal } from "./components/HemodinamikModal";
import { useHemodinamik } from "@/hooks/useHemodinamik";
import { formatTime } from "@/lib/hemodinamik.utils";
import type { HemodinamikProps, HemodinamikChartData } from "@/types/hemodinamik.types";

const Hemodinamik: React.FC<HemodinamikProps> = ({
  noRm,
  tanggal,
  hariPerawatanKe,
  onSaved,
}) => {
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
    tanggal: tanggal || null,
    hariPerawatanKe: hariPerawatanKe ?? null,
  });

  // Update system time setiap 30 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(formatTime(new Date()));
    }, 30_000);
    return () => clearInterval(timer);
  }, []);

  // Load data dari JSON saat komponen mount
  useEffect(() => {
    loadEntries(noRm);
  }, [noRm, loadEntries]);

  // Handle modal close setelah submit success
  useEffect(() => {
    if (submitSuccess) {
      const timeout = setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
        if (onSaved) onSaved();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [submitSuccess, onSaved, setSubmitSuccess]);

  // Prepare data untuk chart
  const chartData: HemodinamikChartData[] = entries.map((e) => ({
    jam: e.jam,
    Sistol: e.sistol,
    Diastol: e.diastol,
    HR: e.hr,
    MAP: e.map,
    Temp: e.temp,
  }));

  const handleModalSubmit = async () => {
    const success = await handleSubmit();
    if (!success) {
      // Jika gagal, modal tetap terbuka dan error message sudah di-handle di hook
      return;
    }
  };

  return (
    <div className="space-y-5">
    <HemodinamikHeader />


      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
            <p className="mt-3 text-sm text-slate-600">Memuat data...</p>
          </div>
        </div>
      ) : (
        <>
          <HemodinamikChart data={chartData} />
          <HemodinamikTable
            entries={entries}
            onAddClick={() => setIsModalOpen(true)}
          />
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
};

export default Hemodinamik;