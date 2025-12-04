'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Activity, User, Calendar, LogOut, Eye } from 'lucide-react';

// Dummy data pasien
const dummyPatients = [
  {
    id: 1,
    noRM: "RM-2024-001",
    nama: "Budi Santoso",
    tglLahir: "1965-03-15",
    unit: "ICU",
    status: "Aktif"
  },
  {
    id: 2,
    noRM: "RM-2024-002",
    nama: "Siti Nurhaliza",
    tglLahir: "1978-08-22",
    unit: "IGD",
    status: "Aktif"
  },
  {
    id: 3,
    noRM: "RM-2024-003",
    nama: "Ahmad Hidayat",
    tglLahir: "1990-12-05",
    unit: "ICU",
    status: "Aktif"
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'noRM' | 'nama' | 'tglLahir'>('noRM');

  const filteredPatients = dummyPatients.filter(patient => {
    const term = searchTerm.toLowerCase();
    if (searchBy === 'noRM') return patient.noRM.toLowerCase().includes(term);
    if (searchBy === 'nama') return patient.nama.toLowerCase().includes(term);
    if (searchBy === 'tglLahir') return patient.tglLahir.includes(term);
    return true;
  });

// app/page.tsx (DashboardPage)

  const handleViewDetail = (patientId: number) => {
    // PLURAL "patients", sesuai folder app/patients/[id]
    router.push(`/patients/${patientId}`);
  };


  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">RS Prima Insan Mulia</h1>
                <p className="text-blue-100 text-sm">Sistem Monitoring ICU/IGD</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2 text-blue-600" />
            Pencarian Pasien
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Filter Search By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Berdasarkan
              </label>
              <select
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="noRM">No. Rekam Medis</option>
                <option value="nama">Nama Pasien</option>
                <option value="tglLahir">Tanggal Lahir</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kata Kunci
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Cari berdasarkan ${
                    searchBy === 'noRM' ? 'No. RM' : 
                    searchBy === 'nama' ? 'Nama' : 
                    'Tanggal Lahir (YYYY-MM-DD)'
                  }...`}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Daftar Pasien ({filteredPatients.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No. RM</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama Pasien</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal Lahir</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unit</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Tidak ada data pasien ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {patient.noRM}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {patient.nama}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(patient.tglLahir).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          patient.unit === 'ICU' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {patient.unit}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleViewDetail(patient.id)}
                          className="inline-flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Detail</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}