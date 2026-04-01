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

  uploadFileToCloudinary: (
    file: File,
    config: PresignedUpload,
    onProgress?: (progress: number) => void
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("POST", config.uploadUrl);

      /* ----------------------------- progress event ---------------------------- */

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);

          onProgress(percent);
        }
      };

      /* ------------------------------ success case ----------------------------- */

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);

          resolve(response.secure_url);
        } else {
          reject(new Error("Cloudinary upload failed"));
        }
      };

      /* ------------------------------ error case ------------------------------- */

      xhr.onerror = () => reject(new Error("Network error during upload"));

      /* ----------------------------- form payload ------------------------------ */

      const formData = new FormData();

      formData.append("file", file);
      formData.append("api_key", config.apiKey);
      formData.append("timestamp", config.timestamp.toString());
      formData.append("signature", config.signature);
      formData.append("folder", config.folder);
      formData.append("public_id", config.filename);

      xhr.send(formData);
    });
  },
};
