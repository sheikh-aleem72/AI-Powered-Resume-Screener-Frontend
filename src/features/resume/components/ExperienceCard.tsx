interface ExperienceCardProps {
  requiredYears?: number;
  candidateYears?: number;
  meetsRequirement?: boolean;
}

export const ExperienceCard = ({
  requiredYears,
  candidateYears,
  meetsRequirement,
}: ExperienceCardProps) => {
  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
      <h3 className="text-xl font-semibold text-text-primary">
        Experience Match
      </h3>

      <p className="mt-2 text-text-secondary">
        Compare the candidate's experience against the hiring requirement.
      </p>

      <div className="mt-8 space-y-6">
        {/* Required */}

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text-secondary">
            Required Experience
          </p>

          <span className="inline-flex rounded-full border border-action-primary/20 bg-action-primary/10 px-4 py-2 text-sm font-semibold text-action-primary">
            {requiredYears != null ? `${requiredYears} Years` : "Not Specified"}
          </span>
        </div>

        <div className="border-t border-border-subtle" />

        {/* Candidate */}

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text-secondary">
            Candidate Experience
          </p>

          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              candidateYears != null
                ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border border-border-default bg-bg-primary text-text-primary"
            }`}
          >
            {candidateYears != null
              ? `${candidateYears} Years`
              : "Not Available"}
          </span>
        </div>

        <div className="border-t border-border-subtle" />

        {/* Result */}

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text-secondary">Result</p>

          <span
            className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              meetsRequirement
                ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border border-red-500/20 bg-red-500/10 text-red-400"
            }`}
          >
            {meetsRequirement ? "Pass" : "Fail"}
          </span>
        </div>
      </div>
    </div>
  );
};
