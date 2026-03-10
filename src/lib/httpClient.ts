import { tokenUtils } from "../utils/tokenUtils";

const API_BASE = import.meta.env.VITE_BACKEND_API_URL;

/**
 * Internal request handler used by all HTTP methods.
 * Ensures consistent token handling and response normalization.
 */
const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const accessToken = tokenUtils.getAccessToken();
  const refreshToken = tokenUtils.getRefreshToken();

  if (!accessToken || !refreshToken) {
    tokenUtils.clearAuth();
    window.location.href = "/auth/signin";
    throw new Error("Authentication required. Please login again.");
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "x-refresh-token": refreshToken,
      ...(options.headers || {}),
    },
  });

  /**
   * Handle refreshed access token
   * Backend sends new token in `x-access-token`
   */
  const newAccessToken = response.headers.get("x-access-token");
  if (newAccessToken) {
    tokenUtils.setTokens(newAccessToken, refreshToken);
  }

  /**
   * If refresh token expired → backend returns 401
   * Redirect user to login
   */
  if (response.status === 401 || response.status === 403) {
    tokenUtils.clearAuth();
    window.location.href = "/auth/signin";
    throw new Error("Session expired. Please login again.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  /**
   * Preserve your existing response contract
   */
  return data.data ? data.data : data;
};

export const httpClient = {
  get: <T = any>(endpoint: string): Promise<T> => {
    return request<T>(endpoint, {
      method: "GET",
    });
  },

  post: <T = any>(endpoint: string, body?: any): Promise<T> => {
    return request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put: <T = any>(endpoint: string, body?: any): Promise<T> => {
    return request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete: <T = any>(endpoint: string): Promise<T> => {
    return request<T>(endpoint, {
      method: "DELETE",
    });
  },
};
