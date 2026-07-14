import {
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  Trophy,
} from "lucide-react";

export const DecisionMockup = () => {
  const checklist = [
    {
      icon: Trophy,
      title: "Review AI Rankings",
    },
    {
      icon: FileSearch,
      title: "Open Candidate Details",
    },
    {
      icon: BrainCircuit,
      title: "Understand AI Insights",
    },
    {
      icon: CheckCircle2,
      title: "Make Your Hiring Decision",
    },
  ];

  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8 shadow-xl">
      {/* Header */}

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-state-success/10">
          <BadgeCheck className="h-8 w-8 text-state-success" />
        </div>

        <h3 className="mt-5 text-2xl font-bold text-text-primary">
          You're Ready to Hire
        </h3>

        <p className="mt-3 text-text-secondary leading-7">
          ClearHire has completed the heavy lifting. Now review the
          recommendations and make the final hiring decision with confidence.
        </p>
      </div>

      {/* Checklist */}

      <div className="mt-5 space-y-4">
        {checklist.map(({ icon: Icon, title }) => (
          <div
            key={title}
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-border-default
              bg-bg-primary
              p-4
            "
          >
            <div className="rounded-xl bg-state-success/10 p-3">
              <Icon className="h-5 w-5 text-state-success" />
            </div>

            <span className="font-medium text-text-primary">{title}</span>
          </div>
        ))}
      </div>

      {/* Footer */}

      <div className="mt-10 rounded-2xl border border-action-primary/20 bg-action-primary/10 p-6">
        <p className="text-lg font-semibold text-action-primary">💡 Remember</p>

        <p className="mt-3 leading-7 text-text-secondary">
          ClearHire recommends candidates based on AI analysis, but the final
          hiring decision always remains in your hands. Think of AI as your
          recruiting assistant—not your recruiter.
        </p>
      </div>
    </div>
  );
};
