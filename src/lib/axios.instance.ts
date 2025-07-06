import axios from "axios";
import { toast } from "sonner";
export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api` || "localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (res) => {
    if (res?.data?.message) {
      if (res?.data?.success) toast.success(res?.data?.message);
      else toast.error(res?.data?.message);
    }
    return res;
  },
  (error): Promise<string> => {
    // Any status codes outside the range of 2xx will trigger this function
    if (axios.isAxiosError(error)) {
      // checking for specific error codes or responses here
      console.error(
        "Axios error occurred:",
        error?.response?.data?.message || error?.message,
      );
      toast.error(error?.response?.data?.message || error?.message);
    } else {
      console.error("Unexpected error occurred:", error?.message);
      toast.error(error?.message);
    }
    // Optionally, return a rejected promise to propagate the error further
    return Promise.reject(error);
  },
);
