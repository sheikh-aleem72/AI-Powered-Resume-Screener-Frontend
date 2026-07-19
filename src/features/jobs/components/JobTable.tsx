import { Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { Job } from "../api";
import { useDeleteMutation } from "../hooks/useDeleteJob";
import { StatusBadge } from "./StatusBadge";
import { formatRelativeTime } from "../../../utils/formatRelativeTime";

interface Props {
  jobs: Job[];
}

export const JobTable = ({ jobs }: Props) => {
  const navigate = useNavigate();
  const deleteMutation = useDeleteMutation();

  if (jobs.length === 0) {
    return (
      <div className="rounded-3xl border border-border-default bg-bg-secondary p-12 text-center">
        <h3 className="text-2xl font-bold text-text-primary">
          No hiring pipelines yet
        </h3>

        <p className="mt-3 text-text-secondary">
          Create your first job to begin screening resumes.
        </p>
      </div>
    );
  }

  const handleDelete = (jobId: string) => {
    if (!window.confirm("Delete this hiring pipeline?")) return;

    deleteMutation.mutate(jobId);
  };

  return (
    <section className="space-y-6">
      {/* Heading */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Jobs
        </p>

        <h2 className="mt-2 text-3xl font-bold text-text-primary">
          Hiring Pipelines
        </h2>

        <p className="mt-2 text-text-secondary">
          Open a pipeline to review candidates, monitor progress, or manage
          recruitment.
        </p>
      </div>

      {/* Card */}

      <div className="overflow-hidden rounded-3xl border border-border-default bg-bg-secondary">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-border-subtle bg-bg-primary">
              <tr className="text-left text-sm font-semibold text-text-secondary">
                <th className="px-6 py-5">Job</th>
                <th className="px-6 py-5">Progress</th>
                <th className="px-6 py-5">Candidates</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Updated</th>
                <th className="px-6 py-5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => {
                const deleting = job.status === "deleting";

                const completed =
                  job.completedResumes === job.totalResumes && !deleting;

                const status = deleting
                  ? "deleting"
                  : completed
                    ? "completed"
                    : "processing";

                const progress =
                  job.totalResumes === 0
                    ? 0
                    : Math.round(
                        (job.completedResumes / job.totalResumes) * 100
                      );

                const formattedDate = new Intl.DateTimeFormat("en", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(job.updatedAt));

                const relativeTime = formatRelativeTime(job.updatedAt);

                return (
                  <tr
                    key={job._id}
                    onClick={() => !deleting && navigate(`/jobs/${job._id}`)}
                    className={`
                      border-b
                      border-border-subtle
                      transition-colors
                      ${
                        deleting
                          ? "opacity-60"
                          : "cursor-pointer hover:bg-white/3"
                      }
                    `}
                  >
                    {/* Job */}

                    <td className="px-6 py-5">
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          {job.title}
                        </h3>

                        <p className="mt-1 text-sm text-text-secondary">
                          Created{" "}
                          {new Intl.DateTimeFormat("en", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }).format(new Date(job.createdAt))}
                        </p>
                      </div>
                    </td>

                    {/* Progress */}

                    <td className="px-6 py-5">
                      <div className="w-52">
                        <p className="mb-2 text-sm font-medium text-text-primary">
                          {job.completedResumes} / {job.totalResumes} completed
                        </p>

                        <div className="h-3 overflow-hidden rounded-full bg-gray-400">
                          <div
                            className={`
                            h-full
                            rounded-full
                            transition-all
                            duration-700
                            ${
                              status === "completed"
                                ? "bg-emerald-500"
                                : "bg-action-primary animate-pulse"
                            }
                           `}
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Candidates */}

                    <td className="px-6 py-5">
                      <div className="space-y-1 text-sm">
                        <p className="font-medium text-text-primary">
                          {job.totalResumes} Total
                        </p>

                        <p className="text-red-400">
                          {job.failedResumes} Failed
                        </p>
                      </div>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">
                      <StatusBadge status={status} />
                    </td>

                    {/* Updated */}

                    <td className="px-6 py-5 text-sm text-text-secondary">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-text-primary">
                          {formattedDate}
                        </p>

                        <p className="text-xs text-text-secondary">
                          {relativeTime}
                        </p>
                      </div>
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            if (!deleting) navigate(`/jobs/${job._id}`);
                          }}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-action-primary/10
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-action-primary
                            transition-all
                            duration-200
                            hover:bg-action-primary
                            hover:text-white
                          "
                        >
                          Open
                          <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(job._id);
                          }}
                          disabled={deleting}
                          className="
                            rounded-xl
                            p-2
                            text-red-400
                            transition
                            hover:bg-red-500/10
                            disabled:opacity-40
                          "
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
