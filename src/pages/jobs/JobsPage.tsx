import { JobsEmpty } from "../../features/jobs/components/JobsEmpty";
import { JobsError } from "../../features/jobs/components/JobsError";
import { JobsHero } from "../../features/jobs/components/JobsHero";
import { JobsLoading } from "../../features/jobs/components/JobsLoading";
import { JobsStats } from "../../features/jobs/components/JobsStats";
// import { JobsToolbar } from "../../features/jobs/components/JobsToolbar";
import { JobTable } from "../../features/jobs/components/JobTable";
import { useJobs } from "../../features/job-detail/hooks/useJobs";

export const JobsPage = () => {
  const { data, isLoading, isError, refetch } = useJobs();

  if (isLoading) {
    return <JobsLoading />;
  }

  if (isError) {
    return <JobsError onRetry={() => refetch()} />;
  }

  if (data?.length === 0) {
    return (
      <div className="p-8 flex flex-col gap-4">
        <JobsHero />
        <JobsEmpty />
      </div>
    );
  }

  const jobs = data ?? [];

  return (
    <div className="space-y-10 p-8">
      <JobsHero />

      <JobsStats jobs={jobs} />

      {/* <JobsToolbar /> */}

      <JobTable jobs={jobs} />
    </div>
  );
};
