// lib/alatInvasifConstants.ts

import type {
  DeviceCode,
  DeviceGroup,
  DeviceRowUI,
} from "@/types/monitoring";

export interface DeviceDefinition {
  code: DeviceCode;
  label: string;
  group: DeviceGroup;
}

export const DEVICE_DEFINITIONS: DeviceDefinition[] = [
  // INVASIF
  {
    code: "IV_LINE",
    label: "IV Line",
    group: "INVASIF",
  },
  {
    code: "CVC",
    label: "CVC",
    group: "INVASIF",
  },
  {
    code: "ARTERIAL_LINE",
    label: "Arterial Line",
    group: "INVASIF",
  },
  {
    code: "SWANZ_GANZ", // <<< perbaikan di sini
    label: "Swanz Ganz",
    group: "INVASIF",
  },

  // TUBE
  {
    code: "OTT_NTT_TT",
    label: "OTT / NTT / TT",
    group: "TUBE",
  },
  {
    code: "NGT",
    label: "NGT",
    group: "TUBE",
  },
  {
    code: "WSD",
    label: "WSD",
    group: "TUBE",
  },
  {
    code: "DRAIN",
    label: "Drain",
    group: "TUBE",
  },
  {
    code: "URINE_CATHETER", // <<< perbaikan di sini
    label: "Urine Kateter",
    group: "TUBE",
  },
  {
    code: "LUNAK",
    label: "Lunak",
    group: "TUBE",
  },
];

export const createInitialDeviceRows = (): DeviceRowUI[] =>
  DEVICE_DEFINITIONS.map((def) => ({
    code: def.code,
    label: def.label,
    group: def.group,
    ukuran: "",
    lokasi: "",
    tglPasang: "",
  }));
