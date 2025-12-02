// app/patients/[id]/alatinvansive/components/AlatInvasifFooter.tsx

"use client";

import React from "react";

interface AlatInvasifFooterProps {
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
}

const AlatInvasifFooter: React.FC<AlatInvasifFooterProps> = ({
  isSubmitting,
  submitError,
  submitSuccess,
}) => {
  return (
    <footer className="flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[11px] text-slate-500">
        Data dikirim ke{" "}
        <code className="rounded bg-slate-100 px-1 py-0.5 text-[10px]">
          /monitoring/page-2
        </code>{" "}
        di backend Anda untuk disimpan sebagai alat_invasif, risiko_jatuh, dan
        balance_cairan.
      </p>
      <div className="flex items-center gap-2">
        {submitError && (
          <span className="text-[11px] text-rose-600">{submitError}</span>
        )}
        {submitSuccess && (
          <span className="text-[11px] text-emerald-700">
            Data tersimpan. ✅
          </span>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-emerald-700 px-5 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Page 2"}
        </button>
      </div>
    </footer>
  );
};

export default AlatInvasifFooter;
