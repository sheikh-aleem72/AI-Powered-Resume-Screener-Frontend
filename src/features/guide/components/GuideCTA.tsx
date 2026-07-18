import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const GuideCTA = () => {
  return (
    <section className="overflow-hidden rounded-4xl border border-border-default bg-bg-secondary px-10 py-14 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
        Ready to Begin?
      </p>

      <h2 className="mt-4 text-5xl font-bold text-text-primary">
        Start screening candidates today.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
        Create your first job, upload resumes, and let ClearHire help you
        identify the strongest candidates in minutes.
      </p>

      <div className="mt-10">
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
            hover:bg-action-primary-hover
          "
        >
          Create Your First Job
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
