// app/patients/[id]/perkembanganpasien/page.tsx
import PerkembanganPasienClient from "./components/PerkembanganPasienClient";

interface PageProps {
  params: { id: string };
}

export default function PerkembanganPasienPage({ params }: PageProps) {
  const { id } = params;
  return <PerkembanganPasienClient patientId={id} />;
}
