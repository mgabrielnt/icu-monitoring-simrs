// D:\projek-medis\icu-monitoring-simrs\app\patients\[id]\alatinvansive\page.tsx

import type { Metadata } from "next";
import AlatInvansivePageClient from "./components/AlatInvansivePageClient";

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Pemasangan Alat Invasif - ICU SIMRS",
};

export default function AlatInvansivePage({ params }: PageProps) {
  return <AlatInvansivePageClient patientId={params.id} />;
}
