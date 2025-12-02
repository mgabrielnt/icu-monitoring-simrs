// services/progressNoteService.ts

import type {
  MonitoringMeta,
  ProgressNoteDTO,
  ProgressNoteState,
  SaveProgressNotesPayload,
} from "@/types/monitoring";

export const createLocalId = () =>
  Math.random().toString(36).slice(2);

export const nowDateTimeLocal = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
};

export const mapInitialNotes = (
  initialNotes?: ProgressNoteDTO[]
): ProgressNoteState[] => {
  if (!initialNotes || initialNotes.length === 0) {
    return [
      {
        id: undefined,
        tglJam: nowDateTimeLocal(),
        jenis: "O",
        hasilAssesmen: "",
        instruksiPPA: "",
        namaPerawat: "",
        _localId: createLocalId(),
      },
    ];
  }

  return initialNotes.map((n) => ({
    ...n,
    tglJam: n.tglJam || nowDateTimeLocal(),
    _localId: createLocalId(),
  }));
};

export const buildSaveProgressNotesPayload = (args: {
  meta: MonitoringMeta;
  notes: ProgressNoteState[];
  deletedIds: string[];
}): SaveProgressNotesPayload => {
  const { meta, notes, deletedIds } = args;

  return {
    meta,
    notes: notes.map(({ _localId, ...rest }) => rest),
    deletedNoteIds: deletedIds,
  };
};
