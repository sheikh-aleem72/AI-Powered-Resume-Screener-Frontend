import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsApi } from "../../api/job";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobsApi.deleteJob,

    onMutate: async (jobId: string) => {
      // stop ongoing queries
      await queryClient.cancelQueries({ queryKey: ["jobs"] });

      const previousJobs = queryClient.getQueryData(["jobs"]);

      // optimistic update (remove job)
      queryClient.setQueryData(["jobs"], (old: any) =>
        old?.filter((job: any) => job._id !== jobId)
      );

      return { previousJobs };
    },

    onError: (__, _, context) => {
      // rollback
      queryClient.setQueryData(["jobs"], context?.previousJobs);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};
