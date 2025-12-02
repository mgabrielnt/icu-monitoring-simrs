// app/patients/[id]/alatinvansive/page.tsx

import AlatInvasifClient from "./components/AlatInvasifClient";
import { DUMMY_MONITORING_PAGE2 } from "@/mocks/monitoringDummy";

interface PageProps {
  params: { id: string };
  searchParams?: {
    tanggal?: string;
    hariPerawatanKe?: string;
  };
}

const AlatInvasifPage = ({ params, searchParams }: PageProps) => {
  const noRm = params.id;

  // Untuk sementara pakai default kalau query tidak ada
  const tanggal = searchParams?.tanggal ?? "2024-12-01";
  const hariPerawatanKe = searchParams?.hariPerawatanKe
    ? Number(searchParams.hariPerawatanKe)
    : 1;

  return (
    <AlatInvasifClient
      noRm={noRm}
      tanggal={tanggal}
      hariPerawatanKe={hariPerawatanKe}
      initialData={DUMMY_MONITORING_PAGE2} // ⬅️ ini perbaikannya
    />
  );
};

export default AlatInvasifPage;
