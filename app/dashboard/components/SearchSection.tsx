import React from 'react';
import { Search, Plus } from 'lucide-react';

interface SearchSectionProps {
  searchBy: 'noRM' | 'nama' | 'tglLahir';
  searchTerm: string;
  onSearchByChange: (value: 'noRM' | 'nama' | 'tglLahir') => void;
  onSearchTermChange: (value: string) => void;
  onAddPatient: () => void;
}

export default function SearchSection({
  searchBy,
  searchTerm,
  onSearchByChange,
  onSearchTermChange,
  onAddPatient
}: SearchSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Search className="w-6 h-6 mr-3 text-blue-600" />
          Pencarian Pasien
        </h2>
        <button
          onClick={onAddPatient}
          className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Pasien</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cari Berdasarkan
          </label>
          <select
            value={searchBy}
            onChange={(e) => onSearchByChange(e.target.value as any)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="noRM">No. Rekam Medis</option>
            <option value="nama">Nama Pasien</option>
            <option value="tglLahir">Tanggal Lahir</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kata Kunci
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              placeholder={`Cari berdasarkan ${
                searchBy === 'noRM' ? 'No. RM' : 
                searchBy === 'nama' ? 'Nama' : 
                'Tanggal Lahir (YYYY-MM-DD)'
              }...`}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}