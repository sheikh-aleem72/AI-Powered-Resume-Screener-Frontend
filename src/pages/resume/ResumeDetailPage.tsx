import { useParams, useNavigate } from "react-router-dom";
import { useResumeProcessing } from "../../hooks/resume/useResumeProcessing";
import { useRunDeepAnalysis } from "../../hooks/resume/useRunDeepAnalysis";

export const ResumeDetailPage = () => {
  const { jobId, resumeId } = useParams();
  const navigate = useNavigate();

  if (!resumeId) return null;

  const { data: resume, isLoading, isError } = useResumeProcessing(resumeId);

  console.log("ResumeProcessing: ", resume);
  // ----------------------------
  // Loading State
  // ----------------------------
  if (isLoading) {
    return (
      <div className="p-6 text-sm text-muted">Loading resume details...</div>
    );
  }

  // ----------------------------
  // Error State
  // ----------------------------
  if (isError || !resume) {
    return (
      <div className="p-6 text-sm text-state-error">
        Failed to load resume details.
      </div>
    );
  }

  // ----------------------------
  // Derived flags (not stored)
  // ----------------------------
  const showRank =
    resume.passFail === "passed" &&
    resume.rank !== null &&
    resume.rank !== undefined;

  const isPassed = resume.passFail === "passed";
  const isFailed = resume.passFail === "failed";

  // const isRankingCompleted = true;
  console.log("Resume analysis: ", resume.analysis);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/jobs/${jobId}`)}
          className="text-sm text-muted hover:text-action-primary"
        >
          ← Back
        </button>

        <div className="flex items-center gap-4">
          {showRank && (
            <div className="text-sm">
              Rank{" "}
              <span className="font-semibold text-action-primary">
                #{resume.rank}
              </span>
            </div>
          )}

          {isPassed && (
            <span className="px-3 py-1 text-xs rounded-full bg-state-success text-black font-semibold">
              PASSED
            </span>
          )}

          {isFailed && (
            <span className="px-3 py-1 text-xs rounded-full bg-state-error text-white font-semibold">
              REJECTED
            </span>
          )}
        </div>
      </div>

      {/* SCORE + STATUS BAR */}
      <div className="bg-surface-elevated border border-border-subtle rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">
            Final Score
          </div>
          <div className="text-5xl font-extrabold text-action-primary mt-1">
            {resume.finalScore?.toFixed(3) ?? "--"}
          </div>
        </div>

        <div className="flex gap-8 text-sm">
          <div>
            <div className="text-muted">Processing</div>
            <div className="mt-1 font-medium">
              {resume.status === "completed" && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-state-success text-black">
                  Completed
                </span>
              )}
              {resume.status === "failed" && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-state-error text-white">
                  Failed
                </span>
              )}
              {resume.status === "processing" && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-500 text-black">
                  Processing
                </span>
              )}
              {resume.status === "queued" && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-500 text-white">
                  Queued
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="text-muted">Ranking Status</div>
            <div className="mt-1 font-medium">
              {resume.rankingStatus === "completed" && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-state-success text-black">
                  Completed
                </span>
              )}
              {resume.rankingStatus === "skipped" && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-state-error text-white">
                  Skipped
                </span>
              )}
              {resume.rankingStatus === "pending" && (
                <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-500 text-black">
                  Pending
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="text-muted">Updated</div>
            <div className="mt-1 font-medium text-white">
              {new Date(resume.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT PANEL */}
        <div className="space-y-6">
          {/* EVALUATION */}
          <div className="bg-surface-elevated border border-border-subtle rounded-xl p-6 space-y-6">
            <h2 className="text-base font-semibold text-white">
              Evaluation Breakdown
            </h2>

            {/* DECISION */}
            <div>
              <div className="text-xs uppercase tracking-wide text-muted mb-2">
                Decision
              </div>

              <div className="text-lg font-bold text-green-500">
                {resume.explanation?.decision?.status === "passed"
                  ? "Passed"
                  : "Failed"}
              </div>

              {resume.explanation?.decision?.reasons?.length > 0 && (
                <ul className="mt-3 space-y-2 text-sm text-gray-300">
                  {resume.explanation.decision.reasons.map(
                    (reason: string, idx: number) => (
                      <li key={idx}>• {reason}</li>
                    )
                  )}
                </ul>
              )}
            </div>

            {/* SKILLS */}
            <div>
              <div className="text-xs uppercase tracking-wide text-muted mb-3">
                Skills Match
              </div>

              <SkillRow
                label="Matched"
                items={resume.explanation?.skills?.matched}
                type="success"
              />

              <SkillRow
                label="Missing"
                items={resume.explanation?.skills?.missing}
                type="error"
              />
            </div>

            {/* EXPERIENCE */}
            <div>
              <div className="text-xs uppercase tracking-wide text-muted mb-3">
                Experience
              </div>

              <div className="flex justify-between text-sm">
                <StatMini
                  label="Required"
                  value={`${resume.explanation?.experience?.requiredYears ? `${resume.explanation?.experience?.requiredYears} years` : "-"}`}
                />
                <StatMini
                  label="Candidate"
                  value={`${resume.explanation?.experience?.candidateYears ? `${resume.explanation?.experience?.candidateYears} years` : "-"}`}
                />
                <StatMini
                  label="Meets"
                  value={
                    resume.explanation?.experience?.meetsRequirement
                      ? "Yes"
                      : "No"
                  }
                  highlight={!resume.explanation?.experience?.meetsRequirement}
                />
              </div>
            </div>
          </div>

          {/* DEEP AI */}
          {resume.analysisStatus === "completed" && resume.analysis && (
            <div className="space-y-8">
              <div className="text-xs text-muted">
                Completed{" "}
                {new Date(resume.analysisCompletedAt).toLocaleString()}
              </div>

              {/* OVERALL FIT */}
              <div>
                <div className="text-sm font-medium mb-2">Overall Fit</div>
                <div
                  className={`text-lg font-semibold ${
                    resume.analysis.analysis.overallFit === "Strong"
                      ? "text-green-400"
                      : resume.analysis.analysis.overallFit === "Moderate"
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  {resume.analysis.analysis.overallFit}
                </div>
              </div>

              {/* SUMMARY */}
              <div>
                <div className="text-sm font-medium mb-2">Summary</div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {resume.analysis.analysis.summary}
                </p>
              </div>

              {/* MATCHED & MISSING */}
              <div className="grid md:grid-cols-2 gap-8">
                <AnalysisList
                  title="Top Matched Skills"
                  items={resume.analysis.analysis.matchedSkills}
                  type="success"
                />

                <AnalysisList
                  title="Missing Skills"
                  items={resume.analysis.analysis.missingSkills}
                  type="error"
                />
              </div>

              {/* STRENGTHS & CONCERNS */}
              <div className="grid md:grid-cols-2 gap-8">
                <AnalysisList
                  title="Strengths"
                  items={resume.analysis.analysis.strengths}
                  type="success"
                />

                <AnalysisList
                  title="Concerns"
                  items={resume.analysis.analysis.concerns}
                  type="error"
                />
              </div>

              {/* EXPERIENCE ASSESSMENT */}
              <div>
                <div className="text-sm font-medium mb-2">
                  Experience Assessment
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {resume.analysis.analysis.experienceAssessment}
                </p>
              </div>

              {/* RECOMMENDATION */}
              <div>
                <div className="text-sm font-medium mb-2">Recommendation</div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {resume.analysis.analysis.recommendation}
                </p>
              </div>

              <RunAnalysisButton resumeId={resume._id} />
            </div>
          )}
        </div>

        {/* RIGHT PANEL - PDF */}
        <div className="bg-surface-elevated border border-border-subtle rounded-xl overflow-hidden">
          <iframe
            src={resume.resumeUrl}
            className="w-full h-200"
            title="Resume PDF"
          />
        </div>
      </div>
    </div>
  );
};

