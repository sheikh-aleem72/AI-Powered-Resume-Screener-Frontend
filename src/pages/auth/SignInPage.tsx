import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi, type SigninPayload } from "../../features/auth/api";
import { tokenUtils } from "../../features/auth/utils/tokenUtils";
import logoIcon from "../../assets/logo.png";

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

      <div className="relative mx-auto flex min-h-screen max-w-9xl items-center px-8  ">
        {/* Left Side */}
        <div className="hidden flex-1 lg:flex lg:pr-24">
          <div className="max-w-xl">
            <div className="flex items-center">
              <img src={logoIcon} alt="ClearHire" className="h-15 w-15" />
              <p className="text-5xl text-white font-bold">ClearHire</p>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-action-primary pl-2">
              AI-POWERED RECRUITMENT PLATFORM
            </p>

            <h1 className="mt-2 text-6xl font-bold leading-tight text-text-primary">
              Hire better
              <br />
              Faster.
            </h1>

            <p className="mt-4 text-sm text-text-muted">
              Built for modern recruiters who want faster hiring without
              sacrificing quality.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative w-full max-w-lg px-6">
          <div className="rounded-3xl border border-border-default bg-bg-secondary/90 backdrop-blur-xl px-10 py-12 shadow-2xl">
            {/* Header */}

            <div className="mb-8">
              <div className="mb-3 inline-flex items-center rounded-full bg-action-primary/10 px-3 py-1">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-action-primary">
                  Recruiter Login
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-text-primary">
                Welcome Back
              </h1>

              <p className="mt-3 text-base leading-7 text-text-secondary">
                Sign in to access your hiring workspace, review candidates, and
                continue screening resumes.
              </p>
            </div>

            {/* Signin Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Email
                </label>
                <input
                  disabled={isSubmitting}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 bg-bg-secondary border rounded-xl text-text-primary placeholder-text-muted transition focus:outline-none
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

              {/* Password input with visibility toggle */}
              <div className="relative">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Password
                </label>
                <input
                  disabled={isSubmitting}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-bg-secondary border rounded-xl text-text-primary placeholder-text-muted transition focus:outline-none
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
              <div className="mb-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/auth/forgot-password")}
                  className="text-sm text-action-primary transition-colors hover:text-action-primary-hover"
                >
                  Forgot Password?
                </button>
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
                className="
                w-full
                rounded-xl
                bg-action-primary
                py-3.5
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-action-primary-hover
                hover:shadow-lg
                disabled:cursor-not-allowed
                disabled:opacity-50
                "
              >
                {isSubmitting && (
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                <span>{isSubmitting ? "Signing in…" : "Sign In"}</span>
              </button>

              {/* Footer */}
              <div className="border-t border-border-default pt-6 text-center">
                <p className="text-sm text-text-secondary">New to ClearHire?</p>

                <button
                  type="button"
                  onClick={() => navigate("/auth/signup")}
                  className="mt-2 font-medium text-action-primary transition-colors hover:text-action-primary-hover"
                >
                  Create Recruiter Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
