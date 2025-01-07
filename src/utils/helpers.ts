import type { TFetchOptions, TMethod } from "@/lib/types";

export function requestSplitter(input: string): TFetchOptions {
  const trimmed = input.trim();
  const split = trimmed.split(" ");

  const type = split.length === 1 ? "GET" : split[0].toUpperCase() as TMethod;
  const endpoint = split.length === 1 ? split[0] : split[1];

  return {
    type,
    endpoint,
  };
}