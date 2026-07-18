import { useMutation } from "@tanstack/react-query";

import { contactApi, type ContactPayload } from "../api";

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (payload: ContactPayload) => contactApi.sendMessage(payload),
  });
};
