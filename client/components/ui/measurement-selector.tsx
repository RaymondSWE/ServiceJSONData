"use client";

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
import { useTranslations } from "next-intl"; 

interface MeasurementSelectorProps {
  availableMeasurements: { value: string; label: string }[];
  selectedMeasurementSerial: string | null;
  setSelectedMeasurementSerial: (serial: string) => void;
}

export function MeasurementSelector({
  availableMeasurements,
  selectedMeasurementSerial,
  setSelectedMeasurementSerial,
}: MeasurementSelectorProps) {
  const [measurementComboboxOpen, setMeasurementComboboxOpen] = useState(false);
  const t = useTranslations("measurementSelector"); 

  return (
    <Popover
      open={measurementComboboxOpen}
      onOpenChange={setMeasurementComboboxOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={measurementComboboxOpen}
          className="w-[200px] justify-between mt-4"
        >
          {selectedMeasurementSerial
            ? `${selectedMeasurementSerial}`
            : t("selectSerial")} 
          <MenuIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput
            placeholder={t("searchPlaceholder")} 
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{t("noMeasurementFound")}</CommandEmpty> 
            <CommandGroup title={t("measurementsGroupTitle")}> 
              {availableMeasurements.map((measurement) => (
                <CommandItem
                  key={measurement.value}
                  value={measurement.value}
                  onSelect={() => {
                    setSelectedMeasurementSerial(measurement.value);
                    setMeasurementComboboxOpen(false);
                  }}
                >
                  {measurement.label}
                  <CheckIcon
                    className={`ml-auto h-4 w-4 ${selectedMeasurementSerial === measurement.value ? "opacity-100" : "opacity-0"}`}
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
