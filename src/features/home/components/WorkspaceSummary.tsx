import { BriefcaseBusiness, CircleCheckBig, Clock3, Users } from "lucide-react";

import { SummaryCard } from "./SummaryCard";
import type { WorkspaceSummary as WorkspaceSummaryData } from "../types";

interface WorkspaceSummaryProps {
  summary: WorkspaceSummaryData;
}

export const WorkspaceSummary = ({ summary }: WorkspaceSummaryProps) => {
  return (
    <section className="space-y-8 px-5">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Workspace
        </span>

        <h2 className="mt-2 text-3xl font-bold text-text-primary">
          Hiring overview
        </h2>

        <p className="mt-3 text-text-secondary">
          Monitor recruitment progress across all jobs from a single place.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Jobs"
          value={summary.totalJobs}
          icon={BriefcaseBusiness}
          description="Jobs created"
        />

        <SummaryCard
          title="Completed"
          value={summary.completedJobs}
          icon={CircleCheckBig}
          description="Ready for review"
        />

        <SummaryCard
          title="Processing"
          value={summary.processingJobs}
          icon={Clock3}
          description="Currently screening"
        />

        <SummaryCard
          title="Candidates"
          value={summary.candidatesScreened}
          icon={Users}
          description="Resumes screened"
        />
      </div>
    </section>
  );
};
