// app/patients/[id]/perkembanganpasien/page.tsx

import CatatanTerintegrasiClient from "./components/CatatanTerintegrasiClient";
import { DUMMY_PROGRESS_NOTES } from "@/mocks/monitoringDummy";

interface PageProps {
  params: { id: string };
  searchParams?: {
    tanggal?: string;
    hariPerawatanKe?: string;
  };
}

export default function PerkembanganPasienPage({
  params,
  searchParams,
}: PageProps) {
  const noRm = params.id;
  const tanggal = searchParams?.tanggal ?? "2024-12-01";
  const hariPerawatanKe = searchParams?.hariPerawatanKe
    ? Number(searchParams.hariPerawatanKe)
    : 3;

  return (
    <CatatanTerintegrasiClient
      noRm={noRm}
      tanggal={tanggal}
      hariPerawatanKe={hariPerawatanKe}
      initialNotes={DUMMY_PROGRESS_NOTES}
      // ❌ Jangan kirim fungsi dari Server ke Client
      // onSaved={() => { ... }}
    />
  );
}
