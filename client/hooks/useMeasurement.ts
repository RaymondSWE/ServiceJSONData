import { useEffect, useState } from "react";
import {
  fetchAllMeasurements,
  fetchMeasurementById,
} from "../services/measurement-service";
import { MeasurementData } from "../types/types";
import { handleError } from "@/lib/error-handler";

// TODO:: add loader component to show loading state
export function useFetchAllMeasurements() {
  const [data, setData] = useState<MeasurementData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const measurements = await fetchAllMeasurements();
        setData(measurements);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
}

export function useFetchMeasurementById(id: number) {
  const [data, setData] = useState<MeasurementData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const measurement = await fetchMeasurementById(id);
        setData(measurement);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading };
}
