import { useState } from "react";
import { InstruksiObatItem } from "@/types/instructionTypes";

export function useInstruksiObat() {
  const [hariPerawatan, setHariPerawatan] = useState<number>(1);

  const [instruksi, setInstruksi] = useState<InstruksiObatItem[]>([
    {
      jam: "",
      namaObat: "",
      dosis: "",
      caraPemberian: "",
      tglMulai: "",
      tglStop: "",
      ketPEd: "",
      namaDokter: "",
      implementasi: "",
    },
  ]);

  const [instruksiLain, setInstruksiLain] = useState("");
  const [polaVentilasi, setPolaVentilasi] = useState("");

  const [nutrisi, setNutrisi] = useState({
    volume: 0,
    kalori: 0,
    protein: 0,
    lipit: 0,
  });

  // 🔥 Tambahan: fungsi untuk memberi timestamp otomatis
  const generateTimestampedInstruksi = () => {
    return instruksi.map((item) => ({
      ...item,
      jam: new Date().toISOString(), // auto timestamp
    }));
  };

  return {
    hariPerawatan, setHariPerawatan,
    instruksi, setInstruksi,
    instruksiLain, setInstruksiLain,
    nutrisi, setNutrisi,
    polaVentilasi, setPolaVentilasi,

    // fungsi auto timestamp
    generateTimestampedInstruksi,
  };
}
