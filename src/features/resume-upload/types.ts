export type UploadStatus = "queued" | "uploading" | "uploaded" | "failed";

export interface UploadFileItem {
  id: string;
  file: File;

  status: UploadStatus;
  progress: number;

  resumeUrl?: string;
  resumeObjectId?: string;

  error?: string;
}
