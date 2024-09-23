export interface RawSensorData {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  g: string;
}

export interface MeasurementData {
  id?: number;
  serial: string;
  temperature: number;
  pressure: number;
  length: number;
  noise: number;
  timestamp: string;
  rawSensorData: RawSensorData;
}
