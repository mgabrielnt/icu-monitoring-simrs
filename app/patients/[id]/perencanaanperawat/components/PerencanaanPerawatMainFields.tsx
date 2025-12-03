// app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatMainFields.tsx
"use client";

import { Dispatch, SetStateAction } from "react";
import { PerencanaanPerawatActivity } from "@/types/perencanaanPerawat";
import PerencanaanPerawatIdentityFields from "./PerencanaanPerawatIdentityFields";
import PerencanaanPerawatActivityTimeFields from "./PerencanaanPerawatActivityTimeFields";
import PerencanaanPerawatNotesDpjpFields from "./PerencanaanPerawatNotesDpjpFields";
import PerencanaanPerawatFormFooter from "./PerencanaanPerawatFormFooter";

interface Props {
  activities: PerencanaanPerawatActivity[];
  activityId: number;
  setActivityId: (id: number) => void;
  isOtherActivity: boolean;
  customActivityLabel: string;
  setCustomActivityLabel: Dispatch<SetStateAction<string>>;
  nurseName: string;
  setNurseName: Dispatch<SetStateAction<string>>;
  bedNumber: string;
  setBedNumber: Dispatch<SetStateAction<string>>;
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
  dpjpVerification: string;
  setDpjpVerification: Dispatch<SetStateAction<string>>;
  loading: boolean;
  error: string | null;
  success: string | null;
}

export default function PerencanaanPerawatMainFields(props: Props) {
  const {
    activities,
    activityId,
    setActivityId,
    isOtherActivity,
    customActivityLabel,
    setCustomActivityLabel,
    nurseName,
    setNurseName,
    bedNumber,
    setBedNumber,
    time,
    setTime,
    notes,
    setNotes,
    dpjpVerification,
    setDpjpVerification,
    loading,
    error,
    success,
  } = props;

  return (
    <div className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-25/40 p-3 sm:p-4">
      <PerencanaanPerawatIdentityFields
        nurseName={nurseName}
        setNurseName={setNurseName}
        bedNumber={bedNumber}
        setBedNumber={setBedNumber}
      />

      <PerencanaanPerawatActivityTimeFields
        activities={activities}
        activityId={activityId}
        setActivityId={setActivityId}
        isOtherActivity={isOtherActivity}
        customActivityLabel={customActivityLabel}
        setCustomActivityLabel={setCustomActivityLabel}
        time={time}
        setTime={setTime}
      />

      <PerencanaanPerawatNotesDpjpFields
        notes={notes}
        setNotes={setNotes}
        dpjpVerification={dpjpVerification}
        setDpjpVerification={setDpjpVerification}
      />

      <PerencanaanPerawatFormFooter
        loading={loading}
        error={error}
        success={success}
      />
    </div>
  );
}
