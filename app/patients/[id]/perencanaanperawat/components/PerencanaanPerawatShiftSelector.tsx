// file: app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatShiftSelector.tsx
"use client";

import { Shift } from "@/types/perencanaanPerawat";

interface Props {
  shift: Shift | null;
  onChange: (shift: Shift) => void;
}

const shifts: { value: Shift; label: string; timeRange: string }[] = [
  { value: "pagi", label: "Pagi", timeRange: "07.00–14.00" },
  { value: "siang", label: "Siang", timeRange: "14.00–21.00" },
  { value: "malam", label: "Malam", timeRange: "21.00–07.00" },
];

export default function PerencanaanPerawatShiftSelector({
  shift,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        Form Perawat Jaga
      </p>
      <p className="text-[11px] text-emerald-700/80">
        Pilih shift terlebih dahulu. Form detail akan muncul setelah shift
        dipilih.
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {shifts.map((s) => {
          const active = shift === s.value;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => onChange(s.value)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition ${
                active
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-emerald-100 bg-white text-emerald-900 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              <span
                className={`h-3 w-3 rounded-full border ${
                  active
                    ? "border-white bg-white"
                    : "border-emerald-400 bg-white"
                }`}
              />
              <span>{s.label}</span>
              <span className="text-[10px] font-normal opacity-80">
                {s.timeRange}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
