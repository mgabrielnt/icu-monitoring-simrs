"use client";

import React, { useEffect, useState } from "react";
import DetailPasienHeader from "@/components/DetailPasien/DetailPasienHeader";
import DetailPasienTable from "@/components/DetailPasien/DetailPasienTable";
import DetailPasienModal from "@/components/DetailPasien/DetailPasienModal";
import type { DetailEntry, DetailPasienProps } from "@/types/detailPatient";
import { Activity, Clock, Plus } from "lucide-react";

const createId = () => Math.random().toString(36).slice(2);

const formatTime = (date: Date) =>
  date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const DetailPasien: React.FC<DetailPasienProps> = ({ noRm, tanggal, hariPerawatanKe, onSaved }) => {
  const [systemTime, setSystemTime] = useState<string>(formatTime(new Date()));
  const [entries, setEntries] = useState<DetailEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(formatTime(new Date())), 30_000);
    return () => clearInterval(timer);
  }, []);

  const [form, setForm] = useState({
    sao2: "",
    tipeVent: "",
    peep: "",
    rr: "",
    tv: "",
    fio2: "",
    sputumVol: "",
    mataR: "",
    mataL: "",
    mataRespon: "",
    kakiRespon: "",
    tanganRespon: "",
    gcsE: "",
    gcsM: "",
    gcsV: "",
    gcsVType: "",
    lineNama: "",
    lineJumlah: "",
    lineTotal: "",
    enteralNama: "",
    enteralJumlah: "",
    enteralTotal: "",
    masukTotal: "",
    ngt: "",
    urine: "",
    bab: "",
    drain: "",
    keluarTotal: "",
    masalah: "",
    tindakanObat: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!form.sao2 || !form.rr) {
      setSubmitError("SaO2 dan RR wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const now = new Date();
      const jam = formatTime(now);

      const entry: DetailEntry = {
        id: createId(),
        jam,
        ...form,
      } as unknown as DetailEntry;

      setEntries((prev) => [...prev, entry]);

      const payload = {
        meta: { noRm: noRm || null, tanggal: tanggal || null, hariPerawatanKe: hariPerawatanKe ?? null },
        detail: entry,
      };

      try {
        const response = await fetch("/api/monitoring/detail-pasien", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          console.error("POST /api/monitoring/detail-pasien gagal");
        }
      } catch (err) {
        console.error("POST /api/monitoring/detail-pasien gagal:", err);
      }

      setForm({
        sao2: "",
        tipeVent: "",
        peep: "",
        rr: "",
        tv: "",
        fio2: "",
        sputumVol: "",
        mataR: "",
        mataL: "",
        mataRespon: "",
        kakiRespon: "",
        tanganRespon: "",
        gcsE: "",
        gcsM: "",
        gcsV: "",
        gcsVType: "",
        lineNama: "",
        lineJumlah: "",
        lineTotal: "",
        enteralNama: "",
        enteralJumlah: "",
        enteralTotal: "",
        masukTotal: "",
        ngt: "",
        urine: "",
        bab: "",
        drain: "",
        keluarTotal: "",
        masalah: "",
        tindakanObat: "",
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitSuccess(false);
      }, 1500);

      if (onSaved) onSaved();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan");
    } finally {
      setIsSubmitting(false);
    }
  };

  // onSave wrapper (keeps original pre-submit auto-calc logic)
  const onSave = async () => {
    const extract = (s: string) => {
      const m = s && s.toString().match(/(\d+(\.\d+)?)/);
      return m ? parseFloat(m[0]) : 0;
    };

    if (!form.masukTotal) {
      const totalMasuk = extract(form.lineJumlah) + extract(form.enteralJumlah);
      if (totalMasuk > 0) setForm((prev) => ({ ...prev, masukTotal: `${totalMasuk} cc` }));
    }

    if (!form.keluarTotal) {
      const totalKeluar = extract(form.ngt) + extract(form.urine) + extract(form.bab) + extract(form.drain);
      if (totalKeluar > 0) setForm((prev) => ({ ...prev, keluarTotal: `${totalKeluar} cc` }));
    }

    await new Promise((r) => setTimeout(r, 20));
    await handleSubmit();
  };

  return (
    <div className="space-y-5">
      <DetailPasienHeader systemTime={systemTime} noRm={noRm} tanggal={tanggal} hariPerawatanKe={hariPerawatanKe} />

      <section className="flex justify-end">
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-emerald-50 shadow-sm hover:bg-emerald-800 transition"><Plus className="h-4 w-4" /> Input Data Detail Pasien</button>
      </section>

      <DetailPasienTable entries={entries} />

      <DetailPasienModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} systemTime={systemTime} form={form} handleChange={(f, v) => handleChange(f as any, v)} isSubmitting={isSubmitting} submitError={submitError} submitSuccess={submitSuccess} onSave={onSave} />
    </div>
  );
};

export default DetailPasien;
