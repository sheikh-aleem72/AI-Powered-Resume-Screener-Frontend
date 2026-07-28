import { ArrowUpRight, Medal, User } from "lucide-react";

const candidates = [
  {
    name: "John Anderson",
    score: 96,
    status: "Excellent Match",
  },
  {
    name: "Sarah Wilson",
    score: 91,
    status: "Strong Match",
  },
  {
    name: "Michael Brown",
    score: 84,
    status: "Good Match",
  },
];

export const RankingMockup = () => {
  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">
            Candidate Rankings
          </h3>

          <p className="mt-1 text-sm text-text-secondary">
            Ranked automatically by AI
          </p>
        </div>

        <div className="rounded-xl bg-action-primary/10 p-3">
          <Medal className="h-6 w-6 text-action-primary" />
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.name}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-border-default
              bg-bg-primary
              px-5
              py-4
            "
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-action-primary/10">
                <User className="h-5 w-5 text-action-primary" />
              </div>

              <div>
                <p className="font-semibold text-text-primary">
                  {candidate.name}
                </p>

                <p className="text-sm text-text-secondary">
                  {candidate.status}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-state-success">
                {candidate.score}%
              </p>

              <ArrowUpRight className="ml-auto h-4 w-4 text-action-primary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
