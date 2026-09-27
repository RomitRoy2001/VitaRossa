// src/api/api.ts
// Centralized Axios client. The ONLY place that creates Axios instances.
// All features use this — never raw axios.get() in components.

import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/environment';

// Token management helpers (localStorage-based for now)
const TOKEN_KEY = 'bf_access_token';
const REFRESH_KEY = 'bf_refresh_token';

export const tokenStorage = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  getRefresh: (): string | null => localStorage.getItem(REFRESH_KEY),
  setRefresh: (token: string): void => localStorage.setItem(REFRESH_KEY, token),
  clear: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

// Create the Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor — attach JWT token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (env.enableDebug) {
      console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data ?? '');
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — handle 401, normalize errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenStorage.getRefresh();
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${env.apiBaseUrl}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          tokenStorage.setToken(data.access);
          if (apiClient.defaults.headers) {
            (apiClient.defaults.headers as Record<string, string>).Authorization = `Bearer ${data.access}`;
          }
          return apiClient(originalRequest);
        } catch {
          tokenStorage.clear();
          window.location.href = '/login';
        }
      } else {
        tokenStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
