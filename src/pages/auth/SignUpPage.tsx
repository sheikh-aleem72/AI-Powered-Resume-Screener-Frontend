import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi, type SignupPayload } from "../../api/auth";
import { tokenUtils } from "../../utils/tokenUtils";

type FieldErrors = Partial<{
  name: string;
  organization: string;
  email: string;
  password: string;
}>;

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupPayload>({
    name: "",
    organization: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: () => {
      setFieldErrors({});
      setFormError(null);
      navigate("/auth/verify", { state: { email: formData.email } });
    },
    onError: (error: Error) => {
      handleBackendError(error.message);
    },
  });

  const isSubmitting = signupMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(formData);
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

    if (message.toLowerCase().includes("name")) {
      setFieldErrors({ name: message });
    } else if (message.toLowerCase().includes("password")) {
      setFieldErrors({ password: message });
    } else if (message.toLowerCase().includes("email")) {
      setFieldErrors({ email: message });
    } else {
      setFormError(message);
    }
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.organization.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "";

  const accessToken = tokenUtils.getAccessToken();
  const refreshToken = tokenUtils.getRefreshToken();
  if (accessToken && refreshToken) {
    return <Navigate to="/home" replace />;
  }
  return (
    <div className="h-screen  flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative w-full max-w-md px-4">
        <div className="bg-bg-surface/80 backdrop-blur-xl rounded-xl p-8 border border-border-subtle shadow-lg">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-text-primary mb-1">
            Create Account
          </h1>
          <p className="text-sm text-text-muted mb-6">
            Start screening smarter resumes in minutes
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Full Name
              </label>
              <input
                disabled={isSubmitting}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-3 py-2.5 bg-bg-secondary border border-border-default rounded-md text-text-primary placeholder-text-muted transition focus:outline-none focus:border-action-primary focus:ring-2 focus:ring-action-primary/30
                      ${
                        fieldErrors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : "border-border-default focus:border-action-primary focus:ring-action-primary/30"
                      }
                `}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>
              )}
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Organization
              </label>
              <input
                disabled={isSubmitting}
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Acme Inc"
                className={`w-full px-3 py-2.5 bg-bg-secondary border border-border-default rounded-md text-text-primary placeholder-text-muted transition focus:outline-none focus:border-action-primary focus:ring-2 focus:ring-action-primary/30
                      ${
                        fieldErrors.organization
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : "border-border-default focus:border-action-primary focus:ring-action-primary/30"
                      }
                  `}
              />
              {fieldErrors.organization && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldErrors.organization}
                </p>
              )}
            </div>

            {/* Email */}
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
                <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  disabled={isSubmitting}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2.5 bg-bg-secondary border border-border-default rounded-md text-text-primary placeholder-text-muted transition focus:outline-none focus:border-action-primary focus:ring-2 focus:ring-action-primary/30
                      ${
                        fieldErrors.password
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                          : "border-border-default focus:border-action-primary focus:ring-action-primary/30"
                      }
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-text-muted hover:text-text-primary"
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
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldErrors.password}
                </p>
              )}
            </div>

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
                <span
                  className="
        h-4 w-4
        border-2 border-current
        border-t-transparent
        rounded-full
        animate-spin
      "
                />
              )}
              <span>
                {isSubmitting ? "Creating account…" : "Create Account"}
              </span>
            </button>

            {/* Footer */}
            <p className="text-sm text-center text-text-secondary">
              Already have an account?{" "}
              <span
                className="text-action-primary hover:underline cursor-pointer"
                onClick={() => navigate("/auth/signin")}
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
