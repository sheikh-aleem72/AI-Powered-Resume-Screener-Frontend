/**
 * Resume API Module
 *
 * Purpose
 * -------
 * Provides a thin abstraction layer over resume-processing related
 * backend endpoints.
 *
 * Design Principles
 * -----------------
 * - All authentication, token refresh, and error handling are delegated
 *   to the centralized `httpClient`.
 * - This module only defines typed API calls.
 * - No UI logic, React code, or state management exists here.
 */

import { httpClient } from "../../lib/httpClient";
import type { ResumeProcessing } from "../job";
import { uploadApi } from "../uploads";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface SaveResumeMetaPayload {
  filename: string;
  size: number;
  format: string;
  url: string;
  folder?: string;
}

export interface ResumeMeta {
  _id: string;
  url: string;
}

export interface UploadedResume {
  resumeObjectId: string;
  resumeUrl: string;
}

/* -------------------------------------------------------------------------- */
/*                                Public API                                  */
/* -------------------------------------------------------------------------- */

export const resumeApi = {
  fetchResumeProcessing: (resumeProcessingId: string) => {
    return httpClient.get<ResumeProcessing>(
      `/processing/${resumeProcessingId}`
    );
  },

  createDeepAnalysis: (resumeProcessingId: string) => {
    return httpClient.post(`/processing/${resumeProcessingId}/analyze`, {});
  },

  /**
   * Save resume metadata in batch.
   *
   * Backend expects:
   * {
   *   resumes: [...]
   * }
   */
  saveResumeMetaBatch: (
    resumes: SaveResumeMetaPayload[]
  ): Promise<ResumeMeta[]> => {
    return httpClient.post("/resume/save-meta", { resumes });
  },
};

/* -------------------------------------------------------------------------- */
/*                         Resume Upload Orchestrator                         */
/* -------------------------------------------------------------------------- */

export const uploadResumes = async (
  files: File[]
): Promise<UploadedResume[]> => {
  /* ---------------------------------------------------------------------- */
  /* Step 1: Request presigned URLs                                         */
  /* ---------------------------------------------------------------------- */

  const fileNames = files.map((file) => file.name);

  const presigned = await uploadApi.getPresignedUrls(fileNames);

  /* ---------------------------------------------------------------------- */
  /* Step 2: Upload files to Cloudinary (parallel)                          */
  /* ---------------------------------------------------------------------- */

  const uploadedFiles = await Promise.all(
    files.map(async (file, index) => {
      const config = presigned[index];

      const url = await uploadApi.uploadFileToCloudinary(file, config);

      return {
        filename: file.name,
        size: file.size,
        format: file.type,
        url,
        folder: config.folder,
      };
    })
  );

  /* ---------------------------------------------------------------------- */
  /* Step 3: Save metadata in a single batch request                        */
  /* ---------------------------------------------------------------------- */

  const savedResumes = await resumeApi.saveResumeMetaBatch(uploadedFiles);

  /* ---------------------------------------------------------------------- */
  /* Step 4: Transform response for batch creation API                      */
  /* ---------------------------------------------------------------------- */

  return savedResumes.map((resume) => ({
    resumeObjectId: resume._id,
    resumeUrl: resume.url,
  }));
};
