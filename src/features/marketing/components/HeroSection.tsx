import { MarketingButton } from "./MarketingButton";

const previewCandidates = [
  {
    rank: 1,
    resumeId: "frontend_dev_cv.pdf",
    status: "Matched",
    match: "96%",
  },
  {
    rank: 2,
    resumeId: "john_smith_resume.pdf",
    status: "Matched",
    match: "91%",
  },
  {
    rank: "-",
    resumeId: "marketing_resume.pdf",
    status: "Not Matched",
    match: "--",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.16),transparent_58%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-action-primary/30 bg-action-primary/10 px-3 py-1 text-sm font-medium text-action-primary">
            AI screening built for recruiter speed
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
            Shortlist the right resumes before your next standup.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
            ClearHire ranks candidates against each job description, explains
            the screening decision, and turns resume review into a focused
            recruiter workflow.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MarketingButton to="/auth/signup">Start screening</MarketingButton>
            <MarketingButton to="/auth/signin" variant="secondary">
              Sign in
            </MarketingButton>
          </div>
        </div>

        <div
          className="overflow-hidden rounded-xl border border-border-subtle bg-bg-surface/80 shadow-sm backdrop-blur"
          aria-label="ClearHire resume ranking table preview"
        >
          <div className="border-b border-border-subtle p-4">
            <div>
              <p className="text-sm font-semibold text-text-primary">
                Senior Frontend Engineer
              </p>
              <p className="mt-1 text-xs text-text-muted">
                31 resumes • AI ranking complete
              </p>
            </div>
            <div className="mt-3 inline-flex items-center rounded-full bg-state-success/10 px-2.5 py-1 text-xs font-medium text-state-success">
              AI Ranking Complete
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-text-primary">
                Candidates
              </h2>
              <span className="rounded-full bg-bg-secondary px-2 py-0.5 text-xs text-text-muted">
                1-3 of 31
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-105 border-collapse text-left text-sm">
              <thead className="bg-bg-secondary/80">
                <tr className="text-xs uppercase tracking-wide text-text-muted">
                  <th className="px-4 py-3 font-semibold">Rank</th>
                  <th className="px-4 py-3 font-semibold">Resume</th>
                  <th className="px-4 py-3 text-center font-semibold">Match</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {previewCandidates.map((candidate) => {
                  const isMatched = candidate.status === "Matched";

                  return (
                    <tr
                      key={candidate.resumeId}
                      className="border-t border-border-subtle"
                    >
                      <td className="px-4 py-2.5">
                        {typeof candidate.rank === "number" ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-action-primary/10 text-xs font-semibold text-action-primary">
                            {candidate.rank}
                          </span>
                        ) : (
                          <span className="text-sm font-semibold text-text-muted">
                            {candidate.rank}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <p className="font-medium text-text-primary">
                          {candidate.resumeId}
                        </p>
                        <p className="mt-0.5 text-xs text-text-muted">
                          Submitted today
                        </p>
                      </td>
                      <td className="px-4 py-2.5 text-center text-lg font-semibold text-text-primary">
                        {candidate.match}
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`text-sm font-medium ${
                            isMatched
                              ? "text-state-success"
                              : "text-state-error"
                          }`}
                        >
                          {candidate.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-border-subtle p-4">
            {[
              "AI ranked candidates",
              "Explainable decisions",
              "Recruiter remains in control",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full bg-state-success/10 px-2.5 py-1 text-xs font-medium text-state-success"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
