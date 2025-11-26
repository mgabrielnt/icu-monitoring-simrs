import React, { useState, useMemo } from "react";
import { Search, Calendar, Eye } from "lucide-react";

export interface Patient {
  id: number;
  noRM: string;
  nama: string;
  tglLahir: string;
  unit: string;
  tanggalMasuk: string;
  hariKe: number;
  bb: string;
  tb: string;
  dokterDPJP: string;
  perawatPrimer: string;
  perawatJaga: string;
  diagnosis: string[];
}

interface PatientTableProps {
  patients: Patient[];
  loading: boolean;
  onViewDetail: (patientId: number) => void;
}

export default function PatientTable({ patients, loading, onViewDetail }: PatientTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  // Hitung total halaman
  const totalPages = Math.ceil(patients.length / perPage);

  // Data yang tampil di halaman saat ini
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return patients.slice(start, start + perPage);
  }, [patients, currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Daftar Pasien
          <span className="ml-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
            {patients.length}
          </span>
        </h2>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="px-6 py-12 text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">No. RM</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Tanggal Lahir</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="font-medium">Tidak ada data pasien ditemukan</p>
                    </td>
                  </tr>
                ) : (
                  currentData.map((patient) => (
                    <tr key={patient.id} className="hover:bg-blue-50 transition-all duration-150">
                      <td className="px-6 py-4 text-sm font-bold text-blue-700">{patient.noRM}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold">
                            {patient.nama.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold">{patient.nama}</p>
                            <p className="text-xs text-gray-500">{patient.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>
                            {new Date(patient.tglLahir).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => onViewDetail(patient.id)}
                          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Lihat Detail</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 flex items-center justify-center space-x-2 bg-gray-50 border-t">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-blue-50"
                }`}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white shadow"
                      : "bg-white hover:bg-blue-50 border"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-blue-50"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
