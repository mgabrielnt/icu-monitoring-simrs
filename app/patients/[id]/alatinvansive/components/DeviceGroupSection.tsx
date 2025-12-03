"use client";

import React from "react";
import type {
  DeviceRowUI,
  DeviceField,
  DeviceCode,
} from "@/types/monitoring";

interface DeviceGroupSectionProps {
  title: string;
  rows: DeviceRowUI[];
  updateDeviceField: (
    code: DeviceCode,
    field: DeviceField,
    value: string
  ) => void;
}

const DeviceGroupSection: React.FC<DeviceGroupSectionProps> = ({
  title,
  rows,
  updateDeviceField,
}) => {
  if (!rows.length) return null;

  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>

      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.code}
            className="grid gap-2 text-xs sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] sm:text-sm"
          >
            {/* Nama alat */}
            <div className="flex flex-col justify-center">
              <span className="text-[11px] font-medium text-slate-700">
                {row.label}
              </span>
            </div>

            {/* Ukuran */}
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-500">Ukuran</span>
              <input
                value={row.ukuran}
                onChange={(e) =>
                  updateDeviceField(row.code, "ukuran", e.target.value)
                }
                placeholder="mis. 16G, 7.0 mm"
                className="mt-0.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Lokasi + Tgl pasang */}
            <div className="flex flex-col sm:flex-row sm:gap-2">
              <div className="flex-1">
                <span className="text-[11px] text-slate-500">Lokasi</span>
                <input
                  value={row.lokasi}
                  onChange={(e) =>
                    updateDeviceField(row.code, "lokasi", e.target.value)
                  }
                  placeholder="mis. Vena perifer kanan"
                  className="mt-0.5 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="flex-1">
                <span className="text-[11px] text-slate-500">
                  Tanggal pasang
                </span>
                <input
                  type="date"
                  value={row.tglPasang}
                  onChange={(e) =>
                    updateDeviceField(row.code, "tglPasang", e.target.value)
                  }
                  className="mt-0.5 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceGroupSection;
