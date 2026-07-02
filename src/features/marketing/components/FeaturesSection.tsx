import { SectionContainer } from "./SectionContainer";

const features = [
  {
    title: "Job-aware resume ranking",
    description:
      "Score candidates against the exact role, required skills, and experience level you define.",
  },
  {
    title: "Batch resume uploads",
    description:
      "Upload candidate files in bulk and keep the screening flow moving without manual spreadsheet work.",
  },
  {
    title: "Explainable decisions",
    description:
      "See why a candidate matched or missed the bar, including skill and experience signals.",
  },
  {
    title: "Recruiter-first workflow",
    description:
      "Move from job setup to ranked candidates in a focused interface built for repeated hiring cycles.",
  },
  {
    title: "Progress visibility",
    description:
      "Track processing status as resumes are analyzed, ranked, and prepared for review.",
  },
  {
    title: "Consistent screening",
    description:
      "Apply the same criteria across every resume so shortlists are easier to compare and defend.",
  },
];

export function FeaturesSection() {
  return (
    <SectionContainer id="features" ariaLabelledby="features-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-action-primary">
          Features
        </p>
        <h2
          id="features-title"
          className="mt-3 text-3xl font-semibold text-text-primary sm:text-4xl"
        >
          Everything recruiters need to screen faster.
        </h2>
        <p className="mt-4 text-base leading-7 text-text-secondary">
          ClearHire keeps AI assistance tied to real recruiting decisions:
          skills, role fit, evidence, and next actions.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-lg border border-border-subtle bg-bg-secondary/70 p-5"
          >
            <div className="mb-4 h-9 w-9 rounded-md bg-action-primary/10 text-action-primary">
              <span className="flex h-full w-full items-center justify-center">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 3a1 1 0 01.87.51l1.65 2.92 3.3.66a1 1 0 01.55 1.68l-2.28 2.45.39 3.34a1 1 0 01-1.45 1.02L10 14.2l-3.03 1.38a1 1 0 01-1.45-1.02l.39-3.34-2.28-2.45a1 1 0 01.55-1.68l3.3-.66 1.65-2.92A1 1 0 0110 3z" />
                </svg>
              </span>
            </div>
            <h3 className="text-lg font-semibold text-text-primary">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-text-secondary">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
