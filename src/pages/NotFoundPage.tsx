import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-border-default bg-bg-surface/90 p-10 backdrop-blur-xl shadow-2xl">
          {/* Badge */}
          <div className="mb-5 inline-flex rounded-full bg-action-primary/10 px-4 py-1">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-action-primary">
              Navigation Error
            </span>
          </div>

          {/* Error Code */}
          <p className="text-7xl font-bold tracking-tight text-text-primary">
            404
          </p>

          {/* Heading */}
          <h1 className="mt-3 text-4xl font-bold text-text-primary">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg leading-8 text-text-secondary">
            The page you're looking for doesn't exist or may have been moved.
            You can safely return to your workspace.
          </p>

          {/* Actions */}
          <div className="mt-10 flex gap-4">
            <button
              onClick={() => navigate("/home")}
              className="flex-1 rounded-xl bg-action-primary py-3 font-semibold text-white transition hover:bg-action-primary-hover"
            >
              Go Home
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex-1 rounded-xl border border-border-default bg-bg-primary py-3 font-semibold text-text-primary transition hover:border-action-primary"
            >
              Go Back
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 border-t border-border-default pt-5">
            <p className="text-center text-sm text-text-muted">
              If you believe this is an error, please try navigating from the
              Home page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
