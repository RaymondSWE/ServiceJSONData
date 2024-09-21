"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Heading } from "@/components/ui/heading"
import { useFetchAllMeasurements } from "@/hooks/useMeasurement"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { CheckIcon, SortAscIcon } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"

export function MeasurementDataCharts() {
  const [searchSerial, setSearchSerial] = useState<string>("")
  const { data: devicesData, loading } = useFetchAllMeasurements()
  const [open, setOpen] = useState(false)
  const [selectedDeviceSerial, setSelectedDeviceSerial] = useState<string | null>(null)


  const availableDevices = devicesData?.map((device) => ({
    value: device.serial,
    label: `Device ${device.serial}`,
  })) || []

  const selectedDevice = devicesData?.find(
    (device) => device.serial === selectedDeviceSerial
  )

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div className="chart-wrapper mx-auto max-w-6xl p-6">

        {selectedDevice ? (
        <Heading title={`Device: ${selectedDevice.serial}`} description="View the data for the selected device." /> 
        ) : (
        <Heading title="Select a Device" description="Select a device to view its data." />
        )}
        <Popover open= {open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
            <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between mt-4"
          >
            {selectedDeviceSerial
              ? `Device ${selectedDeviceSerial}`
              : "Select device..."}
            <SortAscIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput placeholder="Search device..." className="h-9"/>
                    <CommandList>
                        <CommandEmpty>No device found.</CommandEmpty>
                        <CommandGroup title="Devices">
                            {availableDevices.map((device) => (
                                <CommandItem
                                key={device.value}
                                value={device.value}
                                onSelect={(currentValue) => {
                                  setSelectedDeviceSerial(currentValue)
                                  setOpen(false)
                                }}
                              >
                                {device.label}
                                <CheckIcon  className={`ml-auto h-4 w-4 ${
                                    selectedDeviceSerial === device.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
            </Popover>
    </div>
  )
}