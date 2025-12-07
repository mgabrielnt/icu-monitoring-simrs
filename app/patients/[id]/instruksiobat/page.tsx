"use client";

import { useState } from "react";
import InstruksiObatHeader from "./components/InstruksiObatHeader";
import InstruksiObatModal from "./components/InstruksiObatModal";
import InstruksiObatTable from "./components/InstruksiObatTable";
import { useInstruksiObat } from "@/hooks/useInstruksiObat";
import { useInstruksiObatForm } from "@/hooks/useInstruksiObatForm";

export default function InstruksiObatPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Data management hook
  const { data, isLoading, create, update, delete: deleteData } = useInstruksiObat();
  
  // Form management hook
  const {
    hariPerawatan,
    setHariPerawatan,
    instruksiObat,
    setInstruksiObat,
    instruksiLain,
    setInstruksiLain,
    nutrisiCairan,
    setNutrisiCairan,
    polaVentilasi,
    setPolaVentilasi,
    verifikasiDPJP,
    setVerifikasiDPJP,
    verifikasiDPJP2,
    setVerifikasiDPJP2,
    editingId,
    resetForm,
    loadFormData,
    getFormData,
    validateForm
  } = useInstruksiObatForm();

  const openModal = () => setIsModalOpen(true);
  
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleEdit = (item: any) => {
    loadFormData(item);
    openModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      try {
        await deleteData(id);
        alert("Data berhasil dihapus");
      } catch (error) {
        alert("Gagal menghapus data");
      }
    }
  };

  const handleSubmit = async () => {
    // Validate form
    const validation = validateForm();
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    try {
      const formData = getFormData();
      
      if (editingId) {
        await update(editingId, formData);
        alert("Data berhasil diupdate");
      } else {
        await create(formData);
        alert("Data berhasil disimpan");
      }
      
      closeModal();
    } catch (error) {
      alert("Gagal menyimpan data");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <InstruksiObatHeader />

      {/* ACTION BUTTON */}
      <div className="px-6 py-4 bg-white border-b">
        <div className="flex justify-end">
          <button
            onClick={openModal}
            disabled={isLoading}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Input Data Instruksi Obat
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="p-6">
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm border p-16 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <p className="mt-4 text-gray-600">Memuat data...</p>
          </div>
        ) : (
          <InstruksiObatTable 
            data={data} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      {/* MODAL */}
      <InstruksiObatModal
        isOpen={isModalOpen}
        onClose={closeModal}
        hariPerawatan={hariPerawatan}
        setHariPerawatan={setHariPerawatan}
        instruksiObat={instruksiObat}
        setInstruksiObat={setInstruksiObat}
        instruksiLain={instruksiLain}
        setInstruksiLain={setInstruksiLain}
        nutrisiCairan={nutrisiCairan}
        setNutrisiCairan={setNutrisiCairan}
        polaVentilasi={polaVentilasi}
        setPolaVentilasi={setPolaVentilasi}
        verifikasiDPJP={verifikasiDPJP}
        setVerifikasiDPJP={setVerifikasiDPJP}
        verifikasiDPJP2={verifikasiDPJP2}
        setVerifikasiDPJP2={setVerifikasiDPJP2}
        onSubmit={handleSubmit}
        isEditing={!!editingId}
      />  
    </div>
  );
}