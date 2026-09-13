const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://nuzul-backend.vercel.app/api";

export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  error: string;
  data: T[];
}

export class ApiError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(message: string, statusCode: number, errorCode: string = "") {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method?: HttpMethod;
  body?: object | FormData;
}

// Generic request function used by every feature's api.ts file.

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  const { method = "GET", body } = options;

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  let requestBody: BodyInit | undefined;

  if (method !== "GET" && body) {
    if (body instanceof FormData) {
      requestBody = body;
    } else {
      headers["Content-Type"] = "application/json";
      requestBody = JSON.stringify(body);
    }
  }

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: requestBody,
      credentials: "include",
    });
  } catch {
    throw new ApiError("Network error, please check your connection", 0);
  }

  let json: ApiResponse<T>;

  try {
    json = await response.json();
  } catch {
    throw new ApiError("Unexpected server response", response.status);
  }

  if (!response.ok || json.status === "error") {
    throw new ApiError(
      json.message || "Something went wrong",
      response.status,
      json.error,
    );
  }

  return json;
}
