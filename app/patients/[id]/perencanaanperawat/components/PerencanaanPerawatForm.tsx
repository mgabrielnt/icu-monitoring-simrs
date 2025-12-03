// app/patients/[id]/perencanaanperawat/components/PerencanaanPerawatForm.tsx
"use client";

import {
  CreatePerencanaanPerawatImplementationPayload,
  PerencanaanPerawatActivity,
} from "@/types/perencanaanPerawat";
import PerencanaanPerawatShiftSelector from "./PerencanaanPerawatShiftSelector";
import PerencanaanPerawatMainFields from "./PerencanaanPerawatMainFields";
import { usePerencanaanPerawatFormState } from "@/hooks/usePerencanaanPerawatFormState";

interface Props {
  activities: PerencanaanPerawatActivity[];
  onSubmit: (
    payload: CreatePerencanaanPerawatImplementationPayload
  ) => Promise<unknown>;
  loading?: boolean;
}

export default function PerencanaanPerawatForm({
  activities,
  onSubmit,
  loading,
}: Props) {
  const {
    shift,
    setShift,
    activityId,
    setActivityId,
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
    isOtherActivity,
    error,
    success,
    handleSubmit,
  } = usePerencanaanPerawatFormState({ activities, onSubmit });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 pb-4 pt-4 sm:px-5 sm:pt-5"
    >
      <PerencanaanPerawatShiftSelector shift={shift} onChange={setShift} />

      {shift && (
        <PerencanaanPerawatMainFields
          activities={activities}
          activityId={activityId}
          setActivityId={setActivityId}
          isOtherActivity={isOtherActivity}
          customActivityLabel={customActivityLabel}
          setCustomActivityLabel={setCustomActivityLabel}
          nurseName={nurseName}
          setNurseName={setNurseName}
          bedNumber={bedNumber}
          setBedNumber={setBedNumber}
          time={time}
          setTime={setTime}
          notes={notes}
          setNotes={setNotes}
          dpjpVerification={dpjpVerification}
          setDpjpVerification={setDpjpVerification}
          loading={!!loading}
          error={error}
          success={success}
        />
      )}
    </form>
  );
}
