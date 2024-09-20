"use client";

import { MeasurementForm } from "@/components/main/measurement-form";
import React from "react";

const CreateMeasurementPage = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MeasurementForm initialMeasurement={null} /> 
      </div>
    </div>
  );
};

export default CreateMeasurementPage;
