import { PageBackButton } from "../../shared/components/PageBackButton";

const SkeletonCard = () => (
  <div className="animate-pulse rounded-3xl border border-border-default bg-bg-secondary p-6">
    <div className="h-12 w-12 rounded-2xl bg-bg-primary" />

    <div className="mt-6 h-4 w-28 rounded bg-bg-primary" />

    <div className="mt-3 h-10 w-32 rounded bg-bg-primary" />

    <div className="mt-3 h-4 w-40 rounded bg-bg-primary" />
  </div>
);

export const ResumeLoading = () => {
  return (
    <div className="space-y-10">
      <PageBackButton />

      {/* Hero */}

      <div className="animate-pulse rounded-3xl border border-border-default bg-bg-secondary p-8">
        <div className="h-4 w-32 rounded bg-bg-primary" />

        <div className="mt-6 h-12 w-96 rounded bg-bg-primary" />

        <div className="mt-4 h-4 w-2/3 rounded bg-bg-primary" />

        <div className="mt-8 flex gap-4">
          <div className="h-10 w-32 rounded bg-bg-primary" />
          <div className="h-10 w-32 rounded bg-bg-primary" />
        </div>
      </div>

      {/* Overview */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Evaluation */}

      <div className="animate-pulse rounded-3xl border border-border-default bg-bg-secondary p-8">
        <div className="h-6 w-48 rounded bg-bg-primary" />

        <div className="mt-6 h-4 w-full rounded bg-bg-primary" />
        <div className="mt-3 h-4 w-4/5 rounded bg-bg-primary" />
        <div className="mt-3 h-4 w-2/3 rounded bg-bg-primary" />
      </div>

      {/* Resume */}

      <div className="animate-pulse rounded-3xl border border-border-default bg-bg-secondary p-8">
        <div className="h-175 rounded-2xl bg-bg-primary" />
      </div>
    </div>
  );
};
