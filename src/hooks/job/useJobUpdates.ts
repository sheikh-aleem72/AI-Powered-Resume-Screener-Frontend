import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  jobsApi,
  type JobUpdatesResponse,
  type ResumeProcessing,
} from "../../api/job/index";
import { useEffect } from "react";

export const useJobUpdates = (jobId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<JobUpdatesResponse>({
    queryKey: ["job-updates", jobId],
    queryFn: () => jobsApi.fetchJobUpdates(jobId),
    enabled: !!jobId,
    refetchOnWindowFocus: false,
    refetchInterval: 5000,
  });

  /**
   * Side-effect: merge updates into resume cache
   */
  useEffect(() => {
    if (!query.data) return;

    const updates = query.data.updates;

    queryClient.setQueriesData(
      { queryKey: ["job-resumes", jobId] },
      (oldData: any) => {
        if (!oldData || !oldData.resumes) return oldData;

        return {
          ...oldData,
          resumes: oldData.resumes.map((resume: ResumeProcessing) => {
            const match = updates.find(
              (u) => u.resumeId === resume.resumeObjectId
            );

            if (!match) return resume;

            return {
              ...resume,
              status: match.status,
              analysisStatus: match.analysisStatus,
              passed: match.passFail,
              rank: match.rank,
              finalScore: match.finalScore,
              explanation: match.explanation,
            };
          }),
        };
      }
    );
  }, [query.data, jobId, queryClient]);

  return query;
};
