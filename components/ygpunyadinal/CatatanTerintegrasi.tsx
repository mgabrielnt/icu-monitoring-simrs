"use client";

import React, { useState } from "react";
import {
  FileText,
  Clock,
  User,
  Edit3,
  Trash2,
  Plus,
  BookOpenCheck,
} from "lucide-react";
import { postJson } from "@/lib/api-client";

export interface ProgressNoteDTO {
  id?: string;
  tglJam: string; // ISO "yyyy-MM-ddTHH:mm"
  jenis: "O" | "A" | "P";
  hasilAssesmen: string;
  instruksiPPA: string;
  namaPerawat: string;
}

export interface CatatanTerintegrasiProps {
  noRm?: string;
  tanggal?: string;
  hariPerawatanKe?: number;
  initialNotes?: ProgressNoteDTO[];
  onSaved?: () => void;
}

interface ProgressNoteState extends ProgressNoteDTO {
  _localId: string;
}

const createId = () => Math.random().toString(36).slice(2);

const nowDateTimeLocal = () => {
  const d = new Date();
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60_000);
  return local.toISOString().slice(0, 16);
};

const CatatanTerintegrasi: React.FC<CatatanTerintegrasiProps> = ({
  noRm,
  tanggal,
  hariPerawatanKe,
  initialNotes,
  onSaved,
}) => {
  const [notes, setNotes] = useState<ProgressNoteState[]>(() => {
    if (initialNotes && initialNotes.length > 0) {
      return initialNotes.map((n) => ({
        ...n,
        tglJam: n.tglJam || nowDateTimeLocal(),
        _localId: createId(),
      }));
    }
    return [
      {
        id: undefined,
        tglJam: nowDateTimeLocal(),
        jenis: "O",
        hasilAssesmen: "",
        instruksiPPA: "",
        namaPerawat: "",
        _localId: createId(),
      },
    ];
  });

  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateNote = (
    localId: string,
    field: keyof ProgressNoteDTO,
    value: string
  ) => {
    setNotes((prev) =>
      prev.map((n) =>
        n._localId === localId ? { ...n, [field]: value } : n
      )
    );
  };

  const addNote = () => {
    setNotes((prev) => [
      ...prev,
      {
        id: undefined,
        tglJam: nowDateTimeLocal(),
        jenis: "O",
        hasilAssesmen: "",
        instruksiPPA: "",
        namaPerawat: "",
        _localId: createId(),
      },
    ]);
  };

  const removeNote = (localId: string) => {
    setNotes((prev) => {
      const note = prev.find((n) => n._localId === localId);
      if (note?.id) {
        setDeletedIds((ids) => [...ids, note.id!]);
      }
      return prev.filter((n) => n._localId !== localId);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const payload = {
        meta: {
          noRm: noRm || null,
          tanggal: tanggal || null,
          hariPerawatanKe: hariPerawatanKe ?? null,
        },
        notes: notes.map(({ _localId, ...rest }) => rest),
        deletedNoteIds: deletedIds,
      };

      await postJson<typeof payload, { ok?: boolean; message?: string }>(
        "/api/monitoring/catatan",
        payload
      );

      setSubmitSuccess(true);
      if (onSaved) onSaved();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER GRADIENT – sama tema */}
      <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-700 shadow-lg">
        <div className="relative flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-16 h-32 w-32 rounded-full bg-teal-300/10 blur-3xl" />

          <div className="relative space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-700/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-100/90 ring-1 ring-emerald-500/40">
              <span className="h-[1px] w-6 bg-emerald-200/80" />
              ICU • Page 6
            </div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-emerald-50 sm:text-xl">
              <BookOpenCheck className="h-5 w-5 text-emerald-200" />
              Catatan Perkembangan Pasien Terintegrasi
            </h2>
            <p className="max-w-xl text-xs text-emerald-100/90">
              Dokumentasi perkembangan pasien dengan format O/A/P, termasuk
              instruksi PPA dan paraf perawat, dalam tampilan digital yang rapi.
            </p>
          </div>

          <div className="relative flex flex-col items-end gap-1 text-[11px] text-emerald-100/90">
            {noRm && (
              <div className="flex items-center gap-1">
                <User className="h-3 w-3 text-emerald-200" />
                <span>
                  No. RM:{" "}
                  <span className="font-semibold text-emerald-50">
                    {noRm}
                  </span>
                </span>
              </div>
            )}
            {tanggal && (
              <span>
                Tanggal:{" "}
                <span className="font-semibold text-emerald-50">
                  {tanggal}
                </span>
              </span>
            )}
            {typeof hariPerawatanKe !== "undefined" && (
              <span>
                Hari perawatan ke:{" "}
                <span className="font-semibold text-emerald-50">
                  {hariPerawatanKe}
                </span>
              </span>
            )}
          </div>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-sm sm:p-5"
      >
        {/* HEADER LIST */}
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
              <FileText className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Daftar Catatan Perkembangan (O / A / P)
              </h3>
              <p className="text-[11px] text-slate-500">
                Setiap catatan berisi tanggal/jam, hasil assesmen, instruksi PPA
                dan paraf perawat.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
              Total catatan:{" "}
              <span className="font-semibold text-slate-800">
                {notes.length}
              </span>
            </span>
            <button
              type="button"
              onClick={addNote}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm hover:bg-emerald-800"
            >
              <Plus className="h-4 w-4" />
              Tambah catatan
            </button>
          </div>
        </div>

        {/* LIST NOTEs */}
        <div className="space-y-3">
          {notes.map((note, index) => (
            <div
              key={note._localId}
              className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)]"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                  <label className="flex-1 text-xs">
                    <span className="text-[11px] font-medium text-slate-700">
                      Tanggal / Jam
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <input
                        required
                        type="datetime-local"
                        value={note.tglJam}
                        onChange={(e) =>
                          updateNote(note._localId, "tglJam", e.target.value)
                        }
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </label>

                  <label className="w-full text-xs sm:w-40">
                    <span className="text-[11px] font-medium text-slate-700">
                      Keterangan (O / A / P)
                    </span>
                    <select
                      required
                      value={note.jenis}
                      onChange={(e) =>
                        updateNote(
                          note._localId,
                          "jenis",
                          e.target.value as ProgressNoteDTO["jenis"]
                        )
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="O">O – Objective</option>
                      <option value="A">A – Assessment</option>
                      <option value="P">P – Plan</option>
                    </select>
                  </label>
                </div>

                <div className="flex items-start justify-between gap-2 sm:w-60">
                  <label className="flex-1 text-xs">
                    <span className="text-[11px] font-medium text-slate-700">
                      Paraf Perawat (Nama)
                    </span>
                    <input
                      required
                      value={note.namaPerawat}
                      onChange={(e) =>
                        updateNote(
                          note._localId,
                          "namaPerawat",
                          e.target.value
                        )
                      }
                      placeholder="Nama perawat pemberi asuhan"
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeNote(note._localId)}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-rose-50 px-3 py-1 text-[11px] font-semibold text-rose-600 ring-1 ring-rose-100 hover:bg-rose-100 disabled:cursor-not-allowed disabled:text-slate-300"
                    disabled={notes.length === 1}
                  >
                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                    Hapus
                  </button>
                </div>
              </div>

              <label className="block text-xs">
                <span className="flex items-center gap-1 text-[11px] font-medium text-slate-700">
                  <Edit3 className="h-3.5 w-3.5 text-slate-500" />
                  Hasil Assesmen Pasien &amp; Pemberian Layanan
                </span>
                <textarea
                  required
                  rows={3}
                  value={note.hasilAssesmen}
                  onChange={(e) =>
                    updateNote(
                      note._localId,
                      "hasilAssesmen",
                      e.target.value
                    )
                  }
                  placeholder="Tulis assesmen dengan format O/A/P. Contoh: O: ..., A: ..., P: ..."
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </label>

              <label className="block text-xs">
                <span className="text-[11px] font-medium text-slate-700">
                  Instruksi PPA Termasuk Pasca Bedah
                </span>
                <textarea
                  required
                  rows={2}
                  value={note.instruksiPPA}
                  onChange={(e) =>
                    updateNote(
                      note._localId,
                      "instruksiPPA",
                      e.target.value
                    )
                  }
                  placeholder="Tuliskan instruksi PPA secara spesifik, termasuk instruksi pasca bedah bila ada."
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </label>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Catatan #{index + 1}</span>
                {note.id && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Tersimpan di server (ID: {note.id})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER / SUBMIT */}
        <footer className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-500 ring-1 ring-slate-200">
              <FileText className="h-3 w-3" />
            </span>
            Gunakan O/A/P untuk menjaga konsistensi catatan perkembangan. Data
            dikirim ke{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 text-[10px]">
              /api/monitoring/catatan
            </code>
            .
          </p>
          <div className="flex items-center gap-2">
            {submitError && (
              <span className="text-[11px] text-rose-600">{submitError}</span>
            )}
            {submitSuccess && (
              <span className="text-[11px] text-emerald-700">
                Catatan tersimpan. ✅
              </span>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-emerald-700 px-5 py-1.5 text-xs font-semibold text-emerald-50 shadow-sm hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Page 6"}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
};

export default CatatanTerintegrasi;
