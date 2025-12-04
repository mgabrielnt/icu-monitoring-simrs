import React from "react";
import { Plus, X, Clock } from "lucide-react";
import DetailPasienHeader from "./DetailPasienHeader"; 
import { RespirasiSection } from "./Modal/Respirasi";
import { NeuroSection } from "./Modal/Neuro";
import { CairanMasukSection } from "./Modal/CairanMasuk";
import { CairanKeluarSection } from "./Modal/CairanKeluar";
import { MasalahSection } from "./Modal/Masalah";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  systemTime: string;
  form: any;
  handleChange: (field: string, value: string) => void;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  onSave: () => Promise<void>;
}

const DetailPasienModal: React.FC<Props> = ({ isOpen, onClose, systemTime, form, handleChange, isSubmitting, submitError, submitSuccess, onSave }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <Plus className="h-4 w-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Input Data Detail Pasien</h3>
              <p className="text-[11px] text-slate-600">Jam: {systemTime} (otomatis)</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100 transition"><X className="h-5 w-5 text-slate-500" /></button>
        </div>

        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <RespirasiSection form={form} handleChange={handleChange} />
          <NeuroSection form={form} handleChange={handleChange} />
          <CairanMasukSection form={form} handleChange={handleChange} />
          <CairanKeluarSection form={form} handleChange={handleChange} />
          <MasalahSection form={form} handleChange={handleChange} />
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-5 py-4">
          <div className="flex flex-col gap-1">
            {submitError && <div className="text-[13px] text-rose-600">{submitError}</div>}
            {submitSuccess && <div className="text-[13px] text-emerald-700">Data berhasil disimpan.</div>}
            <div className="text-[11px] text-slate-500">* Field dengan tanda * wajib diisi. Sistem akan menambahkan entri baru ke tabel rekap per jam.</div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onClose} type="button" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition">Batal</button>
            <button onClick={onSave} type="button" disabled={isSubmitting} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white transition ${isSubmitting ? "bg-emerald-400/80 cursor-not-allowed" : "bg-emerald-700 hover:bg-emerald-800"}`}>
              {isSubmitting ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" strokeOpacity="0.2" /><path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="4" strokeLinecap="round" /></svg>
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPasienModal;

