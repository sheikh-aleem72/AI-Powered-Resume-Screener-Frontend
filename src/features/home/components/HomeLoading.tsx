export const HomeLoading = () => {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Header */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="space-y-4">
          <div className="h-8 w-64 rounded bg-base-300" />
          <div className="h-4 w-full max-w-xl rounded bg-base-300" />
          <div className="h-4 w-3/4 rounded bg-base-300" />
        </div>

        <div className="mt-6 flex gap-3">
          <div className="h-11 w-36 rounded-lg bg-base-300" />
          <div className="h-11 w-32 rounded-lg bg-base-300" />
        </div>
      </section>

      {/* Workspace Summary */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="h-6 w-52 rounded bg-base-300" />
          <div className="h-4 w-72 rounded bg-base-300" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="h-4 w-24 rounded bg-base-300" />
                  <div className="h-8 w-16 rounded bg-base-300" />
                </div>

                <div className="h-12 w-12 rounded-xl bg-base-300" />
              </div>

              <div className="mt-6 h-4 w-full rounded bg-base-300" />
            </div>
          ))}
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="h-6 w-40 rounded bg-base-300" />
          <div className="h-4 w-60 rounded bg-base-300" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <div className="space-y-4">
                <div className="h-6 w-1/2 rounded bg-base-300" />

                <div className="flex gap-6">
                  <div className="h-4 w-28 rounded bg-base-300" />
                  <div className="h-4 w-24 rounded bg-base-300" />
                </div>

                <div className="flex justify-end">
                  <div className="h-9 w-28 rounded-lg bg-base-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Tips */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="h-6 w-32 rounded bg-base-300" />
          <div className="h-4 w-56 rounded bg-base-300" />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <div className="h-12 w-12 rounded-xl bg-base-300" />

              <div className="mt-5 h-5 w-2/3 rounded bg-base-300" />

              <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded bg-base-300" />
                <div className="h-4 w-5/6 rounded bg-base-300" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
