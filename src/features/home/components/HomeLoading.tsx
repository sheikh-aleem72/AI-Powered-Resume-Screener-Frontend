export const HomeLoading = () => {
  return (
    <main className="relative mx-auto max-w-7xl space-y-20 px-8 py-8">
      {/* ================= Hero ================= */}

      <section className="rounded-[28px] border border-border-default bg-bg-secondary p-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6">
            <div className="skeleton h-9 w-60 rounded-full" />

            <div className="skeleton h-14 w-96 rounded-xl" />

            <div className="space-y-3">
              <div className="skeleton h-5 w-130 rounded" />

              <div className="skeleton h-5 w-105 rounded" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="skeleton h-12 w-36 rounded-xl" />

            <div className="skeleton h-12 w-40 rounded-xl" />
          </div>
        </div>
      </section>

      {/* ================= Summary ================= */}

      <section className="space-y-8">
        <div className="space-y-4">
          <div className="skeleton h-4 w-24 rounded-full" />

          <div className="skeleton h-12 w-72 rounded-xl" />

          <div className="skeleton h-5 w-96 rounded" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-border-default bg-bg-secondary p-8"
            >
              <div className="skeleton mb-8 h-14 w-14 rounded-2xl" />

              <div className="space-y-4">
                <div className="skeleton h-4 w-28 rounded" />

                <div className="skeleton h-12 w-20 rounded" />

                <div className="skeleton h-4 w-32 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Recent Jobs ================= */}

      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-4">
            <div className="skeleton h-4 w-20 rounded-full" />

            <div className="skeleton h-12 w-72 rounded-xl" />

            <div className="skeleton h-5 w-80 rounded" />
          </div>

          <div className="skeleton h-5 w-24 rounded" />
        </div>

        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-border-default bg-bg-secondary p-8"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="skeleton h-8 w-56 rounded-lg" />

                  <div className="skeleton h-7 w-28 rounded-full" />
                </div>

                <div className="flex gap-8">
                  <div className="skeleton h-4 w-28 rounded" />

                  <div className="skeleton h-4 w-32 rounded" />
                </div>
              </div>

              <div className="skeleton h-6 w-20 rounded" />
            </div>
          </div>
        ))}
      </section>

      {/* ================= Tips ================= */}

      <section className="space-y-8">
        <div className="space-y-4">
          <div className="skeleton h-4 w-28 rounded-full" />

          <div className="skeleton h-12 w-105 rounded-xl" />

          <div className="skeleton h-5 w-125 rounded" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-border-default bg-bg-secondary p-8"
            >
              <div className="skeleton mb-8 h-14 w-14 rounded-2xl" />

              <div className="space-y-5">
                <div className="skeleton h-7 w-52 rounded" />

                <div className="space-y-3">
                  <div className="skeleton h-4 w-full rounded" />

                  <div className="skeleton h-4 w-5/6 rounded" />

                  <div className="skeleton h-4 w-2/3 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
