import { BriefcaseBusiness, Sparkles, Clock3 } from "lucide-react";

export const JobCreateHero = () => {
  return (
    <section className="rounded-3xl border border-border-default bg-bg-secondary p-8">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        {/* Left */}

        <div className="max-w-2xl">
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-action-primary/20
              bg-action-primary/10
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              text-action-primary
            "
          >
            <BriefcaseBusiness className="h-3.5 w-3.5" />
            Job Setup
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-text-primary">
            Create Hiring Pipeline
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-text-secondary">
            Configure the role, define hiring requirements, and let ClearHire
            automatically screen and rank incoming candidates.
          </p>
        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-8">
          <div>
            <Clock3 className="mb-3 h-6 w-6 text-action-primary" />

            <p className="text-sm text-text-secondary">Estimated Setup</p>

            <p className="mt-2 text-2xl font-bold text-text-primary">~1 min</p>
          </div>

          <div>
            <Sparkles className="mb-3 h-6 w-6 text-action-primary" />

            <p className="text-sm text-text-secondary">AI Ranking</p>

            <p className="mt-2 text-2xl font-bold text-emerald-400">Enabled</p>
          </div>
        </div>
      </div>
    </section>
  );
};
