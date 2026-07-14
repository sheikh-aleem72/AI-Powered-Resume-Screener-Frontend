import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can AI reject candidates automatically?",
    answer:
      "No. ClearHire only ranks and analyzes resumes. Recruiters always make the final hiring decision.",
  },
  {
    question: "Which resume formats are supported?",
    answer: "You can upload PDF and DOCX resumes.",
  },
  {
    question: "Can I upload more resumes later?",
    answer:
      "Yes. Additional resumes can be uploaded for an existing job whenever needed.",
  },
  {
    question: "How are candidates ranked?",
    answer:
      "Candidates are ranked using semantic similarity, skills, and experience matching against the job description.",
  },
];

export const GuideFAQ = () => {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          FAQ
        </p>

        <h2 className="mt-3 text-4xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-border-default bg-bg-secondary p-6"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-semibold text-text-primary">
                {faq.question}
              </span>

              <ChevronDown className="h-5 w-5 text-text-secondary transition group-open:rotate-180" />
            </summary>

            <p className="mt-5 leading-7 text-text-secondary">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};
