import { Link } from "react-router-dom";
import { BriefcaseBusiness, Plus } from "lucide-react";

export const JobsEmpty = () => {
  return (
    <section className="flex min-h-[50vh] items-center justify-center">
      <div className="w-full max-w-3xl rounded-3xl border border-border-default bg-bg-secondary p-12 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-action-primary/10">
          <BriefcaseBusiness className="h-10 w-10 text-action-primary" />
        </div>

        <h2 className="mt-8 text-4xl font-bold text-text-primary">
          No hiring pipelines yet
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-text-secondary">
          Create your first job to start screening resumes, ranking candidates,
          and managing your hiring pipeline from one place.
        </p>

        <Link
          to="/jobs/new"
          className="
            mt-10
            inline-flex
            h-12
            items-center
            gap-2
            rounded-xl
            bg-action-primary
            px-6
            font-semibold
            text-white
            transition
            hover:bg-action-primary-hover
          "
        >
          <Plus className="h-5 w-5" />
          Create First Job
        </Link>
      </div>
    </section>
  );
};
