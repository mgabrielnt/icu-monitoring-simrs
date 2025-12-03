import { InstruksiObatItem } from "@/types/instructionTypes";
import { updateObatRow, addObatRow, deleteObatRow } from "@/handlers/instructionHandlers";

interface Props {
  data: InstruksiObatItem[];
  setData: (u: any) => void;
}

export default function InstruksiObatTable({ data, setData }: Props) {
  const columns = [
    "Jam", "Nama Obat", "Dosis Obat", "Cara Pemberian",
    "Tgl Mulai", "Tgl Stop", "Ket P/E/D", "Nama / TT Dokter", "Implementasi"
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-3">Instruksi Obat</h3>

      <div className="overflow-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} className="border p-2 text-sm bg-gray-100">{col}</th>
              ))}
              <th className="border p-2 bg-gray-100"></th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {Object.keys(row).map((key) => (
                  <td key={key} className="border p-1">
                    <input
                      className="w-full p-1 text-sm border rounded"
                      type={key.includes("Tanggal") ? "date" : "text"}
                      value={(row as any)[key]}
                      onChange={(e) =>
                        setData(updateObatRow(data, i, key as any, e.target.value))
                      }
                    />
                  </td>
                ))}

                <td className="border p-2 text-center">
                  <button
                    onClick={() => setData(deleteObatRow(data, i))}
                    className="text-red-600 text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => setData(addObatRow(data))}
        className="mt-3 bg-green-700 text-white px-3 py-2 rounded text-sm"
      >
        + Tambah Baris
      </button>
    </div>
  );
}
