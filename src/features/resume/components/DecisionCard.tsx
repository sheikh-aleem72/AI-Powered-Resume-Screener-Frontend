import { CheckCircle2, XCircle, LoaderCircle, CircleAlert } from "lucide-react";

interface DecisionCardProps {
  processing: boolean;
  passed: boolean;
  reasons: string[];
}

export const DecisionCard = ({
  processing,
  passed,
  reasons,
}: DecisionCardProps) => {
  if (processing) {
    return (
      <div
        className={`
          rounded-3xl
          border
          border-border-default
          border-l-4
          ${passed ? "border-l-emerald-500" : "border-l-red-500"}
          bg-bg-secondary
          p-8
        `}
      >
        <div className="flex items-center gap-3">
          <LoaderCircle className="h-6 w-6 animate-spin text-action-primary" />

          <div>
            <h3 className="text-xl font-semibold text-text-primary">
              Waiting for Evaluation
            </h3>

            <p className="mt-2 text-text-secondary">
              ClearHire is currently analysing this resume. AI evaluation will
              appear automatically.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
      <div className="flex items-start gap-4">
        {passed ? (
          <CheckCircle2 className="mt-1 h-8 w-8 text-emerald-400" />
        ) : (
          <XCircle className="mt-1 h-8 w-8 text-red-400" />
        )}

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-text-primary">
            {passed ? "Recommended for Interview" : "Not Recommended"}
          </h3>

          <p className="mt-2 text-text-secondary">
            {passed
              ? "The candidate satisfies the primary hiring criteria and is recommended for further review."
              : "The candidate does not satisfy one or more required hiring criteria."}
          </p>

          {reasons.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {reasons.map((reason) => (
                <span
                  key={reason}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-red-500/20
                    bg-red-500/10
                    px-4
                    py-2
                    text-sm
                    text-red-400
                  "
                >
                  <CircleAlert className="h-4 w-4" />
                  {reason}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
