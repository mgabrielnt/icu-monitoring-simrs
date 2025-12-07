// D:\projek-medis\icu-monitoring-simrs\app\patients\[id]\alatinvansive\components\BalanceCairFormModal.tsx

import { useEffect, useState } from "react";

export interface BalanceCairFormData {
  masuk?: number | null;
  keluar?: number | null;
  iwl?: number | null;
  bc24Jam?: number | null;
  bcSebelumnya?: number | null;
  bcKumulatif?: number | null;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BalanceCairFormData) => Promise<string | null>;
  isSubmitting: boolean;
}

const fields: { key: keyof BalanceCairFormData; label: string }[] = [
  { key: "masuk", label: "Masuk" },
  { key: "keluar", label: "Keluar" },
  { key: "iwl", label: "IWL" },
  { key: "bc24Jam", label: "BC 24 Jam" },
  { key: "bcSebelumnya", label: "BC Sebelumnya" },
  { key: "bcKumulatif", label: "BC Kumulatif" },
];

export default function BalanceCairFormModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
}: Props) {
  const [state, setState] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setState({});
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const payload: BalanceCairFormData = {};
    for (const { key } of fields) {
      const raw = state[key as string];
      if (raw !== undefined && raw !== "") {
        const num = Number(raw);
        if (Number.isNaN(num)) {
          setError(`Kolom ${key} harus berupa angka.`);
          return;
        }
        payload[key] = num;
      }
    }

    const msg = await onSubmit(payload);
    if (msg) setError(msg);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-3">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 bg-sky-50/70 px-5 py-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sky-700">
              Balance Cairan 24 Jam
            </p>
            <h2 className="text-sm font-semibold text-slate-900">
              Input Volume (cc)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-100 bg-white text-slate-500 transition hover:bg-sky-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-3 px-5 py-4 sm:grid-cols-2 sm:px-6"
        >
          {fields.map(({ key, label }) => (
            <div key={key} className="space-y-1.5">
              <label className="flex items-center justify-between text-xs font-medium text-slate-800">
                <span>{label}</span>
                <span className="text-[10px] text-slate-500">cc</span>
              </label>
              <input
                type="number"
                value={state[key] ?? ""}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-sky-500/0 transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                placeholder="0"
              />
            </div>
          ))}

          <div className="col-span-full space-y-2 pt-1">
            {error && (
              <p className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-500"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Balance"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
