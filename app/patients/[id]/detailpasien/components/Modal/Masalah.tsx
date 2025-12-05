import React from "react";
import { FileText } from "lucide-react";

interface Props {
  form: any;
  handleChange: (field: string, value: string) => void;
}

export const MasalahSection: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <div className="space-y-3 rounded-xl border border-rose-200 bg-rose-50/50 p-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-rose-700" />
        <h4 className="text-sm font-semibold text-rose-900">E. Masalah & Tindakan</h4>
      </div>

      <div className="space-y-2">
        <label className="block text-[11px] font-medium text-slate-700">1. Masalah (singkat)</label>
        <textarea value={form.masalah} onChange={(e) => handleChange("masalah", e.target.value)} placeholder="contoh: Hipoksemia / Pneumonia ..." rows={3} className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
      </div>

      <div className="space-y-2">
        <label className="block text-[11px] font-medium text-slate-700">2. Tindakan / Obat</label>
        <textarea value={form.tindakanObat} onChange={(e) => handleChange("tindakanObat", e.target.value)} placeholder="contoh: NaCl 500 cc, Antibiotik IV, Naikkan FiO2 ..." rows={3} className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500" />
      </div>
    </div>
  );
};

