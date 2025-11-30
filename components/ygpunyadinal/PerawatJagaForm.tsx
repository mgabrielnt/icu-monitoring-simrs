'use client';

import React, { useState } from 'react';
import { Users, Bed } from 'lucide-react';

type Shift = 'pagi' | 'siang' | 'malam';

export default function PerawatJagaForm() {
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [formData, setFormData] = useState({
    namaPerawat: '',
    tempatTidur: ''
  });

  const shifts = [
    { id: 'pagi' as Shift, label: 'Pagi', time: '07:00 - 14:00', color: 'bg-yellow-500' },
    { id: 'siang' as Shift, label: 'Siang', time: '14:00 - 21:00', color: 'bg-orange-500' },
    { id: 'malam' as Shift, label: 'Malam', time: '21:00 - 07:00', color: 'bg-blue-800' }
  ];

  // Data jam 24 jam untuk input
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = String(i + 1).padStart(2, '0');
    return `${hour}:00`;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Data Perawat Jaga:', {
      shift: selectedShift,
      ...formData
    });
    alert('Data perawat jaga berhasil disimpan!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Users className="w-6 h-6 mr-2 text-purple-600" />
        Perawat Jaga (Shift)
      </h2>

      {/* Radio Button Shift */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Pilih Shift Jaga *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shifts.map((shift) => (
            <label
              key={shift.id}
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                selectedShift === shift.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <input
                type="radio"
                name="shift"
                value={shift.id}
                checked={selectedShift === shift.id}
                onChange={() => setSelectedShift(shift.id)}
                className="w-5 h-5 text-blue-600"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`w-3 h-3 rounded-full ${shift.color}`}></span>
                  <span className="font-bold text-gray-800">{shift.label}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{shift.time}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Form Input - Muncul jika shift dipilih */}
      {selectedShift && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-4">
              Form Perawat Jaga - Shift {shifts.find(s => s.id === selectedShift)?.label}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nama Perawat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Perawat *
                </label>
                <input
                  type="text"
                  value={formData.namaPerawat}
                  onChange={(e) => setFormData({ ...formData, namaPerawat: e.target.value })}
                  placeholder="Masukkan nama lengkap perawat"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Tempat Tidur */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tempat Tidur *
                </label>
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.tempatTidur}
                    onChange={(e) => setFormData({ ...formData, tempatTidur: e.target.value })}
                    placeholder="Contoh: Bed 1, ICU-A3"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Jam Input 24 Jam */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Jam Monitoring (24 Jam)
              </label>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2 max-h-64 overflow-y-auto p-2 bg-white rounded-lg border">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="px-3 py-2 bg-gray-100 text-center rounded font-mono text-sm hover:bg-blue-100 cursor-pointer transition"
                  >
                    {hour}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Menampilkan jam 01:00 - 24:00 untuk monitoring
              </p>
            </div>

            <button
              type="submit"
              className="mt-4 w-full md:w-auto px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
            >
              Simpan Data Perawat Jaga
            </button>
          </div>
        </form>
      )}
    </div>
  );
}