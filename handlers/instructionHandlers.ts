import { InstruksiObatItem } from "@/types/instructionTypes";
import { generateEmptyObatRow } from "@/utils/instruksiObat";

type InstruksiObatStringKey = {
  [Key in keyof InstruksiObatItem]: InstruksiObatItem[Key] extends string
    ? Key
    : never;
}[keyof InstruksiObatItem];

export function updateObatRow(
  list: InstruksiObatItem[],
  index: number,
  key: InstruksiObatStringKey,
  value: string
) {
  return list.map((item, itemIndex) =>
    itemIndex === index ? { ...item, [key]: value } : item
  );
}

export function addObatRow(list: InstruksiObatItem[]) {
  return [...list, generateEmptyObatRow()];
}

export function deleteObatRow(list: InstruksiObatItem[], index: number) {
  const updated = [...list];
  updated.splice(index, 1);
  return updated;
}
