// app/patients/[id]/alatinvansive/page.tsx
// (pindah ke src/app/... kalau struktur kamu pakai src/)

import AlatInvasifClient from "./components/AlatInvasifClient";

interface PageProps {
  params: { id: string };
  searchParams?: {
    tanggal?: string;
    hariPerawatanKe?: string;
  };
}

const AlatInvasifPage = ({ params, searchParams }: PageProps) => {
  const tanggal = searchParams?.tanggal ?? undefined;
  const hariPerawatanKe = searchParams?.hariPerawatanKe
    ? Number(searchParams.hariPerawatanKe)
    : undefined;

  return (
    <AlatInvasifClient
      noRm={params.id}
      tanggal={tanggal}
      hariPerawatanKe={hariPerawatanKe}
    />
  );
};

export default AlatInvasifPage;
