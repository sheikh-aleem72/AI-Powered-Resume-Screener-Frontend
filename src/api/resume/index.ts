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

/* -------------------------------------------------------------------------- */
/*                                Public API                                  */
/* -------------------------------------------------------------------------- */

/**
 * Resume-related API functions.
 *
 * These endpoints operate on the `ResumeProcessing` resource, which
 * represents the lifecycle of a resume being processed for a specific job.
 */
export const resumeApi = {
  /**
   * Fetch a single ResumeProcessing record.
   *
   * Used by:
   * - Resume detail page
   *
   * This endpoint returns the current processing state of the resume,
   * including ranking results, explanation, and deep analysis status.
   */
  fetchResumeProcessing: (resumeProcessingId: string) => {
    return httpClient.get<ResumeProcessing>(
      `/processing/${resumeProcessingId}`
    );
  },

  /**
   * Trigger deep LLM analysis for a resume.
   *
   * This operation is asynchronous on the backend.
   *
   * Backend behavior:
   * - analysisStatus → "queued"
   * - worker processes job
   * - analysisStatus → "processing"
   * - analysisStatus → "completed" | "failed"
   *
   * The frontend polls `fetchResumeProcessing` to track progress.
   */
  createDeepAnalysis: (resumeProcessingId: string) => {
    return httpClient.post(`/processing/${resumeProcessingId}/analyze`, {});
  },
};
