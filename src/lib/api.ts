export const isMockMode = import.meta.env.VITE_USE_MOCK !== "false";

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

type RequestOptions = RequestInit & {
  fallback?: () => Promise<unknown>;
};

export const apiRequest = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { fallback, headers, ...rest } = options;

  if (isMockMode && fallback) {
    return (await fallback()) as T;
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  });

  if (!response.ok) {
    if (fallback) {
      return (await fallback()) as T;
    }

    throw new Error(`API error: ${response.status}`);
  }

  return (await response.json()) as T;
};
