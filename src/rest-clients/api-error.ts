export default class ApiError extends Error {
  constructor(message: string, public status?: number, public data?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

export async function handleFetchErrors(error: unknown): Promise<ApiError> {
  if (error instanceof Response) {
    let errorData;
    try {
      errorData = await error.json();
    } catch {
      errorData = null;
    }

    return new ApiError(
      errorData?.message || error.statusText || "Unknown API error",
      error.status,
      errorData
    );
  }

  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  return new ApiError("Unknown error occurred");
}
