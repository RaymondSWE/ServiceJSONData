"use client";

import React from "react";
import { MeasurementClient } from "../view/components/client";
import { MeasurementColumn } from "../view/components/columns";
import { format } from "date-fns";
import { useFetchAllMeasurements } from "@/hooks/useMeasurement"; 
import { MeasurementDataCharts } from "@/components/main/measurement-data-charts";

const MeasurementPage = () => {
  const { data, loading } = useFetchAllMeasurements(); 

  if (loading) return <div>Loading...</div>;

  const formattedMeasurements: MeasurementColumn[] = (data || []).map((measurement) => {
    
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
      }, // Keep sensors as an object
      createdAt: format(new Date(measurement.timestamp), "MM/dd/yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 mt-4">
        <MeasurementDataCharts/>
      </div>
    </div>
  );
};

export default MeasurementPage;
