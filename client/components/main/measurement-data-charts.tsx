import { useState, useMemo } from "react";
import { Heading } from "@/components/ui/heading";
import { useFetchAllMeasurements } from "@/hooks/useMeasurement";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { Separator } from "../ui/separator";
import { computeGlobalStats } from "@/lib/data-utils";
import { MeasurementSelector } from "../ui/measurement-selector";
import { StatCard } from "../ui/stat-card";
import { MeasurementData } from "@/types/types";
import Loader from "../ui/loader";

type GlobalStats = {
  [key: string]: {
    min: number;
    max: number;
    avg: number;
  };
};

export function MeasurementDataCharts() {
  const { data: measurementData, loading } = useFetchAllMeasurements();

  const [selectedMeasurementSerial, setSelectedMeasurementSerial] = useState<string | null>(null);
  const [selectedMinField, setSelectedMinField] = useState<string>("Temperature");
  const [selectedMaxField, setSelectedMaxField] = useState<string>("Temperature");
  const [selectedAvgField, setSelectedAvgField] = useState<string>("Temperature");

  const BAR_COMPARISON_THRESHOLD = 150;

  const availableMeasurements  = measurementData?.map((measurement: MeasurementData) => ({
    value: measurement.serial,
    label: `${measurement.serial}`,
  })) || [];

  const selectedMeasurement = measurementData?.find(
    (measurement: MeasurementData) => measurement.serial === selectedMeasurementSerial,
  );

  const chartData = selectedMeasurement
    ? [
        { name: "Temperature", value: selectedMeasurement.temperature },
        { name: "Pressure", value: selectedMeasurement.pressure },
        { name: "Length", value: selectedMeasurement.length },
        { name: "Noise", value: selectedMeasurement.noise },
        { name: "Sensor A", value: selectedMeasurement.rawSensorData.a },
        { name: "Sensor B", value: selectedMeasurement.rawSensorData.b },
        { name: "Sensor C", value: selectedMeasurement.rawSensorData.c },
        { name: "Sensor D", value: selectedMeasurement.rawSensorData.d },
        { name: "Sensor E", value: selectedMeasurement.rawSensorData.e },
        { name: "Sensor F", value: selectedMeasurement.rawSensorData.f },
      ]
    : [];

  const sensorFields = [
    { name: "Temperature", key: "temperature" },
    { name: "Pressure", key: "pressure" },
    { name: "Length", key: "length" },
    { name: "Noise", key: "noise" },
    { name: "Sensor A", key: "rawSensorData.a" },
    { name: "Sensor B", key: "rawSensorData.b" },
    { name: "Sensor C", key: "rawSensorData.c" },
    { name: "Sensor D", key: "rawSensorData.d" },
    { name: "Sensor E", key: "rawSensorData.e" },
    { name: "Sensor F", key: "rawSensorData.f" },
  ];

  const globalStats = useMemo<GlobalStats | null>(() => {
    if (!measurementData) return null;
    return computeGlobalStats(measurementData, sensorFields);
  }, [measurementData]);

  const getSelectedMeasurementValue  = (fieldKey: string): number | undefined => {
    if (!selectedMeasurement) return undefined;
    const keys = fieldKey.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return keys.reduce((acc: any, key: string) => acc[key], selectedMeasurement);
  };

  const getComparisonIndicator = (
    measurementValue: number | undefined,
    globalStatsValue: number | undefined
  ): JSX.Element => {
    if (measurementValue === undefined || globalStatsValue === undefined) {
      return <span className="text-gray-500">• N/A</span>;  
    }
  
    const difference = Math.abs(measurementValue - globalStatsValue);
  
    if (difference <= BAR_COMPARISON_THRESHOLD) {
      return <span className="text-green-500">• Good Device</span>;
    } else if (difference <= 2 * BAR_COMPARISON_THRESHOLD) {
      return <span className="text-yellow-500">• Slight Deviation</span>;
    } else {
      return <span className="text-red-500">• Anomaly Detected</span>;
    }
  };
  
  const getBarColorBasedOnComparison = (
    measurementValue: number | undefined,
    globalStatsValue: number | undefined
  ): string => {
    if (globalStatsValue === undefined || measurementValue === undefined) {
      return "gray";  
    }
  
    const difference = Math.abs(measurementValue - globalStatsValue);
  
    if (difference <= BAR_COMPARISON_THRESHOLD) {
      return "green";  // close to global average
    } else if (difference > BAR_COMPARISON_THRESHOLD && difference <= 2 * BAR_COMPARISON_THRESHOLD) {
      return "yellow"; //  within acceptable limits
    } else {
      return "red";   // Far above or below,
    }
  };
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      {selectedMeasurement ? (
        <Heading
          title={`Device Data Overview: ${selectedMeasurement.serial}`}
          description="Explore detailed metrics and visualisation and compare them to all other devices to identify potential anomalies or faulty devices."
        />
      ) : (
        <Heading title="Select a Device" description="Select a device to view its data." />
      )}
      <MeasurementSelector
        availableMeasurements={availableMeasurements}
        selectedMeasurementSerial={selectedMeasurementSerial}
        setSelectedMeasurementSerial={setSelectedMeasurementSerial}
      />

      <Separator className="my-4 " />

      {selectedMeasurement && globalStats && (
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            fieldLabel="Min Value"
            sensorFields={sensorFields}
            selectedField={selectedMinField}
            onSelectField={setSelectedMinField}
            selectedMeasurementValue={getSelectedMeasurementValue(
              sensorFields.find((field) => field.name === selectedMinField)?.key || "",
            )}
            globalStatValue={globalStats[selectedMinField]?.min}
            comparisonIndicator={getComparisonIndicator(
              getSelectedMeasurementValue(
                sensorFields.find((field) => field.name === selectedMinField)?.key || "",
              ),
              globalStats[selectedMinField]?.min,
            )}
            globalStatLabel="Overall Min"
          />

          <StatCard
            fieldLabel="Max Value"
            sensorFields={sensorFields}
            selectedField={selectedMaxField}
            onSelectField={setSelectedMaxField}
            selectedMeasurementValue={getSelectedMeasurementValue(
              sensorFields.find((field) => field.name === selectedMaxField)?.key || "",
            )}
            globalStatValue={globalStats[selectedMaxField]?.max}
            comparisonIndicator={getComparisonIndicator(
              getSelectedMeasurementValue(
                sensorFields.find((field) => field.name === selectedMaxField)?.key || "",
              ),
              globalStats[selectedMaxField]?.max,
            )}
            globalStatLabel="Overall Max"
          />

          <StatCard
            fieldLabel="Avg Value"
            sensorFields={sensorFields}
            selectedField={selectedAvgField}
            onSelectField={setSelectedAvgField}
            selectedMeasurementValue={getSelectedMeasurementValue(
              sensorFields.find((field) => field.name === selectedAvgField)?.key || "",
            )}
            globalStatValue={globalStats[selectedAvgField]?.avg}
            comparisonIndicator={getComparisonIndicator(
              getSelectedMeasurementValue(
                sensorFields.find((field) => field.name === selectedAvgField)?.key || "",
              ),
              globalStats[selectedAvgField]?.avg,
            )}
            globalStatLabel="Overall Avg"
          />
        </div>
      )}

      {selectedMeasurement && globalStats && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sensor Metrics Comparison</CardTitle>
              <CardDescription>
                The bars are colored based on their comparison to the global average:
                <ul className="list-none space-y-1 my-2">
                  <li className="flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Close to global average (±{BAR_COMPARISON_THRESHOLD}, Good device)
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                    Slight deviation from global average (±{BAR_COMPARISON_THRESHOLD * 2})
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    Large deviation from global average (More than ±{BAR_COMPARISON_THRESHOLD * 2}, Anomaly detected)
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                    No global average available
                  </li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart width={1000} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="9 9" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {chartData.map((entry, index) => {
                    const globalAvg = globalStats?.[entry.name]?.avg;
                    console.log(globalAvg);
                    const measurementValue = entry.value;

                    const fillColor = getBarColorBasedOnComparison(
                      measurementValue,
                      globalAvg,
                    );
                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                  })}
                </Bar>
              </BarChart>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
