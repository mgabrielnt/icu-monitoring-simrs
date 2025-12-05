// components/Navbar.tsx

import React from "react";
import Container from "./Container";
import { User, Shield, Activity, Pill, FileText, TrendingUp, ChevronRight } from "lucide-react";

const menuList = [
  { key: "datadiri", label: "Data Diri Pasien", icon: User, color: "from-blue-500 to-blue-600" },
  { key: "alatinvasif", label: "Alat Invasif", icon: Shield, color: "from-emerald-500 to-emerald-600" },
  { key: "hemodinamik", label: "Hemodinamik", icon: Activity, color: "from-purple-500 to-purple-600" },
  { key: "detailpasien", label: "Detail Pasien", icon: Activity, color: "from-purple-500 to-purple-600" },
  { key: "instruksiobat", label: "Instruksi Obat", icon: Pill, color: "from-pink-500 to-pink-600" },
  { key: "perencanaanperawat", label: "Perencanaan Perawat", icon: FileText, color: "from-amber-500 to-amber-600" },
  { key: "perkembanganpasien", label: "Perkembangan Pasien", icon: TrendingUp, color: "from-cyan-500 to-cyan-600" },
];

export default function Navbar({
  active,
  onChange,
}: {
  active: string;
  onChange: (m: string) => void;
}) {
  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
      <Container className="py-4">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {menuList.map((m) => {
            const isActive = active === m.key;
            
            return (
              <button
                key={m.key}
                onClick={() => onChange(m.key)}
                className={`
                  group relative flex items-center space-x-3 px-5 py-3.5 rounded-xl 
                  font-semibold text-sm whitespace-nowrap
                  transition-all duration-300 ease-out
                  ${isActive 
                    ? `bg-gradient-to-r ${m.color} text-white shadow-xl shadow-${m.color.split('-')[1]}-500/30 scale-105` 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md hover:scale-102'
                  }
                `}
              >
                {/* Icon dengan animasi */}
                <m.icon 
                  className={`
                    w-5 h-5 transition-transform duration-300
                    ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}
                  `} 
                />
                
                {/* Label */}
                <span className="relative">
                  {m.label}
                  
                  {/* Underline animation untuk non-active */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 to-green-700 transition-all duration-300 group-hover:w-full" />
                  )}
                </span>
                
                {/* Arrow indicator untuk active */}
                {isActive && (
                  <ChevronRight className="w-4 h-4 animate-pulse" />
                )}
                
                {/* Glow effect untuk active */}
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-white/20 blur-sm" />
                )}
                
                {/* Ripple effect on hover */}
                <span className="absolute inset-0 rounded-xl overflow-hidden">
                  <span className={`
                    absolute inset-0 bg-gradient-to-r ${m.color} opacity-0 
                    group-hover:opacity-10 transition-opacity duration-300
                  `} />
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Gradient line indicator di bawah */}
        <div className="relative mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`
              absolute h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500
              transition-all duration-500 ease-out rounded-full
            `}
            style={{
              width: `${100 / menuList.length}%`,
              left: `${(menuList.findIndex(m => m.key === active) * 100) / menuList.length}%`
            }}
          />
        </div>
      </Container>
    </div>
  );
}