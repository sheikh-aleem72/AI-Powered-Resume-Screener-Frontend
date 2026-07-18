import { SectionContainer } from "./SectionContainer";

const benefits = [
  "Spend less time reading obviously mismatched resumes.",
  "Give hiring teams a shortlist with clear evidence behind each choice.",
  "Apply role criteria consistently across high-volume candidate pools.",
  "Keep recruiter attention on judgment, outreach, and hiring conversations.",
];

export function BenefitsSection() {
  return (
    <SectionContainer id="benefits" ariaLabelledby="benefits-title">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-action-primary">
            Benefits
          </p>
          <h2
            id="benefits-title"
            className="mt-3 text-3xl font-semibold text-text-primary sm:text-4xl"
          >
            Make screening calmer, faster, and easier to explain.
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary">
            ClearHire helps recruiting teams reduce repetitive review work
            while keeping the final hiring decision with people.
          </p>
        </div>

        <div className="grid gap-3">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="flex gap-3 rounded-lg border border-border-subtle bg-bg-secondary/70 p-4"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-state-success/10 text-state-success">
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.03 2.47a.75.75 0 010 1.06L4.5 9.06 1.97 6.53a.75.75 0 011.06-1.06L4.5 6.94l4.47-4.47a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <p className="text-sm leading-6 text-text-secondary">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
