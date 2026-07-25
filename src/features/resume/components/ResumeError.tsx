import { AlertCircle, RefreshCw } from "lucide-react";
import { PageBackButton } from "../../shared/components/PageBackButton";

interface ResumeErrorProps {
  message: string;
  onRetry: () => void;
}

export const ResumeError = ({ message, onRetry }: ResumeErrorProps) => {
  return (
    <div className="space-y-10">
      <PageBackButton />

      <section className="rounded-3xl border border-red-500/20 bg-bg-secondary p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-text-primary">
          Unable to load candidate
        </h1>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-text-secondary">
          {message}
        </p>

        <button
          onClick={onRetry}
          className="
            mt-8
            inline-flex
            h-12
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-action-primary
            px-6
            font-semibold
            text-white
            transition
            hover:opacity-90
          "
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </section>
    </div>
  );
};
