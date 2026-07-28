export const JobsLoading = () => {
  return (
    <div className="space-y-10 animate-pulse p-8">
      {/* Hero */}

      <div className="h-56 rounded-3xl border border-border-default bg-bg-secondary" />

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-36 rounded-3xl border border-border-default bg-bg-secondary"
          />
        ))}
      </div>

      {/* Toolbar */}

      <div className="h-32 rounded-3xl border border-border-default bg-bg-secondary" />

      {/* Table */}

      <div className="rounded-3xl border border-border-default bg-bg-secondary">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-20 border-b border-border-subtle last:border-0"
          />
        ))}
      </div>
    </div>
  );
};
