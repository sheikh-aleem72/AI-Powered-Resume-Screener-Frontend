interface SkillsCardProps {
  matched?: string[];
  missing?: string[];
}

export const SkillsCard = ({ matched = [], missing = [] }: SkillsCardProps) => {
  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
      <h3 className="text-xl font-semibold text-text-primary">Skills Match</h3>

      <p className="mt-2 text-text-secondary">
        Comparison between required job skills and the candidate's resume.
      </p>

      {/* Matched */}

      <div className="mt-8">
        <p className="text-sm font-semibold text-emerald-400">
          Matched Skills ({matched.length})
        </p>

        {matched.length === 0 ? (
          <p className="mt-3 text-sm text-text-secondary">
            No matched skills detected.
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-3">
            {matched.map((skill) => (
              <span
                key={skill}
                className="
                  rounded-full
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-emerald-400
                "
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Missing */}

      <div className="mt-8">
        <p className="text-sm font-semibold text-red-400">
          Missing Skills ({missing.length})
        </p>

        {missing.length === 0 ? (
          <p className="mt-3 text-sm text-text-secondary">
            All required skills were identified.
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            {missing.map((skill) => (
              <span
                key={skill}
                className="
                  rounded-full
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-red-400
                "
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
