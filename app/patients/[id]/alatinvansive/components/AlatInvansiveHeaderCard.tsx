// D:\projek-medis\icu-monitoring-simrs\app\patients\[id]\alatinvansive\components\AlatInvansiveHeaderCard.tsx



// ...path sama seperti sebelumnya

import type { AlatInvansiveSnapshot } from "@/types/alatinvansive";

interface Props {
  patientId: string;
  snapshot: AlatInvansiveSnapshot;
  onOpenInvansif: () => void;
  onOpenResikoJatuh: () => void;
  onOpenBalanceCair: () => void;
}
interface Snapshot {
  invansifCount: number;
  latestResiko: number | null;
  latestBalance: {
    bc24Jam?: number | null;
    bcKumulatif?: number | null;
  } | null;
}

export default function AlatInvansiveHeaderCard({
  patientId,
  snapshot,
  onOpenInvansif,
  onOpenResikoJatuh,
  onOpenBalanceCair,
}: Props) {
  const { invansifCount, latestResiko, latestBalance } = snapshot;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
      <div className="flex flex-col justify-between gap-4 border-b border-emerald-700/60 bg-emerald-900/40 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/70">
            ICU – Monitoring
          </p>
          <h1 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
            Pemasangan Alat Invasif / Tube
          </h1>
          <p className="mt-1 text-sm text-emerald-50/80">
            Digitalisasi form invasif, resiko jatuh, dan balance cairan dalam
            satu tampilan yang bersih dan mudah dipakai.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-900/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-emerald-100 ring-1 ring-emerald-500/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            ID Pasien: {patientId}
          </span>

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
      </div>

      <div className="bg-white/95 px-5 py-5 sm:px-6 sm:py-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-3">
            <p className="text-[11px] font-medium text-emerald-800">
              Snapshot Invasif / Tube
            </p>
            <p className="mt-1 text-lg font-semibold text-emerald-950">
              {invansifCount} form tersimpan
            </p>
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-3">
            <p className="text-[11px] font-medium text-amber-800">
              Resiko Jatuh • Total Skor PR (terakhir)
            </p>
            <p className="mt-1 text-lg font-semibold text-amber-950">
              {latestResiko ?? "-"}
            </p>
          </div>

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
    </div>
  );
}
