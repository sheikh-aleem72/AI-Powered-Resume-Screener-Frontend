import { RefreshCcw, TriangleAlert } from "lucide-react";

interface HomeErrorProps {
  onRetry: () => void;
}

export const HomeError = ({ onRetry }: HomeErrorProps) => {
  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center px-8">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-112.5
            w-112.5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-state-error/5
            blur-[140px]
          "
        />
      </div>

      <section
        className="
          relative
          w-full
          max-w-2xl
          rounded-[28px]
          border
          border-border-default
          bg-bg-secondary
          p-12
          text-center
        "
      >
        {/* Icon */}
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-2xl
            bg-state-error/10
            text-state-error
          "
        >
          <TriangleAlert className="h-10 w-10" />
        </div>

        {/* Badge */}
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-state-error">
          Workspace Error
        </p>

        {/* Heading */}
        <h1 className="mt-3 text-4xl font-bold text-text-primary">
          Unable to load your workspace
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-text-secondary">
          We couldn't retrieve your latest hiring activity. This is usually
          temporary. Please try loading the page again.
        </p>

        {/* Button */}
        <button
          onClick={onRetry}
          className="
            mt-10
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-xl
            bg-action-primary
            px-6
            py-3
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-action-primary-hover
            hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]
          "
        >
          <RefreshCcw className="h-5 w-5" />
          Retry Loading
        </button>
      </section>
    </main>
  );
};
