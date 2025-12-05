"use client";

import { User, ArrowLeft, Activity } from "lucide-react";
import { useDateTime } from "@/hooks/useDateTime";
import { dateFormatter } from "@/lib/dateFormatter";
import type { Badge, HeaderPatientsProps } from "@/types/headerPatients";

const badgeVariants = {
  primary: "bg-gradient-to-r from-emerald-500 to-emerald-600",
  secondary: "bg-teal-500/25",
  success: "bg-emerald-500/20",
  warning: "bg-amber-500/25"
};

function BadgeComponent({ badge }: { badge: Badge }) {
  const variant = badge.variant || "primary";
  const isPrimary = variant === "primary";

  if (isPrimary && badge.pulse) {
    return (
      <div className="group relative">
        <div className="absolute -inset-0.5 rounded-full bg-emerald-400/40 blur-sm transition-all duration-300 group-hover:bg-emerald-300/50" />
        <div className={`relative flex items-center gap-2 rounded-full ${badgeVariants[variant]} px-3 py-1.5 shadow-lg`}>
          {badge.icon && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white shadow-sm" />
            </span>
          )}
          <span className="text-[11px] font-bold tracking-wide text-white uppercase">
            {badge.label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 rounded-full ${badgeVariants[variant]} px-3 py-1.5`}>
      {badge.icon}
      <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-50">
        {badge.label}
      </span>
    </div>
  );
}

export default function HeaderPatients({
  patient, // ← opsional
  content,
  badges = [],
  showBackButton = true,
  backButtonHref = "/dashboard",
  onBackClick
}: HeaderPatientsProps) {
  const now = useDateTime(1000);
  const tanggal = now ? dateFormatter.formatIndonesianDateLong(now) : "—";
  const jam = now ? `${dateFormatter.formatTime24(now)} WIB` : "--:--:-- WIB";

  const handleBackClick = (e: React.MouseEvent) => {
    if (onBackClick) {
      e.preventDefault();
      onBackClick();
    }
  };

  return (
    <div className="space-y-4">
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.12),transparent_50%)]" />

        <div className="relative px-5 py-5 sm:px-6 sm:py-6">

          {/* Badges */}
          {badges.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2">
                  <BadgeComponent badge={badge} />
                  {index < badges.length - 1 && (
                    <div className="h-4 w-px bg-emerald-400/30" />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">

              {/* Subtitle */}
              <div className="mb-2 flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-0.5 w-0.5 animate-pulse rounded-full bg-emerald-300/70"
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-300/70">
                  {content.subtitle}
                </span>
              </div>

              {/* Title */}
              <h2 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                {content.title}
              </h2>

              {/* Description */}
              {content.description && (
                <p className="text-xs leading-relaxed text-emerald-100/75">
                  {content.description}
                </p>
              )}

              {/* Data Pasien (hanya muncul jika patient ada) */}
              {patient && (
                <div className="mt-3 flex items-center gap-2 text-sm text-emerald-100/90">
                  <Activity className="h-4 w-4 text-emerald-200" />
                  <span>
                    No. RM:{" "}
                    <span className="font-semibold text-emerald-50">
                      {patient.noRM}
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* Jam & Tanggal */}
            <div className="space-y-1 text-right">
              <div className="text-3xl font-bold tracking-tight text-white tabular-nums drop-shadow-lg sm:text-4xl">
                {jam}
              </div>
              <p className="text-[11px] font-semibold text-emerald-100/90">
                {tanggal}
              </p>
            </div>
          </div>
        </div>

      </header>
    </div>
  );
}
