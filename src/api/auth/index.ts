/**
 * Centralized authentication API client
 *
 * Responsibilities:
 * - Provide a single abstraction over auth-related backend calls
 * - Enforce consistent request / response handling
 * - Handle access-token refresh via response headers
 * - Ensure frontend never manually attaches tokens to requests
 *
 * IMPORTANT:
 * - This client intentionally throws errors for non-2xx responses
 * - UI layers are expected to handle errors via React Query `onError`
 */

import { tokenUtils, type User } from "../../utils/tokenUtils";

/**
 * Base URL for backend API.
 * This should always point to the auth-enabled backend gateway.
 */
const API_BASE = import.meta.env.VITE_BACKEND_API_URL;

/**
 * Generic API response shape (used for documentation / typing only).
 * NOTE:
 * - We do NOT return this shape to consumers.
 * - Errors are thrown instead of returned.
 */
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

/* -------------------------------------------------------------------------- */
/*                               Payload Types                                */
/* -------------------------------------------------------------------------- */

/**
 * Payload for user signup.
 * Used during initial account creation.
 */
export interface SignupPayload {
  name: string;
  organization: string;
  email: string;
  password: string;
}

/**
 * Payload for user signin.
 */
export interface SigninPayload {
  email: string;
  password: string;
}

/**
 * Payload for OTP verification.
 *
 * `purpose` controls backend behavior:
 * - "signup" → verify email & create account
 * - "reset"  → verify OTP and reset password
 *
 * `newPassword` is required ONLY when purpose === "reset"
 */
export interface VerifyOtpPayload {
  email: string;
  otp: string;
  purpose: "signup" | "reset";
  newPassword?: string;
}

/**
 * Standard auth response returned after successful authentication.
 * This shape is shared across:
 * - signin
 * - signup OTP verification
 * - password reset
 */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/* -------------------------------------------------------------------------- */
/*                              Low-level Client                               */
/* -------------------------------------------------------------------------- */

/**
 * Minimal HTTP client wrapper around fetch.
 *
 * Design decisions:
 * - Only POST is implemented (auth endpoints are mutation-only)
 * - Tokens are NOT attached manually to requests
 * - Access-token refresh is handled via response headers
 * - Errors are thrown to integrate cleanly with React Query
 */
const apiClient = {
  post: async <T = any>(endpoint: string, body: any): Promise<T> => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    /**
     * Access-token refresh handling
     *
     * Backend may return a new access token in the Authorization header.
     * If present, we update the stored access token while preserving
     * the existing refresh token.
     *
     * NOTE:
     * - Frontend never reads tokens directly during requests
     * - tokenUtils acts as the single source of truth
     */
    const authHeader = response.headers.get("authorization");
    if (authHeader) {
      const newAccessToken = authHeader.replace("Bearer ", "");
      const currentRefresh = tokenUtils.getRefreshToken();

      if (currentRefresh) {
        tokenUtils.setTokens(newAccessToken, currentRefresh);
      }
    }

    /**
     * Parse JSON response body.
     * Backend responses may wrap actual data inside `data`.
     */
    const data = await response.json();

    /**
     * Error handling strategy:
     * - Non-2xx responses throw Errors
     * - Error message is extracted from backend payload if available
     * - UI layers handle these via React Query `onError`
     */
    if (!response.ok) {
      throw new Error(data.message || data.error || "Request failed");
    }

    /**
     * Normalize successful responses:
     * - If backend wraps payload in `data`, unwrap it
     * - Otherwise return raw payload
     */
    return data.data ? data.data : data;
  },
};

/* -------------------------------------------------------------------------- */
/*                               Public Auth API                               */
/* -------------------------------------------------------------------------- */

/**
 * Auth API exposed to UI layers.
 *
 * NOTE:
 * - All methods return promises that either resolve with data or throw
 * - No method here performs navigation or state updates
 * - This keeps API concerns separate from UI concerns
 */
export const authApi = {
  /**
   * Create a new user account.
   * Sends signup data and triggers OTP email.
   */
  signup: (payload: SignupPayload) => {
    return apiClient.post<void>("/user/signup", payload);
  },

  /**
   * Verify OTP for signup or password reset.
   * Returns auth tokens and user data on success.
   */
  verifyOtp: (payload: VerifyOtpPayload) => {
    return apiClient.post<AuthResponse>("/user/verify-otp", payload);
  },

  /**
   * Authenticate an existing user.
   * Returns access token, refresh token, and user data.
   */
  signin: (payload: SigninPayload) => {
    return apiClient.post<AuthResponse>("/user/signin", payload);
  },

  /**
   * Initiate password reset flow.
   * Sends OTP to user's email.
   */
  requestPasswordReset: (payload: { email: string }) => {
    return apiClient.post<void>("/user/reset", payload);
  },

  /**
   * Complete password reset using OTP.
   * Reuses verify-otp endpoint with purpose="reset".
   */
  resetPassword: (payload: VerifyOtpPayload) => {
    return apiClient.post<AuthResponse>("/user/verify-otp", payload);
  },
};
