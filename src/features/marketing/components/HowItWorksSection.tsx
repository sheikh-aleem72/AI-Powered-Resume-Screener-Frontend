import { SectionContainer } from "./SectionContainer";

const steps = [
  {
    title: "Create the role",
    description:
      "Add the job description, required skills, seniority, and minimum experience.",
  },
  {
    title: "Upload resumes",
    description:
      "Drop candidate resumes into ClearHire and start a screening batch.",
  },
  {
    title: "Let AI screen",
    description:
      "ClearHire evaluates each resume against the role and prepares a ranked shortlist.",
  },
  {
    title: "Review with context",
    description:
      "Open candidate results with scores, pass/fail signals, and decision reasons.",
  },
];

export function HowItWorksSection() {
  return (
    <SectionContainer
      id="how-it-works"
      ariaLabelledby="how-it-works-title"
      className="bg-bg-secondary/40"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-action-primary">
          How it works
        </p>
        <h2
          id="how-it-works-title"
          className="mt-3 text-3xl font-semibold text-text-primary sm:text-4xl"
        >
          From job description to ranked shortlist.
        </h2>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="rounded-lg border border-border-subtle bg-bg-primary/70 p-5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-action-primary text-sm font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-text-primary">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-text-secondary">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
