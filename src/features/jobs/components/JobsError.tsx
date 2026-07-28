import { RefreshCcw, TriangleAlert } from "lucide-react";

interface Props {
  onRetry: () => void;
}

export const JobsError = ({ onRetry }: Props) => {
  return (
    <section className="flex min-h-[50vh] items-center justify-center mt-5">
      <div className="w-full max-w-xl rounded-3xl border border-border-default bg-bg-secondary p-10 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-error/10">
          <TriangleAlert className="h-10 w-10 text-error" />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-text-primary">
          Unable to load jobs
        </h2>

        <p className="mt-4 leading-7 text-text-secondary">
          Something went wrong while loading your hiring pipelines. Please try
          again.
        </p>

        <button
          onClick={onRetry}
          className="
            mt-8
            inline-flex
            h-12
            items-center
            gap-2
            rounded-xl
            bg-action-primary
            px-6
            font-semibold
            text-white
            transition
            hover:bg-action-primary-hover
          "
        >
          <RefreshCcw className="h-5 w-5" />
          Retry
        </button>
      </div>
    </section>
  );
};
