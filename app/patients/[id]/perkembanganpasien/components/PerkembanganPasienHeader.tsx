// app/patients/[id]/perkembanganpasien/components/PerkembanganPasienHeader.tsx
"use client";

export default function PerkembanganPasienHeader() {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
      <div className="px-6 py-5 text-white">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
              Perkembangan pasien • SOAP / ADIME
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              Catatan Perkembangan Harian
            </h1>
            <p className="mt-1 max-w-xl text-[11px] text-emerald-100/90">
              Tulis perkembangan pasien dalam format SOAP/ADIME. Sertakan kategori{" "}
              <span className="font-semibold">O, A, P</span>, hasil asessmen, instruksi
              PPA termasuk pasca bedah, dan paraf perawat.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/40 bg-emerald-900/40 px-4 py-3 text-[11px]">
            <p className="font-semibold text-emerald-100">Ringkasan Singkat</p>
            <ul className="mt-1 space-y-0.5 text-emerald-100/90">
              <li>
                <span className="font-semibold">O</span> – Objective (data hasil
                pengukuran & observasi).
              </li>
              <li>
                <span className="font-semibold">A</span> – Assessmen (analisis perawat).
              </li>
              <li>
                <span className="font-semibold">P</span> – Plan (rencana tindak lanjut).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
