"use client";
import React, { useState } from "react";
import { MeasurementColumn } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { AlertModal } from "@/components/ui/alert-modal";
import { deleteMeasurement } from "@/services/measurement-service";
import { handleError } from "@/lib/error-handler";
import { useTranslations } from "next-intl";

interface CellActionProps {
  data: MeasurementColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale; 
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("measurementViewPage.measurementCellActions");


  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(t("copySuccess"));
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteMeasurement(Number(data.id));
      toast.success(t("deleteSuccess"));
      await new Promise((resolve) => setTimeout(resolve, 750));
      window.location.reload();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">{t("label")}</span>
          <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            {t("copyID")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${locale}/measurement/${data.id}`)}
          >
            <Edit2 className="mr-2 h-4 w-4" />
            {t("edit")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
