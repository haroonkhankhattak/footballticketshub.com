"use client"; // Only if using App Router

const DEFAULT_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
};

// Define types for options
interface ApiClientOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: unknown;
  cache?: RequestCache;
  next?: { revalidate?: number }; // for Next.js specific revalidation
}

// Instead of <T = any>, we make <T = unknown>
export async function ApiClient<T = unknown>(
  url: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const finalOptions: RequestInit = {
    method: options.method || "GET",
    headers: {
      ...DEFAULT_HEADERS,
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache || "no-cache",
    next: options.next,
  };

  try {
    const res = await fetch(url, finalOptions);

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(
        `Request failed: ${res.status} ${res.statusText}\n${errorBody}`
      );
    }

    const data = (await res.json()) as T; // Safe type cast
    return data;
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
}
