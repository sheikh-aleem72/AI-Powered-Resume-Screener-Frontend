import { ArrowRight, Sparkles } from "lucide-react";

export const GuideHero = () => {
  return (
    <section className="relative overflow-hidden rounded-4xl border border-border-default bg-bg-secondary px-10 py-14 lg:px-14">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            right-0
            top-0
            h-72
            w-72
            rounded-full
            bg-action-primary/10
            blur-[140px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}

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
          Getting Started
        </div>

        {/* Heading */}

        <h1 className="mt-8 text-5xl font-bold tracking-tight text-text-primary">
          Hire with confidence using ClearHire
        </h1>

        {/* Description */}

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
          Learn how to create jobs, screen resumes with AI, understand candidate
          rankings, and make confident hiring decisions using ClearHire..
        </p>

        {/* CTA */}

        {/* CTA */}

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("guide-workflow")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
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
              shadow-lg
              shadow-action-primary/20
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-action-primary-hover
              hover:shadow-action-primary/40
            "
          >
            Let's Get Started
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
