import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi, type SignupPayload } from "../../api/auth";
import { tokenUtils } from "../../utils/tokenUtils";

/**
 * Field-level error mapping for signup.
 * Allows backend validation errors to be shown
 * directly under the relevant inputs.
 */
type FieldErrors = Partial<{
  name: string;
  organization: string;
  email: string;
  password: string;
}>;

/**
 * Signup page
 *
 * Responsibilities:
 * - Collect user details for account creation
 * - Trigger signup API and handle validation errors
 * - Redirect user to OTP verification on success
 * - Prevent authenticated users from accessing signup again
 */
export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Controlled form state for signup inputs.
   * Keeps all fields in sync with the UI.
   */
  const [formData, setFormData] = useState<SignupPayload>({
    name: "",
    organization: "",
    email: "",
    password: "",
  });

  /** Field-specific backend validation errors */
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  /** Generic form-level error fallback */
  const [formError, setFormError] = useState<string | null>(null);

  /** Toggles visibility of the password input */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Signup mutation.
   * On success, user is redirected to OTP verification page.
   */
  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: () => {
      setFieldErrors({});
      setFormError(null);

      // Move user to OTP verification step
      navigate("/auth/verify", { state: { email: formData.email } });
    },
    onError: (error: Error) => {
      handleBackendError(error.message);
    },
  });

  /** Unified loading state for the signup form */
  const isSubmitting = signupMutation.isPending;

  /**
   * Submit handler.
   * Delegates actual request logic to the mutation.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(formData);
  };

  /**
   * Shared change handler for all inputs.
   * Keeps form state normalized and predictable.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Maps backend error messages to appropriate UI locations.
   * This avoids showing generic errors when a specific
   * field-level issue can be highlighted.
   */
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

  /**
   * Derived form validity flag.
   * Prevents submission when required fields are empty.
   */
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.organization.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "";

  /**
   * Guard: authenticated users should not access signup page.
   */
  const accessToken = tokenUtils.getAccessToken();
  const refreshToken = tokenUtils.getRefreshToken();

  if (accessToken && refreshToken) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ambient background glow */}
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

          {/* Signup Form */}
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
                className={`w-full px-3 py-2.5 bg-bg-secondary border rounded-md text-text-primary placeholder-text-muted transition focus:outline-none
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
                className={`w-full px-3 py-2.5 bg-bg-secondary border rounded-md text-text-primary placeholder-text-muted transition focus:outline-none
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
                className={`w-full px-3 py-2.5 bg-bg-secondary border rounded-md text-text-primary placeholder-text-muted transition focus:outline-none
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

            {/* Password with visibility toggle */}
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
                  className={`w-full px-3 py-2.5 bg-bg-secondary border rounded-md text-text-primary placeholder-text-muted transition focus:outline-none
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

            {/* Generic form-level error */}
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
