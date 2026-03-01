import { JobTable } from "../../components/jobs/JobTable";
import { useJobs } from "../../hooks/job/useJobs";

export const JobsPage = () => {
  const { data, isLoading, isError, error } = useJobs();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">Loading jobs...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-500">{(error as Error).message}</div>
    );
  }

  return (
    <div className="p-6">
      <JobTable jobs={data ?? []} />
    </div>
  );
};
