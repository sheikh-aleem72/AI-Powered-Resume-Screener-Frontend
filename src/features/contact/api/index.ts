import { httpClient } from "../../../lib/httpClient";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export const contactApi = {
  sendMessage: (payload: ContactPayload): Promise<ContactResponse> => {
    return httpClient.post("/contact", payload);
  },
};
