import { useParams } from "react-router-dom";
import { useJob } from "../../hooks/job/useJob";

export const JobDetailPage = () => {
  const { jobId } = useParams<{ jobId: string }>();

  const { data, isLoading, isError, error } = useJob(jobId!);

  if (isLoading) {
    return <div className="p-6">Loading job...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">{(error as Error).message}</div>;
  }

  if (!data) {
    return <div className="p-6 text-muted-foreground">Job not found.</div>;
  }

  const progressPercent =
    data.totalResumes === 0
      ? 0
      : Math.round((data.completedResumes / data.totalResumes) * 100);

  const isComplete = data.completedResumes === data.totalResumes;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">{data.title}</h1>

        <p className="text-sm text-muted-foreground">{data.description}</p>
      </div>

      {/* Job Metadata */}
      <div className="gap-6 text-sm">
        <div>
          <p className="text-muted-foreground">
            Experience Level: {data.experience_level}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Minimum Experience: {data.min_experience_years} years
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Required Skills: {data.required_skills.join(", ")}
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            {data.completedResumes} / {data.totalResumes}
          </span>

          <span className={isComplete ? "text-green-500" : "text-yellow-500"}>
            {isComplete ? "Completed" : "Processing"}
          </span>
        </div>

        <div className="h-3 w-full rounded bg-border">
          <div
            className={`h-3 rounded transition-all ${
              isComplete ? "bg-green-500" : "bg-bg-primary"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
