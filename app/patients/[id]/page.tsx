'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Container from '@/components/Container';
import { Patient } from '@/types/patient';
import { Calendar, User, Activity, Stethoscope, Clock } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const PATIENTS_API_URL = `${API_BASE_URL}/data/datapasien.json`;

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = Number(params.id);  // ✅ Convert string ke number
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPatientDetail();
  }, [patientId]);

  const fetchPatientDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 DEBUG - Patient ID from URL:', patientId);
      console.log('🔍 DEBUG - API URL:', PATIENTS_API_URL);
      console.log('🔍 DEBUG - Fetching data...');

      const response = await fetch(PATIENTS_API_URL);
      console.log('🔍 DEBUG - Response status:', response.status);
      console.log('🔍 DEBUG - Response OK:', response.ok);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch patient data - Status: ${response.status}`);
      }
      
      const data: Patient[] = await response.json();
      console.log('🔍 DEBUG - Total patients in JSON:', data.length);
      console.log('🔍 DEBUG - All patient IDs:', data.map(p => p.id));
      console.log('🔍 DEBUG - Looking for patient ID:', patientId);
      console.log('🔍 DEBUG - Patient ID type:', typeof patientId);
      
      // Cari pasien berdasarkan ID (support both string and number)
      const foundPatient = data.find(p => {
        console.log(`🔍 DEBUG - Comparing: "${p.id}" (${typeof p.id}) === "${patientId}" (${typeof patientId})`);
        // Compare as strings to handle both cases
        return String(p.id) === String(patientId);
      });
      
      console.log('🔍 DEBUG - Found patient:', foundPatient);
      
      if (!foundPatient) {
        console.error('❌ DEBUG - Patient not found!');
        throw new Error('Pasien tidak ditemukan');
      }
      
      console.log('✅ DEBUG - Patient loaded successfully:', foundPatient.nama);
      setPatient(foundPatient);
    } catch (err) {
      console.error('❌ DEBUG - Error fetching patient:', err);
      setError(err instanceof Error ? err.message : 'Gagal memuat data pasien');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Memuat data pasien...</p>
        </div>
      </Container>
    );
  }

  if (error || !patient) {
    return (
      <Container className="py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-8 text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error || 'Pasien tidak ditemukan'}</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Kembali
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{patient.nama}</h1>
              <p className="text-blue-100 text-sm mt-1">No. RM: {patient.noRM}</p>
            </div>
          </div>
        </div>

        {/* Patient Info Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* No. RM */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-medium text-gray-600">No. Rekam Medis</p>
              </div>
              <p className="font-bold text-xl text-gray-800">{patient.noRM}</p>
            </div>

            {/* Nama */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-medium text-gray-600">Nama Lengkap</p>
              </div>
              <p className="font-bold text-xl text-gray-800">{patient.nama}</p>
            </div>

            {/* Tanggal Lahir */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-medium text-gray-600">Tanggal Lahir</p>
              </div>
              <p className="font-bold text-xl text-gray-800">{formatDate(patient.tglLahir)}</p>
            </div>

            {/* Unit */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-green-600" />
                <p className="text-sm font-medium text-gray-600">Unit Perawatan</p>
              </div>
              <p className="font-bold text-xl text-gray-800">{patient.unit}</p>
            </div>

            {/* Tanggal Masuk */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-green-600" />
                <p className="text-sm font-medium text-gray-600">Tanggal Masuk</p>
              </div>
              <p className="font-bold text-xl text-gray-800">{formatDate(patient.tglMasuk)}</p>
            </div>

            {/* Hari Rawat */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <p className="text-sm font-medium text-gray-600">Hari Rawat</p>
              </div>
              <p className="font-bold text-xl text-gray-800">Hari ke-{patient.hariKe}</p>
            </div>

            {/* Berat Badan */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-purple-600" />
                <p className="text-sm font-medium text-gray-600">Berat Badan</p>
              </div>
              <p className="font-bold text-xl text-gray-800">{patient.bb} kg</p>
            </div>

            {/* Tinggi Badan */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-purple-600" />
                <p className="text-sm font-medium text-gray-600">Tinggi Badan</p>
              </div>
              <p className="font-bold text-xl text-gray-800">{patient.tb} cm</p>
            </div>

            {/* Dokter DPJP */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <Stethoscope className="w-4 h-4 text-red-600" />
                <p className="text-sm font-medium text-gray-600">Dokter DPJP</p>
              </div>
              <p className="font-bold text-xl text-gray-800">{patient.dokterDPJP}</p>
            </div>

            {/* Perawat Primer */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-red-600" />
                <p className="text-sm font-medium text-gray-600">Perawat Primer</p>
              </div>
              <p className="font-bold text-xl text-gray-800">{patient.perawatPrimer}</p>
            </div>

            {/* Perawat Jaga */}
            {patient.perawatJaga && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-red-600" />
                  <p className="text-sm font-medium text-gray-600">Perawat Jaga</p>
                </div>
                <p className="font-bold text-xl text-gray-800">{patient.perawatJaga}</p>
              </div>
            )}

            {/* Penanggung Jawab */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-orange-600" />
                <p className="text-sm font-medium text-gray-600">Penanggung Jawab</p>
              </div>
              <p className="font-bold text-xl text-gray-800">{patient.penanggungJawab || '-'}</p>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-yellow-600" />
              Diagnosis
            </h3>
            <ul className="space-y-2">
              {patient.diagnosis.map((diag, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-bold text-yellow-700 mr-2">{index + 1}.</span>
                  <span className="text-gray-800">{diag}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Footer */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              💡 <strong>Info:</strong> Gunakan menu di atas untuk navigasi ke halaman lain (Penggantian Alat, Jadwal Obat, Catatan, Vital Sign)
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}