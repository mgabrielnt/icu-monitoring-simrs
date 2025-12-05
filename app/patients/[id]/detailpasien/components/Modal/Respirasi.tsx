import React from "react";
import { Wind } from "lucide-react";

interface Props {
  form: any;
  handleChange: (field: string, value: string) => void;
}

export const RespirasiSection: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <div className="space-y-3 rounded-xl border border-cyan-200 bg-cyan-50/50 p-4">
      <div className="flex items-center gap-2">
        <Wind className="h-5 w-5 text-cyan-700" />
        <h4 className="text-sm font-semibold text-cyan-900">A. Respirasi</h4>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">1. SaO2/SpO2 (%) *</label>
          <input type="text" required value={form.sao2} onChange={(e) => handleChange("sao2", e.target.value)} placeholder="contoh: 98%" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
        </div>
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">2. Tipe Vent</label>
          <input type="text" value={form.tipeVent} onChange={(e) => handleChange("tipeVent", e.target.value)} placeholder="contoh: SIMV" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
        </div>
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">3. PEEP/CPAP (6-10)</label>
          <input type="number" min={6} max={10} value={form.peep} onChange={(e) => handleChange("peep", e.target.value)} placeholder="6 - 10" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">4. RR (10-30) *</label>
          <input type="number" min={10} max={30} required value={form.rr} onChange={(e) => handleChange("rr", e.target.value)} placeholder="10 - 30" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
        </div>
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">5. T.V.</label>
          <input type="number" value={form.tv} onChange={(e) => handleChange("tv", e.target.value)} placeholder="contoh: 450" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
        </div>
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">6. FiO2 (%)</label>
          <input type="text" value={form.fio2} onChange={(e) => handleChange("fio2", e.target.value)} placeholder="contoh: 50%" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
        </div>
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700">7. Sputum/Vol (optional)</label>
          <input type="text" value={form.sputumVol} onChange={(e) => handleChange("sputumVol", e.target.value)} placeholder="contoh: 50 cc" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" />
        </div>
      </div>
    </div>
  );
};

