import { SIGNIN_PATH } from "@/root/routes-constants";
import { clearUserCredentials, getAccessToken } from "@/shared/utils/local-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken && config?.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearUserCredentials();
      window.location.href = SIGNIN_PATH;
    }
    return Promise.reject(error);
  }
);
