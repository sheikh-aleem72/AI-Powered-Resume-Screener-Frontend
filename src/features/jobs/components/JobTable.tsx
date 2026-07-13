import { useNavigate } from "react-router-dom";
import type { Job } from "../api";
import { useDeleteMutation } from "../hooks/useDeleteJob";

interface Props {
  jobs: Job[];
}

export const JobTable = ({ jobs }: Props) => {
  const navigate = useNavigate();
  const deleteMutation = useDeleteMutation();

  if (jobs.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No jobs created yet.</div>
    );
  }

  /**
   * Ask for confirmation before starting
   * asynchronous job deletion.
   */
  const handleDelete = (jobId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    deleteMutation.mutate(jobId);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr className="text-left">
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3">Failed</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Last Updated</th>
            <th className="px-4 py-3">Remove Job</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => {
            // -------------------------------------------------------
            // Derived state
            // -------------------------------------------------------

            const isDeleting = job.status === "deleting";

            const isComplete = job.completedResumes === job.totalResumes;

            const progressPercent =
              job.totalResumes === 0
                ? 0
                : Math.round((job.completedResumes / job.totalResumes) * 100);

            // -------------------------------------------------------
            // Status presentation
            // -------------------------------------------------------

            let statusLabel = "";
            let statusClass = "";

            if (isDeleting) {
              statusLabel = "Deleting";
              statusClass = "text-red-500";
            } else if (isComplete) {
              statusLabel = "Completed";
              statusClass = "text-green-500";
            } else {
              statusLabel = "Processing";
              statusClass = "text-yellow-500";
            }

            return (
              <tr
                key={job._id}
                onClick={() => {
                  // Prevent opening a job while
                  // it is being deleted.
                  if (!isDeleting) {
                    navigate(`/jobs/${job._id}`);
                  }
                }}
                className={`border-t border-border transition ${
                  isDeleting
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer hover:bg-muted/50"
                }`}
              >
                {/* ---------------- Title ---------------- */}

                <td className="px-4 py-3 font-medium">{job.title}</td>

                {/* ---------------- Progress ---------------- */}

                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span>
                      {job.completedResumes} / {job.totalResumes}
                    </span>

                    <div className="h-2 w-full rounded bg-border">
                      <div
                        className="h-2 rounded bg-primary transition-all"
                        style={{
                          width: `${progressPercent}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                {/* ---------------- Failed ---------------- */}

                <td className="px-4 py-3">
                  {job.failedResumes > 0 ? (
                    <span className="font-medium text-red-500">
                      {job.failedResumes}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">0</span>
                  )}
                </td>

                {/* ---------------- Status ---------------- */}

                <td className="px-4 py-3">
                  <span className={`text-xs font-medium ${statusClass}`}>
                    {statusLabel}
                  </span>
                </td>

                {/* ---------------- Updated ---------------- */}

                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(job.updatedAt).toLocaleString()}
                </td>

                {/* ---------------- Delete ---------------- */}

                <td className="px-4 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(job._id);
                    }}
                    disabled={isDeleting}
                    className="text-red-500 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
