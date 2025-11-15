'use client';

import React, { useState } from 'react';
import { Droplet, Plus } from 'lucide-react';

interface BalanceData {
  jam: string;
  cairanMasuk: number;
  cairanKeluar: number;
  iwl: number;
  balance: number;
  paraf: string;
}

interface Props {
  currentTime: Date;
}

export default function BalanceCairan({ currentTime }: Props) {
  const [dataList, setDataList] = useState<BalanceData[]>([
    {
      jam: "08:00",
      cairanMasuk: 500,
      cairanKeluar: 450,
      iwl: 50,
      balance: 0,
      paraf: "RS"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cairanMasuk: 0,
    cairanKeluar: 0,
    iwl: 0,
    paraf: ''
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const calculateTotals = () => {
    const totalMasuk = dataList.reduce((sum, item) => sum + item.cairanMasuk, 0);
    const totalKeluar = dataList.reduce((sum, item) => sum + item.cairanKeluar, 0);
    const totalIWL = dataList.reduce((sum, item) => sum + item.iwl, 0);
    const balance = totalMasuk - (totalKeluar + totalIWL);
    return { totalMasuk, totalKeluar, totalIWL, balance };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const balance = formData.cairanMasuk - (formData.cairanKeluar + formData.iwl);
    const newData: BalanceData = {
      jam: formatTime(currentTime),
      ...formData,
      balance
    };
    setDataList([...dataList, newData]);
    setFormData({ cairanMasuk: 0, cairanKeluar: 0, iwl: 0, paraf: '' });
    setShowForm(false);
    alert('Data balance cairan berhasil ditambahkan!');
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Cairan Masuk</p>
              <p className="text-3xl font-bold mt-2">{totals.totalMasuk}</p>
              <p className="text-green-100 text-xs mt-1">cc (24 Jam)</p>
            </div>
            <Droplet className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Cairan Keluar</p>
              <p className="text-3xl font-bold mt-2">{totals.totalKeluar}</p>
              <p className="text-red-100 text-xs mt-1">cc (24 Jam)</p>
            </div>
            <Droplet className="w-12 h-12 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">IWL</p>
              <p className="text-3xl font-bold mt-2">{totals.totalIWL}</p>
              <p className="text-orange-100 text-xs mt-1">cc (24 Jam)</p>
            </div>
            <Droplet className="w-12 h-12 text-orange-200" />
          </div>
        </div>

        <div className={`bg-gradient-to-br ${
          totals.balance >= 0 
            ? 'from-blue-500 to-blue-600' 
            : 'from-purple-500 to-purple-600'
        } rounded-lg shadow-lg p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Balance 24 Jam</p>
              <p className="text-3xl font-bold mt-2">
                {totals.balance >= 0 ? '+' : ''}{totals.balance}
              </p>
              <p className="text-blue-100 text-xs mt-1">cc</p>
            </div>
            <Droplet className="w-12 h-12 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Droplet className="w-6 h-6 mr-2 text-blue-600" />
            Detail Balance Cairan Per Jam
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Input Data</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jam</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Cairan Masuk (cc)</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Cairan Keluar (cc)</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">IWL (cc)</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Balance (cc)</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Paraf</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataList.map((data, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-gray-800">{data.jam}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                      {data.cairanMasuk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                      {data.cairanKeluar}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold">
                      {data.iwl}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full font-semibold ${
                      data.balance >= 0
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {data.balance >= 0 ? '+' : ''}{data.balance}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full font-semibold">
                      {data.paraf}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-blue-50 font-bold">
                <td className="px-6 py-4 text-gray-800">TOTAL 24 JAM</td>
                <td className="px-6 py-4 text-center text-green-700">{totals.totalMasuk} cc</td>
                <td className="px-6 py-4 text-center text-red-700">{totals.totalKeluar} cc</td>
                <td className="px-6 py-4 text-center text-orange-700">{totals.totalIWL} cc</td>
                <td className="px-6 py-4 text-center text-blue-700">
                  {totals.balance >= 0 ? '+' : ''}{totals.balance} cc
                </td>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Input */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Input Balance Cairan</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Jam (Real-time) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam (Real-time) *
                </label>
                <input
                  type="text"
                  value={formatTime(currentTime)}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 font-mono font-bold"
                />
              </div>

              {/* Paraf */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paraf Perawat *
                </label>
                <input
                  type="text"
                  value={formData.paraf}
                  onChange={(e) => setFormData({ ...formData, paraf: e.target.value })}
                  placeholder="Masukkan inisial"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Cairan Masuk */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cairan Masuk (cc) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.cairanMasuk || ''}
                  onChange={(e) => setFormData({ ...formData, cairanMasuk: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>

              {/* Cairan Keluar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cairan Keluar (cc) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.cairanKeluar || ''}
                  onChange={(e) => setFormData({ ...formData, cairanKeluar: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>

              {/* IWL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IWL (cc) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.iwl || ''}
                  onChange={(e) => setFormData({ ...formData, iwl: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  required
                />
              </div>

              {/* Balance (Auto Calculate) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance (Auto Calculate)
                </label>
                <input
                  type="text"
                  value={`${formData.cairanMasuk - (formData.cairanKeluar + formData.iwl)} cc`}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 font-bold"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
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