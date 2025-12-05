// lib/hemodinamik.utils.ts

export const createId = (): string => Math.random().toString(36).slice(2);

export const formatTime = (date: Date): string =>
  date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export const validateRange = (
  value: string,
  min: number,
  max: number
): boolean => {
  if (!value.trim()) return false;
  const n = Number(value);
  if (Number.isNaN(n)) return false;
  return n >= min && n <= max;
};