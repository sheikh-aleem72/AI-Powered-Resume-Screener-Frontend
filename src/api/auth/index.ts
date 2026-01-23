// Centralized API client for authentication
// Handles token attachment and response header token updates

import { tokenUtils, type User } from "../../utils/tokenUtils";

const API_BASE = import.meta.env.VITE_BACKEND_API_URL; // Base URL for the backend API

export interface ApiResponse<T = any> {
  data?: T; // Response data
  error?: string; // Error message
}

export interface SignupPayload {
  name: string; // User's name
  organization: string; // User's organization
  email: string; // User's email
  password: string; // User's password
}

export interface VerifyOtpPayload {
  email: string; // Email to verify
  otp: string; // OTP code
  purpose: string; // signup || reset password
  newPassword?: string; // If verifying for reset password
}

export interface VerifyOtpResponse {
  accessToken: string; // New access token
  refreshToken: string; // New refresh token
  user: User; // User details
}

const apiClient = {
  // Generic POST method for making API requests
  post: async <T = any>(endpoint: string, body: any): Promise<T> => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    // Handle refreshed access token
    const authHeader = response.headers.get("authorization");
    if (authHeader) {
      const newAccessToken = authHeader.replace("Bearer ", "");
      const currentRefresh = tokenUtils.getRefreshToken();
      if (currentRefresh) {
        tokenUtils.setTokens(newAccessToken, currentRefresh);
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Request failed");
    }

    return data;
  },
};

export const authApi = {
  signup: (payload: SignupPayload) => {
    return apiClient.post<void>("/user/signup", payload);
  },

  verifyOtp: (payload: VerifyOtpPayload) => {
    return apiClient.post<VerifyOtpResponse>("/user/verify-otp", payload);
  },
};
