"use client";

import { useFetchMeasurementById } from "@/hooks/useMeasurement";
import { MeasurementForm } from "@/components/main/measurement-form";
import React from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/loader";

const MeasurementIdPage = () => {
  const { measurementId } = useParams();
  const id = Number(measurementId);
  const { data, loading } = useFetchMeasurementById(id);

  if (loading) return <Loader />;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MeasurementForm initialMeasurement={data} />
      </div>
    </div>
  );
};

export default MeasurementIdPage;
