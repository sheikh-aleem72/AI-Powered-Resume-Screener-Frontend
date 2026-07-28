import { CircleCheckBig, LoaderCircle, Clock3 } from "lucide-react";

interface PipelineProgressProps {
  completedResumes: number;
  totalResumes: number;
  failedResumes: number;
}

export const PipelineProgress = ({
  completedResumes,
  totalResumes,
  failedResumes,
}: PipelineProgressProps) => {
  const progress =
    totalResumes === 0
      ? 0
      : Math.round((completedResumes / totalResumes) * 100);

  const isComplete = totalResumes > 0 && completedResumes === totalResumes;

  return (
    <section className="space-y-6">
      {/* Heading */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Pipeline
        </p>

        <h2 className="mt-2 text-3xl font-bold text-text-primary">
          Screening Progress
        </h2>

        <p className="mt-2 text-text-secondary">
          Monitor resume processing in real time.
        </p>
      </div>

      {/* Card */}

      <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}

          <div className="flex items-start gap-5">
            <div
              className={`
                rounded-2xl
                p-4
                ${isComplete ? "bg-emerald-500/10" : "bg-action-primary/10"}
              `}
            >
              {isComplete ? (
                <CircleCheckBig className="h-7 w-7 text-emerald-400" />
              ) : (
                <LoaderCircle className="h-7 w-7 animate-spin text-action-primary" />
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-text-primary">
                {isComplete ? "Pipeline Complete" : "Processing Resumes"}
              </h3>

              <p className="mt-2 max-w-xl text-text-secondary">
                {isComplete
                  ? "All resumes have been screened and ranked. You can now review candidates."
                  : "ClearHire is currently extracting resume information, matching skills, and calculating candidate rankings."}
              </p>
            </div>
          </div>

          {/* Right */}

          <div className="rounded-2xl bg-bg-primary px-6 py-5 text-center">
            <p className="text-sm text-text-secondary">Progress</p>

            <p className="mt-2 text-4xl font-bold text-text-primary">
              {progress}%
            </p>
          </div>
        </div>

        {/* Divider */}

        <div className="my-8 h-px bg-border-subtle" />

        {/* Progress */}

        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-text-primary">
              {completedResumes} / {totalResumes} resumes processed
            </p>

            <div className="inline-flex items-center gap-2 text-sm text-text-secondary">
              <Clock3 className="h-4 w-4" />
              {failedResumes} failed
            </div>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-bg-surface">
            <div
              className={`
                h-full
                rounded-full
                transition-all
                duration-700
                ${isComplete ? "bg-emerald-500" : "bg-action-primary"}
              `}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
