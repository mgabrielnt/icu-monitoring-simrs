import React from "react";
import Container from "./Container";
import { User, Shield, Activity, Pill, FileText, TrendingUp } from "lucide-react";

const menuList = [
  { key: "datadiri", label: "Data Diri Pasien", icon: User },
  { key: "alatinvasif", label: "Alat Invasif", icon: Shield },
  { key: "hemodinamik", label: "Hemodinamik", icon: Activity },
  { key: "instruksiobat", label: "Instruksi Obat", icon: Pill },
  { key: "perencanaanperawat", label: "Perencanaan Perawat", icon: FileText },
  { key: "perkembanganpasien", label: "Perkembangan Pasien", icon: TrendingUp },
];

export default function Navbar({
  active,
  onChange,
}: {
  active: string;
  onChange: (m: string) => void;
}) {
  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <Container className="py-3">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {menuList.map((m) => (
            <button
              key={m.key}
              onClick={() => onChange(m.key)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap font-medium text-sm ${
                active === m.key
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
              }`}
            >
              <m.icon className="w-4 h-4" />
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
}