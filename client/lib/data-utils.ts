import { MeasurementData } from "@/types/types";

// Utility to extract a value from nested object
export const getValueFromNestedObject = (object: any, keys: string[]): any => {
  return keys.reduce((acc, key) => acc[key], object);
};

// Compute stats for fields (min, max, avg)
export const computeGlobalStats = (
  devicesData: MeasurementData[],
  sensorFields: { name: string; key: string }[]
) => {
  const stats: Record<string, { min: number; max: number; avg: number }> = {};

  sensorFields.forEach((field) => {
    const values = devicesData.map((device) => {
      const keys = field.key.split(".");
      return getValueFromNestedObject(device, keys);
    });

    const numericValues = values.filter((value) => typeof value === "number");

    stats[field.name] = {
      min: Math.min(...numericValues),
      max: Math.max(...numericValues),
      avg: numericValues.reduce((sum, value) => sum + value, 0) / numericValues.length,
    };
  });

  return stats;
};