const RunAnalysisButton = ({ resumeId }: { resumeId: string }) => {
  const { mutate, isPending } = useRunDeepAnalysis(resumeId);

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className="px-4 py-2 text-sm rounded-md bg-action-primary text-black disabled:opacity-50"
    >
      {isPending ? "Starting..." : "Run Deep Analysis"}
    </button>
  );
};

const SkillRow = ({
  label,
  items = [],
  type,
}: {
  label: string;
  items?: string[];
  type: "success" | "error";
}) => {
  if (!items || items.length === 0) return null;

  const base =
    type === "success"
      ? "bg-state-success/20 text-state-success"
      : "bg-state-error/20 text-state-error";

  return (
    <div className="mb-3">
      <div className="text-sm text-muted mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className={`px-2 py-1 text-xs rounded-md font-medium ${base}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const StatMini = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div>
    <div className="text-muted text-xs">{label}</div>
    <div
      className={`mt-1 font-semibold ${
        highlight ? "text-state-error" : "text-white"
      }`}
    >
      {value}
    </div>
  </div>
);

const AnalysisList = ({
  title,
  items = [],
  type,
}: {
  title: string;
  items?: string[];
  type: "success" | "error";
}) => {
  if (!items || items.length === 0) return null;

  const color = type === "success" ? "text-green-400" : "text-red-400";

  return (
    <div>
      <div className="text-sm font-medium mb-3">{title}</div>
      <ul className="space-y-2 text-sm">
        {items.map((item, idx) => (
          <li key={idx} className={color}>
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
