// handlers/patientHandlers.ts
"use client";

// Router minimal yang kita butuhkan: hanya butuh .push()
type RouterLike = {
  push: (href: string) => void;
};

export function handleBackToDashboard(router: RouterLike) {
  return () => {
    router.push("/dashboard");
  };
}

/**
 * Handle navigation back in browser history
 */
export function handleGoBack() {
  return () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };
}

/**
 * Handle refresh patient data
 */
export function handleRefreshPatient(refreshFn: () => Promise<void>) {
  return async () => {
    try {
      await refreshFn();
      alert("Data pasien berhasil di-refresh!");
    } catch (error) {
      console.error("Error refreshing patient:", error);
      alert("Gagal refresh data pasien");
    }
  };
}

/**
 * Handle print patient data
 */
export function handlePrintPatientData() {
  return () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };
}

/**
 * Create patient detail handlers
 */
export function createPatientDetailHandlers(router: RouterLike) {
  return {
    goBackToDashboard: handleBackToDashboard(router),
    goBack: handleGoBack(),
    printData: handlePrintPatientData(),
  };
}
