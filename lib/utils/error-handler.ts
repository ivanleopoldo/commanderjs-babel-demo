export function handleError(err: Error | unknown) {
  if (err instanceof Error) {
    console.error("Error: ", err.message);
  }
}
