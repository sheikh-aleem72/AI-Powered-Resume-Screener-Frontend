import { useQuery } from "@tanstack/react-query";
import { jobsApi, type JobResumesResponse } from "../../api/job/index";

export const useJobResumes = (
  jobId: string,
  page: number,
  limit: number,
  passFail?: string
) => {
  return useQuery<JobResumesResponse>({
    queryKey: ["job-resumes", jobId, page, limit, passFail],
    queryFn: () => jobsApi.fetchJobResumes(jobId, page, limit, passFail),
    enabled: !!jobId,
    refetchOnWindowFocus: false,
  });
};
