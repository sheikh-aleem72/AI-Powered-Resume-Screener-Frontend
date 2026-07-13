import { useNavigate } from "react-router-dom";

import { ArrowRight, BriefcaseBusiness, Plus, Sparkles } from "lucide-react";

interface HomeHeaderProps {
  recruiterName?: string;
}

interface HomeHeaderProps {
  recruiterName?: string;
}

export const HomeHeader = ({ recruiterName }: HomeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border-default bg-bg-secondary p-8 lg:p-10">
      {/* Decorative Glow */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-action-primary/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-action-primary/20 bg-action-primary/10 px-4 py-2 text-sm font-medium text-action-primary">
            <Sparkles className="h-4 w-4" />
            AI-powered hiring workspace
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-text-primary">
            Welcome back,
            {recruiterName && (
              <span className="text-action-primary">
                {" "}
                {recruiterName.toLocaleUpperCase()}
              </span>
            )}
            !
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-text-secondary">
            Create jobs, monitor screening progress, and review AI-ranked
            candidates from one centralized workspace.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate("/jobs/new")}
            className="
              inline-flex items-center gap-2
              rounded-xl
              bg-action-primary
              px-5 py-3
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-action-primary-hover
              hover:-translate-y-0.5
            "
          >
            <Plus className="h-5 w-5" />
            New Job
          </button>

          <button
            onClick={() => navigate("/jobs")}
            className="
              inline-flex items-center gap-2
              rounded-xl
              border border-border-default
              bg-bg-primary
              px-5 py-3
              font-semibold
              text-text-primary
              transition-all
              duration-200
              hover:border-action-primary/40
              hover:bg-bg-surface
            "
          >
            <BriefcaseBusiness className="h-5 w-5" />
            View Jobs
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
