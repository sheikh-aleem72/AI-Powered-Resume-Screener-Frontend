import { RefreshCcw, TriangleAlert } from "lucide-react";

interface HomeErrorProps {
  onRetry: () => void;
}

export const HomeError = ({ onRetry }: HomeErrorProps) => {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-lg rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-error/10">
          <TriangleAlert className="h-10 w-10 text-error" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-base-content">
          Something went wrong
        </h1>

        <p className="mt-3 text-base leading-7 text-base-content/70">
          We couldn't load your workspace right now. Please try again in a
          moment.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="btn btn-primary mt-8"
        >
          <RefreshCcw className="h-5 w-5" />
          Try Again
        </button>
      </div>
    </section>
  );
};
