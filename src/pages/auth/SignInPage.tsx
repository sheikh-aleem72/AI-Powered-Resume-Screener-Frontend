import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi, type SigninPayload } from "../../api/auth";
import { tokenUtils } from "../../utils/tokenUtils";

/**
 * Field-level error mapping for signin.
 * Used to show precise backend validation errors
 * under the corresponding input fields.
 */
type FieldErrors = Partial<{
  email: string;
  password: string;
}>;

/**
 * Sign In page
 *
 * Responsibilities:
 * - Authenticate existing users
 * - Handle backend validation errors gracefully
 * - Store auth tokens and minimal user info on success
 * - Redirect authenticated users away from auth pages
 */
export const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Controlled form state.
   * Keeps email and password in sync with inputs.
   */
  const [formData, setFormData] = useState<SigninPayload>({
    email: "",
    password: "",
  });

  /** Field-specific validation errors */
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  /** Generic form-level error fallback */
  const [formError, setFormError] = useState<string | null>(null);

  /** Toggles password visibility in the input */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Signin mutation.
   * On success, stores tokens + user data and redirects to home.
   */
  const signinMutation = useMutation({
    mutationFn: authApi.signin,
    onSuccess: (response) => {
      console.log("Response is: ", response);
      const { accessToken, refreshToken, user } = response;

      // Persist tokens for authenticated session
      tokenUtils.setTokens(accessToken, refreshToken);

      // Store minimal user info for UI usage
      tokenUtils.setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      // Replace history so user cannot navigate back to signin
      navigate("/home", { replace: true });
    },
    onError: (error: Error) => {
      console.log("Error is:", error);
      handleBackendError(error.message);
    },
  });

  /** Unified loading state for the form */
  const isSubmitting = signinMutation.isPending;

  /**
   * Submit handler.
   * Delegates actual work to the mutation.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signinMutation.mutate(formData);
  };

  /**
   * Shared input change handler.
   * Keeps form data normalized and predictable.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Maps backend error messages to appropriate UI locations.
   * This avoids showing vague or misleading error messages.
   */
  const handleBackendError = (message: string) => {
    setFieldErrors({});
    setFormError(null);

    if (message.toLowerCase().includes("password")) {
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
    formData.email.trim() !== "" && formData.password.trim() !== "";

  /**
   * Guard: authenticated users should not see signin page.
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
            Sign In
          </h1>
          <p className="text-sm text-text-muted mb-6">
            Welcome back! Please sign in to continue.
          </p>

          {/* Signin Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input */}
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

            {/* Password input with visibility toggle */}
            <div className="relative">
              <label className="block text-sm text-text-secondary mb-1.5">
                Password
              </label>
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
                className="absolute inset-y-12 right-3 flex items-center text-text-muted hover:text-text-primary"
              >
                {/* Password visibility icon */}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </button>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Forgot password navigation */}
            <div className="text-right">
              <span
                className="text-sm text-action-primary hover:underline cursor-pointer"
                onClick={() => navigate("/auth/forgot-password")}
              >
                Forgot password?
              </span>
            </div>

            {/* Generic form-level error */}
            {formError && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
                {formError}
              </div>
            )}

            {/* Submit button */}
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
              <span>{isSubmitting ? "Signing in…" : "Sign In"}</span>
            </button>

            {/* Footer */}
            <p className="text-sm text-center text-text-secondary">
              Don’t have an account?{" "}
              <span
                className="text-action-primary hover:underline cursor-pointer"
                onClick={() => navigate("/auth/signup")}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
