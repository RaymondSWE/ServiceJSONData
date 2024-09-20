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
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/ui/alert-modal";
import { MeasurementData } from "@/types/types";
import { formSchema } from "@/schemas/measurement";
import { handleError } from "@/lib/error-handler";
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

  const title = initialMeasurement ? "Edit Measurement" : "Create Measurement";
  const description = initialMeasurement
    ? "Update your measurement data"
    : "Create a new measurement";
  const toastMessage = initialMeasurement
    ? "Measurement updated"
    : "Measurement created";
  const action = initialMeasurement  ? "Update Measurement" : "Create Measurement";

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
      timestamp: "",
    },
  });


  const onSubmit = async (data: MeasurementFormValues) => {
    try {
      setLoading(true);
      if (!initialMeasurement) {
        data.timestamp = new Date().toISOString(); 
      }
      if (initialMeasurement) {
        await axios.put(
            `http://localhost:8080/api/measurements/${initialMeasurement.id}`,
            data,
        );
      } else {
        await axios.post("http://localhost:8080/api/measurements", 
            data,
        );
        
      }
      router.push("/measurement/view");
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
        await axios.delete(`http://localhost:8080/api/measurements/${initialMeasurement.id}`);
        router.push("/measurement/view");
        router.refresh();
        toast.success("Measurement deleted successfully.");
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
        {initialMeasurement  && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Measurement
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
                  <FormLabel>Serial</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Serial number"
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
                  <FormLabel>Temperature (°C)</FormLabel>
                  <FormControl>
                    <Input
                      type="number" 
                      disabled={loading}
                      placeholder="Temperature"
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
                  <FormLabel>Pressure (Pa)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Pressure"
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
                  <FormLabel>Length (m)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Length"
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
                  <FormLabel>Noise (dB)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Noise"
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
                  <FormLabel>Sensor A</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Sensor A"
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
                  <FormLabel>Sensor B</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Sensor B"
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
                  <FormLabel>Sensor C</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Sensor C"
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
                  <FormLabel>Sensor D</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Sensor D"
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
                  <FormLabel>Sensor E</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Sensor E"
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
                  <FormLabel>Sensor F</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="Sensor F"
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
                  <FormLabel>Sensor G</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="Sensor G"
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