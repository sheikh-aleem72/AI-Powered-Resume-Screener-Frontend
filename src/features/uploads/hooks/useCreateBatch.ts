import { useMutation } from "@tanstack/react-query";
import { batchApi, type CreateBatchPayload } from "../api/batchApi";

export const useCreateBatch = () => {
  return useMutation({
    mutationFn: (payload: CreateBatchPayload) => batchApi.createBatch(payload),
  });
};
