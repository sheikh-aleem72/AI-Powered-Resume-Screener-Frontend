import { useQuery } from "@tanstack/react-query";
import { jobsApi, type JobDetail } from "../../jobs/api/index";

export const useJob = (jobId: string) => {
  return useQuery<JobDetail>({
    queryKey: ["job", jobId],
    queryFn: () => jobsApi.fetchJobById(jobId),
    enabled: !!jobId,

    refetchInterval: (query) => {
      const data = query.state.data;

      if (!data) return 5000;

      const isComplete = data.completedResumes === data.totalResumes;

      return isComplete ? 30000 : 5000;
    },

    refetchOnWindowFocus: false,
  });
};
