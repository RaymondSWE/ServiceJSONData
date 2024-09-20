import { useEffect, useState } from 'react';
import { fetchAllMeasurements, fetchMeasurementById } from '../services/measurement-service';
import { MeasurementData } from '../types/types';

export function useFetchAllMeasurements() {
  const [data, setData] = useState<MeasurementData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const measurements = await fetchAllMeasurements(); 
        setData(measurements);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
}

export function useFetchMeasurementById(id: number) {
  const [data, setData] = useState<MeasurementData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const measurement = await fetchMeasurementById(id);
        setData(measurement);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, error, loading };
}
