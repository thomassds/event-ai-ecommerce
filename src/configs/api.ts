import axios from "axios";
import { store } from "../store";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API,
});

apiClient.interceptors.request.use(
  async (config) => {
    const state = store.getState();

    const { token } = state.auth;
    const { tenant } = state.tenant;

    if (!tenant) {
      const storageTenant = localStorage.getItem("tenant");

      if (storageTenant) {
        const parsedTenant = JSON.parse(storageTenant);
        config.headers["x-tenant-id"] = parsedTenant.id;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (tenant?.id) {
      config.headers["x-tenant-id"] = tenant.id;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    console.log("Api Error:", error);

    return Promise.reject(error);
  }
);

export const setAuthToken = (token?: string, userId?: string) => {
  if (token && userId) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    apiClient.defaults.headers.common["User"] = userId;

    return;
  }

  delete apiClient.defaults.headers.common["Authorization"];
  delete apiClient.defaults.headers.common["User"];
};
