export type TMethod = "GET" | "POST" | "PUT" | "DELETE";

export type TFetchOptions = {
  type: TMethod;
  endpoint: string;
  headers?: Headers;
  body?: Record<string, any>;
};

export type TServiceOptions = {
  baseUrl?: string;
};

export type TRunOptions = {
  editor_command?: string;
  prompt?: string;
};
