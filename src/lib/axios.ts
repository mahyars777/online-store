import axios, { AxiosError } from "axios";
import { API_URL } from "@/lib/config";
import { ApiError } from "@/lib/api-error";
import type { ApiErrorResponse } from "@/types/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      // سرور جواب داده ولی خطا بوده (۴۰۰، ۵۰۰ و ...)
      return Promise.reject(
        new ApiError(
          error.response.data?.message ?? "خطای نامشخص از سرور",
          error.response.status,
        ),
      );
    }
    if (error.code === "ECONNABORTED") {
      return Promise.reject(new ApiError("زمان درخواست به پایان رسید"));
    }
    return Promise.reject(new ApiError("ارتباط با سرور برقرار نشد"));
  },
);
