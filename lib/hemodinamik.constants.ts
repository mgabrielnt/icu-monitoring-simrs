// lib/hemodinamik.constants.ts

export const OPSI_KESADARAN = [
  "Compos mentis",
  "Apatis",
  "Somnolen",
  "Sopor",
  "Koma",
  "Gelisah",
  "Delirium",
] as const;

export const OPSI_IRAMA_EKG = [
  "Sinus rhythm",
  "AF",
  "SVT",
  "VT",
  "VF",
  "PAC/PVC",
  "Blok AV",
  "Lainnya",
] as const;

export const VALIDATION_RANGES = {
  SISTOL: { min: 30, max: 250 },
  DIASTOL: { min: 30, max: 250 },
  HR: { min: 30, max: 250 },
  MAP: { min: 30, max: 250 },
  TEMP: { min: 30, max: 50 },
} as const;

export const CHART_CONFIG = {
  HEIGHT: 350,
  Y_DOMAIN: [0, 250],
  COLORS: {
    TEMP: "#3b82f6",
    MAP: "#10b981",
    HR: "#ef4444",
    SISTOL: "#000000",
    DIASTOL: "#1f2937",
  },
} as const;