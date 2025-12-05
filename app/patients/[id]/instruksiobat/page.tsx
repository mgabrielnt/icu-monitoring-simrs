"use client";

import InstruksiObatTable from "./components/InstruksiObatTable";
import { useInstruksiObat } from "@/hooks/useInstruksiObat";
import { saveInstruksiObat } from "@/services/instructionService";
import InstruksiObatHeader from "./components/InstruksiObatHeader";


export default function Page() {
  const {
    hariPerawatan, setHariPerawatan,
    instruksi, setInstruksi,
    instruksiLain, setInstruksiLain,
    nutrisi, setNutrisi,
    polaVentilasi, setPolaVentilasi,
    generateTimestampedInstruksi
  } = useInstruksiObat();

  const handleSubmit = async () => {
    const payload = {
      hariPerawatan,
      instruksi: generateTimestampedInstruksi(), // 🔥 auto jam disini
      instruksiLain,
      nutrisi,
      polaVentilasi,
    };

    await saveInstruksiObat(payload);
    alert("Instruksi obat berhasil disimpan");
  };

  return (
    <div className="p-6 space-y-6">

      <InstruksiObatHeader />

      <div className="bg-white p-5 rounded-xl shadow">
        <label className="font-semibold">Hari Perawatan Ke:</label>
        <input
          type="number"
          className="border p-2 ml-2 rounded w-32"
          value={hariPerawatan}
          onChange={(e) => setHariPerawatan(Number(e.target.value))}
        />
      </div>

      <InstruksiObatTable data={instruksi} setData={setInstruksi} />

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Instruksi Lain</h3>
        <textarea
          className="border rounded w-full p-2"
          rows={4}
          value={instruksiLain}
          onChange={(e) => setInstruksiLain(e.target.value)}
        />
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold">Nutrisi/Cairan</h3>

        <div className="grid grid-cols-2 gap-3 mt-3">
          {Object.keys(nutrisi).map((key) => (
            <div key={key}>
              <label className="capitalize">{key}</label>
              <input
                type="number"
                className="border p-2 rounded w-full"
                onChange={(e) =>
                  setNutrisi({ ...nutrisi, [key]: Number(e.target.value) })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold">Pola Ventilasi</h3>
        <input
          className="border p-2 rounded w-full"
          value={polaVentilasi}
          onChange={(e) => setPolaVentilasi(e.target.value)}
        />
      </div>

      <button
        className="bg-green-700 text-white px-5 py-3 rounded-lg shadow"
        onClick={handleSubmit}
      >
        Simpan Instruksi Obat
      </button>
    </div>
  );
}
