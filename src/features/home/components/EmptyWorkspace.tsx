import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Plus,
  Upload,
  Sparkles,
} from "lucide-react";

export const EmptyWorkspace = () => {
  return (
    <main className="relative mx-auto max-w-6xl">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-24
            h-80
            w-80
            -translate-x-1/2
            rounded-full
            bg-action-primary/10
            blur-[140px]
          "
        />
      </div>

      <section
        className="
          relative
          overflow-hidden
          bg-bg-secondary
          p-10
          lg:p-12
        "
      >
        {/* Hero */}

        <div className="mx-auto max-w-3xl text-center">
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-action-primary/20
              bg-action-primary/10
              px-4
              py-2
              text-sm
              font-medium
              text-action-primary
            "
          >
            <Sparkles className="h-4 w-4" />
            Welcome to ClearHire
          </div>

          <div
            className="
              mx-auto
              mt-8
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-3xl
              bg-action-primary/10
            "
          >
            <BriefcaseBusiness className="h-12 w-12 text-action-primary" />
          </div>

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-text-primary">
            Your workspace is ready
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-text-secondary">
            Create your first hiring pipeline in just a few minutes. Once your
            job is live, upload resumes and let ClearHire rank candidates with
            explainable AI insights.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/jobs/new"
              className="
              inline-flex
              h-12
              items-center
              justify-center
              gap-3
              rounded-xl
              bg-action-primary
              px-6
              font-semibold
              text-white
              shadow-lg
              shadow-action-primary/20
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-action-primary-hover
              hover:shadow-action-primary/40
               "
            >
              <Plus className="h-5 w-5" />
              Create First Job
            </Link>

            <Link
              to="/guide"
              className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-border-default
                  bg-bg-primary
                  px-6
                  font-semibold
                  text-text-primary
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:border-action-primary/40
                  hover:bg-bg-surface
                "
            >
              View Guide
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Divider */}

        <div className="my-10 border-t border-border-default" />

        {/* Steps */}

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border-default bg-bg-primary p-6">
            <div className="mb-5 inline-flex rounded-xl bg-action-primary/10 p-3">
              <BriefcaseBusiness className="h-6 w-6 text-action-primary" />
            </div>

            <h3 className="text-lg font-semibold text-text-primary">
              1. Create a Job
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Add your role, required skills, experience level, and hiring
              requirements.
            </p>
          </div>

          <div className="rounded-2xl border border-border-default bg-bg-primary p-6">
            <div className="mb-5 inline-flex rounded-xl bg-action-primary/10 p-3">
              <Upload className="h-6 w-6 text-action-primary" />
            </div>

            <h3 className="text-lg font-semibold text-text-primary">
              2. Upload Resumes
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Drag and drop candidate resumes to start an AI screening batch.
            </p>
          </div>

          <div className="rounded-2xl border border-border-default bg-bg-primary p-6">
            <div className="mb-5 inline-flex rounded-xl bg-action-primary/10 p-3">
              <Sparkles className="h-6 w-6 text-action-primary" />
            </div>

            <h3 className="text-lg font-semibold text-text-primary">
              3. Review AI Results
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Compare ranked candidates, understand AI explanations, and make
              informed hiring decisions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
