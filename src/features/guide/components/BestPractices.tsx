import { CircleCheckBig, FileSearch, Lightbulb } from "lucide-react";

const practices = [
  {
    icon: FileSearch,
    title: "Write a clear job description",
    description:
      "Include the required skills, responsibilities, and experience level so ClearHire can rank candidates more accurately.",
  },
  {
    icon: CircleCheckBig,
    title: "Review top-ranked candidates first",
    description:
      "Start with the strongest matches, then compare AI explanations before making your final decision.",
  },
  {
    icon: Lightbulb,
    title: "Use AI as an assistant",
    description:
      "ClearHire highlights the most relevant candidates, but the final hiring decision always belongs to you.",
  },
];

export const BestPractices = () => {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Best Practices
        </p>

        <h2 className="mt-3 text-4xl font-bold text-text-primary">
          Get the best results
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-text-secondary">
          A few simple habits can significantly improve your hiring experience.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {practices.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-3xl border border-border-default bg-bg-secondary p-8"
          >
            <div className="inline-flex rounded-2xl bg-action-primary/10 p-4">
              <Icon className="h-6 w-6 text-action-primary" />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-text-primary">
              {title}
            </h3>

            <p className="mt-4 leading-7 text-text-secondary">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
