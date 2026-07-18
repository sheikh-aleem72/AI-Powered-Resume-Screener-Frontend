import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I report bugs?",
    answer:
      "Absolutely. Bug reports are always welcome. Please include as much detail as possible, such as the page, expected behavior, and screenshots if available.",
  },
  {
    question: "Can I suggest new features?",
    answer:
      "Yes! Feedback and feature requests are one of the best ways to improve ClearHire. Every suggestion is appreciated.",
  },
  {
    question: "Will I receive a reply?",
    answer:
      "I'll do my best to respond to genuine questions and feedback as soon as possible. Response times may vary depending on availability.",
  },
  {
    question: "Is ClearHire open source?",
    answer:
      "At the moment, ClearHire is a personal portfolio project and is not open source. You can still explore the project and follow its progress on GitHub.",
  },
];

export const ContactFAQ = () => {
  return (
    <section className="space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          FAQ
        </p>

        <h2 className="mt-4 text-4xl font-bold text-text-primary">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-lg leading-8 text-text-secondary">
          Answers to common questions about contacting me and ClearHire.
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="
              group
              rounded-2xl
              border
              border-border-default
              bg-bg-secondary
              p-6
            "
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
