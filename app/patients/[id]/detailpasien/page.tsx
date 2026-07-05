"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DetailPasienHeader from "./components/DetailPasienHeader";
import DetailPasienTable from "./components/DetailPasienTable";
import DetailPasienModal from "./components/DetailPasienModal";
import type { DetailEntry } from "@/types/detailPatient";
import { Plus } from "lucide-react";

const createId = () => Math.random().toString(36).slice(2);

const formatTime = (date: Date) =>
  date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export default function DetailPasienPage() {
  const params = useParams<{ id: string }>();
  const noRm = params?.id ?? "";
  const tanggal = new Date().toISOString().slice(0, 10);
  const hariPerawatanKe = null;

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
      } as DetailEntry;

      setEntries((prev) => [...prev, entry]);

      const payload = {
        meta: { noRm: noRm || null, tanggal, hariPerawatanKe },
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
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan");
    } finally {
      setIsSubmitting(false);
    }
  };

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

    await new Promise((resolve) => setTimeout(resolve, 20));
    await handleSubmit();
  };

  return (
    <div className="space-y-5">
      <DetailPasienHeader />

      <section className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-xs font-semibold text-emerald-50 shadow-sm transition hover:bg-emerald-800"
        >
          <Plus className="h-4 w-4" /> Input Data Detail Pasien
        </button>
      </section>

      <DetailPasienTable entries={entries} />

      <DetailPasienModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        systemTime={systemTime}
        form={form}
        handleChange={(field, value) => handleChange(field as keyof typeof form, value)}
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
        onSave={onSave}
      />
    </div>
  );
}
