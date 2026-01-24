import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth";
import { tokenUtils } from "../../utils/tokenUtils";

/**
 * Field-level error mapping.
 * Used to show backend validation errors directly under inputs
 * instead of dumping everything as a generic message.
 */
type FieldErrors = Partial<{
  email: string;
  otp: string;
  newPassword: string;
}>;

/**
 * Forgot / Reset Password page
 *
 * Flow:
 * 1. User enters email → backend sends OTP
 * 2. User enters OTP + new password → password is updated
 *
 * This page intentionally keeps both steps in a single component
 * to avoid losing state between navigations.
 */
export const ForgetPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Step controls which part of the flow is visible.
   * - "email" → request reset OTP
   * - "reset" → verify OTP + set new password
   */
  const [step, setStep] = useState<"email" | "reset">("email");

  /**
   * Form data is shared across steps so that
   * email does not need to be re-entered.
   */
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  /** Field-level validation errors from backend */
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  /** Generic form-level error (fallback) */
  const [formError, setFormError] = useState<string | null>(null);

  /** Toggles visibility of the new password field */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Step 1 mutation:
   * Request password reset OTP using email
   */
  const requestResetMutation = useMutation({
    mutationFn: authApi.requestPasswordReset,
    onSuccess: () => {
      // Move to OTP + password step only after backend confirms email
      setStep("reset");
      setFieldErrors({});
      setFormError(null);
      console.log("Reset request done!");
    },
    onError: (error: Error) => {
      handleBackendError(error.message);
    },
  });

  /**
   * Step 2 mutation:
   * Verify OTP and update password
   */
  const resetPasswordMutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      // On successful reset, redirect user back to signin
      setFieldErrors({});
      setFormError(null);
      navigate("/auth/signin", { replace: true });
    },
    onError: (error: Error) => {
      handleBackendError(error.message);
    },
  });

  /**
   * Unified submitting state.
   * Used to disable inputs and prevent duplicate requests.
   */
  const isSubmitting =
    resetPasswordMutation.isPending || requestResetMutation.isPending;

  /**
   * Submit handler delegates behavior based on current step.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === "email") {
      requestResetMutation.mutate({ email: formData.email });
    } else {
      resetPasswordMutation.mutate({
        email: formData.email,
        otp: formData.otp,
        purpose: "reset",
        newPassword: formData.newPassword,
      });
    }
  };

  /**
   * Shared change handler for all inputs.
   * Keeps form state flat and predictable.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Maps backend error messages to appropriate UI locations.
   * This allows precise error feedback instead of generic alerts.
   */
  const handleBackendError = (message: string) => {
    setFieldErrors({});
    setFormError(null);

    if (message.toLowerCase().includes("email")) {
      setFieldErrors({ email: message });
    } else if (message.toLowerCase().includes("otp")) {
      setFieldErrors({ otp: message });
    } else if (message.toLowerCase().includes("password")) {
      setFieldErrors({ newPassword: message });
    } else {
      setFormError(message);
    }
  };

  /**
   * Guard: authenticated users should not access reset password flow.
   */
  const accessToken = tokenUtils.getAccessToken();
  const refreshToken = tokenUtils.getRefreshToken();

  if (accessToken && refreshToken) {
    return <Navigate to="/home" replace />;
  }

  /**
   * Derived validation flags.
   * These are intentionally NOT stored in state.
   */
  const isOtpComplete = formData.otp.length === 6;
  const isPasswordComplete = formData.newPassword.length >= 6;

  /**
   * Form validity depends on current step.
   * Prevents invalid or premature submissions.
   */
  const isFormValid =
    (step === "email" && formData.email.trim() !== "") ||
    (step === "reset" &&
      isOtpComplete &&
      isPasswordComplete &&
      formData.newPassword.trim() !== "");

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative w-full max-w-md px-4">
        <div className="bg-bg-surface/80 backdrop-blur-xl rounded-xl p-8 border border-border-subtle shadow-lg">
          {/* Dynamic header based on step */}
          <h1 className="text-2xl font-semibold text-text-primary mb-1">
            {step === "email" ? "Reset Password" : "Change Password"}
          </h1>
          <p className="text-sm text-text-muted mb-6">
            {step === "email"
              ? "Enter your email to receive a verification code."
              : "Enter the OTP and your new password to reset your account."}
          </p>

          {/* Main form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Email */}
            {step === "email" && (
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Email
                </label>
                <input
                  disabled={isSubmitting}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-3 py-2.5 bg-bg-secondary border rounded-md text-text-primary placeholder-text-muted transition focus:outline-none
                    ${
                      fieldErrors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                        : "border-border-default focus:border-action-primary focus:ring-action-primary/30"
                    }
                  `}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            )}

            {/* Step 2: OTP + New Password */}
            {step === "reset" && (
              <>
                {/* OTP input */}
                <div>
                  <label className="block text-sm text-text-secondary mb-1.5">
                    OTP
                  </label>
                  <input
                    disabled={isSubmitting}
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="000000"
                    className={`w-full px-3 py-2.5 bg-bg-secondary border rounded-md text-text-primary placeholder-text-muted transition focus:outline-none
                      ${
                        fieldErrors.otp
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : "border-border-default focus:border-action-primary focus:ring-action-primary/30"
                      }
                    `}
                  />
                  {fieldErrors.otp && (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldErrors.otp}
                    </p>
                  )}
                </div>

                {/* New password input with visibility toggle */}
                <div className="relative">
                  <label className="block text-sm text-text-secondary mb-1.5">
                    New Password
                  </label>
                  <input
                    disabled={isSubmitting}
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full px-3 py-2.5 bg-bg-secondary border rounded-md text-text-primary placeholder-text-muted transition focus:outline-none
                      ${
                        fieldErrors.newPassword
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : "border-border-default focus:border-action-primary focus:ring-action-primary/30"
                      }
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-12 right-3 flex items-center text-text-muted hover:text-text-primary"
                  >
                    {/* icon */}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </button>
                  {fieldErrors.newPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldErrors.newPassword}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Generic form error */}
            {formError && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                {formError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full py-3 mt-2 rounded-md font-medium
                text-text-primary bg-action-primary hover:bg-action-primary-hover
                active:scale-[0.99] transition shadow-md
                disabled:bg-action-primary/40 disabled:cursor-not-allowed"
            >
              {isSubmitting && (
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              )}
              <span>
                {isSubmitting
                  ? step === "email"
                    ? "Verifying Email…"
                    : "Changing Password…"
                  : step === "email"
                    ? "Verify Email"
                    : "Change Password"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
