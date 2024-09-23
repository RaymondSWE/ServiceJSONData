import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MenuIcon, CheckIcon } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  fieldLabel: string;
  sensorFields: { name: string; key: string }[];
  selectedField: string;
  onSelectField: (field: string) => void;
  selectedDeviceValue: number | undefined;
  globalStatLabel: string;
  globalStatValue: number | undefined;
  comparisonIndicator: JSX.Element;
}

export function StatCard({
  fieldLabel,
  sensorFields,
  selectedField,
  onSelectField,
  selectedDeviceValue,
  globalStatLabel,
  globalStatValue,
  comparisonIndicator,
}: StatCardProps) {
  const [fieldComboboxOpen, setFieldComboboxOpen] = useState(false);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center flex-row">
        <CardTitle className="text-lg">{fieldLabel}</CardTitle>
        <Popover open={fieldComboboxOpen} onOpenChange={setFieldComboboxOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[100px] text-xs p-2 flex items-center justify-between"
            >
              {selectedField}
              <MenuIcon className="ml-1 h-3 w-3 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput
                placeholder="Select a sensor field..."
                className="text-xs"
              />
              <CommandList>
                {sensorFields.map((field) => (
                  <CommandItem
                    key={field.name}
                    value={field.name}
                    onSelect={() => {
                      onSelectField(field.name);
                      setFieldComboboxOpen(false);
                    }}
                  >
                    {field.name}
                    <CheckIcon
                      className={`ml-auto h-3 w-3 ${selectedField === field.name ? "opacity-100" : "opacity-0"}`}
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
            <p className="text-lg font-bold text-gray-800">
              {selectedDeviceValue ?? "N/A"}
            </p>
            <span className="flex items-center space-x-2">
              {comparisonIndicator}
              <span className="text-xs text-gray-600">
                {globalStatLabel}: {globalStatValue?.toFixed(0) ?? "N/A"}
              </span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
