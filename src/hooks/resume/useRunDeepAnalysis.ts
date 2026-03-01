import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "../../api/resume";

export const useRunDeepAnalysis = (resumeProcessingId: string) => {
  const queryClient = useQueryClient();

  console.log("Resume id: ", resumeProcessingId);
  return useMutation({
    mutationFn: async () => {
      await resumeApi.createDeepAnalysis(resumeProcessingId);
    },
    onSuccess: () => {
      console.log("Result");
      // Invalidate resume query so polling re-evaluates immediately
      queryClient.invalidateQueries({
        queryKey: ["resume-processing", resumeProcessingId],
      });
    },
  });
};
