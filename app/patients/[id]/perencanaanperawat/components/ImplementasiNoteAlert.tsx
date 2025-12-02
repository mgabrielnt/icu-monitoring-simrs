// app/patients/[id]/perencanaanperawat/components/ImplementasiNoteAlert.tsx

"use client";

import React from "react";

const ImplementasiNoteAlert: React.FC = () => {
  return (
    <section className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/80 p-3 text-[11px] text-amber-800">
      <div className="flex gap-2">
        <svg
          className="mt-[2px] h-4 w-4 flex-none text-amber-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <p>
          <span className="font-semibold">Catatan:</span> Jam pelaksanaan hanya
          diambil dari sistem ketika tombol{" "}
          <span className="font-semibold">“Simpan Kegiatan”</span> ditekan,
          tidak bisa diubah manual.
        </p>
      </div>
    </section>
  );
};

export default ImplementasiNoteAlert;
