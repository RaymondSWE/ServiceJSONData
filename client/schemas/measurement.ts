// Put the MAX and MIN in environment variables

import * as z from "zod";

export const formSchema = z.object({
  serial: z
    .string()
    .min(1, "Serial is required")
    .max(255, "Serial must be 255 characters or less"),
  temperature: z.coerce.number(),
  pressure: z.coerce
    .number()
    .min(-1000, "Pressure must be greater than or equal to -1000")
    .max(1000, "Pressure must be less than or equal to 1000"),
  length: z.coerce
    .number()
    .min(-1000, "Length must be greater than or equal to -1000")
    .max(1000, "Length must be less than or equal to 1000"),
  noise: z.coerce
    .number()
    .min(-1000, "Noise must be greater than or equal to -1000")
    .max(1000, "Noise must be less than or equal to 1000"),
  rawSensorData: z.object({
    a: z.coerce.number(),
    b: z.coerce.number(),
    c: z.coerce.number(),
    d: z.coerce.number(),
    e: z.coerce.number(),
    f: z.coerce.number(),
    g: z.string(),
  }),
});
