import { CircleCheckBig, FileSearch, Lightbulb } from "lucide-react";

const tips = [
  {
    icon: FileSearch,
    title: "Write clear job descriptions",
    description:
      "Specific skills, experience, and responsibilities help ClearHire rank candidates more accurately.",
  },
  {
    icon: CircleCheckBig,
    title: "Start with top matches",
    description:
      "Review the highest-ranked candidates first to speed up your hiring decisions.",
  },
  {
    icon: Lightbulb,
    title: "Use AI as an assistant",
    description:
      "AI highlights the strongest resumes, but the final hiring decision should always remain yours.",
  },
];

export const QuickTips = () => {
  return (
    <section className="space-y-8 px-8">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Best Practices
        </span>

        <h2 className="mt-2 text-3xl font-bold text-text-primary">
          Hire smarter with ClearHire
        </h2>

        <p className="mt-3 text-text-secondary">
          A few recommendations to help you get the best candidate matches.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {tips.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-border-default
              bg-bg-secondary
              p-7
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-action-primary/30
              hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]
            "
          >
            {/* Decorative Glow */}
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-action-primary/5 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative">
              <div
                className="
                  mb-6
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-action-primary/10
                  text-action-primary
                  transition-all
                  duration-300
                  group-hover:bg-action-primary
                  group-hover:text-white
                "
              >
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-semibold text-text-primary">
                {title}
              </h3>

              <p className="mt-4 leading-7 text-text-secondary">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
