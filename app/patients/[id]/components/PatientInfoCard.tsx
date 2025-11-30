// app/patients/[id]/components/PatientInfoCard.tsx

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PatientInfoCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string | number;
}

export default function PatientInfoCard({ 
  icon: Icon, 
  iconColor, 
  label, 
  value 
}: PatientInfoCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
      <div className="flex items-center space-x-2 mb-2">
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      <p className="font-bold text-xl text-gray-800">{value}</p>
    </div>
  );
}