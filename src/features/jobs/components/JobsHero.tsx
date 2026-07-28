import { Link } from "react-router-dom";
import { BriefcaseBusiness, Plus } from "lucide-react";

export const JobsHero = () => {
  return (
    <section
      className="
        rounded-3xl
        border
        border-border-default
        bg-bg-secondary
        p-6
        lg:p-10
      "
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-action-primary/20 bg-action-primary/10 px-4 py-2">
            <BriefcaseBusiness className="h-4 w-4 text-action-primary" />

            <span className="text-sm font-medium text-action-primary">
              Workspace
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-text-primary">
            Jobs
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-8 text-text-secondary">
            Manage every hiring pipeline from one place. Track screening
            progress, monitor candidates, and continue reviewing active jobs.
          </p>
        </div>

        {/* Right */}

        <div className="flex shrink-0">
          <Link
            to="/jobs/new"
            className="
              inline-flex
              h-12
              items-center
              gap-3
              rounded-xl
              bg-action-primary
              px-6
              font-semibold
              text-white
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-action-primary-hover
            "
          >
            <Plus className="h-5 w-5" />
            New Job
          </Link>
        </div>
      </div>
    </section>
  );
};
