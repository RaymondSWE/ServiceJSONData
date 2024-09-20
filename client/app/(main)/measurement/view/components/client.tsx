"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { MeasurementColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface MeasurementClientProps  {
  data: MeasurementColumn[];
}

export const MeasurementClient: React.FC<MeasurementClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between mr-24">
        <Heading
          title={`Measurements (${data.length})`}
          description="Manage your measurements for your devices."
        />
        <Button
          onClick={() => router.push("/measurement/add")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Measurement
        </Button>
      </div>
      <Separator />
      <div className="mr-24">
        <DataTable columns={columns} data={data} searchKey="serial" />
      </div>
    </>
  );
};
