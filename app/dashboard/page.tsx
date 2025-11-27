'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import PatientTable, { Patient } from './components/PatientTable';
import AddPatientModal from './components/AddPatientModal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const PATIENTS_API_URL = `${API_BASE_URL}/data/datapasien.json`;

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<'noRM' | 'nama' | 'tglLahir'>('noRM');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    noRM: '',
    nama: '',
    tglLahir: '',
    unit: 'ICU',
    tanggalMasuk: '',
    hariKe: 1,
    bb: '',
    tb: '',
    dokterDPJP: '',
    perawatPrimer: '',
    perawatJaga: '',
    diagnosis: ['', '', '', '']
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      // GET request ke datapasien.json
      const response = await fetch(PATIENTS_API_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch patients data');
      }
      
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('Gagal memuat data pasien');
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient => {
    const term = searchTerm.toLowerCase();
    if (searchBy === 'noRM') return patient.noRM.toLowerCase().includes(term);
    if (searchBy === 'nama') return patient.nama.toLowerCase().includes(term);
    if (searchBy === 'tglLahir') return patient.tglLahir.includes(term);
    return true;
  });

  const handleViewDetail = (patientId: number) => {
    // TODO: Navigate to detail page
    // router.push(`/patient/${patientId}`);
    alert(`Navigasi ke detail pasien ID: ${patientId}`);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    alert('Logout berhasil');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDiagnosisChange = (index: number, value: string) => {
    const newDiagnosis = [...formData.diagnosis];
    newDiagnosis[index] = value;
    setFormData(prev => ({
      ...prev,
      diagnosis: newDiagnosis
    }));
  };

  const handleSubmit = async () => {
    // Validasi form
    if (!formData.noRM || !formData.nama || !formData.tglLahir || !formData.tanggalMasuk || 
        !formData.bb || !formData.tb || !formData.dokterDPJP || !formData.perawatPrimer || 
        !formData.perawatJaga || !formData.diagnosis[0]) {
      alert('Mohon lengkapi semua field yang wajib diisi (*)');
      return;
    }
    
    const newPatient: Patient = {
      id: patients.length + 1,
      noRM: formData.noRM,
      nama: formData.nama,
      tglLahir: formData.tglLahir,
      unit: formData.unit,
      tanggalMasuk: formData.tanggalMasuk,
      hariKe: Number(formData.hariKe),
      bb: formData.bb,
      tb: formData.tb,
      dokterDPJP: formData.dokterDPJP,
      perawatPrimer: formData.perawatPrimer,
      perawatJaga: formData.perawatJaga,
      diagnosis: formData.diagnosis.filter(d => d !== '')
    };

    try {
      // POST request ke API
      // Uncomment ini ketika API sudah siap
      /*
      const response = await fetch(PATIENTS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient)
      });

      if (!response.ok) {
        throw new Error('Failed to add patient');
      }

      const addedPatient = await response.json();
      setPatients(prev => [...prev, addedPatient]);
      */

      // Sementara: Tambahkan langsung ke state (simulasi POST)
      setPatients(prev => [...prev, newPatient]);
      
      setShowModal(false);
      
      // Reset form
      setFormData({
        noRM: '',
        nama: '',
        tglLahir: '',
        unit: 'ICU',
        tanggalMasuk: '',
        hariKe: 1,
        bb: '',
        tb: '',
        dokterDPJP: '',
        perawatPrimer: '',
        perawatJaga: '',
        diagnosis: ['', '', '', '']
      });
      
      alert('Data pasien berhasil ditambahkan!');
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Gagal menambahkan data pasien');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header onLogout={handleLogout} />

      <div className="container mx-auto px-6 py-8">
        <SearchSection
          searchBy={searchBy}
          searchTerm={searchTerm}
          onSearchByChange={setSearchBy}
          onSearchTermChange={setSearchTerm}
          onAddPatient={() => setShowModal(true)}
        />

        <PatientTable
          patients={filteredPatients}
          loading={loading}
          onViewDetail={handleViewDetail}
        />
      </div>

      <AddPatientModal
        isOpen={showModal}
        formData={formData}
        onClose={() => setShowModal(false)}
        onInputChange={handleInputChange}
        onDiagnosisChange={handleDiagnosisChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}