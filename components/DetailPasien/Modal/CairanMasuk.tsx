import React from "react";
import { Droplets } from "lucide-react";

interface Props {
  form: any;
  handleChange: (field: string, value: string) => void;
}

export const CairanMasukSection: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <div className="space-y-3 rounded-xl border border-blue-200 bg-blue-50/50 p-4">
      <div className="flex items-center gap-2">
        <Droplets className="h-5 w-5 text-blue-700" />
        <h4 className="text-sm font-semibold text-blue-900">C. Cairan Masuk</h4>
      </div>

      <div className="space-y-2">
        <label className="block text-[11px] font-semibold text-slate-700">1. Line</label>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1"><label className="block text-[10px] text-slate-600">Nama Cairan</label><input type="text" value={form.lineNama} onChange={(e) => handleChange("lineNama", e.target.value)} placeholder="contoh: NaCl 0.9%" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
          <div className="space-y-1"><label className="block text-[10px] text-slate-600">Jumlah</label><input type="text" value={form.lineJumlah} onChange={(e) => handleChange("lineJumlah", e.target.value)} placeholder="contoh: 100 cc" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
          <div className="space-y-1"><label className="block text-[10px] text-slate-600">Total (per 6 jam)</label><input type="text" value={form.lineTotal} onChange={(e) => handleChange("lineTotal", e.target.value)} placeholder="optional" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-[11px] font-semibold text-slate-700">2. Enteral</label>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1"><label className="block text-[10px] text-slate-600">Nama Cairan</label><input type="text" value={form.enteralNama} onChange={(e) => handleChange("enteralNama", e.target.value)} placeholder="contoh: Susu Formula" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
          <div className="space-y-1"><label className="block text-[10px] text-slate-600">Jumlah</label><input type="text" value={form.enteralJumlah} onChange={(e) => handleChange("enteralJumlah", e.target.value)} placeholder="contoh: 200 cc" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
          <div className="space-y-1"><label className="block text-[10px] text-slate-600">Total (per 6 jam)</label><input type="text" value={form.enteralTotal} onChange={(e) => handleChange("enteralTotal", e.target.value)} placeholder="optional" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" /></div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-[11px] font-semibold text-slate-700">3. Total Cairan Masuk</label>
        <input type="text" value={form.masukTotal} onChange={(e) => handleChange("masukTotal", e.target.value)} placeholder="contoh: 500 cc" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
      </div>
    </div>
  );
};

