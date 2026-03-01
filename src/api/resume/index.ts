import { tokenUtils } from "../../utils/tokenUtils";
import { type ResumeProcessing } from "../job";

// filepath: c:\Development Projects\AI-Powered Resume Scanner\Frontend\src\api\resume\index.ts
/**
 * Centralized Resume API client
 *
 * Responsibilities:
 * - Provide abstraction over resume-related backend calls
 * - Attach access + refresh tokens automatically
 * - Handle access-token refresh via response headers
 * - Throw errors for non-2xx responses
 */

/* -------------------------------------------------------------------------- */
/*                                  Config                                    */
/* -------------------------------------------------------------------------- */

const API_BASE = import.meta.env.VITE_BACKEND_API_URL;

/* -------------------------------------------------------------------------- */
/*                             Low-level Client                               */
/* -------------------------------------------------------------------------- */

const apiClient = {
  get: async <T = any>(endpoint: string): Promise<T> => {
    const accessToken = tokenUtils.getAccessToken();
    const refreshToken = tokenUtils.getRefreshToken();

    if (!accessToken || !refreshToken) {
      throw new Error("Authentication required. Please login again.");
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": refreshToken,
      },
    });

    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      tokenUtils.setTokens(newAccessToken, refreshToken);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data.data ? data.data : data;
  },

  post: async <T = any>(endpoint: string, body: any): Promise<T> => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data.data ? data.data : data;
  },
};

/* -------------------------------------------------------------------------- */
/*                                Public API                                  */
/* -------------------------------------------------------------------------- */

export const resumeApi = {
  fetchResumeProcessing: (resumeProcessingId: string) => {
    return apiClient.get<ResumeProcessing>(`/processing/${resumeProcessingId}`);
  },

  createDeepAnalysis: (resumeProcessingId: string) => {
    return apiClient.post<any>(`/processing/${resumeProcessingId}/analyze`, {});
  },
};
