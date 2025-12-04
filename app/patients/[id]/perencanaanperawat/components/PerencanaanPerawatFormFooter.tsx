// app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatFormFooter.tsx
"use client";

interface Props {
  loading: boolean;
  error: string | null;
  success: string | null;
}

export default function PerencanaanPerawatFormFooter({
  loading,
  error,
  success,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[11px] text-emerald-700/80">
          Implementasi akan otomatis muncul di{" "}
          <span className="font-semibold">tabel riwayat</span> di bawah.
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-emerald-700/30 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
        >
          {loading ? "Menyimpan…" : "Simpan Implementasi"}
        </button>
      </div>

      {error && (
        <p className="text-[11px] font-medium text-red-600">{error}</p>
      )}
      {success && (
        <p className="text-[11px] font-medium text-emerald-700">{success}</p>
      )}
    </>
  );
}
