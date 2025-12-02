// src/lib/constants.ts

export const JENIS_ALAT_OPTIONS = [
  { value: "IV_LINE", label: "IV Line" },
  { value: "ARTERI_LINE", label: "Arteri line" },
  { value: "SWANZ_GANZ", label: "Swanz Ganz" },
  { value: "IABP", label: "IABP" },
  { value: "SHEATH_TPM", label: "Sheath / TPM" },
  { value: "OTT_ETT_ET", label: "OTT / ETT / ET" },
  { value: "NGT", label: "NGT" },
  { value: "DRAIN", label: "Drain" },
  { value: "WSD", label: "WSD" },
  { value: "D_CATH_D_CO", label: "D. Cath / D.CO" },
  { value: "EPID_CATH", label: "EPID Cath" },
  { value: "PNB_CATH", label: "PNB Cath" },
  { value: "OTHER", label: "Lainnya (isi manual)" },
] as const;
