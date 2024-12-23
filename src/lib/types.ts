export type TMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface TFetchOptions {
  type: TMethod;
  endpoint: string;
  headers?: Headers;
  body?: Record<string, any>;
}
