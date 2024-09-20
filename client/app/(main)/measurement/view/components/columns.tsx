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
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];