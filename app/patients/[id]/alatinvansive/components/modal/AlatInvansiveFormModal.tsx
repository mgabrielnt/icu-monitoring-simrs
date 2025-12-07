// D:\projek-medis\icu-monitoring-simrs\app\patients\[id]\alatinvansive\components\AlatInvansiveFormModal.tsx

import { useEffect, useState } from "react";

export interface DeviceTriplet {
  ukuran?: string;
  lokasi?: string;
  tanggal?: string;
}

type InvansifKey = "ivLine" | "cvc" | "arterialLine" | "swansGanz";
type TubeKey =
  | "ottNttTt"
  | "ngt"
  | "wsd"
  | "drain"
  | "urineKateter"
  | "lunak";

// Punya index signature supaya unionnya bisa di-index dengan string
interface InvansifGroup {
  ivLine?: DeviceTriplet;
  cvc?: DeviceTriplet;
  arterialLine?: DeviceTriplet;
  swansGanz?: DeviceTriplet;
  [key: string]: DeviceTriplet | undefined;
}

interface TubeGroup {
  ottNttTt?: DeviceTriplet;
  ngt?: DeviceTriplet;
  wsd?: DeviceTriplet;
  drain?: DeviceTriplet;
  urineKateter?: DeviceTriplet;
  lunak?: DeviceTriplet;
  [key: string]: DeviceTriplet | undefined;
}

export interface InvansifTubeFormData {
  invansif: InvansifGroup;
  tube: TubeGroup;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: InvansifTubeFormData) => Promise<string | null>;
  isSubmitting: boolean;
}

const EMPTY: InvansifTubeFormData = {
  invansif: {
    ivLine: {},
    cvc: {},
    arterialLine: {},
    swansGanz: {},
  },
  tube: {
    ottNttTt: {},
    ngt: {},
    wsd: {},
    drain: {},
    urineKateter: {},
    lunak: {},
  },
};

export default function AlatInvansiveFormModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
}: Props) {
  const [form, setForm] = useState<InvansifTubeFormData>(EMPTY);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setForm(EMPTY);
      setServerError(null);
    }
  }, [open]);

  if (!open) return null;

  const updateTriplet =
    (
      group: "invansif" | "tube",
      key: InvansifKey | TubeKey,
      field: keyof DeviceTriplet
    ) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setForm((prev) => ({
        ...prev,
        [group]: {
          ...(prev[group] as InvansifGroup | TubeGroup),
          [key]: {
            ...((prev[group] as InvansifGroup | TubeGroup)[key] ?? {}),
            [field]: value,
          },
        } as InvansifGroup | TubeGroup,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const msg = await onSubmit(form);
    if (msg) setServerError(msg);
  };

  const renderRow = (
    label: string,
    group: "invansif" | "tube",
    key: InvansifKey | TubeKey
  ) => {
    const triplet = (form[group] as InvansifGroup | TubeGroup)[key] ?? {};

    return (
      <div
        key={`${group}-${key}`}
        className="grid grid-cols-[minmax(120px,0.8fr)_repeat(3,minmax(0,1fr))] items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2"
      >
        <div className="text-xs font-semibold text-slate-700">{label}</div>
        <input
          value={triplet.ukuran ?? ""}
          onChange={updateTriplet(group, key, "ukuran")}
          className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-900 outline-none ring-emerald-500/0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
          placeholder="Ukuran"
        />
        <input
          value={triplet.lokasi ?? ""}
          onChange={updateTriplet(group, key, "lokasi")}
          className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-900 outline-none ring-emerald-500/0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
          placeholder="Lokasi"
        />
        <input
          type="date"
          value={triplet.tanggal ?? ""}
          onChange={updateTriplet(group, key, "tanggal")}
          className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-900 outline-none ring-emerald-500/0 transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/40"
        />
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 px-3">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-5 py-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-600">
              Form Invasif &amp; Tube
            </p>
            <h2 className="text-sm font-semibold text-slate-900">
              Pemasangan Alat Invasif / Tube
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[75vh] space-y-4 overflow-y-auto px-5 py-4 sm:px-6"
        >
          {/* Title 1: Invasif */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-emerald-500" />
              <h3 className="text-sm font-semibold text-slate-900">
                Invasif
              </h3>
            </div>
            <p className="text-[11px] text-slate-500">
              Isi ukuran, lokasi, dan tanggal pemasangan (opsional).
            </p>

            <div className="mt-2 space-y-2">
              <div className="grid grid-cols-[minmax(120px,0.8fr)_repeat(3,minmax(0,1fr))] gap-2 text-[11px] font-semibold text-slate-500">
                <div>Jenis Alat</div>
                <div>Ukuran</div>
                <div>Lokasi</div>
                <div>Tanggal</div>
              </div>

              {renderRow("IV Line", "invansif", "ivLine")}
              {renderRow("CVC", "invansif", "cvc")}
              {renderRow("Arterial Line", "invansif", "arterialLine")}
              {renderRow("Swans Ganz", "invansif", "swansGanz")}
            </div>
          </div>

          {/* Title 2: Tube */}
          <div className="space-y-2 pt-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-sky-500" />
              <h3 className="text-sm font-semibold text-slate-900">Tube</h3>
            </div>

            <div className="mt-2 space-y-2">
              <div className="grid grid-cols-[minmax(120px,0.8fr)_repeat(3,minmax(0,1fr))] gap-2 text-[11px] font-semibold text-slate-500">
                <div>Jenis Alat</div>
                <div>Ukuran</div>
                <div>Lokasi</div>
                <div>Tanggal</div>
              </div>

              {renderRow("OTT / NTT / TT", "tube", "ottNttTt")}
              {renderRow("NGT", "tube", "ngt")}
              {renderRow("WSD", "tube", "wsd")}
              {renderRow("Drain", "tube", "drain")}
              {renderRow("Urine Kateter", "tube", "urineKateter")}
              {renderRow("Lunak", "tube", "lunak")}
            </div>
          </div>

          {serverError && (
            <p className="rounded-lg border border-rose-100 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {serverError}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
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
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-500"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Form"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
