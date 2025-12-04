// file: app/patients/[id]/perencanaanperawat/page.tsx

import PerencanaanPerawatPageClient from "./components/PerencanaanPerawatPageClient";

interface PageProps {
  params: { id: string };
}

export default function PerencanaanPerawatPage({ params }: PageProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <PerencanaanPerawatPageClient patientId={params.id} />
    </div>
  );
}
