import axios from "axios";
import { MeasurementData } from "../types/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8080/api/measurements";

export async function fetchAllMeasurements(): Promise<MeasurementData[]> {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
}

export async function fetchMeasurementById(
  id: number,
): Promise<MeasurementData | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 404
    ) {
      return null;
    }
    throw new Error(`Failed to fetch measurement ${id}`);
  }
}

export async function createMeasurement(
  data: MeasurementData,
): Promise<MeasurementData> {
  const response = await axios.post(`${API_BASE_URL}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function updateMeasurement(
  id: number,
  data: MeasurementData,
): Promise<MeasurementData> {
  const response = await axios.put(`${API_BASE_URL}/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export async function deleteMeasurement(id: number): Promise<void> {
  await axios.delete(`${API_BASE_URL}/${id}`);
}
