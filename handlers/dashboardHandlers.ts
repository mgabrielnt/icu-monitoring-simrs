// handlers/dashboardHandlers.ts

import { Patient, AddPatientFormData } from '@/types/patient';

interface DashboardHandlersParams {
  formData: AddPatientFormData;
  addPatientToList: (patient: Patient) => void;
  getNextPatientId: () => number;
  closeModal: () => void;
  resetForm: () => void;
}

export function createDashboardHandlers({
  formData,
  addPatientToList,
  getNextPatientId,
  closeModal,
  resetForm
}: DashboardHandlersParams) {
  
  const handleAddPatientSubmit = async () => {
    // Validasi form
    const requiredFields = [
      formData.noRM,
      formData.nama,
      formData.tglLahir,
      formData.tanggalMasuk,
      formData.bb,
      formData.tb,
      formData.penanggungJawab,
      formData.dokterDPJP,
      formData.perawatPrimer,
      formData.perawatJaga,
      formData.diagnosis[0]
    ];

    if (requiredFields.some(field => !field)) {
      alert('Mohon lengkapi semua field yang wajib diisi (*)');
      return;
    }

    const newPatient: Patient = {
      id: getNextPatientId(),
      noRM: formData.noRM,
      nama: formData.nama,
      tglLahir: formData.tglLahir,
      unit: formData.unit,
      tglMasuk: formData.tanggalMasuk,
      hariKe: Number(formData.hariKe),
      bb: Number(formData.bb),
      tb: Number(formData.tb),
      penanggungJawab: formData.penanggungJawab,
      dokterDPJP: formData.dokterDPJP,
      perawatPrimer: formData.perawatPrimer,
      perawatJaga: formData.perawatJaga,
      diagnosis: formData.diagnosis.filter(d => d.trim() !== '')
    };

    try {
      addPatientToList(newPatient);
      closeModal();
      resetForm();
      alert('Data pasien berhasil ditambahkan!');
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Gagal menambahkan data pasien');
    }
  };

  const handleDashboardLogout = () => {
    // TODO: Implement proper logout
    if (confirm('Yakin ingin logout?')) {
      alert('Logout berhasil');
      // router.push('/login');
    }
  };

  return {
    handleAddPatientSubmit,
    handleDashboardLogout
  };
}