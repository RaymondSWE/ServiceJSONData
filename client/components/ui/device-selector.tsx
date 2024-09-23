import { useState } from "react";
import { Button } from "./button";
import { MenuIcon, CheckIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

interface DeviceSelectorProps {
  availableDevices: { value: string; label: string }[];
  selectedDeviceSerial: string | null;
  setSelectedDeviceSerial: (serial: string) => void;
}

export function DeviceSelector({
  availableDevices,
  selectedDeviceSerial,
  setSelectedDeviceSerial,
}: DeviceSelectorProps) {
  const [deviceComboboxOpen, setDeviceComboboxOpen] = useState(false);

  return (
    <Popover open={deviceComboboxOpen} onOpenChange={setDeviceComboboxOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={deviceComboboxOpen}
          className="w-[200px] justify-between mt-4"
        >
          {selectedDeviceSerial
            ? `${selectedDeviceSerial}`
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
                  onSelect={() => {
                    setSelectedDeviceSerial(device.value);
                    setDeviceComboboxOpen(false);
                  }}
                >
                  {device.label}
                  <CheckIcon
                    className={`ml-auto h-4 w-4 ${selectedDeviceSerial === device.value ? "opacity-100" : "opacity-0"}`}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}