import { Brain, CheckCircle2, FileCheck, Trophy } from "lucide-react";

import { OverviewCard } from "./OverviewCard";

interface CandidateOverviewProps {
  status: string;
  analysisStatus: string;
  rank: number | null;
  passFail: string;
}

export const CandidateOverview = ({
  status,
  analysisStatus,
  rank,
  passFail,
}: CandidateOverviewProps) => {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Workspace
        </p>

        <h2 className="mt-2 text-3xl font-bold text-text-primary">
          Review Summary
        </h2>

        <p className="mt-2 text-text-secondary">
          Quick summary before reviewing the detailed candidate assessment.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          icon={FileCheck}
          title="Resume Status"
          value={status === "completed" ? "Completed" : "Processing"}
          subtitle="Resume processing"
        />

        <OverviewCard
          icon={Brain}
          title="Deep Analysis"
          value={
            analysisStatus === "not_requested"
              ? "Not Run"
              : analysisStatus.charAt(0).toUpperCase() + analysisStatus.slice(1)
          }
          subtitle="LLM assessment"
        />

        <OverviewCard
          icon={Trophy}
          title="Rank"
          value={rank == null ? "Not Ranked" : `#${rank}`}
          subtitle="Pipeline ranking"
        />

        <OverviewCard
          icon={CheckCircle2}
          title="Final Decision"
          value={passFail === "passed" ? "Interview" : "Rejected"}
          subtitle="Current result"
        />
      </div>
    </section>
  );
};
