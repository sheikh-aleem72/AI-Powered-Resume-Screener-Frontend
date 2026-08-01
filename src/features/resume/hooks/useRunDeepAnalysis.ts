import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "../api";

export const useRunDeepAnalysis = (resumeProcessingId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await resumeApi.createDeepAnalysis(resumeProcessingId);
    },
    onSuccess: () => {
      // Invalidate resume query so polling re-evaluates immediately
      queryClient.invalidateQueries({
        queryKey: ["resume-processing", resumeProcessingId],
      });
    },
  });
};
