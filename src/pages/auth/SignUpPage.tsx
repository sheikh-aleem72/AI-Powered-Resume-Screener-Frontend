import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi, type SignupPayload } from "../../features/auth/api";
import { tokenUtils } from "../../features/auth/utils/tokenUtils";
import logoIcon from "../../assets/logo.png";

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
  role: string;
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
    <div className="h-screen overflow-hidden bg-bg-primary">
      <div className="flex h-full items-center justify-center">
        {/* ====================================================== */}
        {/* LEFT PANEL */}
        {/* ====================================================== */}
        <div className="hidden lg:flex items-center justify-center px-20">
          <div className="max-w-xl">
            {/* Brand */}
            <div className="flex items-center gap-5 mb-8">
              <img
                src={logoIcon}
                alt="ClearHire"
                className="w-25 h-25 object-contain"
              />

              <div>
                <h1 className="text-6xl font-bold text-text-primary">
                  ClearHire
                </h1>

                <p className="mt-2 text-sm uppercase tracking-[0.35em] text-action-primary">
                  AI-Powered Recruitment Platform
                </p>
              </div>
            </div>

            {/* Hero */}
            <h2 className="text-6xl font-bold leading-tight text-text-primary">
              Build your
              <br />
              hiring
              <br />
              workspace.
            </h2>

            <p className="mt-6 max-w-md text-lg leading-8 text-text-secondary">
              Create your recruiter account and start screening resumes with
              AI-powered ranking, semantic matching, and hiring insights.
            </p>
          </div>
        </div>
        {/* ====================================================== */}
        {/* RIGHT PANEL */}
        {/* ====================================================== */}
        <div className="flex items-center justify-center px-8 py-8">
          <div className="w-full max-w-lg rounded-3xl border border-border-default bg-bg-secondary px-10 py-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <img
                src="/logo.png"
                alt="ClearHire"
                className="mx-auto mb-3 h-14 w-14"
              />

              <h1 className="text-3xl font-bold text-text-primary">
                ClearHire
              </h1>

              <p className="mt-2 text-sm text-text-secondary">
                AI Resume Screening Platform
              </p>
            </div>

            {/* Header */}
            <div className="mb-4">
              <span className="inline-flex rounded-full bg-action-primary/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-action-primary">
                Recruiter Signup
              </span>

              <h2 className="mt-2 text-4xl font-bold text-text-primary">
                Create Account
              </h2>

              <p className="mt-1 text-base leading-7 text-text-secondary">
                Create your recruiter workspace and begin screening candidates
                within minutes.
              </p>
            </div>

            {/* ====================================================== */}
            {/* FORM */}
            {/* ====================================================== */}

            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Full Name */}
              <div>
                <label className="mb-1 block text-sm font-medium text-text-secondary">
                  Full Name
                </label>

                <input
                  disabled={isSubmitting}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full rounded-xl border bg-bg-primary px-4 py-2.5 text-text-primary transition focus:outline-none ${
                    fieldErrors.name
                      ? "border-red-500"
                      : "border-border-default focus:border-action-primary"
                  }`}
                />

                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-state-error">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Organization */}
              <div>
                <label className="mb-1 block text-sm font-medium text-text-secondary">
                  Organization
                </label>

                <input
                  disabled={isSubmitting}
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                  className={`w-full rounded-xl border bg-bg-primary px-4 py-2.5 text-text-primary transition focus:outline-none ${
                    fieldErrors.organization
                      ? "border-red-500"
                      : "border-border-default focus:border-action-primary"
                  }`}
                />

                {fieldErrors.organization && (
                  <p className="mt-1 text-sm text-state-error">
                    {fieldErrors.organization}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium text-text-secondary">
                  Email
                </label>

                <input
                  disabled={isSubmitting}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full rounded-xl border bg-bg-primary px-4 py-2.5 text-text-primary transition focus:outline-none ${
                    fieldErrors.email
                      ? "border-red-500"
                      : "border-border-default focus:border-action-primary"
                  }`}
                />

                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-state-error">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-sm font-medium text-text-secondary">
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
                    className={`w-full rounded-xl border bg-bg-primary px-4 py-2.5 text-text-primary transition focus:outline-none ${
                      fieldErrors.password
                        ? "border-red-500"
                        : "border-border-default focus:border-action-primary"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-4 flex items-center text-white hover:text-text-primary"
                  >
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </button>
                </div>

                {fieldErrors.password && (
                  <p className="mt-1 text-sm text-state-error">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Form Error */}
              {formError && (
                <div className="rounded-xl border border-state-error/30 bg-state-error/10 px-4 py-3 text-sm text-state-error">
                  {formError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full rounded-xl bg-action-primary py-3 font-semibold text-white transition hover:bg-action-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating Account...
                  </div>
                ) : (
                  "Create Recruiter Account"
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center border-t border-border-default pt-2">
                <p className=" text-text-secondary">Already have an account?</p>
                <button
                  type="button"
                  onClick={() => navigate("/auth/signin")}
                  className="text-center font-semibold text-action-primary transition hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        ;
      </div>
    </div>
  );
};
