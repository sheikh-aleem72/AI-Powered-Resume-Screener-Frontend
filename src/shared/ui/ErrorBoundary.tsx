import React from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 🔒 Log later (Sentry, backend, etc.)
    console.error("UI Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center">
          <div className="bg-bg-surface border border-border-default rounded-md p-4 max-w-md">
            <h1 className="text-lg mb-2">Something went wrong</h1>
            <p className="text-text-muted text-sm">
              An unexpected UI error occurred. Please refresh the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
