import React from "react";
import { Droplets } from "lucide-react";

interface Props {
  form: any;
  handleChange: (field: string, value: string) => void;
}

export const CairanKeluarSection: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <div className="space-y-3 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
      <div className="flex items-center gap-2">
        <Droplets className="h-5 w-5 text-amber-700" />
        <h4 className="text-sm font-semibold text-amber-900">D. Cairan Keluar</h4>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1"><label className="block text-[11px] font-medium text-slate-700">1. NGT</label><input type="text" value={form.ngt} onChange={(e) => handleChange("ngt", e.target.value)} placeholder="contoh: 50 cc" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" /></div>
        <div className="space-y-1"><label className="block text-[11px] font-medium text-slate-700">2. Urine</label><input type="text" value={form.urine} onChange={(e) => handleChange("urine", e.target.value)} placeholder="contoh: 300 cc" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" /></div>
        <div className="space-y-1"><label className="block text-[11px] font-medium text-slate-700">3. BAB</label><input type="text" value={form.bab} onChange={(e) => handleChange("bab", e.target.value)} placeholder="contoh: 100 cc" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" /></div>
        <div className="space-y-1"><label className="block text-[11px] font-medium text-slate-700">4. Drain</label><input type="text" value={form.drain} onChange={(e) => handleChange("drain", e.target.value)} placeholder="contoh: 75 cc" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" /></div>
      </div>

      <div className="space-y-1 mt-3">
        <label className="block text-[11px] font-semibold text-slate-700">5. Total Cairan Keluar</label>
        <input type="text" value={form.keluarTotal} onChange={(e) => handleChange("keluarTotal", e.target.value)} placeholder="contoh: 500 cc (atau biarkan kosong untuk auto-hitung)" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
        <p className="text-[11px] text-slate-500">Tip: Anda dapat mengisi manual atau biarkan kosong lalu gunakan tombol Simpan — sistem akan mencoba mengisi otomatis jika angka pada field lain terdeteksi.</p>
      </div>
    </div>
  );
};

