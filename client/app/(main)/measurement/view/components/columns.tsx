"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MeasurementColumn = {
  id: string;
  serial: string;
  temperature: number;
  pressure: number;
  length: number;
  noise: number;
  sensors: {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    g: string;
  };
  createdAt: string;
};

export const columns: ColumnDef<MeasurementColumn>[] = [
  {
    accessorKey: "serial",
    header: "Serial",
  },
  {
    accessorKey: "temperature",
    header: "Temperature (°C)",
  },
  {
    accessorKey: "pressure",
    header: "Pressure (Pa)",
  },
  {
    accessorKey: "length",
    header: "Length (m)",
  },
  {
    accessorKey: "noise",
    header: "Noise (dB)",
  },
  {
    accessorKey: "sensors",
    header: "Sensors",
    cell: ({ row }) => (
      <div className="grid grid-cols-3 gap-y-1">
        <div><strong>A:</strong> {row.original.sensors.a}</div>
        <div><strong>B:</strong> {row.original.sensors.b}</div>
        <div><strong>C:</strong> {row.original.sensors.c}</div>
        <div><strong>D:</strong> {row.original.sensors.d}</div>
        <div><strong>E:</strong> {row.original.sensors.e}</div>
        <div><strong>F:</strong> {row.original.sensors.f}</div>
        <div><strong>G:</strong> {row.original.sensors.g}</div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];