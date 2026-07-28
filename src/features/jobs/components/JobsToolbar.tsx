import { Search } from "lucide-react";

export const JobsToolbar = () => {
  return (
    <section className="space-y-6">
      {/* Section Heading */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Hiring Pipelines
        </p>

        <h2 className="mt-2 text-3xl font-bold text-text-primary">
          Manage Jobs
        </h2>

        <p className="mt-2 text-text-secondary">
          Search, filter, and monitor every hiring pipeline from one place.
        </p>
      </div>

      {/* Toolbar */}

      <div className="rounded-3xl border border-border-default bg-bg-secondary p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}

          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />

            <input
              type="text"
              placeholder="Search jobs..."
              disabled
              className="
                w-full
                rounded-xl
                border
                border-border-default
                bg-bg-primary
                py-3
                pl-12
                pr-4
                text-text-primary
                placeholder:text-text-muted
                outline-none
                opacity-70
              "
            />
          </div>

          {/* Status Filter */}

          <select
            disabled
            className="
              w-full
              rounded-xl
              border
              border-border-default
              bg-bg-primary
              px-4
              py-3
              text-text-secondary
              outline-none
              opacity-70
              lg:w-56
            "
          >
            <option>All Jobs</option>
            <option>Processing</option>
            <option>Completed</option>
            <option>Deleting</option>
          </select>
        </div>

        {/* Coming Soon */}

        <p className="mt-4 text-sm text-text-secondary">
          Search and filtering will be available in an upcoming update.
        </p>
      </div>
    </section>
  );
};
