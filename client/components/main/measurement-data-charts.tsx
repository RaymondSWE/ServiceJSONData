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
import { DeviceSelector } from "../ui/device-selector";
import { StatCard } from "../ui/stat-card";
import { MeasurementData } from "@/types/types";

type GlobalStats = {
  [key: string]: {
    min: number;
    max: number;
    avg: number;
  };
};

export function MeasurementDataCharts() {
  const { data: measurementData, loading } = useFetchAllMeasurements();

  const [selectedDeviceSerial, setSelectedDeviceSerial] = useState<string | null>(null);
  const [selectedMinField, setSelectedMinField] = useState<string>("Temperature");
  const [selectedMaxField, setSelectedMaxField] = useState<string>("Temperature");
  const [selectedAvgField, setSelectedAvgField] = useState<string>("Temperature");

  const BAR_COMPARISON_THRESHOLD = 150;

  const availableDevices = measurementData?.map((device: MeasurementData) => ({
    value: device.serial,
    label: `${device.serial}`,
  })) || [];

  const selectedDevice = measurementData?.find(
    (device: MeasurementData) => device.serial === selectedDeviceSerial,
  );

  const chartData = selectedDevice
    ? [
        { name: "Temperature", value: selectedDevice.temperature },
        { name: "Pressure", value: selectedDevice.pressure },
        { name: "Length", value: selectedDevice.length },
        { name: "Noise", value: selectedDevice.noise },
        { name: "Sensor A", value: selectedDevice.rawSensorData.a },
        { name: "Sensor B", value: selectedDevice.rawSensorData.b },
        { name: "Sensor C", value: selectedDevice.rawSensorData.c },
        { name: "Sensor D", value: selectedDevice.rawSensorData.d },
        { name: "Sensor E", value: selectedDevice.rawSensorData.e },
        { name: "Sensor F", value: selectedDevice.rawSensorData.f },
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

  const getMeasurementForSelectedDevice  = (fieldKey: string): number | undefined => {
    if (!selectedDevice) return undefined;
    const keys = fieldKey.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return keys.reduce((acc: any, key: string) => acc[key], selectedDevice);
  };

  const getComparisonIndicator = (
    measurementValue: number | undefined,
    globalStatsValue: number | undefined,
  ): JSX.Element => {
    if (measurementValue === undefined || globalStatsValue === undefined) {
      return <span className="text-gray-500">• N/A</span>;
    }

    const difference = Math.abs(measurementValue - globalStatsValue);

    if (difference <= BAR_COMPARISON_THRESHOLD) {
      return <span className="text-gray-500">• Close</span>;
    } else if (measurementValue > globalStatsValue) {
      return <span className="text-green-500">↑ Above</span>;
    } else {
      return <span className="text-red-500">↓ Below</span>;
    }
  };

  const getBarColorBasedOnComparison = (
    measurementValue: number | undefined,
    globalStatsValue: number | undefined,
  ): string => {
    if (globalStatsValue === undefined || measurementValue === undefined) {
      return "gray";
    }

    const difference = Math.abs(measurementValue - globalStatsValue);

    if (difference <= BAR_COMPARISON_THRESHOLD) {
      return "gray";
    } else if (measurementValue > globalStatsValue) {
      return "green";
    } else {
      return "red";
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      {selectedDevice ? (
        <Heading
          title={`Device Data Overview: ${selectedDevice.serial}`}
          description="Explore detailed metrics and visualisation and compare them to all other devices to identify potential anomalies or faulty devices."
        />
      ) : (
        <Heading title="Select a Device" description="Select a device to view its data." />
      )}
      <DeviceSelector
        availableDevices={availableDevices}
        selectedDeviceSerial={selectedDeviceSerial}
        setSelectedDeviceSerial={setSelectedDeviceSerial}
      />

      <Separator className="my-4 " />

      {selectedDevice && globalStats && (
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            fieldLabel="Min Value"
            sensorFields={sensorFields}
            selectedField={selectedMinField}
            onSelectField={setSelectedMinField}
            selectedDeviceValue={getMeasurementForSelectedDevice(
              sensorFields.find((field) => field.name === selectedMinField)?.key || "",
            )}
            globalStatValue={globalStats[selectedMinField]?.min}
            comparisonIndicator={getComparisonIndicator(
              getMeasurementForSelectedDevice(
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
            selectedDeviceValue={getMeasurementForSelectedDevice(
              sensorFields.find((field) => field.name === selectedMaxField)?.key || "",
            )}
            globalStatValue={globalStats[selectedMaxField]?.max}
            comparisonIndicator={getComparisonIndicator(
              getMeasurementForSelectedDevice(
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
            selectedDeviceValue={getMeasurementForSelectedDevice(
              sensorFields.find((field) => field.name === selectedAvgField)?.key || "",
            )}
            globalStatValue={globalStats[selectedAvgField]?.avg}
            comparisonIndicator={getComparisonIndicator(
              getMeasurementForSelectedDevice(
                sensorFields.find((field) => field.name === selectedAvgField)?.key || "",
              ),
              globalStats[selectedAvgField]?.avg,
            )}
            globalStatLabel="Overall Avg"
          />
        </div>
      )}

      {selectedDevice && globalStats && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sensor Metrics Comparison</CardTitle>
              <CardDescription>
                The bars are colored based on their comparison to the global average
                <ul className="list-none space-y-1 my-2">
                  <li className="flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Above global average
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    Below global average
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
                    Close to global average (±{BAR_COMPARISON_THRESHOLD})
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
                    const globalAvg = globalStats[selectedAvgField]?.avg;
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
