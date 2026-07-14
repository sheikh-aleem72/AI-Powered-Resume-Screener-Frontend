import {
  BriefcaseBusiness,
  Upload,
  Sparkles,
  ClipboardCheck,
  FileSearch,
  CheckCircle2,
} from "lucide-react";

const checklist = [
  {
    icon: BriefcaseBusiness,
    title: "Create Job",
    target: "step-1",
  },
  {
    icon: Upload,
    title: "Upload Resumes",
    target: "step-2",
  },
  {
    icon: Sparkles,
    title: "AI Processing",
    target: "step-3",
  },
  {
    icon: ClipboardCheck,
    title: "Candidate Ranking",
    target: "step-4",
  },
  {
    icon: FileSearch,
    title: "Resume Analysis",
    target: "step-5",
  },
  {
    icon: CheckCircle2,
    title: "Recruiter Decision",
    target: "step-6",
  },
];

export const WorkflowOverview = () => {
  return (
    <section
      id="guide-workflow"
      className="rounded-3xl border border-border-default bg-bg-secondary p-8"
    >
      <div className="flex flex-col gap-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Your Hiring Journey
        </p>

        <h2 className="text-3xl font-bold text-text-primary">
          What you'll accomplish
        </h2>

        <p className="text-text-secondary">
          Complete these six simple steps to screen candidates with ClearHire.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {checklist.map(({ icon: Icon, title, target }) => (
          <button
            key={title}
            type="button"
            onClick={() =>
              document.getElementById(target)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            className="
        cursor-pointer
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-border-default
        bg-bg-primary
        p-5
        text-left
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-action-primary/50
        hover:bg-bg-secondary
        hover:shadow-lg
        hover:shadow-action-primary/10
        focus:outline-none
        focus:ring-2
        focus:ring-action-primary/40
      "
          >
            <div className="rounded-xl bg-action-primary/10 p-3 transition-colors group-hover:bg-action-primary/20">
              <Icon className="h-5 w-5 text-action-primary" />
            </div>

            <span className="font-semibold text-text-primary">{title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
