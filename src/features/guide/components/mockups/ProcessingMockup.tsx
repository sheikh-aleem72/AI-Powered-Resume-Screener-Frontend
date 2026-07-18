import { BrainCircuit, CheckCircle2, LoaderCircle } from "lucide-react";

const tasks = [
  "Extracting resume text",
  "Identifying skills",
  "Matching job requirements",
  "Calculating candidate score",
];

export const ProcessingMockup = () => {
  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-action-primary/10 p-4">
          <BrainCircuit className="h-8 w-8 text-action-primary" />
        </div>

        <div>
          <h3 className="text-xl font-semibold text-text-primary">
            AI Processing
          </h3>

          <p className="text-sm text-text-secondary">Screening resumes...</p>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {tasks.map((task, index) => (
          <div
            key={task}
            className="flex items-center justify-between rounded-xl border border-border-default bg-bg-primary px-5 py-4"
          >
            <span className="text-text-primary">{task}</span>

            {index < 3 ? (
              <CheckCircle2 className="h-5 w-5 text-state-success" />
            ) : (
              <LoaderCircle className="h-5 w-5 animate-spin text-action-primary" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
