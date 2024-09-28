"use client";

import React from "react";
import { MeasurementDataCharts } from "@/components/main/measurement-data-charts";

const MeasurementDashBoardPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 mt-4  p-8">
        <MeasurementDataCharts />
      </div>
    </div>
  );
};

export default MeasurementDashBoardPage;
