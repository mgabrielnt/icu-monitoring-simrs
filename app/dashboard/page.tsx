// app/dashboard/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import SearchSection from './components/SearchSection';
import PatientTable from './components/PatientTable';
import AddPatientModal from './addpatient/AddPatientModal';
import { SearchByType } from '@/types/patient';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useAddPatientForm } from '@/hooks/useAddPatientForm';
import { createDashboardHandlers } from '@/handlers/dashboardHandlers';
import { filterPatientsBySearch } from '@/utils/dashboardUtils';

export default function DashboardPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<SearchByType>('noRM');
  const [showModal, setShowModal] = useState(false);

  // Custom hooks untuk data management
  const { patients, loading, addPatientToList, getNextPatientId } = useDashboardData();
  
  // Custom hook untuk form management
  const { 
    formData, 
    handleFormInputChange, 
    handleFormDiagnosisChange, 
    resetAddPatientForm 
  } = useAddPatientForm();

  // Event handlers
  const { handleAddPatientSubmit, handleDashboardLogout } = createDashboardHandlers({
    formData,
    addPatientToList,
    getNextPatientId,
    closeModal: () => setShowModal(false),
    resetForm: resetAddPatientForm
  });

  // Filter patients berdasarkan search
  const filteredPatients = filterPatientsBySearch(patients, searchTerm, searchBy);

  // Navigation ke detail patient
  const handleViewDetail = (patientId: number) => {
    router.push(`/patients/${patientId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header onLogout={handleDashboardLogout} />

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
        onInputChange={handleFormInputChange}
        onDiagnosisChange={handleFormDiagnosisChange}
        onSubmit={handleAddPatientSubmit}
      />
    </div>
  );
}