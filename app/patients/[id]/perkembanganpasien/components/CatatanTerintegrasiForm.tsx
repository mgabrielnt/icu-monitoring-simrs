"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import type { ProgressNoteState } from "@/types/monitoring";
import type { ProgressNoteField } from "@/hooks/useProgressNotes";

interface CatatanTerintegrasiFormProps {
  notes: ProgressNoteState[];
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  addNote: () => void;
  updateNoteField: (
    localId: string,
    field: ProgressNoteField,
    value: string
  ) => void;
  removeNote: (localId: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CatatanTerintegrasiForm: React.FC<
  CatatanTerintegrasiFormProps
> = ({
  notes,
  isSubmitting,
  submitError,
  submitSuccess,
  addNote,
  updateNoteField,
  removeNote,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-5"
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Daftar Catatan Perkembangan
          </h3>
          <p className="text-[11px] text-slate-500">
            Isi waktu (tgl/jam), jenis (O/A/P), hasil asesmen, instruksi, dan
            nama perawat.
          </p>
        </div>
        <button
          type="button"
          onClick={addNote}
          className="inline-flex items-center gap-1.5 rounded-full bg-sky-700 px-3 py-1.5 text-[11px] font-semibold text-sky-50 shadow-sm hover:bg-sky-800"
        >
          <Plus className="h-3 w-3" />
          Tambah Baris
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/70">
        <table className="min-w-full border-separate border-spacing-0 text-xs sm:text-[13px]">
          <thead>
            <tr className="bg-slate-100 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              <th className="px-3 py-2 text-left">Tgl / Jam</th>
              <th className="px-3 py-2 text-left">Jenis</th>
              <th className="px-3 py-2 text-left">Hasil Asesmen (O / A)</th>
              <th className="px-3 py-2 text-left">Instruksi / Tindakan (P)</th>
              <th className="px-3 py-2 text-left">Nama Perawat</th>
              <th className="px-3 py-2 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {notes.map((note, idx) => (
              <tr key={note._localId} className="bg-white/95">
                {/* TGL / JAM */}
                <td className="px-3 py-2 align-top">
                  <input
                    required
                    type="datetime-local"
                    value={note.tglJam}
                    onChange={(e) =>
                      updateNoteField(note._localId, "tglJam", e.target.value)
                    }
                    className="w-40 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:w-48 sm:text-[13px] focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </td>

                {/* JENIS */}
                <td className="px-3 py-2 align-top">
                  <select
                    value={note.jenis}
                    onChange={(e) =>
                      updateNoteField(note._localId, "jenis", e.target.value)
                    }
                    className="w-24 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="O">O (Objective)</option>
                    <option value="A">A (Assessment)</option>
                    <option value="P">P (Plan)</option>
                  </select>
                  <p className="mt-1 text-[10px] text-slate-400">
                    Pilih O / A / P sesuai isi catatan.
                  </p>
                </td>

                {/* HASIL ASESMEN */}
                <td className="px-3 py-2 align-top">
                  <textarea
                    rows={3}
                    value={note.hasilAssesmen}
                    onChange={(e) =>
                      updateNoteField(
                        note._localId,
                        "hasilAssesmen",
                        e.target.value
                      )
                    }
                    className="min-h-[70px] w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="Contoh: TD 150/90 mmHg, sesak, gelisah..."
                  />
                </td>

                {/* INSTRUKSI PPA */}
                <td className="px-3 py-2 align-top">
                  <textarea
                    rows={3}
                    value={note.instruksiPPA}
                    onChange={(e) =>
                      updateNoteField(
                        note._localId,
                        "instruksiPPA",
                        e.target.value
                      )
                    }
                    className="min-h-[70px] w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="Contoh: Monitor saturasi, titrasi O2, kolaborasi dr. jaga..."
                  />
                </td>

                {/* NAMA PERAWAT */}
                <td className="px-3 py-2 align-top">
                  <input
                    required
                    value={note.namaPerawat}
                    onChange={(e) =>
                      updateNoteField(
                        note._localId,
                        "namaPerawat",
                        e.target.value
                      )
                    }
                    className="w-36 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs sm:w-40 sm:text-[13px] focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    placeholder="Nama & paraf"
                  />
                  <span className="mt-1 block text-[10px] text-slate-400">
                    Sesuai paraf di lembar kertas.
                  </span>
                </td>

                {/* AKSI */}
                <td className="px-3 py-2 text-right align-top">
                  <button
                    type="button"
                    onClick={() => removeNote(note._localId)}
                    disabled={notes.length === 1}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-600 hover:text-rose-700 disabled:cursor-not-allowed disabled:text-slate-300"
                  >
                    <Trash2 className="h-3 w-3" />
                    Hapus
                  </button>
                  <span className="ml-2 inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200">
                    #{idx + 1}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER / STATUS */}
      <div className="flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[11px] text-slate-500">
          Satu halaman ini berlaku untuk{" "}
          <span className="font-semibold">1 tanggal perawatan</span>. Data
          tersimpan di backend sebagai daftar <code>progress_notes</code>.
        </div>
        <div className="flex items-center gap-2">
          {submitError && (
            <span className="text-[11px] text-rose-600">
              {submitError}
            </span>
          )}
          {submitSuccess && (
            <span className="text-[11px] text-emerald-700">
              Catatan tersimpan. ✅
            </span>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-sky-700 px-5 py-1.5 text-xs font-semibold text-sky-50 shadow-sm hover:bg-sky-800 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Catatan"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CatatanTerintegrasiForm;
