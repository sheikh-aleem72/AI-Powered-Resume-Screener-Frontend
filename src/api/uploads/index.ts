import { httpClient } from "../../lib/httpClient";

export interface PresignedUpload {
  uploadUrl: string;
  timestamp: number;
  signature: string;
  apiKey: string;
  folder: string;
  filename: string;
}

export const uploadApi = {
  getPresignedUrls: async (fileNames: string[]): Promise<PresignedUpload[]> => {
    const response = await httpClient.post("/cloudinary/presigned-urls", {
      fileNames,
    });

    return response.urls;
  },

  uploadFileToCloudinary: async (file: File, config: PresignedUpload) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("api_key", config.apiKey);
    formData.append("timestamp", config.timestamp.toString());
    formData.append("signature", config.signature);
    formData.append("folder", config.folder);
    formData.append("public_id", config.filename);

    const response = await fetch(config.uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const data = await response.json();

    return data.secure_url;
  },
};
