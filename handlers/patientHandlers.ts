// handlers/patientHandlers.ts

import { NextRouter } from 'next/navigation';
export function handleBackToDashboard(router: NextRouter) {
  return () => {
    router.push('/dashboard');
  };
}

/**
 * Handle navigation back in browser history
 */
export function handleGoBack() {
  return () => {
    window.history.back();
  };
}

/**
 * Handle refresh patient data
 */
export function handleRefreshPatient(refreshFn: () => Promise<void>) {
  return async () => {
    try {
      await refreshFn();
      alert('Data pasien berhasil di-refresh!');
    } catch (error) {
      console.error('Error refreshing patient:', error);
      alert('Gagal refresh data pasien');
    }
  };
}

/**
 * Handle print patient data
 */
export function handlePrintPatientData() {
  return () => {
    window.print();
  };
}

/**
 * Create patient detail handlers
 */
export function createPatientDetailHandlers(router: NextRouter) {
  return {
    goBackToDashboard: handleBackToDashboard(router),
    goBack: handleGoBack(),
    printData: handlePrintPatientData(),
  };
}