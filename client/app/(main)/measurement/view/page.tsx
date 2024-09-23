"use client";

import React from "react";
import { MeasurementClient } from "./components/client";
import { MeasurementColumn } from "./components/columns";
import { format } from "date-fns";
import { useFetchAllMeasurements } from "@/hooks/useMeasurement";

const MeasurementPage = () => {
  const { data, loading } = useFetchAllMeasurements();

  if (loading) return <div>Loading...</div>;

  const formattedMeasurements: MeasurementColumn[] = (data || []).map(
    (measurement) => {
      return {
        id: measurement.id ? measurement.id.toString() : "",
        serial: measurement.serial,
        temperature: measurement.temperature,
        pressure: measurement.pressure,
        length: measurement.length,
        noise: measurement.noise,
        sensors: {
          a: measurement.rawSensorData.a,
          b: measurement.rawSensorData.b,
          c: measurement.rawSensorData.c,
          d: measurement.rawSensorData.d,
          e: measurement.rawSensorData.e,
          f: measurement.rawSensorData.f,
          g: measurement.rawSensorData.g,
        },
        createdAt: format(new Date(measurement.timestamp), "yyyy-MM-dd, HH:mm"),
      };
    },
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 mt-4">
        <MeasurementClient data={formattedMeasurements} />
      </div>
    </div>
  );
};

export default MeasurementPage;
