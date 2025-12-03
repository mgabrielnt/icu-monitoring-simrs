"use client";

import React from "react";

interface ImplementasiFooterProps {
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}

const ImplementasiFooter: React.FC<ImplementasiFooterProps> = ({
  isSubmitting,
  submitError,
  submitSuccess,
}) => {
  return (
    <footer className="flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[11px] text-slate-500">
        Catat jam dan paraf setelah kegiatan dilakukan sepanjang 24
        jam hari tersebut.
      </p>
      <div className="flex items-center gap-2">
        {submitError && (
          <span className="text-[11px] text-rose-600">
            {submitError}
          </span>
        )}
        {submitSuccess && !submitError && (
          <span className="text-[11px] text-emerald-700">
            Data tersimpan. ✅
          </span>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-slate-50 shadow-sm hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Implementasi"}
        </button>
      </div>
    </footer>
  );
};

export default ImplementasiFooter;
