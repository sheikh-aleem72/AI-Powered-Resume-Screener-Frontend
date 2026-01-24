import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth";
import { tokenUtils } from "../../utils/tokenUtils";

type FieldErrors = Partial<{
  email: string;
  otp: string;
  newPassword: string;
}>;

export const ForgetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const requestResetMutation = useMutation({
    mutationFn: authApi.requestPasswordReset,
    onSuccess: () => {
      setStep("reset");
      setFieldErrors({});
      setFormError(null);
      console.log("Reset request done!");
    },
    onError: (error: Error) => {
      handleBackendError(error.message);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      setFieldErrors({});
      setFormError(null);
      navigate("/auth/signin", { replace: true });
    },
    onError: (error: Error) => {
      handleBackendError(error.message);
    },
  });

  const isSubmitting =
    resetPasswordMutation.isPending || requestResetMutation.isPending;

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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

  const accessToken = tokenUtils.getAccessToken();
  const refreshToken = tokenUtils.getRefreshToken();

  if (accessToken && refreshToken) {
    return <Navigate to="/home" replace />;
  }

  const isOtpComplete = formData.otp.length === 6;
  const isPasswordComplete = formData.newPassword.length >= 6;

  const isFormValid =
    (step === "email" && formData.email.trim() !== "") ||
    (step === "reset" &&
      isOtpComplete &&
      formData.newPassword.trim() !== "" &&
      isPasswordComplete);

  // if (step === "reset" && !isOtpComplete) return;

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative w-full max-w-md px-4">
        <div className="bg-bg-surface/80 backdrop-blur-xl rounded-xl p-8 border border-border-subtle shadow-lg">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-text-primary mb-1">
            {step === "email" ? "Reset Password" : "Change Password"}
          </h1>
          <p className="text-sm text-text-muted mb-6">
            {step === "email"
              ? "Enter your email to receive a verification code."
              : "Enter the OTP and your new password to reset your account."}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  className={`w-full px-3 py-2.5 bg-bg-secondary border border-border-default rounded-md text-text-primary placeholder-text-muted transition focus:outline-none focus:border-action-primary focus:ring-2 focus:ring-action-primary/30
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

            {step === "reset" && (
              <>
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
                    className={`w-full px-3 py-2.5 bg-bg-secondary border border-border-default rounded-md text-text-primary placeholder-text-muted transition focus:outline-none focus:border-action-primary focus:ring-2 focus:ring-action-primary/30
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
                    className={`w-full px-3 py-2.5 bg-bg-secondary border border-border-default rounded-md text-text-primary placeholder-text-muted transition focus:outline-none focus:border-action-primary focus:ring-2 focus:ring-action-primary/30
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
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <title>Hide password</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223a11.042 11.042 0 0116.04 0M12 3v1.5m0 15V21m9-9h-1.5m-15 0H3m16.364 6.364l-1.06-1.06M6.636 6.636l-1.06-1.06m12.728 12.728l-1.06-1.06M6.636 17.364l-1.06-1.06"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <title>Show password</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.69 1.655-1.227 2.364M15.75 15.75l-3.75 3.75m0 0l-3.75-3.75m3.75 3.75V12"
                        />
                      </svg>
                    )}
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
                text-text-primary
                bg-action-primary
                hover:bg-action-primary-hover
                active:scale-[0.99]
                transition
                shadow-md
                disabled:bg-action-primary/40
                disabled:cursor-not-allowed
                disabled:hover:bg-action-primary/40"
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
