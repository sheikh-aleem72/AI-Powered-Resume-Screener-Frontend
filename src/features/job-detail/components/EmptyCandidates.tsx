import { Users } from "lucide-react";

export const EmptyCandidates = () => {
  return (
    <section className="flex min-h-[40vh] items-center justify-center">
      <div className="w-full rounded-3xl border border-border-default bg-bg-secondary p-12 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-action-primary/10">
          <Users className="h-10 w-10 text-action-primary" />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-text-primary">
          No Candidates Yet
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-text-secondary">
          Upload resumes to begin screening candidates for this job.
        </p>
      </div>
    </section>
  );
};
