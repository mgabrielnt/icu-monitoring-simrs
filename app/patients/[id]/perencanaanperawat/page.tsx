// app/patients/[id]/perencanaanperawat/page.tsx

import ImplementasiClient from "./components/ImplementasiClient";
import { DUMMY_IMPLEMENTASI_ACTIVITIES } from "@/mocks/monitoringDummy";

interface PageProps {
  params: { id: string };
  searchParams?: {
    tanggal?: string;
    hariPerawatanKe?: string;
  };
}

export default function PerencanaanPerawatPage({
  params,
  searchParams,
}: PageProps) {
  const noRm = params.id;
  const tanggal = searchParams?.tanggal ?? "2024-12-01";
  const hariPerawatanKe = searchParams?.hariPerawatanKe
    ? Number(searchParams.hariPerawatanKe)
    : 3;

  return (
    <ImplementasiClient
      noRm={noRm}
      tanggal={tanggal}
      hariPerawatanKe={hariPerawatanKe}
      initialActivities={DUMMY_IMPLEMENTASI_ACTIVITIES}
      // ❌ Jangan kirim fungsi dari Server ke Client
      // onSaved={() => { ... }}
    />
  );
}
