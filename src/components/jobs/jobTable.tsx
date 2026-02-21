import { useNavigate } from "react-router-dom";
import type { Job } from "../../api/job";

interface Props {
  jobs: Job[];
}

export const JobTable = ({ jobs }: Props) => {
  const navigate = useNavigate();

  if (jobs.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No jobs created yet.</div>
    );
  }

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
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => {
            const isComplete = job.completedResumes === job.totalResumes;

            const progressPercent =
              job.totalResumes === 0
                ? 0
                : Math.round((job.completedResumes / job.totalResumes) * 100);

            const statusLabel = isComplete ? "Completed" : "Processing";

            return (
              <tr
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="cursor-pointer border-t border-border hover:bg-muted/50 transition"
              >
                <td className="px-4 py-3 font-medium">{job.title}</td>

                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span>
                      {job.completedResumes} / {job.totalResumes}
                    </span>

                    <div className="h-2 w-full rounded bg-border">
                      <div
                        className="h-2 rounded bg-primary transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  {job.failedResumes > 0 ? (
                    <span className="text-red-500 font-medium">
                      {job.failedResumes}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">0</span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium ${
                      isComplete ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {statusLabel}
                  </span>
                </td>

                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(job.updatedAt).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
