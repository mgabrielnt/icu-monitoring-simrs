"use client";

import { useState, useEffect } from 'react';

export default function PerkembanganPasienHeader() {
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatIndonesianDateLong = (date: Date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatTime24 = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const tanggal = formatIndonesianDateLong(now);
  const jam = `${formatTime24(now)} WIB`;

  return (
    <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 shadow-2xl">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.12),transparent_50%)]" />
      
      {/* Floating orbs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative px-5 py-5 sm:px-6 sm:py-6">
        
        {/* Top row: Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* ICU Status */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-emerald-400/40 rounded-full blur-sm group-hover:bg-emerald-300/50 transition-all duration-300" />
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full px-3 py-1.5 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-sm" />
              </span>
              <span className="text-[11px] font-bold text-white tracking-wide">ICU</span>
            </div>
          </div>

          <div className="w-px h-4 bg-emerald-400/30" />

          {/* Shift */}
          <div className="flex items-center gap-1.5 bg-teal-500/25 rounded-full px-3 py-1.5">
            <svg className="w-3 h-3 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-[10px] font-bold text-teal-50 uppercase tracking-wide">Shift Pagi</span>
          </div>

          <div className="w-px h-4 bg-emerald-400/30" />

          {/* Status */}
          <div className="flex items-center gap-1.5 bg-emerald-500/20 rounded-full px-3 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wide">Online</span>
          </div>
        </div>

        {/* Main content row */}
        <div className="flex items-center justify-between gap-6">
          
          {/* Left: Title */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-0.5 h-0.5 rounded-full bg-emerald-300/70 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                ))}
              </div>
              <span className="text-[9px] font-bold text-emerald-300/70 uppercase tracking-[0.3em]">
                Perkembangan Pasien • SOAP / ADIME
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight mb-2">
              Catatan Perkembangan Harian
            </h1>

            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-emerald-300/80 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xs text-emerald-100/75 leading-relaxed">
                Format SOAP/ADIME dengan kategori O, A, P, hasil asesmen, dan instruksi PPA
              </p>
            </div>
          </div>

          {/* Right: Time & Date */}
          <div className="text-right space-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight drop-shadow-lg">
              {jam}
            </div>

            <div className="flex items-center justify-end gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-300/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-[11px] font-semibold text-emerald-100/90">{tanggal}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
    </header>
  );
}