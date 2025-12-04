import { InstruksiObatPayload } from "@/types/instructionTypes";

export async function saveInstruksiObat(data: InstruksiObatPayload) {
  const res = await fetch("/api/instruksi-obat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
}
