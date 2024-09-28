"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { MeasurementColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { useTranslatedColumns } from "./columns";

interface MeasurementClientProps {
  data: MeasurementColumn[];
}

export const MeasurementClient: React.FC<MeasurementClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale;

  // Get translated columns
  const columns = useTranslatedColumns();

  return (
    <>
      <div className="flex items-center justify-between mr-24">
        <Heading
          title={`Device Measurements (${data.length})`}
          description="Manage your measurements for your devices."
        />
        <Button onClick={() => router.push(`/${locale}/measurement/add`)}>
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
