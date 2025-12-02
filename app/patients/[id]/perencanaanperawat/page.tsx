// app/patients/[id]/perencanaanperawat/page.tsx

import ImplementasiClient from "./components/ImplementasiClient";
import { fetchImplementasi } from "@/lib/icuMonitoring";

interface PageProps {
  params: { id: string };
  searchParams?: {
    tanggal?: string;
    hariPerawatanKe?: string;
  };
}

const PerencanaanPerawatPage = async ({
  params,
  searchParams,
}: PageProps) => {
  const noRm = params.id;
  const tanggal = searchParams?.tanggal ?? undefined;
  const hariPerawatanKe = searchParams?.hariPerawatanKe
    ? Number(searchParams.hariPerawatanKe)
    : undefined;

  const initialActivities =
    tanggal != null
      ? await fetchImplementasi(noRm, tanggal)
      : null;

  return (
    <ImplementasiClient
      noRm={noRm}
      tanggal={tanggal}
      hariPerawatanKe={hariPerawatanKe}
      initialActivities={initialActivities}
    />
  );
};

export default PerencanaanPerawatPage;
