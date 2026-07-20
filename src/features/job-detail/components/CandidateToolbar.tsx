import { Filter } from "lucide-react";

interface CandidateToolbarProps {
  totalCandidates: number;
  passFail?: "passed" | "failed";
  onFilterChange: (value?: "passed" | "failed") => void;
}

export const CandidateToolbar = ({
  totalCandidates,
  passFail,
  onFilterChange,
}: CandidateToolbarProps) => {
  const filters = [
    {
      label: "All",
      value: undefined,
    },
    {
      label: "Matched",
      value: "passed" as const,
    },
    {
      label: "Not Matched",
      value: "failed" as const,
    },
  ];

  return (
    <section className="space-y-6">
      {/* Heading */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Candidates
        </p>

        <h2 className="mt-2 text-3xl font-bold text-text-primary">
          Candidate Pipeline
        </h2>

        <p className="mt-2 text-text-secondary">
          Review every screened candidate for this hiring pipeline.
        </p>
      </div>

      {/* Toolbar */}

      <div className="rounded-3xl border border-border-default bg-bg-secondary p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Count */}

          <div>
            <p className="mt-1 text-2xl font-bold text-text-primary">
              {totalCandidates} Candidate
              {totalCandidates === 1 ? "" : "s"}
            </p>

            <p className="mt-2 text-text-secondary">
              Review every screened resume.
            </p>
          </div>

          {/* Filter */}

          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-action-primary" />

            <div className="flex rounded-xl border border-border-default bg-bg-primary p-1">
              {filters.map(({ label, value }) => {
                const active = passFail === value;

                return (
                  <button
                    key={label}
                    onClick={() => onFilterChange(value)}
                    className={`
                      rounded-lg
                      px-4
                      py-2
                      text-sm
                      font-medium
                      transition-all
                      ${
                        active
                          ? "bg-action-primary text-white shadow-sm"
                          : "text-text-secondary hover:text-text-primary"
                      }
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
