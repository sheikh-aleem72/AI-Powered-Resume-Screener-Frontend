import { Calendar, Clock3, FileText, Medal, Trophy } from "lucide-react";
import { StatusBadge } from "../../jobs/components/StatusBadge";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";

interface ResumeHeroProps {
  externalResumeId: string;

  finalScore: number | null;

  rank: number | null;

  passFail: string;

  status: string;

  createdAt: string;

  updatedAt: string;
}

export const ResumeHero = ({
  externalResumeId,
  finalScore,
  rank,
  passFail,
  status,
  createdAt,
  updatedAt,
}: ResumeHeroProps) => {
  const score =
    finalScore !== null && finalScore !== undefined
      ? `${(finalScore * 100).toFixed(1)}%`
      : "--";

  const decision =
    passFail === "passed"
      ? "Matched"
      : passFail === "failed"
        ? "Not Matched"
        : "Processing";

  return (
    <section className="rounded-3xl border border-border-default bg-bg-secondary p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* LEFT */}

        <div className="space-y-5">
          <div className="inline-flex items-center rounded-full border border-action-primary/20 bg-action-primary/10 px-4 py-2">
            <FileText className="mr-2 h-4 w-4 text-action-primary" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
              Resume Review
            </span>
          </div>

          <div>
            <h1 className="text-5xl font-bold tracking-tight text-text-primary">
              {externalResumeId}
            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-8 text-text-secondary">
              Review the AI evaluation, candidate fit, and resume before making
              your hiring decision.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-action-primary" />
              <span>
                Submitted{" "}
                {new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-action-primary" />
              <span>{formatRelativeTime(updatedAt)}</span>
            </div>

            {rank != null && (
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-action-primary" />
                <span>Rank #{rank}</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex min-w-65 flex-col items-end gap-6">
          <StatusBadge
            status={
              status === "queued" || status === "processing"
                ? "processing"
                : status === "completed"
                  ? "completed"
                  : "failed"
            }
          />

          <div
            className="
            w-44
            rounded-3xl
            border
            border-border-default
            bg-bg-primary
            p-6
            text-center
          "
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
              Final Score
            </p>

            <div className="mt-5">
              {status === "processing" ? (
                <>
                  <p className="text-3xl font-bold text-action-primary">...</p>

                  <p className="mt-3 text-sm text-text-secondary">
                    Calculating
                  </p>
                </>
              ) : rank == null ? (
                <>
                  <p className="text-3xl font-bold text-text-primary">—</p>

                  <p className="mt-3 text-sm text-text-secondary">Not Ranked</p>
                </>
              ) : (
                <>
                  <p className="text-4xl font-bold text-action-primary">
                    {score}
                  </p>

                  <p className="mt-3 text-sm text-text-secondary">{decision}</p>
                </>
              )}
            </div>
          </div>
          {rank && (
            <div className="flex items-center gap-2 rounded-xl bg-action-primary/10 px-4 py-2">
              <Medal className="h-5 w-5 text-action-primary" />

              <span className="font-semibold text-action-primary">
                Ranked #{rank}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
