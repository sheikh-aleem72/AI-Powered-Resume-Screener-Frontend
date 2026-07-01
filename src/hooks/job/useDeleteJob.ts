import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsApi, type Job } from "../../api/job";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobsApi.deleteJob,

    onMutate: async (jobId: string) => {
      await queryClient.cancelQueries({
        queryKey: ["jobs"],
      });

      const previousJobs = queryClient.getQueryData<Job[]>(["jobs"]);

      // --------------------------------------
      // Optimistically mark job as deleting
      // --------------------------------------
      queryClient.setQueryData<Job[]>(["jobs"], (old = []) =>
        old.map((job) =>
          job._id === jobId
            ? {
                ...job,
                status: "deleting",
              }
            : job
        )
      );

      return { previousJobs };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["jobs"], context?.previousJobs);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
};
