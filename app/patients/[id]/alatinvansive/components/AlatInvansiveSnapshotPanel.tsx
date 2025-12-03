"use client";

import type { AlatInvansiveSnapshot } from "@/types/alatinvansive";

interface Props {
  snapshot: AlatInvansiveSnapshot;
  onOpenInvansif: () => void;
  onOpenResikoJatuh: () => void;
  onOpenBalanceCair: () => void;
}

export default function AlatInvansiveSnapshotPanel({
  snapshot,
  onOpenInvansif,
  onOpenResikoJatuh,
  onOpenBalanceCair,
}: Props) {
  const { invansifCount, latestResiko, latestBalance } = snapshot;

  return (
    <section className="overflow-hidden rounded-2xl border border-emerald-50 bg-white shadow-sm">
      {/* BARIS ATAS: tombol aksi */}
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Form Yang Tersedia
          </p>
          <p className="mt-0.5 text-xs text-slate-600">
            Pilih form yang ingin diisi. Snapshot di bawah akan terupdate setelah
            form tersimpan.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onOpenInvansif}
            className="inline-flex items-center justify-center rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm ring-1 ring-emerald-200 transition hover:bg-white hover:shadow-md"
          >
            + Invasif / Tube
          </button>

          <button
            type="button"
            onClick={onOpenResikoJatuh}
            className="inline-flex items-center justify-center rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 shadow-sm ring-1 ring-amber-200 transition hover:bg-white hover:shadow-md"
          >
            + Resiko Jatuh (PR)
          </button>

          <button
            type="button"
            onClick={onOpenBalanceCair}
            className="inline-flex items-center justify-center rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-900 shadow-sm ring-1 ring-sky-200 transition hover:bg-white hover:shadow-md"
          >
            + Balance Cair 24 Jam
          </button>
        </div>
      </div>

      {/* BARIS BAWAH: snapshot ringkasan */}
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="grid gap-4 md:grid-cols-3">
          {/* 1) Snapshot Invasif / Tube */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-3">
            <p className="text-[11px] font-medium text-emerald-800">
              Snapshot Invasif / Tube
            </p>
            <p className="mt-1 text-lg font-semibold text-emerald-950">
              {invansifCount} form tersimpan
            </p>
          </div>

          {/* 2) Resiko Jatuh */}
          <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3">
            <p className="text-[11px] font-medium text-amber-800">
              Resiko Jatuh • Total Skor PR (terakhir)
            </p>
            <p className="mt-1 text-lg font-semibold text-amber-950">
              {latestResiko ?? "-"}
            </p>
          </div>

          {/* 3) Balance Cair */}
          <div className="rounded-xl border border-sky-100 bg-sky-50 px-3 py-3">
            <p className="text-[11px] font-medium text-sky-800">
              Balance Cair 24 Jam (BC 24 Jam / Kumulatif)
            </p>
            <p className="mt-1 text-lg font-semibold text-sky-950">
              {latestBalance?.bc24Jam ?? "-"}{" "}
              <span className="text-xs font-normal text-sky-700">/</span>{" "}
              {latestBalance?.bcKumulatif ?? "-"}{" "}
              <span className="text-xs text-sky-600">cc</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
