import { InstruksiObatItem } from "@/types/instructionTypes";

export function updateObatRow(
  list: InstruksiObatItem[],
  index: number,
  key: keyof InstruksiObatItem,
  value: string
) {
  const updated = [...list];
  updated[index][key] = value;
  return updated;
}

export function addObatRow(list: InstruksiObatItem[]) {
  return [
    ...list,
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
  ];
}

export function deleteObatRow(list: InstruksiObatItem[], index: number) {
  const updated = [...list];
  updated.splice(index, 1);
  return updated;
}
