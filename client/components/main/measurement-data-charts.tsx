"use client"

import { useState, useMemo } from "react"
import { Heading } from "@/components/ui/heading"
import { useFetchAllMeasurements } from "@/hooks/useMeasurement"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import {  MenuIcon } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Separator } from "../ui/separator"

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
  const [deviceComboboxOpen, setDeviceComboboxOpen] = useState(false)
  const [minFieldComboboxOpen, setMinFieldComboboxOpen] = useState(false)
  const [maxFieldComboboxOpen, setMaxFieldComboboxOpen] = useState(false)
  const [avgFieldComboboxOpen, setAvgFieldComboboxOpen] = useState(false)

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

    const stats: GlobalStats = {};

    sensorFields.forEach((field) => {
      const values = devicesData.map((device) => {
        const keys = field.key.split('.')
        return keys.reduce((acc, key) => acc[key], device)
      })

      stats[field.name] = {
        min: Math.min(...values.filter((value) => typeof value === 'number')),
        max: Math.max(...values.filter((value) => typeof value === 'number')),
        avg: values
        .filter((value) => typeof value === 'number')
        .reduce((acc, value) => acc + value, 0) / values.length
      }
    })


    return stats
  }, [devicesData])

  

  const getSelectedDeviceValue = (fieldKey: string): DeviceValue  => {
    if (!selectedDevice) return undefined;
    const keys = fieldKey.split('.');
    return keys.reduce((acc: any, key: string) => acc[key], selectedDevice);
  }
  
          
  // Compare selected device with global statistics
  const getComparisonIndicator = (
    deviceValue: DeviceValue,
    globalStatsValue: number | undefined
  ): JSX.Element => {
    if (deviceValue === undefined || globalStatsValue === undefined) {
      return <span className="text-gray-500">• No Global Data</span>;
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

      <Popover open={deviceComboboxOpen} onOpenChange={setDeviceComboboxOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={deviceComboboxOpen}
            className="w-[200px] justify-between mt-4"
          >
            {selectedDeviceSerial
              ? `Device ${selectedDeviceSerial}`
              : "Select a device serial"}
            <MenuIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput
              placeholder="Search by device serial.."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No device found.</CommandEmpty>
              <CommandGroup title="Devices">
                {availableDevices.map((device) => (
                  <CommandItem
                    key={device.value}
                    value={device.value}
                    onSelect={(currentValue) => {
                      setSelectedDeviceSerial(currentValue)
                      setDeviceComboboxOpen(false)
                    }}
                  >
                    {device.label}
                    <CheckIcon
                      className={`ml-auto h-4 w-4 ${
                        selectedDeviceSerial === device.value
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Separator className="my-4 "/>

        {selectedDevice && globalStats && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
          <CardHeader className="flex justify-between items-center flex-row">
          <CardTitle className="text-lg">Min Value</CardTitle>
              <Popover open={minFieldComboboxOpen} onOpenChange={setMinFieldComboboxOpen}>
                <PopoverTrigger asChild>
                <Button variant="outline" className="w-[100px] text-xs p-2 flex items-center justify-between">
                    {selectedMinField}
                    <MenuIcon className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Select a sensor field..." className="text-xs" />
                    <CommandList>
                      {sensorFields.map((field) => (
                        <CommandItem
                          key={field.name}
                          value={field.name}
                          onSelect={(currentValue) => {
                            setSelectedMinField(currentValue)
                            setMinFieldComboboxOpen(false)
                          }}
                        >
                          {field.name}
                          <CheckIcon
                            className={`ml-auto h-3 w-3 ${
                              selectedMinField === field.name
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-1 bg-gray-50 p-4 rounded-md shadow-sm">
                    <div className="flex items-center justify-between">
                    {(() => {
                        const selectedFieldKey = sensorFields.find(field => field.name === selectedMinField)?.key;
                        const selectedDeviceValue = getSelectedDeviceValue(selectedFieldKey);
                        const globalMinValue = globalStats?.[selectedMinField]?.min;

                        return (
                        <>
                            <p className="text-lg font-bold text-gray-800">
                            {selectedDeviceValue}
                            </p>
                            <span className="flex items-center space-x-2">
                            {getComparisonIndicator(selectedDeviceValue, globalMinValue)}
                            <span className="text-xs text-gray-600">(Overall Min: {globalMinValue})</span>
 
                            </span>
                        </>
                        );
                    })()}
                    </div>
                </div>
            </CardContent>
          </Card>

          {/* Max Value Card with Combobox */}
          <Card>
            <CardHeader className="flex justify-between items-center flex-row">
              <CardTitle className="text-lg">Max Value</CardTitle>
              <Popover open={maxFieldComboboxOpen} onOpenChange={setMaxFieldComboboxOpen}>
                <PopoverTrigger asChild>
                <Button variant="outline" className="w-[100px] text-xs p-2 flex items-center justify-between">
                    {selectedMaxField}
                    <MenuIcon className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Select a sensor field..." />
                    <CommandList>
                      {sensorFields.map((field) => (
                        <CommandItem
                          key={field.name}
                          value={field.name}
                          onSelect={(currentValue) => {
                            setSelectedMaxField(currentValue)
                            setMaxFieldComboboxOpen(false)
                          }}
                        >
                          {field.name}
                          <CheckIcon
                            className={`ml-auto h-3 w-3 ${
                              selectedMaxField === field.name
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col space-y-1 bg-gray-50 p-4 rounded-md shadow-sm">
                <div className="flex items-center justify-between">
                {(() => {
                    const selectedFieldKey = sensorFields.find(field => field.name === selectedMaxField)?.key;
                    const selectedDeviceValue = getSelectedDeviceValue(selectedFieldKey);
                    const globalMaxValue = globalStats?.[selectedMaxField]?.max;

                    return (
                    <>
                        <p className="text-lg font-bold text-gray-800">
                        {selectedDeviceValue}
                        </p>
                        <span className="flex items-center space-x-2">
                        {getComparisonIndicator(selectedDeviceValue, globalMaxValue)}
                        <span className="text-xs text-gray-600">(Overall Max: {globalMaxValue})</span>

                        </span>
                    </>
                    );
                })()}
                </div>
            </div>
            </CardContent>

          </Card>

          {/* Avg Value Card with Combobox */}
          <Card>
            <CardHeader className="flex justify-between items-center flex-row">
              <CardTitle className="text-lg">Avg Value</CardTitle>
              <Popover open={avgFieldComboboxOpen} onOpenChange={setAvgFieldComboboxOpen}>
                <PopoverTrigger asChild>
                <Button variant="outline" className="w-[100px] text-xs p-2 flex items-center justify-between">
                    {selectedAvgField}
                    <MenuIcon className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Select a sensor field..." />
                    <CommandList>
                      {sensorFields.map((field) => (
                        <CommandItem
                          key={field.name}
                          value={field.name}
                          onSelect={(currentValue) => {
                            setSelectedAvgField(currentValue)
                            setAvgFieldComboboxOpen(false)
                          }}
                        >
                          {field.name}
                          <CheckIcon
                            className={`ml-auto h-3 w-3 ${
                              selectedAvgField === field.name
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                          />
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-1 bg-gray-50 p-4 rounded-md shadow-sm">
                    <div className="flex items-center justify-between">
                    {(() => {
                        const selectedFieldKey = sensorFields.find(field => field.name === selectedAvgField)?.key;
                        const selectedDeviceValue = getSelectedDeviceValue(selectedFieldKey);
                        const globalAvgValue = globalStats?.[selectedAvgField]?.avg;

                        return (
                        <>
                            <p className="text-lg font-bold text-gray-800">
                            {selectedDeviceValue}
                            </p>
                            <span className="flex items-center space-x-2">
                            {getComparisonIndicator(selectedDeviceValue, globalAvgValue)}
                            <span className="text-xs text-gray-600">(Overall Avg: {globalAvgValue})</span>
                            </span>
                        </>
                        );
                    })()}
                    </div>
                </div>
                </CardContent>

          </Card>
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
