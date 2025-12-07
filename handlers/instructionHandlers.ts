import { InstruksiObatItem } from "@/types/instructionTypes";
import { generateEmptyObatRow } from "@/utils/instruksiObat";

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
  return [...list, generateEmptyObatRow()];
}

export function deleteObatRow(list: InstruksiObatItem[], index: number) {
  const updated = [...list];
  updated.splice(index, 1);
  return updated;
}
