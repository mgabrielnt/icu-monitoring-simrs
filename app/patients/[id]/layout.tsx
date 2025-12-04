// app/patients/[id]/layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const patientId = params.id as string;
  
  const [activeMenu, setActiveMenu] = useState('datadiri');

  useEffect(() => {
    if (pathname === `/patients/${patientId}`) {
      setActiveMenu('datadiri');
    } else {
      const currentPath = pathname.split('/').pop();
      if (currentPath) {
        setActiveMenu(currentPath);
      }
    }
  }, [pathname, patientId]);

  const handleLogout = () => {
    if (confirm('Yakin ingin logout?')) {
      router.push('/dashboard');
    }
  };

  const handleMenuChange = (menu: string) => {
    setActiveMenu(menu);
    
    const routes: Record<string, string> = {
      datadiri: `/patients/${patientId}`,
      alatinvasif: `/patients/${patientId}/alatinvansive`,
      hemodinamik: `/patients/${patientId}/hemodinamik`,
      instruksiobat: `/patients/${patientId}/instruksiobat`,
      perencanaanperawat: `/patients/${patientId}/perencanaanperawat`,
      perkembanganpasien: `/patients/${patientId}/perkembanganpasien`,
    };
    
    if (routes[menu]) {
      router.push(routes[menu]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />
      <Navbar active={activeMenu} onChange={handleMenuChange} />
      <main>{children}</main>
    </div>
  );
}
