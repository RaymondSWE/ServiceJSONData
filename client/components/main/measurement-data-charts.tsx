"use client"

import { useState, useMemo } from "react"
import { Heading } from "@/components/ui/heading"
import { useFetchAllMeasurements } from "@/hooks/useMeasurement"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Separator } from "../ui/separator"
import { computeGlobalStats } from "@/lib/data-utils"
import { DeviceSelector } from "../ui/device-selector"
import { StatCard } from "../ui/stat-card"

type GlobalStats = {
    [key: string]: {
      min: number;
      max: number;
      avg: number;
    };
  };

  type Device = {
    serial: string;
    temperature: number;
    pressure: number;
    length: number;
    noise: number;
    rawSensorData: {
      a: number;
      b: number;
      c: number;
      d: number;
      e: number;
      f: number;
    };
  };
  
  type DeviceValue = number | undefined;
  

export function MeasurementDataCharts() {
  const { data: devicesData, loading } = useFetchAllMeasurements()

  const [selectedDeviceSerial, setSelectedDeviceSerial] = useState<string | null>(null)
  const [selectedMinField, setSelectedMinField] = useState<string>("Temperature")
  const [selectedMaxField, setSelectedMaxField] = useState<string>("Temperature")
  const [selectedAvgField, setSelectedAvgField] = useState<string>("Temperature")

  

  const availableDevices = devicesData?.map((device: Device) => ({
    value: device.serial,
    label: `${device.serial}`,
  })) || []

  const selectedDevice = devicesData?.find(
    (device: Device) => device.serial === selectedDeviceSerial
  )

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
    : []

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
      ]
    const globalStats = useMemo<GlobalStats  | null>(() => {
    if (!devicesData) return null
    return computeGlobalStats(devicesData, sensorFields);
  }, [devicesData])

  

  const getSelectedDeviceValue = (fieldKey: string): DeviceValue  => {
    if (!selectedDevice) return undefined;
    const keys = fieldKey.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return keys.reduce((acc: any, key: string) => acc[key], selectedDevice);
  }
  
          
  // Compare selected device with global statistics
  const getComparisonIndicator = (
    deviceValue: DeviceValue,
    globalStatsValue: number | undefined
  ): JSX.Element => {
    if (deviceValue === undefined || globalStatsValue === undefined) {
      return <span className="text-gray-500">• N/A</span>;
    }
  
    if (deviceValue > globalStatsValue) {
      return <span className="text-green-500">↑ Above</span>;
    }
    if (deviceValue < globalStatsValue) {
      return <span className="text-red-500">↓ Below</span>;
    }
  
    return <span className="text-gray-500">• Equal</span>;
  };
  
  

  if (loading) {
    return <p>Loading...</p>
  }


  return (
    <div className="mx-auto max-w-6xl p-6">
      {selectedDevice ? (
        <Heading
          title={`Device Data Overview: ${selectedDevice.serial}`}
          description="Explore detailed metrics and visualisation and compare them to all other devices to identify potential anomalies or faulty devices."
          />
      ) : (
        <Heading
          title="Select a Device"
          description="Select a device to view its data."
        />
      )}
      <DeviceSelector
        availableDevices={availableDevices}
        selectedDeviceSerial={selectedDeviceSerial}
        setSelectedDeviceSerial={setSelectedDeviceSerial}
        />

      <Separator className="my-4 "/>

        {selectedDevice && globalStats && (
        <div className="grid grid-cols-3 gap-4">
         <StatCard
            fieldLabel="Min Value"
            sensorFields={sensorFields}
            selectedField={selectedMinField}
            onSelectField={setSelectedMinField}
            selectedDeviceValue={getSelectedDeviceValue(sensorFields.find(field => field.name === selectedMinField)?.key || '')}
            globalStatValue={globalStats[selectedMinField]?.min}
            comparisonIndicator={getComparisonIndicator(getSelectedDeviceValue(sensorFields.find(field => field.name === selectedMinField)?.key || ''), globalStats[selectedMinField]?.min)}
            globalStatLabel="Overall Min"
          />

            <StatCard
            fieldLabel="Max Value"
            sensorFields={sensorFields}
            selectedField={selectedMaxField}
            onSelectField={setSelectedMaxField}
            selectedDeviceValue={getSelectedDeviceValue(sensorFields.find(field => field.name === selectedMaxField)?.key || '')}
            globalStatValue={globalStats[selectedMaxField]?.max}
            comparisonIndicator={getComparisonIndicator(getSelectedDeviceValue(sensorFields.find(field => field.name === selectedMaxField)?.key || ''), globalStats[selectedMaxField]?.max)}
            globalStatLabel="Overall Max"
          />

            <StatCard
            fieldLabel="Avg Value"
            sensorFields={sensorFields}
            selectedField={selectedAvgField}
            onSelectField={setSelectedAvgField}
            selectedDeviceValue={getSelectedDeviceValue(sensorFields.find(field => field.name === selectedAvgField)?.key || '')}
            globalStatValue={globalStats[selectedAvgField]?.avg}
            comparisonIndicator={getComparisonIndicator(getSelectedDeviceValue(sensorFields.find(field => field.name === selectedAvgField)?.key || ''), globalStats[selectedAvgField]?.avg)}
            globalStatLabel="Overall Avg"
            />
        </div>
      )}

      {/* Bar chart */}
      {selectedDevice && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle> Device Sensor Data </CardTitle>
              <CardDescription>
                View key sensor measurements for the device {selectedDevice.serial}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart width={1000} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#FDDA0D" />
              </BarChart>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
