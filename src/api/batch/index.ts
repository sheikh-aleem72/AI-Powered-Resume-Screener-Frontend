/**
 * Batch API Module
 *
 * Responsible for triggering resume processing pipelines.
 * A batch represents a set of resumes submitted for a specific job.
 */

import { httpClient } from "../../lib/httpClient";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface CreateBatchPayload {
  jobDescriptionId: string;
  resumes: {
    resumeObjectId: string;
    resumeUrl: string;
  }[];
  size: number;
}

export interface CreateBatchResponse {
  batchId: string;
  jobDescriptionId: string;
}

/* -------------------------------------------------------------------------- */
/*                                Public API                                  */
/* -------------------------------------------------------------------------- */

export const batchApi = {
  /**
   * Create a new processing batch.
   *
   * Backend behavior:
   * - Creates batch document
   * - Creates resume processing jobs
   * - Publishes jobs to Redis queue
   * - Workers start processing
   */
  createBatch: (payload: CreateBatchPayload): Promise<CreateBatchResponse> => {
    return httpClient.post("/batch/create", payload);
  },
};
