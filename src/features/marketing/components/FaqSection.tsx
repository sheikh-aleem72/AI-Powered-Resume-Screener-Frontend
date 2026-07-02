import { SectionContainer } from "./SectionContainer";

const faqs = [
  {
    question: "Is ClearHire replacing recruiter judgment?",
    answer:
      "No. ClearHire helps with screening and ranking so recruiters can spend more time reviewing strong candidates and making informed decisions.",
  },
  {
    question: "Can I screen resumes for different roles?",
    answer:
      "Yes. Each job can have its own description, required skills, preferred skills, and experience expectations.",
  },
  {
    question: "Does ClearHire explain why candidates are rejected?",
    answer:
      "Yes. Candidate results include decision reasons and missing requirements so recruiters can review the signal behind the score.",
  },
  {
    question: "Can I upload multiple resumes at once?",
    answer:
      "Yes. ClearHire supports batch uploads so recruiters can process a candidate pool without uploading files one by one.",
  },
];

export function FaqSection() {
  return (
    <SectionContainer
      id="faq"
      ariaLabelledby="faq-title"
      className="bg-bg-secondary/40"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-action-primary">
            FAQ
          </p>
          <h2
            id="faq-title"
            className="mt-3 text-3xl font-semibold text-text-primary sm:text-4xl"
          >
            Questions recruiters ask first.
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-lg border border-border-subtle bg-bg-primary/70 p-5"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-action-primary focus:ring-offset-2 focus:ring-offset-bg-primary">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span
                    className="text-action-primary transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-6 text-text-secondary">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
