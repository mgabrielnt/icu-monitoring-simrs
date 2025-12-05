import React from "react";
export interface Patient {
  nama: string;
  noRM: string;
  tanggalLahir?: string;
  jenisKelamin?: string;
}

export interface Badge {
  label: string;
  variant?: "primary" | "secondary" | "success" | "warning";
  icon?: React.ReactNode;
  pulse?: boolean;
}

export interface HeaderContent {
  subtitle: string;
  title: string;
  description?: string;
}

export interface HeaderPatientsProps {
  patient?: Patient;
  content: HeaderContent;
  badges?: Badge[];
  showBackButton?: boolean;
  backButtonHref?: string;
  onBackClick?: () => void;
}