import { Link } from "react-router-dom";
import { BriefcaseBusiness, Plus } from "lucide-react";

export const EmptyWorkspace = () => {
  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <BriefcaseBusiness className="h-10 w-10 text-primary" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-base-content">
          Welcome to ClearHire
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-base-content/70">
          Your workspace is ready. Create your first job to start screening
          resumes, rank candidates, and manage your hiring process from one
          place.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/jobs/new" className="btn btn-primary">
            <Plus className="h-5 w-5" />
            Create Your First Job
          </Link>

          <Link to="/guide" className="btn btn-outline">
            View Guide
          </Link>
        </div>
      </div>
    </section>
  );
};
