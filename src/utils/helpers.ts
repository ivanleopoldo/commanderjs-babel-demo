import type { TFetchOptions, TMethod } from "@/lib/types";

export function requestSplitter(input: string): TFetchOptions {
  const trimmed = input.trim();

  const split = trimmed.split(" ");

  if (split.length === 1) {
    return {
      type: "GET",
      endpoint: split[0],
    };
  }

  return {
    type: split[0].toUpperCase() as TMethod,
    endpoint: split[1],
  };
}
