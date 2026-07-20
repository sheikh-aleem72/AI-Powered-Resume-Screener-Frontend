import { Users, CircleCheckBig, Clock3, TriangleAlert } from "lucide-react";

interface JobStatsProps {
  totalResumes: number;
  completedResumes: number;
  processingResumes: number;
  failedResumes: number;
}

export const JobStats = ({
  totalResumes,
  completedResumes,
  processingResumes,
  failedResumes,
}: JobStatsProps) => {
  const stats = [
    {
      title: "Candidates",
      value: totalResumes,
      description: "Uploaded resumes",
      icon: Users,
    },
    {
      title: "Completed",
      value: completedResumes,
      description: "Ready for review",
      icon: CircleCheckBig,
    },
    {
      title: "Processing",
      value: processingResumes,
      description: "Currently screening",
      icon: Clock3,
    },
    {
      title: "Failed",
      value: failedResumes,
      description: "Parsing failures",
      icon: TriangleAlert,
    },
  ];

  return (
    <section className="space-y-6">
      {/* Heading */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Workspace
        </p>

        <h2 className="mt-2 text-3xl font-bold text-text-primary">
          Hiring Overview
        </h2>

        <p className="mt-2 text-text-secondary">
          Monitor the current status of this hiring pipeline.
        </p>
      </div>

      {/* Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ title, value, description, icon: Icon }) => (
          <div
            key={title}
            className="
              rounded-3xl
              border
              border-border-default
              bg-bg-secondary
              p-7
            "
          >
            <div className="inline-flex rounded-2xl bg-action-primary/10 p-4">
              <Icon className="h-6 w-6 text-action-primary" />
            </div>
            <p className="mt-4 text-5xl font-bold text-text-primary">{value}</p>
            <h3 className="mt-2 font-semibold text-text-primary">{title}</h3>
            <p className="mt-1 text-sm text-text-secondary">
              {description}
            </p>{" "}
          </div>
        ))}
      </div>
    </section>
  );
};
