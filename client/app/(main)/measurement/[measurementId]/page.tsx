"use client";

import { useFetchMeasurementById } from '@/hooks/useMeasurement';
import { MeasurementForm } from '@/components/main/measurement-form';
import React from 'react';
import { useParams } from 'next/navigation';

const MeasurementPage = ({ params }: { params: { measurementId: string } }) => {
  const { measurementId } = useParams();  
  const id = Number(measurementId);       
  const { data, loading, error } = useFetchMeasurementById(id);  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MeasurementForm initialMeasurement={data} /> 
      </div>
    </div>
  );
};

export default MeasurementPage;
