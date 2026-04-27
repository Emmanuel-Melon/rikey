import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  AxiosClientConfig,
  HttpMethod,
  AxiosRequestOptions,
} from "./axios.types";

export class AxiosClient {
  private axiosInstance: AxiosInstance;
  private onError?: (error: unknown) => void;

  constructor(config: AxiosClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL.replace(/\/$/, ""),
      headers: config.defaultHeaders,
      timeout: config.timeout,
    });

    this.onError = config.onError;

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (this.onError) this.onError(error);
        throw error;
      },
    );
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    body?: unknown,
    options?: AxiosRequestOptions,
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      method,
      url: endpoint.startsWith("/") ? endpoint : `/${endpoint}`,
      headers: {
        ...(this.axiosInstance.defaults.headers as Record<string, string>),
        ...options?.headers,
      },
      signal: options?.signal,
    };

    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
      config.data = body;
    }

    try {
      const response: AxiosResponse<T> =
        await this.axiosInstance.request(config);

      // Handle 204 No Content
      if (response.status === 204) {
        return undefined as T;
      }

      return response.data;
    } catch (error) {
      // Transform axios errors to match the previous format
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const errorData = error.response?.data || {};
        const message =
          errorData.message ||
          errorData.error ||
          error.message ||
          "Unknown error";

        throw new Error(`HTTP ${status || "Network Error"}: ${message}`);
      }
      throw error;
    }
  }

  get<T>(endpoint: string, options?: AxiosRequestOptions): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, options);
  }

  post<T>(
    endpoint: string,
    body?: unknown,
    options?: AxiosRequestOptions,
  ): Promise<T> {
    return this.request<T>("POST", endpoint, body, options);
  }

  put<T>(
    endpoint: string,
    body?: unknown,
    options?: AxiosRequestOptions,
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, body, options);
  }

  patch<T>(
    endpoint: string,
    body?: unknown,
    options?: AxiosRequestOptions,
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, body, options);
  }

  delete<T>(endpoint: string, options?: AxiosRequestOptions): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, options);
  }
}

export function createAxiosClient(config: AxiosClientConfig): AxiosClient {
  return new AxiosClient(config);
}
