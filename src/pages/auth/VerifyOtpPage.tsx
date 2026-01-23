import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth";
import { tokenUtils } from "../../utils/tokenUtils";

export const VerifyOtpPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email: string | undefined = location.state?.email;

  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const accessToken = tokenUtils.getAccessToken();
  const refreshToken = tokenUtils.getRefreshToken();

  /**
   * 🔒 GUARD 1:
   * If user is already authenticated,
   * they should NEVER see verify OTP again
   */
  if (accessToken && refreshToken) {
    return <Navigate to="/home" replace />;
  }

  /**
   * 🔒 GUARD 2:
   * Verify OTP page must only be reached
   * via signup flow (email in navigation state)
   */
  if (!email) {
    return <Navigate to="/auth/signup" replace />;
  }

  const verifyMutation = useMutation({
    mutationFn: authApi.verifyOtp,
    onSuccess: (response) => {
      const { accessToken, refreshToken, user } = response;

      // Store tokens
      tokenUtils.setTokens(accessToken, refreshToken);

      // Store minimal user info
      tokenUtils.setUser({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      // 🔑 Replace history so back button
      // never returns to OTP page
      navigate("/home", { replace: true });
    },
    onError: (error: Error) => {
      console.log("Error: ", error.message);
      setErrorMessage(error.message);
    },
  });

  const isOtpComplete = otp.length === 6;

  const isSubmitting = verifyMutation.isPending;

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

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value);
    if (errorMessage) setErrorMessage(null);
  };

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative w-full max-w-md px-4">
        <div className="bg-bg-surface/80 backdrop-blur-xl rounded-xl p-8 border border-border-subtle shadow-lg">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            Verify Your Email
          </h1>
          <p className="text-sm text-text-muted mb-6">
            Enter the verification code sent to{" "}
            <span className="font-medium text-text-primary">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* OTP Input */}
            <div>
              <label
                htmlFor="otp"
                className="block text-sm text-text-secondary mb-1.5"
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
                className={`
                  w-full px-3 py-2.5 rounded-md text-center text-lg tracking-widest
                  bg-bg-secondary text-text-primary placeholder-text-muted
                  border transition focus:outline-none
                  ${
                    errorMessage
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                      : "border-border-default focus:border-action-primary focus:ring-action-primary/30"
                  }
                `}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!isOtpComplete || isSubmitting}
              className="
                w-full py-3 mt-2 rounded-md font-medium
                flex items-center justify-center gap-2
                text-text-primary
                bg-action-primary
                hover:bg-action-primary-hover
                active:scale-[0.99]
                transition shadow-md
                disabled:bg-action-primary/40
                disabled:cursor-not-allowed
                disabled:hover:bg-action-primary/40
              "
            >
              {isSubmitting && (
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              )}
              {isSubmitting ? "Verifying…" : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
