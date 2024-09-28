"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cellAction";
import { useTranslations } from "next-intl";

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

export function useTranslatedColumns() {
  const t = useTranslations("measurementViewPage.columns");

  const columns: ColumnDef<MeasurementColumn>[] = [
    {
      accessorKey: "serial",
      header: t("serial"),
    },
    {
      accessorKey: "temperature",
      header: t("temperature"),
    },
    {
      accessorKey: "pressure",
      header: t("pressure"),
    },
    {
      accessorKey: "length",
      header: t("length"),
    },
    {
      accessorKey: "noise",
      header: t("noise"),
    },
    {
      accessorKey: "sensors",
      header: t("sensors"),
      cell: ({ row }) => (
        <div className="grid grid-cols-3 gap-y-1">
          <div>
            <strong>A:</strong> {row.original.sensors.a}
          </div>
          <div>
            <strong>B:</strong> {row.original.sensors.b}
          </div>
          <div>
            <strong>C:</strong> {row.original.sensors.c}
          </div>
          <div>
            <strong>D:</strong> {row.original.sensors.d}
          </div>
          <div>
            <strong>E:</strong> {row.original.sensors.e}
          </div>
          <div>
            <strong>F:</strong> {row.original.sensors.f}
          </div>
          <div>
            <strong>G:</strong> {row.original.sensors.g}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: t("dateCreated"),
    },
    {
      id: "actions",
      cell: ({ row }) => <CellAction data={row.original} />,
    },
  ];

  return columns;
}
