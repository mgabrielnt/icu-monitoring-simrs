import CatatanTerintegrasiClient from "./components/CatatanTerintegrasiClient";
import { fetchProgressNotes } from "@/lib/icuMonitoring";

interface PageProps {
  params: { id: string };
  searchParams?: {
    tanggal?: string;
    hariPerawatanKe?: string;
  };
}

const PerkembanganPasienPage = async ({
  params,
  searchParams,
}: PageProps) => {
  const noRm = params.id;
  const tanggal = searchParams?.tanggal ?? undefined;
  const hariPerawatanKe = searchParams?.hariPerawatanKe
    ? Number(searchParams.hariPerawatanKe)
    : undefined;

  const initialNotes =
    tanggal != null ? await fetchProgressNotes(noRm, tanggal) : null;

  return (
    <CatatanTerintegrasiClient
      noRm={noRm}
      tanggal={tanggal}
      hariPerawatanKe={hariPerawatanKe}
      initialNotes={initialNotes}
    />
  );
};

export default PerkembanganPasienPage;
