import { BriefcaseBusiness, CheckCircle2, Clock3, Users } from "lucide-react";

import { SummaryCard } from "../../home/components/SummaryCard";
import type { Job } from "../api";

interface JobsStatsProps {
  jobs: Job[];
}

export const JobsStats = ({ jobs }: JobsStatsProps) => {
  const totalJobs = jobs.length;

  const completedJobs = jobs.filter(
    (job) => job.completedResumes === job.totalResumes
  ).length;

  const processingJobs = totalJobs - completedJobs;

  const totalCandidates = jobs.reduce(
    (total, job) => total + job.totalResumes,
    0
  );

  return (
    <section className="space-y-6">
      {/* Section Header */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Workspace
        </p>

        <h2 className="mt-2 text-3xl font-bold text-text-primary">
          Hiring Overview
        </h2>

        <p className="mt-2 text-text-secondary">
          Monitor recruitment progress across all active hiring pipelines.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Jobs"
          value={totalJobs}
          description="Hiring pipelines"
          icon={BriefcaseBusiness}
        />

        <SummaryCard
          title="Completed"
          value={completedJobs}
          description="Ready for review"
          icon={CheckCircle2}
        />

        <SummaryCard
          title="Processing"
          value={processingJobs}
          description="Currently screening"
          icon={Clock3}
        />

        <SummaryCard
          title="Candidates"
          value={totalCandidates}
          description="Total resumes"
          icon={Users}
        />
      </div>
    </section>
  );
};
