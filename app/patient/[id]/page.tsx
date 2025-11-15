'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Activity, Clock, Calendar, ArrowLeft, User, Droplet, FileText, TrendingUp, Shield } from 'lucide-react';
import PatientInfo from '@/components/PatientInfo';
import AlatInvasif from '@/components/AlatInvasif';
import Hemodinamik from '@/components/Hemodinamik';
import BalanceCairan from '@/components/BalanceCairan';
import Implementasi from '@/components/Implementasi';
import CatatanTerintegrasi from '@/components/CatatanTerintegrasi';
import PerawatJagaForm from '@/components/PerawatJagaForm';

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('patient-info');

  // Update waktu setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const tabs = [
    { id: 'patient-info', label: 'Data Pasien', icon: User },
    { id: 'alat-invasif', label: 'Alat Invasif', icon: Shield },
    { id: 'hemodinamik', label: 'Hemodinamik', icon: Activity },
    { id: 'balance-cairan', label: 'Balance Cairan', icon: Droplet },
    { id: 'implementasi', label: 'Implementasi', icon: FileText },
    { id: 'catatan', label: 'Catatan Terintegrasi', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 hover:bg-blue-700 rounded-lg transition"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <Activity className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold">RS Prima Insan Mulia</h1>
                  <p className="text-blue-100 text-sm">Monitoring 24 Jam - ICU/IGD</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end space-x-2 text-sm text-blue-100">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(currentTime)}</span>
              </div>
              <div className="flex items-center justify-end space-x-2 text-xl font-mono font-bold mt-1">
                <Clock className="w-5 h-5" />
                <span>{formatTime(currentTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === 'patient-info' && (
          <>
            <PatientInfo />
            <div className="mt-6">
              <PerawatJagaForm />
            </div>
          </>
        )}
        {activeTab === 'alat-invasif' && <AlatInvasif />}
        {activeTab === 'hemodinamik' && <Hemodinamik currentTime={currentTime} />}
        {activeTab === 'balance-cairan' && <BalanceCairan currentTime={currentTime} />}
        {activeTab === 'implementasi' && <Implementasi currentTime={currentTime} />}
        {activeTab === 'catatan' && <CatatanTerintegrasi currentTime={currentTime} />}
      </div>
    </div>
  );
}