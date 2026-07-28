import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../features/auth/api";
import { tokenUtils } from "../../features/auth/utils/tokenUtils";

/**
 * Verify OTP page
 *
 * Responsibilities:
 * - Validate OTP entered by user
 * - Complete signup flow by exchanging OTP for tokens
 * - Persist auth state (tokens + minimal user info)
 * - Prevent invalid access or revisiting after success
 */
export const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Email is expected to be passed from signup page
   * via navigation state. This page should never be
   * accessed directly without it.
   */
  const email: string | undefined = location.state?.email;

  /** OTP input state (digits only, max 6) */
  const [otp, setOtp] = useState("");

  /** Backend error message shown below OTP input */
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * OTP verification mutation.
   * On success, backend returns tokens and user payload.
   */
  const verifyMutation = useMutation({
    mutationFn: authApi.verifyOtp,
    onSuccess: (response) => {
      const { accessToken, refreshToken, user } = response;

      // Persist tokens for authenticated requests
      tokenUtils.setTokens(accessToken, refreshToken);

      // Store only minimal user data needed on client
      tokenUtils.setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      /**
       * Replace history so browser back button
       * can never return to OTP page after success
       */
      navigate("/guide", { replace: true });
    },
    onError: (error: Error) => {
      console.log("Error: ", error.message);
      setErrorMessage(error.message);
    },
  });

  /** OTP must be exactly 6 digits to enable submission */
  const isOtpComplete = otp.length === 6;

  /** Unified loading state */
  const isSubmitting = verifyMutation.isPending;

  /**
   * 🔒 GUARD 0:
   * Verify OTP page must only be reached
   * through signup flow (email present in state).
   */
  if (!email) {
    return <Navigate to="/auth/signup" replace />;
  }

  /**
   * Submit handler.
   * Performs basic client-side validation
   * before triggering OTP verification.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) return;
    if (!isOtpComplete) return;

    setErrorMessage(null);

    verifyMutation.mutate({
      email,
      otp,
      purpose: "signup",
    });
  };

  /**
   * OTP input handler.
   * - Allows only numeric characters
   * - Clears error message as user types
   */
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value);

    if (errorMessage) setErrorMessage(null);
  };

  const accessToken = tokenUtils.getAccessToken();
  const refreshToken = tokenUtils.getRefreshToken();

  /**
   * 🔒 GUARD 1:
   * If user is already authenticated,
   * they should never see verify OTP again.
   */
  if (accessToken && refreshToken) {
    return <Navigate to="/guide" replace />;
  }

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center gap-20 px-10">
        {/* ========================================= */}
        {/* Right Verification Card                   */}
        {/* ========================================= */}
        <div className="relative w-full max-w-xl">
          <div className="rounded-3xl border border-border-default bg-bg-surface/90 p-10 backdrop-blur-xl shadow-2xl">
            {/* Badge */}
            <div className="mb-5 inline-flex rounded-full bg-action-primary/10 px-4 py-1">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-action-primary">
                Email Verification
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold tracking-tight text-text-primary">
              Verify Your Email
            </h1>

            <p className="mt-3 mb-8 text-lg leading-8 text-text-secondary">
              Enter the 6-digit verification code sent to
              <br />
              <span className="font-semibold text-text-primary">{email}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* OTP */}
              <div>
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-medium text-text-secondary"
                >
                  Verification Code
                </label>

                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  disabled={isSubmitting}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="000000"
                  className={`w-full rounded-xl border bg-bg-primary px-4 py-4 text-center text-3xl tracking-[0.5em] text-text-primary placeholder:text-text-muted transition
                ${
                  errorMessage
                    ? "border-red-500"
                    : "border-border-default focus:border-action-primary"
                }`}
                />

                <p className="mt-2 text-xs text-text-muted">
                  Check your inbox and spam folder if you don't see the email.
                </p>
              </div>

              {/* Error */}
              {errorMessage && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {errorMessage}
                </div>
              )}

              {/* Verify Button */}
              <button
                type="submit"
                disabled={!isOtpComplete || isSubmitting}
                className="mt-2 w-full rounded-xl bg-action-primary py-3 font-semibold text-white transition hover:bg-action-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Verifying...
                  </div>
                ) : (
                  "Verify Email"
                )}
              </button>

              {/* Divider */}
              <div className="border-t border-border-default pt-5">
                <p className="text-center text-sm text-text-secondary">
                  Entered the wrong email?
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/auth/signup")}
                  className="mt-2 w-full text-center font-semibold text-action-primary transition hover:underline"
                >
                  Back to Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
