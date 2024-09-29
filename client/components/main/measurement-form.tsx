"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";

import { Heading } from "@/components/ui/heading";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Trash2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/ui/alert-modal";
import { MeasurementData } from "@/types/types";
import { formSchema } from "@/schemas/measurement";
import { handleError } from "@/lib/error-handler";
import { useTranslations } from "next-intl";
interface MeasurementFormProps {
  initialMeasurement: MeasurementData | null;
}

type MeasurementFormValues = z.infer<typeof formSchema>;

export const MeasurementForm: React.FC<MeasurementFormProps> = ({
  initialMeasurement,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("measurementForm");
  const { locale } = useParams();
  const title = initialMeasurement ? t("titleEdit") : t("titleCreate");
  const description = initialMeasurement
    ? t("descriptionEdit")
    : t("descriptionCreate");
  const toastMessage = initialMeasurement
    ? t("toastUpdate")
    : t("toastCreate");
  const action = initialMeasurement
    ? t("buttons.submitEdit")
    : t("buttons.submitCreate");

  const form = useForm<MeasurementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialMeasurement || {
      serial: "",
      temperature: 0,
      pressure: 0,
      length: 0,
      noise: 0,
      rawSensorData: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: "",
      },
    },
  });

  const onSubmit = async (data: MeasurementFormValues) => {
    try {
      setLoading(true);
      const requestData: MeasurementData = {
        ...data,
        timestamp: initialMeasurement?.timestamp || new Date().toISOString(),
      };

      if (initialMeasurement) {
        await axios.put(
          `http://localhost:8080/api/measurements/${initialMeasurement.id}`,
          data,
        );
      } else {
        await axios.post("http://localhost:8080/api/measurements", requestData);
      }
      router.push(`/${locale}/measurement/view`); 
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      if (initialMeasurement?.id) {
        await axios.delete(
          `http://localhost:8080/api/measurements/${initialMeasurement.id}`,
        );
        router.push(`/${locale}/measurement/view`); 
        router.refresh();
        toast.success(t("toastDelete"));
      }
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
        itemName={initialMeasurement?.serial}
      />
      <div className="flex justify-between items-center p-4">
        <Heading title={title} description={description} />
        {initialMeasurement && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {t("buttons.delete")}
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="serial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.serial")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("labels.serial")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.temperature")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={t("labels.temperature")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pressure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.pressure")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={t("labels.pressure")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.length")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={t("labels.length")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="noise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.noise")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={t("labels.noise")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="rawSensorData.a"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.sensorA")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={t("labels.sensorA")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rawSensorData.b"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.sensorB")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={t("labels.sensorB")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rawSensorData.c"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.sensorC")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={t("labels.sensorC")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rawSensorData.d"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.sensorD")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={t("labels.sensorD")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rawSensorData.e"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.sensorE")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={t("labels.sensorE")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rawSensorData.f"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.sensorF")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder={t("labels.sensorF")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rawSensorData.g"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.sensorG")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder={t("labels.sensorG")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="mt-4" type="submit" size="sm">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
