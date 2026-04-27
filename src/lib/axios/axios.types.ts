export interface AxiosClientConfig {
  baseURL: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number; // ms, optional
  onError?: (error: unknown) => void;
}

export interface AxiosRequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
