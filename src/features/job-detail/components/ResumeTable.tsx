import { useNavigate, useParams } from "react-router-dom";

import { CandidateStatusBadge } from "./CandidateStatusBadge";
import { RankBadge } from "./RankBadge";
import type { ResumeProcessing } from "../../jobs/api";

interface Props {
  resumes: ResumeProcessing[];
}

export const ResumeTable = ({ resumes }: Props) => {
  const navigate = useNavigate();
  const { jobId } = useParams();

  if (resumes.length === 0) {
    return (
      <div className="rounded-3xl border border-border-default bg-bg-secondary py-16 text-center">
        <h3 className="text-xl font-semibold text-text-primary">
          No Candidates Found
        </h3>

        <p className="mt-2 text-text-secondary">
          No candidates match the selected filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border-default bg-bg-secondary">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* ---------------- Header ---------------- */}

          <thead className="border-b border-border-subtle bg-bg-primary">
            <tr className="text-left text-sm font-semibold text-text-secondary">
              <th className="w-24 px-6 py-5 text-center">Rank</th>

              <th className="px-6 py-5">Candidate</th>

              <th className="w-44 px-6 py-5">Status</th>

              <th className="w-36 px-6 py-5 text-center">Score</th>

              <th className="px-6 py-5">Evaluation</th>
            </tr>
          </thead>

          {/* ---------------- Body ---------------- */}

          <tbody>
            {resumes.map((r) => {
              const reasons: string[] = r.explanation?.decision?.reasons ?? [];

              const status =
                r.status !== "completed"
                  ? "processing"
                  : r.passFail === "passed"
                    ? "matched"
                    : "failed";

              const formattedDate = new Intl.DateTimeFormat("en", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(r.createdAt));

              return (
                <tr
                  key={r.externalResumeId}
                  onClick={() => navigate(`/jobs/${jobId}/resumes/${r._id}`)}
                  className="
                    cursor-pointer
                    border-b
                    border-border-subtle
                    transition-colors
                    hover:bg-bg-primary
                  "
                >
                  {/* ---------------- Rank ---------------- */}

                  <td className="px-6 py-5 text-center">
                    <RankBadge
                      rank={r.rank}
                      processing={r.status !== "completed"}
                    />
                  </td>

                  {/* ---------------- Candidate ---------------- */}

                  <td className="px-6 py-5 align-top">
                    <div className="space-y-1">
                      <p className="font-semibold text-text-primary">
                        {r.externalResumeId}
                      </p>

                      <p className="text-sm text-text-secondary">
                        Submitted {formattedDate}
                      </p>
                    </div>
                  </td>

                  {/* ---------------- Status ---------------- */}

                  <td className="px-6 py-5">
                    <CandidateStatusBadge status={status} />
                  </td>

                  {/* ---------------- Score ---------------- */}

                  <td className="px-6 py-5 text-center">
                    {r.rank !== null && r.rank !== undefined ? (
                      <div
                        className="
                          inline-flex
                          rounded-xl
                          bg-action-primary/10
                          px-3
                          py-2
                          font-bold
                          text-action-primary
                        "
                      >
                        {r.finalScore ? `${Math.round(r.finalScore)}%` : "—"}
                      </div>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>

                  {/* ---------------- Evaluation ---------------- */}

                  <td className="px-6 py-5 align-top">
                    {" "}
                    {r.passFail === "failed" && reasons.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {reasons.map((reason, index) => (
                          <span
                            key={index}
                            className="
                              inline-flex
                              items-start
                              gap-2
                              rounded-lg
                              border
                              border-border-default
                              bg-red-500/5
                              px-3
                              py-2
                              text-xs
                              leading-relaxed
                              text-text-primary
                            "
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />

                            <span>{reason}</span>
                          </span>
                        ))}
                      </div>
                    ) : r.passFail === "passed" ? (
                      <div className="flex flex-wrap gap-2">
                        {(r.explanation?.decision?.strengths ?? []).length >
                        0 ? (
                          r.explanation.decision.strengths.map(
                            (strength: string, index: number) => (
                              <span
                                key={index}
                                className="
                                  inline-flex
                                  items-start
                                  gap-2
                                  rounded-lg
                                  border
                                  border-border-default
                                  bg-emerald-500/5
                                  px-3
                                  py-2
                                  text-xs
                                  leading-relaxed
                                  text-text-primary
                                "
                              >
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />

                                <span>{strength}</span>
                              </span>
                            )
                          )
                        ) : (
                          <span className="text-text-muted">
                            Candidate meets the required criteria.
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-text-muted">
                        Resume is currently being processed...
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
