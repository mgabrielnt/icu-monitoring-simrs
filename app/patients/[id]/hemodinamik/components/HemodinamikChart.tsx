// components/HemodinamikChart.tsx

"use client";

import React from "react";
import { Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CHART_CONFIG } from "@/lib/hemodinamik.constants";
import type { HemodinamikChartData } from "@/types/hemodinamik.types";

interface HemodinamikChartProps {
  data: HemodinamikChartData[];
}

export const HemodinamikChart: React.FC<HemodinamikChartProps> = ({ data }) => {
  const hasData = data.length > 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
          <Activity className="h-4 w-4 text-emerald-700" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Grafik Hemodinamik
          </h3>
          <p className="text-[11px] text-slate-600">
            Visualisasi data Temp, MAP, HR, Sistol, Diastol per jam
          </p>
        </div>
      </div>

      {hasData ? (
        <ResponsiveContainer width="100%" height={CHART_CONFIG.HEIGHT}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="jam" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis
              domain={CHART_CONFIG.Y_DOMAIN}
              tick={{ fontSize: 11 }}
              stroke="#64748b"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255,255,255,0.95)",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "11px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} iconType="line" />
            <Line
              type="monotone"
              dataKey="Temp"
              stroke={CHART_CONFIG.COLORS.TEMP}
              strokeWidth={2}
              name="Temp (°C)"
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="MAP"
              stroke={CHART_CONFIG.COLORS.MAP}
              strokeWidth={2}
              name="MAP (mmHg)"
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="HR"
              stroke={CHART_CONFIG.COLORS.HR}
              strokeWidth={2}
              name="HR (x/menit)"
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Sistol"
              stroke={CHART_CONFIG.COLORS.SISTOL}
              strokeWidth={2}
              name="Sistol (mmHg)"
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Diastol"
              stroke={CHART_CONFIG.COLORS.DIASTOL}
              strokeWidth={2}
              name="Diastol (mmHg)"
              dot={{ r: 3 }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="relative h-[350px] rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50">
          <ResponsiveContainer width="100%" height={CHART_CONFIG.HEIGHT}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                tick={{ fontSize: 11 }}
                stroke="#64748b"
                label={{
                  value: "Jam",
                  position: "insideBottom",
                  offset: -5,
                  fontSize: 11,
                }}
              />
              <YAxis
                domain={CHART_CONFIG.Y_DOMAIN}
                tick={{ fontSize: 11 }}
                stroke="#64748b"
                label={{
                  value: "Nilai",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 11,
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} iconType="line" />
            </LineChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Activity className="mx-auto mb-3 h-12 w-12 text-slate-300" />
              <p className="text-sm font-medium text-slate-500">
                Grafik Belum Tersedia
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Mulai input data untuk melihat visualisasi grafik
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};