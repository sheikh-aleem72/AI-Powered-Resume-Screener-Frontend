import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type createJobPayload, jobsApi } from "../../api/job/index";

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: createJobPayload) => jobsApi.createJob(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};
