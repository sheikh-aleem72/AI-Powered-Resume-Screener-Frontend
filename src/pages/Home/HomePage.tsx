import { EmptyWorkspace } from "../../features/home/components/EmptyWorkspace";
import { HomeError } from "../../features/home/components/HomeError";
import { HomeHeader } from "../../features/home/components/HomeHeader";
import { HomeLoading } from "../../features/home/components/HomeLoading";
import { QuickTips } from "../../features/home/components/QuickTips";
import { RecentJobs } from "../../features/home/components/RecentJobs";
import { WorkspaceSummary } from "../../features/home/components/WorkspaceSummary";
import { useWorkspaceSummary } from "../../features/home/hooks/useWorkspaceSummary";
import { useJobs } from "../../features/job-detail/hooks/useJobs";
import { tokenUtils } from "../../features/auth/utils/tokenUtils";

export const HomePage = () => {
  const { data: jobs = [], isLoading, isError, refetch } = useJobs();

  const { summary, recentJobs, hasJobs } = useWorkspaceSummary(jobs);

  const user = tokenUtils.getUser();

  if (isLoading) {
    return <HomeLoading />;
  }

  if (isError) {
    return <HomeError onRetry={() => refetch()} />;
  }

  if (!hasJobs) {
    return <EmptyWorkspace />;
  }

  return (
    <div className="space-y-10 p-4 bg-bg-primary/60">
      <HomeHeader recruiterName={user?.name} />

      <WorkspaceSummary summary={summary} />

      <RecentJobs jobs={recentJobs} />

      <QuickTips />
    </div>
  );
};
