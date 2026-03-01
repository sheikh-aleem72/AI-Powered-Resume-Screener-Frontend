import type { ResumeProcessing } from "../../api/job/index";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  resumes: ResumeProcessing[];
}

export const ResumeTable = ({ resumes }: Props) => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  if (resumes.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-6 text-center">
        No candidates match this filter.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm border-collapse">
        {/* Sticky Header */}

        <thead className="bg-muted text-left">
          <tr className="text-muted-foreground text-xs uppercase tracking-wide">
            <th className="px-4 py-2 w-20 text-center">Rank</th>
            <th className="px-4 py-2">Candidate</th>
            <th className="px-4 py-2 w-40">Status</th>
            <th className="px-4 py-2 w-24 text-center">Score</th>
            <th className="px-4 py-2">Reason</th>
          </tr>

          {/* Subtle Divider */}
          <tr>
            <th colSpan={5}>
              <div className="h-px bg-border" />
            </th>
          </tr>
        </thead>
        {/* <thead className="sticky top-0 bg-muted z-10">
          <tr className="text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-2 w-20 text-center">Rank</th>
            <th className="px-4 py-2">Candidate</th>
            <th className="px-4 py-2 w-40">Status</th>
            <th className="px-4 py-2 w-24 text-center">Score</th>
            <th className="px-4 py-2">Reason</th>
          </tr>
        </thead> */}

        <tbody>
          {resumes.map((r) => (
            <tr
              key={r.externalResumeId}
              onClick={() => navigate(`/jobs/${jobId}/resumes/${r._id}`)}
              className="border-t border-border hover:bg-muted/40 transition cursor-pointer"
            >
              {/* Rank */}
              <td className="px-4 py-2 text-center font-semibold">
                {r.rank !== null && r.rank !== undefined ? (
                  <span className="text-primary">{r.rank}</span>
                ) : (
                  <span className="text-yellow-500">Skipped</span>
                )}
              </td>

              {/* Candidate */}
              <td className="px-4 py-2">
                <div className="flex flex-col">
                  <span className="font-medium">{r.externalResumeId}</span>
                  <span className="text-xs text-muted-foreground">
                    Submitted {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </td>

              {/* Status */}
              <td className="px-4 py-2">
                {r.status !== "completed" ? (
                  <span className="text-yellow-500 font-medium">
                    Processing
                  </span>
                ) : r.passFail === "passed" ? (
                  <span className="text-green-500 font-medium">Matched</span>
                ) : (
                  <span className="text-red-500 font-medium">Not Matched</span>
                )}
              </td>

              {/* Score */}
              <td className="px-4 py-2 text-center">
                {r.rank !== null && r.rank !== undefined ? (
                  <span className="font-semibold">
                    {r.finalScore?.toFixed(3)}
                  </span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>

              {/* Reason */}
              <td className="px-4 py-2">
                {r.passFail === "failed" && r.explanation?.decision?.reasons ? (
                  <div className="flex flex-col gap-1 max-w-md">
                    {r.explanation.decision.reasons
                      .slice(0, 2)
                      .map((reason: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs text-muted-foreground line-clamp-1"
                        >
                          • {reason}
                        </span>
                      ))}
                  </div>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
