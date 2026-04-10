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
        {/* Header — untouched */}
        <thead className="bg-muted text-left">
          <tr className="text-muted-foreground text-xs uppercase tracking-wide">
            <th className="px-4 py-2 w-20 text-center">Rank</th>
            <th className="px-4 py-2">Candidate</th>
            <th className="px-4 py-2 w-40">Status</th>
            <th className="px-4 py-2 w-24 text-center">Score</th>
            <th className="px-4 py-2">Reason</th>
          </tr>
          <tr>
            <th colSpan={5}>
              <div className="h-px bg-border" />
            </th>
          </tr>
        </thead>

        <tbody>
          {resumes.map((r) => {
            const reasons: string[] = r.explanation?.decision?.reasons ?? [];

            return (
              <tr
                key={r.externalResumeId}
                onClick={() => navigate(`/jobs/${jobId}/resumes/${r._id}`)}
                className="border-t border-border hover:bg-muted/40 transition cursor-pointer"
              >
                {/* ---- Rank — improved ---------------------------------- */}
                {/* Numeric circle for ranked; amber "Skipped" badge when   */}
                {/* skipped; animated skeleton while still processing.      */}

                <td className="px-4 py-2 text-center font-semibold">
                  {r.status !== "completed" ? (
                    <div className="w-6 h-4 rounded bg-muted animate-pulse mx-auto" />
                  ) : r.rank !== null && r.rank !== undefined ? (
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-action-primary/10 text-action-primary text-xs font-semibold">
                      {r.rank}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-state-warning/10 text-state-warning">
                      Skipped
                    </span>
                  )}
                </td>

                {/* ---- Candidate — improved ------------------------------ */}
                {/* Submission date formatted as "Apr 9, 2026" instead of   */}
                {/* the locale default which varies by browser/region.      */}

                <td className="px-4 py-2 align-top">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium leading-tight">
                      {r.externalResumeId}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Submitted{" "}
                      {new Date(r.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </td>

                {/* ---- Status — original, untouched ---------------------- */}

                <td className="px-4 py-2">
                  {r.status !== "completed" ? (
                    <span className="text-yellow-500 font-medium">
                      Processing
                    </span>
                  ) : r.passFail === "passed" ? (
                    <span className="text-green-500 font-medium">Matched</span>
                  ) : (
                    <span className="text-red-500 font-medium">
                      Not Matched
                    </span>
                  )}
                </td>

                {/* ---- Score — original, untouched ----------------------- */}

                <td className="px-4 py-2 text-center">
                  {r.rank !== null && r.rank !== undefined ? (
                    <span className="font-semibold">
                      {r.finalScore?.toFixed(3)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>

                {/* ---- Reason — improved --------------------------------- */}
                {/* Each reason is its own chip — full text, never          */}
                {/* truncated, stacks vertically. Subtle danger tint ties   */}
                {/* chips to the rejection context without visual noise.    */}

                <td className="px-4 py-2 align-top">
                  {r.passFail === "failed" && reasons.length > 0 ? (
                    <div className="flex flex-col gap-1.5">
                      {reasons.map((reason, i) => (
                        <span
                          key={i}
                          className="
                            inline-flex items-start gap-1.5
                            px-2 py-1 rounded-md
                            text-xs text-foreground
                            bg-state-danger/5 border border-state-danger/15
                            whitespace-normal leading-relaxed
                          "
                        >
                          <span className="w-1 h-1 rounded-full bg-state-danger/50 shrink-0 mt-1.5" />
                          {reason}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
