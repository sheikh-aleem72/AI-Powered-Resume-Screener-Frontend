import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "../../api/resume";

export const useResumeProcessing = (resumeProcessingId: string) => {
  return useQuery({
    queryKey: ["resume-processing", resumeProcessingId],
    queryFn: async () => {
      const data = await resumeApi.fetchResumeProcessing(resumeProcessingId);
      return data;
    },
    refetchInterval: (query) => {
      if (!query.state.data) return false;

      const data = query.state.data;
      if (
        data.status !== "completed" ||
        data.analysisStatus === "queued" ||
        data.analysisStatus === "processing"
      ) {
        return 5000;
      }

      return false;
    },
    refetchOnWindowFocus: false,
  });
};
