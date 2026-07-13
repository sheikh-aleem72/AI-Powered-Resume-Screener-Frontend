import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { RecentJobCard } from "./RecentJobCard";
import { type RecentJobCardProps } from "../../../types/workspaceSummary";

interface RecentJobsProps {
  jobs: RecentJobCardProps[];
}

export const RecentJobs = ({ jobs }: RecentJobsProps) => {
  return (
    <section className="space-y-8 px-5">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
            Jobs
          </span>

          <h2 className="mt-2 text-3xl font-bold text-text-primary">
            Recent jobs
          </h2>

          <p className="mt-3 text-text-secondary">
            Continue reviewing your latest hiring pipelines.
          </p>
        </div>

        <Link
          to="/jobs"
          className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-action-primary
          transition-colors
          hover:text-blue-300
        "
        >
          View all jobs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-5">
        {jobs.map((job) => (
          <RecentJobCard
            key={job.id}
            id={job.id}
            title={job.title}
            status={
              job.candidateCount === job.completedCount
                ? "completed"
                : "processing"
            }
            createdAt={job.createdAt}
            candidateCount={job.candidateCount}
            completedCount={job.completedCount}
          />
        ))}
      </div>
    </section>
  );
};
