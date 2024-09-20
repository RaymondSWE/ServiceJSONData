import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ErrorResponse {
  timestamp: string;
  status: number;
  message: string;
}

// Centralized error handler
export function handleError(error: AxiosError<ErrorResponse> | unknown): void {
  if (error instanceof AxiosError) {
    if (error.response) {
      const { status, message } = error.response.data;

      switch (status) {
        case 400:
          toast.error(`Validation Error: ${message}`);
          break;
        case 404:
          toast.error(`Not Found: ${message}`);
          break;
        case 500:
          toast.error(`Server Error: ${message}`);
          break;
        default:
          toast.error(`Error ${status}: ${message}`);
      }
    } else {
      toast.error("Network error, please try again later.");
    }
  } else {
    toast.error("An unexpected error occurred.");
  }
}
