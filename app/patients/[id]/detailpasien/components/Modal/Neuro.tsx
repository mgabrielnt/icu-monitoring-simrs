import React from "react";
import { Brain, Footprints, Hand } from "lucide-react";

interface Props {
  form: any;
  handleChange: (field: string, value: string) => void;
}

export const NeuroSection: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <div className="space-y-3 rounded-xl border border-purple-200 bg-purple-50/50 p-4">
      <div className="flex items-center gap-2">
        <Brain className="h-5 w-5 text-purple-700" />
        <h4 className="text-sm font-semibold text-purple-900">B. Neuro</h4>
      </div>

      <div className="space-y-2">
        <label className="block text-[11px] font-medium text-slate-700">1. Mata Ukuran</label>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1">
            <label className="block text-[10px] text-slate-600">Kanan (R)</label>
            <input type="number" value={form.mataR} onChange={(e) => handleChange("mataR", e.target.value)} placeholder="mm" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500" />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] text-slate-600">Kiri (L)</label>
            <input type="number" value={form.mataL} onChange={(e) => handleChange("mataL", e.target.value)} placeholder="mm" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500" />
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] text-slate-600">Respon Mata</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-1 text-xs"><input type="radio" name="mataRespon" value="+" checked={form.mataRespon === "+"} onChange={(e) => handleChange("mataRespon", e.target.value)} className="text-purple-600" /> <span>+ (respon)</span></label>
              <label className="flex items-center gap-1 text-xs"><input type="radio" name="mataRespon" value="-" checked={form.mataRespon === "-"} onChange={(e) => handleChange("mataRespon", e.target.value)} className="text-purple-600" /> <span>- (non respon)</span></label>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700 flex items-center gap-1"><Footprints className="h-3.5 w-3.5" /> 2. Kaki</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-1 text-xs"><input type="radio" name="kakiRespon" value="+" checked={form.kakiRespon === "+"} onChange={(e) => handleChange("kakiRespon", e.target.value)} className="text-purple-600" /> <span>+ (respon)</span></label>
            <label className="flex items-center gap-1 text-xs"><input type="radio" name="kakiRespon" value="-" checked={form.kakiRespon === "-"} onChange={(e) => handleChange("kakiRespon", e.target.value)} className="text-purple-600" /> <span>- (non respon)</span></label>
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-700 flex items-center gap-1"><Hand className="h-3.5 w-3.5" /> 3. Tangan</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-1 text-xs"><input type="radio" name="tanganRespon" value="+" checked={form.tanganRespon === "+"} onChange={(e) => handleChange("tanganRespon", e.target.value)} className="text-purple-600" /> <span>+ (respon)</span></label>
            <label className="flex items-center gap-1 text-xs"><input type="radio" name="tanganRespon" value="-" checked={form.tanganRespon === "-"} onChange={(e) => handleChange("tanganRespon", e.target.value)} className="text-purple-600" /> <span>- (non respon)</span></label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-[11px] font-medium text-slate-700">4. GCS</label>
        <div className="grid gap-3 md:grid-cols-4">
          <div className="space-y-1"><label className="block text-[10px] text-slate-600">E (Eye)</label><input type="number" value={form.gcsE} onChange={(e) => handleChange("gcsE", e.target.value)} placeholder="1-4" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500" /></div>
          <div className="space-y-1"><label className="block text-[10px] text-slate-600">M (Motorik)</label><input type="number" value={form.gcsM} onChange={(e) => handleChange("gcsM", e.target.value)} placeholder="1-6" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500" /></div>
          <div className="space-y-1"><label className="block text-[10px] text-slate-600">V (Verbal)</label><input type="number" value={form.gcsV} onChange={(e) => handleChange("gcsV", e.target.value)} placeholder="1-5" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500" /></div>
          <div className="space-y-1"><label className="block text-[10px] text-slate-600">V Type</label>
            <div className="flex gap-2">
              <label className="flex items-center gap-1 text-xs"><input type="radio" name="gcsVType" value="ETT" checked={form.gcsVType === "ETT"} onChange={(e) => handleChange("gcsVType", e.target.value)} className="text-purple-600" /> <span>ETT</span></label>
              <label className="flex items-center gap-1 text-xs"><input type="radio" name="gcsVType" value="Non ETT" checked={form.gcsVType === "Non ETT"} onChange={(e) => handleChange("gcsVType", e.target.value)} className="text-purple-600" /> <span>Non ETT</span></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

