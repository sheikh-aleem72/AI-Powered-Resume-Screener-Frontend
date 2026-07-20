export const JobLoading = () => {
  return (
    <div className="space-y-10 animate-pulse p-4">
      {/* Hero */}

      <section className="rounded-3xl border border-border-default bg-bg-secondary p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 space-y-5">
            <div className="h-8 w-32 rounded-full bg-bg-primary" />

            <div className="h-12 w-2/3 rounded-xl bg-bg-primary" />

            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-bg-primary" />
              <div className="h-4 w-5/6 rounded bg-bg-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-10 w-32 rounded-full bg-bg-primary" />

            <div className="h-12 w-40 rounded-xl bg-bg-primary" />
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-border-default bg-bg-secondary p-7"
          >
            <div className="h-14 w-14 rounded-2xl bg-bg-primary" />

            <div className="mt-8 h-4 w-24 rounded bg-bg-primary" />

            <div className="mt-4 h-10 w-16 rounded bg-bg-primary" />

            <div className="mt-4 h-4 w-28 rounded bg-bg-primary" />
          </div>
        ))}
      </section>

      {/* Job Details */}

      <section className="rounded-3xl border border-border-default bg-bg-secondary p-8">
        <div className="space-y-6">
          <div className="h-8 w-56 rounded bg-bg-primary" />

          <div className="grid gap-8 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-bg-primary" />

                <div className="flex-1 space-y-3">
                  <div className="h-3 w-24 rounded bg-bg-primary" />
                  <div className="h-5 w-36 rounded bg-bg-primary" />
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-border-subtle" />

          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-10 w-24 rounded-xl bg-bg-primary" />
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}

      <section className="rounded-3xl border border-border-default bg-bg-secondary p-8">
        <div className="space-y-6">
          <div className="h-8 w-64 rounded bg-bg-primary" />

          <div className="h-3 w-full rounded-full bg-bg-primary" />

          <div className="flex justify-between">
            <div className="h-4 w-32 rounded bg-bg-primary" />

            <div className="h-4 w-20 rounded bg-bg-primary" />
          </div>
        </div>
      </section>

      {/* Toolbar */}

      <section className="rounded-3xl border border-border-default bg-bg-secondary p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-4 w-24 rounded bg-bg-primary" />
            <div className="h-8 w-48 rounded bg-bg-primary" />
          </div>

          <div className="h-12 w-44 rounded-xl bg-bg-primary" />
        </div>
      </section>

      {/* Table */}

      <section className="overflow-hidden rounded-3xl border border-border-default bg-bg-secondary">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-8 border-b border-border-subtle p-6 last:border-b-0"
          >
            <div className="h-10 w-10 rounded-full bg-bg-primary" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-56 rounded bg-bg-primary" />
              <div className="h-3 w-40 rounded bg-bg-primary" />
            </div>

            <div className="h-8 w-24 rounded-full bg-bg-primary" />

            <div className="h-10 w-20 rounded-xl bg-bg-primary" />

            <div className="h-12 w-72 rounded-xl bg-bg-primary" />
          </div>
        ))}
      </section>
    </div>
  );
};
