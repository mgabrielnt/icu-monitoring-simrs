// hooks/useInstruksiObatForm.ts

import { useState, useCallback } from "react";
import { 
  InstruksiObatItem, 
  InstruksiLainItem, 
  NutrisiCaranItem,
  SavedInstruksiObat 
} from "@/types/instructionTypes";
import { 
  generateEmptyObatRow, 
  generateEmptyInstruksiLainRow, 
  generateDefaultNutrisiCairan,
  validateInstruksiObatForm
} from "@/utils/instruksiObat";

export function useInstruksiObatForm() {
  const [hariPerawatan, setHariPerawatan] = useState(1);
  const [instruksiObat, setInstruksiObat] = useState<InstruksiObatItem[]>([generateEmptyObatRow()]);
  const [instruksiLain, setInstruksiLain] = useState<InstruksiLainItem[]>([generateEmptyInstruksiLainRow()]);
  const [nutrisiCairan, setNutrisiCairan] = useState<NutrisiCaranItem[]>(generateDefaultNutrisiCairan());
  const [polaVentilasi, setPolaVentilasi] = useState("");
  const [verifikasiDPJP, setVerifikasiDPJP] = useState("");
  const [verifikasiDPJP2, setVerifikasiDPJP2] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setHariPerawatan(1);
    setInstruksiObat([generateEmptyObatRow()]);
    setInstruksiLain([generateEmptyInstruksiLainRow()]);
    setNutrisiCairan(generateDefaultNutrisiCairan());
    setPolaVentilasi("");
    setVerifikasiDPJP("");
    setVerifikasiDPJP2("");
    setEditingId(null);
  }, []);

  const loadFormData = useCallback((data: SavedInstruksiObat) => {
    setHariPerawatan(data.hariPerawatan);
    setInstruksiObat(data.instruksiObat);
    setInstruksiLain(data.instruksiLain);
    setNutrisiCairan(data.nutrisiCairan);
    setPolaVentilasi(data.polaVentilasi);
    setVerifikasiDPJP(data.verifikasiDPJP);
    setVerifikasiDPJP2(data.verifikasiDPJP2);
    setEditingId(data.id);
  }, []);

  const getFormData = useCallback(() => {
    return {
      hariPerawatan,
      instruksiObat,
      instruksiLain,
      nutrisiCairan,
      polaVentilasi,
      verifikasiDPJP,
      verifikasiDPJP2
    };
  }, [hariPerawatan, instruksiObat, instruksiLain, nutrisiCairan, polaVentilasi, verifikasiDPJP, verifikasiDPJP2]);

  const validateForm = useCallback(() => {
    return validateInstruksiObatForm(hariPerawatan, instruksiObat);
  }, [hariPerawatan, instruksiObat]);

  return {
    // Form state
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
    
    // Form methods
    resetForm,
    loadFormData,
    getFormData,
    validateForm
  };
}