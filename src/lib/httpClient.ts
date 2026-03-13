/**
 * HTTP Client - Wrapper chung cho fetch API
 * Sử dụng bởi các file API khác
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Hàm fetch API wrapper chung
 * Xử lý response, token, và error
 */
export async function httpClient<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ""; // có thể cấu hình base URL nếu cần
  const url = `${baseUrl}${endpoint}`;

  try {
    const headers: HeadersInit = {
      ...options.headers,
    };

    // chỉ set JSON nếu body là object
    if (options.body && !(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `Error: ${response.status}`,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Hàm helper để kiểm tra xem request có thành công không
 */
export function isApiSuccess<T>(
  response: ApiResponse<T>,
): response is ApiResponse<T> & { data: T } {
  return response.success && response.data !== undefined;
}

/**
 * Hàm helper để xử lý lỗi API
 */
export function handleApiError(
  error: ApiResponse<unknown>,
  fallbackMessage: string = "Có lỗi xảy ra",
): string {
  if (!error.success) {
    return error.error || fallbackMessage;
  }
  return fallbackMessage;
}
