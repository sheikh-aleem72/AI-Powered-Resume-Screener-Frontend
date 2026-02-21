import { useQuery } from "@tanstack/react-query";
import { jobsApi, type Job } from "../../api/job/index";

export const useJobs = () => {
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: jobsApi.fetchJobs,

    /**
     * Dynamic polling in TanStack Query v5
     */
    refetchInterval: (query) => {
      const data = query.state.data;

      if (!data) return 5000;

      const anyActive = data.some(
        (job: Job) => job.completedResumes < job.totalResumes
      );

      return anyActive ? 5000 : 30000;
    },

    /**
     * Prevent refetch on window focus.
     */
    refetchOnWindowFocus: false,
  });
};
