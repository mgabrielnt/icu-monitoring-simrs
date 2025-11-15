'use client';

import React, { useState } from 'react';
import { Activity, Plus } from 'lucide-react';

interface HemodinamikData {
  jam: string;
  hr: number;
  map: number;
  temp: number;
  kesadaran: string;
  iramaEKG: string;
  spo2: number;
  rr: number;
  cvp?: number;
  skoreNyeri?: number;
  skoreSedasi?: number;
}

interface Props {
  currentTime: Date;
}

export default function Hemodinamik({ currentTime }: Props) {
  // Generate dummy data untuk 24 jam
  const generateDummyData = (): HemodinamikData[] => {
    return Array.from({ length: 24 }, (_, i) => ({
      jam: `${String(i + 1).padStart(2, '0')}:00`,
      hr: Math.floor(Math.random() * 30) + 70,
      map: Math.floor(Math.random() * 20) + 75,
      temp: parseFloat((Math.random() * 1.5 + 36.5).toFixed(1)),
      kesadaran: "Compos Mentis",
      iramaEKG: "Sinus Rhythm",
      spo2: Math.floor(Math.random() * 5) + 95,
      rr: Math.floor(Math.random() * 6) + 16,
      cvp: Math.floor(Math.random() * 5) + 5,
      skoreNyeri: Math.floor(Math.random() * 3),
      skoreSedasi: Math.floor(Math.random() * 2)
    }));
  };

  const [dataList, setDataList] = useState<HemodinamikData[]>(generateDummyData());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<HemodinamikData>({
    jam: currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    hr: 0,
    map: 0,
    temp: 0,
    kesadaran: '',
    iramaEKG: '',
    spo2: 0,
    rr: 0,
    cvp: 0,
    skoreNyeri: 0,
    skoreSedasi: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDataList([...dataList, formData]);
    setShowForm(false);
    alert('Data hemodinamik berhasil ditambahkan!');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-red-600" />
            Monitoring Hemodinamik 24 Jam
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Input Data</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">Jam</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-700">HR (bpm)<br/><span className="text-xs font-normal">(0-250)</span></th>
                <th className="px-3 py-3 text-center font-semibold text-gray-700">MAP (mmHg)<br/><span className="text-xs font-normal">(0-250)</span></th>
                <th className="px-3 py-3 text-center font-semibold text-gray-700">Temp (°C)<br/><span className="text-xs font-normal">(0-250)</span></th>
                <th className="px-3 py-3 text-center font-semibold text-gray-700">SpO2 (%)</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-700">RR (/min)</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">Kesadaran</th>
                <th className="px-3 py-3 text-left font-semibold text-gray-700">Irama EKG</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-700">CVP/RA</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-700">Nyeri</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-700">Sedasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataList.map((data, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition">
                  <td className="px-3 py-3 font-mono font-bold text-gray-800">{data.jam}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-1 rounded font-semibold ${
                      data.hr > 100 || data.hr < 60
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {data.hr}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-1 rounded font-semibold ${
                      data.map > 110 || data.map < 65
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {data.map}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-1 rounded font-semibold ${
                      data.temp > 37.5 || data.temp < 36.0
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {data.temp}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-1 rounded font-semibold ${
                      data.spo2 < 95
                        ? 'bg-red-100 text-red-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {data.spo2}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center font-medium">{data.rr}</td>
                  <td className="px-3 py-3 text-sm">{data.kesadaran}</td>
                  <td className="px-3 py-3 text-sm">{data.iramaEKG}</td>
                  <td className="px-3 py-3 text-center font-medium">{data.cvp || '-'}</td>
                  <td className="px-3 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      (data.skoreNyeri || 0) > 3
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {data.skoreNyeri || 0}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                      {data.skoreSedasi || 0}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Input */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Input Data Hemodinamik</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Jam (Auto - Real time) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam (Real-time) *
                </label>
                <input
                  type="text"
                  value={formatTime(currentTime)}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg bg-gray-100 font-mono font-bold"
                />
              </div>

              {/* HR (0-250) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HR (bpm) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="250"
                  value={formData.hr || ''}
                  onChange={(e) => setFormData({ ...formData, hr: parseInt(e.target.value) || 0 })}
                  placeholder="0-250"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>

              {/* MAP (0-250) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MAP (mmHg) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="250"
                  value={formData.map || ''}
                  onChange={(e) => setFormData({ ...formData, map: parseInt(e.target.value) || 0 })}
                  placeholder="0-250"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>

              {/* Temp (0-250) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temp (°C) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="250"
                  value={formData.temp || ''}
                  onChange={(e) => setFormData({ ...formData, temp: parseFloat(e.target.value) || 0 })}
                  placeholder="0-250"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>

              {/* SpO2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SpO2 (%) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.spo2 || ''}
                  onChange={(e) => setFormData({ ...formData, spo2: parseInt(e.target.value) || 0 })}
                  placeholder="0-100"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>

              {/* RR */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RR (/min) *
                </label>
                <input
                  type="number"
                  value={formData.rr || ''}
                  onChange={(e) => setFormData({ ...formData, rr: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>

              {/* Kesadaran */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kesadaran *
                </label>
                <select
                  value={formData.kesadaran}
                  onChange={(e) => setFormData({ ...formData, kesadaran: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                >
                  <option value="">Pilih</option>
                  <option value="Compos Mentis">Compos Mentis</option>
                  <option value="Apatis">Apatis</option>
                  <option value="Somnolen">Somnolen</option>
                  <option value="Sopor">Sopor</option>
                  <option value="Coma">Coma</option>
                </select>
              </div>

              {/* Irama EKG */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Irama EKG *
                </label>
                <input
                  type="text"
                  value={formData.iramaEKG}
                  onChange={(e) => setFormData({ ...formData, iramaEKG: e.target.value })}
                  placeholder="Contoh: Sinus Rhythm"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Simpan Data
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}