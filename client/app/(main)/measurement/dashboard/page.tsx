"use client";

import React from "react";
import { MeasurementDataCharts } from "@/components/main/measurement-data-charts";

const MeasurementPage = () => {

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 mt-4">
        <MeasurementDataCharts/>
      </div>
    </div>
  );
};

export default MeasurementPage;
