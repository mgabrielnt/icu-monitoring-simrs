import React from 'react';
import { Activity, LogOut } from 'lucide-react';
import Container from '@/components/Container'; // ⬅️ penting

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-green-600 via-green-700 to-indigo-800 text-white shadow-2xl">
      
      {/* ⬅️ Container dipakai di sini */}
      <Container className="py-6">

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">

            <img 
              src="/LOGO_PIM_FIX_png.png" 
              alt="Logo RS" 
              className="w-12 h-12 object-contain"
            />

            <div>
              <h1 className="text-3xl font-bold tracking-tight">RS Prima Insan Mulia</h1>
              <p className="text-blue-100 text-sm mt-1">Sistem Monitoring ICU/IGD</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 border border-white/20"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

      </Container>
    </div>
  );
}
